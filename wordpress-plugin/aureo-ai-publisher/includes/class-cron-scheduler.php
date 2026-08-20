<?php
/**
 * Cron Scheduling Engine
 */
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class Aureo_AI_Cron_Scheduler {

    public static function init() {
        add_filter( 'cron_schedules', array( __CLASS__, 'custom_intervals' ) );
        add_action( 'aureo_ai_daily_post_event', array( __CLASS__, 'execute_daily_post' ) );
    }

    /**
     * Custom cron schedules (daily or twice daily)
     */
    public static function custom_intervals( $schedules ) {
        if ( ! isset( $schedules['twice_daily'] ) ) {
            $schedules['twice_daily'] = array(
                'interval' => 43200, // 12 hours
                'display'  => __( 'Twice Daily (Every 12 Hours)', 'aureo-ai-publisher' ),
            );
        }
        return $schedules;
    }

    /**
     * Schedule the recurring event based on admin settings
     */
    public static function schedule_events() {
        self::clear_events();

        $posts_per_day = get_option( 'aureo_ai_posts_per_day', '1' );
        $recurrence    = ( '2' === $posts_per_day ) ? 'twicedaily' : 'daily';

        if ( ! wp_next_scheduled( 'aureo_ai_daily_post_event' ) ) {
            wp_schedule_event( time() + 120, $recurrence, 'aureo_ai_daily_post_event' );
        }
    }

    /**
     * Clear all scheduled events
     */
    public static function clear_events() {
        $timestamp = wp_next_scheduled( 'aureo_ai_daily_post_event' );
        if ( $timestamp ) {
            wp_unschedule_event( $timestamp, 'aureo_ai_daily_post_event' );
        }
    }

    /**
     * Cron Callback Execution
     */
    public static function execute_daily_post() {
        Aureo_AI_Post_Generator::create_daily_post( 'automated_cron' );
    }
}
