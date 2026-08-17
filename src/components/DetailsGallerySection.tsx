import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAureo } from '../context/AureoContext';
import { ArchitecturalPiece } from '../data/residences';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

interface DetailsGallerySectionProps {
  onImageClick?: (image: {
    url: string;
    title?: string;
    caption?: string;
    location?: string;
    narrative?: string;
    specs?: { area: string; completion: string; architect: string; bedrooms?: string; lotSize?: string };
  }) => void;
  onOpenInquiry?: (location?: string) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Works' },
  { id: 'lakefront', label: 'Lakefront Cantilevers' },
  { id: 'coastal', label: 'Coastal Terraces' },
  { id: 'alpine', label: 'Alpine Stone' }
];

export const DetailsGallerySection: React.FC<DetailsGallerySectionProps> = ({
  onImageClick,
  onOpenInquiry
}) => {
  const { residences } = useAureo();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredCards = selectedCategory === 'all'
    ? residences
    : residences.filter((card) => card.category === selectedCategory);

  return (
    <section id="details" className="w-full bg-white py-28 sm:py-36 md:py-44">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-aureo-gold-600 animate-pulse" />
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-aureo-gold-800">
                Curated Dossiers
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-stone-900 tracking-tight">
              Selected Architectural Pieces
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 max-w-sm leading-relaxed font-light">
            Each estate is an unrepeatable monolithic response to topography, crafted with low-carbon concrete and volcanic basalt.
          </p>
        </div>

        {/* Filter Tabs Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-bold tracking-wider transition-all duration-300 whitespace-nowrap focus:outline-none cursor-pointer ${
                  isSelected
                    ? 'text-white shadow-md'
                    : 'text-stone-700 hover:text-stone-950 bg-stone-100/80 hover:bg-stone-200/80'
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="active-filter-pill"
                    className="absolute inset-0 rounded-full bg-stone-900"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3-Column Dossiers Grid with Double-Bezel Enclosures */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCards.map((card: ArchitecturalPiece, index: number) => (
              <motion.article
                key={card.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                onClick={() =>
                  onImageClick?.({
                    url: card.imageUrl,
                    title: card.title,
                    caption: `${card.location} · ${card.specs.area} · Completed ${card.specs.completion}`,
                    location: card.location,
                    narrative: card.narrative,
                    specs: card.specs
                  })
                }
                className="group p-2 rounded-3xl bg-stone-900/[0.02] ring-1 ring-black/[0.06] hover:ring-black/[0.14] transition-all duration-500 cursor-pointer flex flex-col transform hover:-translate-y-1.5"
              >
                {/* Inner Core */}
                <div className="rounded-[calc(1.5rem-0.5rem)] overflow-hidden bg-white shadow-sm flex flex-col h-full justify-between">
                  
                  {/* Image Frame with Badges */}
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-stone-900">
                    <img
                      src={card.imageUrl}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      loading="lazy"
                    />

                    {/* Top Category Badge */}
                    <div className="absolute top-3.5 left-3.5">
                      <span className="px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold text-stone-900 uppercase tracking-wider shadow-sm">
                        {card.tag}
                      </span>
                    </div>

                    {/* Top-Right Quick Expand Icon */}
                    <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white">
                        <ArrowUpRight size={14} className="text-aureo-gold-400" />
                      </div>
                    </div>

                    {/* Bottom Specs Bar Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/85 via-black/45 to-transparent flex items-center justify-between text-[11px] text-white/90 font-mono">
                      <span>{card.specs.area}</span>
                      <span>{card.specs.bedrooms}</span>
                      <span>{card.specs.completion}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                    <div>
                      <div className="text-[11px] text-aureo-gold-800 font-bold uppercase tracking-wider mb-1 font-mono">
                        {card.location}
                      </div>

                      <h3 className="text-2xl font-serif font-bold text-stone-900 tracking-tight group-hover:text-aureo-gold-800 transition-colors">
                        {card.title}
                      </h3>

                      <p className="mt-3 text-xs text-stone-600 leading-relaxed font-light line-clamp-3">
                        {card.description}
                      </p>
                    </div>

                    {/* Action Row */}
                    <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenInquiry?.(card.title);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-900 hover:text-aureo-gold-800 transition-colors cursor-pointer"
                      >
                        <ShieldCheck size={14} className="text-aureo-gold-700" />
                        <span>Request Dossier</span>
                      </button>

                      <div className="flex items-center gap-1 text-xs font-bold text-aureo-gold-800 group-hover:translate-x-1 transition-transform">
                        <span>Explore</span>
                        <ArrowUpRight size={14} />
                      </div>
                    </div>
                  </div>

                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
