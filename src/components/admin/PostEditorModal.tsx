import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WordPressPost } from '../../data/residences';
import { X, Check, BookOpen, Sparkles, Loader2 } from 'lucide-react';
import { generateArchitecturalMonograph } from '../../services/geminiService';

interface PostEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (postData: Omit<WordPressPost, 'id'>) => void;
  initialPost?: WordPressPost | null;
}

export const PostEditorModal: React.FC<PostEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialPost
}) => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Architecture');
  const [readTime, setReadTime] = useState('5 min read');
  const [authorName, setAuthorName] = useState('Marcus von Berg');
  const [authorRole, setAuthorRole] = useState('Principal Design Partner');
  const [authorAvatar, setAuthorAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80');
  const [date, setDate] = useState('August 16, 2026');
  const [featuredImage, setFeaturedImage] = useState('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('Cantilever, Concrete, Alpine, Engineering');
  const [isFeatured, setIsFeatured] = useState(false);

  // AI Generation State
  const [aiTopic, setAiTopic] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  const handleAiGenerate = async () => {
    if (!aiTopic.trim()) return;
    setIsGeneratingAi(true);

    try {
      const generated = await generateArchitecturalMonograph(aiTopic, category);
      setTitle(generated.title);
      setSlug(generated.slug);
      setExcerpt(generated.excerpt);
      setContent(generated.content);
      setTags(generated.tags.join(', '));
      setReadTime(generated.readTime);
    } catch (err) {
      console.error('AI generation error:', err);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  useEffect(() => {
    if (initialPost) {
      setTitle(initialPost.title);
      setSlug(initialPost.slug);
      setCategory(initialPost.category);
      setReadTime(initialPost.readTime);
      setAuthorName(initialPost.author.name);
      setAuthorRole(initialPost.author.role);
      setAuthorAvatar(initialPost.author.avatar);
      setDate(initialPost.date);
      setFeaturedImage(initialPost.featuredImage);
      setExcerpt(initialPost.excerpt);
      setContent(initialPost.content);
      setTags(initialPost.tags.join(', '));
      setIsFeatured(!!initialPost.isFeatured);
    } else {
      setTitle('');
      setSlug('');
      setCategory('Architecture');
      setReadTime('5 min read');
      setAuthorName('Marcus von Berg');
      setAuthorRole('Principal Design Partner');
      setAuthorAvatar('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80');
      setDate(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
      setFeaturedImage('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85');
      setExcerpt('');
      setContent('');
      setTags('Architecture, Monograph, Design');
      setIsFeatured(false);
    }
  }, [initialPost, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !excerpt) return;

    onSave({
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      category,
      readTime,
      author: {
        name: authorName,
        role: authorRole,
        avatar: authorAvatar
      },
      date,
      featuredImage,
      excerpt,
      content: content || excerpt,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      isFeatured
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
                <BookOpen size={14} className="text-aureo-gold-700" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-aureo-gold-800 font-mono">
                  {initialPost ? 'Edit Monograph' : 'Publish New Monograph'}
                </span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                {initialPost ? initialPost.title : 'New Architectural Essay'}
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
                  <span>Draft Full Monograph with Gemini AI</span>
                </span>
                <span className="text-[10px] text-stone-400 font-mono">Gemini 2.5 Flash</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="e.g. Diurnal light sculpting with post-tensioned basalt cantilevers..."
                  className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-aureo-gold-500/30"
                />
                <button
                  type="button"
                  onClick={handleAiGenerate}
                  disabled={!aiTopic.trim() || isGeneratingAi}
                  className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0"
                >
                  {isGeneratingAi ? (
                    <>
                      <Loader2 size={13} className="animate-spin text-aureo-gold-400" />
                      <span>Drafting Essay...</span>
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
            
            {/* Title & Slug */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                  Monograph Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Diurnal Light Sculpting"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-aureo-gold-500/30 focus:border-aureo-gold-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                  URL Slug
                </label>
                <input
                  type="text"
                  placeholder="diurnal-light-sculpting"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-aureo-gold-500/30 focus:border-aureo-gold-600 font-mono"
                />
              </div>
            </div>

            {/* Category & Read Time */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-aureo-gold-500/30 focus:border-aureo-gold-600"
                >
                  <option>Architecture</option>
                  <option>Lighting Design</option>
                  <option>Materiality</option>
                  <option>Engineering</option>
                  <option>Alpine Living</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                  Estimated Read Time
                </label>
                <input
                  type="text"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder="5 min read"
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-aureo-gold-500/30 focus:border-aureo-gold-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                  Publication Date
                </label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="August 16, 2026"
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-aureo-gold-500/30 focus:border-aureo-gold-600"
                />
              </div>
            </div>

            {/* Author details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1.5">Author Name</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs text-stone-900"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1.5">Author Role</label>
                <input
                  type="text"
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs text-stone-900"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1.5">Author Avatar URL</label>
                <input
                  type="url"
                  value={authorAvatar}
                  onChange={(e) => setAuthorAvatar(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs text-stone-900 font-mono"
                />
              </div>
            </div>

            {/* Featured Image */}
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                Featured Cover Image URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-aureo-gold-500/30 focus:border-aureo-gold-600 font-mono"
                />
              </div>
              {featuredImage && (
                <div className="mt-2 h-24 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                  <img src={featuredImage} alt="Cover preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Excerpt */}
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                Executive Excerpt (Summary for Cards)
              </label>
              <textarea
                rows={2}
                required
                placeholder="A brief executive summary of this monograph..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-aureo-gold-500/30 focus:border-aureo-gold-600 resize-none"
              />
            </div>

            {/* Full Content */}
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                Full Essay Body (HTML / Markdown supported)
              </label>
              <textarea
                rows={6}
                placeholder="Draft the comprehensive architectural essay..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-aureo-gold-500/30 focus:border-aureo-gold-600 resize-none"
              />
            </div>

            {/* Tags & Featured Checkbox */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="flex-1">
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Concrete, Alpine, Monolith"
                  className="w-full px-4 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 focus:outline-none"
                />
              </div>

              <label className="flex items-center gap-2 text-xs font-semibold text-stone-800 cursor-pointer select-none pt-4 sm:pt-0">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded border-stone-300 text-aureo-gold-600 focus:ring-0"
                />
                <span>Set as Featured Hero Monograph</span>
              </label>
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
                <span>Save Monograph</span>
              </button>
            </div>

          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
