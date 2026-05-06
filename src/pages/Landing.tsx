import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "@/components/SEO";
import JsonLd, { organizationSchema, faqSchema } from "@/components/JsonLd";
import OctopusMascot from "@/components/OctopusMascot";

// Sparkle component for mesh effect
function Sparkle({
  x,
  y,
  delay,
  size = 3,
  color = "white",
}: {
  x: string;
  y: string;
  delay: number;
  size?: number;
  color?: string;
}) {
  return (
    <span
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: color,
        boxShadow: `0 0 ${size * 3}px ${color}`,
        animation: `sparkle ${2 + Math.random() * 2}s ease-in-out ${delay}s infinite`,
      }}
      aria-hidden="true"
    />
  );
}

export default function Landing() {
  const reduced = useReducedMotion();
  const [leaving, setLeaving] = useState<"left" | "right" | null>(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: reduced ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.01 : 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const handleNav = (side: "left" | "right") => {
    if (reduced) return; // navigate immediately
    setLeaving(side);
  };

  return (
    <>
      <SEO
        title="Attīstošas rotaļlietas & Sensorā telpa Bimini"
        description="Izglītojošas rotaļlietas bērniem un sensorā telpa Bimini Ķekavā. Beleduc partneris. Bezmaksas piegāde virs 100€. Snoezelen metodoloģija."
        path="/"
        lastModified="2026-05-05"
      />
      <JsonLd data={organizationSchema} />
      <JsonLd data={faqSchema} />

      {/* Full-screen split — no header */}
      <main
        className="flex min-h-[100dvh] overflow-hidden"
        style={{ flexDirection: "row" }}
        aria-label="8kajis.lv — izvēlies savu virzienu"
      >
        {/* Language switcher — fixed overlay */}
        <div
          className="fixed top-6 right-6 z-50 flex items-center gap-0.5 px-2 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20"
          role="navigation"
          aria-label="Valodas izvēle"
        >
          {(["LV", "EN", "RU", "LT", "EE"] as const).map((lang, i) => (
            <button
              key={lang}
              className={`px-2 py-0.5 rounded-full text-xs font-bold transition-all ${
                i === 0
                  ? "bg-white text-gray-900"
                  : "text-white/80 hover:text-white hover:bg-white/15"
              }`}
              aria-label={`Mainīt valodu uz ${lang}`}
              aria-current={i === 0 ? "true" : undefined}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* ===== LEFT PANEL — E-veikals ===== */}
        <motion.div
          className={`relative flex-1 overflow-hidden cursor-pointer transition-[flex-basis] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            leaving === "left" ? "basis-full" : leaving === "right" ? "basis-0 opacity-0" : "basis-1/2"
          }`}
          style={{
            background: "linear-gradient(135deg, #A8C5E8 0%, #8BBFE8 40%, #6FA8D9 100%)",
            minWidth: leaving === "right" ? 0 : undefined,
          }}
          initial={{ x: reduced ? 0 : "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          role="region"
          aria-label="E-veikals sadaļa"
        >
          {/* Wave pattern background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <svg
              className={`absolute bottom-0 left-0 w-[200%] opacity-15 ${reduced ? "" : "wave-left"}`}
              viewBox="0 0 1440 200"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M0,100 C360,180 720,20 1080,100 C1260,140 1350,60 1440,100 L1440,200 L0,200Z"
                fill="#1B2B5E"
              />
            </svg>
            <svg
              className={`absolute bottom-0 left-0 w-[200%] opacity-10 ${reduced ? "" : "wave-right"}`}
              viewBox="0 0 1440 200"
              fill="none"
              aria-hidden="true"
              style={{ transform: "translateX(-50%)" }}
            >
              <path
                d="M0,120 C240,60 480,160 720,120 C960,80 1200,160 1440,120 L1440,200 L0,200Z"
                fill="#1B2B5E"
              />
            </svg>
          </div>

          {/* Blob decorations */}
          <div
            className="absolute top-[-80px] left-[-80px] w-[320px] h-[320px] rounded-full pointer-events-none"
            style={{
              background: "#1B2B5E",
              opacity: 0.08,
              filter: "blur(60px)",
            }}
            aria-hidden="true"
          />
          <div
            className={`absolute bottom-[-100px] right-[-40px] w-[260px] h-[260px] rounded-full pointer-events-none ${
              reduced ? "" : "animate-shimmer"
            }`}
            style={{
              background: "#E8813A",
              opacity: 0.12,
              filter: "blur(60px)",
              animationDelay: "1s",
            }}
            aria-hidden="true"
          />

          {/* Content */}
          <Link
            to="/veikals"
            className="relative z-10 flex flex-col justify-center h-full px-8 md:px-12 lg:px-16 max-w-lg"
            onClick={() => handleNav("left")}
            aria-label="Doties uz e-veikalu"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col"
            >
              {/* Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/70 mb-6 self-start shadow-sm"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1B2B5E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <span className="text-navy font-bold text-xs tracking-[0.18em] uppercase">
                  E-veikals
                </span>
              </motion.div>

              {/* H1 */}
              <motion.h1
                variants={itemVariants}
                className="font-heading font-extrabold leading-[1.05] tracking-tight text-navy"
                style={{ fontSize: "clamp(32px, 4.2vw, 58px)" }}
              >
                Attīstošas spēles
                <br />
                bērniem un
                <br />
                pieaugušajiem
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="mt-5 text-base md:text-lg max-w-sm leading-relaxed"
                style={{ color: "#2A3E6E" }}
              >
                Izglītojošas rotaļlietas bērnu attīstībai, kas veicina
                radošumu un loģisko domāšanu.
              </motion.p>

              {/* Trust strip */}
              <motion.div
                variants={itemVariants}
                className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-navy/80"
              >
                <span className="inline-flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                  Bezmaksas piegāde virs 100€
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  Beleduc partneris
                </span>
              </motion.div>

              {/* CTA */}
              <motion.div variants={itemVariants} className="mt-8">
                <span
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-bold shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                  style={{ background: "#E8813A", color: "#1A0A00" }}
                >
                  Doties uz veikalu
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </motion.div>
            </motion.div>
          </Link>

          {/* Toy image decoration — bottom right */}
          <div
            className="absolute right-[-2%] bottom-[-2%] w-[min(38%,340px)] pointer-events-none"
            style={{ aspectRatio: "1/1" }}
            aria-hidden="true"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2K9PFUMoXB1z4w1SCAV-xAKqijJHNKD4eX-LZlL5ikQbqZJe8Z-NI_rg3YVAzEhPdYGwyyJyGi8_K-lZbWyxbWDdt9ecbau32jfVJNaxb4PGQ03s5GghZ_S1LWdHlXnqHO00jAYIqDTC7z0iP2Z2Y6-tdjVHTrR2hFcl8_YJlDmZa9zyl-_2J8tYx4LhfKB5Swdz7KFlE3HmcDsexm_mmZJQSKZkvs0s4LZEfa7L976qT8h-YdeQvXvhTlhbRMTxhav8q1R4yJg"
              alt="Koka attīstošas rotaļlietas"
              width={340}
              height={340}
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              className="object-contain w-full h-full drop-shadow-2xl"
            />
          </div>

          {/* Click indicator */}
          <span
            className="absolute bottom-8 left-1/2 chevron-bounce text-xs font-bold tracking-widest uppercase text-navy/60 pointer-events-none select-none"
            style={{ transform: "translateX(-50%)", letterSpacing: "0.18em" }}
            aria-hidden="true"
          >
            Izvēlies veikalu ›
          </span>
        </motion.div>

        {/* ===== CENTER OCTOPUS ===== */}
        <div
          className="absolute left-1/2 top-1/2 z-30 pointer-events-none hidden md:block"
          style={{ transform: "translate(-50%, -50%)" }}
          aria-hidden="true"
        >
          <OctopusMascot size={280} variant="landing" />
        </div>

        {/* Mobile octopus — between panels */}
        <div
          className="absolute left-1/2 top-1/2 z-30 pointer-events-none md:hidden"
          style={{ transform: "translate(-50%, -50%)" }}
          aria-hidden="true"
        >
          <OctopusMascot size={120} variant="landing" />
        </div>

        {/* ===== RIGHT PANEL — Sensorā telpa ===== */}
        <motion.div
          className={`relative flex-1 overflow-hidden cursor-pointer transition-[flex-basis] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            leaving === "right" ? "basis-full" : leaving === "left" ? "basis-0 opacity-0" : "basis-1/2"
          }`}
          style={{
            background: "linear-gradient(135deg, #2D1B69 0%, #4A2080 40%, #6B3090 100%)",
          }}
          initial={{ x: reduced ? 0 : "100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          role="region"
          aria-label="Sensorā telpa Bimini sadaļa"
        >
          {/* Sparkles / stars */}
          {!reduced && (
            <>
              <Sparkle x="20%" y="18%" delay={0} size={3} color="white" />
              <Sparkle x="65%" y="28%" delay={0.8} size={2} color="white" />
              <Sparkle x="15%" y="52%" delay={1.5} size={4} color="#00E5CC" />
              <Sparkle x="78%" y="70%" delay={0.3} size={2} color="white" />
              <Sparkle x="82%" y="22%" delay={1.2} size={3} color="#C4B5FD" />
              <Sparkle x="50%" y="65%" delay={0.6} size={2} color="#00E5CC" />
              <Sparkle x="35%" y="80%" delay={1.9} size={3} color="white" />
              <Sparkle x="90%" y="45%" delay={0.4} size={2} color="#C4B5FD" />
            </>
          )}

          {/* Purple blobs */}
          <div
            className={`absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full pointer-events-none ${reduced ? "" : "animate-shimmer"}`}
            style={{
              background: "#7C3AED",
              opacity: 0.35,
              filter: "blur(80px)",
            }}
            aria-hidden="true"
          />
          <div
            className={`absolute bottom-[-80px] left-[-80px] w-[320px] h-[320px] rounded-full pointer-events-none ${reduced ? "" : "animate-shimmer"}`}
            style={{
              background: "#00E5CC",
              opacity: 0.1,
              filter: "blur(70px)",
              animationDelay: "2s",
            }}
            aria-hidden="true"
          />

          {/* Sensory photo overlay */}
          <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none">
            <img
              src="https://cdn.shopify.com/s/files/1/0551/0768/2366/files/8kajisSensoric_2.jpg?v=1773695845"
              alt=""
              width={800}
              height={600}
              loading="eager"
              decoding="sync"
              className="w-full h-full object-cover"
              aria-hidden="true"
            />
          </div>

          {/* Content */}
          <Link
            to="/sensora-telpa"
            className="relative z-10 flex flex-col justify-center h-full px-8 md:px-12 lg:px-16 max-w-lg ml-auto"
            onClick={() => handleNav("right")}
            aria-label="Doties uz sensorās telpas lapu"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col"
            >
              {/* Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/25 mb-6 self-start shadow-sm"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#00E5CC"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 8v4M12 16h.01"/>
                </svg>
                <span className="text-[#00E5CC] font-bold text-xs tracking-[0.18em] uppercase">
                  Sensorā Telpa
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h2
                variants={itemVariants}
                className="font-heading font-extrabold leading-[1.05] tracking-tight"
                style={{ color: "#FFDAD2", fontSize: "clamp(32px, 4.2vw, 58px)" }}
              >
                Sensorā telpa{" "}
                <em
                  className="not-italic"
                  style={{ fontStyle: "italic", color: "#C4B5FD" }}
                >
                  Bimini
                </em>
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="mt-5 text-base md:text-lg max-w-sm leading-relaxed"
                style={{ color: "#FFDAD2", opacity: 0.88 }}
              >
                Sensorā telpa sajūtām un izaugsmei. Ķekavā, Nākotnes ielā 2.
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="mt-2 text-sm italic"
                style={{ color: "white", opacity: 0.65 }}
              >
                Vieta, kur miers satiekas ar atklājumiem.
              </motion.p>

              {/* Trust strip */}
              <motion.div
                variants={itemVariants}
                className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold"
                style={{ color: "#C4B5FD" }}
              >
                <span className="inline-flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                  Snoezelen metode
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <a
                    href="tel:+37120009028"
                    className="hover:text-[#00E5CC] transition-colors"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Zvanīt uz +371 20009028"
                  >
                    +371 20009028
                  </a>
                </span>
              </motion.div>

              {/* CTA */}
              <motion.div variants={itemVariants} className="mt-8">
                <span
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-bold shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-2"
                  style={{
                    borderColor: "#FFDAD2",
                    color: "#FFDAD2",
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  Iepazīt Bimini
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                </span>
              </motion.div>
            </motion.div>
          </Link>

          {/* Click indicator */}
          <span
            className="absolute bottom-8 left-1/2 chevron-bounce text-xs font-bold tracking-widest uppercase pointer-events-none select-none"
            style={{
              transform: "translateX(-50%)",
              letterSpacing: "0.18em",
              color: "rgba(255,218,210,0.6)",
            }}
            aria-hidden="true"
          >
            Iepazīt Bimini ›
          </span>
        </motion.div>

        {/* ===== BOTTOM CENTER — choose direction ===== */}
        <div
          className="absolute bottom-6 left-1/2 z-20 pointer-events-none text-center"
          style={{ transform: "translateX(-50%)" }}
          aria-hidden="true"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            Izvēlies savu virzienu
          </p>
          <div className="chevron-bounce mt-2 text-white/40 text-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="mx-auto" aria-hidden="true">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>
      </main>

      {/* Mobile layout override — stack vertically */}
      <style>{`
        @media (max-width: 767px) {
          main[aria-label="8kajis.lv — izvēlies savu virzienu"] {
            flex-direction: column !important;
            height: 100dvh;
          }
          main[aria-label="8kajis.lv — izvēlies savu virzienu"] > div:first-child,
          main[aria-label="8kajis.lv — izvēlies savu virzienu"] > div:last-child {
            flex-basis: 50% !important;
            min-height: 50dvh;
          }
        }
      `}</style>
    </>
  );
}
