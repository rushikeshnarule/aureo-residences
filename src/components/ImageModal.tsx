import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Check, Copy, Sparkles } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry: (location?: string) => void;
  image: {
    url: string;
    title?: string;
    caption?: string;
    location?: string;
    narrative?: string;
    specs?: {
      area: string;
      completion: string;
      architect: string;
      bedrooms?: string;
      lotSize?: string;
    };
  } | null;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  onOpenInquiry,
  image
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !image) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 25 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] border border-stone-100"
        >
          {/* Top Close Bar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95 shadow-md"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Main Visual Frame */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-stone-950 overflow-hidden shrink-0">
            <img
              src={image.url}
              alt={image.title || 'Architectural View'}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details & Specifications */}
          <div className="p-6 sm:p-8 overflow-y-auto bg-white flex flex-col justify-between gap-6">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="max-w-2xl">
                {image.location && (
                  <div className="flex items-center text-xs tracking-wider uppercase text-aureo-gold-700 font-bold mb-1.5">
                    <MapPin size={13} className="mr-1.5 inline shrink-0" />
                    {image.location}
                  </div>
                )}
                {image.title && (
                  <h3 className="text-2xl sm:text-4xl font-serif font-bold text-aureo-dark tracking-tight">
                    {image.title}
                  </h3>
                )}
                {image.narrative ? (
                  <p className="text-xs sm:text-sm text-aureo-muted mt-3 leading-relaxed font-light">
                    {image.narrative}
                  </p>
                ) : image.caption ? (
                  <p className="text-xs sm:text-sm text-aureo-muted mt-3 leading-relaxed font-light">
                    {image.caption}
                  </p>
                ) : null}
              </div>

              {/* Specs Box */}
              {image.specs && (
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-100 min-w-[280px]">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-semibold">Scale</span>
                    <span className="text-xs font-bold text-aureo-dark">{image.specs.area}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-semibold">Year</span>
                    <span className="text-xs font-bold text-aureo-dark">{image.specs.completion}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-semibold">Accommodations</span>
                    <span className="text-xs font-bold text-aureo-dark">{image.specs.bedrooms || 'Custom Suites'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-semibold">Studio</span>
                    <span className="text-xs font-bold text-aureo-dark">{image.specs.architect}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-aureo-dark transition-colors font-semibold"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                <span>{copied ? 'Dossier Copied' : 'Share Residence Dossier'}</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    onClose();
                    onOpenInquiry(image.location);
                  }}
                  className="px-7 py-3 rounded-full bg-aureo-gold-600 hover:bg-aureo-gold-700 text-white text-xs font-bold uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center gap-2"
                >
                  <Sparkles size={13} />
                  <span>Inquire For Private Acquisition</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
