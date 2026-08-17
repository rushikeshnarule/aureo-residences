import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LEGACY_DATA, Hotspot } from '../data/residences';
import { Sparkles, Info, Eye, ChevronLeft, ChevronRight, Play, Pause, Compass } from 'lucide-react';

interface LegacySectionProps {
  onImageClick: (image: { url: string; title?: string; caption?: string; location?: string }) => void;
  onOpenVirtualTour: () => void;
}

export const LegacySection: React.FC<LegacySectionProps> = ({ onImageClick, onOpenVirtualTour }) => {
  const [activePerspectiveIndex, setActivePerspectiveIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const perspectives = LEGACY_DATA.perspectives;
  const currentPerspective = perspectives[activePerspectiveIndex];

  // Auto-play interval
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActivePerspectiveIndex((prev) => (prev + 1) % perspectives.length);
      setActiveHotspot(null);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, perspectives.length]);

  const handleNext = () => {
    setActivePerspectiveIndex((prev) => (prev + 1) % perspectives.length);
    setActiveHotspot(null);
  };

  const handlePrev = () => {
    setActivePerspectiveIndex((prev) => (prev - 1 + perspectives.length) % perspectives.length);
    setActiveHotspot(null);
  };

  return (
    <section id="residences" className="w-full bg-white py-24 sm:py-36 md:py-44 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Typography & Perspective Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            {/* Architectural Discipline Subtitle */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-aureo-gold-600" />
              <span className="text-xs uppercase tracking-widest font-bold text-aureo-gold-800">
                Monolithic Residences
              </span>
            </div>

            {/* Bold Serif Headline */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.1] whitespace-pre-line">
              {LEGACY_DATA.headline}
            </h2>

            {/* Editorial Body Paragraph */}
            <p className="mt-6 text-sm sm:text-base text-stone-600 leading-relaxed max-w-md font-light">
              {LEGACY_DATA.description}
            </p>

            {/* Interactive Perspective Selector Thumbnails */}
            <div className="mt-10 sm:mt-12">
              <div className="flex items-center justify-between max-w-md mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400 font-mono">
                  Perspective 0{activePerspectiveIndex + 1} / 0{perspectives.length}
                </span>
                
                {/* Autoplay Pause / Play Toggle */}
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-aureo-gold-800 transition-colors cursor-pointer"
                  title={isAutoPlaying ? "Pause autoplay" : "Resume autoplay"}
                >
                  {isAutoPlaying ? <Pause size={12} /> : <Play size={12} />}
                  <span className="text-[11px] font-semibold font-mono">{isAutoPlaying ? 'Autoplay' : 'Paused'}</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-md">
                {perspectives.map((perspective, idx) => {
                  const isActive = idx === activePerspectiveIndex;
                  return (
                    <button
                      key={perspective.id}
                      onClick={() => {
                        setActivePerspectiveIndex(idx);
                        setActiveHotspot(null);
                        setIsAutoPlaying(false);
                      }}
                      className={`group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-stone-100 transition-all duration-300 transform text-left focus:outline-none ${
                        isActive
                          ? 'ring-2 ring-aureo-gold-600 ring-offset-2 scale-[1.03] shadow-lg'
                          : 'opacity-70 hover:opacity-100 shadow-sm hover:shadow-md'
                      }`}
                    >
                      <img
                        src={perspective.url}
                        alt={perspective.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2 sm:p-2.5">
                        <span className="text-[10px] sm:text-[11px] font-medium text-white tracking-tight line-clamp-1">
                          {perspective.title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Spec Highlights & 360 CTA */}
            <div className="mt-8 pt-6 border-t border-stone-200 flex items-center justify-between max-w-md">
              <div className="flex items-center gap-6 text-xs text-stone-600">
                <div>
                  <span className="block font-bold text-stone-900 text-sm">Zurich · Alps</span>
                  <span className="text-[11px] text-stone-400">Location</span>
                </div>
                <div className="h-6 w-[1px] bg-stone-200" />
                <div>
                  <span className="block font-bold text-stone-900 text-sm">Post-Tensioned</span>
                  <span className="text-[11px] text-stone-400">Cantilever System</span>
                </div>
              </div>

              <button
                onClick={onOpenVirtualTour}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-aureo-gold-800 hover:text-aureo-gold-900 transition-colors cursor-pointer"
              >
                <Compass size={14} />
                <span>Launch 360°</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Hero-style Architectural Villa Render with Double-Bezel Frame and Hotspots */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
            onMouseEnter={() => setIsAutoPlaying(false)}
          >
            {/* Double-Bezel Outer Enclosure */}
            <div className="p-2 sm:p-3 rounded-[2.5rem] bg-stone-900/[0.03] ring-1 ring-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
              
              {/* Inner Core */}
              <div className="relative rounded-[calc(2.5rem-0.75rem)] overflow-hidden bg-stone-900 group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPerspective.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="relative aspect-[16/11] sm:aspect-[16/10] w-full"
                  >
                    <img
                      src={currentPerspective.url}
                      alt={currentPerspective.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                      loading="lazy"
                    />

                    {/* Gradient Shadow Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent pointer-events-none" />

                    {/* Interactive Hotspot Markers */}
                    {currentPerspective.hotspots?.map((hs) => (
                      <div
                        key={hs.id}
                        style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveHotspot(activeHotspot?.id === hs.id ? null : hs);
                          }}
                          className="relative flex items-center justify-center w-7 h-7 rounded-full bg-white text-stone-900 shadow-xl backdrop-blur-md hover:scale-110 active:scale-95 transition-transform group/btn border border-aureo-gold-400 cursor-pointer"
                          aria-label={hs.title}
                        >
                          <span className="absolute inset-0 rounded-full bg-aureo-gold-400/40 animate-ping" />
                          <Sparkles size={13} className="text-aureo-gold-700" />
                        </button>

                        {/* Hotspot Tooltip Card */}
                        <AnimatePresence>
                          {activeHotspot?.id === hs.id && (
                            <motion.div
                              initial={{ opacity: 0, y: 8, scale: 0.92 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 8, scale: 0.92 }}
                              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-60 sm:w-68 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-stone-200 text-left z-30 pointer-events-auto"
                            >
                              <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                                <Info size={13} className="text-aureo-gold-700 shrink-0" />
                                <span>{hs.title}</span>
                              </div>
                              <p className="mt-1.5 text-[11px] text-stone-600 leading-relaxed font-light">
                                {hs.description}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}

                    {/* Left & Right Navigation Controls */}
                    <div className="absolute inset-y-0 inset-x-4 flex items-center justify-between pointer-events-none z-10">
                      <button
                        onClick={handlePrev}
                        className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md flex items-center justify-center pointer-events-auto transition-all active:scale-90 opacity-0 group-hover:opacity-100 shadow-lg cursor-pointer"
                        aria-label="Previous perspective"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={handleNext}
                        className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md flex items-center justify-center pointer-events-auto transition-all active:scale-90 opacity-0 group-hover:opacity-100 shadow-lg cursor-pointer"
                        aria-label="Next perspective"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>

                    {/* Bottom Caption & Inspect Action */}
                    <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between text-white z-10">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-aureo-gold-400 block mb-0.5 font-mono">
                          {currentPerspective.location}
                        </span>
                        <h4 className="text-lg sm:text-2xl font-serif font-bold tracking-wide text-white drop-shadow">
                          {currentPerspective.title}
                        </h4>
                      </div>

                      <button
                        onClick={() =>
                          onImageClick({
                            url: currentPerspective.url,
                            title: currentPerspective.title,
                            caption: currentPerspective.caption,
                            location: currentPerspective.location
                          })
                        }
                        className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-semibold tracking-wider flex items-center gap-1.5 transition-all active:scale-95 border border-white/20 cursor-pointer"
                      >
                        <Eye size={13} />
                        <span className="hidden sm:inline">Inspect Monograph</span>
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
