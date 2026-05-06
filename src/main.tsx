import { ViteReactSSG } from "vite-react-ssg";
import { HelmetProvider } from "react-helmet-async";
import "@/i18n";
import "./index.css";
import { routes } from "./routes";

export const createRoot = ViteReactSSG(
  { routes },
  ({ isClient: _isClient }) => {
    // Setup runs on both client and server
    // HelmetProvider wrapped via routes layout
  }
);
