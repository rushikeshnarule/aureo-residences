<!-- Luxury Footer -->
<footer class="w-full bg-stone-950 text-white border-t border-stone-800 py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
        
        <div class="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
            <!-- Brand & Studio Philosophy -->
            <div class="md:col-span-5 flex flex-col justify-between">
                <div>
                    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="text-2xl sm:text-3xl font-serif font-bold tracking-[0.3em] uppercase text-white hover:text-aureo-gold-400 transition-colors select-none">
                        A U R E O
                    </a>
                    <p class="mt-4 text-xs sm:text-sm text-stone-400 max-w-sm leading-relaxed font-light">
                        Architectural ateliers crafting monolithic private residences in Zurich, Costa Brava, and Aspen.
                    </p>
                </div>
                <div class="mt-8 text-xs text-stone-500 font-mono">
                    Zurich · Milan · Malibu · Aspen · Tokyo
                </div>
            </div>

            <!-- Quick Nav Links -->
            <div class="md:col-span-3">
                <h4 class="text-xs font-bold uppercase tracking-widest text-aureo-gold-400 mb-4">
                    Residences & Atelier
                </h4>
                <ul class="space-y-3 text-xs text-stone-300">
                    <li><a href="<?php echo esc_url( home_url( '/#destinations' ) ); ?>" class="hover:text-aureo-gold-400 transition-colors">Properties</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/#philosophy' ) ); ?>" class="hover:text-aureo-gold-400 transition-colors">Studio Philosophy</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/#details' ) ); ?>" class="hover:text-aureo-gold-400 transition-colors">Curated Dossiers</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/#journal' ) ); ?>" class="hover:text-aureo-gold-400 transition-colors">Journal & Essays</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/#inquire' ) ); ?>" class="hover:text-aureo-gold-400 transition-colors">Private Advisory Desk</a></li>
                </ul>
            </div>

            <!-- Private Advisory Inquiries -->
            <div class="md:col-span-4">
                <h4 class="text-xs font-bold uppercase tracking-widest text-aureo-gold-400 mb-4">
                    Private Advisory Desk
                </h4>
                <p class="text-xs text-stone-400 leading-relaxed mb-4">
                    For off-market acquisitions, bespoke land commissions, or architectural press inquiries.
                </p>
                <a href="mailto:inquiries@aureo-residences.com" class="text-sm font-serif font-bold text-white hover:text-aureo-gold-400 underline decoration-aureo-gold-600 transition-colors">
                    inquiries@aureo-residences.com
                </a>
            </div>
        </div>

        <!-- Single Clean Copyright & Back-to-Top -->
        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <div>
                © <?php echo date( 'Y' ); ?> Aureo Architecture & Bespoke Residences. All rights reserved.
            </div>

            <div class="flex items-center gap-6">
                <a href="<?php echo esc_url( home_url( '/#destinations' ) ); ?>" class="hover:text-white transition-colors">Privacy Charter</a>
                <a href="<?php echo esc_url( home_url( '/#destinations' ) ); ?>" class="hover:text-white transition-colors">Terms of Atelier</a>
                <button type="button" onclick="window.scrollTo({top: 0, behavior: 'smooth'})" class="flex items-center gap-1 hover:text-white transition-colors ml-4 text-stone-400 cursor-pointer">
                    <span>Back to Top</span>
                    <i data-lucide="arrow-up" class="w-3.5 h-3.5"></i>
                </button>
            </div>
        </div>

    </div>
</footer>

<!-- Floating Quick Action CTA -->
<div id="floating-cta" class="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 transition-all duration-300 opacity-0 pointer-events-none translate-y-4">
    <button type="button" onclick="aureoOpenVirtualTour()" class="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/90 hover:bg-white text-aureo-dark backdrop-blur-md shadow-xl border border-stone-200 text-xs font-bold tracking-wider hover:border-aureo-gold-500 transition-all cursor-pointer">
        <i data-lucide="compass" class="w-3.5 h-3.5 text-aureo-teal-700"></i>
        <span>360° View</span>
    </button>
    <button type="button" onclick="aureoOpenInquiry('General')" class="flex items-center gap-2 px-5 py-3 rounded-full bg-aureo-gold-600 hover:bg-aureo-gold-700 text-white backdrop-blur-md shadow-2xl shadow-aureo-gold-950/30 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer border border-aureo-gold-400">
        <i data-lucide="sparkles" class="w-3.5 h-3.5 text-white"></i>
        <span>Inquire Acquisition</span>
    </button>
</div>

<!-- Modal: Private Acquisition Inquiry -->
<div id="inquiry-modal" style="display: none;" class="aureo-modal fixed inset-0 z-50 bg-black/85 backdrop-blur-md items-center justify-center p-4 sm:p-6 overflow-y-auto" onclick="if(event.target===this)aureoCloseInquiry()">
    <div class="aureo-modal-dialog relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl my-auto border border-stone-100">
        <div class="bg-gradient-to-r from-aureo-teal-950 via-aureo-teal-900 to-aureo-teal-800 p-6 sm:p-8 text-white relative">
            <button type="button" onclick="aureoCloseInquiry()" class="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer" aria-label="Close inquiry modal">
                <i data-lucide="x" class="w-4 h-4 text-white"></i>
            </button>
            <div class="flex items-center gap-2 mb-2">
                <span class="w-2 h-2 rounded-full bg-aureo-gold-400 animate-pulse"></span>
                <span class="text-[11px] font-semibold uppercase tracking-widest text-aureo-gold-400">Private Advisory Service</span>
            </div>
            <h3 class="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">Request Confidential Dossier</h3>
            <p class="text-xs sm:text-sm text-white/70 mt-1 max-w-lg">Direct access to our partners in Zurich, Milan, and Aspen for off-market acquisitions and bespoke architectural commissions.</p>
        </div>

        <div class="p-6 sm:p-8 bg-white max-h-[75vh] overflow-y-auto">
            <form id="inquiry-form" onsubmit="aureoSubmitInquiry(event)" class="space-y-5">
                <div>
                    <label class="text-xs font-bold uppercase tracking-wider text-aureo-dark block mb-1.5">Territory of Interest</label>
                    <input type="text" id="inquiry-location" name="location" value="Zurich" class="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm font-semibold text-aureo-dark focus:outline-none focus:border-aureo-gold-600">
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="text-xs font-semibold text-stone-600 block mb-1.5">Full Legal Name</label>
                        <input type="text" name="fullName" required placeholder="Lord Harrison Sterling" class="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm text-aureo-dark focus:outline-none focus:border-aureo-gold-600">
                    </div>
                    <div>
                        <label class="text-xs font-semibold text-stone-600 block mb-1.5">Direct Email</label>
                        <input type="email" name="email" required placeholder="harrison@sterling-partners.ch" class="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm text-aureo-dark focus:outline-none focus:border-aureo-gold-600">
                    </div>
                </div>
                <div>
                    <label class="text-xs font-semibold text-stone-600 block mb-1.5">Private Telephone / Signal</label>
                    <input type="tel" name="phone" placeholder="+41 44 215 8800" class="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm text-aureo-dark focus:outline-none focus:border-aureo-gold-600">
                </div>
                <button type="submit" class="w-full py-3.5 rounded-2xl bg-aureo-gold-600 hover:bg-aureo-gold-700 text-white text-xs font-bold uppercase tracking-widest transition-all shadow-md cursor-pointer">
                    Submit Confidential Inquiry
                </button>
            </form>
            <div id="inquiry-success" class="hidden py-8 text-center">
                <i data-lucide="check-circle-2" class="w-12 h-12 text-emerald-600 mx-auto mb-3"></i>
                <h4 class="text-xl font-serif font-bold text-aureo-dark">Inquiry Confirmed</h4>
                <p class="text-xs text-stone-500 mt-2">A Senior Advisory Partner from our Zurich atelier will contact you via private channel within 12 hours.</p>
            </div>
        </div>
    </div>
</div>

<!-- Modal: 360 Virtual Tour -->
<div id="virtual-tour-modal" style="display: none;" class="aureo-modal fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex-col justify-between" onclick="if(event.target===this)aureoCloseVirtualTour()">
    <div class="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 z-20 bg-black/40">
        <div class="flex items-center gap-3">
            <div class="w-2.5 h-2.5 rounded-full bg-aureo-gold-500 animate-pulse"></div>
            <h3 class="text-white text-base sm:text-lg font-serif font-bold tracking-wide">360° Cantilever Sunset Deck · Lucerne</h3>
        </div>
        <div class="flex items-center gap-3">
            <!-- Day / Twilight Switcher -->
            <button type="button" onclick="aureoToggleTourLighting()" class="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                <i data-lucide="sun" class="w-3.5 h-3.5 text-aureo-gold-400"></i>
                <span id="tour-lighting-label">Twilight Mode</span>
            </button>
            <button type="button" onclick="aureoCloseVirtualTour()" class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer" aria-label="Close virtual tour">
                <i data-lucide="x" class="w-4 h-4 text-white"></i>
            </button>
        </div>
    </div>
    <div class="relative flex-1 w-full overflow-hidden flex items-center justify-center">
        <img id="virtual-tour-img" src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=85" alt="360 Tour" class="w-full h-full object-cover transition-opacity duration-500">
    </div>
</div>

<!-- Modal: Image Lightbox -->
<div id="image-lightbox-modal" style="display: none;" class="aureo-modal fixed inset-0 z-50 bg-black/90 backdrop-blur-xl items-center justify-center p-4 sm:p-8" onclick="if(event.target===this)aureoCloseLightbox()">
    <div class="aureo-modal-dialog relative max-w-5xl w-full bg-stone-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        <button type="button" onclick="aureoCloseLightbox()" class="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer">
            <i data-lucide="x" class="w-4 h-4 text-white"></i>
        </button>
        <div class="relative aspect-[16/10] w-full overflow-hidden bg-black flex items-center justify-center">
            <img id="lightbox-img" src="" alt="Architectural Photo" class="w-full h-full object-cover">
        </div>
        <div class="p-6 bg-stone-950 text-white flex items-center justify-between">
            <div>
                <h4 id="lightbox-title" class="text-lg font-serif font-bold text-white"></h4>
                <p id="lightbox-caption" class="text-xs text-stone-400 mt-1"></p>
            </div>
            <button type="button" onclick="aureoOpenInquiry('General')" class="px-5 py-2 rounded-full bg-aureo-gold-600 hover:bg-aureo-gold-500 text-white text-xs font-bold uppercase tracking-wider">
                Inquire
            </button>
        </div>
    </div>
</div>

<?php wp_footer(); ?>
</body>
</html>
