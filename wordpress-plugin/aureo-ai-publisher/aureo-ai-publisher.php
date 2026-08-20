<?php
/**
 * Plugin Name: Aureo AI Daily Post Publisher (Gemini Powered)
 * Plugin URI: https://aureo-residences.com/
 * Description: Enterprise AI automated publishing engine for WordPress powered by Google Gemini. Automatically generates and publishes 1–2 high-value, SEO-optimized business monographs daily with featured imagery and deep niche personalization.
 * Version: 1.2.0
 * Author: Aureo Studio & Google Gemini
 * Author URI: https://aureo-residences.com/
 * License: GPL-2.0+
 * Text Domain: aureo-ai-publisher
 */

if ( ! defined( "ABSPATH" ) ) {
    exit;
}

define( "AUREO_AI_VERSION", "1.2.0" );
define( "AUREO_AI_PATH", plugin_dir_path( __FILE__ ) );
define( "AUREO_AI_URL", plugin_dir_url( __FILE__ ) );
define( "AUREO_AI_DEFAULT_API_KEY", "AIzaSyDhRYhbdjBDvnEUkG-vn8gPsUamtkQRNG8" );

// Include Core Classes
require_once AUREO_AI_PATH . "includes/class-gemini-client.php";
require_once AUREO_AI_PATH . "includes/class-post-generator.php";
require_once AUREO_AI_PATH . "includes/class-cron-scheduler.php";
require_once AUREO_AI_PATH . "admin/class-admin-settings.php";

/**
 * Plugin Activation & Deactivation Hooks
 */
function aureo_ai_activate() {
    if ( false === get_option( "aureo_ai_gemini_api_key" ) ) {
        update_option( "aureo_ai_gemini_api_key", AUREO_AI_DEFAULT_API_KEY );
    }
    if ( false === get_option( "aureo_ai_model" ) ) {
        update_option( "aureo_ai_model", "auto" );
    }
    if ( false === get_option( "aureo_ai_niche" ) ) {
        update_option( "aureo_ai_niche", "construction, civil engineering , interior" );
    }
    if ( false === get_option( "aureo_ai_tone" ) ) {
        update_option( "aureo_ai_tone", "authoritative" );
    }
    if ( false === get_option( "aureo_ai_word_count" ) ) {
        update_option( "aureo_ai_word_count", "standard" );
    }
    if ( false === get_option( "aureo_ai_posts_per_day" ) ) {
        update_option( "aureo_ai_posts_per_day", "2" );
    }
    if ( false === get_option( "aureo_ai_post_status" ) ) {
        update_option( "aureo_ai_post_status", "publish" );
    }
    if ( false === get_option( "aureo_ai_category" ) ) {
        update_option( "aureo_ai_category", "Business & Engineering" );
    }
    if ( false === get_option( "aureo_ai_logs" ) ) {
        update_option( "aureo_ai_logs", array() );
    }

    Aureo_AI_Cron_Scheduler::schedule_events();
}
register_activation_hook( __FILE__, "aureo_ai_activate" );

function aureo_ai_deactivate() {
    Aureo_AI_Cron_Scheduler::clear_events();
}
register_deactivation_hook( __FILE__, "aureo_ai_deactivate" );

/**
 * Initialize Plugin
 */
function aureo_ai_init() {
    Aureo_AI_Cron_Scheduler::init();
    if ( is_admin() ) {
        Aureo_AI_Admin_Settings::init();
    }
}
add_action( "plugins_loaded", "aureo_ai_init" );
