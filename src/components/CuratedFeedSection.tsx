import React from 'react';
import { motion } from 'framer-motion';
import { JOURNAL_FEED, JournalItem } from '../data/residences';
import { ArrowUpRight } from 'lucide-react';

interface CuratedFeedSectionProps {
  onImageClick: (image: { url: string; title?: string; caption?: string; location?: string }) => void;
}

export const CuratedFeedSection: React.FC<CuratedFeedSectionProps> = ({ onImageClick }) => {
  return (
    <section className="w-full bg-[#fbf9f5] border-t border-stone-200/80 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-aureo-gold-600 animate-pulse" />
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-aureo-gold-800">
                Atelier Journal & Feed
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900 tracking-tight">
              Behind The Monoliths
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-900 hover:text-aureo-gold-700 transition-colors pb-1 border-b border-stone-300 hover:border-aureo-gold-600 self-start sm:self-auto cursor-pointer"
          >
            <span>Follow @AureoStudio</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* 4-Item Curated Grid with Double-Bezel Framing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {JOURNAL_FEED.map((item: JournalItem, idx: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() =>
                onImageClick({
                  url: item.imageUrl,
                  title: item.title,
                  caption: `Curated study in ${item.category}. Published ${item.date}.`,
                  location: "Aureo Research Atelier"
                })
              }
              className="group p-2 rounded-3xl bg-stone-900/[0.02] ring-1 ring-black/[0.06] hover:ring-black/[0.12] transition-all duration-400 cursor-pointer flex flex-col transform hover:-translate-y-1"
            >
              {/* Inner Core */}
              <div className="rounded-[calc(1.5rem-0.5rem)] overflow-hidden bg-white shadow-sm flex flex-col h-full justify-between">
                <div className={`relative ${item.aspect} w-full overflow-hidden bg-stone-100`}>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[9px] font-bold uppercase tracking-wider text-stone-900 shadow-sm font-mono">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-serif font-bold text-stone-900 group-hover:text-aureo-gold-800 transition-colors">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-stone-400 font-mono">{item.date}</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-stone-100 group-hover:bg-aureo-gold-600 text-stone-400 group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowUpRight size={11} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
