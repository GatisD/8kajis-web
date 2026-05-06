import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/layout/Header";
import SEO from "@/components/SEO";
import { useCartStore } from "@/store/cartStore";
import { SHIPPING_OPTIONS, getShippingCost } from "@/lib/products";
import type { ShippingMethod } from "@/types";

const VAT_RATE = 0.21;

// Zod schemas per step
const contactSchema = z.object({
  email: z.string().email("Ievadi derīgu e-pasta adresi"),
  first_name: z.string().min(2, "Ievadi vārdu"),
  last_name: z.string().min(2, "Ievadi uzvārdu"),
  phone: z.string().min(8, "Ievadi derīgu tālruņa numuru"),
});

const addressSchema = z.object({
  street: z.string().min(3, "Ievadi ielu un mājas numuru"),
  city: z.string().min(2, "Ievadi pilsētu"),
  postal: z.string().min(4, "Ievadi pasta indeksu"),
});

const paymentSchema = z.object({
  gdpr_consent: z.boolean().refine((v) => v === true, {
    message: "Lūdzu, piekrīti privātuma politikai",
  }),
});

type ContactData = z.infer<typeof contactSchema>;
type AddressData = z.infer<typeof addressSchema>;

const STEPS = ["Kontakti", "Piegāde", "Maksājums", "Apstiprinājums"];
const PAYMENT_METHODS = [
  { id: "card", label: "Kredītkarte (Stripe)", icon: "💳" },
  { id: "swedbank", label: "Swedbank", icon: "🏦" },
  { id: "seb", label: "SEB banka", icon: "🏦" },
  { id: "citadele", label: "Citadele", icon: "🏦" },
  { id: "paypal", label: "PayPal", icon: "🅿️" },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCartStore();
  const [step, setStep] = useState(0);
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("omniva");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [submitting, setSubmitting] = useState(false);

  const sub = subtotal();
  const shipping = getShippingCost(shippingMethod, sub);
  const vat = sub * VAT_RATE;
  const total = sub + shipping + vat;

  const contactForm = useForm<ContactData>({ resolver: zodResolver(contactSchema) });
  const addressForm = useForm<AddressData>({ resolver: zodResolver(addressSchema) });
  const paymentForm = useForm({ resolver: zodResolver(paymentSchema) });

  if (items.length === 0 && step < 3) {
    navigate("/grozs");
    return null;
  }

  const handleContact = (data: ContactData) => {
    setContactData(data);
    setStep(1);
  };

  const handleShipping = addressForm.handleSubmit(() => {
    setStep(2);
  });

  const handlePayment = paymentForm.handleSubmit(async () => {
    setSubmitting(true);
    try {
      // Demo — simulate payment
      await new Promise((r) => setTimeout(r, 1500));
      const orderNum = `8K-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
      clearCart();
      navigate(`/checkout/success?order=${orderNum}&email=${contactData?.email ?? ""}&name=${contactData?.first_name ?? ""}`);
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <>
      <SEO
        title="Norēķins"
        description="Droša apmaksa 8kajis.lv veikalā"
        path="/checkout"
        noindex
      />

      <Header theme="light" />

      <main className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Progress indicator */}
          <nav aria-label="Norēķina soļi" className="mb-10">
            <ol className="flex items-center justify-center">
              {STEPS.map((s, i) => (
                <li key={s} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                        i < step
                          ? "bg-teal text-white"
                          : i === step
                          ? "bg-navy text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                      aria-current={i === step ? "step" : undefined}
                    >
                      {i < step ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      ) : (
                        i + 1
                      )}
                    </div>
                    <span className={`hidden sm:block text-xs mt-1 font-semibold ${i === step ? "text-navy" : "text-gray-400"}`}>
                      {s}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={`w-16 sm:w-24 h-0.5 mx-2 mb-4 sm:mb-5 transition-all ${i < step ? "bg-teal" : "bg-gray-200"}`}
                      aria-hidden="true"
                    />
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Form area */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">

                {/* Step 1: Contacts */}
                {step === 0 && (
                  <form onSubmit={contactForm.handleSubmit(handleContact)} noValidate>
                    <h1 className="font-heading font-700 text-xl text-navy mb-6">
                      Kontaktinformācija
                    </h1>
                    <div className="space-y-5">
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-navy mb-1.5">
                          E-pasta adrese *
                        </label>
                        <input
                          id="email"
                          type="email"
                          autoComplete="email"
                          className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy"
                          aria-required="true"
                          aria-invalid={!!contactForm.formState.errors.email}
                          {...contactForm.register("email")}
                        />
                        {contactForm.formState.errors.email && (
                          <p role="alert" className="text-xs text-red-500 mt-1">{contactForm.formState.errors.email.message}</p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="first_name" className="block text-sm font-semibold text-navy mb-1.5">
                            Vārds *
                          </label>
                          <input
                            id="first_name"
                            type="text"
                            autoComplete="given-name"
                            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy"
                            aria-required="true"
                            {...contactForm.register("first_name")}
                          />
                          {contactForm.formState.errors.first_name && (
                            <p role="alert" className="text-xs text-red-500 mt-1">{contactForm.formState.errors.first_name.message}</p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="last_name" className="block text-sm font-semibold text-navy mb-1.5">
                            Uzvārds *
                          </label>
                          <input
                            id="last_name"
                            type="text"
                            autoComplete="family-name"
                            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy"
                            aria-required="true"
                            {...contactForm.register("last_name")}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-navy mb-1.5">
                          Tālrunis *
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          autoComplete="tel"
                          className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy"
                          aria-required="true"
                          {...contactForm.register("phone")}
                        />
                        {contactForm.formState.errors.phone && (
                          <p role="alert" className="text-xs text-red-500 mt-1">{contactForm.formState.errors.phone.message}</p>
                        )}
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="mt-8 w-full py-4 bg-navy text-white rounded-2xl font-bold hover:bg-teal transition-colors"
                    >
                      Turpināt →
                    </button>
                  </form>
                )}

                {/* Step 2: Shipping */}
                {step === 1 && (
                  <form onSubmit={handleShipping} noValidate>
                    <h2 className="font-heading font-700 text-xl text-navy mb-6">
                      Piegādes metode un adrese
                    </h2>

                    {/* Free shipping notice */}
                    {sub >= 100 && (
                      <div className="mb-6 p-4 bg-teal/10 rounded-xl">
                        <p className="text-sm font-semibold text-teal">
                          Bezmaksas piegāde virs 100€ piemērota!
                        </p>
                      </div>
                    )}

                    {/* Shipping method */}
                    <div className="space-y-3 mb-7">
                      {SHIPPING_OPTIONS.map((opt) => {
                        const cost = getShippingCost(opt.id, sub);
                        return (
                          <label
                            key={opt.id}
                            className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              shippingMethod === opt.id
                                ? "border-navy bg-navy/5"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name="shipping"
                                value={opt.id}
                                checked={shippingMethod === opt.id}
                                onChange={() => setShippingMethod(opt.id)}
                                className="accent-navy"
                                aria-label={opt.name}
                              />
                              <div>
                                <p className="font-semibold text-navy text-sm">{opt.name}</p>
                                <p className="text-xs text-navy/50">{opt.estimated_days}</p>
                              </div>
                            </div>
                            <span className={`font-bold text-sm ${cost === 0 ? "text-teal" : "text-navy"}`}>
                              {cost === 0 ? "Bezmaksas" : `${cost.toFixed(2)}€`}
                            </span>
                          </label>
                        );
                      })}
                    </div>

                    {/* Address */}
                    {shippingMethod !== "pickup_kekava" && (
                      <div className="space-y-4">
                        <h3 className="font-semibold text-navy">Piegādes adrese</h3>
                        <div>
                          <label htmlFor="street" className="block text-sm font-semibold text-navy mb-1.5">
                            Iela, mājas nr. *
                          </label>
                          <input
                            id="street"
                            type="text"
                            autoComplete="street-address"
                            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy"
                            aria-required="true"
                            {...addressForm.register("street")}
                          />
                          {addressForm.formState.errors.street && (
                            <p role="alert" className="text-xs text-red-500 mt-1">{addressForm.formState.errors.street.message}</p>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="city" className="block text-sm font-semibold text-navy mb-1.5">
                              Pilsēta *
                            </label>
                            <input
                              id="city"
                              type="text"
                              autoComplete="address-level2"
                              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy"
                              aria-required="true"
                              {...addressForm.register("city")}
                            />
                          </div>
                          <div>
                            <label htmlFor="postal" className="block text-sm font-semibold text-navy mb-1.5">
                              Pasta indekss *
                            </label>
                            <input
                              id="postal"
                              type="text"
                              autoComplete="postal-code"
                              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy"
                              aria-required="true"
                              {...addressForm.register("postal")}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {shippingMethod === "pickup_kekava" && (
                      <div className="p-4 bg-gray-50 rounded-xl text-sm text-navy/70">
                        <p className="font-semibold text-navy mb-1">Pašizņemšanas adrese:</p>
                        <address className="not-italic">
                          Nākotnes iela 2, Ķekava, LV-2123
                          <br />
                          Pr–Pk 09:00–17:00
                        </address>
                      </div>
                    )}

                    <div className="flex gap-3 mt-8">
                      <button
                        type="button"
                        onClick={() => setStep(0)}
                        className="flex-1 py-3.5 border-2 border-gray-200 text-navy rounded-2xl font-semibold hover:border-navy transition-colors"
                      >
                        ← Atpakaļ
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3.5 bg-navy text-white rounded-2xl font-bold hover:bg-teal transition-colors"
                      >
                        Turpināt →
                      </button>
                    </div>
                  </form>
                )}

                {/* Step 3: Payment */}
                {step === 2 && (
                  <form onSubmit={handlePayment} noValidate>
                    <h2 className="font-heading font-700 text-xl text-navy mb-6">
                      Maksājums
                    </h2>

                    {/* Payment method selector */}
                    <div className="space-y-3 mb-7">
                      {PAYMENT_METHODS.map((pm) => (
                        <label
                          key={pm.id}
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            paymentMethod === pm.id
                              ? "border-navy bg-navy/5"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={pm.id}
                            checked={paymentMethod === pm.id}
                            onChange={() => setPaymentMethod(pm.id)}
                            className="accent-navy"
                            aria-label={pm.label}
                          />
                          <span aria-hidden="true" className="text-xl">{pm.icon}</span>
                          <span className="font-semibold text-navy text-sm">{pm.label}</span>
                        </label>
                      ))}
                    </div>

                    {/* Card form placeholder */}
                    {paymentMethod === "card" && (
                      <div className="p-5 bg-gray-50 rounded-xl mb-6 text-sm text-navy/60">
                        <p className="font-semibold text-navy mb-2">Stripe Elements ievietošanas vieta</p>
                        <p>Ražošanā: Stripe Elements komponente ar PCI DSS compliant kartes lauku ievade.</p>
                        <div className="mt-3 p-3 border border-dashed border-gray-300 rounded-lg text-center text-gray-400">
                          [Stripe CardElement]
                        </div>
                      </div>
                    )}

                    {/* Security notice */}
                    <div className="flex items-center gap-2 p-4 bg-teal/5 rounded-xl mb-6">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00685d" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                      <p className="text-xs text-teal font-semibold">
                        Droša apmaksa ar SSL 256-bit šifrēšanu
                      </p>
                    </div>

                    {/* GDPR consent */}
                    <div className="flex gap-3 items-start mb-6">
                      <input
                        id="checkout-gdpr"
                        type="checkbox"
                        className="mt-1 w-4 h-4 rounded accent-navy flex-shrink-0 cursor-pointer"
                        aria-required="true"
                        aria-invalid={!!paymentForm.formState.errors.gdpr_consent}
                        {...paymentForm.register("gdpr_consent")}
                      />
                      <label htmlFor="checkout-gdpr" className="text-sm text-navy/70 leading-relaxed cursor-pointer">
                        Piekrītu personas datu apstrādei saskaņā ar{" "}
                        <a href="/privatuma-politika" className="text-teal underline hover:opacity-80">
                          privātuma politiku
                        </a>
                        . *
                      </label>
                    </div>
                    {paymentForm.formState.errors.gdpr_consent && (
                      <p role="alert" className="text-xs text-red-500 -mt-4 mb-4">
                        {String(paymentForm.formState.errors.gdpr_consent.message)}
                      </p>
                    )}

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 py-3.5 border-2 border-gray-200 text-navy rounded-2xl font-semibold hover:border-navy transition-colors"
                      >
                        ← Atpakaļ
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 py-3.5 bg-navy text-white rounded-2xl font-bold hover:bg-teal transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        aria-busy={submitting}
                      >
                        {submitting ? "Apstrādā..." : `MAKSĀT ${total.toFixed(2)}€`}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Order summary */}
            <aside className="lg:w-72 flex-shrink-0" aria-label="Pasūtījuma kopsavilkums">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
                <h2 className="font-heading font-700 text-navy mb-4">Kopsavilkums</h2>
                <div className="space-y-3 mb-5">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.variant?.id}`} className="flex gap-3 text-sm">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name_lv}
                          width={48}
                          height={48}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-navy text-xs line-clamp-2">{item.product.name_lv}</p>
                        <p className="text-navy/50 text-xs">×{item.quantity}</p>
                      </div>
                      <p className="font-bold text-navy text-xs flex-shrink-0">
                        {(item.product.price * item.quantity).toFixed(2)}€
                      </p>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-gray-100 space-y-2 text-sm">
                  <div className="flex justify-between text-navy/60">
                    <span>Starpsumma</span><span>{sub.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-navy/60">
                    <span>Piegāde</span>
                    <span className={shipping === 0 ? "text-teal" : ""}>{shipping === 0 ? "Bezmaksas" : `${shipping.toFixed(2)}€`}</span>
                  </div>
                  <div className="flex justify-between text-navy/60">
                    <span>PVN 21%</span><span>{vat.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between font-bold text-navy text-base pt-2 border-t border-gray-100">
                    <span>Kopā</span><span>{total.toFixed(2)}€</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
