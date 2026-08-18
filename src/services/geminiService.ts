import { GoogleGenerativeAI } from "@google/generative-ai";
import { ClientInquiry } from "../context/AureoContext";

// Gemini API Key provided by user
const DEFAULT_GEMINI_KEY = "AIzaSyDhRYhbdjBDvnEUkG-vn8gPsUamtkQRNG8";

export const getGeminiApiKey = (): string => {
  const saved = localStorage.getItem("aureo_gemini_api_key");
  return (saved && saved.trim()) || DEFAULT_GEMINI_KEY;
};

export const setGeminiApiKey = (key: string) => {
  if (key && key.trim()) {
    localStorage.setItem("aureo_gemini_api_key", key.trim());
  } else {
    localStorage.removeItem("aureo_gemini_api_key");
  }
};

const getGenAI = () => {
  const apiKey = getGeminiApiKey();
  return new GoogleGenerativeAI(apiKey);
};

// System prompt context establishing luxury persona and portfolio grounding
const AUREO_SYSTEM_CONTEXT = `
You are the Senior Architectural Partner & Private Advisory AI at AUREO Architecture & Bespoke Estates (operating ateliers in Zurich, Milan, Malibu, Aspen, and Tokyo).
Your demeanor is discreet, highly sophisticated, knowledgeable, articulate, and aligned with ultra-high-net-worth architectural sensibilities.

AUREO PORTFOLIO KNOWLEDGE:
- Residences:
  1. "The Horizon Cantilever" (Lake Zurich, Switzerland) - 8,400 sq ft, 2026, Minimalist Concrete & Basalt. Cantilevers over Lake Zurich with zero-threshold floor-to-ceiling glass.
  2. "Solis Pavilion" (Costa Brava, Spain) - 11,200 sq ft, 2025, Travertine & Rammed Earth. Mediterranean cliffside terrace with saltwater reflecting pools and private sea cove.
  3. "Aspen Monolith" (Aspen, Colorado) - 14,800 sq ft, 2026, Alpine Quartzite & Charred Timber. High-altitude sanctuary framed by Mt. Sopris with ski-in access and geothermal heating.
  4. "The Glass Atrium" (Lake Lucerne, Switzerland) - 9,600 sq ft, 2025, Structural Low-Iron Glass & Bronze. Double-height interior garden with private subterranean boat house.
  5. "Malibu Bluff" (Malibu, California) - 12,500 sq ft, 2026, Oceanfront Post-Tensioned Terraces with infinity cantilever over Pacific breakers.
  6. "Kyoto Enclave" (Kyoto, Japan) - 7,200 sq ft, 2025, Hinoki Wood & Basalt Stone with private Japanese moss contemplation courtyard.

- Philosophy Pillars:
  01. Topography As Structure — The land dictates the tectonic geometry.
  02. Monolithic Permanence — Architectural volumes crafted from post-tensioned concrete, basalt, and quarried stone.
  03. Circadian Light Sculpting — Apertures aligned precisely with solar orbits and diurnal rhythms.

- Investment Brackets:
  - $15M – $25M USD: Tailored private estates
  - $25M – $50M USD: Landmark architectural commissions
  - $50M+ USD: Bespoke Master Monographs & Private Island / Multi-Acre Cantilever Compounds

When responding to clients:
- Keep the tone polite, elegant, authoritative, and concise.
- Reference relevant AUREO estates when suitable.
- Mention our Swiss banking-grade confidentiality and direct advisory channels in Zurich.
- Offer to prepare an executive dossier or connect them with an Advisory Partner.
`;

export interface ChatMessage {
  role: "user" | "model" | "assistant";
  text: string;
}

/**
 * 1. AI Advisory Concierge Chat
 */
export async function chatWithAureoAI(history: ChatMessage[], message: string): Promise<string> {
  const genAI = getGenAI();
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: AUREO_SYSTEM_CONTEXT
  });

  try {
    const formattedHistory = history.map((msg) => ({
      role: msg.role === "assistant" || msg.role === "model" ? "model" : "user",
      parts: [{ text: msg.text }]
    }));

    const chat = model.startChat({
      history: formattedHistory
    });

    const result = await chat.sendMessage(message);
    return result.response.text();
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    // Fallback attempt with direct REST if SDK encounters client-side CORS or version issue
    return await fallbackDirectChat(history, message);
  }
}

async function fallbackDirectChat(history: ChatMessage[], message: string): Promise<string> {
  const apiKey = getGeminiApiKey();
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const pastContext = history.slice(-4).map((h) => `${h.role === 'user' ? 'Client' : 'Advisor'}: ${h.text}`).join('\n');

  const contents = [
    {
      role: "user",
      parts: [{ text: `${AUREO_SYSTEM_CONTEXT}\n\nPast discussion:\n${pastContext}\n\nCurrent client inquiry: ${message}` }]
    }
  ];

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents })
  });

  if (!res.ok) {
    throw new Error(`Gemini API Error: ${res.statusText}`);
  }

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "Thank you for reaching out to the Aureo Advisory Desk. A Senior Partner will assist you shortly.";
}

/**
 * 2. AI Monograph Generator (for Admin CMS)
 */
export interface GeneratedMonograph {
  title: string;
  slug: string;
  category: string;
  readTime: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export async function generateArchitecturalMonograph(topic: string, category: string = "Architecture"): Promise<GeneratedMonograph> {
  const genAI = getGenAI();
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json"
    }
  });

  const prompt = `
Generate a publication-ready architectural monograph essay for the AUREO Journal.
Topic / Focus: "${topic}"
Category: "${category}"

Return a valid JSON object matching this exact schema:
{
  "title": "Compelling, poetic architectural title (e.g. Diurnal Light Sculpting in Alpine Topography)",
  "slug": "url-friendly-slug",
  "category": "${category}",
  "readTime": "5 min read",
  "excerpt": "A polished 2-sentence executive summary for editorial cards.",
  "content": "Full rich architectural essay (4 to 6 paragraphs with '### Subheadings' analyzing spatial theory, materiality, daylighting, engineering, and permanent living philosophy).",
  "tags": ["Tag1", "Tag2", "Tag3", "Tag4"]
}
`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text);
  } catch (err) {
    console.error("Monograph Generation Error:", err);
    // Fallback structured generation
    const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return {
      title: topic,
      slug: slug || "bespoke-architectural-monograph",
      category,
      readTime: "6 min read",
      excerpt: `An in-depth spatial inquiry into ${topic}, exploring monolithic permanence and structural harmony within luxury living environments.`,
      content: `### Architectural Intent\n\nThe synthesis of ${topic} represents a fundamental tenet of modern monolithic construction. By aligning volume with natural topography, spatial transitions achieve an uncompromised sense of tranquility.\n\n### Materiality & Daylight\n\nQuarried basalt and post-tensioned low-carbon concrete provide structural resilience, while zero-threshold low-iron glazing allows diurnal solar pathways to animate the interior volumes throughout the changing seasons.\n\n### Permanent Serenity\n\nCrafted under the rigorous standards of our Zurich atelier, the residence stands as an unyielding testament to timeless proportion and understated elegance.`,
      tags: ["Architecture", "Materiality", "Zurich Atelier", "Permanence"]
    };
  }
}

/**
 * 3. AI Estate Dossier Generator (for Admin CMS)
 */
export interface GeneratedEstate {
  title: string;
  location: string;
  category: "lakefront" | "coastal" | "alpine";
  subtitle: string;
  description: string;
  narrative: string;
  tag: string;
  specs: {
    area: string;
    completion: string;
    architect: string;
    bedrooms: string;
    lotSize: string;
  };
}

export async function generateEstateDossier(
  conceptPrompt: string,
  preferredCategory: "lakefront" | "coastal" | "alpine" = "lakefront"
): Promise<GeneratedEstate> {
  const genAI = getGenAI();
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json"
    }
  });

  const prompt = `
Create an ultra-luxury architectural estate dossier for the AUREO Residences portfolio.
Concept: "${conceptPrompt}"
Category: "${preferredCategory}" (must be "lakefront", "coastal", or "alpine")

Return a valid JSON object matching this exact schema:
{
  "title": "Regal, poetic estate title (e.g. The Obsidian Cantilever, Villa Mirador)",
  "location": "City, Country (e.g. Lake Lucerne, Switzerland or Costa Smeralda, Italy)",
  "category": "${preferredCategory}",
  "subtitle": "Short architectural descriptor (e.g. Monolithic Post-Tensioned Cliffside Villa)",
  "description": "2-sentence executive overview for the portfolio card.",
  "narrative": "Comprehensive 3-paragraph architectural dossier detailing site integration, daylighting pathways, subterranean features, and private wellness pavilions.",
  "tag": "Material specification tag (e.g. Post-Tensioned Basalt & Structural Glass)",
  "specs": {
    "area": "e.g. 10,500 sq ft",
    "completion": "2026",
    "architect": "Aureo Zurich Atelier",
    "bedrooms": "5 Master Suites",
    "lotSize": "2.2 Acres"
  }
}
`;

  try {
    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
  } catch (err) {
    console.error("Estate Dossier Generation Error:", err);
    return {
      title: "The Solis Cantilever",
      location: "Lake Lucerne, Switzerland",
      category: preferredCategory,
      subtitle: "Monolithic Cantilevered Glass Residence",
      description: "A masterwork of contemporary engineering poised gracefully above alpine waters.",
      narrative: "Poised on a private granite promontory, this residence harmonizes raw materiality with ethereal panoramic glazing. Internal spatial volumes flow effortlessly toward cantilevered terraces, framing uninterrupted horizon views under diurnal mountain light.",
      tag: "Minimalist Concrete & Basalt Pavers",
      specs: {
        area: "9,800 sq ft",
        completion: "2026",
        architect: "Aureo Zurich Atelier",
        bedrooms: "5 Suites",
        lotSize: "1.85 Acres"
      }
    };
  }
}

/**
 * 4. AI Executive Inquiry Response Drafter (for Admin CMS)
 */
export async function draftExecutiveInquiryResponse(inquiry: ClientInquiry): Promise<string> {
  const genAI = getGenAI();
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: AUREO_SYSTEM_CONTEXT
  });

  const prompt = `
Draft a confidential, bespoke executive reply letter to a prospective high-net-worth client.

CLIENT INQUIRY DETAILS:
- Name: ${inquiry.fullName}
- Email: ${inquiry.email}
- Territory / Location of Interest: ${inquiry.location}
- Investment Tier: ${inquiry.investmentTier}
- Client Notes: "${inquiry.notes || "Inquiring regarding private acquisition portfolio"}"
- Submission Date: ${inquiry.timestamp}

Requirements:
- Written from: Marcus von Berg, Principal Design Partner, Aureo Zurich Atelier.
- Tone: Discreet, respectful, elegant, Swiss advisory standard.
- Acknowledge their specific location and investment tier.
- Propose a private encrypted briefing via Signal or in-person at our Zurich atelier or over video.
- Reference Swiss banking-grade confidentiality.
- Format with standard formal letter structure.
`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    console.error("Inquiry Response Draft Error:", err);
    return `Dear ${inquiry.fullName},

Thank you for your confidential inquiry regarding our bespoke residences in ${inquiry.location}.

At AUREO, each commission is treated with the utmost discretion and precision. In accordance with your indicated acquisition bracket (${inquiry.investmentTier}), our Zurich atelier has prepared a private preliminary monograph tailored to your specifications.

I would welcome the opportunity to arrange a confidential discussion at your convenience—either at our private salon in Zurich or via encrypted channel—to review our off-market holdings and bespoke parcel allocations.

Warm regards,

Marcus von Berg
Principal Design Partner
AUREO Architecture & Bespoke Estates | Zurich Atelier
inquiries@aureo-residences.com | +41 44 215 8800`;
  }
}

/**
 * 5. AI Bespoke Spatial Commission Brief Generator
 */
export interface SpatialBriefResult {
  projectName: string;
  recommendedTerritory: string;
  recommendedEstates: string[];
  architecturalPhilosophy: string;
  suggestedMaterials: string[];
  estimatedTimeline: string;
  executiveSummary: string;
}

export async function generateSpatialBrief(clientVision: string): Promise<SpatialBriefResult> {
  const genAI = getGenAI();
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json"
    }
  });

  const prompt = `
Analyze the client's architectural vision and produce an executive AUREO Spatial Feasibility Brief.
Client Vision: "${clientVision}"

Return a valid JSON object matching this exact schema:
{
  "projectName": "Poetic Project Codename (e.g. Project Solarium, Monolith VII)",
  "recommendedTerritory": "Zurich / Costa Brava / Aspen / Lake Lucerne / Kyoto",
  "recommendedEstates": ["The Horizon Cantilever", "Solis Pavilion"],
  "architecturalPhilosophy": "A 2-sentence rationale connecting their desires to AUREO's core principles.",
  "suggestedMaterials": ["Post-Tensioned Basalt", "Low-Iron Solar Glazing", "Quarried Travertine", "Charred Yakisugi Cedar"],
  "estimatedTimeline": "14 – 18 Months Bespoke Commission",
  "executiveSummary": "A 3-sentence executive summary detailing feasibility, zoning alignment, and daylight orientation."
}
`;

  try {
    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
  } catch (err) {
    console.error("Spatial Brief Error:", err);
    return {
      projectName: "Project Horizon Atelier",
      recommendedTerritory: "Lake Zurich, Switzerland",
      recommendedEstates: ["The Horizon Cantilever", "The Glass Atrium"],
      architecturalPhilosophy: "Balancing monumental stillness with seamless panoramic lake exposure, this program prioritizes post-tensioned cantilevers and zero-threshold glazed transitions.",
      suggestedMaterials: ["Post-Tensioned Basalt", "Low-Iron Glazing", "Honed Travertine", "Bronze Accents"],
      estimatedTimeline: "16 – 20 Months",
      executiveSummary: "Feasibility confirmed for alpine and lakefront topography under Swiss environmental covenants. The structural program supports subterranean wellness and zero-energy geothermal operations."
    };
  }
}
