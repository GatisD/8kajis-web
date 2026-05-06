import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import OctopusMascot from "@/components/OctopusMascot";

// Minimal auth stub — Supabase Auth integration point
export default function Konts() {
  const [activeTab, setActiveTab] = useState<"orders" | "profile">("orders");

  // Demo state — replace with Supabase Auth
  const isLoggedIn = false;

  return (
    <>
      <SEO
        title="Mans konts — 8kajis.lv"
        description="Jūsu 8kajis.lv konts — pasūtījumu vēsture un profils."
        path="/konts"
        noindex
      />

      <Header theme="light" />

      <main className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          {!isLoggedIn ? (
            /* Login prompt */
            <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-sm text-center">
              <OctopusMascot size={100} variant="landing" className="mx-auto" />
              <h1 className="font-heading font-extrabold text-navy text-2xl mt-6 mb-2">
                Mans konts
              </h1>
              <p className="text-navy/60 mb-8">
                Piesakies, lai skatītu pasūtījumu vēsturi un pārvaldītu profilu.
              </p>

              {/* Supabase Auth integration point */}
              <div className="space-y-3 max-w-xs mx-auto">
                <button
                  className="w-full py-3.5 bg-navy text-white rounded-2xl font-bold hover:bg-teal transition-colors"
                  onClick={() => alert("Supabase Auth: e-pasts + parole")}
                >
                  Pieteikties ar e-pastu
                </button>
                <button
                  className="w-full py-3.5 border-2 border-gray-200 text-navy rounded-2xl font-semibold hover:border-navy transition-colors flex items-center justify-center gap-2"
                  onClick={() => alert("Supabase Auth: Google OAuth")}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Turpināt ar Google
                </button>
                <p className="text-xs text-navy/40 mt-3">
                  Vēl nav konta?{" "}
                  <button className="text-teal underline hover:opacity-80">
                    Reģistrēties
                  </button>
                </p>
              </div>
            </div>
          ) : (
            /* Logged in */
            <div>
              <h1 className="font-heading font-extrabold text-navy text-2xl mb-7">
                Mans konts
              </h1>

              <div className="flex gap-1 mb-6 bg-gray-100 rounded-xl p-1 max-w-xs">
                {(["orders", "profile"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    role="tab"
                    aria-selected={activeTab === tab}
                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                      activeTab === tab ? "bg-white text-navy shadow-sm" : "text-navy/50 hover:text-navy"
                    }`}
                  >
                    {tab === "orders" ? "Pasūtījumi" : "Profils"}
                  </button>
                ))}
              </div>

              {activeTab === "orders" && (
                <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
                  <p className="text-navy/50">Nav pasūtījumu vēl.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
