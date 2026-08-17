import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAureo, ClientInquiry } from '../../context/AureoContext';
import { WordPressPost, ArchitecturalPiece } from '../../data/residences';
import { PostEditorModal } from './PostEditorModal';
import { ResidenceEditorModal } from './ResidenceEditorModal';
import {
  BookOpen,
  Building,
  Edit3,
  Lock,
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit,
  Sparkles,
  Download,
  Upload,
  RotateCcw,
  Check,
  Search,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  ArrowLeft,
  LogOut
} from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isStandalonePage?: boolean;
}

type TabType = 'posts' | 'residences' | 'content' | 'inquiries' | 'media';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  isStandalonePage = false
}) => {
  const {
    posts,
    residences,
    heroData,
    philosophyPillars,
    inquiries,
    mediaAssets,
    addPost,
    updatePost,
    deletePost,
    addResidence,
    updateResidence,
    deleteResidence,
    updateHeroData,
    updatePhilosophyPillars,
    updateInquiryStatus,
    deleteInquiry,
    addMediaAsset,
    deleteMediaAsset,
    resetToDefaults,
    exportDataJSON,
    importDataJSON
  } = useAureo();

  const [activeTab, setActiveTab] = useState<TabType>('posts');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Post Modal States
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<WordPressPost | null>(null);
  const [postSearch, setPostSearch] = useState('');

  // Residence Modal States
  const [isResidenceModalOpen, setIsResidenceModalOpen] = useState(false);
  const [editingResidence, setEditingResidence] = useState<ArchitecturalPiece | null>(null);

  // Hero Content Form States
  const [heroForm, setHeroForm] = useState(heroData);
  const [pillarsForm, setPillarsForm] = useState(philosophyPillars);

  // Keep form in sync with latest context state (e.g. after reset/import)
  useEffect(() => {
    setHeroForm(heroData);
  }, [heroData]);

  useEffect(() => {
    setPillarsForm(philosophyPillars);
  }, [philosophyPillars]);

  // New Media Asset Form
  const [newMediaTitle, setNewMediaTitle] = useState('');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaCat, setNewMediaCat] = useState('Architecture');

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSavePost = (postData: Omit<WordPressPost, 'id'>) => {
    if (editingPost) {
      updatePost(editingPost.id, postData);
      showToast('Monograph updated successfully.');
    } else {
      addPost(postData);
      showToast('New monograph published to journal.');
    }
    setEditingPost(null);
  };

  const handleSaveResidence = (residenceData: Omit<ArchitecturalPiece, 'id'>) => {
    if (editingResidence) {
      updateResidence(editingResidence.id, residenceData);
      showToast('Estate dossier updated successfully.');
    } else {
      addResidence(residenceData);
      showToast('New architectural residence registered.');
    }
    setEditingResidence(null);
  };

  const handleSaveHeroContent = (e: React.FormEvent) => {
    e.preventDefault();
    updateHeroData(heroForm);
    updatePhilosophyPillars(pillarsForm);
    showToast('Hero & Spatial Philosophy updated.');
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportDataJSON());
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "aureo-atelier-cms-backup.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Atelier CMS backup exported.');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content && importDataJSON(content)) {
        showToast('Atelier database restored from backup.');
      } else {
        alert('Invalid JSON backup file.');
      }
    };
    reader.readAsText(file);
  };

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaTitle || !newMediaUrl) return;
    addMediaAsset({
      title: newMediaTitle,
      url: newMediaUrl,
      category: newMediaCat,
      aspectRatio: '16:9'
    });
    setNewMediaTitle('');
    setNewMediaUrl('');
    showToast('New architectural photo added to vault.');
  };

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(postSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(postSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#faf8f5] flex flex-col justify-between overflow-hidden text-stone-900 font-sans">
      
      {/* Top Studio Bar in Warm Travertine Alabaster */}
      <div className="bg-[#f5f0e6] border-b border-stone-300/80 px-6 sm:px-10 py-3.5 flex items-center justify-between shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          {isStandalonePage && (
            <button
              onClick={onClose}
              className="mr-2 px-3.5 py-1.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border border-stone-300 shadow-sm"
              title="Return to Public Website"
            >
              <ArrowLeft size={13} />
              <span>Public Website</span>
            </button>
          )}

          <div className="w-8 h-8 rounded-lg bg-white border border-stone-300 shadow-sm flex items-center justify-center text-aureo-gold-700">
            <Sparkles size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-serif font-bold tracking-[0.25em] text-stone-900">
                A U R E O
              </span>
              <span className="px-2 py-0.5 rounded-full bg-aureo-gold-500/15 text-aureo-gold-900 text-[10px] font-bold border border-aureo-gold-400/40">
                Studio CMS Portal
              </span>
            </div>
            <p className="text-[11px] text-stone-500 hidden sm:block">
              Dedicated Content Management Engine · <span className="font-mono font-bold text-aureo-gold-800">/admin</span>
            </p>
          </div>
        </div>

        {/* Global Utilities & Exit */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleExportJSON}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold border border-stone-300 transition-all cursor-pointer shadow-sm"
            title="Export JSON Backup"
          >
            <Download size={13} />
            <span>Export</span>
          </button>

          <label className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold border border-stone-300 transition-all cursor-pointer shadow-sm">
            <Upload size={13} />
            <span>Import</span>
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>

          <button
            onClick={() => {
              if (confirm('Reset all CMS data back to original factory defaults?')) {
                resetToDefaults();
                showToast('Atelier reset to original defaults.');
              }
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-semibold border border-stone-300 transition-all cursor-pointer"
            title="Factory Reset"
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>

          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            title="Sign Out / Exit"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Studio Body (Sidebar + Content Workspace) */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-[#faf8f5]">
        
        {/* Sidebar Navigation in Warm Ivory Travertine */}
        <div className="w-full md:w-72 bg-[#f8f5ee] border-r border-stone-200 p-4 sm:p-6 flex flex-row md:flex-col justify-between shrink-0 overflow-x-auto md:overflow-y-auto">
          <div className="flex md:flex-col gap-2 w-full">
            
            <button
              onClick={() => setActiveTab('posts')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left whitespace-nowrap cursor-pointer ${
                activeTab === 'posts'
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-200/60'
              }`}
            >
              <BookOpen size={16} />
              <span className="flex-1">Journal & Essays</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                activeTab === 'posts' ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-800'
              }`}>
                {posts.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('residences')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left whitespace-nowrap cursor-pointer ${
                activeTab === 'residences'
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-200/60'
              }`}
            >
              <Building size={16} />
              <span className="flex-1">Estates & Dossiers</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                activeTab === 'residences' ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-800'
              }`}>
                {residences.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('content')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left whitespace-nowrap cursor-pointer ${
                activeTab === 'content'
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-200/60'
              }`}
            >
              <Edit3 size={16} />
              <span>Headlines & Copy</span>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left whitespace-nowrap cursor-pointer ${
                activeTab === 'inquiries'
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-200/60'
              }`}
            >
              <Lock size={16} />
              <span className="flex-1">Acquisition Inquiries</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                {inquiries.filter((i) => i.status === 'new').length} New
              </span>
            </button>

            <button
              onClick={() => setActiveTab('media')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left whitespace-nowrap cursor-pointer ${
                activeTab === 'media'
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-200/60'
              }`}
            >
              <ImageIcon size={16} />
              <span className="flex-1">Media Vault</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                activeTab === 'media' ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-800'
              }`}>
                {mediaAssets.length}
              </span>
            </button>

          </div>

          {/* Bottom Atelier Quick Status */}
          <div className="hidden md:block pt-6 border-t border-stone-200 text-[11px] text-stone-500">
            <p className="text-stone-800 font-semibold mb-1">Status: Real-Time Sync</p>
            <p>Edits immediately reflect on the live website.</p>
          </div>
        </div>

        {/* Workspace Panels */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-[#faf8f5]">
          
          {/* TAB 1: JOURNAL & ESSAYS CMS */}
          {activeTab === 'posts' && (
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
                    Architectural Journal & Essays
                  </h2>
                  <p className="text-xs text-stone-600 mt-1">
                    Publish monographs, daylight studies, and material research articles.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Filter monographs..."
                      value={postSearch}
                      onChange={(e) => setPostSearch(e.target.value)}
                      className="pl-8 pr-4 py-2 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-aureo-gold-500/30 focus:border-aureo-gold-600 shadow-sm"
                    />
                    <Search size={13} className="absolute left-2.5 top-2.5 text-stone-400" />
                  </div>

                  <button
                    onClick={() => {
                      setEditingPost(null);
                      setIsPostModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-aureo-gold-600 hover:bg-aureo-gold-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>New Monograph</span>
                  </button>
                </div>
              </div>

              {/* Posts Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-[10px] font-bold uppercase tracking-wider border border-stone-200">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-2 text-stone-500 text-xs font-mono">
                          <Clock size={12} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-stone-900 shrink-0">
                          <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="text-base font-serif font-bold text-stone-900 line-clamp-2">
                            {post.title}
                          </h4>
                          <p className="text-xs text-stone-600 mt-1.5 line-clamp-2 font-light">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                      <div className="text-[11px] text-stone-500">
                        <span>By {post.author.name}</span> · <span>{post.date}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingPost(post);
                            setIsPostModalOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Edit size={12} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete monograph "${post.title}"?`)) {
                              deletePost(post.id);
                              showToast('Monograph deleted.');
                            }
                          }}
                          className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer border border-red-200"
                        >
                          <Trash2 size={12} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: ESTATES & DOSSIERS CMS */}
          {activeTab === 'residences' && (
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
                    Estates & Architectural Dossiers
                  </h2>
                  <p className="text-xs text-stone-600 mt-1">
                    Manage monolithic portfolio estates, photography renders, and engineering specifications.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingResidence(null);
                    setIsResidenceModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-aureo-gold-600 hover:bg-aureo-gold-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Register Estate</span>
                </button>
              </div>

              {/* Residences Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {residences.map((r) => (
                  <div
                    key={r.id}
                    className="rounded-3xl overflow-hidden bg-white border border-stone-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                      <img src={r.imageUrl} alt={r.title} className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold text-stone-900 uppercase shadow-sm">
                          {r.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-aureo-gold-800 font-bold uppercase tracking-wider block mb-1 font-mono">
                          {r.location}
                        </span>
                        <h4 className="text-lg font-serif font-bold text-stone-900 mb-2">
                          {r.title}
                        </h4>
                        <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600 bg-stone-50 p-2.5 rounded-xl mb-3 font-mono border border-stone-100">
                          <span>Area: {r.specs.area}</span>
                          <span>Bedrooms: {r.specs.bedrooms}</span>
                          <span>Year: {r.specs.completion}</span>
                          <span>Lot: {r.specs.lotSize}</span>
                        </div>
                        <p className="text-xs text-stone-600 line-clamp-2 font-light">
                          {r.description}
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                        <button
                          onClick={() => {
                            setEditingResidence(r);
                            setIsResidenceModalOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Edit size={12} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete estate "${r.title}"?`)) {
                              deleteResidence(r.id);
                              showToast('Estate deleted.');
                            }
                          }}
                          className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold flex items-center gap-1 cursor-pointer border border-red-200"
                        >
                          <Trash2 size={12} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: HEADLINES & CONTENT STUDIO */}
          {activeTab === 'content' && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
                  Landing Headlines & Studio Copy
                </h2>
                <p className="text-xs text-stone-600 mt-1">
                  Customize the hero statement, ambient film URL, and spatial philosophy pillars.
                </p>
              </div>

              <form onSubmit={handleSaveHeroContent} className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-800 block mb-2">
                    Hero Headline (Use Enter for line breaks)
                  </label>
                  <textarea
                    rows={2}
                    value={heroForm.headline}
                    onChange={(e) => setHeroForm({ ...heroForm, headline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-sm font-serif font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-aureo-gold-500/30 focus:border-aureo-gold-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-800 block mb-2">
                    Hero Subtitle Statement
                  </label>
                  <input
                    type="text"
                    value={heroForm.subhead}
                    onChange={(e) => setHeroForm({ ...heroForm, subhead: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-aureo-gold-500/30 focus:border-aureo-gold-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-800 block mb-2">
                    Ambient Background Video URL (MP4)
                  </label>
                  <input
                    type="url"
                    value={heroForm.videoUrl || ''}
                    onChange={(e) => setHeroForm({ ...heroForm, videoUrl: e.target.value })}
                    placeholder="https://assets.mixkit.co/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-aureo-gold-500/30 focus:border-aureo-gold-600 font-mono"
                  />
                </div>

                {/* Philosophy Pillars Section */}
                <div className="pt-4 border-t border-stone-200 space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-aureo-gold-800">
                    Spatial Philosophy Pillars
                  </h3>
                  {pillarsForm.map((p, idx) => (
                    <div key={p.number} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-aureo-gold-800 font-mono">{p.number}</span>
                        <input
                          type="text"
                          value={p.title}
                          onChange={(e) => {
                            const newPillars = [...pillarsForm];
                            newPillars[idx].title = e.target.value;
                            setPillarsForm(newPillars);
                          }}
                          className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-stone-300 text-xs font-bold text-stone-900"
                        />
                      </div>
                      <textarea
                        rows={2}
                        value={p.detail}
                        onChange={(e) => {
                          const newPillars = [...pillarsForm];
                          newPillars[idx].detail = e.target.value;
                          setPillarsForm(newPillars);
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-stone-300 text-xs text-stone-700 font-light resize-none"
                      />
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-xl bg-aureo-gold-600 hover:bg-aureo-gold-500 text-white text-xs font-bold uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
                  >
                    <Check size={14} />
                    <span>Save Studio Text Changes</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: ACQUISITION INQUIRIES LEADS */}
          {activeTab === 'inquiries' && (
            <div className="max-w-6xl mx-auto space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
                  Private Acquisition Inquiries
                </h2>
                <p className="text-xs text-stone-600 mt-1">
                  Confidential dossiers requested by private collectors and client representatives.
                </p>
              </div>

              {/* Inquiries Table / Cards */}
              <div className="space-y-4">
                {inquiries.map((inq: ClientInquiry) => (
                  <div
                    key={inq.id}
                    className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-base font-serif font-bold text-stone-900">
                          {inq.fullName}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          inq.status === 'new'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : inq.status === 'reviewed'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-stone-100 text-stone-600'
                        }`}>
                          {inq.status}
                        </span>
                        <span className="text-xs text-stone-400 font-mono">{inq.timestamp}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600">
                        <span className="flex items-center gap-1">
                          <MapPin size={12} className="text-aureo-gold-700" />
                          <span>{inq.location}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign size={12} className="text-aureo-gold-700" />
                          <span>{inq.investmentTier}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail size={12} className="text-stone-500" />
                          <a href={`mailto:${inq.email}`} className="hover:text-aureo-gold-800 underline">{inq.email}</a>
                        </span>
                        {inq.phone && (
                          <span className="flex items-center gap-1">
                            <Phone size={12} className="text-stone-500" />
                            <span>{inq.phone}</span>
                          </span>
                        )}
                      </div>

                      {inq.notes && (
                        <p className="text-xs text-stone-700 bg-stone-50 border border-stone-200 p-3 rounded-xl font-light italic">
                          &ldquo;{inq.notes}&rdquo;
                        </p>
                      )}
                    </div>

                    {/* Status & Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={inq.status}
                        onChange={(e) => {
                          updateInquiryStatus(inq.id, e.target.value as any);
                          showToast('Inquiry status updated.');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 focus:outline-none cursor-pointer"
                      >
                        <option value="new">New Lead</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="contacted">Contacted</option>
                        <option value="archived">Archived</option>
                      </select>

                      <button
                        onClick={() => {
                          if (confirm(`Remove inquiry from ${inq.fullName}?`)) {
                            deleteInquiry(inq.id);
                            showToast('Inquiry removed.');
                          }
                        }}
                        className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs transition-colors cursor-pointer border border-red-200"
                        title="Delete Inquiry"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: MEDIA VAULT */}
          {activeTab === 'media' && (
            <div className="max-w-6xl mx-auto space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
                  Architectural Photography Vault
                </h2>
                <p className="text-xs text-stone-600 mt-1">
                  Central repository of high-resolution architectural photography and renders.
                </p>
              </div>

              {/* Add New Media Form */}
              <form onSubmit={handleAddMedia} className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                <div className="sm:col-span-4">
                  <label className="text-[11px] font-bold uppercase text-stone-700 block mb-1">Asset Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Zurich Sunset Solarium"
                    value={newMediaTitle}
                    onChange={(e) => setNewMediaTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-aureo-gold-600"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="text-[11px] font-bold uppercase text-stone-700 block mb-1">Category</label>
                  <select
                    value={newMediaCat}
                    onChange={(e) => setNewMediaCat(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-aureo-gold-600"
                  >
                    <option>Architecture</option>
                    <option>Lighting</option>
                    <option>Interior</option>
                    <option>Alpine</option>
                    <option>Engineering</option>
                  </select>
                </div>
                <div className="sm:col-span-3">
                  <label className="text-[11px] font-bold uppercase text-stone-700 block mb-1">Image URL</label>
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={newMediaUrl}
                    onChange={(e) => setNewMediaUrl(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-aureo-gold-600"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-aureo-gold-600 hover:bg-aureo-gold-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Plus size={14} />
                    <span>Add Photo</span>
                  </button>
                </div>
              </form>

              {/* Media Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {mediaAssets.map((asset) => (
                  <div key={asset.id} className="group rounded-2xl overflow-hidden bg-white border border-stone-200/90 shadow-sm flex flex-col">
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                      <img src={asset.url} alt={asset.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(asset.url);
                          showToast('Image URL copied to clipboard.');
                        }}
                        className="absolute bottom-2.5 right-2.5 px-3 py-1 rounded-full bg-white/90 hover:bg-white text-stone-900 text-[10px] font-bold backdrop-blur-md transition-colors cursor-pointer shadow-md"
                      >
                        Copy URL
                      </button>
                    </div>
                    <div className="p-3.5 flex items-center justify-between text-xs">
                      <div>
                        <h5 className="font-semibold text-stone-900 truncate max-w-[180px]">{asset.title}</h5>
                        <span className="text-[10px] text-stone-500 font-mono">{asset.category}</span>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm(`Remove image "${asset.title}"?`)) {
                            deleteMediaAsset(asset.id);
                            showToast('Image removed.');
                          }
                        }}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete Image"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-stone-900 text-white text-xs font-bold uppercase tracking-widest shadow-2xl flex items-center gap-2 border border-stone-700"
          >
            <CheckCircle2 size={14} className="text-aureo-gold-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Post Editor Modal */}
      <PostEditorModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onSave={handleSavePost}
        initialPost={editingPost}
      />

      {/* Residence Editor Modal */}
      <ResidenceEditorModal
        isOpen={isResidenceModalOpen}
        onClose={() => setIsResidenceModalOpen(false)}
        onSave={handleSaveResidence}
        initialResidence={editingResidence}
      />

    </div>
  );
};
