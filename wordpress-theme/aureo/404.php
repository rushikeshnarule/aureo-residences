<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @package Aureo
 */

get_header();
?>

<main class="w-full pt-44 pb-32 bg-stone-50 min-h-screen flex items-center justify-center text-center">
    <div class="max-w-xl mx-auto px-6">
        <span class="text-xs uppercase tracking-widest font-bold text-aureo-gold-700 block mb-3">404 · Uncharted Horizon</span>
        <h1 class="text-4xl sm:text-6xl font-serif font-bold text-aureo-dark tracking-tight mb-4">
            Sanctuary Not Found
        </h1>
        <p class="text-sm sm:text-base text-aureo-muted mb-8 leading-relaxed font-light">
            The architectural monograph or territory you are looking for has been archived or does not exist.
        </p>
        <div class="flex items-center justify-center gap-4">
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="px-8 py-3.5 rounded-full bg-aureo-gold-600 hover:bg-aureo-gold-700 text-white text-xs font-bold uppercase tracking-widest transition-all shadow-md">
                Return to Atelier
            </a>
        </div>
    </div>
</main>

<?php
get_footer();
