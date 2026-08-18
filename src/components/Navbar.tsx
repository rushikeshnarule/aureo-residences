import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../data/residences';
import { MenuDrawer } from './MenuDrawer';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenInquiry?: () => void;
  onOpenAIConcierge?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry, onOpenAIConcierge }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
      setIsScrolled(winScroll > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* 1. Precision Golden Scroll Line */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-aureo-gold-400 via-aureo-gold-600 to-aureo-gold-400 z-50 origin-left transition-all duration-75"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />

      {/* 2. Floating Island Header Pill */}
      <div className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 pt-4 sm:pt-5 pointer-events-none transition-all duration-500">
        <header
          className={`pointer-events-auto max-w-6xl mx-auto rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] px-5 sm:px-8 py-3.5 flex items-center justify-between ${
            isScrolled
              ? 'bg-white/85 backdrop-blur-2xl border border-stone-200/90 shadow-[0_8px_32px_rgba(0,0,0,0.06)]'
              : 'bg-white/60 backdrop-blur-xl border border-stone-200/50 shadow-sm'
          }`}
        >
          {/* Left Navigation (Desktop) */}
          <nav className="hidden md:flex items-center space-x-7 text-xs font-semibold uppercase tracking-[0.18em] text-stone-700">
            <a
              href="#destinations"
              className="hover:text-aureo-gold-700 transition-colors py-1 relative group"
            >
              <span>{NAV_LINKS[0].label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-aureo-gold-600 transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="#philosophy"
              className="hover:text-aureo-gold-700 transition-colors py-1 relative group"
            >
              <span>{NAV_LINKS[1].label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-aureo-gold-600 transition-all duration-300 group-hover:w-full" />
            </a>
          </nav>

          {/* Center Brand Wordmark */}
          <a
            href="#"
            className="text-stone-900 text-lg sm:text-xl font-serif font-bold tracking-[0.32em] uppercase hover:text-aureo-gold-700 transition-colors select-none text-center"
          >
            A U R E O
          </a>

          {/* Right Navigation & Inquiry Trigger */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold uppercase tracking-[0.18em] text-stone-700">
              <a
                href="#details"
                className="hover:text-aureo-gold-700 transition-colors py-1 relative group"
              >
                <span>{NAV_LINKS[2].label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-aureo-gold-600 transition-all duration-300 group-hover:w-full" />
              </a>
              <a
                href="#journal"
                className="hover:text-aureo-gold-700 transition-colors py-1 relative group"
              >
                <span>{NAV_LINKS[3].label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-aureo-gold-600 transition-all duration-300 group-hover:w-full" />
              </a>
            </nav>

            {/* AI Advisory Concierge Button */}
            {onOpenAIConcierge && (
              <button
                onClick={onOpenAIConcierge}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200/80 text-stone-800 text-[10px] font-bold uppercase tracking-wider transition-colors border border-stone-200 cursor-pointer"
                title="Open AI Architectural Concierge"
              >
                <Sparkles size={11} className="text-aureo-gold-700 animate-pulse" />
                <span>AI Advisory</span>
              </button>
            )}

            {/* Nested CTA with "Button-in-Button" Trailing Icon */}
            <button
              onClick={onOpenInquiry}
              className="group hidden sm:inline-flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-bold uppercase tracking-wider transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
            >
              <span>Inquire</span>
              <div className="w-6 h-6 rounded-full bg-white/15 group-hover:bg-aureo-gold-500 text-white flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:rotate-45">
                <ArrowUpRight size={12} />
              </div>
            </button>

            {/* Minimalist Animated Hamburger Trigger */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="group p-2 -mr-1 flex flex-col justify-center items-end gap-1.5 focus:outline-none rounded-full hover:bg-stone-100/80 transition-colors cursor-pointer"
              aria-label="Open navigation menu"
            >
              <span className="block w-5 h-[1.5px] bg-stone-800 rounded-full group-hover:w-6 group-hover:bg-aureo-gold-600 transition-all duration-300" />
              <span className="block w-3.5 h-[1.5px] bg-stone-800 rounded-full group-hover:w-6 group-hover:bg-aureo-gold-600 transition-all duration-300" />
              <span className="block w-5 h-[1.5px] bg-stone-800 rounded-full group-hover:w-6 group-hover:bg-aureo-gold-600 transition-all duration-300" />
            </button>
          </div>
        </header>
      </div>

      {/* Full-screen Slide-out Menu Drawer */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenInquiry={onOpenInquiry}
        onOpenAIConcierge={onOpenAIConcierge}
      />
    </>
  );
};

