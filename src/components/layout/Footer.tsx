import { Link } from "react-router-dom";
import OctopusMascot from "@/components/OctopusMascot";

const STORE_LINKS = [
  { to: "/veikals", label: "Visas rotaļlietas" },
  { to: "/veikals?category=sensorie", label: "Sensoro prasmju" },
  { to: "/veikals?category=koka", label: "Koka rotaļlietas" },
  { to: "/veikals?category=konstruktori", label: "Konstruktori" },
];

const INFO_LINKS = [
  { to: "/par-mums", label: "Par 8kajis.lv" },
  { to: "/sensora-telpa", label: "Sensorā telpa Bimini" },
  { to: "/kontakti", label: "Kontakti" },
  { to: "/privatuma-politika", label: "Privātuma politika" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              to="/"
              className="flex items-center gap-2 text-white font-heading font-bold text-xl mb-4"
              aria-label="8kajis.lv — sākumlapa"
            >
              <OctopusMascot size={36} variant="mini" />
              <span>
                8kajis<span className="text-teal">.</span>lv
              </span>
            </Link>
            <p className="text-sm text-white/60 max-w-xs leading-relaxed">
              Attīstošas rotaļlietas bērniem un sensorā telpa Bimini Ķekavā.
              Beleduc oficiālais partneris Latvijā.
            </p>
            {/* NAP */}
            <address className="mt-5 not-italic text-sm text-white/60 space-y-1">
              <p>Nākotnes iela 2, Ķekava, LV-2123</p>
              <p>
                <a
                  href="tel:+37120009028"
                  className="hover:text-white transition-colors"
                  aria-label="Zvanīt uz +371 20009028"
                >
                  +371 20009028
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@8kajis.lv"
                  className="hover:text-white transition-colors"
                  aria-label="Rakstīt uz info@8kajis.lv"
                >
                  info@8kajis.lv
                </a>
              </p>
              <p className="text-white/40 text-xs mt-2">Pr–Pk 09:00–17:00</p>
            </address>
          </div>

          {/* Veikals */}
          <div>
            <h3 className="text-white font-heading font-700 text-sm uppercase tracking-widest mb-4">
              Veikals
            </h3>
            <ul className="space-y-2">
              {STORE_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informācija */}
          <div>
            <h3 className="text-white font-heading font-700 text-sm uppercase tracking-widest mb-4">
              Informācija
            </h3>
            <ul className="space-y-2">
              {INFO_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + piegāde trust */}
          <div>
            <h3 className="text-white font-heading font-700 text-sm uppercase tracking-widest mb-4">
              Piegāde
            </h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>LV Pasts — 2.99€</li>
              <li>Omniva pakomāts — 2.49€</li>
              <li>DPD kurjers — 3.49€</li>
              <li className="text-teal font-semibold">Bezmaksas virs 100€</li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.facebook.com/8kajis"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="8kajis.lv Facebook lapa"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/8kajis"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="8kajis.lv Instagram lapa"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <p>© {year} 8kajis.lv. Visas tiesības aizsargātas.</p>
          <div className="flex items-center gap-4">
            <Link to="/privatuma-politika" className="hover:text-white/70 transition-colors">
              Privātuma politika
            </Link>
            <span>PVN: LV00000000000</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
