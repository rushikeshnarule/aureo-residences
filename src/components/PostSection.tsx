import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAureo } from '../context/AureoContext';
import { WordPressPost } from '../data/residences';
import { ArrowUpRight, Clock, Search, BookOpen, Sparkles } from 'lucide-react';

interface PostSectionProps {
  onReadPost: (post: WordPressPost) => void;
}

const CATEGORIES = [
  'All Monographs',
  'Architecture',
  'Lighting Design',
  'Materiality',
  'Engineering'
];

export const PostSection: React.FC<PostSectionProps> = ({ onReadPost }) => {
  const { posts } = useAureo();
  const [selectedCategory, setSelectedCategory] = useState('All Monographs');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'All Monographs' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = posts.find((p) => p.isFeatured) || posts[0];

  return (
    <section id="journal" className="w-full bg-[#f8f5ee] border-t border-stone-200/80 py-28 sm:py-36">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-aureo-gold-600 animate-pulse" />
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-aureo-gold-800">
                Architectural Journal & Essays
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-stone-900 tracking-tight">
              Essays, Monographs & Research
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 max-w-sm leading-relaxed font-light">
            Insights on monolithic structural geometry, natural diurnal daylight modeling, and sustainable material curation.
          </p>
        </div>

        {/* Filter Categories and Search Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-12">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-5 py-2.5 rounded-full text-xs font-bold tracking-wider transition-all duration-300 whitespace-nowrap focus:outline-none cursor-pointer ${
                    isSelected
                      ? 'text-white shadow-md'
                      : 'text-stone-700 hover:text-stone-950 bg-white border border-stone-200/80 hover:bg-stone-100'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="post-cat-active-pill"
                      className="absolute inset-0 rounded-full bg-stone-900"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search essays & monographs..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-stone-200 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-aureo-gold-500/30 focus:border-aureo-gold-600 shadow-sm"
            />
            <Search size={14} className="absolute left-3.5 top-3 text-stone-400 pointer-events-none" />
          </div>
        </div>

        {/* Featured Post Hero Banner with Double-Bezel Frame */}
        {featuredPost && selectedCategory === 'All Monographs' && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            onClick={() => onReadPost(featuredPost)}
            className="group relative mb-14 p-2.5 rounded-[2.5rem] bg-stone-900/[0.03] ring-1 ring-black/[0.08] hover:ring-black/[0.14] transition-all duration-500 cursor-pointer"
          >
            {/* Inner Core */}
            <div className="rounded-[calc(2.5rem-0.625rem)] overflow-hidden bg-white shadow-md grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-stone-900">
                <img
                  src={featuredPost.featuredImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 rounded-full bg-aureo-gold-600 text-white text-[10px] font-bold uppercase tracking-widest shadow-md flex items-center gap-1.5">
                    <Sparkles size={12} />
                    <span>Featured Monograph</span>
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-400 font-semibold mb-3 font-mono">
                    <span className="text-aureo-gold-800 uppercase tracking-wider">{featuredPost.category}</span>
                    <span>·</span>
                    <span>{featuredPost.date}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight leading-snug group-hover:text-aureo-gold-800 transition-colors">
                    {featuredPost.title}
                  </h3>

                  <p className="mt-4 text-xs sm:text-sm text-stone-600 leading-relaxed font-light line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-9 h-9 rounded-full object-cover border border-stone-200"
                    />
                    <div>
                      <span className="block text-xs font-bold text-stone-900">{featuredPost.author.name}</span>
                      <span className="text-[10px] text-stone-400 font-mono">{featuredPost.readTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900 group-hover:text-aureo-gold-800 group-hover:translate-x-1 transition-all">
                    <span>Read Monograph</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 3-Column Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post: WordPressPost) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => onReadPost(post)}
                className="group p-2 rounded-3xl bg-stone-900/[0.02] ring-1 ring-black/[0.06] hover:ring-black/[0.12] transition-all duration-400 cursor-pointer flex flex-col transform hover:-translate-y-1.5"
              >
                {/* Inner Core */}
                <div className="rounded-[calc(1.5rem-0.5rem)] overflow-hidden bg-white shadow-sm flex flex-col h-full justify-between">
                  
                  {/* Featured Thumbnail */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-900">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      loading="lazy"
                    />
                    <div className="absolute top-3.5 left-3.5">
                      <span className="px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold text-stone-900 uppercase tracking-wide shadow-sm font-mono">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-stone-400 mb-2 font-mono">
                        <Clock size={12} />
                        <span>{post.readTime}</span>
                        <span>·</span>
                        <span>{post.date}</span>
                      </div>

                      <h4 className="text-xl font-serif font-bold text-stone-900 tracking-tight group-hover:text-aureo-gold-800 transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h4>

                      <p className="mt-2.5 text-xs text-stone-600 line-clamp-3 leading-relaxed font-light">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Author & Action */}
                    <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-[11px] font-semibold text-stone-700">{post.author.name}</span>
                      </div>

                      <div className="flex items-center gap-1 font-bold text-stone-900 group-hover:text-aureo-gold-800">
                        <BookOpen size={12} />
                        <span>Read</span>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filteredPosts.length === 0 && (
          <div className="py-16 text-center text-stone-400 text-sm">
            No essays found matching your search query. Try another keyword or category.
          </div>
        )}

      </div>
    </section>
  );
};
