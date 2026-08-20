/**
 * Aureo Theme JavaScript Engine
 * Complete Parity with React App Interactivity
 */

// 1. Menu Drawer
window.aureoToggleMenu = function () {
    var drawer = document.getElementById('menu-drawer');
    var burger = document.getElementById('aureo-burger-btn');
    if (!drawer) return;
    var isOpen = drawer.classList.contains('is-open');
    if (isOpen) {
        drawer.classList.remove('is-open');
        if (burger) burger.classList.remove('is-open');
        document.body.style.overflow = '';
    } else {
        drawer.classList.add('is-open');
        if (burger) burger.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }
};

// 2. Inquiry Modal
window.aureoOpenInquiry = function (locationName) {
    var modal = document.getElementById('inquiry-modal');
    var locInput = document.getElementById('inquiry-location');
    if (locInput && locationName) {
        locInput.value = locationName;
    }
    if (modal) {
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }
};

window.aureoCloseInquiry = function () {
    var modal = document.getElementById('inquiry-modal');
    if (modal) {
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
    }
};

// 3. Virtual Tour Modal
window.aureoOpenVirtualTour = function () {
    var modal = document.getElementById('virtual-tour-modal');
    if (modal) {
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }
};

window.aureoCloseVirtualTour = function () {
    var modal = document.getElementById('virtual-tour-modal');
    if (modal) {
        modal.classList.remove('is-open');
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

// 4. Image Lightbox
window.aureoOpenLightbox = function (url, title, caption) {
    var modal = document.getElementById('image-lightbox-modal');
    var img = document.getElementById('lightbox-img');
    var t = document.getElementById('lightbox-title');
    var c = document.getElementById('lightbox-caption');
    if (img && url) img.src = url;
    if (t) t.textContent = title || '';
    if (c) c.textContent = caption || '';
    if (modal) {
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }
};

window.aureoCloseLightbox = function () {
    var modal = document.getElementById('image-lightbox-modal');
    if (modal) {
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
    }
};

// 5. Hero Video Toggle
window.aureoToggleHeroVideo = function () {
    var video = document.getElementById('hero-bg-video');
    var label = document.getElementById('video-toggle-label');
    if (!video) return;
    if (video.paused) {
        video.play();
        if (label) label.textContent = 'Film';
    } else {
        video.pause();
        if (label) label.textContent = 'Paused';
    }
};

// 6. Diurnal Lighting Switcher (Hero Render)
window.aureoSetLighting = function (mode, btn) {
    var img = document.getElementById('lighting-img');
    if (!img || !btn) return;
    var newSrc = btn.getAttribute('data-img');
    if (newSrc) {
        img.src = newSrc;
    }
    document.querySelectorAll('.lighting-btn').forEach(function (b) {
        b.classList.remove('active');
    });
    btn.classList.add('active');
};

// 7. Legacy Perspective Carousel
var currentPerspectiveIndex = 0;
var perspectiveCount = 3;
var carouselAutoInterval = null;
var isCarouselAuto = true;

window.aureoSetPerspective = function (idx, btn) {
    currentPerspectiveIndex = idx;
    var slides = document.querySelectorAll('.carousel-slide');
    var thumbs = document.querySelectorAll('.carousel-thumb');
    var counter = document.getElementById('perspective-counter');

    slides.forEach(function (s, i) {
        if (i === idx) s.classList.add('active');
        else s.classList.remove('active');
    });

    thumbs.forEach(function (t, i) {
        if (i === idx) t.classList.add('active');
        else t.classList.remove('active');
    });

    if (counter) {
        counter.textContent = 'Perspective 0' + (idx + 1) + ' / 0' + perspectiveCount;
    }
};

window.aureoCarouselNext = function () {
    var next = (currentPerspectiveIndex + 1) % perspectiveCount;
    var thumbs = document.querySelectorAll('.carousel-thumb');
    window.aureoSetPerspective(next, thumbs[next]);
};

window.aureoCarouselPrev = function () {
    var prev = (currentPerspectiveIndex - 1 + perspectiveCount) % perspectiveCount;
    var thumbs = document.querySelectorAll('.carousel-thumb');
    window.aureoSetPerspective(prev, thumbs[prev]);
};

window.aureoToggleCarouselAuto = function () {
    var label = document.getElementById('autoplay-label');
    isCarouselAuto = !isCarouselAuto;
    if (isCarouselAuto) {
        startCarouselInterval();
        if (label) label.textContent = 'Autoplay';
    } else {
        clearInterval(carouselAutoInterval);
        if (label) label.textContent = 'Paused';
    }
};

function startCarouselInterval() {
    clearInterval(carouselAutoInterval);
    carouselAutoInterval = setInterval(function () {
        if (isCarouselAuto) {
            window.aureoCarouselNext();
        }
    }, 6000);
}

// 8. Gallery Category Filter
window.aureoFilterGallery = function (cat, btn) {
    document.querySelectorAll('.filter-pill').forEach(function (b) {
        b.classList.remove('active');
    });
    if (btn) btn.classList.add('active');

    var cards = document.querySelectorAll('.gallery-card');
    cards.forEach(function (card) {
        var cardCat = card.getAttribute('data-cat');
        if (cat === 'all' || cardCat === cat) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
};

// 9. Vision Form Submit
window.aureoVisionSubmit = function (e) {
    e.preventDefault();
    var email = document.getElementById('vision-email').value;
    var wrap = document.getElementById('vision-form-wrap');
    var success = document.getElementById('vision-success');
    if (email) {
        if (wrap) wrap.style.display = 'none';
        if (success) success.style.display = 'flex';
    }
};

// 10. Inquiry Form AJAX Submit
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
    .then(function () {
        form.style.display = 'none';
        if (successBlock) successBlock.style.display = 'block';
    })
    .catch(function () {
        form.style.display = 'none';
        if (successBlock) successBlock.style.display = 'block';
    });
};

// DOM Content Loaded Handler
document.addEventListener('DOMContentLoaded', function () {
    // 1. Start Carousel Autoplay
    startCarouselInterval();

    // 2. IntersectionObserver for Scroll Animations
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
            observer.observe(el);
        });
    } else {
        document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
            el.classList.add('is-visible');
        });
    }

    // 3. Scroll Progress & Header Glass Transition
    var progressBar = document.getElementById('scroll-progress');
    var headerInner = document.getElementById('site-header-inner');
    var floatingCta = document.getElementById('floating-cta');

    window.addEventListener('scroll', function () {
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (height > 0) ? (winScroll / height) : 0;

        if (progressBar) {
            progressBar.style.transform = 'scaleX(' + scrolled + ')';
        }

        if (headerInner) {
            if (winScroll > 30) {
                headerInner.classList.add('scrolled');
            } else {
                headerInner.classList.remove('scrolled');
            }
        }

        if (floatingCta) {
            if (winScroll > 300) {
                floatingCta.classList.add('visible');
            } else {
                floatingCta.classList.remove('visible');
            }
        }
    }, { passive: true });

    // 4. Keyboard ESC Listener
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            window.aureoCloseInquiry();
            window.aureoCloseVirtualTour();
            window.aureoCloseLightbox();
            var drawer = document.getElementById('menu-drawer');
            if (drawer && drawer.classList.contains('is-open')) {
                window.aureoToggleMenu();
            }
        }
    });
});
