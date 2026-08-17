import { useState, useEffect } from 'react';
import { AureoProvider } from './context/AureoContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LegacySection } from './components/LegacySection';
import { PhilosophySection } from './components/PhilosophySection';
import { DetailsGallerySection } from './components/DetailsGallerySection';
import { PostSection } from './components/PostSection';
import { CuratedFeedSection } from './components/CuratedFeedSection';
import { VisionCTASection } from './components/VisionCTASection';
import { Footer } from './components/Footer';
import { ImageModal } from './components/ImageModal';
import { InquiryModal } from './components/InquiryModal';
import { VirtualTourModal } from './components/VirtualTourModal';
import { PostReaderModal } from './components/PostReaderModal';
import { FloatingInquiryButton } from './components/FloatingInquiryButton';
import { AdminAuthModal } from './components/admin/AdminAuthModal';
import { AdminPanel } from './components/admin/AdminPanel';
import { WordPressPost, DestinationCard } from './data/residences';

function AureoApp() {
  // Routing state for dedicated /admin route
  const [isAdminRoute, setIsAdminRoute] = useState(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    return path === '/admin' || path.startsWith('/admin/') || hash === '#admin' || search.includes('admin');
  });

  // Persistent authentication across refreshes
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('aureo_admin_auth') === 'true';
  });

  // Sync route on popstate / hashchange
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      setIsAdminRoute(path === '/admin' || path.startsWith('/admin/') || hash === '#admin' || search.includes('admin'));
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateToPublicSite = () => {
    window.history.pushState({}, '', '/');
    setIsAdminRoute(false);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('aureo_admin_auth');
    setIsAdminAuthenticated(false);
    navigateToPublicSite();
  };

  // Lightbox Modal state
  const [activeImage, setActiveImage] = useState<{
    url: string;
    title?: string;
    caption?: string;
    location?: string;
    narrative?: string;
    specs?: { area: string; completion: string; architect: string; bedrooms?: string; lotSize?: string };
  } | null>(null);

  // Inquiry Modal state
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryLocation, setInquiryLocation] = useState('Zurich');

  // Virtual Tour 360 Modal state
  const [isVirtualTourOpen, setIsVirtualTourOpen] = useState(false);

  // WordPress Post Reader Modal state
  const [activePost, setActivePost] = useState<WordPressPost | null>(null);

  const handleOpenInquiry = (location: string = 'Zurich') => {
    setInquiryLocation(location);
    setIsInquiryOpen(true);
  };

  const handleSelectDestination = (dest: DestinationCard) => {
    setActiveImage({
      url: dest.imageUrl,
      title: `${dest.city} — ${dest.tagline}`,
      caption: `Elevation: ${dest.elevation}. Features: ${dest.features.join(' · ')}.`,
      location: dest.location
    });
  };

  // If visiting /admin or #admin directly:
  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-[#faf8f5] text-stone-900 font-sans">
        {/* Passcode Security Barrier if not authenticated */}
        <AdminAuthModal
          isOpen={!isAdminAuthenticated}
          onClose={navigateToPublicSite}
          onSuccess={() => setIsAdminAuthenticated(true)}
        />

        {/* Dedicated Admin CMS Panel */}
        <AdminPanel
          isOpen={isAdminAuthenticated}
          onClose={handleAdminLogout}
          isStandalonePage={true}
        />
      </div>
    );
  }

  // Pure, clean public landing page (Zero Admin buttons visible)
  return (
    <div className="relative min-h-screen bg-white text-aureo-dark overflow-x-hidden font-sans selection:bg-aureo-gold-500 selection:text-white">
      {/* Dynamic Sticky Luxury Navigation */}
      <Navbar
        onOpenInquiry={() => handleOpenInquiry('General')}
      />

      {/* Main Page Flow */}
      <main>
        {/* 1. Hero Section with 3 Destination Cards Strip & Ambient Film */}
        <HeroSection
          onImageClick={(img) => setActiveImage(img)}
          onOpenVirtualTour={() => setIsVirtualTourOpen(true)}
          onSelectDestination={handleSelectDestination}
        />

        {/* 2. Interactive Materiality & Spatial Craft Hotspots */}
        <LegacySection
          onImageClick={(img) => setActiveImage(img)}
          onOpenVirtualTour={() => setIsVirtualTourOpen(true)}
        />

        {/* 3. Spatial Philosophy 3 Pillars */}
        <PhilosophySection />

        {/* 4. Curated Dossiers / Architectural Pieces Gallery */}
        <DetailsGallerySection
          onImageClick={(img) => setActiveImage(img)}
          onOpenInquiry={(loc) => handleOpenInquiry(loc || 'General')}
        />

        {/* 5. Monograph Essays & WordPress Post Section */}
        <PostSection
          onReadPost={(post) => setActivePost(post)}
        />

        {/* 6. Curated Social & Visual Feed */}
        <CuratedFeedSection
          onImageClick={(img) => setActiveImage(img)}
        />

        {/* 7. Vision & Private Atelier Consultation CTA */}
        <VisionCTASection
          onOpenInquiry={() => handleOpenInquiry('General')}
        />
      </main>

      {/* Luxury Minimalist Footer */}
      <Footer />

      {/* Interactive Floating Quick Actions Pill */}
      <FloatingInquiryButton
        onOpenInquiry={() => handleOpenInquiry('General')}
        onOpenVirtualTour={() => setIsVirtualTourOpen(true)}
      />

      {/* High-Resolution Architectural Lightbox */}
      <ImageModal
        isOpen={!!activeImage}
        image={activeImage}
        onClose={() => setActiveImage(null)}
        onOpenInquiry={(loc?: string) => {
          setActiveImage(null);
          handleOpenInquiry(loc || 'General');
        }}
      />

      {/* Private Acquisition Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        defaultLocation={inquiryLocation}
      />

      {/* 360° Virtual Tour Experience Modal */}
      <VirtualTourModal
        isOpen={isVirtualTourOpen}
        onClose={() => setIsVirtualTourOpen(false)}
      />

      {/* WordPress Monograph Essay Reader Modal */}
      <PostReaderModal
        isOpen={!!activePost}
        post={activePost}
        onClose={() => setActivePost(null)}
      />
    </div>
  );
}

export function App() {
  return (
    <AureoProvider>
      <AureoApp />
    </AureoProvider>
  );
}

export default App;
