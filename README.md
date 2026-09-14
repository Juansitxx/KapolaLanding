# Kapola · Landing page

One-page para Kapola (galletas artesanales, Ibagué). Los clientes arman su pedido y lo envían por WhatsApp.

**Stack:** Next.js 16 (App Router) + TypeScript · Tailwind CSS v4 · Motion · shadcn/ui (solo Dialog/Input/Label del pedido). Sin backend: el carrito vive en el estado de React.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # verificación de producción
```

## Dónde se edita cada cosa

| Qué | Archivo |
|---|---|
| Productos, precios, fotos del menú | `data/menu.ts` |
| WhatsApp, Instagram, horario, formato del mensaje | `lib/site.ts` |
| Colores, botones "candy", sombras | `app/globals.css` (`@theme` y `@utility`) |
| Textos de cada sección | `components/*.tsx` |
| Recorte/procesado de imágenes | `scripts/process-assets.mjs` |

### Imágenes

> **Las imágenes no están en el repositorio** (`assets/`, `public/images/`, `app/icon.png`, `app/apple-icon.png`, `app/opengraph-image.jpg` están en `.gitignore`). Tras clonar, copia `assets/logo/` y `assets/fotos/` y ejecuta `node scripts/process-assets.mjs`; sin eso el build falla. Por lo mismo, un despliegue en Vercel conectado a GitHub no compilará: usa la CLI (`vercel --prod`) desde este equipo, que sube los archivos locales.

Las fotos actuales son **capturas de Instagram** recortadas de forma provisional. Cuando lleguen las originales:

1. Opción rápida: reemplazar el archivo en `public/images/` con el mismo nombre.
2. Si se cambia un producto de recorte a foto, ajustar `imageStyle: "photo"` en `data/menu.ts`.
3. `node scripts/process-assets.mjs` regenera todo desde `assets/` (logo sin fondo, mascota, favicon, imagen para compartir en `app/`). **Ojo:** sobrescribe `public/images/`.

## Despliegue en Vercel

### Opción A: GitHub + Vercel (recomendada: cada push despliega solo)

1. Crear un repositorio en GitHub (puede ser privado) y subir el proyecto:
   ```bash
   git init
   git add .
   git commit -m "Landing inicial Kapola"
   git branch -M main
   git remote add origin https://github.com/<usuario>/kapola-landing.git
   git push -u origin main
   ```
2. Entrar a https://vercel.com/new, iniciar sesión con GitHub e importar el repositorio.
3. Vercel detecta Next.js solo. No hace falta configurar variables de entorno. Clic en **Deploy**.
4. En *Settings → Domains* se puede cambiar el subdominio (ej. `kapola.vercel.app`, si está libre).

### Opción B: CLI directa

```bash
npm i -g vercel
vercel login
vercel          # crea el proyecto y una URL de preview
vercel --prod   # publica la URL oficial
```

La imagen para compartir el link (Open Graph) usa automáticamente la URL de producción de Vercel.

## Checklist antes de compartir el link con el cliente

- [ ] **Logo** en PNG transparente o SVG original (el actual se sacó del JPG con fondo blanco).
- [ ] **Mascota** en PNG/SVG original (la actual está recortada del menú de Instagram, baja resolución).
- [ ] **Fotos originales** (sin interfaz de Instagram) de: torre con Nutella (hero), Chips Chocolate, Mini galletas, premio.
- [ ] **Fotos individuales** de Red Velvet, Cheesecake de Maracuyá y Oreo (hoy son recortes circulares del menú gráfico).
- [ ] Imagen propia para **Galleta de Temporada** (hoy es la galleta "?" del menú).
- [ ] Galería "Así se vive Kapola": fotos en mejor resolución y **permiso de las personas que aparecen** (clienta en feria, clienta con gorra Dulzura Lovers).
- [ ] Revisar y aprobar el texto de **Sobre nosotros** (borrador en `components/about.tsx`).
- [ ] Confirmar el nombre oficial del premio que aparece en el hero y en el pie de foto.
- [ ] Probar un pedido real desde el celular de alguien de Kapola.
