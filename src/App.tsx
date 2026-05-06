// App.tsx — kept for CSR compatibility (build:csr mode)
// SSG mode uses main.tsx → ViteReactSSG → routes.tsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SmoothScroll from "@/components/animations/SmoothScroll";
import CartDrawer from "@/components/CartDrawer";

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
        <h1 className="font-heading font-700 text-2xl text-navy mb-3">Lapa nav atrasta</h1>
        <a href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-white rounded-2xl font-bold">
          Uz sākumu →
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <CartDrawer />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/veikals" element={<Veikals />} />
          <Route path="/veikals/:slug" element={<Produkts />} />
          <Route path="/grozs" element={<Grozs />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/sensora-telpa" element={<SensoraTelpa />} />
          <Route path="/par-mums" element={<ParMums />} />
          <Route path="/kontakti" element={<Kontakti />} />
          <Route path="/konts" element={<Konts />} />
          <Route path="/privatuma-politika" element={<PrivatumaPolitika />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  );
}
