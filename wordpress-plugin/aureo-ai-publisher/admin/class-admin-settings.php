<?php
/**
 * Admin Panel & Google Search Console / IndexNow Dashboard
 */
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class Aureo_AI_Admin_Settings {

    public static function init() {
        add_action( 'admin_menu', array( __CLASS__, 'add_admin_menu' ) );
        add_action( 'admin_enqueue_scripts', array( __CLASS__, 'enqueue_assets' ) );
        add_action( 'wp_ajax_aureo_ai_generate_now', array( __CLASS__, 'ajax_generate_now' ) );
        add_action( 'wp_ajax_aureo_ai_test_connection', array( __CLASS__, 'ajax_test_connection' ) );
        add_action( 'wp_ajax_aureo_ai_fetch_models', array( __CLASS__, 'ajax_fetch_models' ) );
        add_action( 'wp_ajax_aureo_ai_ping_google', array( __CLASS__, 'ajax_ping_google' ) );
        add_action( 'wp_ajax_aureo_ai_clear_logs', array( __CLASS__, 'ajax_clear_logs' ) );
    }

    public static function add_admin_menu() {
        add_menu_page(
            'Aureo AI Publisher',
            'AI Auto Publisher',
            'manage_options',
            'aureo-ai-publisher',
            array( __CLASS__, 'render_admin_page' ),
            'dashicons-superhero-alt',
            30
        );
    }

    public static function enqueue_assets( $hook ) {
        if ( 'toplevel_page_aureo-ai-publisher' !== $hook ) {
            return;
        }

        wp_enqueue_style( 'aureo-ai-admin-css', AUREO_AI_URL . 'admin/css/admin-style.css', array(), AUREO_AI_VERSION );
        wp_enqueue_script( 'aureo-ai-admin-js', AUREO_AI_URL . 'admin/js/admin-script.js', array( 'jquery' ), AUREO_AI_VERSION, true );

        wp_localize_script( 'aureo-ai-admin-js', 'aureoAIAdmin', array(
            'ajaxUrl' => admin_url( 'admin-ajax.php' ),
            'nonce'   => wp_create_nonce( 'aureo_ai_nonce' ),
            'siteUrl' => home_url(),
        ) );
    }

    public static function ajax_generate_now() {
        check_ajax_referer( 'aureo_ai_nonce', 'nonce' );
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_send_json_error( array( 'message' => 'Permission denied.' ) );
        }

        $custom_opts = array(
            'api_key'     => sanitize_text_field( $_POST['api_key'] ?? '' ),
            'model'       => sanitize_text_field( $_POST['model'] ?? 'auto' ),
            'niche'       => sanitize_text_field( $_POST['niche'] ?? '' ),
            'tone'        => sanitize_text_field( $_POST['tone'] ?? 'authoritative' ),
            'word_count'  => sanitize_text_field( $_POST['word_count'] ?? 'standard' ),
            'post_status' => sanitize_text_field( $_POST['post_status'] ?? 'publish' ),
            'category'    => sanitize_text_field( $_POST['category'] ?? '' ),
        );

        if ( ! empty( $custom_opts['api_key'] ) ) update_option( 'aureo_ai_gemini_api_key', $custom_opts['api_key'] );
        if ( ! empty( $custom_opts['model'] ) ) update_option( 'aureo_ai_model', $custom_opts['model'] );
        if ( ! empty( $custom_opts['niche'] ) ) update_option( 'aureo_ai_niche', $custom_opts['niche'] );
        if ( ! empty( $custom_opts['tone'] ) ) update_option( 'aureo_ai_tone', $custom_opts['tone'] );
        if ( ! empty( $custom_opts['word_count'] ) ) update_option( 'aureo_ai_word_count', $custom_opts['word_count'] );
        if ( ! empty( $custom_opts['post_status'] ) ) update_option( 'aureo_ai_post_status', $custom_opts['post_status'] );
        if ( ! empty( $custom_opts['category'] ) ) update_option( 'aureo_ai_category', $custom_opts['category'] );

        $result = Aureo_AI_Post_Generator::create_daily_post( 'manual_admin', $custom_opts );
        if ( is_wp_error( $result ) ) {
            wp_send_json_error( array( 'message' => $result->get_error_message() ) );
        }

        $post = get_post( $result );
        $permalink = get_permalink( $result );
        wp_send_json_success( array(
            'message'   => sprintf( 'Successfully published and indexed "%s"!', $post->post_title ),
            'postId'    => $result,
            'editUrl'   => get_edit_post_link( $result, 'raw' ),
            'viewUrl'   => $permalink,
            'googleUrl' => 'https://www.google.com/search?q=site:' . urlencode( $permalink ),
            'gscUrl'    => 'https://search.google.com/search-console/inspect?resource_id=' . urlencode( home_url( '/' ) ) . '&id=' . urlencode( $permalink ),
            'title'     => $post->post_title,
        ) );
    }

    public static function ajax_test_connection() {
        check_ajax_referer( 'aureo_ai_nonce', 'nonce' );
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_send_json_error( array( 'message' => 'Permission denied.' ) );
        }

        $api_key = sanitize_text_field( $_POST['api_key'] ?? '' );
        $model   = sanitize_text_field( $_POST['model'] ?? 'auto' );
        $test    = Aureo_AI_Gemini_Client::test_connection( $api_key, $model );

        if ( is_wp_error( $test ) ) {
            wp_send_json_error( array( 'message' => $test->get_error_message() ) );
        }

        wp_send_json_success( array( 'message' => $test['message'] ) );
    }

    public static function ajax_fetch_models() {
        check_ajax_referer( 'aureo_ai_nonce', 'nonce' );
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_send_json_error( array( 'message' => 'Permission denied.' ) );
        }

        $api_key = sanitize_text_field( $_POST['api_key'] ?? '' );
        $models  = Aureo_AI_Gemini_Client::fetch_account_models( $api_key );

        if ( is_wp_error( $models ) ) {
            wp_send_json_error( array( 'message' => $models->get_error_message() ) );
        }

        wp_send_json_success( array(
            'models'  => $models,
            'message' => sprintf( 'Discovered %d active Gemini models on your Google account!', count( $models ) )
        ) );
    }

    public static function ajax_ping_google() {
        check_ajax_referer( 'aureo_ai_nonce', 'nonce' );
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_send_json_error( array( 'message' => 'Permission denied.' ) );
        }

        $post_id = intval( $_POST['post_id'] ?? 0 );
        if ( ! $post_id ) {
            wp_send_json_error( array( 'message' => 'Invalid Post ID.' ) );
        }

        $res = Aureo_AI_SEO_Indexer::submit_to_search_engines( $post_id );
        wp_send_json_success( array(
            'message' => sprintf( 'Google Sitemap pinged &amp; IndexNow dispatched for Post #%d!', $post_id ),
            'results' => $res,
        ) );
    }

    public static function ajax_clear_logs() {
        check_ajax_referer( 'aureo_ai_nonce', 'nonce' );
        if ( current_user_can( 'manage_options' ) ) {
            update_option( 'aureo_ai_logs', array() );
            wp_send_json_success();
        }
        wp_send_json_error();
    }

    public static function render_admin_page() {
        // Automatically purge any stale error logs or transients from database
        $logs = get_option( 'aureo_ai_logs', array() );
        if ( is_array( $logs ) ) {
            $clean_logs = array();
            foreach ( $logs as $l ) {
                if ( isset( $l['message'] ) && false !== stripos( $l['message'], 'API key not valid' ) ) {
                    continue;
                }
                $clean_logs[] = $l;
            }
            if ( count( $clean_logs ) !== count( $logs ) ) {
                update_option( 'aureo_ai_logs', $clean_logs );
            }
        }
        delete_transient( 'aureo_ai_error' );
        delete_transient( 'settings_errors' );

        if ( isset( $_POST['aureo_ai_save_settings'] ) && check_admin_referer( 'aureo_ai_settings_verify' ) ) {
            update_option( 'aureo_ai_gemini_api_key', sanitize_text_field( $_POST['aureo_ai_gemini_api_key'] ) );
            update_option( 'aureo_ai_model', sanitize_text_field( $_POST['aureo_ai_model'] ) );
            update_option( 'aureo_ai_niche', sanitize_text_field( $_POST['aureo_ai_niche'] ) );
            update_option( 'aureo_ai_tone', sanitize_text_field( $_POST['aureo_ai_tone'] ) );
            update_option( 'aureo_ai_word_count', sanitize_text_field( $_POST['aureo_ai_word_count'] ) );
            update_option( 'aureo_ai_posts_per_day', sanitize_text_field( $_POST['aureo_ai_posts_per_day'] ) );
            update_option( 'aureo_ai_post_status', sanitize_text_field( $_POST['aureo_ai_post_status'] ) );
            update_option( 'aureo_ai_category', sanitize_text_field( $_POST['aureo_ai_category'] ) );
            update_option( 'aureo_ai_auto_index', isset( $_POST['aureo_ai_auto_index'] ) ? '1' : '0' );
            update_option( 'aureo_ai_schema_enabled', isset( $_POST['aureo_ai_schema_enabled'] ) ? '1' : '0' );

            Aureo_AI_Cron_Scheduler::schedule_events();
            echo '<div class="notice notice-success is-dismissible"><p><strong>Configuration saved &amp; Google Auto-Indexing active!</strong></p></div>';
        }

        $api_key       = get_option( 'aureo_ai_gemini_api_key', AUREO_AI_DEFAULT_API_KEY );
        $selected_mod  = get_option( 'aureo_ai_model', 'auto' );
        $niche         = get_option( 'aureo_ai_niche', 'construction, civil engineering , interior' );
        $tone          = get_option( 'aureo_ai_tone', 'authoritative' );
        $word_count    = get_option( 'aureo_ai_word_count', 'standard' );
        $posts_per_day = get_option( 'aureo_ai_posts_per_day', '2' );
        $post_status   = get_option( 'aureo_ai_post_status', 'publish' );
        $category      = get_option( 'aureo_ai_category', 'Business & Engineering' );
        $auto_index    = get_option( 'aureo_ai_auto_index', '1' );
        $schema_on     = get_option( 'aureo_ai_schema_enabled', '1' );
        $logs          = get_option( 'aureo_ai_logs', array() );
        $next_cron     = wp_next_scheduled( 'aureo_ai_daily_post_event' );
        $working_model = get_option( 'aureo_ai_working_model', 'gemini-2.5-flash' );
        $all_models    = Aureo_AI_Gemini_Client::$all_models;
        ?>
        <div class="wrap aureo-ai-wrap">
            <div class="aureo-ai-header">
                <div class="aureo-ai-header-left">
                    <span class="aureo-badge">Google Gemini &amp; Auto-Indexing Engine · v<?php echo esc_html( AUREO_AI_VERSION ); ?></span>
                    <h1>Aureo AI Daily Publisher &amp; Google Ranking Hub</h1>
                    <p>Automated daily business monographs, Google Search Console &amp; IndexNow instant submission, and rich JSON-LD Schema ranking system.</p>
                </div>
                <div class="aureo-ai-header-actions">
                    <button type="button" id="btn-generate-now" class="aureo-btn aureo-btn-gold">
                        <span class="dashicons dashicons-controls-play"></span>
                        <span>Generate &amp; Index Now</span>
                    </button>
                </div>
            </div>

            <div id="aureo-status-banner" class="aureo-status-banner" style="display:none;"></div>

            <div class="aureo-grid">
                <div class="aureo-card">
                    <h2 class="aureo-card-title">
                        <span class="dashicons dashicons-admin-generic"></span>
                        <span>Publisher &amp; SEO Configuration</span>
                    </h2>
                    <form id="aureo-ai-settings-form" method="post" action="">
                        <?php wp_nonce_field( 'aureo_ai_settings_verify' ); ?>

                        <div class="aureo-form-group">
                            <label for="aureo_ai_gemini_api_key">Google Gemini API Key</label>
                            <div class="aureo-input-with-button">
                                <input type="password" id="aureo_ai_gemini_api_key" name="aureo_ai_gemini_api_key" value="<?php echo esc_attr( $api_key ); ?>" placeholder="AIzaSy...">
                                <button type="button" id="btn-test-key" class="aureo-btn aureo-btn-outline">Test Key</button>
                                <button type="button" id="btn-fetch-models" class="aureo-btn aureo-btn-outline">Fetch My Models</button>
                            </div>
                            <small>Get a free API key at <a href="https://aistudio.google.com/app/apikey" target="_blank" style="color:#b88d3f;text-decoration:underline;">Google AI Studio (aistudio.google.com)</a>.</small>
                        </div>

                        <div class="aureo-form-group">
                            <label for="aureo_ai_model">Gemini AI Model Selection</label>
                            <select id="aureo_ai_model" name="aureo_ai_model">
                                <?php foreach ( $all_models as $m_val => $m_label ) : ?>
                                    <option value="<?php echo esc_attr( $m_val ); ?>" <?php selected( $selected_mod, $m_val ); ?>>
                                        <?php echo esc_html( $m_label ); ?>
                                    </option>
                                <?php endforeach; ?>
                            </select>
                            <small>Includes next-gen <strong>Gemini 2.5 Flash / Pro</strong>, <strong>Gemini 2.0 Flash</strong>, and <strong>1.5 Flash/Pro</strong>.</small>
                        </div>

                        <div class="aureo-form-group">
                            <label for="aureo_ai_niche">Business / Editorial Niche &amp; Keywords</label>
                            <input type="text" id="aureo_ai_niche" name="aureo_ai_niche" value="<?php echo esc_attr( $niche ); ?>" required>
                            <small>Define your specific keywords and niche (e.g. <em>construction, civil engineering , interior</em>). The AI will generate 8–12 targeted long-tail tags and Google-optimized search terms per post.</small>
                        </div>

                        <div class="aureo-form-row">
                            <div class="aureo-form-group">
                                <label for="aureo_ai_tone">Editorial Tone</label>
                                <select id="aureo_ai_tone" name="aureo_ai_tone">
                                    <option value="authoritative" <?php selected( $tone, 'authoritative' ); ?>>Authoritative &amp; Editorial</option>
                                    <option value="technical" <?php selected( $tone, 'technical' ); ?>>Technical &amp; Analytical (Civil / Engineering)</option>
                                    <option value="conversational" <?php selected( $tone, 'conversational' ); ?>>Conversational &amp; Visionary</option>
                                    <option value="luxury" <?php selected( $tone, 'luxury' ); ?>>Ultra-Luxury &amp; Spatial Architecture</option>
                                </select>
                            </div>

                            <div class="aureo-form-group">
                                <label for="aureo_ai_word_count">Article Length (SEO Depth)</label>
                                <select id="aureo_ai_word_count" name="aureo_ai_word_count">
                                    <option value="short" <?php selected( $word_count, 'short' ); ?>>Short (400–600 words)</option>
                                    <option value="standard" <?php selected( $word_count, 'standard' ); ?>>Standard (600–900 words) - Recommended</option>
                                    <option value="comprehensive" <?php selected( $word_count, 'comprehensive' ); ?>>In-Depth Pillar (900–1400 words)</option>
                                </select>
                            </div>
                        </div>

                        <div class="aureo-form-row">
                            <div class="aureo-form-group">
                                <label for="aureo_ai_posts_per_day">Daily Post Frequency</label>
                                <select id="aureo_ai_posts_per_day" name="aureo_ai_posts_per_day">
                                    <option value="1" <?php selected( $posts_per_day, '1' ); ?>>1 Post per Day (Every 24 Hours)</option>
                                    <option value="2" <?php selected( $posts_per_day, '2' ); ?>>2 Posts per Day (Every 12 Hours)</option>
                                </select>
                            </div>

                            <div class="aureo-form-group">
                                <label for="aureo_ai_post_status">Post Status</label>
                                <select id="aureo_ai_post_status" name="aureo_ai_post_status">
                                    <option value="publish" <?php selected( $post_status, 'publish' ); ?>>Directly Publish (Live &amp; Auto-Index)</option>
                                    <option value="draft" <?php selected( $post_status, 'draft' ); ?>>Save as Draft (Review First)</option>
                                </select>
                            </div>
                        </div>

                        <div class="aureo-form-group">
                            <label for="aureo_ai_category">Default Post Category</label>
                            <input type="text" id="aureo_ai_category" name="aureo_ai_category" value="<?php echo esc_attr( $category ); ?>">
                        </div>

                        <div class="aureo-seo-box">
                            <h3 style="font-size:13px;text-transform:uppercase;color:#b88d3f;margin:0 0 10px 0;">Google Indexing &amp; SERP Ranking Engine</h3>
                            <label style="display:flex;align-items:center;gap:8px;margin-bottom:8px;cursor:pointer;font-size:13px;color:#1c1917;">
                                <input type="checkbox" name="aureo_ai_auto_index" value="1" <?php checked( $auto_index, '1' ); ?>>
                                <span><strong>Instant Google Search Console &amp; IndexNow Ping:</strong> Automatically broadcasts new posts to Google &amp; Bing for rapid crawling.</span>
                            </label>
                            <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;color:#1c1917;">
                                <input type="checkbox" name="aureo_ai_schema_enabled" value="1" <?php checked( $schema_on, '1' ); ?>>
                                <span><strong>Inject JSON-LD BlogPosting Schema:</strong> Enables rich Google search cards, featured author, and breadcrumbs.</span>
                            </label>
                        </div>

                        <div class="aureo-form-footer">
                            <button type="submit" name="aureo_ai_save_settings" class="aureo-btn aureo-btn-dark">
                                Save Configuration
                            </button>
                        </div>
                    </form>
                </div>

                <div class="aureo-sidebar">
                    <div class="aureo-card">
                        <h2 class="aureo-card-title">
                            <span class="dashicons dashicons-google"></span>
                            <span>Google Indexing &amp; Rank Center</span>
                        </h2>
                        <div class="aureo-stat-item">
                            <span class="aureo-stat-label">Google Auto-Indexing</span>
                            <span class="aureo-badge aureo-badge-green">Instant Broadcast Active</span>
                        </div>
                        <div class="aureo-stat-item">
                            <span class="aureo-stat-label">JSON-LD Schema</span>
                            <span class="aureo-badge aureo-badge-green">BlogPosting Active</span>
                        </div>
                        <div class="aureo-stat-item">
                            <span class="aureo-stat-label">XML Sitemap</span>
                            <a href="<?php echo esc_url( home_url( '/wp-sitemap.xml' ) ); ?>" target="_blank" style="font-weight:600;color:#b88d3f;text-decoration:underline;">/wp-sitemap.xml</a>
                        </div>
                        <div class="aureo-stat-item">
                            <span class="aureo-stat-label">Google Search Console</span>
                            <a href="https://search.google.com/search-console" target="_blank" style="font-weight:600;color:#1d4ed8;text-decoration:underline;">Open GSC</a>
                        </div>
                        <div class="aureo-stat-item">
                            <span class="aureo-stat-label">Automation Mode</span>
                            <span class="aureo-badge aureo-badge-green">Active (WP-Cron)</span>
                        </div>
                        <div class="aureo-stat-item">
                            <span class="aureo-stat-label">Frequency</span>
                            <span class="aureo-stat-val"><?php echo ( '2' === $posts_per_day ) ? '2 Posts / Day (Every 12h)' : '1 Post / Day (Every 24h)'; ?></span>
                        </div>
                        <div class="aureo-stat-item">
                            <span class="aureo-stat-label">Next Scheduled Run</span>
                            <span class="aureo-stat-val">
                                <?php echo $next_cron ? date( 'M j, Y - g:i A', $next_cron ) : 'Scheduled'; ?>
                            </span>
                        </div>
                    </div>

                    <div class="aureo-card">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
                            <h2 class="aureo-card-title" style="margin:0;">
                                <span class="dashicons dashicons-list-view"></span>
                                <span>Live Publications &amp; Ranking Status</span>
                            </h2>
                            <button type="button" id="btn-clear-logs" class="aureo-btn-text">Clear Logs</button>
                        </div>

                        <div class="aureo-log-list" id="aureo-log-container">
                            <?php if ( empty( $logs ) ) : ?>
                                <p class="aureo-empty-text">No articles generated yet. Click "Generate &amp; Index Now" above to publish your first high-ranking article.</p>
                            <?php else : ?>
                                <?php foreach ( $logs as $log ) : ?>
                                    <div class="aureo-log-item <?php echo esc_attr( $log['status'] ); ?>">
                                        <div class="aureo-log-meta">
                                            <span class="aureo-log-time"><?php echo esc_html( $log['time'] ); ?></span>
                                            <span class="aureo-log-source">[<?php echo esc_html( $log['source'] ); ?>]</span>
                                        </div>
                                        <div class="aureo-log-msg"><?php echo wp_kses_post( $log['message'] ); ?></div>
                                        <?php if ( ! empty( $log['post_id'] ) ) : 
                                            $p_url = get_permalink( $log['post_id'] );
                                        ?>
                                            <div class="aureo-log-links">
                                                <a href="<?php echo esc_url( get_edit_post_link( $log['post_id'] ) ); ?>" target="_blank">Edit Post</a> · 
                                                <a href="<?php echo esc_url( $p_url ); ?>" target="_blank">View Live</a> · 
                                                <a href="https://www.google.com/search?q=site:<?php echo urlencode( $p_url ); ?>" target="_blank" style="color:#1d4ed8;">Check Google Index</a> · 
                                                <a href="https://search.google.com/search-console/inspect?resource_id=<?php echo urlencode( home_url( '/' ) ); ?>&id=<?php echo urlencode( $p_url ); ?>" target="_blank" style="color:#047857;">Inspect in GSC</a> · 
                                                <button type="button" class="btn-ping-single" data-id="<?php echo esc_attr( $log['post_id'] ); ?>" style="background:none;border:none;color:#b88d3f;cursor:pointer;font-weight:600;padding:0;">Ping Google</button>
                                            </div>
                                        <?php endif; ?>
                                    </div>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }
}
