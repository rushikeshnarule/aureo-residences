<?php
/**
 * The template for displaying the Aureo luxury landing front page.
 *
 * @package Aureo
 */

get_header();
?>

<main class="w-full">
    <!-- 1. Hero Section with Video Background & Seamless Bottom Fade -->
    <section class="relative w-full pt-28 sm:pt-36 md:pt-44 pb-12 hero-gradient overflow-hidden selection:bg-aureo-gold-500 selection:text-white">
        <!-- Ambient video layer -->
        <div class="absolute inset-0 -inset-x-12 -top-10 -bottom-10 rounded-[3rem] overflow-hidden pointer-events-none z-0 flex items-center justify-center opacity-40 mix-blend-overlay">
            <video id="hero-bg-video" autoplay loop muted playsinline class="w-full h-full object-cover transform scale-110 filter brightness-110 contrast-105">
                <source src="<?php echo esc_url( get_theme_mod( 'aureo_hero_video_url', 'https://assets.mixkit.co/videos/preview/mixkit-modern-building-with-glass-facade-42998-large.mp4' ) ); ?>" type="video/mp4">
            </video>
            <div class="absolute inset-0 bg-radial-gradient from-transparent via-aureo-teal-800/30 to-aureo-teal-900/80"></div>
        </div>

        <div class="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 relative z-10">
            <div class="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
                
                <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold tracking-widest uppercase mb-6 shadow-sm">
                    <i data-lucide="sparkles" class="w-3.5 h-3.5 text-aureo-gold-300"></i>
                    <span>Curated Architectural Estates</span>
                </div>

                <h1 class="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-serif font-normal text-white tracking-wider leading-[1.06] uppercase drop-shadow-lg">
                    <?php 
                    $headline = get_theme_mod( 'aureo_hero_headline', "EXQUISITE LIVING,\nREDEFINED" );
                    echo nl2br( esc_html( $headline ) ); 
                    ?>
                </h1>

                <p class="mt-6 text-sm sm:text-base md:text-lg text-white/95 max-w-xl mx-auto leading-relaxed font-light px-4 tracking-wide">
                    <?php echo esc_html( get_theme_mod( 'aureo_hero_subhead', "Bespoke residences in the world's most coveted destinations." ) ); ?>
                </p>

                <div class="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
                    <a href="#destinations" class="px-8 py-3.5 rounded-xl bg-aureo-gold-600 hover:bg-aureo-gold-700 text-white text-xs font-bold uppercase tracking-widest transition-all shadow-xl border border-aureo-gold-400/60">
                        View Properties
                    </a>
                    <button type="button" onclick="aureoOpenVirtualTour()" class="px-8 py-3.5 rounded-xl bg-aureo-emerald-800 hover:bg-aureo-emerald-900 text-white text-xs font-bold uppercase tracking-widest transition-all shadow-xl border border-aureo-emerald-600/50 flex items-center gap-2 cursor-pointer">
                        <i data-lucide="compass" class="w-4 h-4"></i>
                        <span>360° Virtual Tour</span>
                    </button>
                    <!-- Live Motion Toggle -->
                    <button type="button" onclick="aureoToggleHeroVideo()" class="px-4 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 flex items-center gap-1.5 cursor-pointer">
                        <i data-lucide="play" class="w-3.5 h-3.5 text-aureo-gold-300"></i>
                        <span id="video-toggle-label">Motion</span>
                    </button>
                </div>
            </div>

            <!-- Cantilever Villa Render with Seamless Fade -->
            <div class="relative max-w-5xl mx-auto mt-4 sm:mt-8 group cursor-pointer" onclick="aureoOpenLightbox('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85', 'The Horizon Cantilever Villa', 'Lucerne & Alpine Editions')">
                <div class="relative rounded-t-3xl sm:rounded-t-[2.5rem] overflow-hidden shadow-2xl bg-slate-900/10">
                    <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85" alt="Ultra-modern white cantilevered villa" class="w-full h-auto max-h-[720px] object-cover mask-hero-fade">
                    <div class="absolute inset-x-0 bottom-0 h-48 sm:h-64 md:h-84 pointer-events-none hero-overlay-fade"></div>
                </div>
            </div>

            <!-- 3 Destination Cards Strip -->
            <div id="destinations" class="relative z-30 mt-8 sm:mt-12 max-w-5xl mx-auto">
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div onclick="aureoOpenInquiry('Zurich')" class="aureo-card-lift group rounded-2xl overflow-hidden bg-white border border-stone-200/90 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
                        <div class="relative aspect-[16/10] overflow-hidden bg-stone-900">
                            <img src="https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&w=800&q=80" alt="Zurich" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4 text-center">
                                <h3 class="text-xl sm:text-2xl font-serif font-bold text-white tracking-[0.2em] uppercase">Zurich</h3>
                            </div>
                        </div>
                        <div class="p-3.5 bg-white text-center border-t border-stone-100">
                            <span class="text-[11px] font-bold uppercase tracking-widest text-stone-700">Modern Elegance</span>
                        </div>
                    </div>

                    <div onclick="aureoOpenInquiry('Costa Brava')" class="aureo-card-lift group rounded-2xl overflow-hidden bg-white border border-stone-200/90 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
                        <div class="relative aspect-[16/10] overflow-hidden bg-stone-900">
                            <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" alt="Costa Brava" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4 text-center">
                                <h3 class="text-xl sm:text-2xl font-serif font-bold text-white tracking-[0.2em] uppercase">Costa Brava</h3>
                            </div>
                        </div>
                        <div class="p-3.5 bg-white text-center border-t border-stone-100">
                            <span class="text-[11px] font-bold uppercase tracking-widest text-stone-700">Coastal Luxury</span>
                        </div>
                    </div>

                    <div onclick="aureoOpenInquiry('Aspen')" class="aureo-card-lift group rounded-2xl overflow-hidden bg-white border border-stone-200/90 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
                        <div class="relative aspect-[16/10] overflow-hidden bg-stone-900">
                            <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80" alt="Aspen" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4 text-center">
                                <h3 class="text-xl sm:text-2xl font-serif font-bold text-white tracking-[0.2em] uppercase">Aspen</h3>
                            </div>
                        </div>
                        <div class="p-3.5 bg-white text-center border-t border-stone-100">
                            <span class="text-[11px] font-bold uppercase tracking-widest text-stone-700">Mountain Retreat</span>
                        </div>
                    </div>
                </div>

                <div class="text-center mt-6">
                    <a href="#residences" class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-aureo-gold-800 hover:text-aureo-gold-900 transition-colors pb-1 border-b border-aureo-gold-300">
                        <span>Discover More</span>
                        <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                    </a>
                </div>
            </div>
        </div>

        <div class="w-full h-20 sm:h-32 md:h-40 bg-gradient-to-b from-transparent via-white/80 to-white pointer-events-none -mt-12 relative z-20"></div>
    </section>

    <!-- 2. "Your Home, Your Legacy" Section -->
    <section id="residences" class="w-full bg-white py-24 sm:py-36 md:py-44">
        <div class="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                <div class="lg:col-span-5 flex flex-col justify-center">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="w-2 h-2 rounded-full bg-aureo-gold-600"></span>
                        <span class="text-xs uppercase tracking-widest font-bold text-aureo-gold-700">Monolithic Residences</span>
                    </div>
                    <h2 class="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-aureo-dark tracking-tight leading-[1.1]">
                        Your Home, Your<br>Legacy, Designed<br>Forever
                    </h2>
                    <p class="mt-6 text-sm sm:text-base text-aureo-muted leading-relaxed font-light">
                        More than just a residence, Aureo is a reflection of your individuality — thoughtfully designed, expertly crafted, and created to inspire for generations to come.
                    </p>
                    <div class="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between">
                        <div>
                            <span class="block font-bold text-aureo-dark text-sm">Zurich · Alps</span>
                            <span class="text-[11px] text-stone-400">Location</span>
                        </div>
                        <button type="button" onclick="aureoOpenVirtualTour()" class="inline-flex items-center gap-1.5 text-xs font-bold text-aureo-emerald-800 hover:underline cursor-pointer">
                            <i data-lucide="compass" class="w-3.5 h-3.5"></i>
                            <span>Launch 360°</span>
                        </button>
                    </div>
                </div>

                <div class="lg:col-span-7">
                    <div class="rounded-3xl overflow-hidden shadow-2xl border border-stone-200 group cursor-pointer" onclick="aureoOpenLightbox('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85', 'Villa Solis Monograph', 'Zurich Alpine Lakefront')">
                        <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85" alt="Villa Sunset" class="w-full h-auto object-cover group-hover:scale-103 transition-transform duration-700">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 3. Spatial Philosophy Section -->
    <section id="philosophy" class="w-full bg-stone-50/70 border-y border-stone-200/60 py-24 sm:py-36">
        <div class="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
            <div class="max-w-2xl mb-16 sm:mb-20">
                <span class="text-xs uppercase tracking-widest font-bold text-aureo-gold-700 block mb-3">Spatial Philosophy</span>
                <h2 class="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-aureo-dark tracking-tight leading-[1.1]">
                    Built for permanence. Designed for serenity.
                </h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
                <div class="aureo-card-lift p-8 sm:p-10 rounded-3xl bg-white border border-stone-200/80 shadow-sm transition-all duration-300">
                    <span class="text-3xl sm:text-4xl font-serif font-bold text-aureo-gold-600 block mb-4">01</span>
                    <h3 class="text-xl sm:text-2xl font-serif font-bold text-aureo-dark mb-3">Pure Structural Honesty</h3>
                    <p class="text-xs sm:text-sm text-aureo-muted leading-relaxed font-light">Every line and cantilever serves a functional architectural purpose, stripping away ornamentation.</p>
                </div>
                <div class="aureo-card-lift p-8 sm:p-10 rounded-3xl bg-white border border-stone-200/80 shadow-sm transition-all duration-300">
                    <span class="text-3xl sm:text-4xl font-serif font-bold text-aureo-gold-600 block mb-4">02</span>
                    <h3 class="text-xl sm:text-2xl font-serif font-bold text-aureo-dark mb-3">Sensory Light Orchestration</h3>
                    <p class="text-xs sm:text-sm text-aureo-muted leading-relaxed font-light">Oriented meticulously to track the diurnal path of the sun, casting dynamic geometric shadows.</p>
                </div>
                <div class="aureo-card-lift p-8 sm:p-10 rounded-3xl bg-white border border-stone-200/80 shadow-sm transition-all duration-300">
                    <span class="text-3xl sm:text-4xl font-serif font-bold text-aureo-gold-600 block mb-4">03</span>
                    <h3 class="text-xl sm:text-2xl font-serif font-bold text-aureo-dark mb-3">Permanent Materiality</h3>
                    <p class="text-xs sm:text-sm text-aureo-muted leading-relaxed font-light">Constructed with low-carbon architectural concrete, volcanic basalt, brushed titanium, and aged teak.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- 4. Dynamic WordPress Posts & Journal Section -->
    <section id="journal" class="w-full bg-white py-24 sm:py-36">
        <div class="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div>
                    <span class="text-xs uppercase tracking-widest font-bold text-aureo-gold-700 block mb-2">Architectural Journal</span>
                    <h2 class="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-aureo-dark tracking-tight">Essays, Monographs & Research</h2>
                </div>
                <p class="text-xs sm:text-sm text-aureo-muted max-w-sm leading-relaxed font-light">
                    Insights on monolithic structural geometry, natural daylight modeling, and sustainable material curation.
                </p>
            </div>

            <!-- WordPress Posts Query Loop -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <?php
                $args = array(
                    'post_type'      => 'post',
                    'posts_per_page' => 3,
                    'post_status'    => 'publish'
                );
                $query = new WP_Query( $args );

                if ( $query->have_posts() ) :
                    while ( $query->have_posts() ) : $query->the_post();
                        $thumb_url = has_post_thumbnail() ? get_the_post_thumbnail_url( get_the_ID(), 'aureo-card' ) : 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80';
                        $category  = get_the_category();
                        $cat_name  = ! empty( $category ) ? $category[0]->name : 'Architecture';
                        ?>
                        <article class="aureo-card-lift group flex flex-col rounded-3xl overflow-hidden bg-white border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-300">
                            <a href="<?php the_permalink(); ?>" class="relative aspect-[16/10] overflow-hidden bg-stone-900 block">
                                <img src="<?php echo esc_url( $thumb_url ); ?>" alt="<?php the_title_attribute(); ?>" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                                <div class="absolute top-3.5 left-3.5">
                                    <span class="px-3 py-1 rounded-full bg-white/90 text-[10px] font-bold text-aureo-dark uppercase tracking-wide"><?php echo esc_html( $cat_name ); ?></span>
                                </div>
                            </a>
                            <div class="p-6 sm:p-7 flex flex-col justify-between flex-1">
                                <div>
                                    <div class="text-[11px] text-stone-400 mb-2"><?php echo esc_html( get_the_date( 'F j, Y' ) ); ?></div>
                                    <h3 class="text-xl font-serif font-bold text-aureo-dark group-hover:text-aureo-gold-700 transition-colors leading-snug line-clamp-2">
                                        <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                    </h3>
                                    <p class="mt-2.5 text-xs text-aureo-muted line-clamp-3 leading-relaxed font-light">
                                        <?php echo wp_strip_all_tags( get_the_excerpt() ); ?>
                                    </p>
                                </div>
                                <div class="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                                    <span class="text-[11px] font-semibold text-stone-700"><?php the_author(); ?></span>
                                    <a href="<?php the_permalink(); ?>" class="font-bold text-aureo-gold-700 flex items-center gap-1">Read <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i></a>
                                </div>
                            </div>
                        </article>
                        <?php
                    endwhile;
                    wp_reset_postdata();
                else :
                    ?>
                    <article class="aureo-card-lift group flex flex-col rounded-3xl overflow-hidden bg-white border border-stone-200/80 shadow-sm p-6">
                        <span class="text-xs uppercase font-bold text-aureo-gold-700 mb-2">Architecture Monograph</span>
                        <h3 class="text-xl font-serif font-bold text-aureo-dark">The Art of Negative Space in Alpine Living</h3>
                        <p class="text-xs text-stone-500 mt-2">Exploring post-tensioned cantilevers floating above alpine terrain.</p>
                    </article>
                    <article class="aureo-card-lift group flex flex-col rounded-3xl overflow-hidden bg-white border border-stone-200/80 shadow-sm p-6">
                        <span class="text-xs uppercase font-bold text-aureo-gold-700 mb-2">Lighting Design</span>
                        <h3 class="text-xl font-serif font-bold text-aureo-dark">Shadow Choreography: Diurnal Daylight Studies</h3>
                        <p class="text-xs text-stone-500 mt-2">Millimeter-precise sunlight trajectory modeling across private sanctuaries.</p>
                    </article>
                    <article class="aureo-card-lift group flex flex-col rounded-3xl overflow-hidden bg-white border border-stone-200/80 shadow-sm p-6">
                        <span class="text-xs uppercase font-bold text-aureo-gold-700 mb-2">Materiality</span>
                        <h3 class="text-xl font-serif font-bold text-aureo-dark">Basalt & Bas-Relief: Natural Volcanic Stone</h3>
                        <p class="text-xs text-stone-500 mt-2">Sourcing and finishing volcanic basalt slabs for architectural permanence.</p>
                    </article>
                <?php endif; ?>
            </div>
        </div>
    </section>

    <!-- 5. Waitlist / CTA Section with Inline Image Glyph -->
    <section id="inquire" class="w-full bg-stone-50/70 py-28 sm:py-40">
        <div class="max-w-4xl mx-auto px-6 sm:px-10 text-center">
            <h2 class="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-aureo-dark tracking-tight leading-[1.25] flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
                <span>Where your vision</span>
                <span class="inline-flex items-center">
                    <span>finds its</span>
                    <span class="inline-block mx-3 relative top-1">
                        <span class="block w-16 sm:w-24 h-8 sm:h-10 rounded-full overflow-hidden shadow-lg border-2 border-stone-200">
                            <img src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=300&q=80" alt="Glyph" class="w-full h-full object-cover">
                        </span>
                    </span>
                    <span>home.</span>
                </span>
            </h2>
            <p class="mt-6 text-sm sm:text-lg text-aureo-muted max-w-2xl mx-auto leading-relaxed font-light">
                Aureo offers more than just a place to live — it's a space designed to reflect your unique style, crafted with timeless precision.
            </p>
            <div class="mt-10 max-w-md mx-auto">
                <button type="button" onclick="aureoOpenInquiry('Global')" class="w-full py-4 rounded-full bg-aureo-gold-600 hover:bg-aureo-gold-700 text-white text-xs font-bold uppercase tracking-widest transition-all shadow-xl cursor-pointer">
                    Schedule Confidential Consultation
                </button>
            </div>
        </div>
    </section>
</main>

<?php
get_footer();
