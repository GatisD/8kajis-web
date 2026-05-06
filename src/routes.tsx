import type { RouteObject } from "react-router-dom";
import SmoothScroll from "@/components/animations/SmoothScroll";
import CartDrawer from "@/components/CartDrawer";

// Pages
import Landing from "@/pages/Landing";
import Veikals from "@/pages/Veikals";
import Produkts from "@/pages/Produkts";
import Grozs from "@/pages/Grozs";
import Checkout from "@/pages/Checkout";
import CheckoutSuccess from "@/pages/CheckoutSuccess";
import SensoraTelpa from "@/pages/SensoraTelpa";
import ParMums from "@/pages/ParMums";
import Kontakti from "@/pages/Kontakti";
import Konts from "@/pages/Konts";
import PrivatumaPolitika from "@/pages/PrivatumaPoolitika";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-4">
      <div>
        <p className="font-heading font-extrabold text-navy text-8xl mb-4">404</p>
        <h1 className="font-heading font-700 text-2xl text-navy mb-3">
          Lapa nav atrasta
        </h1>
        <p className="text-navy/60 mb-8">
          Šāda lapa neeksistē vai ir pārvietota.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-white rounded-2xl font-bold hover:bg-teal transition-colors"
        >
          Uz sākumu →
        </a>
      </div>
    </div>
  );
}

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <CartDrawer />
      {children}
    </SmoothScroll>
  );
}

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout><Landing /></RootLayout>,
  },
  {
    path: "/veikals",
    element: <RootLayout><Veikals /></RootLayout>,
  },
  {
    path: "/veikals/:slug",
    element: <RootLayout><Produkts /></RootLayout>,
  },
  {
    path: "/grozs",
    element: <RootLayout><Grozs /></RootLayout>,
  },
  {
    path: "/checkout",
    element: <RootLayout><Checkout /></RootLayout>,
  },
  {
    path: "/checkout/success",
    element: <RootLayout><CheckoutSuccess /></RootLayout>,
  },
  {
    path: "/sensora-telpa",
    element: <RootLayout><SensoraTelpa /></RootLayout>,
  },
  {
    path: "/par-mums",
    element: <RootLayout><ParMums /></RootLayout>,
  },
  {
    path: "/kontakti",
    element: <RootLayout><Kontakti /></RootLayout>,
  },
  {
    path: "/konts",
    element: <RootLayout><Konts /></RootLayout>,
  },
  {
    path: "/privatuma-politika",
    element: <RootLayout><PrivatumaPolitika /></RootLayout>,
  },
  {
    path: "*",
    element: <RootLayout><NotFound /></RootLayout>,
  },
];
