import React from 'react';
import { FOOTER_LINKS } from '../data/residences';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="w-full bg-[#f4f0e6] text-stone-900 border-t border-stone-300/70 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
        
        {/* Top 3-Column Studio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-stone-300/70">
          
          {/* Brand & Monograph Philosophy */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <a
                href="#"
                className="text-2xl sm:text-3xl font-serif font-bold tracking-[0.3em] uppercase text-stone-900 hover:text-aureo-gold-700 transition-colors select-none"
              >
                A U R E O
              </a>
              <p className="mt-4 text-xs sm:text-sm text-stone-600 max-w-sm leading-relaxed font-light">
                Architectural ateliers crafting monolithic private residences in Zurich, Costa Brava, and Aspen.
              </p>
            </div>

            <div className="mt-8 text-xs text-stone-500 font-mono">
              Zurich · Milan · Malibu · Aspen · Tokyo
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-aureo-gold-800 mb-4">
              Residences & Atelier
            </h4>
            <ul className="space-y-3 text-xs text-stone-600">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    className="hover:text-stone-950 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Private Advisory Inquiries */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-aureo-gold-800 mb-4">
              Private Advisory Desk
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              For off-market acquisitions, bespoke land commissions, or architectural press inquiries.
            </p>
            <a
              href="mailto:inquiries@aureo-residences.com"
              className="text-sm font-serif font-bold text-stone-900 hover:text-aureo-gold-700 underline decoration-aureo-gold-600 transition-colors"
            >
              inquiries@aureo-residences.com
            </a>
          </div>

        </div>

        {/* Bottom Single Line Copyright & Back-to-Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Aureo Architecture & Bespoke Residences. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#destinations" className="hover:text-stone-900 transition-colors">Privacy Charter</a>
            <a href="#destinations" className="hover:text-stone-900 transition-colors">Terms of Atelier</a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-stone-900 transition-colors ml-4 text-stone-600 cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
