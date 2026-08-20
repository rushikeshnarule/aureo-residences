<?php
/**
 * Google Gemini API Client with Auto-Discovery & Multi-Model Support
 */
if ( ! defined( "ABSPATH" ) ) {
    exit;
}

class Aureo_AI_Gemini_Client {

    /**
     * Candidate Gemini models in order of performance and availability
     */
    private static $candidate_models = array(
        "gemini-2.0-flash",
        "gemini-1.5-flash",
        "gemini-1.5-flash-latest",
        "gemini-1.5-pro",
        "gemini-1.5-pro-latest",
        "gemini-pro"
    );

    /**
     * Test connection to Gemini API by auto-detecting the active model
     */
    public static function test_connection( $api_key = "" ) {
        if ( empty( $api_key ) ) {
            $api_key = get_option( "aureo_ai_gemini_api_key", AUREO_AI_DEFAULT_API_KEY );
        }

        if ( empty( $api_key ) ) {
            return new WP_Error( "no_key", "Please enter a Google Gemini API key." );
        }

        $api_key = trim( $api_key );
        $last_error = "";

        // Test across candidate models and API versions
        foreach ( self::$candidate_models as $model ) {
            $versions = array( "v1beta", "v1" );
            foreach ( $versions as $version ) {
                $url = "https://generativelanguage.googleapis.com/" . $version . "/models/" . $model . ":generateContent?key=" . $api_key;
                $payload = array(
                    "contents" => array(
                        array(
                            "parts" => array(
                                array( "text" => "Respond with CONNECTED" )
                            )
                        )
                    ),
                    "generationConfig" => array(
                        "temperature"     => 0.1,
                        "maxOutputTokens" => 10
                    )
                );

                $response = wp_remote_post( $url, array(
                    "headers" => array(
                        "Content-Type"   => "application/json",
                        "x-goog-api-key" => $api_key
                    ),
                    "body"    => wp_json_encode( $payload ),
                    "timeout" => 15
                ) );

                if ( ! is_wp_error( $response ) ) {
                    $code = wp_remote_retrieve_response_code( $response );
                    if ( 200 === $code ) {
                        update_option( "aureo_ai_working_model", $model );
                        update_option( "aureo_ai_api_version", $version );
                        return array(
                            "model"   => $model,
                            "version" => $version,
                            "message" => sprintf( "Connected successfully to Google %s (%s)!", $model, $version )
                        );
                    }
                    $body = wp_remote_retrieve_body( $response );
                    $data = json_decode( $body, true );
                    if ( isset( $data["error"]["message"] ) ) {
                        $last_error = $data["error"]["message"];
                    }
                }
            }
        }

        return new WP_Error( "connection_failed", $last_error ? $last_error : "Could not connect to Gemini API. Ensure Generative Language API is enabled or grab a key from https://aistudio.google.com/app/apikey" );
    }

    /**
     * Generate Structured Post Content via Gemini (with multi-model fallback & in-engine synthesis)
     */
    public static function generate_article( $niche, $custom_instructions = "" ) {
        $api_key       = trim( get_option( "aureo_ai_gemini_api_key", AUREO_AI_DEFAULT_API_KEY ) );
        $working_model = get_option( "aureo_ai_working_model", "gemini-2.0-flash" );
        $api_version   = get_option( "aureo_ai_api_version", "v1beta" );

        if ( ! empty( $api_key ) ) {
            $prompt_lines = array(
                "You are a world-class industry analyst, senior engineer, and authoritative editorial writer.",
                "Your task is to write a deeply engaging, professional, and comprehensive article in the following niche:",
                "NICHE: " . esc_attr( $niche ),
                "",
                "Requirements:",
                "1. Output MUST be valid JSON only (no markdown fences outside).",
                "2. JSON structure:",
                "{",
                '  "title": "Catchy, high-end editorial headline (60-80 characters)",',
                '  "slug": "clean-url-slug",',
                '  "excerpt": "Compelling 2-sentence SEO summary (150-160 characters)",',
                '  "category": "Primary Topic Name",',
                '  "tags": ["Tag1", "Tag2", "Tag3", "Tag4"],',
                '  "image_keyword": "Specific search term for an architectural, engineering, or business image",',
                '  "content": "Full HTML article. Use <h2> and <h3> subheadings, rich paragraphs, <blockquote> for editorial pullquotes, <ul>/<li> for structured takeaways, and strong emphasis tags. Length: 600-900 words. Keep tone authoritative, timeless, and sophisticated."',
                "}"
            );
            $system_prompt = implode( "
", $prompt_lines );

            // Build test list starting with working model
            $models_to_try = array_unique( array_merge( array( $working_model ), self::$candidate_models ) );

            foreach ( $models_to_try as $model ) {
                foreach ( array( $api_version, "v1beta", "v1" ) as $version ) {
                    $url = "https://generativelanguage.googleapis.com/" . $version . "/models/" . $model . ":generateContent?key=" . $api_key;
                    $payload = array(
                        "contents" => array(
                            array(
                                "parts" => array(
                                    array( "text" => $system_prompt )
                                )
                            )
                        ),
                        "generationConfig" => array(
                            "temperature"      => 0.75,
                            "maxOutputTokens"  => 4096,
                            "responseMimeType" => "application/json"
                        )
                    );

                    $response = wp_remote_post( $url, array(
                        "headers" => array(
                            "Content-Type"   => "application/json",
                            "x-goog-api-key" => $api_key
                        ),
                        "body"    => wp_json_encode( $payload ),
                        "timeout" => 45
                    ) );

                    if ( ! is_wp_error( $response ) && 200 === wp_remote_retrieve_response_code( $response ) ) {
                        $body = wp_remote_retrieve_body( $response );
                        $data = json_decode( $body, true );
                        $text = isset( $data["candidates"][0]["content"]["parts"][0]["text"] ) ? $data["candidates"][0]["content"]["parts"][0]["text"] : "";

                        if ( ! empty( $text ) ) {
                            $clean_json = trim( preg_replace( '/^\x60{3}(?:json)?|\x60{3}$/m', '', $text ) );
                            $parsed = json_decode( $clean_json, true );
                            if ( is_array( $parsed ) && ! empty( $parsed["title"] ) && ! empty( $parsed["content"] ) ) {
                                update_option( "aureo_ai_working_model", $model );
                                $parsed["source_engine"] = "Google " . $model . " (" . $version . ")";
                                return $parsed;
                            }
                        }
                    }
                }
            }
        }

        // Fallback to intelligent in-engine synthesizer
        return self::generate_fallback_article( $niche );
    }

    /**
     * In-engine dynamic synthesis for guaranteed uptime
     */
    private static function generate_fallback_article( $niche ) {
        $niche_clean = ! empty( $niche ) ? sanitize_text_field( $niche ) : "Construction, Civil Engineering & Interior Architecture";

        $templates = array(
            array(
                "title" => "Advancements in " . ucwords( $niche_clean ) . ": Balancing Scale, Resilience & Precision",
                "slug"  => sanitize_title( "advancements in " . $niche_clean . " scale resilience precision" ),
                "cat"   => "Civil & Architectural Engineering",
                "tags"  => array( "Engineering", "Construction", "Interior Design", "Innovation" ),
                "img"   => "modern civil engineering architecture structural concrete",
                "h2_1"  => "1. The Paradigm Shift in Structural Integrity",
                "h2_2"  => "2. Material Science and Advanced Prefabrication",
                "h2_3"  => "3. Harmonizing Interior Ergonomics with Civil Frameworks",
                "quote" => "True engineering excellence emerges where geotechnical rigidity dissolves into poetic interior volumes."
            ),
            array(
                "title" => "The Next Era of " . ucwords( $niche_clean ) . ": Sustainable Materials & Digital Twins",
                "slug"  => sanitize_title( "the next era of " . $niche_clean . " sustainable digital twins" ),
                "cat"   => "Industry Insights",
                "tags"  => array( "Digital Twins", "Sustainability", "Infrastructure", "Design" ),
                "img"   => "luxury interior architecture construction site engineering",
                "h2_1"  => "1. Digital Twin Modeling in Large-Scale Infrastructure",
                "h2_2"  => "2. Low-Carbon Concrete and High-Performance Polymers",
                "h2_3"  => "3. Biophilic Integration in Modern Built Environments",
                "quote" => "Precision calculation in the sub-structure enables limitless artistic expression in the finished spatial interior."
            ),
            array(
                "title" => "Mastering " . ucwords( $niche_clean ) . ": Geotechnical Precision & Interior Luxury",
                "slug"  => sanitize_title( "mastering " . $niche_clean . " geotechnical precision luxury" ),
                "cat"   => "Design & Construction",
                "tags"  => array( "Civil Engineering", "Interior Layouts", "Structural Mastery", "Execution" ),
                "img"   => "contemporary architecture interior construction steel glass",
                "h2_1"  => "1. Subterranean Excavation and Foundation Engineering",
                "h2_2"  => "2. Cantilever Engineering and Spatial Deflection Controls",
                "h2_3"  => "3. Acoustic Isolation and Tactile Interior Detailing",
                "quote" => "The longevity of an interior is dictated entirely by the uncompromising strength of the engineering beneath it."
            )
        );

        $chosen = $templates[ array_rand( $templates ) ];

        $content = '<p class="lead">In an era characterized by accelerated urbanization and heightened environmental accountability, the disciplines of <strong>' . esc_html( $niche_clean ) . '</strong> are undergoing an unprecedented synthesis. Modern practitioners are no longer evaluating structural robustness and aesthetic finishing in silos; rather, they operate as an indivisible continuum.</p>'
            . '<h2>' . esc_html( $chosen['h2_1'] ) . '</h2>'
            . '<p>The foundation of any enduring project lies in early-stage geotechnical and structural forecasting. By applying predictive finite-element modeling, civil engineers can anticipate stress distributions, soil-structure interactions, and dynamic wind-load responses before the first foundation pile is cast.</p>'
            . '<blockquote>' . esc_html( $chosen['quote'] ) . '</blockquote>'
            . '<h2>' . esc_html( $chosen['h2_2'] ) . '</h2>'
            . '<p>Material innovation has dramatically reshaped the boundaries of what is constructible. Self-healing bio-concretes, carbon-reinforced ultra-high-performance matrix mixes, and precision laser-guided CNC prefabrication allow for expansive column-free interior spans that were historically impossible.</p>'
            . '<ul>'
            . '<li><strong>Enhanced Load Optimization:</strong> Minimizing deadweight while maximizing seismic and lateral shear resistance.</li>'
            . '<li><strong>Accelerated Project Timelines:</strong> Off-site modular fabrication reducing on-site staging footprints by up to 35%.</li>'
            . '<li><strong>Thermal &amp; Acoustic Barrier Integrity:</strong> Multi-layered envelope systems engineered for passive-house energy benchmarks.</li>'
            . '</ul>'
            . '<h2>' . esc_html( $chosen['h2_3'] ) . '</h2>'
            . '<p>Transitioning from the macro-engineering shell to the human-scale interior requires meticulous attention to tolerances. Thermal breaks, acoustic decoupling membranes, and concealed structural chases ensure that services flow invisibly behind monolithic travertine, warm timbers, and seamless micro-cement finishes.</p>'
            . '<p>As we look toward the next decade of built environment development, the convergence of rigorous civil calculations with bespoke interior craftsmanship remains the ultimate benchmark of architectural distinction.</p>';

        return array(
            "title"         => $chosen["title"],
            "slug"          => $chosen["slug"] . "-" . time(),
            "excerpt"       => "An authoritative exploration into " . $niche_clean . ", examining the convergence of structural precision, material science, and spatial design.",
            "category"      => $chosen["cat"],
            "tags"          => $chosen["tags"],
            "image_keyword" => $chosen["img"],
            "content"       => $content,
            "source_engine" => "Aureo Dynamic Content Engine (Autonomous Fallback)",
        );
    }
}
