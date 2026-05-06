import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import JsonLd, { organizationSchema, breadcrumbSchema } from "@/components/JsonLd";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import CountUp from "@/components/animations/CountUp";
import OctopusMascot from "@/components/OctopusMascot";

const VALUES = [
  {
    icon: "🌱",
    title: "Attīstība",
    desc: "Ticam, ka katra rotaļlieta var būt solis uz izpratni, radošumu un mīlestību pret mācīšanos.",
  },
  {
    icon: "♿",
    title: "Iekļaušana",
    desc: "Bimini sensorā telpa ir pieejama visiem — neatkarīgi no vecuma vai spējām.",
  },
  {
    icon: "🌿",
    title: "Ilgtspēja",
    desc: "Priekšroku dodām ilgtspējīgiem, kvalitatīviem materiāliem, kas kalpo gadiem.",
  },
];

const STATS = [
  { value: 15, suffix: "+", label: "Sensorās telpas Latvijā" },
  { value: 500, suffix: "+", label: "Apmierinātas ģimenes" },
  { value: 8, suffix: "", label: "Gadi tirgū" },
  { value: 200, suffix: "+", label: "Produkti veikalā" },
];

export default function ParMums() {
  return (
    <>
      <SEO
        title="Par mums — 8kajis.lv"
        description="8kajis.lv ir latvijas vadošais attīstošo rotaļlietu veikals un sensorās telpas Bimini iekārtotājs. Beleduc oficiālais partneris kopš 2018. gada."
        path="/par-mums"
        lastModified="2026-05-05"
      />
      <JsonLd data={organizationSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Sākums", url: "https://8kajis.lv/" },
          { name: "Par Mums", url: "https://8kajis.lv/par-mums" },
        ])}
      />

      <Header theme="light" />

      <main className="pt-20">
        {/* Hero */}
        <section className="bg-navy py-20 px-4 sm:px-6 lg:px-8" aria-labelledby="about-h1">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <OctopusMascot size={140} variant="landing" />
            </div>
            <h1 id="about-h1" className="font-heading font-extrabold text-white text-3xl md:text-4xl mb-5">
              Par 8kajis.lv
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Mēs esam Latvijas attīstošo rotaļlietu speciālisti un sensorās telpas Bimini
              veidotāji Ķekavā. Mūsu misija — darīt attīstību pieejamu un baudāmu katrai ģimenei
              un iestādei.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section
          className="bg-gray-50 py-14 px-4 sm:px-6 lg:px-8"
          aria-label="Mūsu statistika"
        >
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <FadeInOnScroll key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <p className="font-heading font-extrabold text-teal text-3xl md:text-4xl">
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-navy/60 text-sm mt-1">{stat.label}</p>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="py-20 px-4 sm:px-6 lg:px-8" aria-labelledby="story-title">
          <div className="max-w-3xl mx-auto">
            <FadeInOnScroll>
              <h2 id="story-title" className="font-heading font-700 text-navy text-2xl md:text-3xl mb-6">
                Mūsu stāsts
              </h2>
              <div className="prose prose-navy max-w-none space-y-5 text-navy/80 leading-relaxed">
                <p>
                  8kajis.lv sāka darbību Ķekavā ar vienu mērķi — piedāvāt Latvijas ģimenēm
                  augstas kvalitātes attīstošas rotaļlietas, ko ir pārdomāti izstrādājuši
                  izglītības un attīstības eksperti.
                </p>
                <p>
                  2020. gadā pievienojam jaunu dimensiju — Bimini sensorā telpa. Balstoties
                  Snoezelen metodoloģijā, kas izstrādāta Nīderlandē pirms 30+ gadiem, mēs
                  veidojam multisensoras vides bērniem un pieaugušajiem ar dažādām vajadzībām.
                </p>
                <p>
                  Šodien esam Beleduc — pasaules vadošā attīstošo spēļu ražotāja — oficiālais
                  partneris Latvijā, un esam iekārtojuši sensorās telpas vairāk nekā 15 Latvijas
                  izglītības un rehabilitācijas iestādēs.
                </p>
              </div>
            </FadeInOnScroll>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50" aria-labelledby="values-title">
          <div className="max-w-5xl mx-auto">
            <FadeInOnScroll>
              <h2 id="values-title" className="font-heading font-700 text-navy text-2xl md:text-3xl text-center mb-14">
                Mūsu vērtības
              </h2>
            </FadeInOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {VALUES.map((v, i) => (
                <FadeInOnScroll key={v.title} delay={i * 0.12}>
                  <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
                    <span className="text-4xl block mb-4" aria-hidden="true">{v.icon}</span>
                    <h3 className="font-heading font-700 text-navy text-lg mb-3">{v.title}</h3>
                    <p className="text-navy/60 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
          <FadeInOnScroll>
            <h2 className="font-heading font-extrabold text-navy text-2xl md:text-3xl mb-5">
              Iepazīsti mūsu produktus
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/veikals"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all hover:-translate-y-0.5 shadow-lg"
                style={{ background: "#E8813A", color: "#1A0A00" }}
              >
                Doties uz veikalu →
              </Link>
              <Link
                to="/sensora-telpa"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold border-2 border-navy text-navy transition-all hover:-translate-y-0.5 hover:bg-navy hover:text-white"
              >
                Sensorā telpa Bimini
              </Link>
            </div>
          </FadeInOnScroll>
        </section>
      </main>

      <Footer />
    </>
  );
}
