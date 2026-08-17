<?php
/**
 * The template for displaying search results.
 *
 * @package Aureo
 */

get_header();
?>

<main class="w-full pt-36 pb-24 bg-stone-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
        <div class="max-w-3xl mb-16">
            <span class="text-xs uppercase tracking-widest font-bold text-aureo-gold-700 block mb-2">Search Archives</span>
            <h1 class="text-3xl sm:text-5xl font-serif font-bold text-aureo-dark tracking-tight">
                Results for: &ldquo;<?php echo get_search_query(); ?>&rdquo;
            </h1>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <?php
            if ( have_posts() ) :
                while ( have_posts() ) : the_post();
                    $thumb_url = has_post_thumbnail() ? get_the_post_thumbnail_url( get_the_ID(), 'aureo-card' ) : 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80';
                    ?>
                    <article class="group flex flex-col rounded-3xl overflow-hidden bg-white border border-stone-200/80 shadow-sm hover:shadow-xl transition-all">
                        <a href="<?php the_permalink(); ?>" class="relative aspect-[16/10] overflow-hidden bg-stone-900 block">
                            <img src="<?php echo esc_url( $thumb_url ); ?>" alt="<?php the_title_attribute(); ?>" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        </a>
                        <div class="p-6 sm:p-7 flex flex-col justify-between flex-1">
                            <div>
                                <div class="text-[11px] text-stone-400 mb-2"><?php echo esc_html( get_the_date( 'F j, Y' ) ); ?></div>
                                <h2 class="text-xl font-serif font-bold text-aureo-dark group-hover:text-aureo-gold-700 transition-colors leading-snug">
                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                </h2>
                                <p class="mt-2.5 text-xs text-aureo-muted line-clamp-3 leading-relaxed font-light">
                                    <?php echo wp_strip_all_tags( get_the_excerpt() ); ?>
                                </p>
                            </div>
                            <div class="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                                <a href="<?php the_permalink(); ?>" class="font-bold text-aureo-gold-700 flex items-center gap-1">Read Result <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i></a>
                            </div>
                        </div>
                    </article>
                    <?php
                endwhile;
            else :
                echo '<p class="text-stone-500 col-span-full">No results found for your query. Try another search term.</p>';
            endif;
            ?>
        </div>
    </div>
</main>

<?php
get_footer();
