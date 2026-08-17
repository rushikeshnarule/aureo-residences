import React from 'react';
import { motion } from 'framer-motion';
import { useAureo } from '../context/AureoContext';
import { ArrowUpRight } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  const { philosophyPillars } = useAureo();

  return (
    <section id="philosophy" className="w-full bg-[#f8f5ee] border-y border-stone-200/80 py-28 sm:py-36">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-aureo-gold-600 animate-pulse" />
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-aureo-gold-800">
              Spatial Philosophy
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.08]">
            Built for permanence. Designed for serenity.
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-stone-600 max-w-lg leading-relaxed font-light">
            Every architectural gesture is governed by timeless proportion, topography resonance, and monolithic permanence.
          </p>
        </div>

        {/* 3 Pillars Grid with Double-Bezel Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {philosophyPillars.map((pillar, index) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group p-2 rounded-3xl bg-stone-900/[0.02] ring-1 ring-black/[0.06] hover:ring-black/[0.12] transition-all duration-400 flex flex-col"
            >
              {/* Inner Concentric Core */}
              <div className="p-8 sm:p-10 rounded-[calc(1.5rem-0.5rem)] bg-white shadow-sm hover:shadow-xl transition-all duration-400 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl sm:text-4xl font-serif font-bold text-aureo-gold-700 group-hover:text-aureo-gold-800 transition-colors font-mono">
                      {pillar.number}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-stone-100 group-hover:bg-aureo-gold-600 text-stone-400 group-hover:text-white flex items-center justify-center transition-colors">
                      <ArrowUpRight size={13} />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tracking-tight mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                    {pillar.detail}
                  </p>
                </div>

                <div className="mt-10 pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400 font-mono">
                  <span className="uppercase tracking-widest font-bold text-aureo-gold-800">Aureo Principle</span>
                  <span>Zurich Atelier</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
