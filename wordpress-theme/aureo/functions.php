<?php
/**
 * Aureo Architecture Theme Functions & Complete Feature Engine
 *
 * @package Aureo
 * @version 1.0.2
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * 1. Theme Setup & Supports
 */
function aureo_theme_setup() {
    load_theme_textdomain( 'aureo', get_template_directory() . '/languages' );

    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'custom-logo', array(
        'height'      => 80,
        'width'       => 280,
        'flex-width'  => true,
        'flex-height' => true,
    ) );
    add_theme_support( 'html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ) );
    add_theme_support( 'align-wide' );
    add_theme_support( 'responsive-embeds' );

    // Image Sizes
    add_image_size( 'aureo-hero', 2000, 1200, true );
    add_image_size( 'aureo-card', 1200, 800, true );
    add_image_size( 'aureo-thumb', 600, 450, true );

    // Navigation Menus
    register_nav_menus( array(
        'primary-left'  => __( 'Primary Left (Properties, Studio)', 'aureo' ),
        'primary-right' => __( 'Primary Right (About, Journal, Contact)', 'aureo' ),
        'drawer-menu'   => __( 'Full Screen Drawer Menu', 'aureo' ),
        'footer-menu'   => __( 'Footer Navigation Menu', 'aureo' ),
    ) );
}
add_action( 'after_setup_theme', 'aureo_theme_setup' );

/**
 * 2. Enqueue Assets (Self-Contained Style.css with Cache Busting)
 */
function aureo_scripts() {
    // Google Fonts: Cormorant Garamond, Cinzel, Plus Jakarta Sans
    wp_enqueue_style( 
        'aureo-google-fonts', 
        'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap', 
        array(), 
        null 
    );

    // Main Complete Stylesheet (Contains all Tailwind utilities, layout tokens, and component styling)
    wp_enqueue_style( 
        'aureo-style', 
        get_stylesheet_uri(), 
        array(), 
        time() 
    );

    // Lucide Icons
    wp_enqueue_script( 
        'aureo-lucide', 
        'https://unpkg.com/lucide@latest', 
        array(), 
        '1.0.0', 
        true 
    );

    // Aureo Interactive JS Engine
    wp_enqueue_script( 
        'aureo-main', 
        get_template_directory_uri() . '/assets/js/aureo.js', 
        array(), 
        time(), 
        true 
    );

    // Dynamic Data Localization for AJAX
    wp_localize_script( 'aureo-main', 'aureoData', array(
        'ajaxUrl' => admin_url( 'admin-ajax.php' ),
        'nonce'   => wp_create_nonce( 'aureo_inquiry_nonce' ),
        'siteUrl' => esc_url( home_url() )
    ) );
}
add_action( 'wp_enqueue_scripts', 'aureo_scripts' );

/**
 * 3. Register Custom Post Types
 */
function aureo_register_custom_post_types() {
    register_post_type( 'residence', array(
        'labels' => array(
            'name'               => __( 'Residences', 'aureo' ),
            'singular_name'      => __( 'Residence', 'aureo' ),
            'add_new'            => __( 'Add New Residence', 'aureo' ),
            'add_new_item'       => __( 'Add New Residence', 'aureo' ),
            'edit_item'          => __( 'Edit Residence', 'aureo' ),
            'new_item'           => __( 'New Residence', 'aureo' ),
            'view_item'          => __( 'View Residence', 'aureo' ),
            'all_items'          => __( 'All Residences', 'aureo' ),
            'search_items'       => __( 'Search Residences', 'aureo' ),
        ),
        'public'             => true,
        'has_archive'        => true,
        'rewrite'            => array( 'slug' => 'residences' ),
        'menu_icon'          => 'dashicons-building',
        'supports'           => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields' ),
        'show_in_rest'       => true,
    ) );

    register_taxonomy( 'residence_location', 'residence', array(
        'labels'        => array(
            'name'          => __( 'Locations', 'aureo' ),
            'singular_name' => __( 'Location', 'aureo' ),
        ),
        'hierarchical'  => true,
        'show_in_rest'  => true,
        'rewrite'       => array( 'slug' => 'location' ),
    ) );

    register_post_type( 'aureo_inquiry', array(
        'labels' => array(
            'name'          => __( 'Private Inquiries', 'aureo' ),
            'singular_name' => __( 'Inquiry', 'aureo' ),
            'all_items'     => __( 'All Inquiries', 'aureo' ),
        ),
        'public'             => false,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'menu_icon'          => 'dashicons-lock',
        'supports'           => array( 'title', 'editor', 'custom-fields' ),
        'capabilities'       => array(
            'create_posts' => false,
        ),
        'map_meta_cap'       => true,
    ) );
}
add_action( 'init', 'aureo_register_custom_post_types' );

/**
 * 4. Theme Customizer Options
 */
function aureo_customize_register( $wp_customize ) {
    $wp_customize->add_section( 'aureo_hero_section', array(
        'title'       => __( 'Aureo Hero Settings', 'aureo' ),
        'priority'    => 30,
        'description' => __( 'Customize hero headline, subtitle, and video background.', 'aureo' ),
    ) );

    $wp_customize->add_setting( 'aureo_hero_headline', array(
        'default'           => "EXQUISITE LIVING,\nREDEFINED",
        'sanitize_callback' => 'sanitize_textarea_field',
    ) );
    $wp_customize->add_control( 'aureo_hero_headline', array(
        'label'    => __( 'Hero Headline', 'aureo' ),
        'section'  => 'aureo_hero_section',
        'type'     => 'textarea',
    ) );

    $wp_customize->add_setting( 'aureo_hero_subhead', array(
        'default'           => "Bespoke residences in the world's most coveted destinations.",
        'sanitize_callback' => 'sanitize_text_field',
    ) );
    $wp_customize->add_control( 'aureo_hero_subhead', array(
        'label'    => __( 'Hero Subtitle', 'aureo' ),
        'section'  => 'aureo_hero_section',
        'type'     => 'text',
    ) );

    $wp_customize->add_setting( 'aureo_hero_video_url', array(
        'default'           => 'https://assets.mixkit.co/videos/preview/mixkit-modern-building-with-glass-facade-42998-large.mp4',
        'sanitize_callback' => 'esc_url_raw',
    ) );
    $wp_customize->add_control( 'aureo_hero_video_url', array(
        'label'    => __( 'Ambient Video URL (MP4)', 'aureo' ),
        'section'  => 'aureo_hero_section',
        'type'     => 'url',
    ) );

    $wp_customize->add_setting( 'aureo_concierge_email', array(
        'default'           => 'inquiries@aureo-residences.com',
        'sanitize_callback' => 'sanitize_email',
    ) );
    $wp_customize->add_control( 'aureo_concierge_email', array(
        'label'    => __( 'Private Advisory Email', 'aureo' ),
        'section'  => 'aureo_hero_section',
        'type'     => 'email',
    ) );
}
add_action( 'customize_register', 'aureo_customize_register' );

/**
 * 5. Reading Time Calculation Helper
 */
function aureo_get_reading_time( $post_id ) {
    $content = get_post_field( 'post_content', $post_id );
    $word_count = str_word_count( strip_tags( $content ) );
    $reading_time = ceil( $word_count / 200 );
    return max( 1, $reading_time ) . ' min read';
}

/**
 * 6. AJAX Form Handler for Inquiries
 */
function aureo_handle_inquiry_submission() {
    check_ajax_referer( 'aureo_inquiry_nonce', 'nonce' );

    $name     = sanitize_text_field( $_POST['fullName'] ?? '' );
    $email    = sanitize_email( $_POST['email'] ?? '' );
    $location = sanitize_text_field( $_POST['location'] ?? 'Zurich' );
    $bracket  = sanitize_text_field( $_POST['bracket'] ?? '$25M - $50M' );
    $phone    = sanitize_text_field( $_POST['phone'] ?? '' );
    $notes    = sanitize_textarea_field( $_POST['notes'] ?? '' );

    if ( empty( $email ) || ! is_email( $email ) ) {
        wp_send_json_error( array( 'message' => 'Please provide a valid email address.' ) );
        exit;
    }

    $inquiry_id = wp_insert_post( array(
        'post_type'    => 'aureo_inquiry',
        'post_title'   => sprintf( '%s — %s (%s)', $name ?: 'Confidential Client', $location, current_time( 'Y-m-d H:i' ) ),
        'post_content' => sprintf(
            "Client Name: %s\nEmail: %s\nPhone: %s\nTerritory: %s\nInvestment Bracket: %s\n\nNotes:\n%s",
            $name,
            $email,
            $phone,
            $location,
            $bracket,
            $notes
        ),
        'post_status'  => 'publish',
    ) );

    if ( $inquiry_id ) {
        update_post_meta( $inquiry_id, '_aureo_client_name', $name );
        update_post_meta( $inquiry_id, '_aureo_client_email', $email );
        update_post_meta( $inquiry_id, '_aureo_client_phone', $phone );
        update_post_meta( $inquiry_id, '_aureo_location', $location );
    }

    $to      = get_theme_mod( 'aureo_concierge_email', get_option( 'admin_email' ) );
    $subject = sprintf( '[Aureo Acquisition] New Private Inquiry: %s (%s)', $name, $location );
    $body    = sprintf(
        "A new confidential dossier inquiry has been received:\n\nName: %s\nEmail: %s\nPhone: %s\nTerritory: %s\nInvestment Tier: %s\n\nNotes:\n%s",
        $name,
        $email,
        $phone,
        $location,
        $bracket,
        $notes
    );
    $headers = array( 'Content-Type: text/plain; charset=UTF-8' );

    @wp_mail( $to, $subject, $body, $headers );

    wp_send_json_success( array(
        'message' => 'Inquiry registered successfully.'
    ) );
}
add_action( 'wp_ajax_aureo_submit_inquiry', 'aureo_handle_inquiry_submission' );
add_action( 'wp_ajax_nopriv_aureo_submit_inquiry', 'aureo_handle_inquiry_submission' );
