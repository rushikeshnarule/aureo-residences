<?php
/**
 * Admin Panel & AJAX Control Dashboard
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
        ) );
    }

    /**
     * AJAX: Generate Post Instantly
     */
    public static function ajax_generate_now() {
        check_ajax_referer( 'aureo_ai_nonce', 'nonce' );

        if ( ! current_user_can( 'manage_options' ) ) {
            wp_send_json_error( array( 'message' => 'Permission denied.' ) );
        }

        $result = Aureo_AI_Post_Generator::create_daily_post( 'manual_admin' );

        if ( is_wp_error( $result ) ) {
            wp_send_json_error( array( 'message' => $result->get_error_message() ) );
        }

        $post = get_post( $result );
        wp_send_json_success( array(
            'message'  => sprintf( 'Successfully published "%s"', $post->post_title ),
            'postId'   => $result,
            'editUrl'  => get_edit_post_link( $result, 'raw' ),
            'viewUrl'  => get_permalink( $result ),
            'title'    => $post->post_title,
        ) );
    }

    /**
     * AJAX: Test Gemini API Connection
     */
    public static function ajax_test_connection() {
        check_ajax_referer( 'aureo_ai_nonce', 'nonce' );

        if ( ! current_user_can( 'manage_options' ) ) {
            wp_send_json_error( array( 'message' => 'Permission denied.' ) );
        }

        $api_key = sanitize_text_field( $_POST['api_key'] ?? '' );
        $test    = Aureo_AI_Gemini_Client::test_connection( $api_key );

        if ( is_wp_error( $test ) ) {
            wp_send_json_error( array( 'message' => $test->get_error_message() ) );
        }

        wp_send_json_success( array( 'message' => 'Google Gemini 2.5 Flash API Connected Successfully!' ) );
    }

    /**
     * AJAX: Clear History Logs
     */
    public static function ajax_clear_logs() {
        check_ajax_referer( 'aureo_ai_nonce', 'nonce' );
        if ( current_user_can( 'manage_options' ) ) {
            update_option( 'aureo_ai_logs', array() );
            wp_send_json_success();
        }
        wp_send_json_error();
    }

    /**
     * Render Admin Dashboard HTML
     */
    public static function render_admin_page() {
        if ( isset( $_POST['aureo_ai_save_settings'] ) && check_admin_referer( 'aureo_ai_settings_verify' ) ) {
            update_option( 'aureo_ai_gemini_api_key', sanitize_text_field( $_POST['aureo_ai_gemini_api_key'] ) );
            update_option( 'aureo_ai_niche', sanitize_text_field( $_POST['aureo_ai_niche'] ) );
            update_option( 'aureo_ai_posts_per_day', sanitize_text_field( $_POST['aureo_ai_posts_per_day'] ) );
            update_option( 'aureo_ai_post_status', sanitize_text_field( $_POST['aureo_ai_post_status'] ) );
            update_option( 'aureo_ai_category', sanitize_text_field( $_POST['aureo_ai_category'] ) );

            // Reschedule cron with new frequency
            Aureo_AI_Cron_Scheduler::schedule_events();

            echo '<div class="notice notice-success is-dismissible"><p><strong>Aureo AI settings saved &amp; cron schedule updated!</strong></p></div>';
        }

        $api_key       = get_option( 'aureo_ai_gemini_api_key', AUREO_AI_DEFAULT_API_KEY );
        $niche         = get_option( 'aureo_ai_niche', 'Monolithic Luxury Architecture, Bespoke Real Estate & Spatial Design' );
        $posts_per_day = get_option( 'aureo_ai_posts_per_day', '1' );
        $post_status   = get_option( 'aureo_ai_post_status', 'publish' );
        $category      = get_option( 'aureo_ai_category', 'Architecture & Design' );
        $logs          = get_option( 'aureo_ai_logs', array() );
        $next_cron     = wp_next_scheduled( 'aureo_ai_daily_post_event' );
        ?>
        <div class="wrap aureo-ai-wrap">
            <div class="aureo-ai-header">
                <div class="aureo-ai-header-left">
                    <span class="aureo-badge">Google Gemini 2.5 Flash</span>
                    <h1>Aureo AI Daily Publisher</h1>
                    <p>Automated high-value daily business &amp; architectural article publishing engine.</p>
                </div>
                <div class="aureo-ai-header-actions">
                    <button type="button" id="btn-generate-now" class="aureo-btn aureo-btn-gold">
                        <span class="dashicons dashicons-controls-play"></span>
                        <span>Generate &amp; Publish Now</span>
                    </button>
                </div>
            </div>

            <!-- Status Banner -->
            <div id="aureo-status-banner" class="aureo-status-banner" style="display:none;"></div>

            <div class="aureo-grid">
                <!-- Settings Form Column -->
                <div class="aureo-card">
                    <h2 class="aureo-card-title">
                        <span class="dashicons dashicons-admin-generic"></span>
                        <span>Publisher Configuration</span>
                    </h2>
                    <form method="post" action="">
                        <?php wp_nonce_field( 'aureo_ai_settings_verify' ); ?>

                        <div class="aureo-form-group">
                            <label for="aureo_ai_gemini_api_key">Google Gemini API Key</label>
                            <div class="aureo-input-with-button">
                                <input type="password" id="aureo_ai_gemini_api_key" name="aureo_ai_gemini_api_key" value="<?php echo esc_attr( $api_key ); ?>" required placeholder="AIzaSy...">
                                <button type="button" id="btn-test-key" class="aureo-btn aureo-btn-outline">Test Key</button>
                            </div>
                            <small>Pre-configured with your active Gemini API key. Click "Test Key" to verify live connectivity.</small>
                        </div>

                        <div class="aureo-form-group">
                            <label for="aureo_ai_niche">Business / Editorial Niche</label>
                            <input type="text" id="aureo_ai_niche" name="aureo_ai_niche" value="<?php echo esc_attr( $niche ); ?>" required>
                            <small>Define the editorial focus (e.g. <em>Luxury Real Estate &amp; Alpine Architecture</em>, <em>B2B SaaS Growth</em>, <em>Wealth Advisory</em>).</small>
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
                                    <option value="publish" <?php selected( $post_status, 'publish' ); ?>>Directly Publish (Live)</option>
                                    <option value="draft" <?php selected( $post_status, 'draft' ); ?>>Save as Draft (Review First)</option>
                                </select>
                            </div>
                        </div>

                        <div class="aureo-form-group">
                            <label for="aureo_ai_category">Default Post Category</label>
                            <input type="text" id="aureo_ai_category" name="aureo_ai_category" value="<?php echo esc_attr( $category ); ?>">
                            <small>Automatically created if it doesn't already exist.</small>
                        </div>

                        <div class="aureo-form-footer">
                            <button type="submit" name="aureo_ai_save_settings" class="aureo-btn aureo-btn-dark">
                                Save Configuration
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Automation Status & Cron Column -->
                <div class="aureo-sidebar">
                    <div class="aureo-card">
                        <h2 class="aureo-card-title">
                            <span class="dashicons dashicons-clock"></span>
                            <span>Cron Engine Status</span>
                        </h2>
                        <div class="aureo-stat-item">
                            <span class="aureo-stat-label">Automation Mode</span>
                            <span class="aureo-badge aureo-badge-green">Active (WP-Cron)</span>
                        </div>
                        <div class="aureo-stat-item">
                            <span class="aureo-stat-label">Frequency</span>
                            <span class="aureo-stat-val"><?php echo ( '2' === $posts_per_day ) ? '2 Posts / Day' : '1 Post / Day'; ?></span>
                        </div>
                        <div class="aureo-stat-item">
                            <span class="aureo-stat-label">Next Scheduled Run</span>
                            <span class="aureo-stat-val">
                                <?php echo $next_cron ? date( 'M j, Y - g:i A', $next_cron ) : 'Pending trigger'; ?>
                            </span>
                        </div>
                        <div class="aureo-stat-item">
                            <span class="aureo-stat-label">AI Model</span>
                            <span class="aureo-stat-val">Gemini 2.5 Flash</span>
                        </div>
                    </div>

                    <!-- Generation Logs -->
                    <div class="aureo-card">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
                            <h2 class="aureo-card-title" style="margin:0;">
                                <span class="dashicons dashicons-list-view"></span>
                                <span>Recent Publications</span>
                            </h2>
                            <button type="button" id="btn-clear-logs" class="aureo-btn-text">Clear</button>
                        </div>

                        <div class="aureo-log-list" id="aureo-log-container">
                            <?php if ( empty( $logs ) ) : ?>
                                <p class="aureo-empty-text">No articles generated yet. Click "Generate &amp; Publish Now" above to trigger your first monograph.</p>
                            <?php else : ?>
                                <?php foreach ( $logs as $log ) : ?>
                                    <div class="aureo-log-item <?php echo esc_attr( $log['status'] ); ?>">
                                        <div class="aureo-log-meta">
                                            <span class="aureo-log-time"><?php echo esc_html( $log['time'] ); ?></span>
                                            <span class="aureo-log-source">[<?php echo esc_html( $log['source'] ); ?>]</span>
                                        </div>
                                        <div class="aureo-log-msg"><?php echo esc_html( $log['message'] ); ?></div>
                                        <?php if ( ! empty( $log['post_id'] ) ) : ?>
                                            <div class="aureo-log-links">
                                                <a href="<?php echo esc_url( get_edit_post_link( $log['post_id'] ) ); ?>" target="_blank">Edit Post</a> · 
                                                <a href="<?php echo esc_url( get_permalink( $log['post_id'] ) ); ?>" target="_blank">View Live</a>
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
