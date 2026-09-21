# Kapola · Landing page

Landing one-page de **Kapola**, galletas artesanales en Ibagué. Los clientes arman su pedido en la web y lo envían por WhatsApp con sus datos.

**Producción:** https://kapola-landing.vercel.app

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) con tokens de marca en `app/globals.css`
- [Motion](https://motion.dev) para animaciones cortas y con propósito
- [shadcn/ui](https://ui.shadcn.com) solo para el formulario del pedido (Dialog, Input, Label)
- Sin backend: el carrito vive en el estado de React y el pedido se resuelve por WhatsApp
- Despliegue en [Vercel](https://vercel.com), con [Vercel Analytics](https://vercel.com/docs/analytics) para las visitas (los eventos personalizados, como `pedido_enviado`, solo se registran en el plan Pro)

## Requisitos

- Node.js 20.9 o superior
- npm
- Las imágenes de la marca (no están en el repositorio, ver [Imágenes](#imágenes))

## Puesta en marcha

```bash
npm install
npm run assets                    # genera public/images/ e íconos desde assets/
npm run dev                       # http://localhost:3000
```

| Script | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción (verificación antes de desplegar) |
| `npm run start` | Sirve el build de producción |
| `npm run lint` | ESLint |
| `npm run assets` | Genera las imágenes procesadas desde `assets/` |

## Estructura

La página (`app/page.tsx`) muestra, en orden: Inicio, Menú, Postres por encargo, Regalos, Nosotros, Comunidad, Preguntas frecuentes y Contacto.

```
app/                  layout, página, estilos globales e íconos generados
components/           secciones de la landing (hero, desserts, gifts, about, community, faq, contact…)
  cart/               estado del carrito, barra flotante y formulario del pedido
  menu/               catálogo y tarjeta de producto
  ui/                 componentes de shadcn/ui
data/menu.ts          productos, precios y fotos del menú
lib/site.ts           WhatsApp, Instagram, horario y formato del mensaje del pedido
lib/schedule.ts       lógica de abierto/cerrado (hora de Colombia)
scripts/              procesado de imágenes
```

### Dónde se edita cada cosa

| Qué | Archivo |
|---|---|
| Productos, precios, fotos del menú | `data/menu.ts` |
| Pasos de "cómo pedir" sobre el menú | `components/menu/menu-section.tsx` |
| Postres por encargo y tarjeta de eventos | `components/desserts.tsx` |
| Preguntas frecuentes (y sus datos estructurados para Google) | `components/faq.tsx` |
| Enlaces del header | `components/site-header.tsx` |
| Redes sociales (contacto y pie de página) | `components/social-links.tsx` y `lib/site.ts` |
| Número de WhatsApp, Instagram, mensaje del pedido | `lib/site.ts` |
| Horario de atención | `lib/schedule.ts` y `lib/site.ts` |
| Colores, botones "candy", sombras | `app/globals.css` (`@theme` y `@utility`) |
| Textos de cada sección | `components/*.tsx` |
| Recortes de las fotos | `scripts/process-assets.mjs` |

## Imágenes

Las imágenes **no se versionan** para que las fotos del cliente no queden públicas en GitHub. Están en `.gitignore`: `assets/`, `public/images/`, `app/icon.png`, `app/apple-icon.png` y `app/opengraph-image.jpg`.

1. Coloca las fuentes originales en `assets/logo/` y `assets/fotos/`.
2. Ejecuta `npm run assets`. Quita el fondo del logo, recorta la mascota y las fotos (incluidas capturas de Instagram, sin la interfaz), y genera el favicon (192 px, ~18 KB) y la imagen para compartir. Sobrescribe `public/images/`.
3. Sin este paso el build falla, porque los componentes importan las imágenes de forma estática.

### Contenido del cliente

`assets/` también guarda el material que envía Kapola, fuera de GitHub porque puede incluir nombres y opiniones de clientes:

| Ruta | Qué va |
|---|---|
| `assets/contenido.md` | Plantilla para rellenar: sabores y alérgenos, precios de postres, conservación, domicilio, opiniones y datos pendientes. Lo que quede vacío no se publica. |
| `assets/opiniones/` | Capturas de opiniones de clientes (con permiso). |
| `assets/videos/` | Video vertical corto de una galleta partida. |

Los textos de la web solo usan datos confirmados: lo que falta se pide en `contenido.md`, no se inventa.

## Flujo de trabajo con ramas

| Rama | Propósito |
|---|---|
| `main` | **Producción.** Refleja lo que está publicado en Vercel. Solo recibe merges desde `develop`. |
| `develop` | **Desarrollo.** Integra los cambios antes de pasar a producción. |
| `feature/<nombre>` | Una rama por cambio, creada desde `develop` (ej. `feature/foto-red-velvet`). |
| `fix/<nombre>` | Correcciones, también desde `develop`. |

```bash
git checkout develop && git pull
git checkout -b feature/mi-cambio
# ... cambios ...
git commit -m "feat(menu): agrega foto de Red Velvet"
git push -u origin feature/mi-cambio
# abrir Pull Request feature/mi-cambio -> develop
# cuando develop esté probado: Pull Request develop -> main y desplegar
# después del merge, borrar la rama: git branch -d feature/mi-cambio && git push origin --delete feature/mi-cambio
```

Los mensajes de commit siguen [Conventional Commits](https://www.conventionalcommits.org/es/): `feat`, `fix`, `docs`, `style`, `refactor`, `chore`.

## Despliegue

Como las imágenes no están en GitHub, **Vercel no se conecta al repositorio**: se despliega con la CLI desde un equipo que tenga las imágenes.

```bash
npx vercel login                   # solo la primera vez en cada equipo
git checkout main && git pull
npm run build                      # verificar que compila
npx vercel deploy --prod           # publica https://kapola-landing.vercel.app
npx vercel deploy                  # (opcional) URL de preview para revisar antes
```

`.vercelignore` evita subir las fotos originales de `assets/`. Solo se suben las versiones procesadas.

## Pendientes de contenido

- [ ] Que Kapola rellene `assets/contenido.md` (sabores, alérgenos, precios de postres, opiniones de clientes).
- [ ] Confirmar las descripciones de los **postres** (`components/desserts.tsx`): salieron de las fotos y de un post de Instagram.
- [ ] Foto original de **Chips Chocolate** partida: la actual es una captura de Instagram de 400 px.
- [ ] Foto propia de **Red Velvet** (hoy es un recorte circular del menú gráfico).
- [ ] **Logo** y **mascota** en PNG/SVG originales (los actuales se extrajeron de un JPG y de una captura).
- [ ] Fotos sin el sticker del vaso, que muestra un número distinto al oficial (+57 324 378 6221).
- [ ] Galería "Así se vive Kapola": mejor resolución y permiso de las personas que aparecen.
- [ ] Aprobar el texto de **Sobre nosotros** (`components/about.tsx`).
- [ ] Confirmar el nombre oficial del premio.
- [ ] Recoger el feedback del cliente sobre la versión publicada.
