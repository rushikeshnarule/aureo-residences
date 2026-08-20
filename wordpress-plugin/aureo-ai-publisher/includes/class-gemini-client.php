<?php
/**
 * Google Gemini API Client - All Models & Multi-Tier Fallback
 */
if ( ! defined( "ABSPATH" ) ) {
    exit;
}

class Aureo_AI_Gemini_Client {

    public static $all_models = array(
        "auto"                    => "Auto-Detect Best Available Model",
        "gemini-2.5-flash"        => "Gemini 2.5 Flash (Next-Gen Ultra Fast)",
        "gemini-2.5-pro"          => "Gemini 2.5 Pro (Next-Gen Deep Reasoning)",
        "gemini-2.0-flash"        => "Gemini 2.0 Flash (Recommended)",
        "gemini-2.0-flash-lite"   => "Gemini 2.0 Flash Lite (Fast & Efficient)",
        "gemini-2.0-pro-exp"      => "Gemini 2.0 Pro Experimental",
        "gemini-1.5-flash"        => "Gemini 1.5 Flash",
        "gemini-1.5-flash-latest" => "Gemini 1.5 Flash Latest",
        "gemini-1.5-flash-8b"     => "Gemini 1.5 Flash 8B",
        "gemini-1.5-pro"          => "Gemini 1.5 Pro",
        "gemini-1.5-pro-latest"   => "Gemini 1.5 Pro Latest",
        "gemini-pro"              => "Gemini 1.0 Pro (Legacy)",
    );

    /**
     * Sanitize and normalize API key (remove accidental quotes/spaces/newlines)
     */
    public static function clean_key( $key ) {
        $key = trim( (string) $key );
        $key = trim( $key, "\"'\r\n\t " );
        return sanitize_text_field( $key );
    }

    /**
     * Make resilient HTTP request to Google API with SSL fallback
     */
    private static function http_request( $url, $payload, $api_key ) {
        $args = array(
            "method"      => "POST",
            "timeout"     => 45,
            "redirection" => 5,
            "httpversion" => "1.1",
            "headers"     => array(
                "Content-Type"   => "application/json",
                "x-goog-api-key" => $api_key,
                "User-Agent"     => "WordPress/" . get_bloginfo( "version" ) . "; AureoAI/" . AUREO_AI_VERSION,
            ),
            "body"        => wp_json_encode( $payload ),
            "sslverify"   => true,
        );

        $response = wp_remote_post( $url, $args );

        // If SSL certificate bundle fails on local/shared hosting, retry with sslverify false
        if ( is_wp_error( $response ) ) {
            $err_str = $response->get_error_message();
            if ( false !== stripos( $err_str, "ssl" ) || false !== stripos( $err_str, "certificate" ) || false !== stripos( $err_str, "curl error 60" ) ) {
                $args["sslverify"] = false;
                $response = wp_remote_post( $url, $args );
            }
        }

        return $response;
    }

    /**
     * Test connection to Gemini API and detect best available model
     */
    public static function test_connection( $api_key = "", $requested_model = "" ) {
        $api_key = self::clean_key( $api_key );
        if ( empty( $api_key ) ) {
            $api_key = self::clean_key( get_option( "aureo_ai_gemini_api_key", AUREO_AI_DEFAULT_API_KEY ) );
        }
        if ( empty( $requested_model ) ) {
            $requested_model = get_option( "aureo_ai_model", "auto" );
        }

        if ( empty( $api_key ) ) {
            return new WP_Error( "no_key", "Please enter a Google Gemini API key." );
        }

        $models_to_test = array();
        if ( "auto" !== $requested_model && ! empty( $requested_model ) ) {
            $models_to_test[] = $requested_model;
        }

        $fallbacks = array(
            "gemini-2.0-flash",
            "gemini-2.5-flash",
            "gemini-1.5-flash",
            "gemini-1.5-flash-latest",
            "gemini-1.5-pro",
            "gemini-2.0-flash-lite",
            "gemini-pro"
        );
        foreach ( $fallbacks as $f ) {
            if ( ! in_array( $f, $models_to_test, true ) ) {
                $models_to_test[] = $f;
            }
        }

        $last_error = "";
        foreach ( $models_to_test as $model ) {
            foreach ( array( "v1beta", "v1" ) as $version ) {
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

                $response = self::http_request( $url, $payload, $api_key );

                if ( ! is_wp_error( $response ) ) {
                    $code = wp_remote_retrieve_response_code( $response );
                    if ( 200 === $code ) {
                        update_option( "aureo_ai_gemini_api_key", $api_key );
                        update_option( "aureo_ai_working_model", $model );
                        update_option( "aureo_ai_api_version", $version );
                        return array(
                            "model"   => $model,
                            "version" => $version,
                            "message" => sprintf( "Connected successfully! Active Engine: Google %s (%s).", $model, $version )
                        );
                    }
                    $body = wp_remote_retrieve_body( $response );
                    $data = json_decode( $body, true );
                    if ( isset( $data["error"]["message"] ) ) {
                        $last_error = $data["error"]["message"];
                    }
                } else {
                    $last_error = $response->get_error_message();
                }
            }
        }

        return new WP_Error( "connection_failed", $last_error ? $last_error : "Connection failed. Please verify your Gemini key at https://aistudio.google.com/app/apikey" );
    }

    /**
     * Query ModelService.ListModels to retrieve all active models for user account
     */
    public static function fetch_account_models( $api_key = "" ) {
        $api_key = self::clean_key( $api_key );
        if ( empty( $api_key ) ) {
            $api_key = self::clean_key( get_option( "aureo_ai_gemini_api_key", AUREO_AI_DEFAULT_API_KEY ) );
        }
        if ( empty( $api_key ) ) {
            return new WP_Error( "no_key", "Please enter a Gemini API key." );
        }

        $url = "https://generativelanguage.googleapis.com/v1beta/models?key=" . $api_key;
        $args = array(
            "timeout"   => 20,
            "headers"   => array( "x-goog-api-key" => $api_key ),
            "sslverify" => true,
        );
        $response = wp_remote_get( $url, $args );

        if ( is_wp_error( $response ) ) {
            $args["sslverify"] = false;
            $response = wp_remote_get( $url, $args );
        }

        if ( is_wp_error( $response ) ) {
            return $response;
        }

        $code = wp_remote_retrieve_response_code( $response );
        $body = wp_remote_retrieve_body( $response );
        $data = json_decode( $body, true );

        if ( 200 !== $code || empty( $data["models"] ) ) {
            $msg = isset( $data["error"]["message"] ) ? $data["error"]["message"] : "HTTP " . $code;
            return new WP_Error( "api_error", $msg );
        }

        $available = array();
        foreach ( $data["models"] as $m ) {
            if ( ! empty( $m["supportedGenerationMethods"] ) && in_array( "generateContent", $m["supportedGenerationMethods"], true ) ) {
                $clean_name = str_replace( "models/", "", $m["name"] );
                $label = ! empty( $m["displayName"] ) ? $m["displayName"] . " (" . $clean_name . ")" : $clean_name;
                $available[ $clean_name ] = $label;
            }
        }

        update_option( "aureo_ai_gemini_api_key", $api_key );
        return $available;
    }

    /**
     * Robust JSON article parser with regex fallback
     */
    public static function parse_json_article( $raw_text ) {
        if ( empty( $raw_text ) ) return false;

        // 1. Try standard JSON decode after cleaning fences
        $clean = trim( preg_replace( '/^\x60{3}(?:json)?|\x60{3}$/m', '', $raw_text ) );
        $parsed = json_decode( $clean, true );
        if ( is_array( $parsed ) && ! empty( $parsed["title"] ) && ! empty( $parsed["content"] ) ) {
            return $parsed;
        }

        // 2. Try regex extraction if JSON syntax was imperfect
        $title = ""; $content = ""; $excerpt = ""; $category = ""; $tags = array(); $image_kw = "";

        if ( preg_match( '/"title"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/', $clean, $m ) ) {
            $title = stripslashes( $m[1] );
        }
        if ( preg_match( '/"excerpt"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/', $clean, $m ) ) {
            $excerpt = stripslashes( $m[1] );
        }
        if ( preg_match( '/"category"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/', $clean, $m ) ) {
            $category = stripslashes( $m[1] );
        }
        if ( preg_match( '/"image_keyword"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/', $clean, $m ) ) {
            $image_kw = stripslashes( $m[1] );
        }
        if ( preg_match( '/"content"\s*:\s*"([\s\S]+?)"\s*(?:,\s*"|}\s*$)/', $clean, $m ) ) {
            $content = stripslashes( $m[1] );
        }

        if ( ! empty( $title ) && ! empty( $content ) ) {
            return array(
                "title"         => $title,
                "slug"          => sanitize_title( $title ),
                "excerpt"       => $excerpt,
                "category"      => $category,
                "tags"          => array( "Architecture", "Engineering", "Innovation" ),
                "image_keyword" => $image_kw,
                "content"       => $content,
            );
        }

        return false;
    }

    /**
     * Generate Article via Gemini with Autonomous Fallback
     */
    public static function generate_article( $niche, $custom_opts = array() ) {
        $api_key       = ! empty( $custom_opts["api_key"] ) ? self::clean_key( $custom_opts["api_key"] ) : self::clean_key( get_option( "aureo_ai_gemini_api_key", AUREO_AI_DEFAULT_API_KEY ) );
        $pref_model    = ! empty( $custom_opts["model"] ) ? $custom_opts["model"] : get_option( "aureo_ai_model", "auto" );
        $working_model = get_option( "aureo_ai_working_model", "gemini-2.0-flash" );
        $tone          = ! empty( $custom_opts["tone"] ) ? $custom_opts["tone"] : get_option( "aureo_ai_tone", "authoritative" );
        $word_count    = ! empty( $custom_opts["word_count"] ) ? $custom_opts["word_count"] : get_option( "aureo_ai_word_count", "standard" );

        $words_instruction = "600-900 words";
        if ( "short" === $word_count ) {
            $words_instruction = "400-600 words";
        } elseif ( "comprehensive" === $word_count ) {
            $words_instruction = "900-1400 words";
        }

        $tone_instruction = "authoritative, timeless, and sophisticated";
        if ( "technical" === $tone ) {
            $tone_instruction = "highly analytical, data-driven, engineering-focused, and precise";
        } elseif ( "conversational" === $tone ) {
            $tone_instruction = "engaging, visionary, thought-provoking, and accessible";
        } elseif ( "luxury" === $tone ) {
            $tone_instruction = "ultra-luxurious, poetic, high-craft, and architectural";
        }

        if ( ! empty( $api_key ) ) {
            $prompt_lines = array(
                "You are an expert editorial writer and industry analyst.",
                "Your task is to write a deeply engaging, professional article in the following niche:",
                "NICHE: " . esc_attr( $niche ),
                "TONE: " . $tone_instruction,
                "LENGTH: " . $words_instruction,
                "",
                "Requirements:",
                "1. Output MUST be valid JSON only (do not wrap in markdown code blocks).",
                "2. JSON structure:",
                "{",
                '  "title": "Catchy, high-end editorial headline (60-80 characters)",',
                '  "slug": "clean-url-slug",',
                '  "excerpt": "Compelling 2-sentence SEO summary (150-160 characters)",',
                '  "category": "Primary Topic Name",',
                '  "tags": ["Tag1", "Tag2", "Tag3", "Tag4"],',
                '  "image_keyword": "Specific search term for a relevant photograph",',
                '  "content": "Full HTML article. Use <h2> and <h3> subheadings, rich paragraphs, <blockquote> for editorial pullquotes, <ul>/<li> for structured takeaways, and strong emphasis tags."',
                "}"
            );
            $system_prompt = implode( "
", $prompt_lines );

            $models_to_try = array();
            if ( "auto" !== $pref_model && ! empty( $pref_model ) ) {
                $models_to_try[] = $pref_model;
            }
            if ( ! in_array( $working_model, $models_to_try, true ) ) {
                $models_to_try[] = $working_model;
            }
            foreach ( array_keys( self::$all_models ) as $k ) {
                if ( "auto" !== $k && ! in_array( $k, $models_to_try, true ) ) {
                    $models_to_try[] = $k;
                }
            }

            foreach ( $models_to_try as $model ) {
                foreach ( array( "v1beta", "v1" ) as $version ) {
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

                    $response = self::http_request( $url, $payload, $api_key );

                    if ( ! is_wp_error( $response ) && 200 === wp_remote_retrieve_response_code( $response ) ) {
                        $body = wp_remote_retrieve_body( $response );
                        $data = json_decode( $body, true );
                        $text = isset( $data["candidates"][0]["content"]["parts"][0]["text"] ) ? $data["candidates"][0]["content"]["parts"][0]["text"] : "";

                        $parsed = self::parse_json_article( $text );
                        if ( $parsed ) {
                            update_option( "aureo_ai_working_model", $model );
                            update_option( "aureo_ai_api_version", $version );
                            $parsed["source_engine"] = "Google " . $model . " (" . $version . ")";
                            return $parsed;
                        }
                    }
                }
            }
        }

        // Intelligent in-engine dynamic synthesis fallback
        return self::generate_fallback_article( $niche );
    }

    /**
     * In-engine dynamic synthesis for guaranteed daily publishing uptime
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
