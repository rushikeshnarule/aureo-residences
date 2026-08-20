<!doctype html>
<html <?php language_attributes(); ?> class="scroll-smooth">
<head>
    <meta charset="<?php bloginfo( "charset" ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <?php wp_head(); ?>
</head>
<body <?php body_class( "bg-white text-aureo-dark antialiased overflow-x-hidden" ); ?>>
<?php wp_body_open(); ?>

<!-- Scroll Progress Bar -->
<div id="scroll-progress"></div>

<!-- Floating Island Navbar -->
<header id="site-header">
    <div id="site-header-inner">

        <!-- Left Navigation (Desktop) -->
        <nav class="navbar-left navbar-nav">
            <a href="<?php echo esc_url( home_url( "/#destinations" ) ); ?>" class="nav-link">Properties</a>
            <a href="<?php echo esc_url( home_url( "/#philosophy" ) ); ?>" class="nav-link">Studio</a>
        </nav>

        <!-- Center Brand Serif Wordmark -->
        <a href="<?php echo esc_url( home_url( "/" ) ); ?>" class="brand-wordmark">
            <?php echo esc_html( get_bloginfo( "name" ) ?: "A U R E O" ); ?>
        </a>

        <!-- Right Navigation & Inquiry Trigger -->
        <div class="navbar-right">
            <nav class="navbar-nav">
                <a href="<?php echo esc_url( home_url( "/#details" ) ); ?>" class="nav-link">Dossiers</a>
                <a href="<?php echo esc_url( home_url( "/#journal" ) ); ?>" class="nav-link">Journal</a>
            </nav>

            <!-- Contact Atelier Button -->
            <a href="<?php echo esc_url( home_url( "/#contact" ) ); ?>" class="navbar-inquire-btn" aria-label="Contact Atelier">
                <span>Contact</span>
                <span class="navbar-inquire-icon">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </span>
            </a>

            <!-- 2-line Animated Hamburger -->
            <button type="button" id="aureo-burger-btn" onclick="aureoToggleMenu()" class="aureo-menu-burger" aria-label="Toggle navigation menu">
                <span class="line-1"></span>
                <span class="line-2"></span>
            </button>
        </div>

    </div>
</header>

<!-- Menu Drawer — warm light bg slide-in -->
<div id="menu-drawer">
    <div style="display:flex;align-items:center;justify-content:space-between;max-width:80rem;margin:0 auto;width:100%;">
        <a href="<?php echo esc_url( home_url( "/" ) ); ?>"
            style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.15rem;font-weight:700;letter-spacing:0.32em;text-transform:uppercase;color:#1c1917;text-decoration:none;">
            <?php echo esc_html( get_bloginfo( "name" ) ?: "A U R E O" ); ?>
        </a>
        <button type="button" onclick="aureoToggleMenu()"
            style="width:2.75rem;height:2.75rem;border-radius:9999px;border:1px solid rgba(28,25,23,0.15);display:flex;align-items:center;justify-content:center;background:none;cursor:pointer;transition:background 0.2s;"
            aria-label="Close menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1c1917" stroke-width="1.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
    </div>

    <div style="max-width:80rem;margin:0 auto;width:100%;padding:2.5rem 0;">
        <nav style="display:flex;flex-direction:column;gap:0;">
            <a href="<?php echo esc_url( home_url( "/#destinations" ) ); ?>" onclick="aureoToggleMenu()" class="menu-drawer-nav-link">
                <span>01. Residences &amp; Destinations</span>
                <span class="menu-drawer-arrow">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </span>
            </a>
            <a href="<?php echo esc_url( home_url( "/#philosophy" ) ); ?>" onclick="aureoToggleMenu()" class="menu-drawer-nav-link">
                <span>02. Spatial Philosophy</span>
                <span class="menu-drawer-arrow">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </span>
            </a>
            <a href="<?php echo esc_url( home_url( "/#details" ) ); ?>" onclick="aureoToggleMenu()" class="menu-drawer-nav-link">
                <span>03. Curated Dossiers</span>
                <span class="menu-drawer-arrow">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </span>
            </a>
            <a href="<?php echo esc_url( home_url( "/#journal" ) ); ?>" onclick="aureoToggleMenu()" class="menu-drawer-nav-link">
                <span>04. Journal &amp; Monographs</span>
                <span class="menu-drawer-arrow">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </span>
            </a>
            <a href="<?php echo esc_url( home_url( "/#contact" ) ); ?>" onclick="aureoToggleMenu()" class="menu-drawer-nav-link">
                <span>05. Private Acquisition Registry</span>
                <span class="menu-drawer-arrow">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </span>
            </a>
        </nav>
    </div>

    <div style="max-width:80rem;margin:0 auto;width:100%;border-top:1px solid rgba(28,25,23,0.1);padding-top:1.5rem;display:flex;align-items:center;justify-content:space-between;font-size:0.75rem;color:#78716c;">
        <span><?php echo esc_html( get_bloginfo( "name" ) ?: "Aureo Residences" ); ?></span>
        <span>Zurich · Milan · Aspen · Costa Brava</span>
    </div>
</div>