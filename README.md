# 8kajis.lv — Production Web App

Vite + React 18 + TypeScript + vite-react-ssg e-commerce mājaslapa ar Bimini sensorās telpas B2B landing.

## Quick Setup

```bash
cp .env.example .env  # aizpildi env vērtības
npm install
npm run dev           # localhost:8080
npm run build         # SSG production build
vercel --prod         # deploy
```

## Env Variables

Vercel Dashboard → Settings → Environment Variables:
- `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` — Supabase project
- `VITE_STRIPE_PUBLISHABLE_KEY` — Stripe test pk_test_...
- `RESEND_API_KEY` — Resend.com (server-side)
- `STRIPE_SECRET_KEY` — Stripe secret (server-side)

## Stripe Test Cards
- `4242 4242 4242 4242` — veiksmīga apmaksa

## Demo Promo Kodi
- `BIMINI10` / `KAJIS15` / `WELCOME20`

## Custom Domain
Vercel Dashboard → Project → Domains → `8kajis.lv` primary + `www` 308 redirect

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
