import navyPinstripe from "@/assets/fabric-navy-pinstripe.jpg";
import ivoryCotton from "@/assets/fabric-ivory-cotton.jpg";
import greyCheck from "@/assets/fabric-grey-check.jpg";
import blueKurta from "@/assets/fabric-blue-kurta.jpg";
import charcoalCoat from "@/assets/fabric-charcoal-coat.jpg";
import blueStripe from "@/assets/fabric-blue-stripe.jpg";
import maroonSilk from "@/assets/fabric-maroon-silk.jpg";
import beigeTrouser from "@/assets/fabric-beige-trouser.jpg";
import heroFabrics from "@/assets/hero-fabrics.jpg";

export { heroFabrics };

export type Category =
  | "suiting"
  | "shirting"
  | "trouser"
  | "kurta"
  | "coat"
  | "gifting";

export const CATEGORIES: { slug: Category; label: string; blurb: string }[] = [
  { slug: "suiting", label: "Suiting", blurb: "Two-piece and three-piece suit lengths" },
  { slug: "shirting", label: "Shirting", blurb: "Crisp cottons for everyday and formal shirts" },
  { slug: "trouser", label: "Trouser / Pant", blurb: "Twill and poly-blends that hold a crease" },
  { slug: "kurta", label: "Kurta", blurb: "Breathable weaves for daily and festive kurtas" },
  { slug: "coat", label: "Coat", blurb: "Heavier woollen fabrics for bandhgalas and coats" },
  { slug: "gifting", label: "Gifting", blurb: "Fabric gift sets for weddings and occasions" },
];

export interface Fabric {
  id: string;
  name: string;
  categories: Category[];
  pricePerMetre: number; // ₹
  availableMetres: number;
  image: string;
  short: string;
  description: string;
  colour: string;
  colourHex: string;
  pattern: "solid" | "striped" | "checked" | "printed" | "textured";
  fibre: string;
  suitableFor: string[];
  season: "all-season" | "summer" | "winter";
  // Optional specs — shown only when present (never invented)
  width?: string;
  care?: string;
  minMetres: number;
  stepMetres: number;
  /** "enough for" guidance */
  guide: { metres: number; garment: string }[];
}

// NOTE: Catalogue content below is placeholder demonstration data — real
// products, prices and photos to be supplied by the shop owner.
export const FABRICS: Fabric[] = [
  {
    id: "navy-pinstripe-suiting",
    name: "Navy Pinstripe Suiting",
    categories: ["suiting"],
    pricePerMetre: 1450,
    availableMetres: 24,
    image: navyPinstripe,
    short: "Navy wool-blend with a fine grey pinstripe — the classic boardroom suit.",
    description:
      "A deep navy suiting with a fine, evenly spaced grey pinstripe. Smooth hand-feel with enough body to hold a sharp shoulder and a clean trouser crease. A dependable choice for a first bespoke suit.",
    colour: "Navy",
    colourHex: "#1f2a4a",
    pattern: "striped",
    fibre: "Wool blend",
    suitableFor: ["2-piece suit", "3-piece suit", "Trousers"],
    season: "all-season",
    care: "Dry clean only",
    minMetres: 1,
    stepMetres: 0.5,
    guide: [
      { metres: 3, garment: "1 suit (jacket + trousers)" },
      { metres: 1.5, garment: "1 pair of trousers" },
    ],
  },
  {
    id: "ivory-self-stripe-shirting",
    name: "Ivory Self-Stripe Shirting",
    categories: ["shirting", "kurta"],
    pricePerMetre: 480,
    availableMetres: 40,
    image: ivoryCotton,
    short: "Crisp ivory cotton with a subtle self-stripe — an everyday formal staple.",
    description:
      "A soft ivory shirting with a woven self-stripe that catches the light without shouting. Breathable and cool against the skin; irons to a crisp finish.",
    colour: "Ivory",
    colourHex: "#f2eee6",
    pattern: "striped",
    fibre: "Cotton",
    suitableFor: ["Formal shirt", "Light kurta"],
    season: "summer",
    width: '58"',
    care: "Machine wash cold, warm iron",
    minMetres: 1,
    stepMetres: 0.5,
    guide: [
      { metres: 2.25, garment: "1 full-sleeve shirt" },
      { metres: 2.5, garment: "1 kurta" },
    ],
  },
  {
    id: "grey-windowpane-suiting",
    name: "Grey Windowpane Suiting",
    categories: ["suiting"],
    pricePerMetre: 1650,
    availableMetres: 18,
    image: greyCheck,
    short: "Light grey with a charcoal windowpane check — quiet confidence.",
    description:
      "A light grey suiting crossed with a clean charcoal windowpane check. The pattern reads solid from a distance and rewards a closer look. Excellent for daytime events and office wear alike.",
    colour: "Grey",
    colourHex: "#b9bcc0",
    pattern: "checked",
    fibre: "Wool blend",
    suitableFor: ["2-piece suit", "Blazer"],
    season: "all-season",
    care: "Dry clean only",
    minMetres: 1,
    stepMetres: 0.5,
    guide: [
      { metres: 3, garment: "1 suit (jacket + trousers)" },
      { metres: 2, garment: "1 blazer" },
    ],
  },
  {
    id: "powder-blue-kurta-cotton",
    name: "Powder Blue Kurta Cotton",
    categories: ["kurta", "shirting"],
    pricePerMetre: 420,
    availableMetres: 32,
    image: blueKurta,
    short: "Soft powder-blue cotton, light and airy — made for summer kurtas.",
    description:
      "A feather-light powder-blue cotton with a soft, slightly slubbed texture. Drapes easily and stays comfortable through long summer days.",
    colour: "Powder Blue",
    colourHex: "#b7d7e8",
    pattern: "textured",
    fibre: "Cotton",
    suitableFor: ["Kurta", "Casual shirt"],
    season: "summer",
    width: '44"',
    care: "Machine wash cold",
    minMetres: 1,
    stepMetres: 0.5,
    guide: [{ metres: 2.5, garment: "1 kurta" }],
  },
  {
    id: "charcoal-brushed-coat",
    name: "Charcoal Brushed Coat Wool",
    categories: ["coat"],
    pricePerMetre: 2200,
    availableMetres: 12,
    image: charcoalCoat,
    short: "Deep charcoal woollen with a brushed matte finish — winter's workhorse.",
    description:
      "A dense, brushed charcoal woollen with a soft matte face and real warmth. Cuts beautifully into overcoats, bandhgalas and structured winter jackets.",
    colour: "Charcoal",
    colourHex: "#2b2d33",
    pattern: "solid",
    fibre: "Wool",
    suitableFor: ["Overcoat", "Bandhgala", "Winter jacket"],
    season: "winter",
    care: "Dry clean only",
    minMetres: 1,
    stepMetres: 0.5,
    guide: [
      { metres: 3.5, garment: "1 overcoat" },
      { metres: 2, garment: "1 bandhgala jacket" },
    ],
  },
  {
    id: "royal-stripe-shirting",
    name: "Royal Stripe Shirting",
    categories: ["shirting"],
    pricePerMetre: 540,
    availableMetres: 28,
    image: blueStripe,
    short: "White with a confident royal-blue stripe — the Chandni Chowk classic.",
    description:
      "A crisp white shirting woven with bold royal-blue stripes. Fresh, unmistakable, and endlessly wearable — the kind of stripe that has sold by the thaan for decades.",
    colour: "White / Blue",
    colourHex: "#3f5fb8",
    pattern: "striped",
    fibre: "Cotton",
    suitableFor: ["Formal shirt", "Casual shirt"],
    season: "all-season",
    width: '58"',
    care: "Machine wash cold, warm iron",
    minMetres: 1,
    stepMetres: 0.5,
    guide: [{ metres: 2.25, garment: "1 full-sleeve shirt" }],
  },
  {
    id: "maroon-silk-gift",
    name: "Maroon Silk-Blend (Gifting)",
    categories: ["gifting", "kurta"],
    pricePerMetre: 980,
    availableMetres: 20,
    image: maroonSilk,
    short: "Lustrous maroon silk-blend — our most-gifted festive fabric.",
    description:
      "A deep maroon silk-blend with a soft, even sheen that reads rich without being flashy. A long-time favourite for wedding and Diwali gifting.",
    colour: "Maroon",
    colourHex: "#6e1e2e",
    pattern: "solid",
    fibre: "Silk blend",
    suitableFor: ["Festive kurta", "Gift set"],
    season: "all-season",
    care: "Dry clean recommended",
    minMetres: 1,
    stepMetres: 0.5,
    guide: [{ metres: 2.5, garment: "1 festive kurta" }],
  },
  {
    id: "beige-twill-trouser",
    name: "Beige Twill Trouser Fabric",
    categories: ["trouser"],
    pricePerMetre: 650,
    availableMetres: 36,
    image: beigeTrouser,
    short: "Warm beige twill with a smooth drape — trousers that keep their crease.",
    description:
      "A warm beige twill with a fine diagonal weave and a smooth, substantial drape. Holds a crease through a full working day and pairs with almost any shirt.",
    colour: "Beige",
    colourHex: "#c8ab85",
    pattern: "textured",
    fibre: "Poly-viscose",
    suitableFor: ["Trousers", "Chinos"],
    season: "all-season",
    care: "Machine wash cold",
    minMetres: 1,
    stepMetres: 0.5,
    guide: [{ metres: 1.5, garment: "1 pair of trousers" }],
  },
];

export const inr = (n: number) =>
  "₹" + new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

export const getFabric = (id: string) => FABRICS.find((f) => f.id === id);
