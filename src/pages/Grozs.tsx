import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import OctopusMascot from "@/components/OctopusMascot";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/products";

const VAT_RATE = 0.21;
const SHIPPING_COST = 2.49;

export default function Grozs() {
  const { items, removeItem, updateQuantity, subtotal, coupon, couponDiscount, applyCoupon, removeCoupon } =
    useCartStore();
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponMsg, setCouponMsg] = useState("");

  const sub = subtotal();
  const shipping = sub >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const discountAmt = coupon ? sub * couponDiscount : 0;
  const subAfterDiscount = sub - discountAmt;
  const vat = subAfterDiscount * VAT_RATE;
  const total = subAfterDiscount + shipping + vat;

  const handleCoupon = () => {
    if (applyCoupon(couponInput)) {
      setCouponMsg(`Kods "${couponInput.toUpperCase()}" pielietots!`);
      setCouponError("");
    } else {
      setCouponError("Promo kods nav derīgs");
      setCouponMsg("");
    }
  };

  return (
    <>
      <SEO
        title="Iepirkumu grozs"
        description="Jūsu iepirkumu grozs 8kajis.lv"
        path="/grozs"
        noindex
      />

      <Header theme="light" />

      <main className="pt-20 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="font-heading font-extrabold text-navy text-2xl md:text-3xl mb-8">
            Iepirkumu grozs
          </h1>

          {items.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <OctopusMascot size={160} variant="landing" />
              <h2 className="font-heading font-700 text-2xl text-navy mt-6 mb-2">
                Grozs ir tukšs
              </h2>
              <p className="text-navy/60 mb-8 max-w-sm">
                Atklāj mūsu rotaļlietas un pievieno kaut ko savam grozam!
              </p>
              <Link
                to="/veikals"
                className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-white rounded-2xl font-bold hover:bg-teal transition-colors"
              >
                Doties uz veikalu
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Items */}
              <div className="flex-1">
                <div className="space-y-4">
                  {items.map((item) => {
                    const price = item.product.price + (item.variant?.price_delta ?? 0);
                    return (
                      <div
                        key={`${item.product.id}-${item.variant?.id}`}
                        className="flex gap-5 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm"
                      >
                        <Link to={`/veikals/${item.product.slug}`} className="flex-shrink-0">
                          <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-50">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name_lv}
                              width={96}
                              height={96}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </Link>

                        <div className="flex-1 min-w-0">
                          <Link to={`/veikals/${item.product.slug}`}>
                            <p className="font-semibold text-navy hover:text-teal transition-colors line-clamp-2">
                              {item.product.name_lv}
                            </p>
                          </Link>
                          {item.variant && (
                            <p className="text-xs text-navy/50 mt-0.5">
                              {item.variant.name}: {item.variant.value}
                            </p>
                          )}

                          <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                            <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.variant?.id)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-colors font-bold text-navy"
                                aria-label={`Samazināt ${item.product.name_lv} daudzumu`}
                              >
                                −
                              </button>
                              <span className="w-8 text-center font-bold text-navy text-sm">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.variant?.id)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-colors font-bold text-navy"
                                aria-label={`Palielināt ${item.product.name_lv} daudzumu`}
                              >
                                +
                              </button>
                            </div>

                            <span className="font-extrabold text-navy">
                              {(price * item.quantity).toFixed(2)}€
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => removeItem(item.product.id, item.variant?.id)}
                          className="flex-shrink-0 self-start w-8 h-8 flex items-center justify-center text-navy/30 hover:text-red-500 transition-colors"
                          aria-label={`Noņemt ${item.product.name_lv} no groza`}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                          </svg>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Summary sidebar */}
              <aside className="lg:w-80 flex-shrink-0" aria-label="Pasūtījuma kopsavilkums">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
                  <h2 className="font-heading font-700 text-navy text-lg mb-5">
                    Pasūtījuma kopsavilkums
                  </h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-navy/70">
                      <span>Starpsumma</span>
                      <span>{sub.toFixed(2)}€</span>
                    </div>

                    {coupon && (
                      <div className="flex justify-between text-teal">
                        <span>Atlaide ({Math.round(couponDiscount * 100)}%)</span>
                        <span>−{discountAmt.toFixed(2)}€</span>
                      </div>
                    )}

                    <div className="flex justify-between text-navy/70">
                      <span>Piegāde</span>
                      <span className={shipping === 0 ? "text-teal font-semibold" : ""}>
                        {shipping === 0 ? "Bezmaksas!" : `${shipping.toFixed(2)}€`}
                      </span>
                    </div>

                    <div className="flex justify-between text-navy/70">
                      <span>PVN 21%</span>
                      <span>{vat.toFixed(2)}€</span>
                    </div>

                    <div className="flex justify-between font-bold text-navy text-base pt-3 border-t border-gray-100">
                      <span>Kopā</span>
                      <span>{total.toFixed(2)}€</span>
                    </div>
                  </div>

                  {/* Free shipping progress */}
                  {sub < FREE_SHIPPING_THRESHOLD && (
                    <div className="mt-4 p-3 bg-teal/5 rounded-xl">
                      <p className="text-xs text-teal font-semibold mb-1.5">
                        Vēl {(FREE_SHIPPING_THRESHOLD - sub).toFixed(2)}€ līdz bezmaksas piegādei
                      </p>
                      <div className="w-full h-1.5 bg-teal/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-teal rounded-full transition-all"
                          style={{ width: `${(sub / FREE_SHIPPING_THRESHOLD) * 100}%` }}
                          role="progressbar"
                          aria-valuenow={Math.round((sub / FREE_SHIPPING_THRESHOLD) * 100)}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label="Bezmaksas piegādes progress"
                        />
                      </div>
                    </div>
                  )}

                  {/* Coupon */}
                  <div className="mt-5">
                    {coupon ? (
                      <div className="flex items-center justify-between p-3 bg-teal/5 rounded-xl">
                        <span className="text-sm font-semibold text-teal">{coupon}</span>
                        <button
                          onClick={() => { removeCoupon(); setCouponMsg(""); }}
                          className="text-xs text-red-400 hover:text-red-600 font-semibold"
                          aria-label="Noņemt promo kodu"
                        >
                          Noņemt
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={couponInput}
                            onChange={(e) => { setCouponInput(e.target.value); setCouponError(""); }}
                            placeholder="Promo kods"
                            className="flex-1 px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal"
                            aria-label="Promo kods"
                            onKeyDown={(e) => e.key === "Enter" && handleCoupon()}
                          />
                          <button
                            onClick={handleCoupon}
                            className="px-4 py-2.5 bg-navy text-white text-sm font-semibold rounded-xl hover:bg-teal transition-colors"
                          >
                            OK
                          </button>
                        </div>
                        {couponError && (
                          <p role="alert" className="text-xs text-red-500 mt-1.5">{couponError}</p>
                        )}
                        {couponMsg && (
                          <p role="status" className="text-xs text-teal font-semibold mt-1.5">{couponMsg}</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <Link
                    to="/checkout"
                    className="block w-full mt-5 py-4 bg-navy text-white text-center font-bold rounded-2xl hover:bg-teal transition-colors"
                  >
                    Doties uz norēķinu →
                  </Link>

                  <div className="mt-4 flex items-center justify-center gap-3 text-xs text-navy/40">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    Droša SSL apmaksa
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
