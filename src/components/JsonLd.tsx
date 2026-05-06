// ============================================================
// JsonLd — Structured data schemas
// Industry: e-commerce + local-business hybrid
// ============================================================

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ========== Schema factories ==========

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://8kajis.lv/#organization",
  name: "8kajis.lv",
  url: "https://8kajis.lv",
  logo: {
    "@type": "ImageObject",
    url: "https://8kajis.lv/logo.png",
    width: 200,
    height: 60,
  },
  sameAs: [
    "https://www.facebook.com/8kajis",
    "https://www.instagram.com/8kajis",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+37120009028",
    contactType: "customer service",
    availableLanguage: ["lv", "en", "ru"],
  },
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Store"],
  "@id": "https://8kajis.lv/#business",
  name: "8kajis.lv",
  description:
    "Attīstošas rotaļlietas bērniem un sensorā telpa Bimini Ķekavā, Latvijā.",
  url: "https://8kajis.lv",
  telephone: "+37120009028",
  email: "info@8kajis.lv",
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Nākotnes iela 2",
    addressLocality: "Ķekava",
    postalCode: "LV-2123",
    addressCountry: "LV",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 56.8297,
    longitude: 24.2255,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/8kajis",
    "https://www.instagram.com/8kajis",
  ],
  hasMap: "https://www.google.com/maps/search/?api=1&query=Nākotnes+iela+2+Ķekava",
};

export function productSchema(product: {
  name: string;
  description: string;
  image: string;
  price: number;
  priceBefore?: number;
  sku?: string;
  inStock: boolean;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: "8kajis.lv",
    },
    offers: {
      "@type": "Offer",
      url: product.url,
      priceCurrency: "EUR",
      price: product.price.toFixed(2),
      priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "8kajis.lv",
      },
    },
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Vai ir bezmaksas piegāde?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Jā — pasūtījumiem virs 100 EUR piegāde Latvijā ir bezmaksas. Piedāvājam LV Pasts, Omniva pakomātus un DPD kurjeru.",
      },
    },
    {
      "@type": "Question",
      name: "Kas ir Snoezelen metodoloģija?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Snoezelen ir 30+ gadus sena multisensorā terapijas metode, ko izmanto sensoro traucējumu, autisma un neirodiversitātes kontekstā. Bimini sensorā telpa Ķekavā ir veidota pēc šīs metodes principiem.",
      },
    },
    {
      "@type": "Question",
      name: "Kādas vecuma grupas jūs apkalpojat?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mūsu veikalā ir rotaļlietas bērniem no 0 mēnešiem līdz 12 gadiem. Sensorā telpa Bimini ir piemērota visiem vecumiem — no mazuļiem līdz pieaugušajiem.",
      },
    },
    {
      "@type": "Question",
      name: "Vai var pasūtīt Bimini aprīkojumu savai iestādei?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Jā — piedāvājam pilnu sensorās telpas iekārtošanu bērnudārziem, skolām un rehabilitācijas centriem. Sazinieties ar mums pa tālruni +371 20009028 vai e-pastu info@8kajis.lv.",
      },
    },
    {
      "@type": "Question",
      name: "Kādas maksāšanas metodes tiek pieņemtas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pieņemam Visa un Mastercard kartes (caur Stripe), Swedbank, SEB, Citadele banku saites un PayPal. Visas transakcijas ir šifrētas ar SSL.",
      },
    },
  ],
};

export const sensoryServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Sensorā telpa Bimini",
  description:
    "Snoezelen metodoloģijā balstīta sensorā telpa un B2B aprīkojuma risinājumi bērnudārziem, skolām un rehabilitācijas centriem.",
  provider: {
    "@type": "LocalBusiness",
    name: "8kajis.lv",
    url: "https://8kajis.lv",
  },
  areaServed: {
    "@type": "Country",
    name: "Latvia",
  },
  serviceType: "Sensory Room Equipment and Setup",
};
