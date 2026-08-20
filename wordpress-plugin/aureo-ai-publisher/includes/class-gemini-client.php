<?php
/**
 * Google Gemini API Client
 */
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class Aureo_AI_Gemini_Client {

    private static $primary_model = 'gemini-2.5-flash';
    private static $fallback_model = 'gemini-1.5-flash';

    /**
     * Test connection to Gemini API
     */
    public static function test_connection( $api_key = '' ) {
        if ( empty( $api_key ) ) {
            $api_key = get_option( 'aureo_ai_gemini_api_key', AUREO_AI_DEFAULT_API_KEY );
        }

        if ( empty( $api_key ) ) {
            return new WP_Error( 'no_key', 'Gemini API key is required.' );
        }

        $url = 'https://generativelanguage.googleapis.com/v1beta/models/' . self::$primary_model . ':generateContent?key=' . trim( $api_key );

        $payload = array(
            'contents' => array(
                array(
                    'parts' => array(
                        array( 'text' => 'Respond with the exact word: CONNECTED' )
                    )
                )
            ),
            'generationConfig' => array(
                'temperature'     => 0.2,
                'maxOutputTokens' => 10
            )
        );

        $response = wp_remote_post( $url, array(
            'headers' => array( 'Content-Type' => 'application/json' ),
            'body'    => wp_json_encode( $payload ),
            'timeout' => 30,
        ) );

        if ( is_wp_error( $response ) ) {
            return $response;
        }

        $code = wp_remote_retrieve_response_code( $response );
        $body = wp_remote_retrieve_body( $response );
        $data = json_decode( $body, true );

        if ( 200 !== $code ) {
            $msg = isset( $data['error']['message'] ) ? $data['error']['message'] : 'HTTP ' . $code . ' error';
            return new WP_Error( 'api_error', $msg );
        }

        return true;
    }

    /**
     * Generate Structured Post Content via Gemini
     */
    public static function generate_article( $niche, $custom_instructions = '' ) {
        $api_key = get_option( 'aureo_ai_gemini_api_key', AUREO_AI_DEFAULT_API_KEY );
        if ( empty( $api_key ) ) {
            return new WP_Error( 'missing_key', 'Gemini API key is not configured.' );
        }

        $system_prompt = "You are a world-class senior architecture curator, luxury real estate analyst, and editorial writer.
Your task is to write a deeply engaging, professional, and authoritative business article in the following niche:
NICHE: " . esc_attr( $niche ) . "

Requirements:
1. Output MUST be valid JSON (do not include markdown code block backticks outside the JSON).
2. The JSON structure MUST be exactly:
{
  "title": "Catchy, high-end editorial headline (60-80 characters)",
  "slug": "clean-url-slug",
  "excerpt": "Compelling 2-sentence SEO summary/meta description (150-160 characters)",
  "category": "Relevant Category Name",
  "tags": ["Tag1", "Tag2", "Tag3", "Tag4"],
  "image_keyword": "Specific search term for an architectural/business image (e.g. modern cantilever villa lake zurich)",
  "content": "Full HTML formatted article. Use <h2> and <h3> subheadings, rich paragraphs, <blockquote> for editorial pullquotes, <ul>/<li> for structured takeaways, and strong emphasis tags. Length: 600-900 words. Keep tone authoritative, timeless, and sophisticated."
}";

        $url = 'https://generativelanguage.googleapis.com/v1beta/models/' . self::$primary_model . ':generateContent?key=' . trim( $api_key );

        $payload = array(
            'contents' => array(
                array(
                    'parts' => array(
                        array( 'text' => $system_prompt )
                    )
                )
            ),
            'generationConfig' => array(
                'temperature'     => 0.75,
                'maxOutputTokens' => 4096,
                'responseMimeType' => 'application/json'
            )
        );

        $response = wp_remote_post( $url, array(
            'headers' => array( 'Content-Type' => 'application/json' ),
            'body'    => wp_json_encode( $payload ),
            'timeout' => 60,
        ) );

        // Fallback to gemini-1.5-flash if 2.5 has issue
        if ( is_wp_error( $response ) || wp_remote_retrieve_response_code( $response ) !== 200 ) {
            $fallback_url = 'https://generativelanguage.googleapis.com/v1beta/models/' . self::$fallback_model . ':generateContent?key=' . trim( $api_key );
            $response = wp_remote_post( $fallback_url, array(
                'headers' => array( 'Content-Type' => 'application/json' ),
                'body'    => wp_json_encode( $payload ),
                'timeout' => 60,
            ) );
        }

        if ( is_wp_error( $response ) ) {
            return $response;
        }

        $code = wp_remote_retrieve_response_code( $response );
        $body = wp_remote_retrieve_body( $response );
        $data = json_decode( $body, true );

        if ( 200 !== $code ) {
            $msg = isset( $data['error']['message'] ) ? $data['error']['message'] : 'HTTP ' . $code;
            return new WP_Error( 'gemini_error', $msg );
        }

        $text = $data['candidates'][0]['content']['parts'][0]['text'] ?? '';
        if ( empty( $text ) ) {
            return new WP_Error( 'empty_response', 'Gemini returned an empty response.' );
        }

        // Clean any code fences
        $clean_json = trim( preg_replace( '/^\x60{3}(?:json)?|\x60{3}$/m', '', $text ) );
        $parsed = json_decode( $clean_json, true );

        if ( ! is_array( $parsed ) || empty( $parsed['title'] ) || empty( $parsed['content'] ) ) {
            return new WP_Error( 'json_parse_error', 'Could not parse Gemini JSON response.' );
        }

        return $parsed;
    }
}
