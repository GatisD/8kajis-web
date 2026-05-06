import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import SEO from "@/components/SEO";
import OctopusMascot from "@/components/OctopusMascot";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";

export default function CheckoutSuccess() {
  const [params] = useSearchParams();
  const orderNum = params.get("order") ?? "#8K-2026-0000";
  const email = params.get("email") ?? "";
  const name = params.get("name") ?? "Klient";

  return (
    <>
      <SEO
        title="Paldies par pasūtījumu!"
        description="Pasūtījums saņemts. Apstiprinājums tiks nosūtīts uz jūsu e-pastu."
        path="/checkout/success"
        noindex
      />

      <Header theme="light" />

      <main className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-lg mx-auto px-4 sm:px-6 py-16 text-center">
          <FadeInOnScroll>
            <OctopusMascot size={160} variant="happy" className="mx-auto" />
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.1}>
            <h1 className="font-heading font-extrabold text-navy text-3xl md:text-4xl mt-8 mb-2">
              Paldies, {name}!
            </h1>
            <p className="text-navy/60 text-lg">Pasūtījums saņemts</p>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.2}>
            <div className="mt-8 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-left space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-navy/60 font-semibold">Pasūtījuma Nr.</span>
                <span className="font-extrabold text-navy">{orderNum}</span>
              </div>
              {email && (
                <div className="flex justify-between text-sm">
                  <span className="text-navy/60 font-semibold">Apstiprinājums uz</span>
                  <span className="text-navy font-semibold">{email}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-navy/60 font-semibold">Statuss</span>
                <span className="text-teal font-bold">Maksājums saņemts</span>
              </div>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.3}>
            <div className="mt-8 p-5 bg-teal/5 rounded-2xl">
              <p className="text-sm text-navy/70 leading-relaxed">
                Apstiprinājums nosūtīts uz jūsu e-pastu. Pasūtījums tiks apstrādāts
                1–2 darba dienu laikā.
              </p>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.4}>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/veikals"
                className="flex-1 py-4 bg-navy text-white text-center rounded-2xl font-bold hover:bg-teal transition-colors"
              >
                Turpināt iepirkties
              </Link>
              <Link
                to="/konts"
                className="flex-1 py-4 border-2 border-gray-200 text-navy text-center rounded-2xl font-semibold hover:border-navy transition-colors"
              >
                Sekot pasūtījumam
              </Link>
            </div>
          </FadeInOnScroll>
        </div>
      </main>
    </>
  );
}
