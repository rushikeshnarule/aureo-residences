import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArchitecturalPiece } from '../../data/residences';
import { X, Building, Check, Sparkles, Loader2 } from 'lucide-react';
import { generateEstateDossier } from '../../services/geminiService';

interface ResidenceEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (residenceData: Omit<ArchitecturalPiece, 'id'>) => void;
  initialResidence?: ArchitecturalPiece | null;
}

export const ResidenceEditorModal: React.FC<ResidenceEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialResidence
}) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<'all' | 'lakefront' | 'coastal' | 'alpine'>('lakefront');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [narrative, setNarrative] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tag, setTag] = useState('Minimalist Concrete & Glass');
  const [area, setArea] = useState('8,400 sq ft');
  const [completion, setCompletion] = useState('2025');
  const [architect, setArchitect] = useState('Aureo Atelier');
  const [bedrooms, setBedrooms] = useState('5 Suites');
  const [lotSize, setLotSize] = useState('1.4 Acres');

  // AI Generation State
  const [aiConcept, setAiConcept] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  const handleAiGenerate = async () => {
    if (!aiConcept.trim()) return;
    setIsGeneratingAi(true);

    try {
      const generated = await generateEstateDossier(
        aiConcept,
        category === 'all' ? 'lakefront' : category
      );
      setTitle(generated.title);
      setLocation(generated.location);
      setSubtitle(generated.subtitle);
      setDescription(generated.description);
      setNarrative(generated.narrative);
      setTag(generated.tag);
      setArea(generated.specs.area);
      setCompletion(generated.specs.completion);
      setArchitect(generated.specs.architect);
      setBedrooms(generated.specs.bedrooms);
      setLotSize(generated.specs.lotSize);
    } catch (err) {
      console.error('AI Estate generation error:', err);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  useEffect(() => {
    if (initialResidence) {
      setTitle(initialResidence.title);
      setLocation(initialResidence.location);
      setCategory(initialResidence.category);
      setSubtitle(initialResidence.subtitle);
      setDescription(initialResidence.description);
      setNarrative(initialResidence.narrative);
      setImageUrl(initialResidence.imageUrl);
      setTag(initialResidence.tag);
      setArea(initialResidence.specs.area);
      setCompletion(initialResidence.specs.completion);
      setArchitect(initialResidence.specs.architect);
      setBedrooms(initialResidence.specs.bedrooms);
      setLotSize(initialResidence.specs.lotSize);
    } else {
      setTitle('');
      setLocation('Lake Zurich, Switzerland');
      setCategory('lakefront');
      setSubtitle('Monolithic Cantilever Residence');
      setDescription('');
      setNarrative('');
      setImageUrl('https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85');
      setTag('Minimalist Concrete & Glass');
      setArea('8,400 sq ft');
      setCompletion('2026');
      setArchitect('Aureo Zurich Studio');
      setBedrooms('5 Suites');
      setLotSize('1.8 Acres');
    }
  }, [initialResidence, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !location) return;

    onSave({
      title,
      location,
      category,
      subtitle,
      description,
      narrative: narrative || description,
      imageUrl,
      tag,
      specs: {
        area,
        completion,
        architect,
        bedrooms,
        lotSize
      }
    });

    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-3xl w-full bg-white text-stone-900 rounded-3xl overflow-hidden shadow-2xl my-auto border border-stone-200"
        >
          {/* Header */}
          <div className="bg-[#f5f0e6] p-6 sm:p-8 flex items-center justify-between border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Building size={14} className="text-aureo-gold-700" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-aureo-gold-800 font-mono">
                  {initialResidence ? 'Edit Estate Dossier' : 'Register New Estate'}
                </span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                {initialResidence ? initialResidence.title : 'New Architectural Residence'}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-stone-200/80 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto bg-white">
            
            {/* AI Assistant Quick Generator Banner */}
            <div className="p-4 rounded-2xl bg-[#faf8f5] border border-stone-300/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-aureo-gold-800 flex items-center gap-1.5 font-mono">
                  <Sparkles size={13} className="text-aureo-gold-600" />
                  <span>Generate Estate Specifications with Gemini AI</span>
                </span>
                <span className="text-[10px] text-stone-400 font-mono">Gemini 2.5 Flash</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={aiConcept}
                  onChange={(e) => setAiConcept(e.target.value)}
                  placeholder="e.g. Cliffside Mediterranean villa with private sea cove and post-tensioned travertine..."
                  className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-aureo-gold-500/30"
                />
                <button
                  type="button"
                  onClick={handleAiGenerate}
                  disabled={!aiConcept.trim() || isGeneratingAi}
                  className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0"
                >
                  {isGeneratingAi ? (
                    <>
                      <Loader2 size={13} className="animate-spin text-aureo-gold-400" />
                      <span>Synthesizing Dossier...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={13} className="text-aureo-gold-400" />
                      <span>Auto-Generate</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            
            {/* Title & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                  Estate Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Horizon Cantilever"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-aureo-gold-500/30 focus:border-aureo-gold-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                  Geographic Location
                </label>
                <input
                  type="text"
                  required
                  placeholder="Lucerne, Switzerland"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-aureo-gold-500/30 focus:border-aureo-gold-600"
                />
              </div>
            </div>

            {/* Category & Tag */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                  Estate Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-aureo-gold-500/30 focus:border-aureo-gold-600"
                >
                  <option value="lakefront">Lakefront Cantilevers</option>
                  <option value="coastal">Coastal Terraces</option>
                  <option value="alpine">Alpine Stone</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                  Materiality Tag
                </label>
                <input
                  type="text"
                  placeholder="e.g. Minimalist Concrete & Basalt"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none"
                />
              </div>
            </div>

            {/* Architectural Specifications Grid */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-aureo-gold-800 block">
                Technical & Spatial Specifications
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div>
                  <label className="text-[10px] text-stone-500 font-bold uppercase block mb-1">Built Area</label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-white border border-stone-300 text-xs text-stone-900 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-stone-500 font-bold uppercase block mb-1">Bedrooms</label>
                  <input
                    type="text"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-white border border-stone-300 text-xs text-stone-900 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-stone-500 font-bold uppercase block mb-1">Lot Size</label>
                  <input
                    type="text"
                    value={lotSize}
                    onChange={(e) => setLotSize(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-white border border-stone-300 text-xs text-stone-900 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-stone-500 font-bold uppercase block mb-1">Completion</label>
                  <input
                    type="text"
                    value={completion}
                    onChange={(e) => setCompletion(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-white border border-stone-300 text-xs text-stone-900 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-stone-500 font-bold uppercase block mb-1">Architect</label>
                  <input
                    type="text"
                    value={architect}
                    onChange={(e) => setArchitect(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-white border border-stone-300 text-xs text-stone-900"
                  />
                </div>
              </div>
            </div>

            {/* Main Render Image */}
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                Main Photographic Render URL
              </label>
              <input
                type="url"
                required
                placeholder="https://images.unsplash.com/..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none font-mono"
              />
              {imageUrl && (
                <div className="mt-2 h-24 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                  <img src={imageUrl} alt="Render preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                Executive Overview (Card Summary)
              </label>
              <textarea
                rows={2}
                required
                placeholder="A concise architectural overview of the volume and site..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none resize-none"
              />
            </div>

            {/* Full Architectural Narrative */}
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                Full Architectural Dossier Narrative
              </label>
              <textarea
                rows={5}
                placeholder="Deep spatial monograph detailing engineering, daylight pathways, and structural solutions..."
                value={narrative}
                onChange={(e) => setNarrative(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none resize-none"
              />
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-2.5 rounded-xl bg-aureo-gold-600 hover:bg-aureo-gold-500 text-white text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Check size={14} />
                <span>Save Estate Dossier</span>
              </button>
            </div>

          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
