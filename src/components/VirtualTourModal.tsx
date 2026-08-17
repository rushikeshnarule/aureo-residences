import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sun, Moon, Compass, Maximize2, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { VIRTUAL_ROOMS, VirtualRoom } from '../data/residences';

interface VirtualTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoomId?: string;
}

export const VirtualTourModal: React.FC<VirtualTourModalProps> = ({
  isOpen,
  onClose,
  initialRoomId
}) => {
  const [activeRoomIndex, setActiveRoomIndex] = useState(() => {
    if (!initialRoomId) return 0;
    const idx = VIRTUAL_ROOMS.findIndex((r) => r.id === initialRoomId);
    return idx >= 0 ? idx : 0;
  });
  const [isNightMode, setIsNightMode] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [panOffset, setPanOffset] = useState(0);

  if (!isOpen) return null;

  const currentRoom: VirtualRoom = VIRTUAL_ROOMS[activeRoomIndex] || VIRTUAL_ROOMS[0];

  const handleDrag = (_: any, info: { offset: { x: number } }) => {
    setPanOffset((prev) => Math.max(-100, Math.min(100, prev + info.offset.x * 0.1)));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between"
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 z-20 bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-aureo-gold-500 animate-pulse" />
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-aureo-gold-400 block">
                360° Spatial Immersion
              </span>
              <h3 className="text-white text-base sm:text-lg font-serif font-bold tracking-wide">
                {currentRoom.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Day / Dusk Lighting Toggle Slider */}
            <div className="flex items-center bg-white/10 p-1 rounded-full border border-white/15">
              <button
                onClick={() => setIsNightMode(false)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  !isNightMode ? 'bg-white text-aureo-dark shadow-sm' : 'text-white/60 hover:text-white'
                }`}
              >
                <Sun size={13} />
                <span className="hidden sm:inline">Midday</span>
              </button>
              <button
                onClick={() => setIsNightMode(true)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  isNightMode ? 'bg-aureo-gold-500 text-white shadow-sm' : 'text-white/60 hover:text-white'
                }`}
              >
                <Moon size={13} />
                <span className="hidden sm:inline">Twilight</span>
              </button>
            </div>

            {/* Ambient Sound Simulator */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-colors"
              title={isMuted ? "Enable Ambient Audio" : "Mute Audio"}
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-aureo-gold-400" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-colors"
              aria-label="Close virtual tour"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Center Interactive Panorama Viewport */}
        <div className="relative flex-1 w-full overflow-hidden flex items-center justify-center select-none cursor-grab active:cursor-grabbing">
          <motion.div
            drag="x"
            dragConstraints={{ left: -150, right: 150 }}
            onDrag={handleDrag}
            className="relative w-[115vw] h-full"
            style={{ x: panOffset }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={`${currentRoom.id}-${isNightMode ? 'night' : 'day'}`}
                src={isNightMode ? currentRoom.nightUrl : currentRoom.dayUrl}
                alt={currentRoom.name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="w-full h-full object-cover pointer-events-none"
              />
            </AnimatePresence>

            {/* Floating Spatial Hotspots */}
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 group/spot pointer-events-auto">
              <div className="w-8 h-8 rounded-full bg-aureo-gold-500/80 backdrop-blur-md flex items-center justify-center text-white border-2 border-white shadow-xl animate-bounce">
                <Sparkles size={14} />
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 rounded-2xl bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs opacity-0 group-hover/spot:opacity-100 transition-opacity">
                <p className="font-bold text-aureo-gold-400">Integrated Fire Feature</p>
                <p className="text-[11px] text-white/70 mt-0.5">Continuous bioethanol linear burner flush with basalt pavers.</p>
              </div>
            </div>

            <div className="absolute top-1/3 right-1/4 -translate-x-1/2 -translate-y-1/2 group/spot pointer-events-auto">
              <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-aureo-dark border-2 border-aureo-gold-400 shadow-xl">
                <Compass size={14} />
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 rounded-2xl bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs opacity-0 group-hover/spot:opacity-100 transition-opacity">
                <p className="font-bold text-aureo-gold-400">Triple-Glazed Curtains</p>
                <p className="text-[11px] text-white/70 mt-0.5">Motorized sliding glass panels with zero-threshold tracks.</p>
              </div>
            </div>
          </motion.div>

          {/* Panoramic Drag Hint */}
          <div className="absolute bottom-24 inset-x-0 flex justify-center pointer-events-none">
            <span className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/80 text-xs font-medium flex items-center gap-2">
              <Maximize2 size={13} className="text-aureo-gold-400" />
              <span>Drag horizontally to explore panorama</span>
            </span>
          </div>
        </div>

        {/* Bottom Room Selector Strip */}
        <div className="p-4 sm:p-6 bg-black/60 backdrop-blur-md border-t border-white/10 z-20">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 overflow-x-auto">
              {VIRTUAL_ROOMS.map((room, idx) => (
                <button
                  key={room.id}
                  onClick={() => setActiveRoomIndex(idx)}
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl text-xs font-semibold transition-all shrink-0 ${
                    idx === activeRoomIndex
                      ? 'bg-aureo-gold-500 text-white shadow-lg'
                      : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <span>{room.name}</span>
                </button>
              ))}
            </div>

            <button
              onClick={onClose}
              className="hidden sm:inline-flex px-5 py-2 rounded-full bg-white text-aureo-dark text-xs font-bold hover:bg-stone-100 transition-colors"
            >
              Exit Tour
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
