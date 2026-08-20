<!doctype html>
<html <?php language_attributes(); ?> class="scroll-smooth">
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <?php wp_head(); ?>
</head>
<body <?php body_class( 'bg-white text-aureo-dark antialiased overflow-x-hidden' ); ?>>
<?php wp_body_open(); ?>

<!-- Scroll Progress Bar -->
<div id="scroll-progress"></div>

<!-- Floating Island Navbar -->
<header id="site-header">
    <div id="site-header-inner">

        <!-- Left Navigation (Desktop) -->
        <nav class="hidden md:flex items-center" style="gap:1.75rem;">
            <a href="<?php echo esc_url( home_url( '/#destinations' ) ); ?>" class="nav-link">Properties</a>
            <a href="<?php echo esc_url( home_url( '/#philosophy' ) ); ?>" class="nav-link">Studio</a>
        </nav>

        <!-- Center Brand Serif Wordmark -->
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="brand-wordmark">
            A U R E O
        </a>

        <!-- Right Navigation & Inquiry Trigger -->
        <div class="flex items-center" style="gap:0.75rem;">
            <nav class="hidden md:flex items-center" style="gap:1.5rem;">
                <a href="<?php echo esc_url( home_url( '/#details' ) ); ?>" class="nav-link">Dossiers</a>
                <a href="<?php echo esc_url( home_url( '/#journal' ) ); ?>" class="nav-link">Journal</a>
            </nav>

            <!-- "Button-in-button" Inquire CTA -->
            <button type="button" onclick="aureoOpenInquiry('General')"
                class="navbar-inquire-btn hidden sm:inline-flex" aria-label="Open inquiry">
                <span>Inquire</span>
                <span class="navbar-inquire-icon">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </span>
            </button>

            <!-- 3-line Animated Hamburger -->
            <button type="button" id="aureo-burger-btn" onclick="aureoToggleMenu()"
                class="aureo-menu-burger" aria-label="Toggle navigation menu">
                <span class="line-1"></span>
                <span class="line-2"></span>
                <span class="line-3"></span>
            </button>
        </div>

    </div>
</header>

<!-- Menu Drawer — warm light bg slide-in -->
<div id="menu-drawer">
    <!-- Drawer Top Bar -->
    <div style="display:flex;align-items:center;justify-content:space-between;max-width:80rem;margin:0 auto;width:100%;">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>"
            style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.15rem;font-weight:700;letter-spacing:0.32em;text-transform:uppercase;color:#1c1917;text-decoration:none;">
            A U R E O
        </a>
        <button type="button" onclick="aureoToggleMenu()"
            style="width:2.75rem;height:2.75rem;border-radius:9999px;border:1px solid rgba(28,25,23,0.15);display:flex;align-items:center;justify-content:center;background:none;cursor:pointer;transition:background 0.2s;"
            onmouseover="this.style.background='rgba(0,0,0,0.05)'" onmouseout="this.style.background='none'"
            aria-label="Close menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1c1917" stroke-width="1.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
    </div>

    <!-- Large Serif Navigation Links -->
    <div style="max-width:80rem;margin:0 auto;width:100%;padding:2.5rem 0;">
        <nav style="display:flex;flex-direction:column;gap:0;">
            <a href="<?php echo esc_url( home_url( '/#destinations' ) ); ?>" onclick="aureoToggleMenu()" class="menu-drawer-nav-link">
                <span>01. Residences &amp; Destinations</span>
                <span class="menu-drawer-arrow">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </span>
            </a>
            <a href="<?php echo esc_url( home_url( '/#philosophy' ) ); ?>" onclick="aureoToggleMenu()" class="menu-drawer-nav-link">
                <span>02. Spatial Philosophy</span>
                <span class="menu-drawer-arrow">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </span>
            </a>
            <a href="<?php echo esc_url( home_url( '/#details' ) ); ?>" onclick="aureoToggleMenu()" class="menu-drawer-nav-link">
                <span>03. Curated Dossiers</span>
                <span class="menu-drawer-arrow">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </span>
            </a>
            <a href="<?php echo esc_url( home_url( '/#journal' ) ); ?>" onclick="aureoToggleMenu()" class="menu-drawer-nav-link">
                <span>04. Journal &amp; Monographs</span>
                <span class="menu-drawer-arrow">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </span>
            </a>
            <a href="<?php echo esc_url( home_url( '/#inquire' ) ); ?>" onclick="aureoToggleMenu()" class="menu-drawer-nav-link">
                <span>05. Private Acquisition Registry</span>
                <span class="menu-drawer-arrow">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </span>
            </a>
        </nav>
    </div>

    <!-- Drawer Footer -->
    <div style="max-width:80rem;margin:0 auto;width:100%;padding-top:1.5rem;border-top:1px solid rgba(28,25,23,0.1);display:flex;flex-direction:column;gap:1rem;">
        <div>
            <p style="font-size:0.8rem;font-weight:600;color:#1c1917;margin:0 0 4px 0;">Aureo Architecture &amp; Bespoke Estates</p>
            <p style="font-size:0.7rem;color:#78716c;margin:0;">Zurich · Milan · Malibu · Tokyo · Aspen</p>
        </div>
        <div>
            <span style="font-size:0.6rem;text-transform:uppercase;letter-spacing:0.2em;color:#78716c;display:block;margin-bottom:4px;">Confidential Inquiries</span>
            <a href="mailto:inquiries@aureo-residences.com"
                style="font-size:0.8rem;font-weight:500;color:var(--aureo-gold-700);text-decoration:none;">inquiries@aureo-residences.com</a>
        </div>
    </div>
</div>
