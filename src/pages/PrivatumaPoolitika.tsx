import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";

export default function PrivatumaPolitika() {
  return (
    <>
      <SEO
        title="Privātuma politika — 8kajis.lv"
        description="8kajis.lv privātuma politika — kā mēs apstrādājam jūsu personas datus."
        path="/privatuma-politika"
        lastModified="2026-05-05"
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Sākums", url: "https://8kajis.lv/" },
          { name: "Privātuma politika", url: "https://8kajis.lv/privatuma-politika" },
        ])}
      />

      <Header theme="light" />

      <main className="pt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="font-heading font-extrabold text-navy text-3xl mb-3">
            Privātuma politika
          </h1>
          <p className="text-navy/50 text-sm mb-10">
            Pēdējo reizi atjaunota: 2026. gada 1. maijā
          </p>

          <div className="prose max-w-none space-y-8 text-navy/80 leading-relaxed">

            <section aria-labelledby="controller-title">
              <h2 id="controller-title" className="font-heading font-700 text-navy text-xl mb-3">
                1. Pārzinis
              </h2>
              <p>
                Personas datu pārzinis ir 8kajis.lv (Nākotnes iela 2, Ķekava, LV-2123, Latvija).
                Sazinieties ar mums: <a href="mailto:info@8kajis.lv" className="text-teal underline">info@8kajis.lv</a> vai
                pa tālruni <a href="tel:+37120009028" className="text-teal underline">+371 20009028</a>.
              </p>
            </section>

            <section aria-labelledby="data-title">
              <h2 id="data-title" className="font-heading font-700 text-navy text-xl mb-3">
                2. Kādus datus mēs apkopojam?
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>Kontaktinformācija (vārds, e-pasts, tālrunis) — pasūtījuma apstrādei</li>
                <li>Piegādes adrese — pasūtījuma izpildei</li>
                <li>Maksājumu dati — apstrādā Stripe (PCI DSS sertificēts), mēs neglabājam kartes datus</li>
                <li>IP adrese un sīkdatnes — mājaslapas darbības nodrošināšanai</li>
              </ul>
            </section>

            <section aria-labelledby="purpose-title">
              <h2 id="purpose-title" className="font-heading font-700 text-navy text-xl mb-3">
                3. Kādam nolūkam mēs apstrādājam datus?
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>Pasūtījuma apstrādei un piegādei (juridiskais pamats: līgums)</li>
                <li>Klientu apkalpošanai (juridiskais pamats: leģitīmās intereses)</li>
                <li>Juridisko saistību izpildei (juridiskais pamats: juridisks pienākums)</li>
                <li>Mājaslapas analīzei, ja esat devis piekrišanu (GA4)</li>
              </ul>
            </section>

            <section aria-labelledby="retention-title">
              <h2 id="retention-title" className="font-heading font-700 text-navy text-xl mb-3">
                4. Cik ilgi mēs glabājam datus?
              </h2>
              <p className="text-sm">
                Pasūtījuma dati — 7 gadi (atbilstoši grāmatvedības prasībām). Kontaktformu dati —
                2 gadi. Analītika — 14 mēneši (GA4 noklusējums).
              </p>
            </section>

            <section aria-labelledby="rights-title">
              <h2 id="rights-title" className="font-heading font-700 text-navy text-xl mb-3">
                5. Jūsu tiesības
              </h2>
              <p className="text-sm mb-3">Saskaņā ar VDAR jums ir tiesības:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Piekļūt saviem datiem</li>
                <li>Labot neprecīzus datus</li>
                <li>Dzēst savus datus ("tiesības tikt aizmirstam")</li>
                <li>Ierobežot apstrādi</li>
                <li>Atsaukt piekrišanu jebkurā laikā</li>
                <li>Iesniegt sūdzību Datu valsts inspekcijā (www.dvi.gov.lv)</li>
              </ul>
            </section>

            <section aria-labelledby="cookies-title">
              <h2 id="cookies-title" className="font-heading font-700 text-navy text-xl mb-3">
                6. Sīkdatnes
              </h2>
              <p className="text-sm">
                Mēs izmantojam nepieciešamās sīkdatnes mājaslapas darbībai (groza saglabāšanai).
                Analītiskās sīkdatnes (GA4) tiek aktivizētas tikai ar jūsu piekrišanu.
                Vairāk: Google Analytics <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-teal underline">privātuma politika</a>.
              </p>
            </section>

            <section aria-labelledby="contact-dpo-title">
              <h2 id="contact-dpo-title" className="font-heading font-700 text-navy text-xl mb-3">
                7. Kontakts
              </h2>
              <p className="text-sm">
                Jautājumos par personas datu apstrādi sazinieties:{" "}
                <a href="mailto:info@8kajis.lv" className="text-teal underline">info@8kajis.lv</a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
