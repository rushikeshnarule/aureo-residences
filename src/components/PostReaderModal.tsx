import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Calendar, Bookmark, Share2, Check } from 'lucide-react';
import { WordPressPost } from '../data/residences';

interface PostReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: WordPressPost | null;
}

export const PostReaderModal: React.FC<PostReaderModalProps> = ({
  isOpen,
  onClose,
  post
}) => {
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  // Reset per-post state when a new post is opened
  useEffect(() => {
    if (post) {
      setCopied(false);
      setBookmarked(false);
    }
  }, [post?.id]);

  if (!isOpen || !post) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl my-auto border border-stone-100 flex flex-col max-h-[90vh]"
        >
          {/* Top Sticky Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-white/95 backdrop-blur-md sticky top-0 z-20">
            <div className="flex items-center gap-2 text-xs text-stone-500 font-semibold">
              <span className="text-aureo-gold-700 uppercase tracking-widest">{post.category}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {post.readTime}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setBookmarked(!bookmarked)}
                className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors"
                title={bookmarked ? "Bookmarked" : "Bookmark Essay"}
              >
                <Bookmark size={15} className={bookmarked ? "fill-aureo-gold-600 text-aureo-gold-600" : ""} />
              </button>

              <button
                onClick={handleShare}
                className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors"
                title="Share Essay Link"
              >
                {copied ? <Check size={15} className="text-emerald-600" /> : <Share2 size={15} />}
              </button>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors"
                aria-label="Close article"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Article Scroll Body */}
          <div className="p-6 sm:p-10 overflow-y-auto bg-white">
            
            {/* Title */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-aureo-dark tracking-tight leading-[1.15]">
              {post.title}
            </h1>

            {/* Author Row */}
            <div className="mt-6 flex items-center justify-between pb-6 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-11 h-11 rounded-full object-cover border border-stone-200"
                />
                <div>
                  <h4 className="text-xs font-bold text-aureo-dark">{post.author.name}</h4>
                  <p className="text-[11px] text-stone-400">{post.author.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-stone-400 font-medium">
                <Calendar size={13} />
                <span>{post.date}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="my-8 rounded-2xl overflow-hidden aspect-[16/9] bg-stone-900 shadow-md">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content with Rich Typography */}
            <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed font-light text-sm sm:text-base space-y-5">
              {post.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3
                      key={index}
                      className="text-xl sm:text-2xl font-serif font-bold text-aureo-dark tracking-tight pt-4"
                    >
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                return (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Tags & Footer */}
            <div className="mt-10 pt-6 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-stone-400 font-semibold">Topics:</span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-stone-100 text-stone-600 text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                onClick={onClose}
                className="px-6 py-2 rounded-full bg-aureo-dark hover:bg-black text-white text-xs font-bold transition-colors"
              >
                Back to Journal
              </button>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
