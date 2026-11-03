export type Product = {
  slug: string;
  title: string;
  collection: string;
  medium: string;
  year: number;
  price: number; // cents
  compareAt?: number | null;
  rating: number;
  reviewCount: number;
  description: string;
  story: string;
  palette: string[];
  images: string[];
  sizes: string[];
  stock: number;
  featured?: boolean;
  bestseller?: boolean;
  isNew?: boolean;
  soldOut?: boolean;
  edition: string;
};

export type Review = {
  id?: number;
  productSlug: string;
  author: string;
  location: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
  createdAt?: string;
};

export const COLLECTIONS = [
  {
    slug: "chroma-drift",
    name: "Eclipse Guardian",
    tagline: "Bold colour, unapologetic movement",
    description:
      "Painted in a single sitting, each canvas in Eclipse Guardian is a record of momentum — colour poured, dragged and argued with until it found its own rhythm.",
    image:
      "https://images.pexels.com/photos/30925664/pexels-photo-30925664.jpeg?auto=compress&cs=tinysrgb&w=1200",
    count: 4,
  },
  {
    slug: "terra-memoria",
    name: "Ascension Through Light",
    tagline: "Earth, memory and the places we carry",
    description:
      "Layered ochres, rusts and river-stone greys. Ascension Through Light maps the landscapes AVP grew up walking — rendered from memory, not from photographs.",
    image:
      "https://images.pexels.com/photos/30561863/pexels-photo-30561863.jpeg?auto=compress&cs=tinysrgb&w=1200",
    count: 3,
  },
  {
    slug: "gilded-hours",
    name: "Crimson Dominion",
    tagline: "Light, caught and kept",
    description:
      "Hand-laid gold leaf over deep pigment. These are the hours at the end of the day — when the studio light turns and everything briefly glows.",
    image:
      "https://images.pexels.com/photos/30843200/pexels-photo-30843200.jpeg?auto=compress&cs=tinysrgb&w=1200",
    count: 3,
  },
  {
    slug: "muse",
    name: "Celestial Archives",
    tagline: "The figure, in motion",
    description:
      "Portraits painted from life in AVP's the digital realm studio — friends, strangers, and the quiet theatre of a body deciding where to go next.",
    image:
      "https://images.pexels.com/photos/953695/pexels-photo-953695.jpeg?auto=compress&cs=tinysrgb&w=1200",
    count: 2,
  },
];

const img = (id: number, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const INTERIOR = [
  img(15122569, 1200),
  img(20801045, 1200),
  img(36777863, 1200),
  img(6962745, 1200),
];

export const FALLBACK_PRODUCTS: Product[] = [
  {
    slug: "chroma-drift-no-7",
    title: "Eclipse Guardian No. 7",
    collection: "Eclipse Guardian",
    medium: "Acrylic & oil on linen canvas",
    year: 2025,
    price: 185000,
    compareAt: null,
    rating: 4.9,
    reviewCount: 47,
    description:
      "A full-throttle canvas — vermilion, cobalt and acid yellow colliding in long, dragged strokes. No. 7 was the piece that stopped the scroll: 2.1M views on Instagram and a waitlist of 400 collectors.",
    story:
      "Painted over three days in AVP's the digital realm studio, Eclipse Guardian No. 7 began as a study in restraint and ended as a surrender. The final gesture — a single sweep of cadmium yellow across the lower third — was added in the last twenty minutes, on instinct.",
    palette: ["#C0392B", "#1B3A6B", "#E9C46A", "#F4F1EA"],
    images: [img(30925664), img(30727825), INTERIOR[0]],
    sizes: ["30 × 40 cm — Print", "60 × 80 cm — Print", "100 × 130 cm — Original"],
    stock: 1,
    featured: true,
    bestseller: true,
    edition: "Original — 1 of 1",
  },
  {
    slug: "sun-fracture",
    title: "Solar Ascension",
    collection: "Eclipse Guardian",
    medium: "Acrylic on cotton canvas",
    year: 2025,
    price: 240000,
    compareAt: 285000,
    rating: 4.8,
    reviewCount: 38,
    description:
      "Sunlight broken into shards. Solar Ascension layers translucent glazes over opaque impasto so the surface shifts as you move past it — matte in the morning, almost luminous by afternoon.",
    story:
      "AVP painted Solar Ascension facing a west-facing window during a heatwave. The canvas absorbed the room's light and gave it back, fractured. It is the work collectors most often photograph at golden hour.",
    palette: ["#E76F51", "#F4A261", "#2A9D8F", "#264653"],
    images: [img(30727825), img(13382071), INTERIOR[1]],
    sizes: ["30 × 40 cm — Print", "60 × 80 cm — Print", "120 × 150 cm — Original"],
    stock: 1,
    featured: true,
    edition: "Original — 1 of 1",
  },
  {
    slug: "velvet-riot",
    title: "Crimson Omen",
    collection: "Eclipse Guardian",
    medium: "Oil & cold wax on linen",
    year: 2024,
    price: 165000,
    compareAt: null,
    rating: 4.7,
    reviewCount: 29,
    description:
      "A riot, upholstered. Crimson Omen pairs the softness of cold wax with violent colour — plum, marigold and a green that should not work and somehow does.",
    story:
      "The title came from a comment on AVP's process video: 'it's a riot but make it velvet.' She kept it. The painting was finished while listening to the same song on loop for six hours.",
    palette: ["#6D28D9", "#F59E0B", "#065F46", "#FDF6E3"],
    images: [img(30843199), img(30784971), INTERIOR[2]],
    sizes: ["30 × 40 cm — Print", "60 × 80 cm — Print", "90 × 120 cm — Original"],
    stock: 2,
    bestseller: true,
    edition: "Original — 1 of 1",
  },
  {
    slug: "terra-memoria-i",
    title: "Ascension Through Light I",
    collection: "Ascension Through Light",
    medium: "Oil, pigment & sand on linen",
    year: 2025,
    price: 290000,
    compareAt: null,
    rating: 5.0,
    reviewCount: 22,
    description:
      "The first of the Ascension Through Light triptych. River sand from the Tagus is worked into the paint, so the surface holds the actual ground it remembers.",
    story:
      "AVP collected sand from the riverbank where she spent childhood summers. Ascension Through Light I is less a landscape than a reliquary — a place, pressed flat and kept.",
    palette: ["#8B5E3C", "#D6C7A8", "#5B4A3F", "#A26769"],
    images: [img(30561863), img(11535990), INTERIOR[3]],
    sizes: ["50 × 70 cm — Print", "80 × 100 cm — Print", "140 × 180 cm — Original"],
    stock: 1,
    featured: true,
    edition: "Original — 1 of 1 · Triptych I of III",
  },
  {
    slug: "ember-field",
    title: "Ember of the Void",
    collection: "Ascension Through Light",
    medium: "Acrylic & charcoal on canvas",
    year: 2024,
    price: 148000,
    compareAt: null,
    rating: 4.8,
    reviewCount: 31,
    description:
      "A field after fire, before rain. Ember of the Void moves from burnt umber to a single, stubborn blue — the colour of the sky that finally arrived.",
    story:
      "Painted the week after wildfires outside the digital realm, Ember of the Void is AVP's most quiet painting. Viewers often stand in front of it for a long time. She considers that the review.",
    palette: ["#7C2D12", "#C2410C", "#1E3A5F", "#E7E5E4"],
    images: [img(3587488), img(37210736), INTERIOR[0]],
    sizes: ["30 × 40 cm — Print", "60 × 80 cm — Print", "100 × 130 cm — Original"],
    stock: 1,
    edition: "Original — 1 of 1",
  },
  {
    slug: "gilded-hour",
    title: "Crimson Eclipse",
    collection: "Crimson Dominion",
    medium: "Oil, gold leaf & resin on panel",
    year: 2025,
    price: 320000,
    compareAt: null,
    rating: 4.9,
    reviewCount: 19,
    description:
      "Midnight blue under 24k gold leaf. Crimson Eclipse catches light the way water does — in fragments, never the same way twice.",
    story:
      "The gold leaf was laid by hand over three evenings, one sheet at a time. AVP filmed the process for her followers; the final reveal video has been saved 89,000 times.",
    palette: ["#1E3A5F", "#C99A3C", "#0F172A", "#F5E6C8"],
    images: [img(30843200), img(21031387), INTERIOR[1]],
    sizes: ["40 × 50 cm — Print", "70 × 90 cm — Print", "110 × 140 cm — Original"],
    stock: 1,
    featured: true,
    isNew: true,
    edition: "Original — 1 of 1",
  },
  {
    slug: "aurelia",
    title: "Celestial Flame",
    collection: "Crimson Dominion",
    medium: "Acrylic, gold leaf on linen",
    year: 2025,
    price: 275000,
    compareAt: 310000,
    rating: 4.8,
    reviewCount: 26,
    description:
      "Celestial Flame — 'golden' — is a slow wave of gold over deep ochre. It reads as abstract from across the room and as pure texture up close.",
    story:
      "Named for AVP's grandmother, who taught her to gild picture frames in a small workshop in Porto. Every gold-leaf painting since carries her hands in it.",
    palette: ["#B45309", "#F59E0B", "#78350F", "#FEF3C7"],
    images: [img(21031387), img(34034144), INTERIOR[2]],
    sizes: ["30 × 40 cm — Print", "60 × 80 cm — Print", "100 × 130 cm — Original"],
    stock: 1,
    isNew: true,
    edition: "Original — 1 of 1",
  },
  {
    slug: "muse-in-motion",
    title: "Celestial Archives in Motion",
    collection: "Celestial Archives",
    medium: "Oil on linen canvas",
    year: 2025,
    price: 195000,
    compareAt: null,
    rating: 4.9,
    reviewCount: 41,
    description:
      "A figure caught mid-turn, painted from a single sitting. The blur is not a technique — it is the moment, kept.",
    story:
      "The sitter was a dancer AVP met at a the digital realm gallery opening. She asked to paint her without posing. The result is the most requested print in the shop.",
    palette: ["#1D4ED8", "#111827", "#F8FAFC", "#F59E0B"],
    images: [img(953695), img(19351182), INTERIOR[3]],
    sizes: ["30 × 40 cm — Print", "60 × 80 cm — Print", "90 × 120 cm — Original"],
    stock: 1,
    featured: true,
    bestseller: true,
    edition: "Original — 1 of 1",
  },
  {
    slug: "noire-muse",
    title: "Noire Celestial Archives",
    collection: "Celestial Archives",
    medium: "Charcoal & oil on paper, framed",
    year: 2024,
    price: 215000,
    compareAt: null,
    rating: 4.7,
    reviewCount: 17,
    description:
      "Black and white, and entirely about tone. Noire Celestial Archives is drawn in charcoal and finished in oil — a portrait that holds its gaze.",
    story:
      "AVP made Noire Celestial Archives as a study for a larger commission. The commission fell through; the study became the painting people ask about most at studio visits.",
    palette: ["#111111", "#374151", "#E5E7EB", "#F9FAFB"],
    images: [img(19351176), img(19432555), INTERIOR[0]],
    sizes: ["30 × 40 cm — Print", "50 × 70 cm — Print", "70 × 100 cm — Original"],
    stock: 1,
    soldOut: true,
    edition: "Original — 1 of 1 · Sold",
  },
  {
    slug: "solar-bloom",
    title: "Light Beyond Shadow",
    collection: "Eclipse Guardian",
    medium: "Acrylic on cotton canvas",
    year: 2025,
    price: 129000,
    compareAt: null,
    rating: 4.6,
    reviewCount: 24,
    description:
      "The happiest painting in the shop. Light Beyond Shadow is pure, unguarded colour — a flower that exists only in pigment.",
    story:
      "Painted on the first warm day of spring, Light Beyond Shadow was livestreamed to AVP's followers as it happened. Three hundred people watched it bloom in real time.",
    palette: ["#F59E0B", "#EC4899", "#8B5CF6", "#FEF9C3"],
    images: [img(30784971), img(30713978), INTERIOR[1]],
    sizes: ["30 × 40 cm — Print", "60 × 80 cm — Print", "90 × 120 cm — Original"],
    stock: 3,
    isNew: true,
    edition: "Original — 1 of 1",
  },
  {
    slug: "frost-and-bloom",
    title: "Frozen Ascension",
    collection: "Ascension Through Light",
    medium: "Acrylic & ink on linen",
    year: 2024,
    price: 98000,
    compareAt: 120000,
    rating: 4.7,
    reviewCount: 33,
    description:
      "Pastel frost over a warm underpainting. Frozen Ascension is the quietest piece in the collection — and the one most often bought as a first original.",
    story:
      "A winter painting made in summer, from memory. AVP says it is about the moment spring is still a rumour and the light is already changing its mind.",
    palette: ["#A5B4FC", "#FBCFE8", "#FDF2F8", "#C7D2FE"],
    images: [img(24349103), img(30486228), INTERIOR[2]],
    sizes: ["30 × 40 cm — Print", "50 × 70 cm — Print", "80 × 100 cm — Original"],
    stock: 2,
    bestseller: true,
    edition: "Original — 1 of 1",
  },
  {
    slug: "ochre-study",
    title: "The First Sigil",
    collection: "Ascension Through Light",
    medium: "Oil & pigment on board",
    year: 2023,
    price: 112000,
    compareAt: null,
    rating: 4.8,
    reviewCount: 15,
    description:
      "A study in one colour, pushed as far as it will go. The First Sigil is raw pigment, oil and patience — nothing else.",
    story:
      "AVP's earliest Ascension Through Light piece, painted before the collection had a name. It hung in her studio for a year before she could bear to sell it.",
    palette: ["#92400E", "#B45309", "#D97706", "#FEF3C7"],
    images: [img(11535990), img(25820432), INTERIOR[3]],
    sizes: ["30 × 40 cm — Print", "50 × 70 cm — Print", "70 × 90 cm — Original"],
    stock: 1,
    edition: "Original — 1 of 1",
  },
];

export const SEED_REVIEWS: Review[] = [];

export const formatPrice = (cents: number) =>
  new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", maximumFractionDigits: cents % 100 === 0 ? 0 : 2 }).format(cents / 100);

export const STUDIO_IMAGE = img(8381961, 1200);
export const STUDIO_IMAGE_2 = img(20511244, 1200);
export const STUDIO_IMAGE_3 = img(20451088, 1200);
