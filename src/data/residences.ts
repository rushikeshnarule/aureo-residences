export interface ArchitecturalPiece {
  id: string;
  title: string;
  location: string;
  category: 'all' | 'alpine' | 'coastal' | 'lakefront';
  subtitle: string;
  description: string;
  narrative: string;
  imageUrl: string;
  videoThumb?: string;
  tag: string;
  specs: {
    area: string;
    completion: string;
    architect: string;
    bedrooms: string;
    lotSize: string;
  };
  gradientClass?: string;
}

export interface DestinationCard {
  id: string;
  city: string;
  tagline: string;
  location: string;
  imageUrl: string;
  elevation: string;
  features: string[];
}

export interface Hotspot {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
}

export interface VirtualRoom {
  id: string;
  name: string;
  location: string;
  dayUrl: string;
  nightUrl: string;
  description: string;
  fov: string;
}

export interface JournalItem {
  id: string;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
  aspect: string;
  likes: string;
}

export interface WordPressPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  featuredImage: string;
  isFeatured?: boolean;
}

export const HERO_DATA = {
  brand: "A U R E O",
  headline: "EXQUISITE LIVING,\nREDEFINED",
  subhead: "Bespoke residences in the world's most coveted destinations.",
  mainRender: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85",
  sunsetRender: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85",
};

export const DESTINATIONS: DestinationCard[] = [
  {
    id: "zurich",
    city: "ZURICH",
    tagline: "MODERN ELEGANCE",
    location: "Lake Zurich, Switzerland",
    imageUrl: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&w=1000&q=80",
    elevation: "408m above sea level",
    features: ["Alpine lake frontage", "Cantilevered travertine terrace", "Private yacht dock"]
  },
  {
    id: "costa-brava",
    city: "COSTA BRAVA",
    tagline: "COASTAL LUXURY",
    location: "Girona Coast, Spain",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
    elevation: "Mediterranean cliffside",
    features: ["Infinity pool over cove", "Motorized glass curtains", "Century-old olive grove"]
  },
  {
    id: "aspen",
    city: "ASPEN",
    tagline: "MOUNTAIN RETREAT",
    location: "Red Mountain, Colorado",
    imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80",
    elevation: "2,405m alpine valley",
    features: ["Heated granite driveway", "Subterranean spa pavilion", "Ski-in / ski-out access"]
  }
];

export const LEGACY_DATA = {
  headline: "Your Home, Your\nLegacy, Designed\nForever",
  description: "More than just a residence, Aureo is a reflection of your individuality — thoughtfully designed, expertly crafted, and created to inspire for generations to come.",
  perspectives: [
    {
      id: "perspective-main",
      title: "The Solarium Terrace & Pool",
      caption: "Double-cantilever concrete volumes floating above a private infinity reflecting basin.",
      location: "Zurich Lakefront",
      dayUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
      nightUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
      hotspots: [
        {
          id: "hs-1",
          x: 48,
          y: 35,
          title: "Floating Cantilever Volume",
          description: "Post-tensioned concrete overhang providing passive solar shading."
        },
        {
          id: "hs-2",
          x: 72,
          y: 58,
          title: "Frameless Glass Facade",
          description: "Triple-glazed motorized panels offering acoustic insulation and thermal balance."
        },
        {
          id: "hs-3",
          x: 25,
          y: 78,
          title: "Reflecting Deck & Fire Basin",
          description: "Seamless travertine stone paving meeting an integrated fire pit and infinity edge."
        }
      ]
    },
    {
      id: "perspective-interior",
      title: "Pavilion Living Gallery",
      caption: "Double-height atrium featuring custom fluted teak millwork and curated natural stone.",
      location: "Interior Sanctuary",
      dayUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85",
      nightUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",
      url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85",
      hotspots: [
        {
          id: "hs-4",
          x: 35,
          y: 45,
          title: "Acoustic Teak Paneling",
          description: "Sustainably harvested FSC-certified vertical cedar acoustic slats."
        },
        {
          id: "hs-5",
          x: 65,
          y: 60,
          title: "Continuous Microcement",
          description: "Hand-troweled seamless heated flooring across all living zones."
        }
      ]
    },
    {
      id: "perspective-twilight",
      title: "Villa Solis Twilight",
      caption: "Warm internal illumination framing the sharp geometric lines against the evening sky.",
      location: "Alpine Horizon",
      dayUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
      nightUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
      hotspots: [
        {
          id: "hs-6",
          x: 55,
          y: 40,
          title: "Integrated Architectural Lighting",
          description: "Recessed 2700K museum-grade LED channels concealed within ceiling reveals."
        }
      ]
    }
  ]
};

export const GALLERY_CARDS: ArchitecturalPiece[] = [
  {
    id: "horizon-villa",
    title: "The Horizon Villa",
    location: "Lake Lucerne, Switzerland",
    category: "lakefront",
    subtitle: "Monolithic Cantilever Residence",
    description: "Framed against alpine vistas, expansive floor-to-ceiling glass pavilions dissolve the boundary between interior sanctuaries and natural topography.",
    narrative: "Conceived as an homage to the alpine lake topography, The Horizon Villa balances 14-meter post-tensioned cantilevers that seem to float weightlessly above the waterline.",
    imageUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85",
    tag: "Minimalist Concrete & Glass",
    specs: {
      area: "8,400 sq ft",
      completion: "2025",
      architect: "Aureo Zurich Studio",
      bedrooms: "5 Suites",
      lotSize: "1.4 Acres"
    },
    gradientClass: "card-teal-gradient"
  },
  {
    id: "solarium-pavilion",
    title: "Solis Pavilion",
    location: "Costa Brava, Spain",
    category: "coastal",
    subtitle: "Coastal Light & Teak Geometry",
    description: "Slatted cedar canopies cast shifting shadows across polished limestone floors, capturing the Mediterranean breeze through motorized glass curtains.",
    narrative: "Perched atop a private granite cliff overlooking turquoise waters, Solis Pavilion captures 300 days of Mediterranean sunlight with passive thermodynamic ventilation.",
    imageUrl: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=85",
    tag: "Biophilic Coastal",
    specs: {
      area: "6,900 sq ft",
      completion: "2024",
      architect: "Aureo Milan Studio",
      bedrooms: "4 Suites",
      lotSize: "0.9 Acres"
    },
    gradientClass: "card-sky-gradient"
  },
  {
    id: "atrium-sanctuary",
    title: "The Glass Monolith",
    location: "Aspen, Colorado",
    category: "alpine",
    subtitle: "Subterranean Light & Stone",
    description: "An understated architectural triumph carved into granite stone, featuring reflecting water channels and an integrated private art wing.",
    narrative: "Engineered to withstand heavy snow loads while remaining visually ethereal, utilizing structural insulated glass and locally quarried Colorado quartz stone.",
    imageUrl: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=85",
    tag: "Alpine Modernism",
    specs: {
      area: "11,200 sq ft",
      completion: "2025",
      architect: "Aureo USA",
      bedrooms: "6 Suites",
      lotSize: "3.2 Acres"
    },
    gradientClass: "card-slate-gradient"
  }
];

export const POSTS_DATA: WordPressPost[] = [
  {
    id: "post-1",
    slug: "art-of-negative-space",
    title: "The Art of Negative Space: Balancing Concrete Cantilevers in Alpine Topography",
    excerpt: "Exploring the engineering and aesthetic philosophy behind 14-meter post-tensioned concrete cantilevers floating above alpine terrain.",
    content: `Architecture reaches its zenith not when there is nothing left to add, but when nothing more can be removed without compromising structural truth. 

At our Zurich atelier, the exploration of negative space has evolved into a disciplined methodology. By post-tensioning reinforced architectural concrete with high-tensile steel tendons, we liberate the living plane from intrusive perimeter columns. The result is an ethereal horizontal plane that hovers silently over the Swiss lakefront.

### The Physics of Cantilevered Freedom
Traditional alpine residential construction relies heavily on steep gables and load-bearing perimeter stone. Our approach reverses this hierarchy by embedding deep core foundation anchors into the underlying granite bedrock. The cantilever acts as a counterweighted structural lever, allowing the front facade to open completely to panoramic vistas.

### Passive Thermal Performance
The extended concrete soffit serves a double thermodynamic purpose: during high summer, it prevents direct thermal gain from overhead solar angles, while during winter months, low-angle alpine sunlight penetrates deeply into the polished limestone floor plates, storing thermal mass naturally throughout the evening.`,
    category: "Architecture",
    tags: ["Cantilever", "Concrete", "Alpine", "Engineering"],
    author: {
      name: "Marcus von Berg",
      role: "Principal Design Partner",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    date: "August 12, 2026",
    readTime: "5 min read",
    featuredImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
    isFeatured: true
  },
  {
    id: "post-2",
    slug: "diurnal-shadow-choreography",
    title: "Shadow Choreography: Diurnal Daylight Studies & Solar Orientation",
    excerpt: "How we compute millimeter-precise sunlight trajectories to cast shifting geometric shadows across private interior sanctuaries.",
    content: `Natural sunlight is the most luxurious building material available to the architect. Unlike static finishes, light is constantly in flux, transforming a space throughout the diurnal cycle.

In our Costa Brava monograph projects, every room is calibrated to the azimuth and solar altitude of its specific latitude. Motorized vertical cedar louvers are spaced with parametric mathematical precision, creating rhythmic light striations that traverse the floor plates from morning Mediterranean dawn to evening twilight.

### Material Interaction with Natural Lumens
When direct sunlight strikes hand-troweled microcement and fluted teak, the tactile texture of the surfaces is amplified. The play between razor-sharp geometric shadows and soft ambient reflected light creates a serene contemplative sanctuary.`,
    category: "Lighting Design",
    tags: ["Lighting", "Sunlight", "Biophilic", "Mediterranean"],
    author: {
      name: "Elena Rostova",
      role: "Director of Lighting & Spatial Flow",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
    },
    date: "July 28, 2026",
    readTime: "4 min read",
    featuredImage: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "post-3",
    slug: "monolithic-basalt-slabs",
    title: "Basalt & Bas-Relief: The Re-emergence of Natural Volcanic Stone",
    excerpt: "Sourcing and hand-finishing 4-ton volcanic basalt slabs to ground modern glass pavilions in geological permanence.",
    content: `In an era dominated by synthetic composites and fleeting trends, natural volcanic stone represents geological permanence. Sourced from ancient quarries in Italy and Iceland, dark volcanic basalt offers a tactile density that grounds the lightness of glass and steel.

Each slab is selected at the quarry face, book-matched by hand, and finished with a honed leather texture that repels moisture while retaining the organic crystalline veins formed millions of years ago.

When combined with radiant underfloor heating and integrated reflecting water channels, volcanic basalt provides an unshakeable sense of calm and endurance.`,
    category: "Materiality",
    tags: ["Basalt", "Natural Stone", "Craftsmanship", "Monolith"],
    author: {
      name: "Luca Moretti",
      role: "Lead Materials Curator",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    date: "July 14, 2026",
    readTime: "6 min read",
    featuredImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "post-4",
    slug: "acoustic-glass-engineering",
    title: "Acoustic Glass Architecture: Eliminating Vibration in Wind Corridors",
    excerpt: "Engineering motorized triple-pane acoustic curtain walls capable of complete silence in high-velocity mountain and coastal environments.",
    content: `True luxury in residential architecture is silence. In expansive cliffside and alpine environments, high-velocity winds can induce harmonic glass vibration and acoustic resonance.

Our proprietary structural glazing specifications utilize multi-layer acoustic PVB interlayers laminated between ultra-clear low-iron glass panels. These motorized panels glide effortlessly along recessed flush floor tracks, offering unobstructed floor-to-ceiling transparency without compromising thermal acoustic tranquility.`,
    category: "Engineering",
    tags: ["Acoustics", "Glass", "Structural", "Technology"],
    author: {
      name: "Dr. Henrik Lindqvist",
      role: "Structural Façade Engineer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    },
    date: "June 30, 2026",
    readTime: "4 min read",
    featuredImage: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85"
  }
];

export const VISION_DATA = {
  prefix: "Where your vision",
  inlineImage: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=400&q=80",
  suffix: "finds its home.",
  description: "Aureo offers more than just a place to live — it's a space designed to reflect your unique style, crafted with timeless precision, and built to inspire for generations to come."
};

export const VIRTUAL_ROOMS: VirtualRoom[] = [
  {
    id: "pool-terrace",
    name: "Cantilever Sunset Deck",
    location: "Villa Horizon · Lucerne",
    dayUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85",
    nightUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=85",
    description: "Experience the transition from crisp daytime alpine light to ambient evening fire glow.",
    fov: "360° Spatial Panorama"
  },
  {
    id: "great-room",
    name: "Double-Height Atrium Lounge",
    location: "Solis Pavilion · Costa Brava",
    dayUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1920&q=85",
    nightUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=85",
    description: "Full height fluted cedar acoustic joinery with motorized recessed architectural lighting.",
    fov: "360° Interior Immersion"
  }
];

export const JOURNAL_FEED: JournalItem[] = [
  {
    id: "j-1",
    title: "Monolithic Basalt Slabs in Alpine Living",
    category: "Materiality",
    date: "August 2026",
    imageUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80",
    aspect: "aspect-[4/5]",
    likes: "1.4k"
  },
  {
    id: "j-2",
    title: "1:50 Timber Scale Model: The Lucerne Monolith",
    category: "Process",
    date: "July 2026",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
    aspect: "aspect-square",
    likes: "2.1k"
  },
  {
    id: "j-3",
    title: "Shadow Choreography: Diurnal Daylight Studies",
    category: "Lighting Design",
    date: "July 2026",
    imageUrl: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=600&q=80",
    aspect: "aspect-[4/5]",
    likes: "3.8k"
  },
  {
    id: "j-4",
    title: "Structural Glass Curtains & Acoustic Engineering",
    category: "Innovation",
    date: "June 2026",
    imageUrl: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=600&q=80",
    aspect: "aspect-square",
    likes: "940"
  }
];

export const PHILOSOPHY_PILLARS = [
  {
    number: "01",
    title: "Pure Structural Honesty",
    detail: "Every line and cantilever serves a functional architectural purpose, stripping away ornamentation to reveal honest monolithic form."
  },
  {
    number: "02",
    title: "Sensory Light Orchestration",
    detail: "Oriented meticulously to track the diurnal path of the sun, casting dynamic geometric shadows through fluted timber louvers."
  },
  {
    number: "03",
    title: "Permanent Materiality",
    detail: "Constructed with low-carbon architectural concrete, volcanic basalt, brushed titanium, and sustainably aged teak wood."
  }
];

export const NAV_LINKS = [
  { label: "Properties", href: "#destinations", subtitle: "Curated private estates" },
  { label: "Studio", href: "#philosophy", subtitle: "Our spatial principles" },
  { label: "About", href: "#details", subtitle: "Craftsmanship & atelier" },
  { label: "Journal", href: "#journal", subtitle: "Monographs & Essays" },
  { label: "Contact", href: "#inquire", subtitle: "Private acquisition registry" }
];

export const FOOTER_LINKS = [
  { label: "Properties", href: "#destinations" },
  { label: "Studio", href: "#philosophy" },
  { label: "About", href: "#details" },
  { label: "Journal", href: "#journal" },
  { label: "Contact", href: "#inquire" },
  { label: "Instagram", href: "https://instagram.com", external: true }
];
