<?php
/**
 * The main template file for blog archives and index listings.
 *
 * @package Aureo
 */

get_header();
?>

<main class="w-full pt-36 pb-24 bg-stone-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
        
        <!-- Header -->
        <div class="max-w-3xl mb-16">
            <span class="text-xs uppercase tracking-widest font-bold text-aureo-gold-700 block mb-2">Architectural Journal</span>
            <h1 class="text-4xl sm:text-6xl font-serif font-bold text-aureo-dark tracking-tight">Monographs & Research</h1>
            <p class="text-sm sm:text-base text-aureo-muted mt-4 font-light">
                Essays on spatial harmony, material permanence, and contemporary monolithic residential architecture.
            </p>
        </div>

        <!-- Post Loop Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <?php
            if ( have_posts() ) :
                while ( have_posts() ) : the_post();
                    $thumb_url = has_post_thumbnail() ? get_the_post_thumbnail_url( get_the_ID(), 'aureo-card' ) : 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80';
                    $category  = get_the_category();
                    $cat_name  = ! empty( $category ) ? $category[0]->name : 'Essays';
                    ?>
                    <article class="group flex flex-col rounded-3xl overflow-hidden bg-white border border-stone-200/80 shadow-sm hover:shadow-xl transition-all">
                        <a href="<?php the_permalink(); ?>" class="relative aspect-[16/10] overflow-hidden bg-stone-900 block">
                            <img src="<?php echo esc_url( $thumb_url ); ?>" alt="<?php the_title_attribute(); ?>" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                            <div class="absolute top-3.5 left-3.5">
                                <span class="px-3 py-1 rounded-full bg-white/90 text-[10px] font-bold text-aureo-dark uppercase tracking-wide"><?php echo esc_html( $cat_name ); ?></span>
                            </div>
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
                                <span class="text-[11px] font-semibold text-stone-700"><?php the_author(); ?></span>
                                <a href="<?php the_permalink(); ?>" class="font-bold text-aureo-gold-700 flex items-center gap-1">Read Monograph <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i></a>
                            </div>
                        </div>
                    </article>
                    <?php
                endwhile;

                the_posts_pagination( array(
                    'prev_text' => __( '← Previous', 'aureo' ),
                    'next_text' => __( 'Next →', 'aureo' ),
                    'class'     => 'col-span-full py-12 flex justify-center gap-2',
                ) );
            else :
                echo '<p class="text-stone-500">No architectural posts published yet.</p>';
            endif;
            ?>
        </div>

    </div>
</main>

<?php
get_footer();
