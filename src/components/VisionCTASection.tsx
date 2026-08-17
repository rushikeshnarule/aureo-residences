import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { VISION_DATA } from '../data/residences';
import { Check, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface VisionCTASectionProps {
  onOpenInquiry?: () => void;
}

export const VisionCTASection: React.FC<VisionCTASectionProps> = ({ onOpenInquiry }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 5000);
    }
  };

  return (
    <section id="inquire" className="w-full bg-[#f6f2e9] py-28 sm:py-40 border-t border-stone-300/80">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 text-center">
        
        {/* Subtle Top Monograph Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-stone-200 text-stone-900 text-[10px] font-bold tracking-[0.25em] uppercase mb-8 shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-aureo-gold-600 animate-pulse" />
          <span>Private Atelier Consultation</span>
        </motion.div>

        {/* Serif Headline with Inline Image Glyph */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-stone-900 tracking-tight leading-[1.25] flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
        >
          <span>{VISION_DATA.prefix}</span>
          
          <span className="inline-flex items-center">
            <span>finds its</span>
            <span className="inline-block mx-3 relative top-1">
              <span className="block w-16 sm:w-24 md:w-28 h-8 sm:h-10 md:h-12 rounded-full overflow-hidden shadow-lg border-2 border-white group-hover:scale-105 transition-transform duration-500">
                <img
                  src={VISION_DATA.inlineImage}
                  alt="Interior architecture detail glyph"
                  className="w-full h-full object-cover"
                />
              </span>
            </span>
            <span>{VISION_DATA.suffix}</span>
          </span>
        </motion.h2>

        {/* Narrative Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-sm sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed font-light"
        >
          {VISION_DATA.description}
        </motion.p>

        {/* Action Form in Double-Bezel Enclosure */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 sm:mt-14 max-w-xl mx-auto"
        >
          <div className="p-2 sm:p-2.5 rounded-[2rem] bg-stone-900/[0.03] ring-1 ring-black/[0.06]">
            <div className="p-2 sm:p-3 rounded-[calc(2rem-0.625rem)] bg-white shadow-sm">
              {isSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Check size={16} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold">Confidential Registry Confirmed</h4>
                    <p className="text-xs text-emerald-700">A Senior Partner will transmit our private monograph to your address.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter private email address..."
                    className="flex-1 px-5 py-3.5 rounded-full bg-stone-50 border border-stone-200 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-aureo-gold-500/30 focus:border-aureo-gold-600"
                  />
                  <button
                    type="submit"
                    className="group pl-6 pr-2 py-2 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center justify-center gap-2.5 shrink-0 cursor-pointer"
                  >
                    <span>Join Registry</span>
                    <div className="w-7 h-7 rounded-full bg-white/15 group-hover:bg-aureo-gold-500 text-white flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:rotate-45">
                      <ArrowUpRight size={13} />
                    </div>
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-stone-500">
            <span className="flex items-center gap-1">
              <ShieldCheck size={13} className="text-aureo-gold-700" />
              <span>Strict Swiss NDA Guarantee</span>
            </span>
            <span>·</span>
            <button
              onClick={onOpenInquiry}
              className="text-stone-900 hover:text-aureo-gold-700 font-bold underline transition-colors cursor-pointer"
            >
              Direct Partner Consult
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
