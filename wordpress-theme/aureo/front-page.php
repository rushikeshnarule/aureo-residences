<?php
/**
 * Aureo Front Page Template — full parity with React App
 * Sections: Hero → Legacy/Materiality → Philosophy → Details Gallery → Journal → Curated Feed → VisionCTA
 */
get_header();
?>

<main class="w-full">

<!-- ====================================================================
  1. HERO SECTION
===================================================================== -->
<section class="relative w-full overflow-hidden hero-gradient"
  style="padding-top:7.5rem;padding-bottom:4rem;border-bottom:1px solid rgba(231,225,219,0.8);">

  <!-- Background Video Layer -->
  <?php $video_url = get_theme_mod( 'aureo_hero_video_url', 'https://assets.mixkit.co/videos/preview/mixkit-modern-building-with-glass-facade-42998-large.mp4' ); ?>
  <?php if ( $video_url ) : ?>
  <div style="position:absolute;inset:0;z-index:0;overflow:hidden;pointer-events:none;opacity:0.2;"
    class="mask-hero-fade">
    <video id="hero-bg-video" autoplay loop muted playsinline
      style="width:100%;height:100%;object-fit:cover;">
      <source src="<?php echo esc_url( $video_url ); ?>" type="video/mp4">
    </video>
  </div>
  <?php endif; ?>

  <!-- Hero Content -->
  <div style="position:relative;z-index:10;max-width:80rem;margin:0 auto;padding:0 1.5rem;text-align:center;">

    <!-- Header Text Block -->
    <div style="max-width:56rem;margin:0 auto;padding-top:1.5rem;">

      <!-- Eyebrow Pill -->
      <div class="hero-eyebrow-pill"
        style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.375rem 1rem;border-radius:9999px;background:rgba(255,255,255,0.8);backdrop-filter:blur(12px);border:1px solid rgba(214,205,195,0.9);font-size:0.65rem;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:#1c1917;margin-bottom:1.5rem;box-shadow:0 1px 6px rgba(0,0,0,0.04);">
        <span class="eyebrow-dot"></span>
        <span>Zurich · Milan · Aspen · Costa Brava</span>
      </div>

      <!-- Staggered Serif Headline -->
      <?php
      $headline = get_theme_mod( 'aureo_hero_headline', "EXQUISITE LIVING,
REDEFINED" );
      $lines = explode("\n", $headline );
      ?>
      <h1 class="hero-headline"
        style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2.5rem,8vw,5.5rem);font-weight:700;color:#1c1917;letter-spacing:-0.02em;line-height:1.05;margin:0;">
        <?php foreach ( $lines as $i => $line ) : ?>
        <span class="hero-line">
          <span class="hero-line-inner delay-<?php echo $i; ?>"><?php echo esc_html( $line ); ?></span>
        </span>
        <?php endforeach; ?>
      </h1>

      <!-- Subtitle -->
      <p class="hero-subtitle"
        style="margin-top:1.5rem;font-size:clamp(0.875rem,2vw,1.125rem);color:#57534e;max-width:32rem;margin-left:auto;margin-right:auto;line-height:1.7;font-weight:300;letter-spacing:0.03em;padding:0 1rem;">
        <?php echo esc_html( get_theme_mod( 'aureo_hero_subhead', "Bespoke residences in the world's most coveted destinations." ) ); ?>
      </p>

      <!-- CTA Row -->
      <div class="hero-cta-row"
        style="margin-top:2.5rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:0.75rem;">

        <!-- Primary CTA -->
        <a href="#destinations" class="btn-primary">
          <span>Explore Portfolio</span>
          <span class="btn-primary-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </span>
        </a>

        <!-- 360 Tour Ghost CTA -->
        <button type="button" onclick="aureoOpenVirtualTour()" class="btn-ghost">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b88d3f" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8l4 4-4 4M8 12h8"/></svg>
          <span>360° Tour</span>
        </button>

        <!-- Video Play/Pause Toggle -->
        <button type="button" id="video-toggle-btn" onclick="aureoToggleHeroVideo()"
          style="display:inline-flex;align-items:center;gap:0.375rem;padding:0.75rem 0.875rem;border-radius:9999px;background:rgba(255,255,255,0.8);border:1px solid rgba(214,205,195,0.8);font-size:0.6rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#57534e;cursor:pointer;backdrop-filter:blur(8px);transition:all 0.2s;">
          <svg id="video-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a67e37" stroke-width="2.5" stroke-linecap="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
          <span id="video-toggle-label" style="font-family:monospace;">Film</span>
        </button>

      </div>
    </div>

    <!-- Double-Bezel Hero Render Frame -->
    <div class="aureo-bezel-outer hero-render-frame"
      style="max-width:64rem;margin:2rem auto 0;cursor:pointer;"
      onclick="aureoOpenLightbox(document.getElementById('lighting-img').src,'The Horizon Cantilever Villa','Lucerne, Switzerland')">

      <div class="aureo-bezel-inner" style="position:relative;aspect-ratio:16/10;">
        <img id="lighting-img"
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=85"
          alt="Ultra-modern cantilevered villa"
          style="width:100%;height:100%;object-fit:cover;transition:transform 0.7s ease-out;"
          class="group-img-scale-sm" loading="eager">

        <!-- Gradient overlay -->
        <div class="hero-overlay-fade" style="position:absolute;inset-x:0;bottom:0;height:40%;pointer-events:none;"></div>

        <!-- Diurnal Lighting Switcher Pill -->
        <div class="lighting-pill" onclick="event.stopPropagation()">
          <button class="lighting-btn active" id="btn-midday" onclick="aureoSetLighting('midday',this)"
            data-img="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=85">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            <span class="label">Midday</span>
          </button>
          <button class="lighting-btn" id="btn-sunset" onclick="aureoSetLighting('sunset',this)"
            data-img="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=85">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="3" y2="18"/><line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/></svg>
            <span class="label">Sunset</span>
          </button>
          <button class="lighting-btn" id="btn-twilight" onclick="aureoSetLighting('twilight',this)"
            data-img="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            <span class="label">Twilight</span>
          </button>
        </div>

        <!-- Bottom Caption Pill -->
        <div style="position:absolute;bottom:1.5rem;left:1.5rem;z-index:20;">
          <div style="padding:0.5rem 1rem;border-radius:9999px;background:rgba(255,255,255,0.9);backdrop-filter:blur(8px);font-family:'Cormorant Garamond',Georgia,serif;font-weight:700;font-size:0.8rem;color:#1c1917;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
            Lucerne Cantilever · 8,400 sq ft
          </div>
        </div>
      </div>
    </div>

    <!-- 3 Destination Cards Strip -->
    <div id="destinations" style="position:relative;z-index:30;margin-top:3rem;max-width:64rem;margin-left:auto;margin-right:auto;">
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5rem;">

        <!-- Card 1: Zurich -->
        <div class="aureo-bezel-outer-sm animate-on-scroll delay-100" style="cursor:pointer;" onclick="aureoOpenInquiry('Zurich')">
          <div class="aureo-bezel-inner-sm">
            <div style="position:relative;aspect-ratio:16/10;overflow:hidden;background:#1c1917;" class="group">
              <img src="https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&w=800&q=80"
                alt="Zurich" style="width:100%;height:100%;object-fit:cover;" class="group-img-scale-sm">
              <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.3) 50%,transparent 100%);display:flex;flex-direction:column;justify-content:flex-end;padding:1rem;text-align:center;">
                <span style="font-size:0.55rem;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:#d7b775;display:block;margin-bottom:2px;">Destination 01</span>
                <h3 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.35rem;font-weight:700;color:#fff;letter-spacing:0.2em;text-transform:uppercase;margin:0;">Zurich</h3>
              </div>
            </div>
            <div style="padding:0.875rem;background:#fff;text-align:center;border-top:1px solid #f5f0e6;">
              <span style="font-size:0.6rem;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;color:#44403c;">Modern Elegance</span>
            </div>
          </div>
        </div>

        <!-- Card 2: Costa Brava -->
        <div class="aureo-bezel-outer-sm animate-on-scroll delay-200" style="cursor:pointer;" onclick="aureoOpenInquiry('Costa Brava')">
          <div class="aureo-bezel-inner-sm">
            <div style="position:relative;aspect-ratio:16/10;overflow:hidden;background:#1c1917;" class="group">
              <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
                alt="Costa Brava" style="width:100%;height:100%;object-fit:cover;" class="group-img-scale-sm">
              <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.3) 50%,transparent 100%);display:flex;flex-direction:column;justify-content:flex-end;padding:1rem;text-align:center;">
                <span style="font-size:0.55rem;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:#d7b775;display:block;margin-bottom:2px;">Destination 02</span>
                <h3 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.35rem;font-weight:700;color:#fff;letter-spacing:0.2em;text-transform:uppercase;margin:0;">Costa Brava</h3>
              </div>
            </div>
            <div style="padding:0.875rem;background:#fff;text-align:center;border-top:1px solid #f5f0e6;">
              <span style="font-size:0.6rem;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;color:#44403c;">Coastal Luxury</span>
            </div>
          </div>
        </div>

        <!-- Card 3: Aspen -->
        <div class="aureo-bezel-outer-sm animate-on-scroll delay-300" style="cursor:pointer;" onclick="aureoOpenInquiry('Aspen')">
          <div class="aureo-bezel-inner-sm">
            <div style="position:relative;aspect-ratio:16/10;overflow:hidden;background:#1c1917;" class="group">
              <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
                alt="Aspen" style="width:100%;height:100%;object-fit:cover;" class="group-img-scale-sm">
              <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.3) 50%,transparent 100%);display:flex;flex-direction:column;justify-content:flex-end;padding:1rem;text-align:center;">
                <span style="font-size:0.55rem;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:#d7b775;display:block;margin-bottom:2px;">Destination 03</span>
                <h3 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.35rem;font-weight:700;color:#fff;letter-spacing:0.2em;text-transform:uppercase;margin:0;">Aspen</h3>
              </div>
            </div>
            <div style="padding:0.875rem;background:#fff;text-align:center;border-top:1px solid #f5f0e6;">
              <span style="font-size:0.6rem;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;color:#44403c;">Mountain Retreat</span>
            </div>
          </div>
        </div>

      </div>

      <div style="text-align:center;margin-top:2rem;">
        <a href="#details" style="display:inline-flex;align-items:center;gap:0.5rem;font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;color:#1c1917;text-decoration:none;padding-bottom:4px;border-bottom:1px solid #78716c;transition:color 0.2s;">
          <span>Discover All Estates</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </div>
    </div>

  </div>

  <div style="width:100%;height:5rem;background:linear-gradient(to bottom,transparent,rgba(255,255,255,0.8),#ffffff);pointer-events:none;margin-top:-3rem;position:relative;z-index:20;"></div>

</section>


<!-- ====================================================================
  2. LEGACY / MATERIALITY SECTION
===================================================================== -->
<section id="residences" style="width:100%;background:#ffffff;padding:6rem 0 11rem;">
  <div style="max-width:80rem;margin:0 auto;padding:0 1.5rem;">
    <div style="display:grid;grid-template-columns:1fr;gap:3rem;align-items:center;" class="lg-grid-12">

      <!-- Left Column -->
      <div class="animate-on-scroll lg-col-5">
        <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.75rem;">
          <span class="eyebrow-dot"></span>
          <span style="font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.25em;color:#8c6a2c;">Monolithic Residences</span>
        </div>

        <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(1.75rem,5vw,3.5rem);font-weight:700;color:#1c1917;letter-spacing:-0.02em;line-height:1.08;margin:0;">
          Your Home, Your<br>Legacy, Designed<br>Forever
        </h2>
        <p style="margin-top:1.5rem;font-size:0.875rem;color:#57534e;line-height:1.7;font-weight:300;max-width:28rem;">
          More than just a residence, Aureo is a reflection of your individuality — thoughtfully designed, expertly crafted, and created to inspire for generations to come.
        </p>

        <!-- Perspective Counter -->
        <div style="margin-top:2.5rem;">
          <div style="display:flex;align-items:center;justify-content:space-between;max-width:28rem;margin-bottom:0.75rem;">
            <span id="perspective-counter" style="font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#a8a29e;font-family:monospace;">Perspective 01 / 03</span>
            <button onclick="aureoToggleCarouselAuto()" id="autoplay-btn"
              style="display:flex;align-items:center;gap:0.375rem;font-size:0.65rem;color:#78716c;background:none;border:none;cursor:pointer;transition:color 0.2s;font-family:monospace;font-weight:700;">
              <svg id="autoplay-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
              <span id="autoplay-label">Autoplay</span>
            </button>
          </div>
          <!-- Thumbnail Switchers -->
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0.75rem;max-width:28rem;" id="carousel-thumbs">
            <button class="carousel-thumb active" onclick="aureoSetPerspective(0,this)">
              <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80" alt="Villa Solis">
              <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.7),transparent);display:flex;align-items:flex-end;padding:6px;">
                <span style="font-size:0.55rem;color:#fff;font-weight:500;">Villa Solis</span>
              </div>
            </button>
            <button class="carousel-thumb" onclick="aureoSetPerspective(1,this)">
              <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80" alt="Horizon Cantilever">
              <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.7),transparent);display:flex;align-items:flex-end;padding:6px;">
                <span style="font-size:0.55rem;color:#fff;font-weight:500;">Cantilever</span>
              </div>
            </button>
            <button class="carousel-thumb" onclick="aureoSetPerspective(2,this)">
              <img src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=400&q=80" alt="Aspen Monolith">
              <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.7),transparent);display:flex;align-items:flex-end;padding:6px;">
                <span style="font-size:0.55rem;color:#fff;font-weight:500;">Aspen</span>
              </div>
            </button>
          </div>
        </div>

        <!-- Spec Bar -->
        <div style="margin-top:2rem;padding-top:1.5rem;border-top:1px solid #e7e5e4;display:flex;align-items:center;justify-content:space-between;max-width:28rem;">
          <div style="display:flex;align-items:center;gap:1.5rem;font-size:0.75rem;color:#57534e;">
            <div>
              <span style="display:block;font-weight:700;color:#1c1917;font-size:0.875rem;">Zurich · Alps</span>
              <span style="font-size:0.65rem;color:#a8a29e;">Location</span>
            </div>
            <div style="width:1px;height:1.5rem;background:#e7e5e4;"></div>
            <div>
              <span style="display:block;font-weight:700;color:#1c1917;font-size:0.875rem;">Post-Tensioned</span>
              <span style="font-size:0.65rem;color:#a8a29e;">Cantilever System</span>
            </div>
          </div>
          <button onclick="aureoOpenVirtualTour()"
            style="display:inline-flex;align-items:center;gap:0.375rem;font-size:0.7rem;font-weight:700;color:#8c6a2c;background:none;border:none;cursor:pointer;transition:color 0.2s;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8l4 4-4 4M8 12h8"/></svg>
            <span>Launch 360°</span>
          </button>
        </div>
      </div>

      <!-- Right Column: Double-Bezel Carousel -->
      <div class="animate-on-scroll delay-200 lg-col-7" id="carousel-container">
        <div class="aureo-bezel-outer" style="cursor:pointer;">
          <div class="aureo-bezel-inner" style="position:relative;">

            <!-- Carousel Slides -->
            <div class="carousel-slide active" id="slide-0" style="position:relative;aspect-ratio:16/11;">
              <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
                alt="Villa Solis" style="width:100%;height:100%;object-fit:cover;"
                onclick="aureoOpenLightbox(this.src,'Villa Solis Monograph','Zurich Alpine Lakefront')">
              <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.15) 50%,transparent 100%);pointer-events:none;"></div>
              <div style="position:absolute;inset-x:0;bottom:0;padding:1.5rem;display:flex;align-items:flex-end;justify-content:space-between;color:#fff;z-index:10;">
                <div>
                  <span style="font-size:0.6rem;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;color:#d7b775;display:block;margin-bottom:2px;font-family:monospace;">Zurich, Switzerland</span>
                  <h4 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.5rem;font-weight:700;color:#fff;margin:0;">Villa Solis Monograph</h4>
                </div>
                <button onclick="aureoOpenLightbox('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85','Villa Solis Monograph','Zurich Alpine Lakefront')"
                  style="padding:0.5rem 1rem;border-radius:9999px;background:rgba(255,255,255,0.2);border:1px solid rgba(255,255,255,0.2);color:#fff;font-size:0.65rem;font-weight:700;cursor:pointer;backdrop-filter:blur(8px);display:flex;align-items:center;gap:0.375rem;">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  <span>Inspect</span>
                </button>
              </div>
            </div>

            <div class="carousel-slide" id="slide-1" style="position:relative;aspect-ratio:16/11;">
              <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85"
                alt="Horizon Cantilever" style="width:100%;height:100%;object-fit:cover;"
                onclick="aureoOpenLightbox(this.src,'The Horizon Cantilever Villa','Lucerne, Switzerland')">
              <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.15) 50%,transparent 100%);pointer-events:none;"></div>
              <div style="position:absolute;inset-x:0;bottom:0;padding:1.5rem;display:flex;align-items:flex-end;justify-content:space-between;color:#fff;z-index:10;">
                <div>
                  <span style="font-size:0.6rem;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;color:#d7b775;display:block;margin-bottom:2px;font-family:monospace;">Lucerne, Switzerland</span>
                  <h4 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.5rem;font-weight:700;color:#fff;margin:0;">The Horizon Cantilever Villa</h4>
                </div>
                <button onclick="aureoOpenLightbox('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85','The Horizon Cantilever Villa','Lucerne, Switzerland')"
                  style="padding:0.5rem 1rem;border-radius:9999px;background:rgba(255,255,255,0.2);border:1px solid rgba(255,255,255,0.2);color:#fff;font-size:0.65rem;font-weight:700;cursor:pointer;backdrop-filter:blur(8px);display:flex;align-items:center;gap:0.375rem;">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  <span>Inspect</span>
                </button>
              </div>
            </div>

            <div class="carousel-slide" id="slide-2" style="position:relative;aspect-ratio:16/11;">
              <img src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85"
                alt="Aspen Monolith" style="width:100%;height:100%;object-fit:cover;"
                onclick="aureoOpenLightbox(this.src,'Aspen Ridge Monolith','Aspen, Colorado')">
              <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.15) 50%,transparent 100%);pointer-events:none;"></div>
              <div style="position:absolute;inset-x:0;bottom:0;padding:1.5rem;display:flex;align-items:flex-end;justify-content:space-between;color:#fff;z-index:10;">
                <div>
                  <span style="font-size:0.6rem;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;color:#d7b775;display:block;margin-bottom:2px;font-family:monospace;">Aspen, Colorado</span>
                  <h4 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.5rem;font-weight:700;color:#fff;margin:0;">Aspen Ridge Monolith</h4>
                </div>
                <button onclick="aureoOpenLightbox('https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85','Aspen Ridge Monolith','Aspen, Colorado')"
                  style="padding:0.5rem 1rem;border-radius:9999px;background:rgba(255,255,255,0.2);border:1px solid rgba(255,255,255,0.2);color:#fff;font-size:0.65rem;font-weight:700;cursor:pointer;backdrop-filter:blur(8px);display:flex;align-items:center;gap:0.375rem;">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  <span>Inspect</span>
                </button>
              </div>
            </div>

            <!-- Prev / Next Controls -->
            <div style="position:absolute;inset-y:0;inset-x:1rem;display:flex;align-items:center;justify-content:space-between;pointer-events:none;z-index:10;">
              <button onclick="aureoCarouselPrev()"
                style="width:2.5rem;height:2.5rem;border-radius:9999px;background:rgba(0,0,0,0.4);border:none;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;pointer-events:auto;backdrop-filter:blur(8px);transition:all 0.2s;opacity:0;" class="carousel-nav-btn" id="carousel-prev">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button onclick="aureoCarouselNext()"
                style="width:2.5rem;height:2.5rem;border-radius:9999px;background:rgba(0,0,0,0.4);border:none;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;pointer-events:auto;backdrop-filter:blur(8px);transition:all 0.2s;opacity:0;" class="carousel-nav-btn" id="carousel-next">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <style>
  #carousel-container:hover #carousel-prev,
  #carousel-container:hover #carousel-next { opacity: 1 !important; }
  @media (min-width: 1024px) {
    .lg-grid-12 { grid-template-columns: 5fr 7fr; }
  }
  </style>
</section>


<!-- ====================================================================
  3. SPATIAL PHILOSOPHY SECTION
===================================================================== -->
<section id="philosophy" style="width:100%;background:#f8f5ee;border-top:1px solid rgba(231,225,219,0.8);border-bottom:1px solid rgba(231,225,219,0.8);padding:7rem 0 9rem;">
  <div style="max-width:80rem;margin:0 auto;padding:0 1.5rem;">

    <!-- Section Header -->
    <div style="max-width:42rem;margin-bottom:5rem;" class="animate-on-scroll">
      <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.75rem;">
        <span class="eyebrow-dot"></span>
        <span style="font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.25em;color:#8c6a2c;">Spatial Philosophy</span>
      </div>
      <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(1.75rem,5vw,3.75rem);font-weight:700;color:#1c1917;letter-spacing:-0.02em;line-height:1.08;margin:0 0 1rem 0;">
        Built for permanence. Designed for serenity.
      </h2>
      <p style="font-size:0.8rem;color:#57534e;line-height:1.7;font-weight:300;max-width:36rem;">
        Every architectural gesture is governed by timeless proportion, topography resonance, and monolithic permanence.
      </p>
    </div>

    <!-- 3 Philosophy Cards -->
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem;">

      <?php
      $pillars = array(
        array(
          'number' => '01',
          'title'  => 'Pure Structural Honesty',
          'detail' => 'Every line and cantilever serves a functional architectural purpose, stripping away ornamentation to reveal the beauty of load-bearing truth.',
        ),
        array(
          'number' => '02',
          'title'  => 'Sensory Light Orchestration',
          'detail' => 'Oriented meticulously to track the diurnal path of the sun, casting dynamic geometric shadow patterns across living surfaces throughout the day.',
        ),
        array(
          'number' => '03',
          'title'  => 'Permanent Materiality',
          'detail' => 'Constructed with low-carbon architectural concrete, volcanic basalt, brushed titanium, and aged teak — materials that only improve with time.',
        ),
      );
      $pillar_delays = array('delay-100', 'delay-200', 'delay-300');
      foreach ( $pillars as $i => $pillar ) :
      ?>
      <div class="aureo-bezel-outer-sm animate-on-scroll <?php echo $pillar_delays[$i]; ?>" style="cursor:default;">
        <div class="aureo-bezel-inner-sm" style="padding:2.5rem;background:#fff;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;">
            <span style="font-family:'Cormorant Garamond',Georgia,serif;font-size:2.25rem;font-weight:700;color:#a67e37;font-family:monospace;"><?php echo esc_html($pillar['number']); ?></span>
            <div style="width:1.75rem;height:1.75rem;border-radius:9999px;background:#f5f0e6;display:flex;align-items:center;justify-content:center;transition:all 0.2s;">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#78716c" stroke-width="2.5" stroke-linecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
            </div>
          </div>
          <h3 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.35rem;font-weight:700;color:#1c1917;letter-spacing:-0.01em;margin:0 0 0.75rem 0;"><?php echo esc_html($pillar['title']); ?></h3>
          <p style="font-size:0.8rem;color:#57534e;line-height:1.7;font-weight:300;margin:0;"><?php echo esc_html($pillar['detail']); ?></p>
          <div style="margin-top:2.5rem;padding-top:1rem;border-top:1px solid #f5f0e6;display:flex;align-items:center;justify-content:space-between;font-size:0.65rem;color:#a8a29e;font-family:monospace;">
            <span style="text-transform:uppercase;letter-spacing:0.18em;font-weight:700;color:#8c6a2c;">Aureo Principle</span>
            <span>Zurich Atelier</span>
          </div>
        </div>
      </div>
      <?php endforeach; ?>

    </div>
  </div>
</section>


<!-- ====================================================================
  4. DETAILS GALLERY SECTION (Curated Dossiers)
===================================================================== -->
<section id="details" style="width:100%;background:#ffffff;padding:7rem 0 11rem;">
  <div style="max-width:80rem;margin:0 auto;padding:0 1.5rem;">

    <!-- Section Header -->
    <div style="display:flex;flex-direction:column;gap:1.5rem;margin-bottom:3rem;" class="animate-on-scroll">
      <div>
        <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;">
          <span class="eyebrow-dot"></span>
          <span style="font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.25em;color:#8c6a2c;">Curated Dossiers</span>
        </div>
        <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(1.75rem,5vw,3.75rem);font-weight:700;color:#1c1917;letter-spacing:-0.02em;margin:0;">Selected Architectural Pieces</h2>
      </div>
      <p style="font-size:0.8rem;color:#57534e;max-width:28rem;line-height:1.7;font-weight:300;">
        Each estate is an unrepeatable monolithic response to topography, crafted with low-carbon concrete and volcanic basalt.
      </p>
    </div>

    <!-- Filter Tabs -->
    <div style="display:flex;align-items:center;gap:0.5rem;overflow-x:auto;padding-bottom:1rem;margin-bottom:3rem;" class="scrollbar-none">
      <button class="filter-pill active" onclick="aureoFilterGallery('all',this)">All Works</button>
      <button class="filter-pill" onclick="aureoFilterGallery('lakefront',this)">Lakefront Cantilevers</button>
      <button class="filter-pill" onclick="aureoFilterGallery('coastal',this)">Coastal Terraces</button>
      <button class="filter-pill" onclick="aureoFilterGallery('alpine',this)">Alpine Stone</button>
    </div>

    <!-- Cards Grid -->
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:2rem;" id="gallery-grid">

      <?php
      $residences = array(
        array(
          'id'      => 'horizon',
          'cat'     => 'lakefront',
          'tag'     => 'Lakefront Cantilever',
          'loc'     => 'Lucerne, Switzerland',
          'title'   => 'The Horizon Cantilever Villa',
          'desc'    => 'Post-tensioned concrete volume balanced above alpine waters. Floor-to-ceiling low-iron glazing frames the lake and mountain panorama.',
          'img'     => 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
          'area'    => '8,400 sq ft',
          'beds'    => '6 Suites',
          'year'    => '2023',
        ),
        array(
          'id'      => 'solis',
          'cat'     => 'lakefront',
          'tag'     => 'Alpine Lakefront',
          'loc'     => 'Zurich, Switzerland',
          'title'   => 'Villa Solis Monograph',
          'desc'    => 'A monolithic stone pavilion with infinity terrace that dissolves into the Zurich lake at golden hour.',
          'img'     => 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
          'area'    => '7,200 sq ft',
          'beds'    => '5 Suites',
          'year'    => '2022',
        ),
        array(
          'id'      => 'aspen',
          'cat'     => 'alpine',
          'tag'     => 'Alpine Stone',
          'loc'     => 'Aspen, Colorado',
          'title'   => 'Aspen Ridge Monolith',
          'desc'    => 'Volcanic basalt and rammed earth construction embedded into the Rocky Mountain ridge topography.',
          'img'     => 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80',
          'area'    => '11,000 sq ft',
          'beds'    => '8 Suites',
          'year'    => '2024',
        ),
        array(
          'id'      => 'kyoto',
          'cat'     => 'coastal',
          'tag'     => 'Coastal Terrace',
          'loc'     => 'Costa Brava, Spain',
          'title'   => 'Kyoto Sea Enclave',
          'desc'    => 'Floating terraces carved into Mediterranean clifftops, connecting interior stone volumes to the sea.',
          'img'     => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
          'area'    => '9,600 sq ft',
          'beds'    => '7 Suites',
          'year'    => '2023',
        ),
        array(
          'id'      => 'malibu',
          'cat'     => 'coastal',
          'tag'     => 'Pacific Bluff',
          'loc'     => 'Malibu, California',
          'title'   => 'Pacific Bluff Estate',
          'desc'    => 'Suspended concrete decks project over the Pacific shoreline, bridging interior and ocean horizon.',
          'img'     => 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
          'area'    => '13,500 sq ft',
          'beds'    => '9 Suites',
          'year'    => '2024',
        ),
        array(
          'id'      => 'milan',
          'cat'     => 'alpine',
          'tag'     => 'Alpine Estate',
          'loc'     => 'Lake Como, Italy',
          'title'   => 'Villa Como Sanctum',
          'desc'    => 'Layered travertine terraces rise from the Como lakeshore, merging Italian rationalism with monolithic volume.',
          'img'     => 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
          'area'    => '10,200 sq ft',
          'beds'    => '7 Suites',
          'year'    => '2022',
        ),
      );
      foreach ( $residences as $r ) :
      ?>
      <article class="aureo-bezel-outer-sm animate-on-scroll gallery-card" data-cat="<?php echo esc_attr($r['cat']); ?>" style="cursor:pointer;"
        onclick="aureoOpenLightbox('<?php echo esc_url($r['img']); ?>','<?php echo esc_js($r['title']); ?>','<?php echo esc_js($r['loc']); ?>')">
        <div class="aureo-bezel-inner-sm" style="display:flex;flex-direction:column;height:100%;">
          <!-- Image -->
          <div style="position:relative;aspect-ratio:16/11;overflow:hidden;background:#1c1917;" class="group">
            <img src="<?php echo esc_url($r['img']); ?>" alt="<?php echo esc_attr($r['title']); ?>"
              style="width:100%;height:100%;object-fit:cover;" class="group-img-scale" loading="lazy">
            <div style="position:absolute;top:0.875rem;left:0.875rem;">
              <span style="padding:0.25rem 0.875rem;border-radius:9999px;background:rgba(255,255,255,0.95);backdrop-filter:blur(8px);font-size:0.6rem;font-weight:700;color:#1c1917;text-transform:uppercase;letter-spacing:0.1em;box-shadow:0 2px 8px rgba(0,0,0,0.08);"><?php echo esc_html($r['tag']); ?></span>
            </div>
            <div style="position:absolute;top:0.875rem;right:0.875rem;opacity:0;transition:opacity 0.3s;" class="expand-icon">
              <div style="width:2rem;height:2rem;border-radius:9999px;background:rgba(0,0,0,0.6);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d7b775" stroke-width="2.5" stroke-linecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
              </div>
            </div>
            <div style="position:absolute;inset-x:0;bottom:0;padding:0.75rem;background:linear-gradient(to top,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.45) 50%,transparent 100%);display:flex;align-items:center;justify-content:space-between;font-size:0.65rem;color:rgba(255,255,255,0.9);font-family:monospace;">
              <span><?php echo esc_html($r['area']); ?></span>
              <span><?php echo esc_html($r['beds']); ?></span>
              <span><?php echo esc_html($r['year']); ?></span>
            </div>
          </div>
          <!-- Card Body -->
          <div style="padding:1.5rem 1.75rem;flex:1;display:flex;flex-direction:column;justify-content:space-between;background:#fff;">
            <div>
              <div style="font-size:0.65rem;color:#8c6a2c;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;margin-bottom:0.25rem;font-family:monospace;"><?php echo esc_html($r['loc']); ?></div>
              <h3 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.5rem;font-weight:700;color:#1c1917;letter-spacing:-0.01em;margin:0 0 0.75rem 0;transition:color 0.2s;"><?php echo esc_html($r['title']); ?></h3>
              <p style="font-size:0.75rem;color:#57534e;line-height:1.7;font-weight:300;margin:0;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;"><?php echo esc_html($r['desc']); ?></p>
            </div>
            <div style="margin-top:1.5rem;padding-top:1rem;border-top:1px solid #f5f0e6;display:flex;align-items:center;justify-content:space-between;">
              <button onclick="event.stopPropagation();aureoOpenInquiry('<?php echo esc_js($r['title']); ?>')"
                style="display:inline-flex;align-items:center;gap:0.375rem;font-size:0.7rem;font-weight:700;color:#1c1917;background:none;border:none;cursor:pointer;transition:color 0.2s;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a67e37" stroke-width="2" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span>Request Dossier</span>
              </button>
              <div style="display:flex;align-items:center;gap:0.25rem;font-size:0.7rem;font-weight:700;color:#8c6a2c;transition:transform 0.2s;">
                <span>Explore</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
              </div>
            </div>
          </div>
        </div>
      </article>
      <?php endforeach; ?>

    </div>
  </div>

  <style>
  .gallery-card:hover .expand-icon { opacity: 1 !important; }
  .gallery-card:hover h3 { color: #8c6a2c !important; }
  </style>
</section>


<!-- ====================================================================
  5. JOURNAL / ESSAYS SECTION
===================================================================== -->
<section id="journal" style="width:100%;background:#f8f5ee;border-top:1px solid rgba(231,225,219,0.8);padding:7rem 0 9rem;">
  <div style="max-width:80rem;margin:0 auto;padding:0 1.5rem;">

    <!-- Section Header -->
    <div style="display:flex;flex-direction:column;gap:1.5rem;margin-bottom:3rem;" class="animate-on-scroll">
      <div>
        <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;">
          <span class="eyebrow-dot"></span>
          <span style="font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.25em;color:#8c6a2c;">Architectural Journal &amp; Essays</span>
        </div>
        <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(1.75rem,5vw,3.75rem);font-weight:700;color:#1c1917;letter-spacing:-0.02em;margin:0;">Essays, Monographs &amp; Research</h2>
      </div>
      <p style="font-size:0.8rem;color:#57534e;max-width:28rem;line-height:1.7;font-weight:300;">
        Insights on monolithic structural geometry, natural diurnal daylight modeling, and sustainable material curation.
      </p>
    </div>

    <!-- WordPress Posts Grid -->
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:2rem;">
      <?php
      $args = array( 'post_type' => 'post', 'posts_per_page' => 3, 'post_status' => 'publish' );
      $query = new WP_Query( $args );
      if ( $query->have_posts() ) :
        while ( $query->have_posts() ) : $query->the_post();
          $thumb = has_post_thumbnail() ? get_the_post_thumbnail_url( get_the_ID(), 'medium_large' ) : 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80';
          $cats  = get_the_category();
          $cat   = !empty($cats) ? $cats[0]->name : 'Architecture';
      ?>
      <article class="aureo-bezel-outer-sm animate-on-scroll" style="cursor:pointer;" onclick="window.location='<?php the_permalink(); ?>'">
        <div class="aureo-bezel-inner-sm" style="display:flex;flex-direction:column;height:100%;" class="group">
          <div style="position:relative;aspect-ratio:16/10;overflow:hidden;background:#1c1917;" class="group">
            <img src="<?php echo esc_url($thumb); ?>" alt="<?php the_title_attribute(); ?>"
              style="width:100%;height:100%;object-fit:cover;" class="group-img-scale-sm" loading="lazy">
            <div style="position:absolute;top:0.875rem;left:0.875rem;">
              <span style="padding:0.25rem 0.875rem;border-radius:9999px;background:rgba(255,255,255,0.95);backdrop-filter:blur(8px);font-size:0.6rem;font-weight:700;color:#1c1917;text-transform:uppercase;letter-spacing:0.1em;font-family:monospace;"><?php echo esc_html($cat); ?></span>
            </div>
          </div>
          <div style="padding:1.5rem 1.75rem;flex:1;display:flex;flex-direction:column;justify-content:space-between;background:#fff;">
            <div>
              <div style="font-size:0.65rem;color:#a8a29e;margin-bottom:0.5rem;font-family:monospace;"><?php echo get_the_date('F j, Y'); ?></div>
              <h4 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.25rem;font-weight:700;color:#1c1917;letter-spacing:-0.01em;margin:0 0 0.625rem 0;line-height:1.3;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;"><?php the_title(); ?></h4>
              <p style="font-size:0.75rem;color:#57534e;line-height:1.7;font-weight:300;margin:0;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;"><?php echo wp_strip_all_tags(get_the_excerpt()); ?></p>
            </div>
            <div style="margin-top:1.5rem;padding-top:1rem;border-top:1px solid #f5f0e6;display:flex;align-items:center;justify-content:space-between;font-size:0.7rem;">
              <span style="font-weight:700;color:#44403c;"><?php the_author(); ?></span>
              <a href="<?php the_permalink(); ?>" style="display:flex;align-items:center;gap:0.25rem;font-weight:700;color:#8c6a2c;text-decoration:none;">
                <span>Read</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
              </a>
            </div>
          </div>
        </div>
      </article>
      <?php
        endwhile;
        wp_reset_postdata();
      else:
        $fallback_posts = array(
          array('cat'=>'Architecture Monograph','title'=>'The Art of Negative Space in Alpine Living','excerpt'=>'Exploring post-tensioned cantilevers floating above alpine terrain — how structural voids redefine spatial experience.','img'=>'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80','date'=>'January 12, 2025','author'=>'Marcus von Berg'),
          array('cat'=>'Lighting Design','title'=>'Shadow Choreography: Diurnal Daylight Studies','excerpt'=>'Millimeter-precise sunlight trajectory modeling across private sanctuaries.','img'=>'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80','date'=>'February 3, 2025','author'=>'Elena Fontana'),
          array('cat'=>'Materiality','title'=>'Basalt & Bas-Relief: Natural Volcanic Stone','excerpt'=>'Sourcing and finishing volcanic basalt slabs for architectural permanence.','img'=>'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80','date'=>'March 8, 2025','author'=>'Marcus von Berg'),
        );
        foreach ($fallback_posts as $p) :
      ?>
      <article class="aureo-bezel-outer-sm animate-on-scroll" style="cursor:pointer;">
        <div class="aureo-bezel-inner-sm" style="display:flex;flex-direction:column;height:100%;">
          <div style="position:relative;aspect-ratio:16/10;overflow:hidden;background:#1c1917;" class="group">
            <img src="<?php echo esc_url($p['img']); ?>" alt="<?php echo esc_attr($p['title']); ?>"
              style="width:100%;height:100%;object-fit:cover;" class="group-img-scale-sm" loading="lazy">
            <div style="position:absolute;top:0.875rem;left:0.875rem;">
              <span style="padding:0.25rem 0.875rem;border-radius:9999px;background:rgba(255,255,255,0.95);backdrop-filter:blur(8px);font-size:0.6rem;font-weight:700;color:#1c1917;text-transform:uppercase;letter-spacing:0.1em;font-family:monospace;"><?php echo esc_html($p['cat']); ?></span>
            </div>
          </div>
          <div style="padding:1.5rem 1.75rem;flex:1;display:flex;flex-direction:column;justify-content:space-between;background:#fff;">
            <div>
              <div style="font-size:0.65rem;color:#a8a29e;margin-bottom:0.5rem;font-family:monospace;"><?php echo esc_html($p['date']); ?></div>
              <h4 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.25rem;font-weight:700;color:#1c1917;letter-spacing:-0.01em;margin:0 0 0.625rem 0;line-height:1.3;"><?php echo esc_html($p['title']); ?></h4>
              <p style="font-size:0.75rem;color:#57534e;line-height:1.7;font-weight:300;margin:0;"><?php echo esc_html($p['excerpt']); ?></p>
            </div>
            <div style="margin-top:1.5rem;padding-top:1rem;border-top:1px solid #f5f0e6;display:flex;align-items:center;justify-content:space-between;font-size:0.7rem;">
              <span style="font-weight:700;color:#44403c;"><?php echo esc_html($p['author']); ?></span>
              <div style="display:flex;align-items:center;gap:0.25rem;font-weight:700;color:#8c6a2c;">
                <span>Read</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
              </div>
            </div>
          </div>
        </div>
      </article>
      <?php endforeach; endif; ?>
    </div>
  </div>
</section>


<!-- ====================================================================
  6. CURATED FEED SECTION (Behind The Monoliths)
===================================================================== -->
<section style="width:100%;background:#fbf9f5;border-top:1px solid rgba(231,225,219,0.8);padding:6rem 0 8rem;">
  <div style="max-width:80rem;margin:0 auto;padding:0 1.5rem;">

    <div style="display:flex;flex-direction:column;gap:1.5rem;margin-bottom:3rem;justify-content:space-between;align-items:flex-start;" class="animate-on-scroll">
      <div style="display:flex;width:100%;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1rem;">
        <div>
          <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;">
            <span class="eyebrow-dot"></span>
            <span style="font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.25em;color:#8c6a2c;">Atelier Journal &amp; Feed</span>
          </div>
          <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(1.5rem,4vw,3rem);font-weight:700;color:#1c1917;letter-spacing:-0.02em;margin:0;">Behind The Monoliths</h2>
        </div>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
          style="display:inline-flex;align-items:center;gap:0.5rem;font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#1c1917;text-decoration:none;padding-bottom:4px;border-bottom:1px solid #78716c;transition:color 0.2s;">
          <span>Follow @AureoStudio</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
        </a>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1.5rem;">
      <?php
      $feed_items = array(
        array('cat'=>'Studio Process','title'=>'Basalt Block Placement','date'=>'Aug 2025','img'=>'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80','aspect'=>'aspect-square'),
        array('cat'=>'Daylighting','title'=>'Midday Light Study — Zurich','date'=>'Jul 2025','img'=>'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80','aspect'=>'aspect-[3/4]'),
        array('cat'=>'Materiality','title'=>'Travertine Quarry Visit','date'=>'Jun 2025','img'=>'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=600&q=80','aspect'=>'aspect-square'),
        array('cat'=>'Architecture','title'=>'Cantilever Formwork','date'=>'May 2025','img'=>'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80','aspect'=>'aspect-[3/4]'),
      );
      $feed_delays = array('delay-100','delay-200','delay-300','delay-400');
      foreach ($feed_items as $i => $item) :
      ?>
      <div class="aureo-bezel-outer-sm animate-on-scroll <?php echo $feed_delays[$i]; ?>" style="cursor:pointer;"
        onclick="aureoOpenLightbox('<?php echo esc_url($item['img']); ?>','<?php echo esc_js($item['title']); ?>','Aureo Research Atelier')">
        <div class="aureo-bezel-inner-sm" style="display:flex;flex-direction:column;" class="group">
          <div style="position:relative;overflow:hidden;background:#1c1917;" class="group <?php echo esc_attr($item['aspect']); ?>">
            <img src="<?php echo esc_url($item['img']); ?>" alt="<?php echo esc_attr($item['title']); ?>"
              style="width:100%;height:100%;object-fit:cover;" class="group-img-scale-sm" loading="lazy">
            <div style="position:absolute;top:0.625rem;left:0.625rem;">
              <span style="padding:0.25rem 0.75rem;border-radius:9999px;background:rgba(255,255,255,0.9);backdrop-filter:blur(8px);font-size:0.55rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#1c1917;font-family:monospace;"><?php echo esc_html($item['cat']); ?></span>
            </div>
          </div>
          <div style="padding:1rem;display:flex;align-items:center;justify-content:space-between;background:#fff;">
            <div>
              <h4 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:0.875rem;font-weight:700;color:#1c1917;margin:0 0 2px 0;"><?php echo esc_html($item['title']); ?></h4>
              <span style="font-size:0.65rem;color:#a8a29e;font-family:monospace;"><?php echo esc_html($item['date']); ?></span>
            </div>
            <div style="width:1.5rem;height:1.5rem;border-radius:9999px;background:#f5f0e6;display:flex;align-items:center;justify-content:center;transition:background 0.2s;" class="feed-arrow-icon">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#78716c" stroke-width="2.5" stroke-linecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
            </div>
          </div>
        </div>
      </div>
      <?php endforeach; ?>
    </div>

    <style>
    .aureo-bezel-outer-sm:hover .feed-arrow-icon { background: var(--aureo-gold-600) !important; }
    .aureo-bezel-outer-sm:hover .feed-arrow-icon svg { stroke: #fff !important; }
    .aspect-square { aspect-ratio: 1/1; }
    .aspect-\[3\/4\] { aspect-ratio: 3/4; }
    </style>
  </div>
</section>


<!-- ====================================================================
  7. VISION CTA SECTION
===================================================================== -->
<section id="inquire" style="width:100%;background:#f6f2e9;border-top:1px solid rgba(120,113,108,0.3);padding:7rem 0 10rem;">
  <div style="max-width:56rem;margin:0 auto;padding:0 1.5rem;text-align:center;">

    <!-- Eyebrow Pill -->
    <div class="animate-on-scroll" style="display:flex;justify-content:center;margin-bottom:2rem;">
      <div style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.375rem 1rem;border-radius:9999px;background:rgba(255,255,255,0.8);border:1px solid rgba(214,205,195,0.8);font-size:0.6rem;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:#1c1917;box-shadow:0 1px 4px rgba(0,0,0,0.04);">
        <span class="eyebrow-dot"></span>
        <span>Private Atelier Consultation</span>
      </div>
    </div>

    <!-- Headline with inline glyph image -->
    <h2 class="animate-on-scroll delay-100"
      style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2.25rem,7vw,5rem);font-weight:700;color:#1c1917;letter-spacing:-0.02em;line-height:1.2;margin:0 0 1.5rem 0;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:0.75rem 0.5rem;">
      <span>Where your vision</span>
      <span style="display:inline-flex;align-items:center;gap:0.5rem;flex-wrap:wrap;justify-content:center;">
        <span>finds its</span>
        <span style="display:inline-block;position:relative;top:4px;margin:0 0.5rem;">
          <span style="display:block;width:5rem;height:2.5rem;border-radius:9999px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.15);border:2px solid rgba(255,255,255,0.8);">
            <img src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=300&q=80"
              alt="Architecture detail" style="width:100%;height:100%;object-fit:cover;">
          </span>
        </span>
        <span>home.</span>
      </span>
    </h2>

    <p class="animate-on-scroll delay-200"
      style="font-size:clamp(0.875rem,2vw,1.1rem);color:#57534e;max-width:42rem;margin:0 auto 3.5rem;line-height:1.7;font-weight:300;">
      Aureo offers more than just a place to live — it's a space designed to reflect your unique style, crafted with timeless precision by our Zurich atelier.
    </p>

    <!-- Double-Bezel Form Enclosure -->
    <div class="animate-on-scroll delay-300" style="max-width:38rem;margin:0 auto;">
      <div style="padding:0.625rem;border-radius:2rem;background:rgba(28,25,23,0.03);outline:1px solid rgba(0,0,0,0.06);">
        <div style="padding:0.75rem;border-radius:calc(2rem - 0.625rem);background:#fff;box-shadow:0 2px 12px rgba(0,0,0,0.04);">
          <div id="vision-form-wrap">
            <form onsubmit="aureoVisionSubmit(event)" style="display:flex;flex-direction:column;gap:0.5rem;">
              <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
                <input type="email" required id="vision-email" placeholder="Enter private email address..."
                  style="flex:1;min-width:200px;padding:0.875rem 1.25rem;border-radius:9999px;background:#f8f5ee;border:1px solid rgba(214,205,195,0.8);font-size:0.8rem;color:#1c1917;outline:none;transition:border 0.2s;"
                  onfocus="this.style.borderColor='#b88d3f'" onblur="this.style.borderColor='rgba(214,205,195,0.8)'">
                <button type="submit" class="btn-primary">
                  <span>Join Registry</span>
                  <span class="btn-primary-icon">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
          <div id="vision-success" style="display:none;padding:1.5rem;border-radius:1rem;background:#ecfdf5;border:1px solid #a7f3d0;display:flex;align-items:center;gap:0.75rem;">
            <div style="width:2rem;height:2rem;border-radius:9999px;background:#059669;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div style="text-align:left;">
              <h4 style="font-size:0.875rem;font-weight:700;color:#064e3b;margin:0 0 2px 0;">Confidential Registry Confirmed</h4>
              <p style="font-size:0.7rem;color:#065f46;margin:0;">A Senior Partner will transmit our private monograph within 12 hours.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Trust indicators -->
      <div style="margin-top:1rem;display:flex;align-items:center;justify-content:center;gap:1rem;font-size:0.7rem;color:#78716c;flex-wrap:wrap;">
        <span style="display:flex;align-items:center;gap:0.375rem;">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a67e37" stroke-width="2" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <span>Strict Swiss NDA Guarantee</span>
        </span>
        <span>·</span>
        <button onclick="aureoOpenInquiry('General')"
          style="font-size:0.7rem;font-weight:700;color:#1c1917;text-decoration:underline;background:none;border:none;cursor:pointer;transition:color 0.2s;">
          Direct Partner Consult
        </button>
      </div>
    </div>

  </div>
</section>

</main>

<?php get_footer(); ?>
