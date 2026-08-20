<?php
/**
 * Automated Google Search Console, IndexNow, Schema & SERP Ranking Engine
 */
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class Aureo_AI_SEO_Indexer {

    public static function init() {
        add_action( 'wp_head', array( __CLASS__, 'inject_seo_meta_tags' ), 1 );
        add_action( 'wp_head', array( __CLASS__, 'inject_json_ld_schema' ), 2 );
        add_action( 'publish_post', array( __CLASS__, 'on_post_published' ), 10, 2 );
    }

    public static function on_post_published( $post_id, $post ) {
        if ( 'post' !== $post->post_type || 'publish' !== $post->post_status ) {
            return;
        }

        if ( '1' !== get_option( 'aureo_ai_auto_index', '1' ) ) {
            return;
        }

        self::submit_to_search_engines( $post_id );
    }

    public static function submit_to_search_engines( $post_id ) {
        $permalink = get_permalink( $post_id );
        if ( empty( $permalink ) ) return false;

        $sitemap_url = home_url( '/wp-sitemap.xml' );
        $results     = array();

        // 1. Google Sitemap Ping Endpoint
        $google_ping = 'https://www.google.com/ping?sitemap=' . urlencode( $sitemap_url );
        $res_google  = wp_remote_get( $google_ping, array( 'timeout' => 10, 'sslverify' => false ) );
        $results['google'] = ! is_wp_error( $res_google ) ? 'Pinged' : 'Failed';

        // 2. Bing & IndexNow Broadcast
        $host = wp_parse_url( home_url(), PHP_URL_HOST );
        $indexnow_payload = array(
            'host'        => $host,
            'key'         => md5( $host ),
            'keyLocation' => home_url( '/' . md5( $host ) . '.txt' ),
            'urlList'     => array( $permalink ),
        );

        $res_indexnow = wp_remote_post( 'https://api.indexnow.org/indexnow', array(
            'headers'   => array( 'Content-Type' => 'application/json; charset=utf-8' ),
            'body'      => wp_json_encode( $indexnow_payload ),
            'timeout'   => 10,
            'sslverify' => false,
        ) );
        $results['indexnow'] = ! is_wp_error( $res_indexnow ) ? 'Submitted' : 'Failed';

        update_post_meta( $post_id, '_aureo_ai_indexed_time', current_time( 'mysql' ) );
        update_post_meta( $post_id, '_aureo_ai_index_results', $results );

        return $results;
    }

    public static function inject_seo_meta_tags() {
        if ( ! is_single() ) return;

        global $post;
        if ( ! $post || 'post' !== $post->post_type ) return;

        $is_ai = get_post_meta( $post->ID, '_aureo_ai_generated', true );
        if ( ! $is_ai ) return;

        $excerpt = get_the_excerpt( $post );
        $tags    = wp_get_post_tags( $post->ID, array( 'fields' => 'names' ) );
        $kw_str  = ! empty( $tags ) ? implode( ', ', $tags ) : 'Construction, Civil Engineering, Architecture, Spatial Design';
        $thumb_url = get_the_post_thumbnail_url( $post->ID, 'full' );

        echo "\n<!-- Aureo AI SEO Engine v" . esc_attr( AUREO_AI_VERSION ) . " -->\n";
        echo '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />' . "\n";
        if ( ! empty( $excerpt ) ) {
            echo '<meta name="description" content="' . esc_attr( wp_strip_all_tags( $excerpt ) ) . '" />' . "\n";
        }
        echo '<meta name="keywords" content="' . esc_attr( $kw_str ) . '" />' . "\n";
        echo '<meta property="og:locale" content="' . esc_attr( get_locale() ) . '" />' . "\n";
        echo '<meta property="og:type" content="article" />' . "\n";
        echo '<meta property="og:title" content="' . esc_attr( get_the_title( $post ) ) . '" />' . "\n";
        if ( ! empty( $excerpt ) ) {
            echo '<meta property="og:description" content="' . esc_attr( wp_strip_all_tags( $excerpt ) ) . '" />' . "\n";
        }
        echo '<meta property="og:url" content="' . esc_url( get_permalink( $post ) ) . '" />' . "\n";
        echo '<meta property="og:site_name" content="' . esc_attr( get_bloginfo( 'name' ) ) . '" />' . "\n";
        echo '<meta property="article:published_time" content="' . esc_attr( get_the_date( 'c', $post ) ) . '" />' . "\n";
        echo '<meta property="article:modified_time" content="' . esc_attr( get_the_modified_date( 'c', $post ) ) . '" />' . "\n";
        if ( ! empty( $thumb_url ) ) {
            echo '<meta property="og:image" content="' . esc_url( $thumb_url ) . '" />' . "\n";
            echo '<meta name="twitter:card" content="summary_large_image" />' . "\n";
            echo '<meta name="twitter:image" content="' . esc_url( $thumb_url ) . '" />' . "\n";
        }
        echo '<!-- / Aureo AI SEO Engine -->' . "\n";
    }

    public static function inject_json_ld_schema() {
        if ( ! is_single() ) return;
        if ( '1' !== get_option( 'aureo_ai_schema_enabled', '1' ) ) return;

        global $post;
        if ( ! $post || ! isset( $post->ID ) ) return;

        $is_ai = get_post_meta( $post->ID, '_aureo_ai_generated', true );
        if ( ! $is_ai ) return;

        $thumb_url   = get_the_post_thumbnail_url( $post->ID, 'full' );
        $author_id   = $post->post_author;
        $author_name = get_the_author_meta( 'display_name', $author_id );
        $excerpt     = get_the_excerpt( $post );

        $schema = array(
            '@context'         => 'https://schema.org',
            '@type'            => 'BlogPosting',
            'mainEntityOfPage' => array(
                '@type' => 'WebPage',
                '@id'   => get_permalink( $post ),
            ),
            'headline'         => get_the_title( $post ),
            'description'      => ! empty( $excerpt ) ? wp_strip_all_tags( $excerpt ) : get_the_title( $post ),
            'datePublished'    => get_the_date( 'c', $post ),
            'dateModified'     => get_the_modified_date( 'c', $post ),
            'author'           => array(
                '@type' => 'Person',
                'name'  => ! empty( $author_name ) ? $author_name : 'Editorial Director',
            ),
            'publisher'        => array(
                '@type' => 'Organization',
                'name'  => get_bloginfo( 'name' ),
                'logo'  => array(
                    '@type' => 'ImageObject',
                    'url'   => home_url( '/favicon.ico' ),
                ),
            ),
        );

        if ( ! empty( $thumb_url ) ) {
            $schema['image'] = array( $thumb_url );
        }

        echo "\n<!-- Aureo AI JSON-LD Schema -->\n";
        echo '<script type="application/ld+json">' . "\n";
        echo wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT ) . "\n";
        echo '</script>' . "\n";
        echo "<!-- / Aureo AI JSON-LD Schema -->\n";
    }
}
