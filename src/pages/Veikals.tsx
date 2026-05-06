import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import JsonLd, { breadcrumbSchema, organizationSchema } from "@/components/JsonLd";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import HoverLift from "@/components/animations/HoverLift";
import { useCartStore } from "@/store/cartStore";
import { DEMO_PRODUCTS } from "@/lib/products";
import type { Product, ProductCategory } from "@/types";

const CATEGORIES: Array<{ id: ProductCategory; label: string }> = [
  { id: "visi", label: "Visas kategorijas" },
  { id: "sensorie", label: "Sensoro prasmju" },
  { id: "koka", label: "Koka rotaļlietas" },
  { id: "logika", label: "Loģikas" },
  { id: "konstruktori", label: "Konstruktori" },
  { id: "radosums", label: "Radošums" },
  { id: "kustiba", label: "Kustība" },
];

const AGE_GROUPS = [
  { label: "Visi vecumi", min: 0, max: 99 },
  { label: "0–2 gadi", min: 0, max: 2 },
  { label: "2–4 gadi", min: 2, max: 4 },
  { label: "4–6 gadi", min: 4, max: 6 },
  { label: "6–12 gadi", min: 6, max: 12 },
  { label: "12+ gadi", min: 12, max: 99 },
];

const BADGE_COLORS: Record<string, string> = {
  JAUNS: "bg-teal text-white",
  IZPĀRDOŠANA: "bg-[#E8813A] text-[#1A0A00]",
  POPULĀRS: "bg-navy text-white",
};

function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    openCart();
  };

  return (
    <HoverLift>
      <article className="product-card bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
        <Link to={`/veikals/${product.slug}`} aria-label={`Skatīt ${product.name_lv}`}>
          <div className="relative" style={{ aspectRatio: "1/1" }}>
            <img
              src={product.images[0]}
              alt={product.name_lv}
              width={300}
              height={300}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="w-full h-full object-cover"
            />
            {/* Badge */}
            {product.badge && (
              <span
                className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${BADGE_COLORS[product.badge]}`}
              >
                {product.badge}
              </span>
            )}
            {/* Out of stock overlay */}
            {!product.in_stock && (
              <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                <span className="text-sm font-bold text-navy/60 bg-white px-3 py-1 rounded-full">
                  Nav pieejams
                </span>
              </div>
            )}
          </div>
        </Link>

        <div className="p-4">
          <Link to={`/veikals/${product.slug}`}>
            <h2 className="font-heading font-700 text-navy text-sm leading-snug mb-2 line-clamp-2 hover:text-teal transition-colors">
              {product.name_lv}
            </h2>
          </Link>

          {/* Age */}
          {product.age_min !== undefined && (
            <p className="text-xs text-navy/40 mb-3">
              {product.age_min === 0
                ? `Līdz ${product.age_max} gadiem`
                : `${product.age_min}–${product.age_max === 99 ? "99" : product.age_max} gadi`}
            </p>
          )}

          {/* Price row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-navy text-base">
                {product.price.toFixed(2)}€
              </span>
              {product.price_before && (
                <span className="text-xs text-navy/40 line-through">
                  {product.price_before.toFixed(2)}€
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.in_stock}
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-navy text-white hover:bg-teal transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label={`Pievienot grozam: ${product.name_lv}`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </button>
          </div>

          {/* Stock indicator */}
          {product.in_stock && product.stock_count !== undefined && product.stock_count <= 5 && (
            <p className="text-xs text-[#E8813A] font-semibold mt-2">
              Pieejami tikai {product.stock_count} gab.!
            </p>
          )}
        </div>
      </article>
    </HoverLift>
  );
}

export default function Veikals() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("visi");
  const [activeAgeGroup, setActiveAgeGroup] = useState(0);
  const [sortBy, setSortBy] = useState("newest");
  const [maxPrice, setMaxPrice] = useState(100);

  const filtered = useMemo(() => {
    let products = [...DEMO_PRODUCTS];

    if (activeCategory !== "visi") {
      products = products.filter((p) => p.category === activeCategory);
    }

    const ageGroup = AGE_GROUPS[activeAgeGroup];
    if (ageGroup.min > 0 || ageGroup.max < 99) {
      products = products.filter(
        (p) =>
          p.age_min !== undefined &&
          p.age_max !== undefined &&
          p.age_min <= ageGroup.max &&
          p.age_max >= ageGroup.min
      );
    }

    products = products.filter((p) => p.price <= maxPrice);

    if (sortBy === "price_asc") products.sort((a, b) => a.price - b.price);
    else if (sortBy === "price_desc") products.sort((a, b) => b.price - a.price);

    return products;
  }, [activeCategory, activeAgeGroup, sortBy, maxPrice]);

  return (
    <>
      <SEO
        title="Attīstošās rotaļlietas bērniem"
        description="Plašs klāsts izglītojošu un attīstošu rotaļlietu bērniem 0–12 gadiem. Beleduc, koka rotaļlietas, sensorie produkti. Bezmaksas piegāde virs 100€."
        path="/veikals"
        lastModified="2026-05-05"
      />
      <JsonLd data={organizationSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Sākums", url: "https://8kajis.lv/" },
          { name: "Veikals", url: "https://8kajis.lv/veikals" },
        ])}
      />

      <Header theme="light" />

      <main>
        {/* Hero strip */}
        <div className="bg-navy pt-24 pb-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav aria-label="Navigācijas ceļš" className="mb-4">
              <ol className="flex items-center gap-2 text-xs text-white/50">
                <li>
                  <Link to="/" className="hover:text-white/80 transition-colors">
                    Sākums
                  </Link>
                </li>
                <li aria-hidden="true" className="text-white/30">›</li>
                <li className="text-white/80 font-semibold" aria-current="page">
                  Veikals
                </li>
              </ol>
            </nav>

            <h1 className="font-heading font-extrabold text-white text-3xl md:text-4xl">
              Attīstošās rotaļlietas
            </h1>
            <p className="text-white/60 mt-2 text-sm">
              Apskatīti {filtered.length} produkti
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex gap-8">
            {/* ===== SIDEBAR ===== */}
            <aside
              className="hidden lg:block w-64 flex-shrink-0"
              aria-label="Produktu filtri"
            >
              {/* Categories */}
              <div className="mb-8">
                <h2 className="font-heading font-700 text-navy text-sm uppercase tracking-widest mb-4">
                  Kategorijas
                </h2>
                <ul className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <li key={cat.id}>
                      <button
                        onClick={() => setActiveCategory(cat.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                          activeCategory === cat.id
                            ? "bg-navy text-white font-semibold"
                            : "text-navy/70 hover:bg-gray-50 hover:text-navy"
                        }`}
                        aria-current={activeCategory === cat.id ? "true" : undefined}
                      >
                        {cat.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Age group */}
              <div className="mb-8">
                <h2 className="font-heading font-700 text-navy text-sm uppercase tracking-widest mb-4">
                  Vecuma grupa
                </h2>
                <ul className="space-y-1">
                  {AGE_GROUPS.map((ag, i) => (
                    <li key={ag.label}>
                      <button
                        onClick={() => setActiveAgeGroup(i)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                          activeAgeGroup === i
                            ? "bg-teal text-white font-semibold"
                            : "text-navy/70 hover:bg-gray-50 hover:text-navy"
                        }`}
                        aria-current={activeAgeGroup === i ? "true" : undefined}
                      >
                        {ag.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price range */}
              <div className="mb-8">
                <h2 className="font-heading font-700 text-navy text-sm uppercase tracking-widest mb-4">
                  Maks. cena: <span className="text-teal">{maxPrice}€</span>
                </h2>
                <input
                  type="range"
                  min={5}
                  max={200}
                  step={5}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-teal"
                  aria-label="Maksimālā cena"
                  aria-valuemin={5}
                  aria-valuemax={200}
                  aria-valuenow={maxPrice}
                />
                <div className="flex justify-between text-xs text-navy/40 mt-1">
                  <span>5€</span>
                  <span>200€</span>
                </div>
              </div>
            </aside>

            {/* ===== PRODUCTS GRID ===== */}
            <div className="flex-1 min-w-0">
              {/* Sort bar */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-navy/60">
                  {filtered.length} produkti
                </p>
                <div className="flex items-center gap-2">
                  <label htmlFor="sort-select" className="text-sm text-navy/60 sr-only">
                    Kārtot pēc
                  </label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-navy focus:outline-none focus:ring-2 focus:ring-teal"
                  >
                    <option value="newest">Jaunākie</option>
                    <option value="price_asc">Cena: zemāka → augstāka</option>
                    <option value="price_desc">Cena: augstāka → zemāka</option>
                  </select>
                </div>
              </div>

              {/* Mobile category scroll */}
              <div className="lg:hidden flex gap-2 overflow-x-auto pb-3 mb-6 -mx-4 px-4">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex-shrink-0 text-xs font-semibold px-4 py-2 rounded-full transition-all ${
                      activeCategory === cat.id
                        ? "bg-navy text-white"
                        : "bg-gray-100 text-navy/70 hover:bg-gray-200"
                    }`}
                    aria-current={activeCategory === cat.id ? "true" : undefined}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <p className="font-heading font-700 text-xl text-navy mb-2">
                    Nav atrasts neviens produkts
                  </p>
                  <p className="text-navy/50 text-sm">
                    Mēģini mainīt filtrus
                  </p>
                  <button
                    onClick={() => {
                      setActiveCategory("visi");
                      setActiveAgeGroup(0);
                      setMaxPrice(200);
                    }}
                    className="mt-4 px-6 py-2.5 bg-navy text-white text-sm font-semibold rounded-xl hover:bg-teal transition-colors"
                  >
                    Notīrīt filtrus
                  </button>
                </div>
              ) : (
                <ul
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                  aria-label="Produktu saraksts"
                  role="list"
                >
                  {filtered.map((product, i) => (
                    <li key={product.id}>
                      <FadeInOnScroll delay={i * 0.05}>
                        <ProductCard product={product} />
                      </FadeInOnScroll>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
