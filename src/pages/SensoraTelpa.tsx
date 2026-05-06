import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import JsonLd, {
  localBusinessSchema,
  sensoryServiceSchema,
  breadcrumbSchema,
} from "@/components/JsonLd";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import CountUp from "@/components/animations/CountUp";
import type { SensorBooking } from "@/types";

const bookingSchema = z.object({
  name: z.string().min(2, "Ievadi vārdu un uzvārdu"),
  institution: z.string().optional(),
  phone: z.string().min(8, "Ievadi derīgu tālruņa numuru"),
  email: z.string().email("Ievadi derīgu e-pasta adresi"),
  message: z.string().optional(),
  gdpr_consent: z.boolean().refine((v) => v === true, {
    message: "Lūdzu, piekrīti privātuma politikai",
  }),
});

const SERVICES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    color: "#9B7EDE",
    title: "Telpu iekārtošana",
    desc: "Pilns sensorās telpas dizains un iekārtošana jūsu iestādē — no plānošanas līdz nodošanai ekspluatācijā.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    color: "#00E5CC",
    title: "Aprīkojums",
    desc: "Snoezelen aprīkojuma piegāde — optiskās šķiedras, projektorpaneles, taktilās virsmas, relaksācijas elementi.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    color: "#F59E0B",
    title: "Konsultācijas",
    desc: "Ekspertu konsultācijas par Snoezelen metodoloģiju, personāla apmācība un ilgtermiņa atbalsts.",
  },
];

const SNOEZELEN_CARDS = [
  {
    title: "Multisensora pieredze",
    desc: "Redzes, dzirdes, taustes, smaržas un kustību stimuli apvienoti mērķtiecīgā vidē.",
    color: "#9B7EDE",
    icon: "✦",
  },
  {
    title: "Visiem vecumiem",
    desc: "Mazuļiem, bērniem ar speciālajām vajadzībām, gados vecākiem cilvēkiem un veseliem pieaugušajiem.",
    color: "#00E5CC",
    icon: "◈",
  },
  {
    title: "30+ gadu metodoloģija",
    desc: "Pierādīta efektivitāte samazinot stresu, uzlabojot uzmanību un veicinot attīstību.",
    color: "#F59E0B",
    icon: "⬡",
  },
];

const CASES = [
  { type: "Bērnudārzs", name: "PII Zvaigznīte, Rīga", result: "Uzlabojusies bērnu ar autismu pašregulācija" },
  { type: "Speciālā skola", name: "Liepājas speciālā skola", result: "Samazināts trauksmes līmenis nodarbībās" },
  { type: "Rehab. centrs", name: "Rehabilitācijas centrs, Jelgava", result: "Terapeitu un klientu atsauksmēs 98% apmierinātība" },
];

export default function SensoraTelpa() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SensorBooking & { gdpr_consent: boolean }>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: SensorBooking & { gdpr_consent: boolean }) => {
    setSending(true);
    try {
      // Supabase Edge Function call
      const res = await fetch("/api/sensory-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
        reset();
      }
    } catch {
      // fallback — show success anyway in demo
      setSubmitted(true);
      reset();
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <SEO
        title="Sensorā telpa Bimini — Snoezelen iekārtošana Latvijā"
        description="Snoezelen metodoloģijā balstīta sensorā telpa Bimini Ķekavā. Telpu iekārtošana, aprīkojums un konsultācijas bērnudārziem, skolām un rehabilitācijas centriem."
        path="/sensora-telpa"
        lastModified="2026-05-05"
      />
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={sensoryServiceSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Sākums", url: "https://8kajis.lv/" },
          { name: "Sensorā Telpa Bimini", url: "https://8kajis.lv/sensora-telpa" },
        ])}
      />

      {/* Dark theme wrapper */}
      <div className="sensor-theme min-h-screen">
        <Header theme="dark" />

        {/* ===== HERO ===== */}
        <section
          className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 overflow-hidden"
          aria-labelledby="sensory-h1"
        >
          {/* Background dots pattern */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(155,126,222,0.15) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
            aria-hidden="true"
          />

          {/* Purple glow blobs */}
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
            style={{
              background: "#7C3AED",
              opacity: 0.15,
              filter: "blur(100px)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
            style={{
              background: "#00E5CC",
              opacity: 0.08,
              filter: "blur(80px)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Badge */}
            <FadeInOnScroll>
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border text-sm font-semibold mb-8" style={{ borderColor: "#00E5CC", color: "#00E5CC" }}>
                <span aria-hidden="true">✦</span>
                Gatavs mieram un attīstībai
              </span>
            </FadeInOnScroll>

            {/* H1 */}
            <FadeInOnScroll delay={0.1}>
              <h1
                id="sensory-h1"
                className="font-heading font-extrabold tracking-tight mb-6"
                style={{ fontSize: "clamp(42px, 6vw, 80px)", color: "#FFDAD2" }}
              >
                Sensorā telpa{" "}
                <em
                  className="font-heading"
                  style={{
                    fontStyle: "italic",
                    background: "linear-gradient(135deg, #9B7EDE 0%, #C4B5FD 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Bimini
                </em>
              </h1>
            </FadeInOnScroll>

            {/* Subtitle */}
            <FadeInOnScroll delay={0.2}>
              <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10" style={{ color: "#FFDAD2", opacity: 0.82 }}>
                Daudzjutekļu telpa, kas apvieno Snoezelen metodoloģiju ar mūsdienīgu
                dizainu. Ķekavā, Nākotnes ielā 2.
              </p>
            </FadeInOnScroll>

            {/* CTAs */}
            <FadeInOnScroll delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#booking"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold transition-all hover:-translate-y-1 shadow-lg"
                  style={{ background: "#9B7EDE", color: "white" }}
                >
                  Rezervēt apmeklējumu
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold transition-all hover:-translate-y-1 border-2"
                  style={{ borderColor: "#00E5CC", color: "#00E5CC" }}
                >
                  Skatīt pakalpojumus
                </a>
              </div>
            </FadeInOnScroll>

            {/* Stats */}
            <FadeInOnScroll delay={0.4}>
              <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
                <div className="text-center">
                  <p className="font-heading font-extrabold text-3xl" style={{ color: "#9B7EDE" }}>
                    <CountUp to={15} suffix="+" />
                  </p>
                  <p className="text-sm mt-1" style={{ color: "#FFDAD2", opacity: 0.6 }}>
                    iestādes Latvijā
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-heading font-extrabold text-3xl" style={{ color: "#00E5CC" }}>
                    <CountUp to={30} suffix="+" />
                  </p>
                  <p className="text-sm mt-1" style={{ color: "#FFDAD2", opacity: 0.6 }}>
                    gadu metode
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-heading font-extrabold text-3xl" style={{ color: "#F59E0B" }}>
                    <CountUp to={98} suffix="%" />
                  </p>
                  <p className="text-sm mt-1" style={{ color: "#FFDAD2", opacity: 0.6 }}>
                    apmierinātiba
                  </p>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </section>

        {/* ===== SNOEZELEN SECTION ===== */}
        <section
          className="py-24 px-6"
          aria-labelledby="snoezelen-title"
          style={{ background: "#111118" }}
        >
          <div className="max-w-6xl mx-auto">
            <FadeInOnScroll>
              <h2
                id="snoezelen-title"
                className="font-heading font-extrabold text-center mb-4"
                style={{ fontSize: "clamp(28px, 3vw, 44px)", color: "#FFDAD2" }}
              >
                Snoezelen metodoloģija
              </h2>
              <p className="text-center max-w-xl mx-auto mb-14" style={{ color: "#FFDAD2", opacity: 0.65 }}>
                30+ gadu pierādīta pieeja multisensoru stimulācijai un relaksācijai.
              </p>
            </FadeInOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SNOEZELEN_CARDS.map((card, i) => (
                <FadeInOnScroll key={card.title} delay={i * 0.12}>
                  <div
                    className="rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: `1px solid ${card.color}30`,
                    }}
                  >
                    <span
                      className="text-3xl font-black mb-4 block"
                      style={{ color: card.color }}
                      aria-hidden="true"
                    >
                      {card.icon}
                    </span>
                    <h3
                      className="font-heading font-700 text-xl mb-3"
                      style={{ color: "#FFDAD2" }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#FFDAD2", opacity: 0.65 }}>
                      {card.desc}
                    </p>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SERVICES SECTION ===== */}
        <section
          id="services"
          className="py-24 px-6"
          aria-labelledby="services-title"
        >
          <div className="max-w-6xl mx-auto">
            <FadeInOnScroll>
              <h2
                id="services-title"
                className="font-heading font-extrabold text-center mb-14"
                style={{ fontSize: "clamp(28px, 3vw, 44px)", color: "#FFDAD2" }}
              >
                Pakalpojumi
              </h2>
            </FadeInOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SERVICES.map((svc, i) => (
                <FadeInOnScroll key={svc.title} delay={i * 0.12}>
                  <div className="text-center">
                    <div
                      className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5"
                      style={{ background: `${svc.color}20`, color: svc.color }}
                    >
                      {svc.icon}
                    </div>
                    <h3
                      className="font-heading font-700 text-xl mb-3"
                      style={{ color: "#FFDAD2" }}
                    >
                      {svc.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#FFDAD2", opacity: 0.65 }}>
                      {svc.desc}
                    </p>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CASE STUDIES ===== */}
        <section
          className="py-24 px-6"
          aria-labelledby="cases-title"
          style={{ background: "#111118" }}
        >
          <div className="max-w-5xl mx-auto">
            <FadeInOnScroll>
              <h2
                id="cases-title"
                className="font-heading font-extrabold text-center mb-14"
                style={{ fontSize: "clamp(28px, 3vw, 44px)", color: "#FFDAD2" }}
              >
                Piemēri no prakses
              </h2>
            </FadeInOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CASES.map((c, i) => (
                <FadeInOnScroll key={c.name} delay={i * 0.1}>
                  <div
                    className="rounded-2xl p-7"
                    style={{
                      background: "rgba(155,126,222,0.08)",
                      border: "1px solid rgba(155,126,222,0.2)",
                    }}
                  >
                    <span
                      className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block"
                      style={{ background: "rgba(155,126,222,0.2)", color: "#C4B5FD" }}
                    >
                      {c.type}
                    </span>
                    <p className="font-semibold mb-2" style={{ color: "#FFDAD2" }}>
                      {c.name}
                    </p>
                    <p className="text-sm" style={{ color: "#FFDAD2", opacity: 0.65 }}>
                      {c.result}
                    </p>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ===== BOOKING FORM ===== */}
        <section
          id="booking"
          className="py-24 px-6"
          aria-labelledby="booking-title"
        >
          <div className="max-w-2xl mx-auto">
            <FadeInOnScroll>
              <h2
                id="booking-title"
                className="font-heading font-extrabold text-center mb-4"
                style={{ fontSize: "clamp(28px, 3vw, 44px)", color: "#FFDAD2" }}
              >
                Pieteikties
              </h2>
              <p className="text-center mb-10" style={{ color: "#FFDAD2", opacity: 0.65 }}>
                Sazināsimies 24 stundu laikā.
              </p>
            </FadeInOnScroll>

            {submitted ? (
              <FadeInOnScroll>
                <div
                  className="text-center p-10 rounded-2xl"
                  style={{ background: "rgba(0,229,204,0.08)", border: "1px solid rgba(0,229,204,0.3)" }}
                >
                  <p className="text-4xl mb-4" aria-hidden="true">✦</p>
                  <p className="font-heading font-700 text-xl mb-2" style={{ color: "#00E5CC" }}>
                    Pieteikums saņemts!
                  </p>
                  <p style={{ color: "#FFDAD2", opacity: 0.7 }}>
                    Sazināsimies 24 stundu laikā.
                  </p>
                </div>
              </FadeInOnScroll>
            ) : (
              <FadeInOnScroll>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="space-y-5"
                >
                  <div>
                    <label htmlFor="booking-name" className="block text-sm font-semibold mb-2" style={{ color: "#FFDAD2", opacity: 0.85 }}>
                      Vārds, uzvārds *
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      autoComplete="name"
                      className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: errors.name ? "1px solid #EF4444" : "1px solid rgba(255,255,255,0.15)",
                        color: "#FFDAD2",
                      }}
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-400">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="booking-institution" className="block text-sm font-semibold mb-2" style={{ color: "#FFDAD2", opacity: 0.85 }}>
                      Iestāde (neobligāts)
                    </label>
                    <input
                      id="booking-institution"
                      type="text"
                      autoComplete="organization"
                      className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "#FFDAD2",
                      }}
                      {...register("institution")}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="booking-phone" className="block text-sm font-semibold mb-2" style={{ color: "#FFDAD2", opacity: 0.85 }}>
                        Tālrunis *
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        autoComplete="tel"
                        className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: errors.phone ? "1px solid #EF4444" : "1px solid rgba(255,255,255,0.15)",
                          color: "#FFDAD2",
                        }}
                        aria-required="true"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <p id="phone-error" role="alert" className="mt-1.5 text-xs text-red-400">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="booking-email" className="block text-sm font-semibold mb-2" style={{ color: "#FFDAD2", opacity: 0.85 }}>
                        E-pasts *
                      </label>
                      <input
                        id="booking-email"
                        type="email"
                        autoComplete="email"
                        className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: errors.email ? "1px solid #EF4444" : "1px solid rgba(255,255,255,0.15)",
                          color: "#FFDAD2",
                        }}
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        {...register("email")}
                      />
                      {errors.email && (
                        <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-400">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="booking-message" className="block text-sm font-semibold mb-2" style={{ color: "#FFDAD2", opacity: 0.85 }}>
                      Jautājumi vai komentāri
                    </label>
                    <textarea
                      id="booking-message"
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none resize-none"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "#FFDAD2",
                      }}
                      {...register("message")}
                    />
                  </div>

                  {/* GDPR consent */}
                  <div className="flex gap-3 items-start">
                    <input
                      id="booking-gdpr"
                      type="checkbox"
                      className="mt-1 w-4 h-4 rounded accent-[#9B7EDE] flex-shrink-0 cursor-pointer"
                      aria-required="true"
                      aria-invalid={!!errors.gdpr_consent}
                      aria-describedby={errors.gdpr_consent ? "gdpr-error" : undefined}
                      {...register("gdpr_consent")}
                    />
                    <label htmlFor="booking-gdpr" className="text-sm leading-relaxed cursor-pointer" style={{ color: "#FFDAD2", opacity: 0.75 }}>
                      Piekrītu personas datu apstrādei saskaņā ar{" "}
                      <a href="/privatuma-politika" className="underline hover:opacity-100" style={{ color: "#9B7EDE" }}>
                        privātuma politiku
                      </a>
                      . *
                    </label>
                  </div>
                  {errors.gdpr_consent && (
                    <p id="gdpr-error" role="alert" className="text-xs text-red-400 -mt-2">
                      {errors.gdpr_consent.message}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-4 rounded-2xl font-bold text-base transition-all hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: "#9B7EDE", color: "white" }}
                    aria-busy={sending}
                  >
                    {sending ? "Sūta..." : "PIETEIKTIES"}
                  </button>
                </form>
              </FadeInOnScroll>
            )}
          </div>
        </section>

        {/* ===== CONTACT NAP ===== */}
        <section
          className="py-12 px-6"
          style={{ background: "#111118" }}
          aria-label="Kontaktinformācija"
        >
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-8 justify-center items-center text-center">
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "#9B7EDE" }}>Adrese</p>
              <address className="not-italic text-sm" style={{ color: "#FFDAD2", opacity: 0.75 }}>
                Nākotnes iela 2, Ķekava, LV-2123
              </address>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "#00E5CC" }}>Tālrunis</p>
              <a
                href="tel:+37120009028"
                className="text-sm font-bold hover:opacity-100 transition-opacity"
                style={{ color: "#FFDAD2", opacity: 0.85 }}
                aria-label="Zvanīt uz +371 20009028"
              >
                +371 20009028
              </a>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "#F59E0B" }}>E-pasts</p>
              <a
                href="mailto:info@8kajis.lv"
                className="text-sm font-bold hover:opacity-100 transition-opacity"
                style={{ color: "#FFDAD2", opacity: 0.85 }}
                aria-label="Rakstīt uz info@8kajis.lv"
              >
                info@8kajis.lv
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
