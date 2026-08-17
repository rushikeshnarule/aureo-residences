import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAureo } from '../context/AureoContext';
import { X, Check, Lock, ShieldCheck, Sparkles } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultLocation?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  defaultLocation = "Zurich"
}) => {
  const { addInquiry } = useAureo();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    investmentTier: '$25M – $50M',
    location: defaultLocation,
    notes: '',
    timeframe: 'Immediate Acquisition',
    ndaAgreed: true
  });

  // Sync location when modal opens or defaultLocation prop changes
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({ ...prev, location: defaultLocation }));
    }
  }, [isOpen, defaultLocation]);

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;

    addInquiry({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      investmentTier: formData.investmentTier,
      notes: formData.notes
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      // Reset form after close
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        investmentTier: '$25M – $50M',
        location: defaultLocation,
        notes: '',
        timeframe: 'Immediate Acquisition',
        ndaAgreed: true
      });
      onClose();
    }, 4000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl my-auto border border-stone-200"
        >
          {/* Luminous Warm Alabaster Header */}
          <div className="bg-[#f5f0e6] p-6 sm:p-8 text-stone-900 relative border-b border-stone-200">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-800 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-aureo-gold-600 animate-pulse" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-aureo-gold-800">
                Private Advisory Service
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              Request Confidential Dossier
            </h3>

            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-lg">
              Direct access to our partners in Zurich, Milan, and Aspen for off-market acquisitions and bespoke architectural commissions.
            </p>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 bg-white max-h-[75vh] overflow-y-auto">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
                  <Check size={32} />
                </div>
                <h4 className="text-2xl font-serif font-bold text-stone-900">
                  Confidential Inquiry Confirmed
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mt-2 leading-relaxed">
                  A Senior Advisory Partner from our Zurich atelier will establish contact through your designated private channel within 12 hours.
                </p>
                <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 text-xs text-stone-700 font-mono">
                  <Lock size={12} className="text-aureo-gold-700" />
                  <span>Encrypted Dossier ID: AUR-2026-CH</span>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Territory of Interest */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-800 block mb-2">
                    Territory of Interest
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Zurich", "Costa Brava", "Aspen"].map((loc) => (
                      <button
                        type="button"
                        key={loc}
                        onClick={() => setFormData({ ...formData, location: loc })}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                          formData.location === loc
                            ? 'bg-stone-900 text-white border-stone-900 shadow-md'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-stone-600 block mb-1.5">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Lord Harrison Sterling"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-aureo-gold-500/30 focus:border-aureo-gold-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-600 block mb-1.5">
                      Direct Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="harrison@sterling-partners.ch"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-aureo-gold-500/30 focus:border-aureo-gold-600"
                    />
                  </div>
                </div>

                {/* Telephone & Investment Tier */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-stone-600 block mb-1.5">
                      Private Telephone / Signal
                    </label>
                    <input
                      type="tel"
                      placeholder="+41 44 215 8800"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-aureo-gold-500/30 focus:border-aureo-gold-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-600 block mb-1.5">
                      Investment Bracket
                    </label>
                    <select
                      value={formData.investmentTier}
                      onChange={(e) => setFormData({ ...formData, investmentTier: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-aureo-gold-500/30 focus:border-aureo-gold-600 bg-white"
                    >
                      <option>$15M – $25M USD</option>
                      <option>$25M – $50M USD</option>
                      <option>$50M+ USD Bespoke Monograph</option>
                    </select>
                  </div>
                </div>

                {/* Confidential Notes */}
                <div>
                  <label className="text-xs font-semibold text-stone-600 block mb-1.5">
                    Architectural Specifications & Privacy Directives
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide specific lot requirements, privacy covenants, or helipad specifications..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-aureo-gold-500/30 focus:border-aureo-gold-600 resize-none"
                  />
                </div>

                {/* Swiss NDA Check */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
                  <ShieldCheck size={18} className="text-aureo-gold-700 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    By submitting, your inquiry is sealed under Swiss banking-grade confidentiality. No broker distribution or public registry recording.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-aureo-gold-600 hover:bg-aureo-gold-500 text-white text-xs font-bold uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 border border-aureo-gold-400/50 cursor-pointer"
                >
                  <Sparkles size={13} />
                  <span>Submit Confidential Inquiry</span>
                </button>

              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
