@AGENTS.md

# Kapola landing

- Fuente de requisitos: `prompt-landing-kapola-v2.md`. Stack fijo: Next 16 App Router, Tailwind v4, Motion (`motion/react-m` + LazyMotion), shadcn solo para el Dialog del pedido.
- Catálogo en `data/menu.ts`; WhatsApp/IG/formato del mensaje en `lib/site.ts`. Sin backend ni localStorage.
- Tokens de marca y utilidades `candy-btn`, `candy-btn-soft`, `candy-tag`, `candy-title`, `glass` en `app/globals.css`. `glass` solo en header y carrito flotante.
- En `next/image` usar `preload` (no `priority`). Copy en español colombiano, cercano y con humor.
- Imágenes provisionales generadas por `scripts/process-assets.mjs` (sobrescribe `public/images/`).
