// Mock data for ArtMarket Insights

export interface Artist {
  name: string;
  slug: string;
  country: string;
  countryCode: string;
  city: string;
  age: number;
  bio: string;
  style: string;
  medium: string;
  epiScore: number; // Emerging Potential Index 0-100
  currentAvgPrice: number; // in USD
  priceHistory: { month: string; price: number }[];
  projectedPrices: { month: string; price: number }[];
  gallery: string;
  exhibitions: number;
  auctionAppearances: number;
  pressMentions: number;
  socialGrowth: number; // percentage
  tags: string[];
  avatar: string; // initials
  color: string; // placeholder color
}

export interface Country {
  name: string;
  code: string;
  flag: string;
  artistCount: number;
  avgEPI: number;
  topArtist: string;
}

export const countries: Country[] = [
  { name: "United States", code: "US", flag: "🇺🇸", artistCount: 1842, avgEPI: 72, topArtist: "Zara Whitfield" },
  { name: "United Kingdom", code: "UK", flag: "🇬🇧", artistCount: 1205, avgEPI: 68, topArtist: "Ellis Nakamura" },
  { name: "Germany", code: "DE", flag: "🇩🇪", artistCount: 980, avgEPI: 65, topArtist: "Lena Hartmann" },
  { name: "France", code: "FR", flag: "🇫🇷", artistCount: 876, avgEPI: 67, topArtist: "Camille Dubois" },
  { name: "Nigeria", code: "NG", flag: "🇳🇬", artistCount: 654, avgEPI: 78, topArtist: "Adaeze Okafor" },
  { name: "South Africa", code: "ZA", flag: "🇿🇦", artistCount: 543, avgEPI: 74, topArtist: "Thabo Molefe" },
  { name: "Japan", code: "JP", flag: "🇯🇵", artistCount: 1102, avgEPI: 70, topArtist: "Yuki Tanaka" },
  { name: "South Korea", code: "KR", flag: "🇰🇷", artistCount: 789, avgEPI: 73, topArtist: "Min-Ji Park" },
  { name: "Brazil", code: "BR", flag: "🇧🇷", artistCount: 667, avgEPI: 71, topArtist: "Rafael Silva" },
  { name: "India", code: "IN", flag: "🇮🇳", artistCount: 945, avgEPI: 76, topArtist: "Priya Sharma" },
  { name: "China", code: "CN", flag: "🇨🇳", artistCount: 1320, avgEPI: 69, topArtist: "Wei Chen" },
  { name: "Australia", code: "AU", flag: "🇦🇺", artistCount: 432, avgEPI: 64, topArtist: "Indigo Blake" },
  { name: "Canada", code: "CA", flag: "🇨🇦", artistCount: 567, avgEPI: 63, topArtist: "Noah Tremblay" },
  { name: "Netherlands", code: "NL", flag: "🇳🇱", artistCount: 398, avgEPI: 66, topArtist: "Lotte van Dijk" },
  { name: "Italy", code: "IT", flag: "🇮🇹", artistCount: 723, avgEPI: 62, topArtist: "Sofia Rossi" },
  { name: "Spain", code: "ES", flag: "🇪🇸", artistCount: 534, avgEPI: 65, topArtist: "Alejandro Vega" },
  { name: "Mexico", code: "MX", flag: "🇲🇽", artistCount: 445, avgEPI: 72, topArtist: "Valentina Cruz" },
  { name: "Ghana", code: "GH", flag: "🇬🇭", artistCount: 234, avgEPI: 77, topArtist: "Kwame Asante" },
  { name: "Ethiopia", code: "ET", flag: "🇪🇹", artistCount: 189, avgEPI: 79, topArtist: "Makeda Tadesse" },
  { name: "Indonesia", code: "ID", flag: "🇮🇩", artistCount: 356, avgEPI: 70, topArtist: "Dewi Sari" },
  { name: "Poland", code: "PL", flag: "🇵🇱", artistCount: 312, avgEPI: 67, topArtist: "Katarzyna Nowak" },
  { name: "Sweden", code: "SE", flag: "🇸🇪", artistCount: 278, avgEPI: 64, topArtist: "Astrid Lindqvist" },
  { name: "Argentina", code: "AR", flag: "🇦🇷", artistCount: 398, avgEPI: 69, topArtist: "Mateo Fernandez" },
  { name: "Colombia", code: "CO", flag: "🇨🇴", artistCount: 267, avgEPI: 73, topArtist: "Isabella Gomez" },
  { name: "Turkey", code: "TR", flag: "🇹🇷", artistCount: 345, avgEPI: 68, topArtist: "Elif Yilmaz" },
];

function generatePriceHistory(base: number, growth: number, volatility: number): { month: string; price: number }[] {
  const months = ["Jan 2024","Feb 2024","Mar 2024","Apr 2024","May 2024","Jun 2024","Jul 2024","Aug 2024","Sep 2024","Oct 2024","Nov 2024","Dec 2024","Jan 2025","Feb 2025","Mar 2025","Apr 2025","May 2025","Jun 2025","Jul 2025","Aug 2025","Sep 2025","Oct 2025","Nov 2025","Dec 2025"];
  const history: { month: string; price: number }[] = [];
  let price = base;
  for (let i = 0; i < months.length; i++) {
    const change = (Math.random() - 0.3) * volatility + growth;
    price = Math.max(500, price * (1 + change / 100));
    history.push({ month: months[i], price: Math.round(price) });
  }
  return history;
}

function generateProjections(lastPrice: number, growth: number): { month: string; price: number }[] {
  const months = ["Jan 2026","Feb 2026","Mar 2026","Apr 2026","May 2026","Jun 2026","Jul 2026","Aug 2026","Sep 2026","Oct 2026","Nov 2026","Dec 2026"];
  const projections: { month: string; price: number }[] = [];
  let price = lastPrice;
  for (let i = 0; i < months.length; i++) {
    const change = growth + (Math.random() - 0.5) * 3;
    price = Math.max(500, price * (1 + change / 100));
    projections.push({ month: months[i], price: Math.round(price) });
  }
  return projections;
}

export const artists: Artist[] = [
  {
    name: "Adaeze Okafor", slug: "adaeze-okafor", country: "Nigeria", countryCode: "NG", city: "Lagos", age: 29,
    bio: "Adaeze Okafor explores the intersection of Yoruba mythology and contemporary urban life through large-scale mixed-media paintings. Her work has been featured in the Lagos Biennial and is gaining attention from European collectors.",
    style: "Figurative Abstraction", medium: "Mixed Media", epiScore: 94, currentAvgPrice: 18500,
    priceHistory: generatePriceHistory(4000, 12, 8), projectedPrices: generateProjections(18500, 15),
    gallery: "Rele Gallery", exhibitions: 12, auctionAppearances: 4, pressMentions: 28, socialGrowth: 340,
    tags: ["Rising Star", "African Contemporary", "Mixed Media"], avatar: "AO", color: "#e6a05a"
  },
  {
    name: "Makeda Tadesse", slug: "makeda-tadesse", country: "Ethiopia", countryCode: "ET", city: "Addis Ababa", age: 32,
    bio: "Makeda Tadesse creates luminous abstract compositions inspired by Ethiopian illuminated manuscripts and the light of the Horn of Africa. Her canvases command attention with their spiritual depth and technical mastery.",
    style: "Abstract", medium: "Oil", epiScore: 92, currentAvgPrice: 22000,
    priceHistory: generatePriceHistory(5500, 10, 7), projectedPrices: generateProjections(22000, 13),
    gallery: "Addis Fine Art", exhibitions: 9, auctionAppearances: 3, pressMentions: 22, socialGrowth: 280,
    tags: ["Abstract", "African Contemporary", "Spiritual"], avatar: "MT", color: "#d46060"
  },
  {
    name: "Kwame Asante", slug: "kwame-asante", country: "Ghana", countryCode: "GH", city: "Accra", age: 27,
    bio: "Kwame Asante's bold, graphic paintings reimagine Ghanaian kente cloth patterns through a contemporary lens. His work bridges traditional craft and fine art, attracting a new generation of collectors.",
    style: "Geometric Abstraction", medium: "Acrylic", epiScore: 91, currentAvgPrice: 14200,
    priceHistory: generatePriceHistory(3200, 14, 9), projectedPrices: generateProjections(14200, 18),
    gallery: "Gallery 1957", exhibitions: 8, auctionAppearances: 2, pressMentions: 19, socialGrowth: 420,
    tags: ["Geometric", "African Contemporary", "Textile-Inspired"], avatar: "KA", color: "#5a9ae6"
  },
  {
    name: "Priya Sharma", slug: "priya-sharma", country: "India", countryCode: "IN", city: "Mumbai", age: 31,
    bio: "Priya Sharma's intricate miniature-inspired paintings scale traditional Indian techniques to monumental proportions. Her work interrogates gender, mythology, and modernity in contemporary India.",
    style: "Miniature Contemporary", medium: "Gouache", epiScore: 89, currentAvgPrice: 16800,
    priceHistory: generatePriceHistory(4800, 11, 6), projectedPrices: generateProjections(16800, 14),
    gallery: "Chemould Prescott Road", exhibitions: 14, auctionAppearances: 6, pressMentions: 35, socialGrowth: 210,
    tags: ["Miniature", "South Asian", "Feminist"], avatar: "PS", color: "#e65a9a"
  },
  {
    name: "Thabo Molefe", slug: "thabo-molefe", country: "South Africa", countryCode: "ZA", city: "Johannesburg", age: 34,
    bio: "Thabo Molefe's powerful figurative works address post-colonial identity and urban transformation in South Africa. His expressive brushwork and bold color palettes have earned him a place in major continental collections.",
    style: "Figurative", medium: "Oil", epiScore: 88, currentAvgPrice: 19500,
    priceHistory: generatePriceHistory(6000, 9, 7), projectedPrices: generateProjections(19500, 12),
    gallery: "Goodman Gallery", exhibitions: 16, auctionAppearances: 8, pressMentions: 42, socialGrowth: 190,
    tags: ["Figurative", "African Contemporary", "Political"], avatar: "TM", color: "#5ae6a0"
  },
  {
    name: "Min-Ji Park", slug: "min-ji-park", country: "South Korea", countryCode: "KR", city: "Seoul", age: 28,
    bio: "Min-Ji Park creates ethereal, meditative paintings that blend Korean ink wash traditions with contemporary abstraction. Her subtle gradations of tone evoke landscapes of the mind.",
    style: "Abstract", medium: "Ink & Acrylic", epiScore: 87, currentAvgPrice: 15600,
    priceHistory: generatePriceHistory(4200, 13, 8), projectedPrices: generateProjections(15600, 16),
    gallery: "Kukje Gallery", exhibitions: 10, auctionAppearances: 5, pressMentions: 31, socialGrowth: 260,
    tags: ["Abstract", "East Asian", "Meditative"], avatar: "MP", color: "#9a5ae6"
  },
  {
    name: "Isabella Gomez", slug: "isabella-gomez", country: "Colombia", countryCode: "CO", city: "Bogotá", age: 30,
    bio: "Isabella Gomez paints vibrant, surreal landscapes that merge Colombian biodiversity with dreamlike narratives. Her work has become a touchstone for Latin American contemporary art collectors.",
    style: "Surrealism", medium: "Oil", epiScore: 86, currentAvgPrice: 13400,
    priceHistory: generatePriceHistory(3500, 12, 7), projectedPrices: generateProjections(13400, 15),
    gallery: "Galería La Cometa", exhibitions: 11, auctionAppearances: 4, pressMentions: 25, socialGrowth: 310,
    tags: ["Surrealist", "Latin American", "Nature"], avatar: "IG", color: "#e6c05a"
  },
  {
    name: "Yuki Tanaka", slug: "yuki-tanaka", country: "Japan", countryCode: "JP", city: "Tokyo", age: 33,
    bio: "Yuki Tanaka's minimalist yet emotionally charged canvases explore the concept of 'ma' (negative space) in contemporary contexts. Her restrained palette and precise compositions have garnered a devoted following.",
    style: "Minimalist", medium: "Oil", epiScore: 85, currentAvgPrice: 21000,
    priceHistory: generatePriceHistory(7000, 8, 5), projectedPrices: generateProjections(21000, 10),
    gallery: "Tomio Koyama Gallery", exhibitions: 13, auctionAppearances: 7, pressMentions: 38, socialGrowth: 175,
    tags: ["Minimalist", "East Asian", "Contemplative"], avatar: "YT", color: "#5ad4e6"
  },
  {
    name: "Valentina Cruz", slug: "valentina-cruz", country: "Mexico", countryCode: "MX", city: "Mexico City", age: 26,
    bio: "Valentina Cruz creates explosive, color-saturated paintings that draw on Mexican folk art traditions and pop culture. Her energetic compositions are rapidly gaining international recognition.",
    style: "Neo-Folk", medium: "Acrylic", epiScore: 84, currentAvgPrice: 11200,
    priceHistory: generatePriceHistory(2800, 15, 10), projectedPrices: generateProjections(11200, 20),
    gallery: "Kurimanzutto", exhibitions: 7, auctionAppearances: 3, pressMentions: 18, socialGrowth: 450,
    tags: ["Neo-Folk", "Latin American", "Pop"], avatar: "VC", color: "#e65a5a"
  },
  {
    name: "Zara Whitfield", slug: "zara-whitfield", country: "United States", countryCode: "US", city: "New York", age: 35,
    bio: "Zara Whitfield's large-scale abstract expressionist paintings channel raw emotion through gestural mark-making. Her work has been acquired by several major museums and is highly sought after by collectors.",
    style: "Abstract Expressionism", medium: "Oil", epiScore: 83, currentAvgPrice: 28000,
    priceHistory: generatePriceHistory(9000, 7, 6), projectedPrices: generateProjections(28000, 9),
    gallery: "Gagosian", exhibitions: 18, auctionAppearances: 12, pressMentions: 56, socialGrowth: 150,
    tags: ["Abstract", "Expressionist", "Blue Chip"], avatar: "ZW", color: "#5ae65a"
  },
  {
    name: "Ellis Nakamura", slug: "ellis-nakamura", country: "United Kingdom", countryCode: "UK", city: "London", age: 31,
    bio: "Ellis Nakamura's delicate, layered paintings explore memory, migration, and belonging. Combining Japanese and British visual traditions, their work resonates with a global audience.",
    style: "Contemporary", medium: "Mixed Media", epiScore: 82, currentAvgPrice: 17500,
    priceHistory: generatePriceHistory(5200, 10, 7), projectedPrices: generateProjections(17500, 13),
    gallery: "White Cube", exhibitions: 11, auctionAppearances: 5, pressMentions: 33, socialGrowth: 220,
    tags: ["Mixed Media", "Diaspora", "Layered"], avatar: "EN", color: "#c45ae6"
  },
  {
    name: "Mateo Fernandez", slug: "mateo-fernandez", country: "Argentina", countryCode: "AR", city: "Buenos Aires", age: 29,
    bio: "Mateo Fernandez creates dynamic, kinetic-inspired paintings that capture the energy of Buenos Aires street life. His bold compositions and vivid palette have made him one of Latin America's most watched emerging artists.",
    style: "Kinetic Abstraction", medium: "Acrylic", epiScore: 81, currentAvgPrice: 12800,
    priceHistory: generatePriceHistory(3000, 13, 9), projectedPrices: generateProjections(12800, 17),
    gallery: "Ruth Benzacar", exhibitions: 9, auctionAppearances: 3, pressMentions: 21, socialGrowth: 290,
    tags: ["Kinetic", "Latin American", "Urban"], avatar: "MF", color: "#e6a05a"
  },
  {
    name: "Elif Yilmaz", slug: "elif-yilmaz", country: "Turkey", countryCode: "TR", city: "Istanbul", age: 28,
    bio: "Elif Yilmaz weaves together Ottoman calligraphic traditions and contemporary abstraction. Her intricate, meditative works have become a bridge between Eastern and Western art markets.",
    style: "Calligraphic Abstraction", medium: "Ink & Gold Leaf", epiScore: 80, currentAvgPrice: 14500,
    priceHistory: generatePriceHistory(4000, 11, 8), projectedPrices: generateProjections(14500, 14),
    gallery: "Dirimart", exhibitions: 10, auctionAppearances: 4, pressMentions: 26, socialGrowth: 240,
    tags: ["Calligraphic", "Middle Eastern", "Luxury"], avatar: "EY", color: "#5ae6c0"
  },
  {
    name: "Lena Hartmann", slug: "lena-hartmann", country: "Germany", countryCode: "DE", city: "Berlin", age: 32,
    bio: "Lena Hartmann's stark, architectural paintings explore urban decay and renewal in post-industrial landscapes. Her precise, almost photographic technique belies deep emotional undercurrents.",
    style: "Photorealism", medium: "Oil", epiScore: 79, currentAvgPrice: 16200,
    priceHistory: generatePriceHistory(5500, 9, 6), projectedPrices: generateProjections(16200, 11),
    gallery: "Contemporary Fine Arts", exhibitions: 12, auctionAppearances: 6, pressMentions: 29, socialGrowth: 180,
    tags: ["Photorealist", "European", "Urban"], avatar: "LH", color: "#e65ad4"
  },
  {
    name: "Dewi Sari", slug: "dewi-sari", country: "Indonesia", countryCode: "ID", city: "Yogyakarta", age: 27,
    bio: "Dewi Sari's batik-inspired contemporary paintings merge traditional Javanese textile art with bold, modern compositions. Her work is at the forefront of Indonesia's thriving contemporary art scene.",
    style: "Textile Contemporary", medium: "Natural Dyes & Acrylic", epiScore: 78, currentAvgPrice: 9800,
    priceHistory: generatePriceHistory(2200, 14, 9), projectedPrices: generateProjections(9800, 19),
    gallery: "Nadi Gallery", exhibitions: 8, auctionAppearances: 2, pressMentions: 16, socialGrowth: 350,
    tags: ["Textile", "Southeast Asian", "Traditional Fusion"], avatar: "DS", color: "#a0e65a"
  },
  {
    name: "Camille Dubois", slug: "camille-dubois", country: "France", countryCode: "FR", city: "Paris", age: 30,
    bio: "Camille Dubois creates intimate, luminous portraits that capture fleeting emotional states. Her mastery of light and color places her in the tradition of French intimisme while feeling entirely contemporary.",
    style: "Contemporary Portrait", medium: "Oil", epiScore: 77, currentAvgPrice: 18900,
    priceHistory: generatePriceHistory(6500, 8, 5), projectedPrices: generateProjections(18900, 10),
    gallery: "Thaddaeus Ropac", exhibitions: 14, auctionAppearances: 7, pressMentions: 34, socialGrowth: 195,
    tags: ["Portrait", "European", "Intimisme"], avatar: "CD", color: "#5a5ae6"
  },
  {
    name: "Wei Chen", slug: "wei-chen", country: "China", countryCode: "CN", city: "Shanghai", age: 34,
    bio: "Wei Chen's monumental ink paintings reinterpret classical Chinese landscape traditions through a contemporary, almost sci-fi lens. His work has become highly collectible among Asian art enthusiasts.",
    style: "Ink Contemporary", medium: "Ink & Mineral Pigments", epiScore: 76, currentAvgPrice: 24000,
    priceHistory: generatePriceHistory(8000, 7, 6), projectedPrices: generateProjections(24000, 9),
    gallery: "ShanghART", exhibitions: 15, auctionAppearances: 9, pressMentions: 41, socialGrowth: 160,
    tags: ["Ink", "East Asian", "Monumental"], avatar: "WC", color: "#e6705a"
  },
  {
    name: "Rafael Silva", slug: "rafael-silva", country: "Brazil", countryCode: "BR", city: "São Paulo", age: 33,
    bio: "Rafael Silva's vibrant, large-scale paintings celebrate Brazilian culture while addressing urgent social themes. His bold color sense and dynamic compositions have made him a standout in Latin American contemporary art.",
    style: "Neo-Expressionist", medium: "Acrylic", epiScore: 75, currentAvgPrice: 13600,
    priceHistory: generatePriceHistory(4000, 10, 8), projectedPrices: generateProjections(13600, 13),
    gallery: "Galeria Luisa Strina", exhibitions: 12, auctionAppearances: 5, pressMentions: 27, socialGrowth: 230,
    tags: ["Neo-Expressionist", "Latin American", "Social"], avatar: "RS", color: "#5ae6d4"
  },
  {
    name: "Alejandro Vega", slug: "alejandro-vega", country: "Spain", countryCode: "ES", city: "Madrid", age: 31,
    bio: "Alejandro Vega's sculptural paintings blur the line between two and three dimensions. His textured, heavily worked surfaces invite touch and reward close looking.",
    style: "Sculptural Painting", medium: "Mixed Media", epiScore: 74, currentAvgPrice: 11800,
    priceHistory: generatePriceHistory(3500, 11, 7), projectedPrices: generateProjections(11800, 14),
    gallery: "Galería Elba Benítez", exhibitions: 10, auctionAppearances: 4, pressMentions: 22, socialGrowth: 200,
    tags: ["Sculptural", "European", "Textural"], avatar: "AV", color: "#d45ae6"
  },
  {
    name: "Lotte van Dijk", slug: "lotte-van-dijk", country: "Netherlands", countryCode: "NL", city: "Amsterdam", age: 29,
    bio: "Lotte van Dijk's serene, atmospheric paintings capture the quality of Dutch light in the 21st century. Her subtle, layered surfaces evoke both tradition and innovation.",
    style: "Atmospheric Realism", medium: "Oil", epiScore: 73, currentAvgPrice: 14200,
    priceHistory: generatePriceHistory(4500, 9, 6), projectedPrices: generateProjections(14200, 12),
    gallery: "GRIMM", exhibitions: 9, auctionAppearances: 4, pressMentions: 24, socialGrowth: 185,
    tags: ["Atmospheric", "European", "Light"], avatar: "LD", color: "#5ae670"
  },
  {
    name: "Noah Tremblay", slug: "noah-tremblay", country: "Canada", countryCode: "CA", city: "Montreal", age: 28,
    bio: "Noah Tremblay's immersive, large-scale abstractions draw on the vast Canadian landscape. His work uses natural pigments and unconventional materials to create deeply textured surfaces.",
    style: "Landscape Abstraction", medium: "Mixed Media", epiScore: 72, currentAvgPrice: 10500,
    priceHistory: generatePriceHistory(2800, 12, 8), projectedPrices: generateProjections(10500, 15),
    gallery: "Pierre-François Ouellette", exhibitions: 8, auctionAppearances: 3, pressMentions: 17, socialGrowth: 250,
    tags: ["Landscape", "North American", "Material"], avatar: "NT", color: "#e6c05a"
  },
  {
    name: "Indigo Blake", slug: "indigo-blake", country: "Australia", countryCode: "AU", city: "Melbourne", age: 32,
    bio: "Indigo Blake's luminous, color-field paintings are inspired by the Australian outback and its extraordinary light. Her work has a transcendent quality that has attracted collectors worldwide.",
    style: "Color Field", medium: "Acrylic", epiScore: 71, currentAvgPrice: 12400,
    priceHistory: generatePriceHistory(3800, 10, 7), projectedPrices: generateProjections(12400, 13),
    gallery: "Tolarno Galleries", exhibitions: 10, auctionAppearances: 4, pressMentions: 20, socialGrowth: 210,
    tags: ["Color Field", "Oceanian", "Light"], avatar: "IB", color: "#5ac4e6"
  },
  {
    name: "Sofia Rossi", slug: "sofia-rossi", country: "Italy", countryCode: "IT", city: "Milan", age: 35,
    bio: "Sofia Rossi's elegant, restrained paintings draw on Italian Renaissance traditions while embracing contemporary minimalism. Her work is a quiet revolution in painterly technique.",
    style: "Contemporary Classical", medium: "Oil & Tempera", epiScore: 70, currentAvgPrice: 19800,
    priceHistory: generatePriceHistory(7000, 7, 5), projectedPrices: generateProjections(19800, 9),
    gallery: "Galleria Continua", exhibitions: 14, auctionAppearances: 8, pressMentions: 36, socialGrowth: 140,
    tags: ["Classical", "European", "Refined"], avatar: "SR", color: "#e65a70"
  },
  {
    name: "Katarzyna Nowak", slug: "katarzyna-nowak", country: "Poland", countryCode: "PL", city: "Warsaw", age: 30,
    bio: "Katarzyna Nowak's bold, graphic paintings address themes of memory, displacement, and identity in post-Soviet Europe. Her striking visual language has earned her rapid international recognition.",
    style: "Graphic Contemporary", medium: "Acrylic", epiScore: 69, currentAvgPrice: 9600,
    priceHistory: generatePriceHistory(2500, 13, 9), projectedPrices: generateProjections(9600, 16),
    gallery: "Raster Gallery", exhibitions: 9, auctionAppearances: 3, pressMentions: 19, socialGrowth: 270,
    tags: ["Graphic", "Eastern European", "Identity"], avatar: "KN", color: "#705ae6"
  },
  {
    name: "Astrid Lindqvist", slug: "astrid-lindqvist", country: "Sweden", countryCode: "SE", city: "Stockholm", age: 27,
    bio: "Astrid Lindqvist's delicate, nature-inspired abstractions capture the subtle beauty of Scandinavian landscapes. Her muted palette and organic forms create a sense of calm and contemplation.",
    style: "Organic Abstraction", medium: "Watercolor & Ink", epiScore: 68, currentAvgPrice: 8900,
    priceHistory: generatePriceHistory(2000, 14, 8), projectedPrices: generateProjections(8900, 18),
    gallery: "Andréhn-Schiptjenko", exhibitions: 7, auctionAppearances: 2, pressMentions: 15, socialGrowth: 300,
    tags: ["Organic", "Scandinavian", "Nature"], avatar: "AL", color: "#5ae65a"
  },
  {
    name: "Amara Diallo", slug: "amara-diallo", country: "Nigeria", countryCode: "NG", city: "Lagos", age: 26,
    bio: "Amara Diallo's striking mixed-media works combine photography, painting, and textile elements to explore West African femininity and power. Her work is rapidly gaining international attention.",
    style: "Mixed Media", medium: "Mixed Media", epiScore: 88, currentAvgPrice: 11500,
    priceHistory: generatePriceHistory(2500, 15, 10), projectedPrices: generateProjections(11500, 20),
    gallery: "ART X Lagos", exhibitions: 7, auctionAppearances: 2, pressMentions: 18, socialGrowth: 380,
    tags: ["Mixed Media", "African Contemporary", "Feminist"], avatar: "AD", color: "#e6a05a"
  },
  {
    name: "Jin-Ho Kim", slug: "jin-ho-kim", country: "South Korea", countryCode: "KR", city: "Busan", age: 31,
    bio: "Jin-Ho Kim's hyper-detailed, almost hallucinatory paintings explore the intersection of technology and nature in contemporary Korea. His work is both beautiful and unsettling.",
    style: "Hyper-Detail", medium: "Oil & Digital", epiScore: 83, currentAvgPrice: 17200,
    priceHistory: generatePriceHistory(5000, 11, 7), projectedPrices: generateProjections(17200, 14),
    gallery: "Arario Gallery", exhibitions: 11, auctionAppearances: 5, pressMentions: 29, socialGrowth: 225,
    tags: ["Hyper-Detail", "East Asian", "Tech"], avatar: "JK", color: "#5ad4e6"
  },
  {
    name: "Lucia Moreno", slug: "lucia-moreno", country: "Colombia", countryCode: "CO", city: "Medellín", age: 25,
    bio: "Lucia Moreno's vibrant, large-scale murals-turned-canvas works bring the energy of street art into the gallery. Her explosive color sense and dynamic compositions are turning heads globally.",
    style: "Street-Inspired", medium: "Spray Paint & Acrylic", epiScore: 82, currentAvgPrice: 8800,
    priceHistory: generatePriceHistory(1800, 16, 11), projectedPrices: generateProjections(8800, 22),
    gallery: "Galería La Cometa", exhibitions: 6, auctionAppearances: 2, pressMentions: 14, socialGrowth: 480,
    tags: ["Street Art", "Latin American", "Youth"], avatar: "LM", color: "#e65a9a"
  },
  {
    name: "Omar Hassan", slug: "omar-hassan", country: "Egypt", countryCode: "EG", city: "Cairo", age: 33,
    bio: "Omar Hassan's calligraphic abstractions transform Arabic script into pure visual form. His work bridges Islamic art traditions and contemporary abstraction with remarkable elegance.",
    style: "Calligraphic Abstraction", medium: "Ink & Acrylic", epiScore: 81, currentAvgPrice: 13800,
    priceHistory: generatePriceHistory(3800, 12, 8), projectedPrices: generateProjections(13800, 15),
    gallery: "ARTWRKT", exhibitions: 10, auctionAppearances: 4, pressMentions: 23, socialGrowth: 260,
    tags: ["Calligraphic", "Middle Eastern", "Script"], avatar: "OH", color: "#5ae6a0"
  },
  {
    name: "Sven Eriksson", slug: "sven-eriksson", country: "Sweden", countryCode: "SE", city: "Gothenburg", age: 34,
    bio: "Sven Eriksson's monumental, monochromatic paintings explore the sublime in the everyday. His restrained palette and massive scale create an almost spiritual viewing experience.",
    style: "Monumental Minimalism", medium: "Oil", epiScore: 75, currentAvgPrice: 15500,
    priceHistory: generatePriceHistory(5000, 9, 6), projectedPrices: generateProjections(15500, 11),
    gallery: "Bonniers Konsthall", exhibitions: 12, auctionAppearances: 6, pressMentions: 30, socialGrowth: 170,
    tags: ["Minimalist", "Scandinavian", "Monumental"], avatar: "SE", color: "#9a5ae6"
  },
  {
    name: "Fatima Al-Rashid", slug: "fatima-al-rashid", country: "UAE", countryCode: "AE", city: "Dubai", age: 29,
    bio: "Fatima Al-Rashid's shimmering, gold-infused paintings explore themes of wealth, spirituality, and transformation in the Gulf region. Her luxurious surfaces are utterly captivating.",
    style: "Luxury Abstraction", medium: "Gold Leaf & Oil", epiScore: 79, currentAvgPrice: 21000,
    priceHistory: generatePriceHistory(6000, 10, 7), projectedPrices: generateProjections(21000, 13),
    gallery: "Green Art Gallery", exhibitions: 9, auctionAppearances: 4, pressMentions: 25, socialGrowth: 290,
    tags: ["Luxury", "Middle Eastern", "Gold"], avatar: "FR", color: "#e6c05a"
  },
  {
    name: "Kofi Mensah", slug: "kofi-mensah", country: "Ghana", countryCode: "GH", city: "Kumasi", age: 30,
    bio: "Kofi Mensah's powerful sculptural paintings incorporate found objects and traditional Ghanaian materials. His work addresses themes of trade, migration, and cultural exchange.",
    style: "Sculptural Painting", medium: "Mixed Media", epiScore: 85, currentAvgPrice: 10800,
    priceHistory: generatePriceHistory(2800, 13, 9), projectedPrices: generateProjections(10800, 17),
    gallery: "Gallery 1957", exhibitions: 8, auctionAppearances: 3, pressMentions: 20, socialGrowth: 310,
    tags: ["Sculptural", "African Contemporary", "Trade"], avatar: "KM", color: "#5a9ae6"
  },
  {
    name: "Anh Nguyen", slug: "anh-nguyen", country: "Vietnam", countryCode: "VN", city: "Ho Chi Minh City", age: 28,
    bio: "Anh Nguyen's delicate silk paintings reimagine Vietnamese lacquer traditions for a contemporary audience. Her ethereal, translucent works have become highly sought after by Asian collectors.",
    style: "Silk Contemporary", medium: "Silk & Lacquer", epiScore: 77, currentAvgPrice: 9200,
    priceHistory: generatePriceHistory(2200, 13, 8), projectedPrices: generateProjections(9200, 16),
    gallery: "Galerie Quynh", exhibitions: 7, auctionAppearances: 2, pressMentions: 15, socialGrowth: 280,
    tags: ["Silk", "Southeast Asian", "Traditional"], avatar: "AN", color: "#e65a5a"
  },
  {
    name: "Diego Morales", slug: "diego-morales", country: "Argentina", countryCode: "AR", city: "Córdoba", age: 26,
    bio: "Diego Morales creates explosive, large-scale abstractions that channel the energy of Argentine tango and football culture. His dynamic, rhythmic compositions are impossible to ignore.",
    style: "Rhythmic Abstraction", medium: "Acrylic", epiScore: 78, currentAvgPrice: 8400,
    priceHistory: generatePriceHistory(2000, 14, 10), projectedPrices: generateProjections(8400, 19),
    gallery: "Barro", exhibitions: 6, auctionAppearances: 2, pressMentions: 13, socialGrowth: 350,
    tags: ["Rhythmic", "Latin American", "Energy"], avatar: "DM", color: "#5ae6d4"
  },
  {
    name: "Nina Petrova", slug: "nina-petrova", country: "Russia", countryCode: "RU", city: "Moscow", age: 32,
    bio: "Nina Petrova's haunting, atmospheric paintings explore the psychological landscape of post-Soviet Russia. Her muted palette and ghostly figures create an unforgettable visual experience.",
    style: "Psychological Realism", medium: "Oil", epiScore: 74, currentAvgPrice: 14800,
    priceHistory: generatePriceHistory(4500, 10, 7), projectedPrices: generateProjections(14800, 12),
    gallery: "Gary Tatintsian Gallery", exhibitions: 11, auctionAppearances: 5, pressMentions: 28, socialGrowth: 190,
    tags: ["Psychological", "Eastern European", "Atmospheric"], avatar: "NP", color: "#d45ae6"
  },
  {
    name: "Tariq Al-Farsi", slug: "tariq-al-farsi", country: "Oman", countryCode: "OM", city: "Muscat", age: 35,
    bio: "Tariq Al-Farsi's luminous, geometric abstractions draw on Islamic architectural traditions and the light of the Arabian Peninsula. His precise, meditative works are deeply contemplative.",
    style: "Geometric Abstraction", medium: "Acrylic & Gold", epiScore: 76, currentAvgPrice: 16200,
    priceHistory: generatePriceHistory(5000, 9, 6), projectedPrices: generateProjections(16200, 11),
    gallery: "Bait Muzna Gallery", exhibitions: 9, auctionAppearances: 3, pressMentions: 19, socialGrowth: 210,
    tags: ["Geometric", "Middle Eastern", "Architectural"], avatar: "TF", color: "#5ae670"
  },
  {
    name: "Chiamaka Nwosu", slug: "chiamaka-nwosu", country: "Nigeria", countryCode: "NG", city: "Abuja", age: 24,
    bio: "Chiamaka Nwosu is the youngest artist on our radar. Her bold, colorful abstractions explore Nigerian youth culture and digital identity. Despite her age, she has already exhibited internationally.",
    style: "Digital Age Abstraction", medium: "Acrylic & Digital", epiScore: 86, currentAvgPrice: 7200,
    priceHistory: generatePriceHistory(1200, 18, 12), projectedPrices: generateProjections(7200, 25),
    gallery: "Rele Gallery", exhibitions: 5, auctionAppearances: 1, pressMentions: 12, socialGrowth: 520,
    tags: ["Digital", "African Contemporary", "Youth"], avatar: "CN", color: "#e65ad4"
  },
  {
    name: "Ravi Patel", slug: "ravi-patel", country: "India", countryCode: "IN", city: "Delhi", age: 30,
    bio: "Ravi Patel's politically charged paintings address urbanization, inequality, and identity in contemporary India. His raw, expressive style has made him one of the most talked-about artists in South Asia.",
    style: "Political Expressionism", medium: "Oil & Charcoal", epiScore: 84, currentAvgPrice: 12600,
    priceHistory: generatePriceHistory(3200, 13, 9), projectedPrices: generateProjections(12600, 16),
    gallery: "Nature Morte", exhibitions: 10, auctionAppearances: 4, pressMentions: 26, socialGrowth: 240,
    tags: ["Political", "South Asian", "Urban"], avatar: "RP", color: "#a0e65a"
  },
  {
    name: "Yara Said", slug: "yara-said", country: "Lebanon", countryCode: "LB", city: "Beirut", age: 29,
    bio: "Yara Said's poignant, layered paintings explore memory, loss, and resilience in post-war Lebanon. Her work incorporates found photographs and text, creating deeply personal yet universal narratives.",
    style: "Narrative Contemporary", medium: "Mixed Media", epiScore: 80, currentAvgPrice: 11000,
    priceHistory: generatePriceHistory(3000, 12, 8), projectedPrices: generateProjections(11000, 15),
    gallery: "Saleh Barakat Gallery", exhibitions: 8, auctionAppearances: 3, pressMentions: 21, socialGrowth: 270,
    tags: ["Narrative", "Middle Eastern", "Memory"], avatar: "YS", color: "#5ac4e6"
  },
  {
    name: "Liam O'Brien", slug: "liam-obrien", country: "Ireland", countryCode: "IE", city: "Dublin", age: 33,
    bio: "Liam O'Brien's moody, atmospheric landscapes capture the wild beauty of the Irish coast. His expressive brushwork and deep connection to place have earned him a devoted following.",
    style: "Expressive Landscape", medium: "Oil", epiScore: 72, currentAvgPrice: 13200,
    priceHistory: generatePriceHistory(4200, 9, 6), projectedPrices: generateProjections(13200, 11),
    gallery: "Kerlin Gallery", exhibitions: 10, auctionAppearances: 5, pressMentions: 24, socialGrowth: 180,
    tags: ["Landscape", "European", "Expressive"], avatar: "LO", color: "#e6705a"
  },
  {
    name: "Sakura Ito", slug: "sakura-ito", country: "Japan", countryCode: "JP", city: "Kyoto", age: 26,
    bio: "Sakura Ito's ethereal, nature-inspired installations-on-canvas blend traditional Japanese aesthetics with contemporary environmental concerns. Her delicate, immersive works are deeply moving.",
    style: "Environmental Contemporary", medium: "Natural Pigments", epiScore: 81, currentAvgPrice: 10400,
    priceHistory: generatePriceHistory(2600, 14, 9), projectedPrices: generateProjections(10400, 18),
    gallery: "ShugoArts", exhibitions: 7, auctionAppearances: 2, pressMentions: 16, socialGrowth: 330,
    tags: ["Environmental", "East Asian", "Nature"], avatar: "SI", color: "#5ae65a"
  },
  {
    name: "Carlos Mendez", slug: "carlos-mendez", country: "Mexico", countryCode: "MX", city: "Guadalajara", age: 31,
    bio: "Carlos Mendez's vibrant, large-scale works celebrate Mexican popular culture while addressing contemporary social issues. His bold, graphic style is instantly recognizable and highly collectible.",
    style: "Pop Contemporary", medium: "Acrylic", epiScore: 79, currentAvgPrice: 12000,
    priceHistory: generatePriceHistory(3500, 11, 7), projectedPrices: generateProjections(12000, 14),
    gallery: "OMR", exhibitions: 10, auctionAppearances: 4, pressMentions: 23, socialGrowth: 250,
    tags: ["Pop", "Latin American", "Graphic"], avatar: "CM", color: "#e6a05a"
  },
  {
    name: "Aisha Bello", slug: "aisha-bello", country: "Nigeria", countryCode: "NG", city: "Lagos", age: 28,
    bio: "Aisha Bello's striking portraits explore the complexity of African womanhood in the 21st century. Her bold use of color and pattern creates images of extraordinary power and beauty.",
    style: "Contemporary Portrait", medium: "Oil", epiScore: 83, currentAvgPrice: 13500,
    priceHistory: generatePriceHistory(3500, 13, 8), projectedPrices: generateProjections(13500, 16),
    gallery: "Rele Gallery", exhibitions: 9, auctionAppearances: 3, pressMentions: 22, socialGrowth: 300,
    tags: ["Portrait", "African Contemporary", "Feminist"], avatar: "AB", color: "#5a5ae6"
  },
  {
    name: "Hans Mueller", slug: "hans-mueller", country: "Germany", countryCode: "DE", city: "Munich", age: 36,
    bio: "Hans Mueller's precise, almost clinical paintings explore the relationship between nature and technology. His hyper-detailed botanical studies are infused with digital aesthetics.",
    style: "Bio-Digital", medium: "Oil & Digital", epiScore: 73, currentAvgPrice: 17800,
    priceHistory: generatePriceHistory(5800, 8, 5), projectedPrices: generateProjections(17800, 10),
    gallery: "Galerie Thomas", exhibitions: 12, auctionAppearances: 7, pressMentions: 31, socialGrowth: 155,
    tags: ["Bio-Digital", "European", "Botanical"], avatar: "HM", color: "#5ae6c0"
  },
  {
    name: "Mei-Lin Zhou", slug: "mei-lin-zhou", country: "China", countryCode: "CN", city: "Beijing", age: 27,
    bio: "Mei-Lin Zhou's delicate, conceptual paintings explore the tension between tradition and modernity in contemporary China. Her subtle, layered works reward patient, close looking.",
    style: "Conceptual Contemporary", medium: "Ink & Oil", epiScore: 78, currentAvgPrice: 14600,
    priceHistory: generatePriceHistory(4000, 11, 7), projectedPrices: generateProjections(14600, 14),
    gallery: "Pace Gallery", exhibitions: 8, auctionAppearances: 4, pressMentions: 24, socialGrowth: 220,
    tags: ["Conceptual", "East Asian", "Layered"], avatar: "MZ", color: "#e65a9a"
  },
  {
    name: "Idris Keita", slug: "idris-keita", country: "Senegal", countryCode: "SN", city: "Dakar", age: 32,
    bio: "Idris Keita's powerful, large-scale paintings draw on Senegalese visual traditions and Pan-African politics. His bold, graphic style and commanding presence have made him a major voice in African contemporary art.",
    style: "Pan-African Contemporary", medium: "Oil & Acrylic", epiScore: 82, currentAvgPrice: 15800,
    priceHistory: generatePriceHistory(4200, 12, 8), projectedPrices: generateProjections(15800, 15),
    gallery: "Atiss Gallery", exhibitions: 11, auctionAppearances: 5, pressMentions: 27, socialGrowth: 260,
    tags: ["Pan-African", "West African", "Political"], avatar: "IK", color: "#5ae6a0"
  },
  {
    name: "Elena Popescu", slug: "elena-popescu", country: "Romania", countryCode: "RO", city: "Bucharest", age: 29,
    bio: "Elena Popescu's haunting, atmospheric paintings explore the psychological landscape of post-communist Eastern Europe. Her muted palette and ghostly imagery create an unforgettable mood.",
    style: "Psychological Abstraction", medium: "Oil", epiScore: 75, currentAvgPrice: 9400,
    priceHistory: generatePriceHistory(2400, 13, 8), projectedPrices: generateProjections(9400, 16),
    gallery: "Plan B", exhibitions: 8, auctionAppearances: 3, pressMentions: 17, socialGrowth: 240,
    tags: ["Psychological", "Eastern European", "Atmospheric"], avatar: "EP", color: "#9a5ae6"
  },
  {
    name: "Kenji Watanabe", slug: "kenji-watanabe", country: "Japan", countryCode: "JP", city: "Osaka", age: 35,
    bio: "Kenji Watanabe's explosive, large-scale abstractions channel the energy of Japanese street culture and anime aesthetics. His neon-bright palette and dynamic compositions are electrifying.",
    style: "Neo-Pop", medium: "Acrylic & Spray", epiScore: 77, currentAvgPrice: 18200,
    priceHistory: generatePriceHistory(5500, 10, 7), projectedPrices: generateProjections(18200, 12),
    gallery: "Yoshii Gallery", exhibitions: 12, auctionAppearances: 6, pressMentions: 32, socialGrowth: 200,
    tags: ["Neo-Pop", "East Asian", "Street"], avatar: "KW", color: "#e6c05a"
  },
  {
    name: "Zuri Mwangi", slug: "zuri-mwangi", country: "Kenya", countryCode: "KE", city: "Nairobi", age: 26,
    bio: "Zuri Mwangi's vibrant, pattern-rich paintings celebrate East African textile traditions while addressing contemporary urban life. Her joyful, colorful work is rapidly gaining international recognition.",
    style: "Pattern Contemporary", medium: "Acrylic", epiScore: 80, currentAvgPrice: 8600,
    priceHistory: generatePriceHistory(2000, 15, 10), projectedPrices: generateProjections(8600, 20),
    gallery: "Circle Art Gallery", exhibitions: 6, auctionAppearances: 2, pressMentions: 14, socialGrowth: 370,
    tags: ["Pattern", "East African", "Textile"], avatar: "ZM", color: "#5ad4e6"
  },
  {
    name: "Pavel Volkov", slug: "pavel-volkov", country: "Russia", countryCode: "RU", city: "St. Petersburg", age: 34,
    bio: "Pavel Volkov's monumental, history-inspired paintings reinterpret Russian artistic traditions for a contemporary audience. His powerful, large-scale works command attention in any space.",
    style: "Neo-Historical", medium: "Oil", epiScore: 71, currentAvgPrice: 16800,
    priceHistory: generatePriceHistory(5200, 8, 6), projectedPrices: generateProjections(16800, 10),
    gallery: "Erarta", exhibitions: 11, auctionAppearances: 6, pressMentions: 28, socialGrowth: 165,
    tags: ["Historical", "Eastern European", "Monumental"], avatar: "PV", color: "#e65a5a"
  },
  {
    name: "Amara Obi", slug: "amara-obi", country: "Nigeria", countryCode: "NG", city: "Enugu", age: 31,
    bio: "Amara Obi's intricate, bead-inspired paintings explore Igbo cultural traditions and contemporary African identity. Her meticulous, labor-intensive process results in works of extraordinary beauty.",
    style: "Bead Contemporary", medium: "Acrylic & Beads", epiScore: 79, currentAvgPrice: 11200,
    priceHistory: generatePriceHistory(3000, 12, 8), projectedPrices: generateProjections(11200, 15),
    gallery: "Nike Art Gallery", exhibitions: 8, auctionAppearances: 3, pressMentions: 18, socialGrowth: 250,
    tags: ["Bead", "African Contemporary", "Cultural"], avatar: "AO2", color: "#5ae6d4"
  },
  {
    name: "Tomoko Hayashi", slug: "tomoko-hayashi", country: "Japan", countryCode: "JP", city: "Tokyo", age: 28,
    bio: "Tomoko Hayashi's delicate, nature-inspired works on paper explore the Japanese concept of 'wabi-sabi' — the beauty of imperfection. Her subtle, understated works are deeply meditative.",
    style: "Wabi-Sabi Contemporary", medium: "Ink & Watercolor", epiScore: 76, currentAvgPrice: 9800,
    priceHistory: generatePriceHistory(2500, 12, 7), projectedPrices: generateProjections(9800, 15),
    gallery: "Wada Fine Arts", exhibitions: 7, auctionAppearances: 3, pressMentions: 16, socialGrowth: 230,
    tags: ["Wabi-Sabi", "East Asian", "Paper"], avatar: "TH", color: "#d45ae6"
  },
  {
    name: "Sebastian Koch", slug: "sebastian-koch", country: "Germany", countryCode: "DE", city: "Hamburg", age: 30,
    bio: "Sebastian Koch's bold, graphic paintings explore the visual language of advertising and consumer culture. His large-scale works are both visually striking and intellectually engaging.",
    style: "Pop Conceptual", medium: "Acrylic & Screen Print", epiScore: 74, currentAvgPrice: 13400,
    priceHistory: generatePriceHistory(4000, 10, 7), projectedPrices: generateProjections(13400, 13),
    gallery: "Galerie Gebr. Lehmann", exhibitions: 9, auctionAppearances: 4, pressMentions: 21, socialGrowth: 195,
    tags: ["Pop", "European", "Conceptual"], avatar: "SK", color: "#5ae670"
  },
  {
    name: "Nadia Ferroukhi", slug: "nadia-ferroukhi", country: "Morocco", countryCode: "MA", city: "Marrakech", age: 29,
    bio: "Nadia Ferroukhi's luminous, color-saturated paintings draw on Moroccan decorative traditions and the light of North Africa. Her joyful, pattern-rich works are a celebration of color and culture.",
    style: "Decorative Contemporary", medium: "Acrylic & Gold", epiScore: 77, currentAvgPrice: 10600,
    priceHistory: generatePriceHistory(2800, 13, 8), projectedPrices: generateProjections(10600, 16),
    gallery: "Comptoir des Mines", exhibitions: 8, auctionAppearances: 3, pressMentions: 17, socialGrowth: 280,
    tags: ["Decorative", "North African", "Color"], avatar: "NF", color: "#e6a05a"
  },
];

// Helper functions
export function getArtistsByCountry(countryCode: string): Artist[] {
  return artists
    .filter(a => a.countryCode === countryCode)
    .sort((a, b) => b.epiScore - a.epiScore);
}

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find(a => a.slug === slug);
}

export function getCountryByCode(code: string): Country | undefined {
  return countries.find(c => c.code === code);
}

export function getTopArtists(limit: number = 6): Artist[] {
  return [...artists].sort((a, b) => b.epiScore - a.epiScore).slice(0, limit);
}

export function searchArtists(query: string, filters?: { country?: string; style?: string; medium?: string; minEPI?: number; maxEPI?: number }): Artist[] {
  let results = [...artists];
  if (query) {
    const q = query.toLowerCase();
    results = results.filter(a =>
      a.name.toLowerCase().includes(q) ||
      a.country.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q) ||
      a.style.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q))
    );
  }
  if (filters?.country) results = results.filter(a => a.countryCode === filters.country);
  if (filters?.style) results = results.filter(a => a.style === filters.style);
  if (filters?.medium) results = results.filter(a => a.medium === filters.medium);
  if (filters?.minEPI !== undefined) results = results.filter(a => a.epiScore >= filters.minEPI!);
  if (filters?.maxEPI !== undefined) results = results.filter(a => a.epiScore <= filters.maxEPI!);
  return results.sort((a, b) => b.epiScore - a.epiScore);
}

export const allStyles = [...new Set(artists.map(a => a.style))].sort();
export const allMediums = [...new Set(artists.map(a => a.medium))].sort();
