import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, FileText } from 'lucide-react';

interface FloatingInquiryButtonProps {
  onOpenInquiry: () => void;
  onOpenVirtualTour: () => void;
  onOpenAIConcierge: () => void;
  onOpenSpatialBrief?: () => void;
}

export const FloatingInquiryButton: React.FC<FloatingInquiryButtonProps> = ({
  onOpenInquiry,
  onOpenVirtualTour,
  onOpenAIConcierge,
  onOpenSpatialBrief
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2"
        >
          {/* AI Advisory Concierge Pill */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenAIConcierge}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white backdrop-blur-md shadow-2xl border border-aureo-gold-500/40 text-xs font-bold tracking-wider transition-all cursor-pointer group"
          >
            <div className="relative">
              <Sparkles size={14} className="text-aureo-gold-400 animate-pulse" />
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <span className="hidden sm:inline text-[11px] uppercase tracking-widest text-aureo-gold-300 font-mono">
              AI Advisory
            </span>
          </motion.button>

          {/* AI Spatial Brief Pill */}
          {onOpenSpatialBrief && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenSpatialBrief}
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-[#f3efe8] hover:bg-[#eae3d5] text-stone-800 backdrop-blur-md shadow-lg border border-stone-300 text-xs font-bold tracking-wider transition-colors cursor-pointer"
              title="Generate Bespoke Spatial Feasibility Brief"
            >
              <FileText size={13} className="text-aureo-gold-700" />
              <span>AI Brief</span>
            </motion.button>
          )}

          {/* Quick 360 Tour Pill */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenVirtualTour}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-stone-50 text-stone-800 backdrop-blur-md shadow-xl border border-stone-200 text-xs font-bold tracking-wider hover:border-aureo-gold-500 transition-colors cursor-pointer"
          >
            <Compass size={14} className="text-aureo-gold-700" />
            <span>360° View</span>
          </motion.button>

          {/* Quick Inquiry CTA */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenInquiry}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-aureo-gold-600 hover:bg-aureo-gold-500 text-white backdrop-blur-md shadow-2xl shadow-aureo-gold-950/20 text-xs font-bold uppercase tracking-widest transition-all border border-aureo-gold-400/50 cursor-pointer"
          >
            <Sparkles size={13} className="text-white" />
            <span>Inquire</span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

