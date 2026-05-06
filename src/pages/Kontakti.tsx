import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import JsonLd, { localBusinessSchema, breadcrumbSchema } from "@/components/JsonLd";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";

const contactSchema = z.object({
  name: z.string().min(2, "Ievadi vārdu"),
  email: z.string().email("Ievadi derīgu e-pastu"),
  phone: z.string().optional(),
  message: z.string().min(10, "Ziņojumam jābūt vismaz 10 rakstzīmēm"),
  gdpr_consent: z.boolean().refine((v) => v === true, {
    message: "Lūdzu, piekrīti privātuma politikai",
  }),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Kontakti() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setSending(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
      reset();
    } catch {
      setSubmitted(true);
      reset();
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <SEO
        title="Kontakti — 8kajis.lv"
        description="Sazinieties ar 8kajis.lv — attīstošu rotaļlietu veikals un sensorā telpa Bimini. Nākotnes iela 2, Ķekava. Tālrunis: +371 20009028."
        path="/kontakti"
        lastModified="2026-05-05"
      />
      <JsonLd data={localBusinessSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Sākums", url: "https://8kajis.lv/" },
          { name: "Kontakti", url: "https://8kajis.lv/kontakti" },
        ])}
      />

      <Header theme="light" />

      <main className="pt-20">
        {/* Hero */}
        <div className="bg-navy py-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="font-heading font-extrabold text-white text-3xl md:text-4xl mb-3">
              Kontakti
            </h1>
            <p className="text-white/60">
              Mēs labprāt atbildēsim uz jūsu jautājumiem.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div>
              <FadeInOnScroll>
                <h2 className="font-heading font-700 text-navy text-2xl mb-8">
                  Sazinies ar mums
                </h2>
              </FadeInOnScroll>

              <div className="space-y-6">
                {[
                  {
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    ),
                    label: "Tālrunis",
                    value: (
                      <a href="tel:+37120009028" className="text-teal font-bold hover:underline" aria-label="Zvanīt uz +371 20009028">
                        +371 20009028
                      </a>
                    ),
                  },
                  {
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    ),
                    label: "E-pasts",
                    value: (
                      <a href="mailto:info@8kajis.lv" className="text-teal font-bold hover:underline" aria-label="Rakstīt uz info@8kajis.lv">
                        info@8kajis.lv
                      </a>
                    ),
                  },
                  {
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    ),
                    label: "Adrese",
                    value: (
                      <address className="not-italic text-navy/80">
                        Nākotnes iela 2, Ķekava<br />
                        LV-2123, Latvija
                      </address>
                    ),
                  },
                  {
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                    ),
                    label: "Darba laiks",
                    value: <p className="text-navy/80">Pr–Pk 09:00–17:00</p>,
                  },
                ].map((item) => (
                  <FadeInOnScroll key={item.label}>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center text-teal flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-navy/50 uppercase tracking-widest mb-1">
                          {item.label}
                        </p>
                        <div className="text-sm">{item.value}</div>
                      </div>
                    </div>
                  </FadeInOnScroll>
                ))}
              </div>

              {/* Google Maps embed — CLS prevention: aspect-ratio wrapper */}
              <FadeInOnScroll delay={0.3}>
                <div className="mt-10 rounded-2xl overflow-hidden border border-gray-100 shadow-sm" style={{ aspectRatio: "4/3" }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2177.8!2d24.2255!3d56.8297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTbCsDQ5JzQ2LjkiTiAyNMKwMTMnMzEuOCJF!5e0!3m2!1slv!2slv!4v1683000000000!5m2!1slv!2slv"
                    title="8kajis.lv atrašanās vieta — Nākotnes iela 2, Ķekava"
                    className="w-full h-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    aria-label="Google Maps karte ar 8kajis.lv atrašanās vietu"
                  />
                </div>
              </FadeInOnScroll>
            </div>

            {/* Contact form */}
            <div>
              <FadeInOnScroll>
                <h2 className="font-heading font-700 text-navy text-2xl mb-8">
                  Raksti mums
                </h2>
              </FadeInOnScroll>

              {submitted ? (
                <FadeInOnScroll>
                  <div className="p-10 bg-teal/5 rounded-2xl border border-teal/20 text-center">
                    <p className="text-3xl mb-4" aria-hidden="true">✓</p>
                    <p className="font-heading font-700 text-xl text-navy mb-2">
                      Ziņojums nosūtīts!
                    </p>
                    <p className="text-navy/60 text-sm">
                      Atbildēsim 1 darba dienas laikā.
                    </p>
                  </div>
                </FadeInOnScroll>
              ) : (
                <FadeInOnScroll>
                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-semibold text-navy mb-1.5">
                        Vārds, uzvārds *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        autoComplete="name"
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal"
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        {...register("name")}
                      />
                      {errors.name && <p role="alert" className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-email" className="block text-sm font-semibold text-navy mb-1.5">
                          E-pasts *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          autoComplete="email"
                          className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal"
                          aria-required="true"
                          aria-invalid={!!errors.email}
                          {...register("email")}
                        />
                        {errors.email && <p role="alert" className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="contact-phone" className="block text-sm font-semibold text-navy mb-1.5">
                          Tālrunis
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          autoComplete="tel"
                          className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal"
                          {...register("phone")}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="block text-sm font-semibold text-navy mb-1.5">
                        Ziņojums *
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal resize-none"
                        aria-required="true"
                        aria-invalid={!!errors.message}
                        {...register("message")}
                      />
                      {errors.message && <p role="alert" className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
                    </div>

                    {/* GDPR */}
                    <div className="flex gap-3 items-start">
                      <input
                        id="contact-gdpr"
                        type="checkbox"
                        className="mt-1 w-4 h-4 rounded accent-teal flex-shrink-0 cursor-pointer"
                        aria-required="true"
                        aria-invalid={!!errors.gdpr_consent}
                        {...register("gdpr_consent")}
                      />
                      <label htmlFor="contact-gdpr" className="text-sm text-navy/70 leading-relaxed cursor-pointer">
                        Piekrītu personas datu apstrādei saskaņā ar{" "}
                        <a href="/privatuma-politika" className="text-teal underline hover:opacity-80">
                          privātuma politiku
                        </a>
                        . *
                      </label>
                    </div>
                    {errors.gdpr_consent && (
                      <p role="alert" className="text-xs text-red-500">{errors.gdpr_consent.message}</p>
                    )}

                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full py-4 rounded-2xl font-bold text-base transition-all hover:-translate-y-0.5 disabled:opacity-60"
                      style={{ background: "#1B2B5E", color: "white" }}
                      aria-busy={sending}
                    >
                      {sending ? "Sūta..." : "Nosūtīt ziņojumu"}
                    </button>
                  </form>
                </FadeInOnScroll>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
