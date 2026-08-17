import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  POSTS_DATA,
  GALLERY_CARDS,
  HERO_DATA,
  PHILOSOPHY_PILLARS,
  WordPressPost,
  ArchitecturalPiece
} from '../data/residences';

export interface ClientInquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  investmentTier: string;
  notes: string;
  timestamp: string;
  status: 'new' | 'reviewed' | 'contacted' | 'archived';
}

export interface HeroContent {
  brand: string;
  headline: string;
  subhead: string;
  mainRender: string;
  sunsetRender: string;
  videoUrl?: string;
}

export interface PhilosophyPillar {
  number: string;
  title: string;
  detail: string;
}

export interface MediaAsset {
  id: string;
  title: string;
  category: string;
  url: string;
  aspectRatio: string;
}

interface AureoContextType {
  // Data
  posts: WordPressPost[];
  residences: ArchitecturalPiece[];
  heroData: HeroContent;
  philosophyPillars: PhilosophyPillar[];
  inquiries: ClientInquiry[];
  mediaAssets: MediaAsset[];
  
  // Post Actions
  addPost: (post: Omit<WordPressPost, 'id'>) => void;
  updatePost: (id: string, post: Partial<WordPressPost>) => void;
  deletePost: (id: string) => void;
  
  // Residence Actions
  addResidence: (residence: Omit<ArchitecturalPiece, 'id'>) => void;
  updateResidence: (id: string, residence: Partial<ArchitecturalPiece>) => void;
  deleteResidence: (id: string) => void;
  
  // Hero & Content Actions
  updateHeroData: (data: Partial<HeroContent>) => void;
  updatePhilosophyPillars: (pillars: PhilosophyPillar[]) => void;
  
  // Inquiry Actions
  addInquiry: (inquiry: Omit<ClientInquiry, 'id' | 'timestamp' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: ClientInquiry['status']) => void;
  deleteInquiry: (id: string) => void;

  // Media Actions
  addMediaAsset: (asset: Omit<MediaAsset, 'id'>) => void;
  deleteMediaAsset: (id: string) => void;

  // Utility Actions
  resetToDefaults: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonString: string) => boolean;
}

const DEFAULT_INQUIRIES: ClientInquiry[] = [
  {
    id: 'inq-1',
    fullName: 'Lord Harrison Sterling',
    email: 'harrison@sterling-partners.ch',
    phone: '+41 44 215 8800',
    location: 'Zurich',
    investmentTier: '$25M – $50M',
    notes: 'Inquiring regarding The Horizon Villa or bespoke lakefront cantilever parcel on Lake Lucerne with private boat dock access.',
    timestamp: 'August 16, 2026 · 14:32',
    status: 'new'
  },
  {
    id: 'inq-2',
    fullName: 'Victoria Althaus',
    email: 'v.althaus@monaco-invest.mc',
    phone: '+377 98 06 20 00',
    location: 'Costa Brava',
    investmentTier: '$50M+ USD Bespoke Monograph',
    notes: 'Seeking 300-day Mediterranean cliffside commission with private cove anchorage.',
    timestamp: 'August 15, 2026 · 18:05',
    status: 'reviewed'
  }
];

const DEFAULT_MEDIA: MediaAsset[] = [
  {
    id: 'm-1',
    title: 'Lucerne Monolith Exterior',
    category: 'Architecture',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85',
    aspectRatio: '16:9'
  },
  {
    id: 'm-2',
    title: 'Solis Pavilion Twilight Reflecting Pool',
    category: 'Lighting',
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85',
    aspectRatio: '16:9'
  },
  {
    id: 'm-3',
    title: 'Double-Height Atrium Lounge',
    category: 'Interior',
    url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85',
    aspectRatio: '16:9'
  },
  {
    id: 'm-4',
    title: 'Post-Tensioned Concrete Cantilever Soffit',
    category: 'Engineering',
    url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
    aspectRatio: '4:3'
  },
  {
    id: 'm-5',
    title: 'Aspen Mountain Quartz & Structural Glass',
    category: 'Alpine',
    url: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=85',
    aspectRatio: '16:9'
  }
];

const AureoContext = createContext<AureoContextType | undefined>(undefined);

export const AureoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Posts State
  const [posts, setPosts] = useState<WordPressPost[]>(() => {
    try {
      const saved = localStorage.getItem('aureo_cms_posts');
      return saved ? JSON.parse(saved) : POSTS_DATA;
    } catch {
      return POSTS_DATA;
    }
  });

  // 2. Residences State
  const [residences, setResidences] = useState<ArchitecturalPiece[]>(() => {
    try {
      const saved = localStorage.getItem('aureo_cms_residences');
      return saved ? JSON.parse(saved) : GALLERY_CARDS;
    } catch {
      return GALLERY_CARDS;
    }
  });

  // 3. Hero Data State
  const [heroData, setHeroData] = useState<HeroContent>(() => {
    try {
      const saved = localStorage.getItem('aureo_cms_hero');
      return saved
        ? JSON.parse(saved)
        : {
            ...HERO_DATA,
            videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-building-with-glass-facade-42998-large.mp4'
          };
    } catch {
      return {
        ...HERO_DATA,
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-building-with-glass-facade-42998-large.mp4'
      };
    }
  });

  // 4. Philosophy Pillars
  const [philosophyPillars, setPhilosophyPillars] = useState<PhilosophyPillar[]>(() => {
    try {
      const saved = localStorage.getItem('aureo_cms_pillars');
      return saved ? JSON.parse(saved) : PHILOSOPHY_PILLARS;
    } catch {
      return PHILOSOPHY_PILLARS;
    }
  });

  // 5. Client Inquiries State
  const [inquiries, setInquiries] = useState<ClientInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('aureo_cms_inquiries');
      return saved ? JSON.parse(saved) : DEFAULT_INQUIRIES;
    } catch {
      return DEFAULT_INQUIRIES;
    }
  });

  // 6. Media Assets State
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(() => {
    try {
      const saved = localStorage.getItem('aureo_cms_media');
      return saved ? JSON.parse(saved) : DEFAULT_MEDIA;
    } catch {
      return DEFAULT_MEDIA;
    }
  });

  // Auto-persist to localStorage
  useEffect(() => {
    localStorage.setItem('aureo_cms_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('aureo_cms_residences', JSON.stringify(residences));
  }, [residences]);

  useEffect(() => {
    localStorage.setItem('aureo_cms_hero', JSON.stringify(heroData));
  }, [heroData]);

  useEffect(() => {
    localStorage.setItem('aureo_cms_pillars', JSON.stringify(philosophyPillars));
  }, [philosophyPillars]);

  useEffect(() => {
    localStorage.setItem('aureo_cms_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('aureo_cms_media', JSON.stringify(mediaAssets));
  }, [mediaAssets]);

  // Actions: Posts
  const addPost = (postData: Omit<WordPressPost, 'id'>) => {
    const newPost: WordPressPost = {
      ...postData,
      id: `post-${Date.now()}`
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const updatePost = (id: string, updatedFields: Partial<WordPressPost>) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deletePost = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  // Actions: Residences
  const addResidence = (residenceData: Omit<ArchitecturalPiece, 'id'>) => {
    const newResidence: ArchitecturalPiece = {
      ...residenceData,
      id: `residence-${Date.now()}`
    };
    setResidences((prev) => [newResidence, ...prev]);
  };

  const updateResidence = (id: string, updatedFields: Partial<ArchitecturalPiece>) => {
    setResidences((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updatedFields } : r))
    );
  };

  const deleteResidence = (id: string) => {
    setResidences((prev) => prev.filter((r) => r.id !== id));
  };

  // Actions: Hero & Pillars
  const updateHeroData = (data: Partial<HeroContent>) => {
    setHeroData((prev) => ({ ...prev, ...data }));
  };

  const updatePhilosophyPillars = (pillars: PhilosophyPillar[]) => {
    setPhilosophyPillars(pillars);
  };

  // Actions: Inquiries
  const addInquiry = (inquiryData: Omit<ClientInquiry, 'id' | 'timestamp' | 'status'>) => {
    const dateStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    const timeStr = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const newInquiry: ClientInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      timestamp: `${dateStr} · ${timeStr}`,
      status: 'new'
    };
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  const updateInquiryStatus = (id: string, status: ClientInquiry['status']) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
  };

  // Actions: Media Assets
  const addMediaAsset = (assetData: Omit<MediaAsset, 'id'>) => {
    const newAsset: MediaAsset = {
      ...assetData,
      id: `media-${Date.now()}`
    };
    setMediaAssets((prev) => [newAsset, ...prev]);
  };

  const deleteMediaAsset = (id: string) => {
    setMediaAssets((prev) => prev.filter((m) => m.id !== id));
  };

  // Utility Actions
  const resetToDefaults = () => {
    setPosts(POSTS_DATA);
    setResidences(GALLERY_CARDS);
    setHeroData({
      ...HERO_DATA,
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-building-with-glass-facade-42998-large.mp4'
    });
    setPhilosophyPillars(PHILOSOPHY_PILLARS);
    setInquiries(DEFAULT_INQUIRIES);
    setMediaAssets(DEFAULT_MEDIA);
  };

  const exportDataJSON = () => {
    return JSON.stringify(
      {
        posts,
        residences,
        heroData,
        philosophyPillars,
        inquiries,
        mediaAssets
      },
      null,
      2
    );
  };

  const importDataJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.posts) setPosts(parsed.posts);
      if (parsed.residences) setResidences(parsed.residences);
      if (parsed.heroData) setHeroData(parsed.heroData);
      if (parsed.philosophyPillars) setPhilosophyPillars(parsed.philosophyPillars);
      if (parsed.inquiries) setInquiries(parsed.inquiries);
      if (parsed.mediaAssets) setMediaAssets(parsed.mediaAssets);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <AureoContext.Provider
      value={{
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
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        addMediaAsset,
        deleteMediaAsset,
        resetToDefaults,
        exportDataJSON,
        importDataJSON
      }}
    >
      {children}
    </AureoContext.Provider>
  );
};

export const useAureo = () => {
  const context = useContext(AureoContext);
  if (!context) {
    throw new Error('useAureo must be used within an AureoProvider');
  }
  return context;
};
