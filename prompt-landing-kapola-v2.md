# Prompt final para Claude Code / Codex — Landing Page Kapola (v2)

> Copia y pega el bloque de código en Claude Code o Codex. Los datos ya están completos —
> solo te faltan adjuntar los archivos de imagen que se indican con 📎.

---

```
Quiero que construyas una landing page de una sola página (one-page scroll) para
Kapola, un emprendimiento real de galletas artesanales y postres en Ibagué,
Colombia. El objetivo es darles presencia web profesional y permitir que los
clientes armen un pedido que se envíe por WhatsApp con sus datos.

ANTES DE ESCRIBIR CÓDIGO: hazme preguntas de aclaración una por una sobre
cualquier cosa que no esté especificada abajo. No generes código hasta que
yo confirme cada punto ambiguo.

## Identidad de marca (fuente de verdad — no inventes otra estética)

- Nombre: Kapola
- Eslogan real de la marca (úsalo tal cual, es su frase oficial):
  "El sabor que te llena el corazón"
- Logo: wordmark "Kapola" en letra script/cursiva con efecto 3D glossy tipo
  "candy/bubblegum" — relleno rosa magenta con brillos y reflejos como si
  fuera goma de mascar o un globo inflado, contorno crema/hueso alrededor
  que le da profundidad, y un swoosh/trazo rosa debajo a modo de firma
  dinámica. Es un estilo Y2K glossy — úsalo como dirección estética para
  TODA la página, no solo como logo aislado: replica ese brillo/profundidad
  en botones, tags de precio y elementos interactivos (ej. box-shadow con
  highlight superior tipo "candy button", bordes redondeados gruesos) para
  que el sitio se sienta cohesivo con la marca en vez de un diseño plano
  genérico con el logo pegado encima.
  El archivo está en `./assets/logo/kapola-logo.png`. Léelo directamente
  desde ahí y úsalo en el proyecto (cópialo a la carpeta de assets públicos
  que corresponda según el framework, ej. `/public/images/`). Si el fondo no
  es transparente, avísame antes de continuar en vez de asumir que sí lo es.
- Mascota: personaje de galleta caricaturizado, expresivo, manos que a veces
  forman un corazón. Aparece en empaques (vasos, cajas) y en contenido de
  redes. Úsalo como elemento recurrente (favicon, hero, loading state,
  footer) — es el activo diferenciador más fuerte, no lo escondas.
- Paleta de color: rosa magenta/chicle como color primario, rosa pastel como
  fondo secundario, acento oscuro (marrón/chocolate) para detalles. Evita
  degradados morado-azul genéricos de "IA": un color dominante + un acento.
- Tipografía: script/cursiva redondeada y juguetona para títulos (que
  combine con el estilo del logo — busca algo como "Pacifico", "Lobster" o
  similar en Google Fonts, no una script fina/elegante), sans-serif limpia
  y legible para el cuerpo. Evita Inter/system-ui por defecto.
- Dirección de diseño general: apunta a un look "Y2K glossy / candy" —
  elementos con volumen, brillos sutiles (highlights tipo glossmorphism),
  bordes redondeados generosos, sombras suaves con color (no grises planos).
  Esto es una tendencia visual vigente y le da personalidad real a la marca
  en vez de un diseño SaaS plano genérico.
- Estilo fotográfico real de la marca (variado, tienen buen banco de fotos):
  - Producto en fondo de plantas verdes + rejilla de madera, luz natural
  - Galletas rellenas con centro derretido de chocolate/Nutella
  - Vasos de "mini galletas" y "New York style" con dip de chocolate
  - Cheesecakes (de frutos rojos, sin azúcar)
  - Postres tipo sundae (helado + galleta + fresas)
  - Fotos de eventos/ferias locales donde han tenido stand
  - Foto de ellos recibiendo un premio de emprendimiento municipal
    ($10.000.000 COP) — úsala como sello de confianza/badge, no como noticia
    aislada
  - Contenido de redes con humor y personalidad (memes, referencias pop tipo
    cartas UNO, mascotas reales como un perro/gato)
  Las fotos seleccionadas están en `./assets/fotos/` (varios archivos).
  Léelas todas de esa carpeta y distribúyelas en las secciones donde tengan
  más sentido narrativo (no las metas todas en un solo carrusel al final).
- Tono de copy: cercano, dulce, divertido, con humor colombiano/local. Nada
  de lenguaje corporativo genérico tipo "la mejor calidad del mercado".
- Prueba social a destacar: ganadores de premio municipal de emprendimiento,
  presencia activa en ferias de Ibagué (ej. Lechona Run), comunidad activa
  en redes sociales (@kapola_ibague).

## Estructura de la página (una sola página, scroll)

1. **Header fijo**: logo + nombre + botón de WhatsApp siempre visible.

2. **Hero**: foto/mascota protagonista, el eslogan "El sabor que te llena el
   corazón" como headline o subrayado visual, CTA que baja al menú. Considera
   un pequeño badge o mención sutil del premio de emprendimiento como prueba
   social (sin que se vea como autobombo forzado).

3. **Menú / Catálogo** — usa exactamente estos productos y precios:
   | Producto | Precio | Detalle |
   |---|---|---|
   | Chips Chocolate | $6.000 | Galleta de 85 gr |
   | Red Velvet | $6.000 | Galleta de 85 gr |
   | Cheesecake de Maracuyá | $6.000 | Galleta de 85 gr |
   | Oreo | $6.000 | Galleta de 85 gr |
   | Galleta de Temporada | $7.000 | Sabor sorpresa y rotativo (marca esto
   visualmente como "edición limitada" — genera urgencia real, cambia seguido) |
   | Mini galletas (combo x3) | $15.000 | Galletas de 45 gr, sabores clásicos |

   Cada producto es una card con foto, nombre, precio, selector de cantidad
   (+/-) y botón "Agregar al pedido".

4. **Carrito flotante / resumen de pedido**: estado acumulado en React state
   o JS puro (sin localStorage). Muestra cantidad total y subtotal en tiempo
   real. Botón "Finalizar pedido" abre un mini-formulario (no un checkout
   completo, solo 2 campos):
   - Nombre del cliente
   - Dirección de entrega
   (NO pidas número de teléfono — ya se obtiene automáticamente al escribir
   por WhatsApp).

5. **Botón "Enviar pedido por WhatsApp"**: al confirmar el mini-formulario,
   construye un link `https://wa.me/573243786221?text=...` con mensaje
   prellenado (URL-encoded) tipo:
   ```
   ¡Hola Kapola! 🍪 Quiero hacer este pedido:
   - 2x Chips Chocolate ($12.000)
   - 1x Red Velvet ($6.000)
   Total: $18.000

   Nombre: [nombre ingresado]
   Dirección de entrega: [dirección ingresada]
   ```
   Si el carrito está vacío, deshabilita el botón. Menciona cerca del botón
   que el costo del domicilio varía según la zona dentro de Ibagué y se
   confirma por WhatsApp.

6. **Sobre nosotros**: 2-3 párrafos con la personalidad real de la marca
   (emprendimiento local de Ibagué, premiado, presencia en ferias, pasión por
   la repostería casera). Genera un borrador editable — lo ajustamos después
   con el texto real que ellos definan.

7. **Ubicación y contacto**:
   - Modalidad: sin punto físico de atención al público, funcionan 100% bajo
     pedido con entrega a domicilio
   - Cobertura: toda la zona urbana de Ibagué, costo de domicilio variable
     según la zona (se confirma por WhatsApp)
   - Horario de atención: Lunes a sábado, 9:00 AM a 8:00 PM
   - Métodos de pago: aceptan todos los métodos (efectivo, transferencia,
     Nequi, Daviplata, tarjeta, etc.) — puedes escribirlo así de general o
     con iconos genéricos de "pago seguro/flexible"
   - Instagram: @kapola_ibague (link directo al perfil)
   - WhatsApp: +57 324 378 6221

8. **Footer**: logo pequeño, redes sociales, año, sin relleno innecesario.

## Assets del proyecto (ya están en disco, no los pidas por chat)

Antes de generar código, lee estos archivos directamente del sistema de
archivos del proyecto:
- `./assets/logo/kapola-logo.png` — logo oficial
- `./assets/fotos/` — carpeta con las fotos reales seleccionadas

## Stack técnico (usa exactamente este, no propongas otro)

- **Next.js (App Router) + TypeScript** — es el estándar actual para sitios
  desplegados en Vercel: optimización de imágenes automática (clave para un
  sitio con tantas fotos de producto), buen SEO out-of-the-box, y deja la
  puerta abierta a escalar después (blog, panel de administración para que
  ellos mismos editen el menú, checkout real) sin reescribir el proyecto.
- **Tailwind CSS v4** para todo el styling — es el approach de CSS con mayor
  soporte de las herramientas de IA para código (Claude Code y Codex lo
  generan de forma mucho más consistente que CSS a mano), y permite definir
  la paleta y los "candy shadows" de la marca como tokens reutilizables en
  la config.
- **Motion** (antes "Framer Motion") para las animaciones: scroll-reveal en
  las secciones, micro-interacciones al agregar productos al carrito
  (rebote/bounce del ícono), transición suave del mini-formulario de pedido.
  Mantén las animaciones cortas (~200-300ms) y con propósito — cada
  animación debe responder una pregunta del usuario (ej. "¿se agregó al
  carrito?"), no ser decorativa porque sí.
- **shadcn/ui** solo para el componente del mini-formulario de pedido
  (Dialog/Drawer) — te da accesibilidad correcta (foco, cierre con Escape,
  etc.) sin que tengas que programarla desde cero. No lo uses para todo el
  sitio, solo donde de verdad ahorra trabajo.
- Opcional pero recomendado para el header fijo y el carrito flotante: un
  efecto sutil de "vidrio" (`backdrop-filter: blur()` + fondo semitransparente
  + un borde superior con highlight) — es la evolución actual del
  glassmorphism y funciona muy bien encima de fondos con fotos, dando
  sensación de profundidad sin competir con el estilo "candy" del logo.
  Úsalo con moderación (máximo 1-2 elementos con este efecto) por costo de
  rendimiento en celulares gama media, que es el dispositivo real de la
  mayoría de sus clientes.
- Nada de backend, base de datos ni autenticación — el "carrito" vive solo
  en el estado de React de la sesión, y el pedido se resuelve por WhatsApp.
  No sobre-construyas esto.
- El catálogo de productos debe vivir en un archivo de datos simple
  (`data/menu.ts` o similar), separado del código de UI, para que en el
  futuro sea fácil actualizarlo (o migrarlo a un CMS) sin tocar el diseño.

## Requisitos técnicos generales

- Mobile-first real: la mayoría de pedidos llegan desde el celular.
- Sin degradados morados, sin iconos de emoji genéricos, sin estructura de
  plantilla "hero + 3 features + testimonios" — usa la mascota, la paleta y
  las fotos reales para darle identidad propia.
- Performance: usa `next/image` para todas las fotos, sin librerías pesadas
  innecesarias. Objetivo: buen puntaje en Core Web Vitals en mobile, no solo
  en desktop.
- Accesibilidad básica: contraste correcto, alt text, jerarquía de encabezados.
- El deploy será en Vercel (aún no tienen dominio propio, así que el link
  de Vercel será la URL "oficial" por ahora) — déjalo listo para desplegar
  con `vercel deploy` o instrucciones claras de conexión del repo a Vercel.

## Entrega

1. Resumen de decisiones de diseño que tomaste y por qué.
2. Código completo, organizado en archivos claros.
3. Instrucciones paso a paso para desplegar en Vercel.
4. Checklist de qué contenido (fotos, textos finales) sigue pendiente de
   reemplazar antes de compartir el link con el cliente final.
```

---

## Antes de correr el prompt, prepara la carpeta local

1. Crea una carpeta para el proyecto, ej. `kapola-landing/`
2. Dentro, crea `assets/logo/` y pon ahí `kapola-logo.png`
3. Dentro, crea `assets/fotos/` y pon ahí las 5-8 fotos seleccionadas
   (recomiendo: la galleta con centro derretido, el vaso de mini galletas,
   el plato de galletas con leche, el cheesecake, y la foto del premio de
   emprendimiento)
4. Abre esa carpeta en Claude Code o Codex (`cd kapola-landing` y luego el
   comando de la herramienta) y ahí sí pega el prompt completo

## Pendientes de tu lado (no técnicos)

- [ ] Confirmar si el logo tiene fondo transparente
- [ ] Texto final de "Sobre nosotros" si ya tienen uno escrito (si no, el
      prompt le pide a la IA que proponga un borrador)
