<?php
/**
 * Automated Post Builder & Publisher
 */
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class Aureo_AI_Post_Generator {

    /**
     * Curated Luxury Architectural Image Pool for Featured Images
     */
    private static $image_pool = array(
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=85',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=85',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85',
        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1920&q=85',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=85',
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=85',
        'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&w=1920&q=85',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1920&q=85',
    );

    /**
     * Run full post creation pipeline
     */
    public static function create_daily_post( $source = 'cron' ) {
        $niche       = get_option( 'aureo_ai_niche', 'Monolithic Luxury Architecture, Bespoke Real Estate & Spatial Design' );
        $post_status = get_option( 'aureo_ai_post_status', 'publish' );
        $default_cat = get_option( 'aureo_ai_category', 'Architecture & Design' );

        // 1. Generate Article from Gemini
        $article = Aureo_AI_Gemini_Client::generate_article( $niche );
        if ( is_wp_error( $article ) ) {
            self::log( 'error', $article->get_error_message(), $source );
            return $article;
        }

        // 2. Prepare Category
        $cat_id = 0;
        $category_name = ! empty( $article['category'] ) ? sanitize_text_field( $article['category'] ) : $default_cat;
        $term = term_exists( $category_name, 'category' );
        if ( $term ) {
            $cat_id = is_array( $term ) ? $term['term_id'] : $term;
        } else {
            $new_term = wp_insert_term( $category_name, 'category' );
            if ( ! is_wp_error( $new_term ) ) {
                $cat_id = $new_term['term_id'];
            }
        }

        // 3. Insert Post
        $post_data = array(
            'post_title'    => sanitize_text_field( $article['title'] ),
            'post_content'  => wp_kses_post( $article['content'] ),
            'post_excerpt'  => sanitize_text_field( $article['excerpt'] ),
            'post_status'   => in_array( $post_status, array( 'publish', 'draft' ) ) ? $post_status : 'publish',
            'post_type'     => 'post',
            'post_category' => $cat_id ? array( $cat_id ) : array(),
            'tags_input'    => ! empty( $article['tags'] ) ? (array) $article['tags'] : array( 'Architecture', 'Aureo AI' ),
        );

        $post_id = wp_insert_post( $post_data, true );
        if ( is_wp_error( $post_id ) ) {
            self::log( 'error', 'wp_insert_post failed: ' . $post_id->get_error_message(), $source );
            return $post_id;
        }

        // 4. Attach Curated Unsplash Featured Image
        self::attach_featured_image( $post_id, $article['title'] );

        // 5. Store Metadata
        update_post_meta( $post_id, '_aureo_ai_generated', '1' );
        update_post_meta( $post_id, '_aureo_ai_model', 'gemini-2.5-flash' );
        update_post_meta( $post_id, '_aureo_ai_timestamp', current_time( 'mysql' ) );

        self::log( 'success', sprintf( 'Created post "%s" (ID: %d)', $article['title'], $post_id ), $source, $post_id );

        return $post_id;
    }

    /**
     * Download and attach a featured image from high-resolution curated pool
     */
    private static function attach_featured_image( $post_id, $title ) {
        require_once ABSPATH . 'wp-admin/includes/image.php';
        require_once ABSPATH . 'wp-admin/includes/file.php';
        require_once ABSPATH . 'wp-admin/includes/media.php';

        $random_url = self::$image_pool[ array_rand( self::$image_pool ) ];

        // Download file to temp location
        $temp_file = download_url( $random_url, 30 );
        if ( is_wp_error( $temp_file ) ) {
            return false;
        }

        $file_array = array(
            'name'     => sanitize_title( $title ) . '.jpg',
            'tmp_name' => $temp_file,
        );

        $attachment_id = media_handle_sideload( $file_array, $post_id, $title );
        if ( is_wp_error( $attachment_id ) ) {
            @unlink( $temp_file );
            return false;
        }

        set_post_thumbnail( $post_id, $attachment_id );
        return $attachment_id;
    }

    /**
     * Maintain execution history log (last 50 entries)
     */
    public static function log( $status, $message, $source = 'cron', $post_id = 0 ) {
        $logs = get_option( 'aureo_ai_logs', array() );
        if ( ! is_array( $logs ) ) {
            $logs = array();
        }

        array_unshift( $logs, array(
            'time'    => current_time( 'Y-m-d H:i:s' ),
            'status'  => $status,
            'message' => $message,
            'source'  => $source,
            'post_id' => $post_id,
        ) );

        if ( count( $logs ) > 50 ) {
            $logs = array_slice( $logs, 0, 50 );
        }

        update_option( 'aureo_ai_logs', $logs );
    }
}
