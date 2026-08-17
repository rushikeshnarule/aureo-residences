<?php
/**
 * The template for displaying all pages.
 *
 * @package Aureo
 */

get_header();
?>

<main class="w-full pt-36 pb-24 bg-white min-h-screen">
    <div class="max-w-4xl mx-auto px-6 sm:px-10">
        <?php
        while ( have_posts() ) : the_post();
            ?>
            <div class="mb-10 text-center">
                <h1 class="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-aureo-dark tracking-tight leading-[1.1]">
                    <?php the_title(); ?>
                </h1>
            </div>

            <?php if ( has_post_thumbnail() ) : ?>
                <div class="my-10 rounded-3xl overflow-hidden shadow-xl aspect-[16/9] bg-stone-900">
                    <?php the_post_thumbnail( 'aureo-hero', array( 'class' => 'w-full h-full object-cover' ) ); ?>
                </div>
            <?php endif; ?>

            <div class="prose prose-stone max-w-none text-stone-700 leading-relaxed font-light text-base sm:text-lg space-y-6">
                <?php the_content(); ?>
            </div>
        <?php endwhile; ?>
    </div>
</main>

<?php
get_footer();
