<?php
/**
 * The template for displaying all single posts.
 *
 * @package Aureo
 */

get_header();
?>

<main class="w-full pt-36 pb-24 bg-white min-h-screen">
    <div class="max-w-4xl mx-auto px-6 sm:px-10">
        <?php
        while ( have_posts() ) : the_post();
            $category  = get_the_category();
            $cat_name  = ! empty( $category ) ? $category[0]->name : 'Architecture';
            $read_time = aureo_get_reading_time( get_the_ID() );
            ?>
            <!-- Post Header -->
            <div class="mb-10 text-center">
                <span class="text-xs uppercase tracking-widest font-bold text-aureo-gold-700 block mb-3"><?php echo esc_html( $cat_name ); ?> · <?php echo esc_html( $read_time ); ?></span>
                <h1 class="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-aureo-dark tracking-tight leading-[1.1]">
                    <?php the_title(); ?>
                </h1>
                <div class="mt-6 flex items-center justify-center gap-4 text-xs text-stone-500">
                    <span>By <?php the_author(); ?></span>
                    <span>·</span>
                    <span><?php echo esc_html( get_the_date( 'F j, Y' ) ); ?></span>
                </div>
            </div>

            <!-- Featured Hero Image -->
            <?php if ( has_post_thumbnail() ) : ?>
                <div class="my-10 rounded-3xl overflow-hidden shadow-2xl aspect-[16/9] bg-stone-900">
                    <?php the_post_thumbnail( 'aureo-hero', array( 'class' => 'w-full h-full object-cover' ) ); ?>
                </div>
            <?php endif; ?>

            <!-- Post Content -->
            <div class="prose prose-stone max-w-none text-stone-700 leading-relaxed font-light text-base sm:text-lg space-y-6 my-12">
                <?php the_content(); ?>
            </div>

            <!-- Post Tags & Share -->
            <div class="pt-8 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
                <div class="flex items-center gap-2 flex-wrap">
                    <?php the_tags( '<span class="text-xs text-stone-400 font-semibold">Topics:</span> ', ' ', '' ); ?>
                </div>
                <a href="<?php echo esc_url( home_url( '/#journal' ) ); ?>" class="px-6 py-2 rounded-full bg-aureo-dark text-white text-xs font-bold hover:bg-black transition-colors">
                    ← Back to Journal
                </a>
            </div>

            <!-- Comments Area -->
            <?php
            if ( comments_open() || get_comments_number() ) :
                comments_template();
            endif;
        endwhile;
        ?>
    </div>
</main>

<?php
get_footer();
