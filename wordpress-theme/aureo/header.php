<!doctype html>
<html <?php language_attributes(); ?> class="scroll-smooth">
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <?php wp_head(); ?>
</head>
<body <?php body_class( 'bg-white text-aureo-dark font-sans antialiased selection:bg-aureo-gold-500 selection:text-white overflow-x-hidden' ); ?>>
<?php wp_body_open(); ?>

<!-- Top Scroll Progress Bar -->
<div id="scroll-progress" class="fixed top-0 left-0 right-0 h-[2.5px] bg-aureo-gold-500 z-50 origin-left scale-x-0 transition-transform duration-75"></div>

<!-- Sticky Header -->
<header id="site-header" class="fixed top-0 left-0 right-0 z-40 transition-all duration-300 py-5 sm:py-6">
    <div class="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 flex items-center justify-between">
        
        <!-- Left Quick Navigation (Desktop) -->
        <nav class="hidden md:flex items-center space-x-8 text-xs font-semibold uppercase tracking-widest text-white/90">
            <a href="<?php echo esc_url( home_url( '/#destinations' ) ); ?>" class="hover:text-aureo-gold-300 transition-colors">Properties</a>
            <a href="<?php echo esc_url( home_url( '/#philosophy' ) ); ?>" class="hover:text-aureo-gold-300 transition-colors">Studio</a>
        </nav>

        <!-- Center Brand Serif Wordmark -->
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="text-white text-xl md:text-2xl font-serif font-bold tracking-[0.3em] uppercase hover:text-aureo-gold-300 transition-colors select-none text-center">
            A U R E O
        </a>

        <!-- Right Navigation & Quick Inquire CTA -->
        <div class="flex items-center space-x-4 sm:space-x-8">
            <nav class="hidden md:flex items-center space-x-8 text-xs font-semibold uppercase tracking-widest text-white/90">
                <a href="<?php echo esc_url( home_url( '/#details' ) ); ?>" class="hover:text-aureo-gold-300 transition-colors">About</a>
                <a href="<?php echo esc_url( home_url( '/#journal' ) ); ?>" class="hover:text-aureo-gold-300 transition-colors">Journal</a>
                <a href="<?php echo esc_url( home_url( '/#inquire' ) ); ?>" class="hover:text-aureo-gold-300 transition-colors">Contact</a>
            </nav>

            <!-- Inquire Button -->
            <button type="button" onclick="aureoOpenInquiry('Zurich')" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-aureo-gold-600 hover:bg-aureo-gold-500 text-white text-[11px] font-bold uppercase tracking-widest transition-all shadow-md active:scale-95 border border-aureo-gold-400/50 cursor-pointer">
                <i data-lucide="sparkles" class="w-3 h-3 text-white"></i>
                <span class="hidden xs:inline">Inquire</span>
            </button>

            <!-- Custom 3-Line Menu Burger Button -->
            <button type="button" id="aureo-burger-btn" onclick="aureoToggleMenu()" class="aureo-menu-burger" aria-label="Toggle navigation menu">
                <span class="line-1"></span>
                <span class="line-2"></span>
                <span class="line-3"></span>
            </button>
        </div>
    </div>
</header>

<!-- Fullscreen Menu Drawer Overlay (Hidden by default) -->
<div id="menu-drawer" style="display: none;" class="fixed inset-0 z-50 hero-gradient text-white p-6 sm:p-10 md:p-16 overflow-y-auto flex-col justify-between">
    <div class="flex items-center justify-between max-w-7xl mx-auto w-full">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="text-xl md:text-2xl font-serif font-bold tracking-[0.3em] uppercase select-none text-white">A U R E O</a>
        <button type="button" onclick="aureoToggleMenu()" class="w-11 h-11 rounded-full border border-white/25 flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all cursor-pointer" aria-label="Close menu">
            <i data-lucide="x" class="w-6 h-6 text-white"></i>
        </button>
    </div>

    <div class="max-w-7xl mx-auto w-full my-auto py-10 sm:py-14">
        <nav class="flex flex-col space-y-4 sm:space-y-6">
            <a href="<?php echo esc_url( home_url( '/#destinations' ) ); ?>" onclick="aureoToggleMenu()" class="group flex items-center justify-between py-2 border-b border-white/10 text-2xl sm:text-5xl md:text-6xl font-serif font-bold text-white/90 hover:text-white transition-all">
                <span>01. Residences & Destinations</span>
                <i data-lucide="arrow-up-right" class="opacity-0 group-hover:opacity-100 transition-opacity text-aureo-gold-400 w-8 h-8"></i>
            </a>
            <a href="<?php echo esc_url( home_url( '/#philosophy' ) ); ?>" onclick="aureoToggleMenu()" class="group flex items-center justify-between py-2 border-b border-white/10 text-2xl sm:text-5xl md:text-6xl font-serif font-bold text-white/90 hover:text-white transition-all">
                <span>02. Spatial Philosophy</span>
                <i data-lucide="arrow-up-right" class="opacity-0 group-hover:opacity-100 transition-opacity text-aureo-gold-400 w-8 h-8"></i>
            </a>
            <a href="<?php echo esc_url( home_url( '/#details' ) ); ?>" onclick="aureoToggleMenu()" class="group flex items-center justify-between py-2 border-b border-white/10 text-2xl sm:text-5xl md:text-6xl font-serif font-bold text-white/90 hover:text-white transition-all">
                <span>03. Curated Dossiers</span>
                <i data-lucide="arrow-up-right" class="opacity-0 group-hover:opacity-100 transition-opacity text-aureo-gold-400 w-8 h-8"></i>
            </a>
            <a href="<?php echo esc_url( home_url( '/#journal' ) ); ?>" onclick="aureoToggleMenu()" class="group flex items-center justify-between py-2 border-b border-white/10 text-2xl sm:text-5xl md:text-6xl font-serif font-bold text-white/90 hover:text-white transition-all">
                <span>04. Journal & Monographs</span>
                <i data-lucide="arrow-up-right" class="opacity-0 group-hover:opacity-100 transition-opacity text-aureo-gold-400 w-8 h-8"></i>
            </a>
            <a href="<?php echo esc_url( home_url( '/#inquire' ) ); ?>" onclick="aureoToggleMenu()" class="group flex items-center justify-between py-2 border-b border-white/10 text-2xl sm:text-5xl md:text-6xl font-serif font-bold text-white/90 hover:text-white transition-all">
                <span>05. Private Acquisition Registry</span>
                <i data-lucide="arrow-up-right" class="opacity-0 group-hover:opacity-100 transition-opacity text-aureo-gold-400 w-8 h-8"></i>
            </a>
        </nav>
    </div>

    <div class="max-w-7xl mx-auto w-full pt-6 sm:pt-8 border-t border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs sm:text-sm text-white/80">
        <div>
            <p class="text-white font-medium mb-0.5">Aureo Architecture & Bespoke Estates</p>
            <p class="text-white/60">Zurich · Milan · Malibu · Tokyo · Aspen</p>
        </div>
        <div>
            <span class="text-white/60 uppercase tracking-widest block text-[11px]">Confidential Inquiries</span>
            <a href="mailto:inquiries@aureo-residences.com" class="text-aureo-gold-300 font-medium hover:underline">inquiries@aureo-residences.com</a>
        </div>
    </div>
</div>
