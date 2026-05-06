import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";
import OctopusMascot from "@/components/OctopusMascot";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/products";

const VAT_RATE = 0.21;

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } =
    useCartStore();
  const reduced = useReducedMotion();
  const sub = subtotal();
  const shippingProgress = Math.min(sub / FREE_SHIPPING_THRESHOLD, 1);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.3 }}
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white flex flex-col shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: reduced ? 0 : 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            role="dialog"
            aria-label="Iepirkumu grozs"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-heading font-700 text-lg text-navy">
                Iepirkumu grozs
              </h2>
              <button
                onClick={closeCart}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-navy"
                aria-label="Aizvērt grozu"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {items.length === 0 ? (
              /* Empty state */
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-5">
                <OctopusMascot size={120} variant="landing" />
                <div>
                  <p className="font-heading font-700 text-xl text-navy mb-2">
                    Grozs ir tukšs
                  </p>
                  <p className="text-navy/60 text-sm">
                    Atklāj mūsu rotaļlietas un pievieno kaut ko savam grozam!
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="mt-2"
                >
                  <Link
                    to="/veikals"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white rounded-xl font-semibold text-sm hover:bg-navy/90 transition-colors"
                    onClick={closeCart}
                  >
                    Doties uz veikalu
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </button>
              </div>
            ) : (
              <>
                {/* Free shipping progress */}
                {sub < FREE_SHIPPING_THRESHOLD && (
                  <div className="px-6 py-3 bg-teal/5 border-b border-teal/10">
                    <p className="text-xs font-semibold text-teal mb-1.5">
                      Pievieno vēl{" "}
                      <strong>
                        {(FREE_SHIPPING_THRESHOLD - sub).toFixed(2)}€
                      </strong>{" "}
                      bezmaksas piegādei!
                    </p>
                    <div className="w-full h-1.5 bg-teal/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal rounded-full transition-all duration-500"
                        style={{ width: `${shippingProgress * 100}%` }}
                        role="progressbar"
                        aria-valuenow={Math.round(shippingProgress * 100)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label="Bezmaksas piegādes progress"
                      />
                    </div>
                  </div>
                )}
                {sub >= FREE_SHIPPING_THRESHOLD && (
                  <div className="px-6 py-3 bg-teal/10 border-b border-teal/20">
                    <p className="text-xs font-bold text-teal">
                      Bezmaksas piegāde!
                    </p>
                  </div>
                )}

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                  {items.map((item) => {
                    const price =
                      item.product.price + (item.variant?.price_delta ?? 0);
                    return (
                      <div
                        key={`${item.product.id}-${item.variant?.id}`}
                        className="flex gap-4"
                      >
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name_lv}
                            width={80}
                            height={80}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-navy text-sm line-clamp-2 leading-snug">
                            {item.product.name_lv}
                          </p>
                          {item.variant && (
                            <p className="text-xs text-navy/50 mt-0.5">
                              {item.variant.name}: {item.variant.value}
                            </p>
                          )}
                          <div className="flex items-center justify-between mt-2">
                            {/* Qty controls */}
                            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity - 1,
                                    item.variant?.id
                                  )
                                }
                                className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white transition-colors font-bold text-navy"
                                aria-label={`Samazināt ${item.product.name_lv} daudzumu`}
                              >
                                −
                              </button>
                              <span className="w-6 text-center text-sm font-bold text-navy">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity + 1,
                                    item.variant?.id
                                  )
                                }
                                className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white transition-colors font-bold text-navy"
                                aria-label={`Palielināt ${item.product.name_lv} daudzumu`}
                              >
                                +
                              </button>
                            </div>
                            <span className="font-bold text-navy text-sm">
                              {(price * item.quantity).toFixed(2)}€
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            removeItem(item.product.id, item.variant?.id)
                          }
                          className="flex-shrink-0 w-7 h-7 flex items-center justify-center text-navy/30 hover:text-red-500 transition-colors"
                          aria-label={`Noņemt ${item.product.name_lv} no groza`}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            aria-hidden="true"
                          >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Summary + CTA */}
                <div className="border-t border-gray-100 px-6 py-5 space-y-3">
                  <div className="flex justify-between text-sm text-navy/70">
                    <span>Starpsumma</span>
                    <span>{sub.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-sm text-navy/70">
                    <span>PVN 21%</span>
                    <span>{(sub * VAT_RATE).toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between font-bold text-navy text-base pt-1 border-t border-gray-100">
                    <span>Kopā</span>
                    <span>{(sub * (1 + VAT_RATE)).toFixed(2)}€</span>
                  </div>
                  <Link
                    to="/checkout"
                    onClick={closeCart}
                    className="block w-full mt-3 py-3.5 bg-navy text-white text-center font-bold rounded-xl hover:bg-navy/90 transition-colors text-sm"
                  >
                    Doties uz norēķinu →
                  </Link>
                  <Link
                    to="/grozs"
                    onClick={closeCart}
                    className="block w-full py-2.5 text-center text-sm text-navy/60 hover:text-navy transition-colors"
                  >
                    Skatīt visu grozu
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
