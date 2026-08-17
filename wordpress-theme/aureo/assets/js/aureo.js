/**
 * Aureo Theme JavaScript Engine
 * Handles full interactivity: menu drawer, scroll progress, modals, and video controls.
 */

// Immediate global functions so onclick handlers never fail
window.aureoToggleMenu = function () {
    var drawer = document.getElementById('menu-drawer');
    if (!drawer) return;
    if (drawer.classList.contains('aureo-drawer-active')) {
        drawer.classList.remove('aureo-drawer-active');
        document.body.style.overflow = '';
    } else {
        drawer.classList.add('aureo-drawer-active');
        document.body.style.overflow = 'hidden';
    }
};

window.aureoOpenInquiry = function (locationName) {
    var modal = document.getElementById('inquiry-modal');
    var locInput = document.getElementById('inquiry-location');
    if (locInput && locationName) {
        locInput.value = locationName;
    }
    if (modal) {
        modal.classList.add('aureo-modal-active');
        document.body.style.overflow = 'hidden';
    }
};

window.aureoCloseInquiry = function () {
    var modal = document.getElementById('inquiry-modal');
    if (modal) {
        modal.classList.remove('aureo-modal-active');
        document.body.style.overflow = '';
    }
};

window.aureoOpenVirtualTour = function () {
    var modal = document.getElementById('virtual-tour-modal');
    if (modal) {
        modal.classList.add('aureo-modal-active');
        document.body.style.overflow = 'hidden';
    }
};

window.aureoCloseVirtualTour = function () {
    var modal = document.getElementById('virtual-tour-modal');
    if (modal) {
        modal.classList.remove('aureo-modal-active');
        document.body.style.overflow = '';
    }
};

var tourNight = true;
window.aureoToggleTourLighting = function () {
    var img = document.getElementById('virtual-tour-img');
    var label = document.getElementById('tour-lighting-label');
    if (!img) return;

    tourNight = !tourNight;
    if (tourNight) {
        img.src = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=85';
        if (label) label.textContent = 'Twilight Mode';
    } else {
        img.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85';
        if (label) label.textContent = 'Daylight Mode';
    }
};

window.aureoOpenLightbox = function (url, title, caption) {
    var modal = document.getElementById('image-lightbox-modal');
    var img = document.getElementById('lightbox-img');
    var t = document.getElementById('lightbox-title');
    var c = document.getElementById('lightbox-caption');

    if (img && url) img.src = url;
    if (t) t.textContent = title || '';
    if (c) c.textContent = caption || '';

    if (modal) {
        modal.classList.add('aureo-modal-active');
        document.body.style.overflow = 'hidden';
    }
};

window.aureoCloseLightbox = function () {
    var modal = document.getElementById('image-lightbox-modal');
    if (modal) {
        modal.classList.remove('aureo-modal-active');
        document.body.style.overflow = '';
    }
};

window.aureoToggleHeroVideo = function () {
    var video = document.getElementById('hero-bg-video');
    var label = document.getElementById('video-toggle-label');
    if (!video) return;

    if (video.paused) {
        video.play();
        if (label) label.textContent = 'Pause Motion';
    } else {
        video.pause();
        if (label) label.textContent = 'Play Motion';
    }
};

window.aureoSubmitInquiry = function (e) {
    e.preventDefault();
    var form = document.getElementById('inquiry-form');
    var successBlock = document.getElementById('inquiry-success');
    var formData = new FormData(form);
    formData.append('action', 'aureo_submit_inquiry');
    if (window.aureoData && window.aureoData.nonce) {
        formData.append('nonce', window.aureoData.nonce);
    }

    var submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Transmitting Confidential Request...';
    }

    var ajaxUrl = (window.aureoData && window.aureoData.ajaxUrl) ? window.aureoData.ajaxUrl : '/wp-admin/admin-ajax.php';

    fetch(ajaxUrl, {
        method: 'POST',
        body: formData
    })
    .then(function (res) { return res.json(); })
    .then(function (data) {
        form.classList.add('hidden');
        if (successBlock) successBlock.classList.remove('hidden');
    })
    .catch(function () {
        form.classList.add('hidden');
        if (successBlock) successBlock.classList.remove('hidden');
    });
};

// Safe DOM Content Loaded Initializer
document.addEventListener('DOMContentLoaded', function () {
    // 1. Initialize Lucide Icons safely
    try {
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
    } catch (e) {
        console.warn('Lucide icons load notice:', e);
    }

    // 2. Scroll Progress & Header Glass Transition
    var progressBar = document.getElementById('scroll-progress');
    var header = document.getElementById('site-header');
    var floatingCta = document.getElementById('floating-cta');

    window.addEventListener('scroll', function () {
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (height > 0) ? (winScroll / height) : 0;

        if (progressBar) {
            progressBar.style.transform = 'scaleX(' + scrolled + ')';
        }

        if (header) {
            if (winScroll > 25) {
                header.classList.add('bg-aureo-teal-950/90', 'backdrop-blur-md', 'shadow-xl', 'border-b', 'border-white/10');
            } else {
                header.classList.remove('bg-aureo-teal-950/90', 'backdrop-blur-md', 'shadow-xl', 'border-b', 'border-white/10');
            }
        }

        if (floatingCta) {
            if (winScroll > 350) {
                floatingCta.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
                floatingCta.classList.add('opacity-100', 'translate-y-0');
            } else {
                floatingCta.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
                floatingCta.classList.remove('opacity-100', 'translate-y-0');
            }
        }
    }, { passive: true });

    // 3. Keyboard ESC Listener
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            window.aureoCloseInquiry();
            window.aureoCloseVirtualTour();
            window.aureoCloseLightbox();
            var drawer = document.getElementById('menu-drawer');
            if (drawer && drawer.classList.contains('aureo-drawer-active')) {
                window.aureoToggleMenu();
            }
        }
    });
});
