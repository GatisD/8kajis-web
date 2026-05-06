import type { Product, ShippingOption } from "@/types";

// Demo produkti — aizstāt ar Supabase API ražošanā
export const DEMO_PRODUCTS: Product[] = [
  {
    id: "p001",
    slug: "beleduc-skaranas-spele",
    name: "Beleduc Šķirošanas spēle",
    name_lv: "Beleduc Šķirošanas spēle",
    description:
      "Krāsains koka šķirošanas centrs ar dažādām formām un izmēriem. Veicina roku–acu koordināciju, krāsu un formas atpazīšanu. Izgatavots no ilgtspējīgas koksnes.",
    price: 34.99,
    currency: "EUR",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&h=600&fit=crop",
    ],
    category: "sensorie",
    age_min: 1,
    age_max: 4,
    in_stock: true,
    stock_count: 12,
    badge: "POPULĀRS",
    brand: "Beleduc",
    sku: "BEL-SS-001",
  },
  {
    id: "p002",
    slug: "koka-puzzles-dzivnieki",
    name: "Koka puzle Dzīvnieki",
    name_lv: "Koka puzle Dzīvnieki",
    description:
      "24 gabalu koka puzle ar krāsainiem meža dzīvniekiem. Attīsta pacietību, loģisko domāšanu un smalkās motorikas prasmes.",
    price: 19.99,
    price_before: 24.99,
    currency: "EUR",
    images: [
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&h=600&fit=crop",
    ],
    category: "koka",
    age_min: 2,
    age_max: 6,
    in_stock: true,
    stock_count: 8,
    badge: "IZPĀRDOŠANA",
    brand: "8kajis",
    sku: "KAJ-PZ-002",
  },
  {
    id: "p003",
    slug: "sensoro-bumbinu-komplekts",
    name: "Sensoro bumbiņu komplekts",
    name_lv: "Sensoro bumbiņu komplekts",
    description:
      "6 bumbiņas ar dažādām faktūrām sensoru attīstībai. Ideāls gan bērniem, gan Snoezelen terapijas telpām. Mazgājams materiāls.",
    price: 28.50,
    currency: "EUR",
    images: [
      "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=600&h=600&fit=crop",
    ],
    category: "sensorie",
    age_min: 0,
    age_max: 99,
    in_stock: true,
    stock_count: 25,
    badge: "JAUNS",
    brand: "8kajis",
    sku: "KAJ-SB-003",
  },
  {
    id: "p004",
    slug: "konstruktors-lielais",
    name: "Lielais konstruktors 100 gab.",
    name_lv: "Lielais konstruktors 100 gab.",
    description:
      "100 gabalu konstruktors ar dažāda izmēra un formas detaļām. Veicina radošumu, telpisko domāšanu un roku motorikas attīstību.",
    price: 45.00,
    currency: "EUR",
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=600&fit=crop",
    ],
    category: "konstruktori",
    age_min: 3,
    age_max: 10,
    in_stock: true,
    stock_count: 6,
    brand: "Beleduc",
    sku: "BEL-KN-004",
  },
  {
    id: "p005",
    slug: "maigi-kubi-mazulim",
    name: "Mīkstie skaņas kubi mazulim",
    name_lv: "Mīkstie skaņas kubi mazulim",
    description:
      "6 mīksti auduma kubi ar atšķirīgām skaņām katrā — zvans, krakšķis, čokurošanās. Drošs 0+ vecumā.",
    price: 16.99,
    currency: "EUR",
    images: [
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&h=600&fit=crop",
    ],
    category: "sensorie",
    age_min: 0,
    age_max: 2,
    in_stock: true,
    stock_count: 15,
    brand: "8kajis",
    sku: "KAJ-KB-005",
  },
  {
    id: "p006",
    slug: "radosas-mozaika-5-gadi",
    name: "Radošā mozaīka 5+ gadi",
    name_lv: "Radošā mozaīka 5+ gadi",
    description:
      "Krāsainu sešstūru mozaīka 200 gabalu komplektā. Attīsta krāsu sajūtu, radošumu un smalkās motorikas prasmes.",
    price: 22.00,
    currency: "EUR",
    images: [
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&h=600&fit=crop",
    ],
    category: "radosums",
    age_min: 5,
    age_max: 99,
    in_stock: false,
    stock_count: 0,
    brand: "Beleduc",
    sku: "BEL-MZ-006",
  },
];

export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: "lv_pasta",
    name: "LV Pasts",
    price: 2.99,
    estimated_days: "3–5 darba dienas",
    free_above: 100,
  },
  {
    id: "omniva",
    name: "Omniva pakomāts",
    price: 2.49,
    estimated_days: "2–4 darba dienas",
    free_above: 100,
  },
  {
    id: "dpd",
    name: "DPD kurjers",
    price: 3.49,
    estimated_days: "1–3 darba dienas",
    free_above: 100,
  },
  {
    id: "pickup_kekava",
    name: "Pašizņemšana Ķekavā",
    price: 0,
    estimated_days: "Pēc vienošanās",
  },
];

export const FREE_SHIPPING_THRESHOLD = 100;

export function getShippingCost(
  method: ShippingOption["id"],
  subtotal: number
): number {
  const option = SHIPPING_OPTIONS.find((o) => o.id === method);
  if (!option) return 0;
  if (option.free_above && subtotal >= option.free_above) return 0;
  return option.price;
}
