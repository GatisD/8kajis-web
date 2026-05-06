// SEO komponente — izmanto vite-react-ssg Head (saderīgs ar SSG)
// Fallback uz react-helmet-async CSR modē
import { Head } from "vite-react-ssg";
import type { Locale } from "@/types";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  lastModified?: string;
  image?: string;
  type?: "website" | "product" | "article";
  noindex?: boolean;
  locale?: Locale;
}

const SITE_NAME = "8kajis.lv";
const BASE_URL = "https://8kajis.lv";
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;
const DEFAULT_DESCRIPTION =
  "Attīstošas rotaļlietas bērniem un sensorā telpa Bimini Ķekavā, Latvijā. Beleduc partneris. Bezmaksas piegāde virs 100€.";

const LOCALE_MAP: Record<Locale, string> = {
  lv: "lv_LV",
  en: "en_US",
  ru: "ru_RU",
  lt: "lt_LT",
  ee: "et_EE",
};

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  lastModified,
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
  locale = "lv",
}: SEOProps) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} — Attīstošas rotaļlietas & Sensorā telpa Bimini`;
  const canonical = `${BASE_URL}${path}`;
  const ogLocale = LOCALE_MAP[locale];

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={ogLocale} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Hreflang */}
      <link rel="alternate" hrefLang="lv" href={`${BASE_URL}${path}`} />
      <link rel="alternate" hrefLang="en" href={`${BASE_URL}/en${path}`} />
      <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}${path}`} />

      {/* Freshness (AEO) */}
      {lastModified && (
        <>
          <meta name="article:modified_time" content={lastModified} />
          <meta property="og:updated_time" content={lastModified} />
        </>
      )}
    </Head>
  );
}
