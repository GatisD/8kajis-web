import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import JsonLd, { productSchema, breadcrumbSchema } from "@/components/JsonLd";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import HoverLift from "@/components/animations/HoverLift";
import { useCartStore } from "@/store/cartStore";
import { DEMO_PRODUCTS } from "@/lib/products";

const BADGE_COLORS: Record<string, string> = {
  JAUNS: "bg-teal text-white",
  IZPĀRDOŠANA: "bg-[#E8813A] text-[#1A0A00]",
  POPULĀRS: "bg-navy text-white",
};

const VAT_RATE = 0.21;
const STAR_RATING = 4.6;
const REVIEW_COUNT = 23;

export default function Produkts() {
  const { slug } = useParams<{ slug: string }>();
  const product = DEMO_PRODUCTS.find((p) => p.slug === slug);

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");
  const [wishlist, setWishlist] = useState(false);

  if (!product) {
    return <Navigate to="/veikals" replace />;
  }

  const priceWithVat = product.price * (1 + VAT_RATE);
  const similar = DEMO_PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, undefined, quantity);
    openCart();
  };

  return (
    <>
      <SEO
        title={`${product.name_lv} — Attīstošā rotaļlieta`}
        description={`${product.name_lv}. ${product.description.slice(0, 120)}... Bezmaksas piegāde virs 100€. Beleduc partneris.`}
        path={`/veikals/${product.slug}`}
        type="product"
        image={product.images[0]}
        lastModified="2026-05-05"
      />
      <JsonLd
        data={productSchema({
          name: product.name_lv,
          description: product.description,
          image: product.images[0],
          price: product.price,
          priceBefore: product.price_before,
          sku: product.sku,
          inStock: product.in_stock,
          url: `https://8kajis.lv/veikals/${product.slug}`,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Sākums", url: "https://8kajis.lv/" },
          { name: "Veikals", url: "https://8kajis.lv/veikals" },
          { name: product.name_lv, url: `https://8kajis.lv/veikals/${product.slug}` },
        ])}
      />

      <Header theme="light" />

      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav aria-label="Navigācijas ceļš">
            <ol className="flex items-center gap-2 text-xs text-navy/50">
              <li>
                <Link to="/" className="hover:text-navy transition-colors">Sākums</Link>
              </li>
              <li aria-hidden="true" className="text-navy/30">›</li>
              <li>
                <Link to="/veikals" className="hover:text-navy transition-colors">Veikals</Link>
              </li>
              <li aria-hidden="true" className="text-navy/30">›</li>
              <li className="text-navy font-semibold truncate max-w-[200px]" aria-current="page">
                {product.name_lv}
              </li>
            </ol>
          </nav>
        </div>

        {/* Product grid */}
        <section
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
          aria-labelledby="product-title"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Gallery */}
            <div>
              <div
                className="relative rounded-2xl overflow-hidden bg-gray-50"
                style={{ aspectRatio: "1/1" }}
              >
                <img
                  src={product.images[activeImage]}
                  alt={product.name_lv}
                  width={600}
                  height={600}
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <span
                    className={`absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full ${BADGE_COLORS[product.badge]}`}
                  >
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnail strip */}
              {product.images.length > 1 && (
                <div
                  className="flex gap-3 mt-4"
                  role="list"
                  aria-label="Produkta attēlu galerija"
                >
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImage === i ? "border-navy" : "border-transparent hover:border-gray-300"
                      }`}
                      role="listitem"
                      aria-label={`Attēls ${i + 1}`}
                      aria-pressed={activeImage === i}
                    >
                      <img
                        src={img}
                        alt={`${product.name_lv} — attēls ${i + 1}`}
                        width={80}
                        height={80}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product info */}
            <div>
              <h1
                id="product-title"
                className="font-heading font-extrabold text-navy text-2xl md:text-3xl leading-snug mb-3"
              >
                {product.name_lv}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4" aria-label={`Vērtējums: ${STAR_RATING} no 5`}>
                <div className="flex gap-0.5" aria-hidden="true">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill={star <= Math.floor(STAR_RATING) ? "#E8813A" : star - 0.5 <= STAR_RATING ? "#E8813A" : "#E5E7EB"}
                      stroke="none"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-semibold text-navy">{STAR_RATING}</span>
                <span className="text-sm text-navy/50">({REVIEW_COUNT} atsauksmes)</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-extrabold text-navy text-3xl">
                    {priceWithVat.toFixed(2)}€
                  </span>
                  {product.price_before && (
                    <span className="text-navy/40 text-lg line-through">
                      {(product.price_before * (1 + VAT_RATE)).toFixed(2)}€
                    </span>
                  )}
                </div>
                <p className="text-xs text-navy/40 mt-1">Cena ietver PVN 21%</p>
              </div>

              {/* Stock */}
              {product.in_stock ? (
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-2 h-2 rounded-full bg-teal" aria-hidden="true" />
                  <span className="text-sm font-semibold text-teal">
                    {product.stock_count !== undefined && product.stock_count <= 5
                      ? `Pieejami tikai ${product.stock_count} gab.!`
                      : "Pieejams noliktavā"}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-2 h-2 rounded-full bg-gray-400" aria-hidden="true" />
                  <span className="text-sm font-semibold text-gray-500">Nav pieejams</span>
                </div>
              )}

              {/* SKU */}
              {product.sku && (
                <p className="text-xs text-navy/40 mb-6">SKU: {product.sku}</p>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <label htmlFor="qty-input" className="text-sm font-semibold text-navy">
                  Daudzums:
                </label>
                <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white transition-colors font-bold text-navy"
                    aria-label="Samazināt daudzumu"
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <span
                    id="qty-input"
                    className="w-10 text-center font-bold text-navy"
                    role="spinbutton"
                    aria-valuenow={quantity}
                    aria-valuemin={1}
                    aria-label="Daudzums"
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white transition-colors font-bold text-navy"
                    aria-label="Palielināt daudzumu"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to cart */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.in_stock}
                  className="w-full py-4 rounded-2xl font-bold text-base transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
                  style={{ background: "#1B2B5E", color: "white" }}
                  aria-busy={false}
                >
                  PIEVIENOT GROZAM
                </button>

                <button
                  onClick={() => setWishlist(!wishlist)}
                  className={`w-full py-3.5 rounded-2xl font-semibold text-sm transition-all border-2 flex items-center justify-center gap-2 ${
                    wishlist
                      ? "border-[#E8813A] text-[#E8813A]"
                      : "border-gray-200 text-navy/60 hover:border-navy hover:text-navy"
                  }`}
                  aria-pressed={wishlist}
                  aria-label={wishlist ? "Noņemt no vēlmju saraksta" : "Pievienot vēlmju sarakstam"}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={wishlist ? "#E8813A" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  {wishlist ? "Pievienots vēlmju sarakstam" : "Saglabāt vēlmju sarakstā"}
                </button>
              </div>

              {/* Trust badges */}
              <div className="mt-6 pt-5 border-t border-gray-100 grid grid-cols-3 gap-3">
                {[
                  { icon: "🔒", text: "Droša apmaksa" },
                  { icon: "🚀", text: "Ātra piegāde" },
                  { icon: "↩️", text: "14 dienu atgriešana" },
                ].map((b) => (
                  <div key={b.text} className="text-center">
                    <span className="text-lg block" aria-hidden="true">{b.icon}</span>
                    <span className="text-xs text-navy/50 font-semibold leading-tight block mt-1">{b.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div
            role="tablist"
            aria-label="Produkta informācija"
            className="flex gap-0 border-b border-gray-200 mb-8"
          >
            {(["description", "specs", "reviews"] as const).map((tab) => {
              const labels = {
                description: "Apraksts",
                specs: "Tehniskie dati",
                reviews: `Atsauksmes (${REVIEW_COUNT})`,
              };
              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={activeTab === tab}
                  aria-controls={`tab-panel-${tab}`}
                  id={`tab-${tab}`}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-sm font-semibold transition-all border-b-2 -mb-px ${
                    activeTab === tab
                      ? "text-navy border-navy"
                      : "text-navy/50 border-transparent hover:text-navy/80"
                  }`}
                >
                  {labels[tab]}
                </button>
              );
            })}
          </div>

          <div
            id={`tab-panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
          >
            {activeTab === "description" && (
              <FadeInOnScroll>
                <div className="max-w-2xl">
                  <p className="text-navy/80 leading-relaxed">{product.description}</p>
                  {product.age_min !== undefined && (
                    <p className="mt-4 text-sm text-navy/60">
                      <strong className="text-navy">Vecuma grupa:</strong>{" "}
                      {product.age_min === 0
                        ? `No dzimšanas līdz ${product.age_max} gadiem`
                        : `${product.age_min}–${product.age_max === 99 ? "99+" : product.age_max} gadi`}
                    </p>
                  )}
                  {product.brand && (
                    <p className="mt-2 text-sm text-navy/60">
                      <strong className="text-navy">Ražotājs:</strong> {product.brand}
                    </p>
                  )}
                </div>
              </FadeInOnScroll>
            )}

            {activeTab === "specs" && (
              <FadeInOnScroll>
                <table className="w-full max-w-lg text-sm" aria-label="Tehniskie dati">
                  <tbody className="divide-y divide-gray-100">
                    {[
                      ["SKU", product.sku ?? "—"],
                      ["Ražotājs", product.brand ?? "8kajis.lv"],
                      ["Vecuma grupa", product.age_min !== undefined ? `${product.age_min}+ gadi` : "—"],
                      ["Kategorija", product.category],
                      ["Pieejamība", product.in_stock ? "Pieejams" : "Nav pieejams"],
                      ["Cena ar PVN", `${priceWithVat.toFixed(2)}€`],
                    ].map(([key, val]) => (
                      <tr key={key}>
                        <td className="py-3 pr-8 font-semibold text-navy/70 w-1/3">{key}</td>
                        <td className="py-3 text-navy">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </FadeInOnScroll>
            )}

            {activeTab === "reviews" && (
              <FadeInOnScroll>
                <div className="max-w-2xl space-y-5">
                  {[
                    { name: "Inga K.", stars: 5, text: "Ļoti kvalitatīva rotaļlieta. Bērns apjūsmo un spēlējas katru dienu!", date: "2026-04-15" },
                    { name: "Mārtiņš L.", stars: 4, text: "Laba cena–kvalitātes attiecība. Piegāde bija ātri, iepakojums kārtīgs.", date: "2026-03-28" },
                    { name: "Sandra B.", stars: 5, text: "Beleduc produkti vienmēr ir augstas kvalitātes. Iesaku!", date: "2026-02-10" },
                  ].map((review) => (
                    <div key={review.name} className="border border-gray-100 rounded-2xl p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-navy text-sm">{review.name}</span>
                        <time dateTime={review.date} className="text-xs text-navy/40">
                          {new Date(review.date).toLocaleDateString("lv-LV")}
                        </time>
                      </div>
                      <div className="flex gap-0.5 mb-3" aria-label={`Vērtējums: ${review.stars} no 5`}>
                        {[1, 2, 3, 4, 5].map((s) => (
                          <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s <= review.stars ? "#E8813A" : "#E5E7EB"} stroke="none" aria-hidden="true">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-sm text-navy/70 leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>
              </FadeInOnScroll>
            )}
          </div>
        </section>

        {/* Similar products */}
        {similar.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-gray-100">
            <h2 className="font-heading font-700 text-navy text-xl mb-7">
              Līdzīgi produkti
            </h2>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4" aria-label="Līdzīgie produkti" role="list">
              {similar.map((p) => (
                <li key={p.id}>
                  <HoverLift>
                    <Link
                      to={`/veikals/${p.slug}`}
                      className="block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                      aria-label={`Skatīt ${p.name_lv}`}
                    >
                      <div style={{ aspectRatio: "1/1" }}>
                        <img
                          src={p.images[0]}
                          alt={p.name_lv}
                          width={200}
                          height={200}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-semibold text-navy line-clamp-2 mb-1">
                          {p.name_lv}
                        </p>
                        <p className="text-xs font-bold text-navy">
                          {p.price.toFixed(2)}€
                        </p>
                      </div>
                    </Link>
                  </HoverLift>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
