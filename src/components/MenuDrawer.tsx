import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../data/residences';
import { X, ArrowUpRight, Sparkles } from 'lucide-react';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry?: () => void;
  onOpenAIConcierge?: () => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  onOpenInquiry,
  onOpenAIConcierge
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#fbf9f5] text-stone-900 p-6 sm:p-10 md:p-16 overflow-y-auto flex flex-col justify-between"
        >
          {/* Header */}
          <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
            <span className="text-xl md:text-2xl font-serif font-bold tracking-[0.3em] uppercase text-stone-900 select-none">
              A U R E O
            </span>

            <button
              onClick={onClose}
              className="w-11 h-11 rounded-full border border-stone-300 flex items-center justify-center hover:bg-stone-200/60 active:scale-95 transition-all cursor-pointer text-stone-800"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="max-w-7xl mx-auto w-full my-auto py-10 sm:py-14">
            <nav className="flex flex-col space-y-4 sm:space-y-6">
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
                  onClick={onClose}
                  className="group flex items-center justify-between py-2 border-b border-stone-200 text-2xl sm:text-5xl md:text-6xl font-serif font-bold text-stone-800 hover:text-aureo-gold-700 transition-all"
                >
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    <span className="text-xs sm:text-sm font-sans font-semibold text-aureo-gold-700">
                      0{index + 1}.
                    </span>
                    <span>{link.label}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="hidden md:inline text-xs font-sans font-light text-stone-500 tracking-wider">
                      {link.subtitle}
                    </span>
                    <ArrowUpRight
                      size={28}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-aureo-gold-700"
                    />
                  </div>
                </motion.a>
              ))}
            </nav>
          </div>

          {/* Footer of Drawer */}
          <div className="max-w-7xl mx-auto w-full pt-6 sm:pt-8 border-t border-stone-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs sm:text-sm text-stone-600">
            <div>
              <p className="text-stone-900 font-medium mb-0.5">
                Aureo Architecture & Bespoke Estates
              </p>
              <p className="text-stone-500">
                Zurich · Milan · Malibu · Tokyo · Aspen
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {onOpenAIConcierge && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenAIConcierge();
                  }}
                  className="px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Sparkles size={12} className="text-aureo-gold-400" />
                  <span>AI Advisory Concierge</span>
                </button>
              )}

              <button
                onClick={() => {
                  onClose();
                  onOpenInquiry?.();
                }}
                className="px-6 py-2.5 rounded-full bg-aureo-gold-600 hover:bg-aureo-gold-500 text-white font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>Private Consultation</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

