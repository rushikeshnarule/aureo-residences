<!-- Luxury Footer — Warm Cream (matches React bg-[#f4f0e6]) -->
<footer class="aureo-footer" style="padding:4rem 0 6rem;width:100%;">
    <div style="max-width:80rem;margin:0 auto;padding:0 1.5rem;">
        
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:3rem;padding-bottom:4rem;border-bottom:1px solid rgba(120,113,108,0.25);">
            <!-- Brand & Studio Philosophy -->
            <div style="display:flex;flex-direction:column;justify-content:space-between;">
                <div>
                    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="footer-brand-link"
                        style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.75rem;font-weight:700;letter-spacing:0.3em;text-transform:uppercase;display:block;margin-bottom:1rem;">
                        A U R E O
                    </a>
                    <p style="font-size:0.8rem;color:#57534e;max-width:22rem;line-height:1.7;font-weight:300;margin:0;">
                        Architectural ateliers crafting monolithic private residences in Zurich, Costa Brava, and Aspen.
                    </p>
                </div>
                <div style="margin-top:2rem;font-size:0.75rem;color:#78716c;font-family:monospace;">
                    Zurich · Milan · Malibu · Aspen · Tokyo
                </div>
            </div>

            <!-- Quick Nav Links -->
            <div>
                <h4 class="footer-heading" style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;margin:0 0 1rem 0;">
                    Residences &amp; Atelier
                </h4>
                <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.75rem;font-size:0.75rem;">
                    <li><a href="<?php echo esc_url( home_url( '/#destinations' ) ); ?>" class="footer-link">Properties</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/#philosophy' ) ); ?>" class="footer-link">Studio Philosophy</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/#details' ) ); ?>" class="footer-link">Curated Dossiers</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/#journal' ) ); ?>" class="footer-link">Journal &amp; Essays</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/#inquire' ) ); ?>" class="footer-link">Private Advisory Desk</a></li>
                </ul>
            </div>

            <!-- Private Advisory Inquiries -->
            <div>
                <h4 class="footer-heading" style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;margin:0 0 1rem 0;">
                    Private Advisory Desk
                </h4>
                <p style="font-size:0.75rem;color:#57534e;line-height:1.7;font-weight:300;margin:0 0 1rem 0;">
                    For off-market acquisitions, bespoke land commissions, or architectural press inquiries.
                </p>
                <a href="mailto:inquiries@aureo-residences.com"
                    style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1rem;font-weight:700;color:#1c1917;text-decoration:underline;text-decoration-color:#b88d3f;">
                    inquiries@aureo-residences.com
                </a>
            </div>
        </div>

        <!-- Single Clean Copyright & Back-to-Top -->
        <div style="padding-top:2rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;font-size:0.75rem;color:#78716c;">
            <div>
                &copy; <?php echo date( 'Y' ); ?> Aureo Architecture &amp; Bespoke Residences. All rights reserved.
            </div>

            <div style="display:flex;align-items:center;gap:1.5rem;">
                <a href="<?php echo esc_url( home_url( '/#destinations' ) ); ?>" style="color:#57534e;text-decoration:none;">Privacy Charter</a>
                <a href="<?php echo esc_url( home_url( '/#destinations' ) ); ?>" style="color:#57534e;text-decoration:none;">Terms of Atelier</a>
                <button type="button" onclick="window.scrollTo({top: 0, behavior: 'smooth'})"
                    style="display:inline-flex;align-items:center;gap:0.375rem;color:#57534e;background:none;border:none;cursor:pointer;">
                    <span>Back to Top</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
                </button>
            </div>
        </div>

    </div>
</footer>

<!-- Floating Action Pill Cluster (Bottom Right) -->
<div id="floating-cta">
    <!-- AI Concierge Pill -->
    <button type="button" onclick="aureoOpenInquiry('AI Spatial Advisory')" class="float-ai-pill" title="AI Spatial Advisor">
        <span class="float-ai-indicator">
            <span class="float-ai-ring"></span>
            <span class="float-ai-dot"></span>
        </span>
        <span class="hidden sm:inline">AI Advisory Desk</span>
    </button>

    <!-- 360 View Button -->
    <button type="button" onclick="aureoOpenVirtualTour()" class="btn-ghost" style="padding:0.625rem 1rem;font-size:0.65rem;box-shadow:0 8px 24px rgba(0,0,0,0.12);">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a67e37" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8l4 4-4 4M8 12h8"/></svg>
        <span>360° View</span>
    </button>

    <!-- Inquire Acquisition Button -->
    <button type="button" onclick="aureoOpenInquiry('General')" class="btn-gold" style="padding:0.625rem 1.25rem;font-size:0.65rem;">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <span>Inquire</span>
    </button>
</div>

<!-- Modal: Private Acquisition Inquiry -->
<div id="inquiry-modal" class="aureo-modal" onclick="if(event.target===this)aureoCloseInquiry()">
    <div class="aureo-modal-dialog">
        <div class="inquiry-modal-header">
            <button type="button" onclick="aureoCloseInquiry()"
                style="position:absolute;top:1.25rem;right:1.25rem;width:2.25rem;height:2.25rem;border-radius:9999px;background:rgba(255,255,255,0.1);border:none;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;"
                aria-label="Close inquiry modal">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;">
                <span class="eyebrow-dot"></span>
                <span style="font-size:0.6rem;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:#d7b775;">Private Advisory Service</span>
            </div>
            <h3 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.75rem;font-weight:700;color:#fff;margin:0 0 0.5rem 0;">Request Confidential Dossier</h3>
            <p style="font-size:0.75rem;color:rgba(255,255,255,0.7);margin:0;line-height:1.6;max-width:32rem;">
                Direct access to our partners in Zurich, Milan, and Aspen for off-market acquisitions and bespoke architectural commissions.
            </p>
        </div>

        <div style="padding:1.5rem 2rem;background:#fff;max-height:75vh;overflow-y:auto;">
            <form id="inquiry-form" onsubmit="aureoSubmitInquiry(event)" style="display:flex;flex-direction:column;gap:1.25rem;">
                <div>
                    <label style="font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#1c1917;display:block;margin-bottom:0.375rem;">Territory of Interest</label>
                    <input type="text" id="inquiry-location" name="location" value="Zurich"
                        style="width:100%;padding:0.625rem 1rem;border-radius:0.75rem;border:1px solid #e7e5e4;font-size:0.875rem;color:#1c1917;outline:none;">
                </div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;">
                    <div>
                        <label style="font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#57534e;display:block;margin-bottom:0.375rem;">Full Legal Name</label>
                        <input type="text" name="fullName" required placeholder="Lord Harrison Sterling"
                            style="width:100%;padding:0.625rem 1rem;border-radius:0.75rem;border:1px solid #e7e5e4;font-size:0.875rem;color:#1c1917;outline:none;">
                    </div>
                    <div>
                        <label style="font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#57534e;display:block;margin-bottom:0.375rem;">Direct Email</label>
                        <input type="email" name="email" required placeholder="harrison@sterling-partners.ch"
                            style="width:100%;padding:0.625rem 1rem;border-radius:0.75rem;border:1px solid #e7e5e4;font-size:0.875rem;color:#1c1917;outline:none;">
                    </div>
                </div>
                <div>
                    <label style="font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#57534e;display:block;margin-bottom:0.375rem;">Private Telephone / Signal</label>
                    <input type="tel" name="phone" placeholder="+41 44 215 8800"
                        style="width:100%;padding:0.625rem 1rem;border-radius:0.75rem;border:1px solid #e7e5e4;font-size:0.875rem;color:#1c1917;outline:none;">
                </div>
                <button type="submit" class="btn-gold" style="width:100%;padding:0.875rem;border-radius:1rem;margin-top:0.5rem;">
                    Submit Confidential Inquiry
                </button>
            </form>
            <div id="inquiry-success" style="display:none;padding:2rem;text-align:center;">
                <div style="width:3rem;height:3rem;border-radius:9999px;background:#ecfdf5;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <h4 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.5rem;font-weight:700;color:#1c1917;margin:0 0 0.5rem 0;">Inquiry Confirmed</h4>
                <p style="font-size:0.8rem;color:#57534e;margin:0;">A Senior Advisory Partner from our Zurich atelier will contact you via private channel within 12 hours.</p>
            </div>
        </div>
    </div>
</div>

<!-- Modal: 360 Virtual Tour -->
<div id="virtual-tour-modal" class="aureo-modal" style="padding:0;background:rgba(0,0,0,0.95);" onclick="if(event.target===this)aureoCloseVirtualTour()">
    <div style="display:flex;flex-direction:column;width:100%;height:100%;position:relative;">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:1rem 1.5rem;border-bottom:1px solid rgba(255,255,255,0.1);background:rgba(0,0,0,0.6);z-index:20;">
            <div style="display:flex;align-items:center;gap:0.75rem;">
                <span class="eyebrow-dot"></span>
                <h3 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.15rem;font-weight:700;color:#fff;margin:0;">360° Cantilever Sunset Deck · Lucerne</h3>
            </div>
            <div style="display:flex;align-items:center;gap:0.75rem;">
                <button type="button" onclick="aureoToggleTourLighting()"
                    style="padding:0.375rem 0.875rem;border-radius:9999px;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.2);color:#fff;font-size:0.7rem;font-weight:700;display:flex;align-items:center;gap:0.375rem;cursor:pointer;">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#d7b775" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/></svg>
                    <span id="tour-lighting-label">Twilight Mode</span>
                </button>
                <button type="button" onclick="aureoCloseVirtualTour()"
                    style="width:2rem;height:2rem;border-radius:9999px;background:rgba(255,255,255,0.15);border:none;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;"
                    aria-label="Close virtual tour">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
            </div>
        </div>
        <div style="flex:1;position:relative;overflow:hidden;">
            <img id="virtual-tour-img" src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=85" alt="360 Tour"
                style="width:100%;height:100%;object-fit:cover;transition:opacity 0.5s;">
        </div>
    </div>
</div>

<!-- Modal: Image Lightbox -->
<div id="image-lightbox-modal" class="aureo-modal" onclick="if(event.target===this)aureoCloseLightbox()">
    <div class="aureo-modal-dialog" style="max-width:56rem;background:#1c1917;color:#fff;">
        <button type="button" onclick="aureoCloseLightbox()"
            style="position:absolute;top:1rem;right:1rem;z-index:30;width:2.25rem;height:2.25rem;border-radius:9999px;background:rgba(0,0,0,0.6);border:none;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div style="position:relative;aspect-ratio:16/10;width:100%;overflow:hidden;background:#000;">
            <img id="lightbox-img" src="" alt="Architectural Photo" style="width:100%;height:100%;object-fit:cover;">
        </div>
        <div style="padding:1.25rem 1.75rem;background:#1c1917;display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(255,255,255,0.1);">
            <div>
                <h4 id="lightbox-title" style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.25rem;font-weight:700;color:#fff;margin:0 0 2px 0;"></h4>
                <p id="lightbox-caption" style="font-size:0.75rem;color:#a8a29e;margin:0;"></p>
            </div>
            <button type="button" onclick="aureoCloseLightbox();aureoOpenInquiry('General')" class="btn-gold" style="padding:0.5rem 1.25rem;font-size:0.65rem;">
                Inquire
            </button>
        </div>
    </div>
</div>

<?php wp_footer(); ?>
</body>
</html>
