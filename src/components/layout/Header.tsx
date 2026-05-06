import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";
import OctopusMascot from "@/components/OctopusMascot";
import type { Locale } from "@/types";

const LOCALES: Locale[] = ["lv", "en", "ru", "lt", "ee"];

const NAV_LINKS = [
  { to: "/veikals", label: "Veikals" },
  { to: "/sensora-telpa", label: "Sensorā Telpa" },
  { to: "/par-mums", label: "Par Mums" },
  { to: "/kontakti", label: "Kontakti" },
];

interface HeaderProps {
  theme?: "light" | "dark";
  currentLocale?: Locale;
  onLocaleChange?: (locale: Locale) => void;
}

export default function Header({
  theme = "light",
  currentLocale = "lv",
  onLocaleChange,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const totalItems = useCartStore((s) => s.totalItems());
  const openCart = useCartStore((s) => s.openCart);

  const isDark = theme === "dark";

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const bgClass = isDark
    ? isScrolled
      ? "bg-[#111118]/95 backdrop-blur-md border-b border-white/10"
      : "bg-transparent"
    : isScrolled
    ? "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
    : "bg-white";

  const textClass = isDark ? "text-white" : "text-navy";
  const linkClass = isDark
    ? "text-white/80 hover:text-white"
    : "text-navy/70 hover:text-navy";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${bgClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className={`flex items-center gap-2 font-heading font-800 text-xl ${textClass} transition-transform hover:scale-105`}
            aria-label="8kajis.lv — sākumlapa"
          >
            <OctopusMascot size={36} variant="mini" />
            <span>
              8kajis<span className={isDark ? "text-[#00E5CC]" : "text-teal"}>.</span>lv
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Galvenā navigācija">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-semibold transition-colors ${linkClass} ${
                  location.pathname.startsWith(link.to)
                    ? isDark ? "text-[#00E5CC]" : "text-teal"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side: lang switcher + cart */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div
              className={`hidden sm:flex items-center gap-0.5 px-2 py-1 rounded-full text-xs font-bold ${
                isDark
                  ? "bg-white/10 border border-white/20"
                  : "bg-gray-100 border border-gray-200"
              }`}
              role="navigation"
              aria-label="Valodas izvēle"
            >
              {LOCALES.map((loc) => (
                <button
                  key={loc}
                  onClick={() => onLocaleChange?.(loc)}
                  className={`px-2 py-0.5 rounded-full transition-all uppercase ${
                    currentLocale === loc
                      ? isDark
                        ? "bg-white text-[#0A0A0F]"
                        : "bg-navy text-white"
                      : isDark
                      ? "text-white/70 hover:text-white hover:bg-white/15"
                      : "text-navy/60 hover:text-navy hover:bg-white"
                  }`}
                  aria-label={`Mainīt valodu uz ${loc.toUpperCase()}`}
                  aria-current={currentLocale === loc ? "true" : undefined}
                >
                  {loc.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Cart button */}
            <button
              onClick={openCart}
              className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                isDark
                  ? "bg-white/10 hover:bg-white/20 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-navy"
              }`}
              aria-label={`Iepirkumu grozs — ${totalItems} preces`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {totalItems > 0 && (
                <span
                  className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-[#E8813A] text-[#1A0A00]"
                  aria-hidden="true"
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>

            {/* Mobile burger */}
            <button
              className={`md:hidden flex flex-col gap-1.5 p-2 ${textClass}`}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Aizvērt izvēlni" : "Atvērt izvēlni"}
              aria-expanded={mobileOpen}
            >
              <span
                className={`block w-5 h-0.5 transition-all ${
                  isDark ? "bg-white" : "bg-navy"
                } ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block w-5 h-0.5 transition-all ${
                  isDark ? "bg-white" : "bg-navy"
                } ${mobileOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-5 h-0.5 transition-all ${
                  isDark ? "bg-white" : "bg-navy"
                } ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className={`md:hidden border-t ${
            isDark
              ? "bg-[#111118]/98 border-white/10"
              : "bg-white border-gray-100"
          }`}
        >
          <nav
            className="flex flex-col px-4 py-4 gap-1"
            aria-label="Mobilā navigācija"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`py-3 px-4 rounded-xl text-sm font-semibold transition-colors ${
                  location.pathname.startsWith(link.to)
                    ? isDark
                      ? "bg-white/10 text-[#00E5CC]"
                      : "bg-teal/10 text-teal"
                    : isDark
                    ? "text-white/80 hover:bg-white/5 hover:text-white"
                    : "text-navy/70 hover:bg-gray-50 hover:text-navy"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Mobile lang row */}
            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100/20">
              {LOCALES.map((loc) => (
                <button
                  key={loc}
                  onClick={() => onLocaleChange?.(loc)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                    currentLocale === loc
                      ? isDark
                        ? "bg-white text-[#0A0A0F]"
                        : "bg-navy text-white"
                      : isDark
                      ? "text-white/60 hover:bg-white/10"
                      : "text-navy/50 hover:bg-gray-100"
                  }`}
                  aria-label={`Mainīt valodu uz ${loc.toUpperCase()}`}
                >
                  {loc.toUpperCase()}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
