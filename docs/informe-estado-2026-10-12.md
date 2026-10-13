# Informe de estado — Kapola Landing (pre-rediseño de marca)

**Fecha de análisis:** 2026-10-12 · **Rama analizada:** `main` (`878ef86`, working tree limpio) · **Producción verificada:** https://kapola.tech/

Este informe es insumo para integrar el Manual de Marca Kapola V1.2026. Es un corte de estado (solo lectura, sin cambios de código) y no sustituye al README del proyecto.

## 1. Arquitectura

| Capa | Detalle verificado |
|---|---|
| Framework | Next.js **16.3.5** (App Router), React **19.2.8** |
| Estilos | Tailwind CSS v4 (`@tailwindcss/postcss`), **sin `tailwind.config.js`** — todo el theming vive en `app/globals.css` vía `@theme`/`@utility` (v4 CSS-first) |
| Animación | `motion` 13.2.0, con `LazyMotion`/`domAnimation` en `CartProvider` y `motion/react-m` en componentes individuales |
| UI base | `@base-ui/react` (no Radix) + `class-variance-authority`, bajo convención shadcn (`components.json`, estilo `base-nova`). Uso confirmado limitado a: `Dialog`, `Input`, `Label`, `Button` (`components/ui/*`) |
| Utilidad de clases | paquete npm `cn` (no `lib/utils.ts` — ese alias en `components.json` está sin usar/obsoleto) |
| Imágenes | `next/image` con `formats: ["image/avif", "image/webp"]` en `next.config.ts` |
| Analítica | `@vercel/analytics` (`<Analytics />` en `layout.tsx` + `track()` custom en `TrackedLink` y al enviar pedido) |
| Backend / BD | **Ninguno, verificado.** Sin rutas `app/api/`, sin ORM, sin variables de entorno de datos. El "pedido" se resuelve generando una URL `api.whatsapp.com` client-side |
| Fuentes | `next/font/google`: Lobster (display, `--font-lobster`) y Nunito (sans, `--font-nunito`) |
| Hosting | Vercel, proyecto `kapola-landing`. Deploy **desconectado de GitHub a propósito** (ver §4) |

**Estructura:**
```
app/            layout.tsx, page.tsx, globals.css, icon.png*, apple-icon.png*, opengraph-image.jpg*
components/     hero, site-header, site-footer, about, community, contact, desserts, faq, gifts,
                open-status, social-links, tracked-link, reveal, quantity-stepper, icons
  cart/         cart-provider.tsx, floating-cart.tsx, order-dialog.tsx
  menu/         menu-section.tsx, product-card.tsx
  ui/           dialog.tsx, button.tsx, input.tsx, label.tsx   (shadcn)
data/menu.ts    catálogo (único archivo en data/)
lib/            site.ts, schedule.ts
scripts/        process-assets.mjs
public/images/* (generadas, no versionadas)
```
`*` no está en git (`.gitignore`).

## 2. Funcionalidades implementadas

| Funcionalidad | Dónde | Comportamiento verificado |
|---|---|---|
| Catálogo | `data/menu.ts` | 7 productos tipados + 1 addon (leche $2.500). Campos: precio, imagen, `imageStyle` (photo/cutout), `badge`, `bestseller`, `giftCard`, `pairing`, `featured` |
| Carrito | `components/cart/cart-provider.tsx` | Estado en memoria (`useState`, **sin localStorage**), tope `MAX_QTY = 50` |
| Pedido | `components/cart/order-dialog.tsx` + `lib/site.ts` (`buildOrderMessage`) | Formulario → mensaje de texto plano sin emojis → `whatsappUrl()` abre `api.whatsapp.com`. Hay enlace de respaldo si el pedido no cambió tras el primer envío |
| Tarjeta de regalo | `order-dialog.tsx` | Solo con producto `giftCard: true` (hoy solo Caja x4), gratis, "Para/De/Mensaje" (máx. 200 car.) |
| Horario abierto/cerrado | `lib/schedule.ts` + `open-status.tsx` | Calculado en cliente (zona `America/Bogota`); `null` en servidor (página estática) |
| Cotización postres/eventos | `components/desserts.tsx` | Enlaces directos a WhatsApp con mensaje prellenado, sin pasar por el carrito |
| Admin / panel | — | **No existe** (sin rutas, sin auth, sin CMS) |
| SEO | `layout.tsx`, `faq.tsx` | JSON-LD `Bakery` + `FAQPage`, metadata OpenGraph |

## 3. Diseño actual

**Tokens de color/tipografía** (`app/globals.css`, Tailwind v4 `@theme`):

| Token | Valor | Uso |
|---|---|---|
| `--color-bubblegum` | `#d6166f` | primario/acento |
| `--color-bubblegum-soft` / `-deep` | `#ee6ba5` / `#9e0d52` | hover/sombra |
| `--color-blush` / `-strong` | `#fde4ee` / `#fbcfe0` | fondos de sección |
| `--color-cream` | `#fbf6d3` | contornos/fondos secundarios |
| `--color-choco` / `-soft` | `#4a2a20` / `#6e4a3d` | texto |
| `--font-display` | Lobster | títulos (`candy-title`) |
| `--font-sans` | Nunito | cuerpo |

**Utilidades de marca propias** (todas en `globals.css`, usadas en casi todos los componentes): `candy-btn` / `candy-btn-soft`, `candy-tag`, `candy-title`, `glass` (restringido a header y carrito flotante por costo en celulares gama media, según comentario explícito en el CSS).

**Responsive:** mobile-first consistente, `prefers-reduced-motion` respetado, `MotionConfig reducedMotion="user"` global.

**Assets actuales** (`public/images/`, no versionados, generados por `scripts/process-assets.mjs` desde capturas de Instagram/fotos del cliente): logo 189 KB, mascota 115 KB — pesados para íconos/mascota recurrente.

## 4. Producción vs. repositorio

| Aspecto | Repo (`878ef86`) | Producción (`kapola.tech`) | Coincide |
|---|---|---|---|
| Texto badge hero | "Ganadores del Portafolio de Estímulos Municipales de Juventudes 2026" | Mismo texto | ✅ |
| Precios | $25.500 / $15.000 / $2.500 | Mismos valores | ✅ |
| Secciones | Hero, Menú, Postres, Regalos, Nosotros, Comunidad, FAQ, Contacto | Mismas 8 secciones | ✅ |
| Redes sociales | enlaces de `lib/site.ts` | Mismos enlaces | ✅ |
| Dominio productivo | README.md dice `kapola-landing.vercel.app` | Sitio real responde en `kapola.tech` | ⚠️ **README desactualizado** |

**Limitación:** la verificación en vivo se hizo con WebFetch, que no ejecuta JS, así que no confirma comportamiento del carrito/dialog en producción, solo contenido estático servido.

**Hallazgo de proceso:** `git tag` se detiene en `v1.5.0`, pero hay ≥6 commits reales después en `main` sin versión nueva — pendiente v1.6.0.

**No verificado:** si `kapola.tech` sigue en el mismo proyecto Vercel `kapola-landing` o es un dominio custom aparte (no se consultó CLI/panel de Vercel en esta sesión).

## 5. Estado técnico

| Área | Observación | Impacto |
|---|---|---|
| Accesibilidad | `alt`/`aria-` presentes y correctos en 18/24 componentes revisados | Bajo |
| Copy en inglés | `components/ui/dialog.tsx` (líneas ~75 y ~113) tiene "Close" (sr-only) en un sitio 100% en español | Bajo |
| `next/image` | Sin uso indebido de `priority`; hero usa `loading="eager" fetchPriority="high"` según convención del CLAUDE.md | Cumple |
| TODO/FIXME/HACK | Ninguno en código; pendientes documentados en README | — |
| Reutilización | Buena (`Reveal`, `TrackedLink`, `QuantityStepper`, `SocialLinks`, `candy-*`); sin duplicación obvia | Bajo riesgo |
| Peso de imágenes fuente | Varias >90–190 KB antes de optimización de Next | Medio — afecta LCP al retocar la marca |
| Documentación | README con URL de producción desactualizada | Bajo |
| `components.json` | Referencia `@/lib/utils`, que no existe (se usa el paquete `cn`) | Bajo, solo metadata de shadcn |

## 6. Preparación para el rediseño

| Qué cambia con la marca nueva | Archivo(s) | Riesgo |
|---|---|---|
| Paleta de colores | `app/globals.css` (`@theme`, `--color-*`) | Bajo si se mantienen los nombres de token; alto si se renombran (18+ componentes usan `bg-bubblegum`, `text-choco`, etc.) |
| Tipografías | `app/layout.tsx` (imports) + `globals.css` (`--font-display`, `--font-sans`) | Bajo, aislado a 2 archivos |
| Botones/tags/títulos "candy" | `globals.css` (`@utility candy-btn`, `candy-tag`, `candy-title`, `glass`) | Medio — es la identidad visual central |
| Logo, mascota, íconos, OG image | `scripts/process-assets.mjs`, `assets/` (fuera del repo), salida en `public/images/*`, `app/icon.png`, etc. | Medio — requiere material nuevo del cliente + volver a correr el script |
| Fotos de producto | `public/images/*.jpg` + referencias en `data/menu.ts` y cada componente | Medio, una por una |
| Tono/copy | `lib/site.ts` + copy inline en cada componente | Bajo técnicamente, requiere revisión de contenido con el cliente |
| Theme-color / metadata | `app/layout.tsx` (`viewport.themeColor`, `openGraph`) | Bajo |

**No requieren cambios** para un rediseño de marca: `data/menu.ts` (estructura de productos), `lib/schedule.ts`, `components/cart/*` (lógica de carrito/pedido), `components/ui/*` (primitivas shadcn, salvo reskinning vía tokens).

## Dudas pendientes

1. ¿El manual de marca reemplaza los tokens `candy-*`/`glass` por un sistema nuevo, o solo actualiza los valores de color/tipografía dentro de la misma estructura de utilidades?
2. ¿Hay logo/mascota/fotos nuevas en el manual, o seguimos dependiendo de `scripts/process-assets.mjs` sobre material de Instagram?
3. ¿`kapola.tech` sigue siendo el mismo proyecto Vercel (`kapola-landing`, cuenta `juansitxx`) o se migró/añadió como dominio custom?
4. ¿Se actualiza `README.md` (URL de producción) como parte de este trabajo o en otra sesión?
5. ¿El manual de marca trae el nombre oficial confirmado del reconocimiento mencionado en el hero, dado que el texto ya cambió una vez?
