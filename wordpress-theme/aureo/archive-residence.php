<?php
/**
 * The template for displaying residence archives.
 *
 * @package Aureo
 */

get_header();
?>

<main class="w-full pt-36 pb-24 bg-stone-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
        <div class="max-w-3xl mb-16">
            <span class="text-xs uppercase tracking-widest font-bold text-aureo-gold-700 block mb-2">Monolithic Estates</span>
            <h1 class="text-4xl sm:text-6xl font-serif font-bold text-aureo-dark tracking-tight">Private Residences Portfolio</h1>
            <p class="text-sm sm:text-base text-aureo-muted mt-4 font-light">
                Explore our global collection of private estates engineered in Zurich, Costa Brava, and Aspen.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <?php
            if ( have_posts() ) :
                while ( have_posts() ) : the_post();
                    $thumb_url = has_post_thumbnail() ? get_the_post_thumbnail_url( get_the_ID(), 'aureo-card' ) : 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80';
                    $terms = get_the_terms( get_the_ID(), 'residence_location' );
                    $loc_name = ! empty( $terms ) ? $terms[0]->name : 'Exclusive Territory';
                    ?>
                    <article class="group flex flex-col rounded-3xl overflow-hidden bg-white border border-stone-200/80 shadow-sm hover:shadow-2xl transition-all">
                        <a href="<?php the_permalink(); ?>" class="relative aspect-[4/3] overflow-hidden bg-stone-900 block">
                            <img src="<?php echo esc_url( $thumb_url ); ?>" alt="<?php the_title_attribute(); ?>" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                            <div class="absolute top-4 left-4">
                                <span class="px-3.5 py-1 rounded-full bg-white/90 text-[10px] font-bold text-aureo-dark uppercase tracking-wide"><?php echo esc_html( $loc_name ); ?></span>
                            </div>
                        </a>
                        <div class="p-6 sm:p-8 flex flex-col justify-between flex-1">
                            <div>
                                <h2 class="text-2xl font-serif font-bold text-aureo-dark group-hover:text-aureo-gold-700 transition-colors leading-tight">
                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                </h2>
                                <p class="mt-3 text-xs sm:text-sm text-aureo-muted line-clamp-3 leading-relaxed font-light">
                                    <?php echo wp_strip_all_tags( get_the_excerpt() ); ?>
                                </p>
                            </div>
                            <div class="mt-6 pt-5 border-t border-stone-100 flex items-center justify-between">
                                <a href="<?php the_permalink(); ?>" class="text-xs font-bold text-aureo-dark hover:text-aureo-gold-700 transition-colors flex items-center gap-1">
                                    <span>Explore Dossier</span>
                                    <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i>
                                </a>
                                <button onclick="aureoOpenInquiry('<?php echo esc_js( get_the_title() ); ?>')" class="px-4 py-1.5 rounded-full bg-aureo-gold-50 hover:bg-aureo-gold-600 text-aureo-gold-800 hover:text-white text-xs font-bold transition-all">
                                    Contact
                                </button>
                            </div>
                        </div>
                    </article>
                    <?php
                endwhile;
            else :
                echo '<p class="text-stone-500">No residences published yet.</p>';
            endif;
            ?>
        </div>
    </div>
</main>

<?php
get_footer();
