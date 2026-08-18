import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAureo } from '../context/AureoContext';
import { DESTINATIONS, DestinationCard } from '../data/residences';
import { ArrowRight, Compass, Play, Pause, Sun, Sunset, Moon, ArrowUpRight } from 'lucide-react';

interface HeroSectionProps {
  onImageClick?: (image: { url: string; title?: string; caption?: string; location?: string }) => void;
  onOpenVirtualTour?: () => void;
  onSelectDestination?: (dest: DestinationCard) => void;
  onOpenAIConcierge?: () => void;
  onOpenSpatialBrief?: () => void;
}

type LightingMode = 'day' | 'sunset' | 'twilight';

export const HeroSection: React.FC<HeroSectionProps> = ({
  onImageClick,
  onOpenVirtualTour,
  onSelectDestination,
  onOpenAIConcierge,
  onOpenSpatialBrief
}) => {
  const { heroData } = useAureo();
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeDestination, setActiveDestination] = useState<string | null>(null);
  const [lightingMode, setLightingMode] = useState<LightingMode>('day');

  const toggleVideoPlay = () => {
    const video = document.getElementById('hero-bg-video') as HTMLVideoElement | null;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const getHeroImage = () => {
    switch (lightingMode) {
      case 'sunset':
        return heroData.sunsetRender || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=85';
      case 'twilight':
        return 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85';
      case 'day':
      default:
        return heroData.mainRender;
    }
  };

  return (
    <section className="relative w-full overflow-hidden hero-gradient pt-24 sm:pt-28 pb-16 sm:pb-24 border-b border-stone-200/80">
      
      {/* Background Video Layer */}
      {heroData.videoUrl && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20 mask-hero-fade">
          <video
            id="hero-bg-video"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={heroData.videoUrl} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Hero Content Enclosure */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 text-center">
        
        {/* 1. Header Text Container with Staggered Entrance */}
        <div className="max-w-4xl mx-auto pt-6 sm:pt-10">
          
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-stone-200/90 text-stone-900 text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase mb-6 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-aureo-gold-600 animate-pulse" />
            <span>Zurich · Milan · Aspen · Costa Brava</span>
          </motion.div>

          {/* Staggered Serif Headline */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-stone-900 tracking-tight leading-[1.05]"
          >
            {heroData.headline.split('\n').map((line, i) => (
              <span key={i} className="block overflow-hidden pb-1">
                <motion.span
                  initial={{ y: 80 }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.2 + i * 0.15
                  }}
                  className="block"
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-sm sm:text-base md:text-lg text-stone-600 max-w-xl mx-auto leading-relaxed font-light px-4 tracking-wide"
          >
            {heroData.subhead}
          </motion.p>

          {/* CTA Row with Button-in-Button architecture */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            {/* Primary CTA with Nested Trailing Icon */}
            <a
              href="#destinations"
              className="group pl-7 pr-2 py-2 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-xl active:scale-95 flex items-center gap-3"
            >
              <span>Explore Portfolio</span>
              <div className="w-8 h-8 rounded-full bg-white/15 group-hover:bg-aureo-gold-500 text-white flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:rotate-45">
                <ArrowUpRight size={14} />
              </div>
            </a>

            {/* AI Advisory Concierge CTA */}
            {onOpenAIConcierge && (
              <button
                onClick={onOpenAIConcierge}
                className="group px-5 py-3 rounded-full bg-white/90 hover:bg-white text-stone-900 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md active:scale-95 border border-aureo-gold-500/40 flex items-center gap-2 backdrop-blur-sm cursor-pointer"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>AI Advisory</span>
              </button>
            )}

            {/* AI Spatial Commission Brief CTA */}
            {onOpenSpatialBrief && (
              <button
                onClick={onOpenSpatialBrief}
                className="group px-5 py-3 rounded-full bg-[#f3efe8] hover:bg-[#eae3d5] text-stone-800 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm active:scale-95 border border-stone-300/80 flex items-center gap-2 backdrop-blur-sm cursor-pointer"
              >
                <span className="text-aureo-gold-700">✨</span>
                <span>Spatial Feasibility Brief</span>
              </button>
            )}

            {/* Secondary 360 Tour Trigger */}
            <button
              onClick={onOpenVirtualTour}
              className="group px-6 py-3 rounded-full bg-white/80 hover:bg-white text-stone-800 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm active:scale-95 border border-stone-200 flex items-center gap-2 backdrop-blur-sm cursor-pointer"
            >
              <Compass size={14} className="text-aureo-gold-600 group-hover:rotate-45 transition-transform duration-500" />
              <span>360° Tour</span>
            </button>

            {/* Ambient Background Video Playback Toggle */}
            <button
              onClick={toggleVideoPlay}
              title={isPlaying ? "Pause Ambient Video" : "Play Ambient Video"}
              className="px-3.5 py-3 rounded-full bg-white/80 hover:bg-white text-stone-700 text-xs font-semibold backdrop-blur-md border border-stone-200 transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              {isPlaying ? (
                <>
                  <Pause size={13} className="text-aureo-gold-700" />
                  <span className="text-[10px] uppercase tracking-wider font-mono hidden xs:inline">Film</span>
                </>
              ) : (
                <>
                  <Play size={13} className="text-aureo-gold-700" />
                  <span className="text-[10px] uppercase tracking-wider font-mono hidden xs:inline">Film</span>
                </>
              )}
            </button>
          </motion.div>
        </div>

        {/* 2. Main Double-Bezel Architectural Render Frame with Live Diurnal Lighting Switcher */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-5xl mx-auto mt-4 sm:mt-8 group cursor-pointer"
        >
          {/* Double-Bezel Outer Shell */}
          <div className="p-2 sm:p-3 rounded-[2.5rem] bg-stone-900/[0.03] ring-1 ring-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
            
            {/* Inner Concentric Core */}
            <div
              className="relative rounded-[calc(2.5rem-0.75rem)] overflow-hidden bg-stone-900 aspect-[16/10] sm:aspect-[16/9]"
              onClick={() =>
                onImageClick?.({
                  url: getHeroImage(),
                  title: "The Horizon Cantilever Villa",
                  caption: "Monolithic post-tensioned concrete volume balancing effortlessly above alpine waters.",
                  location: "Lucerne, Switzerland"
                })
              }
            >
              <img
                key={lightingMode}
                src={getHeroImage()}
                alt="Ultra-modern cantilevered villa"
                className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-105"
                loading="eager"
              />

              {/* Seamless gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 h-40 sm:h-56 pointer-events-none hero-overlay-fade" />

              {/* Interactive Diurnal Lighting Switcher Pill (Floating in Render) */}
              <div
                className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 flex items-center gap-1.5 p-1 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setLightingMode('day')}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer ${
                    lightingMode === 'day'
                      ? 'bg-white text-stone-900 shadow-md'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Sun size={11} className={lightingMode === 'day' ? 'text-amber-500' : ''} />
                  <span className="hidden sm:inline">Midday</span>
                </button>

                <button
                  onClick={() => setLightingMode('sunset')}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer ${
                    lightingMode === 'sunset'
                      ? 'bg-white text-stone-900 shadow-md'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Sunset size={11} className={lightingMode === 'sunset' ? 'text-orange-500' : ''} />
                  <span className="hidden sm:inline">Sunset</span>
                </button>

                <button
                  onClick={() => setLightingMode('twilight')}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer ${
                    lightingMode === 'twilight'
                      ? 'bg-white text-stone-900 shadow-md'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Moon size={11} className={lightingMode === 'twilight' ? 'text-indigo-400' : ''} />
                  <span className="hidden sm:inline">Twilight</span>
                </button>
              </div>

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-20 flex items-center gap-2">
                <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-stone-900 text-xs font-serif font-bold shadow-md">
                  Lucerne Cantilever · 8,400 sq ft
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3. 3 Destination Cards Strip with Double-Bezel Framing */}
        <div id="destinations" className="relative z-30 mt-12 sm:mt-16 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {DESTINATIONS.map((dest, index) => {
              const isActive = activeDestination === dest.id;
              return (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.12 }}
                  onMouseEnter={() => setActiveDestination(dest.id)}
                  onMouseLeave={() => setActiveDestination(null)}
                  onClick={() => {
                    if (onSelectDestination) {
                      onSelectDestination(dest);
                    } else if (onImageClick) {
                      onImageClick({
                        url: dest.imageUrl,
                        title: `${dest.city} — ${dest.tagline}`,
                        caption: `Elevation: ${dest.elevation}. Features: ${dest.features.join(' · ')}.`,
                        location: dest.location
                      });
                    }
                  }}
                  className="group relative p-2 rounded-3xl bg-stone-900/[0.02] ring-1 ring-black/[0.06] hover:ring-black/[0.12] transition-all duration-400 cursor-pointer flex flex-col"
                >
                  {/* Inner Card Core */}
                  <div className="rounded-[calc(1.5rem-0.5rem)] overflow-hidden bg-white shadow-sm flex flex-col h-full">
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                      <img
                        src={dest.imageUrl}
                        alt={dest.city}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-4 text-center">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-aureo-gold-400 mb-0.5">
                          Destination {index + 1}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-[0.2em] uppercase">
                          {dest.city}
                        </h3>
                      </div>

                      <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-md rounded-full p-1.5 text-white">
                        <Compass size={12} className="text-aureo-gold-400" />
                      </div>
                    </div>

                    <div className="p-4 bg-white text-center border-t border-stone-100 flex-1 flex flex-col justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-stone-700 group-hover:text-aureo-gold-700 transition-colors block">
                        {dest.tagline}
                      </span>

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pt-2 text-center"
                          >
                            <p className="text-[11px] text-stone-500 font-light mb-1">
                              {dest.location}
                            </p>
                            <span className="text-[10px] font-bold text-aureo-gold-700 flex items-center justify-center gap-1">
                              <span>Explore Dossier</span>
                              <ArrowRight size={10} />
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <a
              href="#details"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-800 hover:text-aureo-gold-700 transition-colors pb-1 border-b border-stone-400"
            >
              <span>Discover All Estates</span>
              <ArrowRight size={13} />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom transition separator into white */}
      <div className="w-full h-20 sm:h-32 md:h-40 bg-gradient-to-b from-transparent via-white/80 to-white pointer-events-none -mt-12 relative z-20" />
    </section>
  );
};
