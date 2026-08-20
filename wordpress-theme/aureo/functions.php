<?php
/**
 * Aureo / Krushna Ventures Architecture Theme Functions
 * Complete Feature Engine & Admin Options Panel
 *
 * @package Aureo
 * @version 2.2.0
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
 * 2. Enqueue Assets
 */
function aureo_scripts() {
    // Google Fonts
    wp_enqueue_style( 
        'aureo-google-fonts', 
        'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap', 
        array(), 
        null 
    );

    // Main Stylesheet
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

    // Main JS Engine
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
 * 3. Enqueue Admin Scripts for Theme Options Page
 */
function krushna_admin_options_scripts( $hook ) {
    if ( $hook !== 'toplevel_page_krushna-options' ) {
        return;
    }
    wp_enqueue_media();
    wp_enqueue_style( 'wp-color-picker' );
    wp_enqueue_script( 'wp-color-picker' );
}
add_action( 'admin_enqueue_scripts', 'krushna_admin_options_scripts' );

/**
 * 4. Helper Function to Get Theme Options with Defaults
 */
function krushna_opt( $key, $default = '' ) {
    $options = get_option( 'krushna_theme_options', array() );
    if ( isset( $options[ $key ] ) && $options[ $key ] !== '' ) {
        return $options[ $key ];
    }
    return $default;
}

/**
 * 5. Register Admin Menu & Settings
 */
function krushna_register_theme_options_menu() {
    add_menu_page(
        __( 'Aureo Theme Settings', 'aureo' ),
        __( 'Aureo Settings', 'aureo' ),
        'manage_options',
        'aureo-settings',
        'krushna_render_options_page',
        'dashicons-art',
        3
    );
}
add_action( 'admin_menu', 'krushna_register_theme_options_menu' );

function krushna_register_settings() {
    register_setting( 'krushna_options_group', 'krushna_theme_options', 'krushna_sanitize_options' );
}
add_action( 'admin_init', 'krushna_register_settings' );

function krushna_sanitize_options( $input ) {
    $sanitized = array();
    if ( is_array( $input ) ) {
        foreach ( $input as $key => $val ) {
            if ( strpos( $key, 'url' ) !== false || strpos( $key, 'img' ) !== false || strpos( $key, 'link' ) !== false ) {
                $sanitized[ $key ] = esc_url_raw( $val );
            } elseif ( strpos( $key, 'desc' ) !== false || strpos( $key, 'detail' ) !== false || strpos( $key, 'subhead' ) !== false ) {
                $sanitized[ $key ] = sanitize_textarea_field( $val );
            } elseif ( strpos( $key, 'email' ) !== false ) {
                $sanitized[ $key ] = sanitize_email( $val );
            } else {
                $sanitized[ $key ] = sanitize_text_field( $val );
            }
        }
    }
    return $sanitized;
}

/**
 * 6. Render Admin Theme Options Page
 */
function krushna_render_options_page() {
    ?>
    <div class="wrap" style="max-width:1100px;margin-top:20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,sans-serif;">
        <div style="background:#1c1917;color:#fff;padding:24px 32px;border-radius:12px;margin-bottom:24px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 4px 20px rgba(0,0,0,0.15);">
            <div>
                <span style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#d7b775;font-weight:700;display:block;margin-bottom:4px;">Aureo Theme Engine</span>
                <h1 style="color:#fff;font-size:26px;font-weight:700;margin:0;font-family:Georgia,serif;letter-spacing:-0.02em;"><?php echo esc_html( get_bloginfo( 'name' ) ? get_bloginfo( 'name' ) . ' Settings' : 'Aureo Settings' ); ?></h1>
            </div>
            <span style="background:rgba(215,183,117,0.2);color:#d7b775;padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;border:1px solid rgba(215,183,117,0.4);">Live Customizer v2.2</span>
        </div>

        <?php if ( isset( $_GET['settings-updated'] ) && $_GET['settings-updated'] ) : ?>
            <div class="notice notice-success is-dismissible" style="border-left-color:#a67e37;border-radius:8px;padding:12px 18px;">
                <p style="font-weight:600;font-size:14px;"><strong>Success!</strong> All website text, images, and hero details have been updated instantly.</p>
            </div>
        <?php endif; ?>

        <form method="post" action="options.php" style="background:#fff;padding:32px;border-radius:12px;border:1px solid #e7e5e4;box-shadow:0 1px 10px rgba(0,0,0,0.03);">
            <?php settings_fields( 'krushna_options_group' ); ?>
            <?php $opt = get_option( 'krushna_theme_options', array() ); ?>

            <!-- Navigation Tabs -->
            <div style="display:flex;gap:8px;border-bottom:2px solid #f5f0e6;margin-bottom:28px;padding-bottom:12px;overflow-x:auto;">
                <button type="button" class="krushna-tab-btn active" onclick="krushnaSwitchTab(event, 'tab-hero')">1. Hero Section</button>
                <button type="button" class="krushna-tab-btn" onclick="krushnaSwitchTab(event, 'tab-destinations')">2. Destinations Strip</button>
                <button type="button" class="krushna-tab-btn" onclick="krushnaSwitchTab(event, 'tab-residences')">3. Residences & Perspectives</button>
                <button type="button" class="krushna-tab-btn" onclick="krushnaSwitchTab(event, 'tab-philosophy')">4. Philosophy & Pillars</button>
                <button type="button" class="krushna-tab-btn" onclick="krushnaSwitchTab(event, 'tab-contact')">5. Contact & Footer</button>
            </div>

            <!-- TAB 1: HERO SECTION -->
            <div id="tab-hero" class="krushna-tab-content" style="display:block;">
                <h2 style="font-size:18px;font-weight:700;color:#1c1917;margin-bottom:20px;border-bottom:1px solid #f5f0e6;padding-bottom:8px;">Hero Section &amp; Main Banner</h2>
                
                <table class="form-table" role="presentation">
                    <tr>
                        <th scope="row"><label for="hero_eyebrow">Eyebrow Badge Text</label></th>
                        <td>
                            <input type="text" id="hero_eyebrow" name="krushna_theme_options[hero_eyebrow]" value="<?php echo esc_attr( $opt['hero_eyebrow'] ?? 'Zurich · Milan · Aspen · Costa Brava' ); ?>" class="regular-text" />
                            <p class="description">Small pill badge shown above the main title.</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="hero_headline_1">Headline (Line 1)</label></th>
                        <td>
                            <input type="text" id="hero_headline_1" name="krushna_theme_options[hero_headline_1]" value="<?php echo esc_attr( $opt['hero_headline_1'] ?? 'EXQUISITE LIVING,' ); ?>" class="regular-text" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="hero_headline_2">Headline (Line 2)</label></th>
                        <td>
                            <input type="text" id="hero_headline_2" name="krushna_theme_options[hero_headline_2]" value="<?php echo esc_attr( $opt['hero_headline_2'] ?? 'REDEFINED' ); ?>" class="regular-text" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="hero_subhead">Hero Subtitle</label></th>
                        <td>
                            <textarea id="hero_subhead" name="krushna_theme_options[hero_subhead]" rows="3" class="large-text"><?php echo esc_textarea( $opt['hero_subhead'] ?? "Bespoke residences and monolithic architectural ventures in the world's most coveted destinations." ); ?></textarea>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="hero_video_url">Background Video URL (MP4)</label></th>
                        <td>
                            <input type="url" id="hero_video_url" name="krushna_theme_options[hero_video_url]" value="<?php echo esc_attr( $opt['hero_video_url'] ?? 'https://assets.mixkit.co/videos/preview/mixkit-modern-building-with-glass-facade-42998-large.mp4' ); ?>" class="large-text" />
                            <p class="description">Direct link to an MP4 video file for ambient background playback.</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="hero_render_img">Main Hero Render Image</label></th>
                        <td>
                            <input type="text" id="hero_render_img" name="krushna_theme_options[hero_render_img]" value="<?php echo esc_attr( $opt['hero_render_img'] ?? 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=85' ); ?>" class="regular-text" />
                            <button type="button" class="button krushna-upload-btn" data-target="#hero_render_img">Upload / Choose Image</button>
                            <p class="description">Featured showcase villa render displayed in the double-bezel hero frame.</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="hero_render_caption">Hero Render Caption</label></th>
                        <td>
                            <input type="text" id="hero_render_caption" name="krushna_theme_options[hero_render_caption]" value="<?php echo esc_attr( $opt['hero_render_caption'] ?? 'Lucerne Cantilever · 8,400 sq ft' ); ?>" class="regular-text" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="hero_cta_text">Primary Button Text</label></th>
                        <td>
                            <input type="text" id="hero_cta_text" name="krushna_theme_options[hero_cta_text]" value="<?php echo esc_attr( $opt['hero_cta_text'] ?? 'Explore Portfolio' ); ?>" class="regular-text" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="hero_cta_link">Primary Button Link</label></th>
                        <td>
                            <input type="text" id="hero_cta_link" name="krushna_theme_options[hero_cta_link]" value="<?php echo esc_attr( $opt['hero_cta_link'] ?? '#destinations' ); ?>" class="regular-text" />
                        </td>
                    </tr>
                </table>
            </div>

            <!-- TAB 2: DESTINATIONS -->
            <div id="tab-destinations" class="krushna-tab-content" style="display:none;">
                <h2 style="font-size:18px;font-weight:700;color:#1c1917;margin-bottom:20px;border-bottom:1px solid #f5f0e6;padding-bottom:8px;">Destination Cards (3 Showcase Cards)</h2>
                
                <h3 style="font-size:15px;font-weight:700;color:#8c6a2c;">Destination Card 1</h3>
                <table class="form-table">
                    <tr><th>Title</th><td><input type="text" name="krushna_theme_options[dest1_title]" value="<?php echo esc_attr( $opt['dest1_title'] ?? 'Zurich' ); ?>" class="regular-text"></td></tr>
                    <tr><th>Subtitle Tag</th><td><input type="text" name="krushna_theme_options[dest1_sub]" value="<?php echo esc_attr( $opt['dest1_sub'] ?? 'Modern Elegance' ); ?>" class="regular-text"></td></tr>
                    <tr><th>Image URL</th><td><input type="text" id="dest1_img" name="krushna_theme_options[dest1_img]" value="<?php echo esc_attr( $opt['dest1_img'] ?? 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&w=800&q=80' ); ?>" class="regular-text"> <button type="button" class="button krushna-upload-btn" data-target="#dest1_img">Upload Image</button></td></tr>
                </table>

                <h3 style="font-size:15px;font-weight:700;color:#8c6a2c;margin-top:24px;">Destination Card 2</h3>
                <table class="form-table">
                    <tr><th>Title</th><td><input type="text" name="krushna_theme_options[dest2_title]" value="<?php echo esc_attr( $opt['dest2_title'] ?? 'Costa Brava' ); ?>" class="regular-text"></td></tr>
                    <tr><th>Subtitle Tag</th><td><input type="text" name="krushna_theme_options[dest2_sub]" value="<?php echo esc_attr( $opt['dest2_sub'] ?? 'Coastal Luxury' ); ?>" class="regular-text"></td></tr>
                    <tr><th>Image URL</th><td><input type="text" id="dest2_img" name="krushna_theme_options[dest2_img]" value="<?php echo esc_attr( $opt['dest2_img'] ?? 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80' ); ?>" class="regular-text"> <button type="button" class="button krushna-upload-btn" data-target="#dest2_img">Upload Image</button></td></tr>
                </table>

                <h3 style="font-size:15px;font-weight:700;color:#8c6a2c;margin-top:24px;">Destination Card 3</h3>
                <table class="form-table">
                    <tr><th>Title</th><td><input type="text" name="krushna_theme_options[dest3_title]" value="<?php echo esc_attr( $opt['dest3_title'] ?? 'Aspen' ); ?>" class="regular-text"></td></tr>
                    <tr><th>Subtitle Tag</th><td><input type="text" name="krushna_theme_options[dest3_sub]" value="<?php echo esc_attr( $opt['dest3_sub'] ?? 'Mountain Retreat' ); ?>" class="regular-text"></td></tr>
                    <tr><th>Image URL</th><td><input type="text" id="dest3_img" name="krushna_theme_options[dest3_img]" value="<?php echo esc_attr( $opt['dest3_img'] ?? 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80' ); ?>" class="regular-text"> <button type="button" class="button krushna-upload-btn" data-target="#dest3_img">Upload Image</button></td></tr>
                </table>
            </div>

            <!-- TAB 3: RESIDENCES & PERSPECTIVES -->
            <div id="tab-residences" class="krushna-tab-content" style="display:none;">
                <h2 style="font-size:18px;font-weight:700;color:#1c1917;margin-bottom:20px;border-bottom:1px solid #f5f0e6;padding-bottom:8px;">Monolithic Residences &amp; Perspective Carousel</h2>
                <table class="form-table">
                    <tr><th>Section Eyebrow</th><td><input type="text" name="krushna_theme_options[res_eyebrow]" value="<?php echo esc_attr( $opt['res_eyebrow'] ?? 'Monolithic Residences' ); ?>" class="regular-text"></td></tr>
                    <tr><th>Section Title</th><td><textarea name="krushna_theme_options[res_title]" rows="2" class="large-text"><?php echo esc_textarea( $opt['res_title'] ?? "Your Home, Your\nLegacy, Designed\nForever" ); ?></textarea></td></tr>
                    <tr><th>Section Description</th><td><textarea name="krushna_theme_options[res_desc]" rows="3" class="large-text"><?php echo esc_textarea( $opt['res_desc'] ?? "More than just a residence, <?php echo esc_html( get_bloginfo( 'name' ) ?: 'Aureo' ); ?> creates a reflection of timeless distinction — thoughtfully designed, expertly crafted, and engineered to inspire for generations to come." ); ?></textarea></td></tr>
                </table>

                <h3 style="font-size:15px;font-weight:700;color:#8c6a2c;margin-top:24px;">Perspective Slide 1</h3>
                <table class="form-table">
                    <tr><th>Title</th><td><input type="text" name="krushna_theme_options[p1_name]" value="<?php echo esc_attr( $opt['p1_name'] ?? 'Villa Solis Monograph' ); ?>" class="regular-text"></td></tr>
                    <tr><th>Location</th><td><input type="text" name="krushna_theme_options[p1_loc]" value="<?php echo esc_attr( $opt['p1_loc'] ?? 'Zurich, Switzerland' ); ?>" class="regular-text"></td></tr>
                    <tr><th>Image URL</th><td><input type="text" id="p1_img" name="krushna_theme_options[p1_img]" value="<?php echo esc_attr( $opt['p1_img'] ?? 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85' ); ?>" class="regular-text"> <button type="button" class="button krushna-upload-btn" data-target="#p1_img">Upload Image</button></td></tr>
                </table>

                <h3 style="font-size:15px;font-weight:700;color:#8c6a2c;margin-top:24px;">Perspective Slide 2</h3>
                <table class="form-table">
                    <tr><th>Title</th><td><input type="text" name="krushna_theme_options[p2_name]" value="<?php echo esc_attr( $opt['p2_name'] ?? 'The Horizon Cantilever Villa' ); ?>" class="regular-text"></td></tr>
                    <tr><th>Location</th><td><input type="text" name="krushna_theme_options[p2_loc]" value="<?php echo esc_attr( $opt['p2_loc'] ?? 'Lucerne, Switzerland' ); ?>" class="regular-text"></td></tr>
                    <tr><th>Image URL</th><td><input type="text" id="p2_img" name="krushna_theme_options[p2_img]" value="<?php echo esc_attr( $opt['p2_img'] ?? 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85' ); ?>" class="regular-text"> <button type="button" class="button krushna-upload-btn" data-target="#p2_img">Upload Image</button></td></tr>
                </table>

                <h3 style="font-size:15px;font-weight:700;color:#8c6a2c;margin-top:24px;">Perspective Slide 3</h3>
                <table class="form-table">
                    <tr><th>Title</th><td><input type="text" name="krushna_theme_options[p3_name]" value="<?php echo esc_attr( $opt['p3_name'] ?? 'Aspen Ridge Monolith' ); ?>" class="regular-text"></td></tr>
                    <tr><th>Location</th><td><input type="text" name="krushna_theme_options[p3_loc]" value="<?php echo esc_attr( $opt['p3_loc'] ?? 'Aspen, Colorado' ); ?>" class="regular-text"></td></tr>
                    <tr><th>Image URL</th><td><input type="text" id="p3_img" name="krushna_theme_options[p3_img]" value="<?php echo esc_attr( $opt['p3_img'] ?? 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85' ); ?>" class="regular-text"> <button type="button" class="button krushna-upload-btn" data-target="#p3_img">Upload Image</button></td></tr>
                </table>
            </div>

            <!-- TAB 4: PHILOSOPHY & PILLARS -->
            <div id="tab-philosophy" class="krushna-tab-content" style="display:none;">
                <h2 style="font-size:18px;font-weight:700;color:#1c1917;margin-bottom:20px;border-bottom:1px solid #f5f0e6;padding-bottom:8px;">Spatial Philosophy &amp; Principles</h2>
                <table class="form-table">
                    <tr><th>Section Title</th><td><input type="text" name="krushna_theme_options[phil_title]" value="<?php echo esc_attr( $opt['phil_title'] ?? 'Built for permanence. Designed for serenity.' ); ?>" class="large-text"></td></tr>
                    <tr><th>Section Description</th><td><textarea name="krushna_theme_options[phil_desc]" rows="2" class="large-text"><?php echo esc_textarea( $opt['phil_desc'] ?? 'Every architectural gesture is governed by timeless proportion, topography resonance, and monolithic permanence.' ); ?></textarea></td></tr>
                </table>

                <h3 style="font-size:15px;font-weight:700;color:#8c6a2c;margin-top:24px;">Pillar 1</h3>
                <table class="form-table">
                    <tr><th>Title</th><td><input type="text" name="krushna_theme_options[p1_title]" value="<?php echo esc_attr( $opt['p1_title'] ?? 'Pure Structural Honesty' ); ?>" class="regular-text"></td></tr>
                    <tr><th>Detail</th><td><textarea name="krushna_theme_options[p1_detail]" rows="2" class="large-text"><?php echo esc_textarea( $opt['p1_detail'] ?? 'Every line and cantilever serves a functional architectural purpose, stripping away ornamentation to reveal the beauty of load-bearing truth.' ); ?></textarea></td></tr>
                </table>

                <h3 style="font-size:15px;font-weight:700;color:#8c6a2c;margin-top:24px;">Pillar 2</h3>
                <table class="form-table">
                    <tr><th>Title</th><td><input type="text" name="krushna_theme_options[p2_title]" value="<?php echo esc_attr( $opt['p2_title'] ?? 'Sensory Light Orchestration' ); ?>" class="regular-text"></td></tr>
                    <tr><th>Detail</th><td><textarea name="krushna_theme_options[p2_detail]" rows="2" class="large-text"><?php echo esc_textarea( $opt['p2_detail'] ?? 'Oriented meticulously to track the diurnal path of the sun, casting dynamic geometric shadow patterns across living surfaces throughout the day.' ); ?></textarea></td></tr>
                </table>

                <h3 style="font-size:15px;font-weight:700;color:#8c6a2c;margin-top:24px;">Pillar 3</h3>
                <table class="form-table">
                    <tr><th>Title</th><td><input type="text" name="krushna_theme_options[p3_title]" value="<?php echo esc_attr( $opt['p3_title'] ?? 'Permanent Materiality' ); ?>" class="regular-text"></td></tr>
                    <tr><th>Detail</th><td><textarea name="krushna_theme_options[p3_detail]" rows="2" class="large-text"><?php echo esc_textarea( $opt['p3_detail'] ?? 'Constructed with low-carbon architectural concrete, volcanic basalt, brushed titanium, and aged teak — materials that only improve with time.' ); ?></textarea></td></tr>
                </table>
            </div>

            <!-- TAB 5: CONTACT & FOOTER -->
            <div id="tab-contact" class="krushna-tab-content" style="display:none;">
                <h2 style="font-size:18px;font-weight:700;color:#1c1917;margin-bottom:20px;border-bottom:1px solid #f5f0e6;padding-bottom:8px;">Contact &amp; Footer Information</h2>
                <table class="form-table">
                    <tr><th>Inquiry &amp; Concierge Email</th><td><input type="email" name="krushna_theme_options[concierge_email]" value="<?php echo esc_attr( $opt['concierge_email'] ?? get_option( 'admin_email' ) ); ?>" class="regular-text"></td></tr>
                    <tr><th>Phone / WhatsApp</th><td><input type="text" name="krushna_theme_options[contact_phone]" value="<?php echo esc_attr( $opt['contact_phone'] ?? '+91 98765 43210' ); ?>" class="regular-text"></td></tr>
                    <tr><th>Office Locations</th><td><input type="text" name="krushna_theme_options[footer_locations]" value="<?php echo esc_attr( $opt['footer_locations'] ?? 'Zurich · Milan · Malibu · Tokyo · Aspen' ); ?>" class="large-text"></td></tr>
                    <tr><th>Footer Copyright Text</th><td><input type="text" name="krushna_theme_options[footer_copyright]" value="<?php echo esc_attr( $opt['footer_copyright'] ?? '© ' . date('Y') . ' ' . ( get_bloginfo( 'name' ) ?: 'Aureo' ) . '. All rights reserved.' ); ?>" class="large-text"></td></tr>
                </table>
            </div>

            <div style="margin-top:32px;padding-top:20px;border-top:1px solid #f5f0e6;">
                <?php submit_button( 'Save All Changes', 'primary', 'submit', false, array( 'style' => 'background:#1c1917;border-color:#1c1917;padding:8px 24px;font-size:14px;border-radius:8px;' ) ); ?>
            </div>
        </form>
    </div>

    <style>
    .krushna-tab-btn {
        background: none;
        border: none;
        padding: 10px 18px;
        font-size: 13px;
        font-weight: 600;
        color: #78716c;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    .krushna-tab-btn:hover {
        background: #f5f0e6;
        color: #1c1917;
    }
    .krushna-tab-btn.active {
        background: #1c1917;
        color: #fff;
    }
    </style>

    <script>
    function krushnaSwitchTab(e, tabId) {
        document.querySelectorAll('.krushna-tab-content').forEach(function(el){ el.style.display = 'none'; });
        document.querySelectorAll('.krushna-tab-btn').forEach(function(btn){ btn.classList.remove('active'); });
        var target = document.getElementById(tabId);
        if(target) target.style.display = 'block';
        e.currentTarget.classList.add('active');
    }

    jQuery(document).ready(function($){
        $('.krushna-upload-btn').click(function(e) {
            e.preventDefault();
            var targetInput = $(this).data('target');
            var customUploader = wp.media({
                title: 'Select or Upload Image',
                button: { text: 'Use this Image' },
                multiple: false
            }).on('select', function() {
                var attachment = customUploader.state().get('selection').first().toJSON();
                $(targetInput).val(attachment.url);
            }).open();
        });
    });
    </script>
    <?php
}

/**
 * 7. Reading Time Calculation Helper
 */
function aureo_get_reading_time( $post_id ) {
    $content = get_post_field( 'post_content', $post_id );
    $word_count = str_word_count( strip_tags( $content ) );
    $reading_time = ceil( $word_count / 200 );
    return max( 1, $reading_time ) . ' min read';
}

/**
 * 8. AJAX Form Handler for Inquiries
 */
function aureo_handle_inquiry_submission() {
    check_ajax_referer( 'aureo_inquiry_nonce', 'nonce' );

    $name     = sanitize_text_field( $_POST['fullName'] ?? '' );
    $email    = sanitize_email( $_POST['email'] ?? '' );
    $location = sanitize_text_field( $_POST['location'] ?? 'General' );
    $bracket  = sanitize_text_field( $_POST['bracket'] ?? '$25M - $50M' );
    $phone    = sanitize_text_field( $_POST['phone'] ?? '' );
    $notes    = sanitize_textarea_field( $_POST['notes'] ?? '' );

    if ( empty( $email ) || ! is_email( $email ) ) {
        wp_send_json_error( array( 'message' => 'Please provide a valid email address.' ) );
        exit;
    }

    $to      = krushna_opt( 'concierge_email', get_option( 'admin_email' ) );
    $subject = sprintf( '[%s] New Inquiry: %s (%s)', $name, $location );
    $body    = sprintf(
        "A new confidential inquiry has been submitted:\n\nName: %s\nEmail: %s\nPhone: %s\nTerritory: %s\nInvestment Tier: %s\n\nNotes:\n%s",
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
        'message' => 'Inquiry submitted successfully.'
    ) );
}
add_action( 'wp_ajax_aureo_submit_inquiry', 'aureo_handle_inquiry_submission' );
add_action( 'wp_ajax_nopriv_aureo_submit_inquiry', 'aureo_handle_inquiry_submission' );
