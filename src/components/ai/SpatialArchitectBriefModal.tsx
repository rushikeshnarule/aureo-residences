import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  MapPin,
  Clock,
  Send,
  Check
} from 'lucide-react';
import { generateSpatialBrief, SpatialBriefResult } from '../../services/geminiService';
import { useAureo } from '../../context/AureoContext';

interface SpatialArchitectBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry: (location?: string) => void;
}

export const SpatialArchitectBriefModal: React.FC<SpatialArchitectBriefModalProps> = ({
  isOpen,
  onClose,
  onOpenInquiry
}) => {
  const { addInquiry } = useAureo();
  const [topography, setTopography] = useState('Lakefront Promontory');
  const [scale, setScale] = useState('10,000 – 15,000 sq ft');
  const [amenities, setAmenities] = useState('Subterranean Auto Gallery, Cantilevered Heated Pool, Wellness Atelier');
  const [materiality, setMateriality] = useState('Basalt Stone, Low-Iron Glazing, Post-Tensioned Concrete');
  const [customNotes, setCustomNotes] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [briefResult, setBriefResult] = useState<SpatialBriefResult | null>(null);
  const [isTransmitted, setIsTransmitted] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setBriefResult(null);

    const clientVision = `Topography: ${topography}. Scale: ${scale}. Amenities: ${amenities}. Preferred Materials: ${materiality}. Custom Directives: ${customNotes}`;

    try {
      const result = await generateSpatialBrief(clientVision);
      setBriefResult(result);
    } catch (err) {
      console.error('Failed to generate spatial brief:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransmitToAtelier = () => {
    if (!briefResult) return;

    addInquiry({
      fullName: 'VIP Client (Spatial Brief Generator)',
      email: 'advisory-portal@aureo-residences.com',
      phone: 'Signal Encrypted',
      location: briefResult.recommendedTerritory,
      investmentTier: '$50M+ USD Bespoke Monograph',
      notes: `AI Generated Project: ${briefResult.projectName}\nSummary: ${briefResult.executiveSummary}\nMaterials: ${briefResult.suggestedMaterials.join(', ')}`
    });

    setIsTransmitted(true);
    setTimeout(() => {
      setIsTransmitted(false);
      onClose();
      onOpenInquiry(briefResult.recommendedTerritory);
    }, 2500);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 25 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 my-auto max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="bg-[#f5f0e6] p-6 sm:p-8 border-b border-stone-200 flex items-center justify-between shrink-0">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles size={14} className="text-aureo-gold-700" />
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-aureo-gold-800 font-mono">
                  Gemini AI Spatial Intelligence
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                Bespoke Architectural Feasibility Brief
              </h3>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-stone-200/80 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            {!briefResult ? (
              <form onSubmit={handleGenerate} className="space-y-5">
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                  Define your intended topography, volumetric requirements, and lifestyle directives. Our Gemini AI engine will generate an instant Architectural Feasibility Brief & Materiality Matrix aligned with AUREO standards.
                </p>

                {/* Topography & Scale */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
                      Desired Topography
                    </label>
                    <select
                      value={topography}
                      onChange={(e) => setTopography(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-xs sm:text-sm text-stone-900 focus:ring-2 focus:ring-aureo-gold-500/30 focus:border-aureo-gold-600"
                    >
                      <option>Lakefront Promontory (Zurich / Lucerne)</option>
                      <option>Mediterranean Cliffside Cove (Costa Brava)</option>
                      <option>High-Altitude Alpine Ridge (Aspen / St. Moritz)</option>
                      <option>Ocean Bluff Cantilever (Malibu)</option>
                      <option>Kyoto Bamboo Enclave</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
                      Living Scale
                    </label>
                    <select
                      value={scale}
                      onChange={(e) => setScale(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-xs sm:text-sm text-stone-900 focus:ring-2 focus:ring-aureo-gold-500/30 focus:border-aureo-gold-600"
                    >
                      <option>8,000 – 10,000 sq ft (Intimate Monolith)</option>
                      <option>10,000 – 15,000 sq ft (Landmark Residence)</option>
                      <option>15,000 – 25,000+ sq ft (Bespoke Compound / Multi-Wing)</option>
                    </select>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
                    Lifestyle & Technical Directives
                  </label>
                  <input
                    type="text"
                    value={amenities}
                    onChange={(e) => setAmenities(e.target.value)}
                    placeholder="e.g. Helipad, subterranean 8-car gallery, 50m infinity cantilever..."
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-xs sm:text-sm text-stone-900 focus:ring-2 focus:ring-aureo-gold-500/30 focus:border-aureo-gold-600"
                  />
                </div>

                {/* Materiality */}
                <div>
                  <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
                    Preferred Material Palette
                  </label>
                  <input
                    type="text"
                    value={materiality}
                    onChange={(e) => setMateriality(e.target.value)}
                    placeholder="e.g. Basalt, Travertine, Low-Iron Glazing, Charred Timber..."
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-xs sm:text-sm text-stone-900 focus:ring-2 focus:ring-aureo-gold-500/30 focus:border-aureo-gold-600"
                  />
                </div>

                {/* Custom Notes */}
                <div>
                  <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
                    Confidential Requirements (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder="Provide specific privacy, security, or solar orientation preferences..."
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-xs sm:text-sm text-stone-900 focus:ring-2 focus:ring-aureo-gold-500/30 focus:border-aureo-gold-600 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 rounded-2xl bg-aureo-gold-600 hover:bg-aureo-gold-500 text-white text-xs font-bold uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                        <span>Synthesizing Architectural Feasibility...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={14} />
                        <span>Generate AI Spatial Commission Brief</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                {/* Brief Result Card */}
                <div className="p-6 rounded-2xl bg-[#faf8f5] border border-stone-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-aureo-gold-800 font-mono">
                        Aureo Feasibility Dossier
                      </span>
                      <h4 className="text-2xl font-serif font-bold text-stone-900">
                        {briefResult.projectName}
                      </h4>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 text-white text-[11px] font-mono">
                      <MapPin size={11} className="text-aureo-gold-400" />
                      <span>{briefResult.recommendedTerritory}</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <div>
                    <h5 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                      Executive Architectural Overview
                    </h5>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                      {briefResult.executiveSummary}
                    </p>
                  </div>

                  {/* Philosophy */}
                  <div>
                    <h5 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                      Spatial Philosophy Rationale
                    </h5>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light italic">
                      &ldquo;{briefResult.architecturalPhilosophy}&rdquo;
                    </p>
                  </div>

                  {/* Materials & Timeline Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-3.5 rounded-xl bg-white border border-stone-200">
                      <span className="text-[10px] text-stone-400 uppercase tracking-wider font-bold block mb-1">
                        Curated Material Matrix
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {briefResult.suggestedMaterials.map((mat) => (
                          <span
                            key={mat}
                            className="px-2 py-0.5 rounded-md bg-stone-100 text-[11px] text-stone-700 font-medium"
                          >
                            {mat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-stone-200 flex flex-col justify-between">
                      <span className="text-[10px] text-stone-400 uppercase tracking-wider font-bold block mb-1">
                        Estimated Atelier Timeline
                      </span>
                      <div className="flex items-center gap-2 text-xs font-bold text-stone-900 font-mono">
                        <Clock size={14} className="text-aureo-gold-700" />
                        <span>{briefResult.estimatedTimeline}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transmit to Zurich Atelier */}
                {isTransmitted ? (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center flex items-center justify-center gap-2 text-xs font-bold">
                    <Check size={16} />
                    <span>Brief Transmitted Under Swiss Confidentiality Seal</span>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => setBriefResult(null)}
                      className="px-6 py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Refine Parameters
                    </button>

                    <button
                      onClick={handleTransmitToAtelier}
                      className="flex-1 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send size={13} className="text-aureo-gold-400" />
                      <span>Transmit Brief to Zurich Advisory Atelier</span>
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
