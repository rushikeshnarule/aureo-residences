<?php
/**
 * The template for displaying single luxury residences.
 *
 * @package Aureo
 */

get_header();
?>

<main class="w-full pt-36 pb-24 bg-white min-h-screen">
    <div class="max-w-6xl mx-auto px-6 sm:px-10">
        <?php
        while ( have_posts() ) : the_post();
            $terms = get_the_terms( get_the_ID(), 'residence_location' );
            $location_name = ! empty( $terms ) ? $terms[0]->name : 'Private Horizon';
            $area = get_post_meta( get_the_ID(), '_residence_area', true ) ?: '8,400 sq ft';
            $completion = get_post_meta( get_the_ID(), '_residence_completion', true ) ?: '2025';
            $architect = get_post_meta( get_the_ID(), '_residence_architect', true ) ?: 'Aureo Atelier';
            $bedrooms = get_post_meta( get_the_ID(), '_residence_bedrooms', true ) ?: '5 Suites';
            $lot_size = get_post_meta( get_the_ID(), '_residence_lot', true ) ?: '1.4 Acres';
            ?>
            
            <div class="mb-10 text-center max-w-3xl mx-auto">
                <span class="text-xs uppercase tracking-widest font-bold text-aureo-gold-700 block mb-2"><?php echo esc_html( $location_name ); ?></span>
                <h1 class="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-aureo-dark tracking-tight leading-[1.1]">
                    <?php the_title(); ?>
                </h1>
            </div>

            <!-- Main Render Image -->
            <?php if ( has_post_thumbnail() ) : ?>
                <div class="my-10 rounded-3xl overflow-hidden shadow-2xl aspect-[16/10] bg-stone-900">
                    <?php the_post_thumbnail( 'aureo-hero', array( 'class' => 'w-full h-full object-cover' ) ); ?>
                </div>
            <?php endif; ?>

            <!-- Architectural Specs Grid -->
            <div class="my-12 grid grid-cols-2 sm:grid-cols-5 gap-4 p-6 sm:p-8 rounded-3xl bg-stone-50 border border-stone-200/80">
                <div>
                    <span class="text-[10px] text-stone-400 font-semibold uppercase tracking-wider block">Scale</span>
                    <span class="text-sm sm:text-base font-bold text-aureo-dark"><?php echo esc_html( $area ); ?></span>
                </div>
                <div>
                    <span class="text-[10px] text-stone-400 font-semibold uppercase tracking-wider block">Completion</span>
                    <span class="text-sm sm:text-base font-bold text-aureo-dark"><?php echo esc_html( $completion ); ?></span>
                </div>
                <div>
                    <span class="text-[10px] text-stone-400 font-semibold uppercase tracking-wider block">Accommodations</span>
                    <span class="text-sm sm:text-base font-bold text-aureo-dark"><?php echo esc_html( $bedrooms ); ?></span>
                </div>
                <div>
                    <span class="text-[10px] text-stone-400 font-semibold uppercase tracking-wider block">Parcel Scale</span>
                    <span class="text-sm sm:text-base font-bold text-aureo-dark"><?php echo esc_html( $lot_size ); ?></span>
                </div>
                <div>
                    <span class="text-[10px] text-stone-400 font-semibold uppercase tracking-wider block">Atelier</span>
                    <span class="text-sm sm:text-base font-bold text-aureo-dark"><?php echo esc_html( $architect ); ?></span>
                </div>
            </div>

            <!-- Narrative Description -->
            <div class="prose prose-stone max-w-none text-stone-700 leading-relaxed font-light text-base sm:text-lg space-y-6 my-12">
                <?php the_content(); ?>
            </div>

            <!-- Direct Acquisition Callout -->
            <div class="my-16 p-8 sm:p-12 rounded-3xl bg-stone-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
                <div>
                    <span class="text-xs uppercase tracking-widest text-aureo-gold-400 font-bold block mb-1">Private Portfolio</span>
                    <h3 class="text-2xl sm:text-3xl font-serif font-bold text-white">Acquire <?php the_title(); ?></h3>
                    <p class="text-xs sm:text-sm text-stone-400 mt-1 max-w-md">Confidential dossiers and floorplans provided under Swiss partner confidentiality.</p>
                </div>
                <button onclick="aureoOpenInquiry('<?php echo esc_js( get_the_title() ); ?>')" class="shrink-0 px-8 py-3.5 rounded-full bg-aureo-gold-600 hover:bg-aureo-gold-500 text-white text-xs font-bold uppercase tracking-widest transition-all cursor-pointer">
                    Request Dossier
                </button>
            </div>

        <?php endwhile; ?>
    </div>
</main>

<?php
get_footer();
