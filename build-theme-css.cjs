const fs = require('fs');

const themeHeader = `/*
Theme Name: Aureo
Theme URI: https://aureo-residences.com/
Author: Aureo Architecture Studio
Author URI: https://aureo-residences.com/
Description: Ultra-luxury WordPress theme for architecture studios, monolithic private estates, and bespoke residences. Features ambient video hero, 360 spatial tours, interactive perspective carousels, and private acquisition inquiry systems.
Version: 1.0.2
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: aureo
Tags: luxury, architecture, real-estate, custom-post-types, full-width-template, theme-options, translation-ready, block-styles
*/

@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
`;

const customStyles = `
:root {
  --aureo-teal-950: #05222a;
  --aureo-teal-900: #07333e;
  --aureo-teal-800: #0d5b6e;
  --aureo-teal-700: #14768f;
  --aureo-teal-600: #2393af;
  --aureo-teal-500: #3a879e;
  --aureo-teal-300: #82b9c9;
  --aureo-gold-700: #a67e37;
  --aureo-gold-600: #b88d3f;
  --aureo-gold-500: #c5a059;
  --aureo-gold-400: #d7b775;
  --aureo-gold-300: #e5cf98;
  --aureo-emerald-900: #07241b;
  --aureo-emerald-800: #0e382b;
  --aureo-dark: #111111;
  --aureo-muted: #6b7280;
}

html {
  scroll-behavior: smooth;
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  color: #111111;
  background-color: #ffffff;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, .font-serif, .font-serif-heading {
  font-family: 'Cormorant Garamond', Georgia, serif;
}

.hero-gradient {
  background: linear-gradient(180deg, 
    #094858 0%, 
    #0d5b6e 15%, 
    #17738c 35%, 
    #2c8ea7 55%, 
    #5baec4 75%, 
    #93cddc 90%,
    #d1edf5 98%,
    #ffffff 100%
  );
}

.hero-overlay-fade {
  background: linear-gradient(to bottom, 
    rgba(255, 255, 255, 0) 0%, 
    rgba(255, 255, 255, 0.02) 20%, 
    rgba(255, 255, 255, 0.12) 40%, 
    rgba(255, 255, 255, 0.35) 60%, 
    rgba(255, 255, 255, 0.7) 78%, 
    rgba(255, 255, 255, 0.94) 90%, 
    #ffffff 100%
  );
}

.mask-hero-fade {
  mask-image: linear-gradient(to bottom, 
    black 0%, 
    black 45%, 
    rgba(0,0,0,0.95) 60%, 
    rgba(0,0,0,0.7) 75%, 
    rgba(0,0,0,0.35) 88%, 
    rgba(0,0,0,0.08) 96%, 
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(to bottom, 
    black 0%, 
    black 45%, 
    rgba(0,0,0,0.95) 60%, 
    rgba(0,0,0,0.7) 75%, 
    rgba(0,0,0,0.35) 88%, 
    rgba(0,0,0,0.08) 96%, 
    transparent 100%
  );
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

.aureo-menu-burger {
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-end !important;
  justify-content: center !important;
  gap: 5px !important;
  background: transparent !important;
  border: none !important;
  cursor: pointer !important;
  padding: 8px !important;
  z-index: 50 !important;
}

.aureo-menu-burger span {
  display: block !important;
  height: 2px !important;
  background-color: #ffffff !important;
  border-radius: 2px !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.aureo-menu-burger .line-1 { width: 26px !important; }
.aureo-menu-burger .line-2 { width: 18px !important; }
.aureo-menu-burger .line-3 { width: 26px !important; }

.aureo-menu-burger:hover span {
  width: 28px !important;
  background-color: #d7b775 !important;
}

#menu-drawer {
  display: none;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateY(-10px);
  transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), 
              visibility 0.35s cubic-bezier(0.16, 1, 0.3, 1), 
              transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

#menu-drawer.aureo-drawer-active {
  display: flex !important;
  opacity: 1 !important;
  visibility: visible !important;
  pointer-events: auto !important;
  transform: translateY(0) !important;
}

.aureo-modal {
  display: none;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.aureo-modal.aureo-modal-active {
  display: flex !important;
  opacity: 1 !important;
  visibility: visible !important;
  pointer-events: auto !important;
}

.aureo-modal-dialog {
  transform: scale(0.96) translateY(10px);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.aureo-modal.aureo-modal-active .aureo-modal-dialog {
  transform: scale(1) translateY(0);
}

.aureo-card-lift {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.aureo-card-lift:hover {
  transform: translateY(-6px);
}
`;

const compiled = fs.readFileSync('./wordpress-theme/aureo/assets/css/aureo-compiled.css', 'utf8');

const finalCss = themeHeader + '\n\n' + customStyles + '\n\n' + compiled;

fs.writeFileSync('./wordpress-theme/aureo/style.css', finalCss, 'utf8');
console.log('Successfully written complete self-contained style.css! Total bytes: ' + finalCss.length);
