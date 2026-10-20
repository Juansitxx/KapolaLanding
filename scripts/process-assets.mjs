// Genera public/images/* y los íconos de app/ a partir de ./assets.
// Mezcla fotos profesionales con capturas de Instagram recortadas (provisionales).
import sharp from "sharp";
import { mkdir, rm } from "node:fs/promises";

const OUT = "public/images";
const FOTOS = "assets/fotos";
const shot = (name) => `${FOTOS}/WhatsApp Image 2026-09-13 at ${name}.jpeg`;

// Capturas de Instagram
const GRID = shot("7.52.23 PM");
const AWARD = shot("7.52.24 PM (1)");
const MINI = shot("7.52.24 PM (2)");
const MENU = shot("7.52.24 PM (4)");

// Fotos nuevas
const OREO_LECHE = shot("9.27.23 PM");
const MARACUYA = shot("9.27.23 PM (1)");
const PLATO = shot("9.27.23 PM (2)");
const LECHONA_RUN = shot("9.27.23 PM (3)");
const COCO = shot("9.27.24 PM");
const FRESA = shot("9.27.24 PM (1)");
const REGALO_CUMPLE_MAMA = shot("9.57.10 PM");
const REGALO_GYM = shot("9.57.10 PM (2)");
const REGALO_MADRES = shot("9.58.32 PM (1)");
const STAND_VALIENTES = shot("9.58.33 PM");

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const crop = (src, left, top, width, height) =>
  sharp(src).extract({ left, top, width, height });

const saveJpg = (img, name) =>
  img.jpeg({ quality: 88, mozjpeg: true }).toFile(`${OUT}/${name}.jpg`);

async function circle(src, cx, cy, r, name) {
  const size = r * 2;
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${r}" cy="${r}" r="${r}" fill="#fff"/></svg>`,
  );
  await crop(src, cx - r, cy - r, size, size)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toFile(`${OUT}/${name}.png`);
}

// --- Marca oficial (Manual V1.2026) -------------------------------------
// Los PNG de assets/marca vienen con canvas sobrante: se recortan al contenido.
const MARCA = "assets/marca";
const marca = (n) => sharp(`${MARCA}/PERSONAJES-${n}.png`).trim({ threshold: 1 });

const savePng = (img, name, width) =>
  img.resize({ width }).png({ palette: true, quality: 95 }).toFile(`${OUT}/${name}.png`);

// El lockup oficial ya trae contorno blanco: funciona igual sobre claro y sobre rosa.
await savePng(marca("01"), "logo", 1000);
await savePng(marca("08"), "galleta", 400);
await savePng(marca("07"), "galleta-crema", 400);
await savePng(marca("06"), "mascota", 520); // bulldog oficial, reemplaza el recorte del menú
await savePng(marca("03"), "equipo", 900);
await savePng(marca("02"), "equipo-busto", 900);
await savePng(marca("04"), "laura", 520);
await savePng(marca("05"), "juan", 520);

// Versión en línea blanca de los personajes, como la franja del membrete (p. 22):
// el trazo rosa pasa a blanco y los rellenos claros se vacían.
async function aLineaBlanca(img) {
  const { data, info } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const esTrazo = data[i] - data[i + 2] > 20 && data[i + 3] > 40;
    if (esTrazo) {
      data[i] = data[i + 1] = data[i + 2] = 255;
    } else {
      data[i + 3] = 0;
    }
  }
  return sharp(data, { raw: info });
}

await savePng(await aLineaBlanca(marca("02")), "equipo-busto-blanco", 900);

// Lettering del slogan en Hug Me Tight, recortado del lockup y pasado a blanco
// para la banda rosa. Nativo ~430 px: se dobla para pantallas densas. Cuando el
// diseñador entregue el vector, esto se sustituye por un SVG.
await sharp(
  await (await aLineaBlanca(sharp(`${OUT}/logo.png`).extract({ left: 545, top: 335, width: 455, height: 139 })))
    .png()
    .toBuffer(),
)
  .trim({ threshold: 1 })
  .resize({ width: 860, kernel: "lanczos3" })
  .png()
  .toFile(`${OUT}/slogan.png`);

// Tile del patrón de galletas de los aplicativos (camiseta y membrete, pp. 22-23).
// Se teje con background-repeat; la opacidad la pone el CSS.
{
  const TILE = 300;
  const cookie = async (size, deg) =>
    marca("08")
      .resize({ width: size })
      .rotate(deg, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
  await sharp({ create: { width: TILE, height: TILE, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([
      { input: await cookie(118, -8), left: 6, top: 10 },
      { input: await cookie(86, 14), left: 178, top: 162 },
    ])
    .png()
    .toFile(`${OUT}/patron-galletas.png`);
}

// Hero
await saveJpg(sharp(PLATO), "plato-surtido");

// Menú (4:3). Los recortes evitan el sticker del vaso cuando se puede.
// Foto del catálogo de Instagram de Kapola: galleta partida con el centro derretido
await saveJpg(crop(shot("7.52.24 PM (3)"), 80, 446, 400, 300), "chips-chocolate");
await saveJpg(crop(OREO_LECHE, 480, 20, 720, 540), "oreo");
await saveJpg(crop(MARACUYA, 0, 520, 660, 495), "cheesecake-maracuya");
await saveJpg(crop(MINI, 75, 192, 590, 738), "mini-galletas");
await saveJpg(crop(REGALO_GYM, 0, 940, 760, 570), "caja-x4");
await circle(MENU, 203, 640, 56, "red-velvet");
await circle(MENU, 194, 1005, 68, "temporada");

// Sabores que ya pasaron por temporada
await saveJpg(crop(COCO, 150, 620, 900, 900).resize(480, 480), "temporada-coco");
await saveJpg(
  crop(FRESA, 330, 760, 840, 840).resize(480, 480).normalise({ lower: 1, upper: 99 }).modulate({ brightness: 1.15, saturation: 1.3 }),
  "temporada-fresa",
);

// Nosotros
await saveJpg(crop(AWARD, 0, 490, 739, 610), "premio-emprendimiento");
await saveJpg(crop(LECHONA_RUN, 120, 640, 840, 700).resize(720), "lechona-run");
await saveJpg(crop(COCO, 0, 300, 1200, 1300).resize(600), "hecho-en-casa");
await saveJpg(crop(STAND_VALIENTES, 230, 280, 760, 760).resize(600), "feria-valientes");

// Regalos personalizados (4:5)
await saveJpg(crop(REGALO_CUMPLE_MAMA, 120, 300, 1040, 1100).resize(720), "regalo-cumple-mama");
await saveJpg(crop(REGALO_GYM, 0, 130, 1179, 1399).resize(720), "regalo-gym-rat");
await saveJpg(crop(REGALO_MADRES, 180, 420, 920, 1000).resize(720), "regalo-dia-madres");

await saveJpg(crop(shot("9.57.10 PM (1)"), 90, 240, 1000, 1250).resize(720), "regalo-san-valentin");

// Postres por encargo (4:3)
await saveJpg(crop(shot("10.35.31 PM"), 100, 330, 920, 690).resize(720), "postre-cheesecake");
await saveJpg(crop(shot("10.35.57 PM"), 73, 740, 807, 605).resize(720), "postre-pave");

// Comunidad
await saveJpg(crop(STAND_VALIENTES, 200, 640, 800, 960).resize(560), "feria-stand");
await saveJpg(crop(GRID, 247, 843, 245, 325), "meme-uno");
await saveJpg(crop(GRID, 247, 1215, 245, 282), "a-que-sabe-colombia");
await saveJpg(crop(GRID, 494, 1215, 245, 282), "meme-perro");

// Íconos y Open Graph (app/): isotipo de galleta y lockup oficial
{
  // Lienzo del tote del manual (p. 23): el rosa del logo y de los personajes contrasta.
  const LONA = "#f3e4c8";
  const cookie = (size) =>
    sharp(`${OUT}/galleta.png`)
      .resize({ width: size, height: size, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();

  await sharp(await cookie(192)).png({ palette: true }).toFile("app/icon.png");

  await sharp({ create: { width: 180, height: 180, channels: 4, background: LONA } })
    .composite([{ input: await cookie(132), gravity: "center" }])
    .png()
    .toFile("app/apple-icon.png");

  const logo = await sharp(`${OUT}/logo.png`).resize({ width: 560 }).png().toBuffer();
  const equipo = await sharp(`${OUT}/equipo.png`).resize({ height: 430 }).png().toBuffer();
  await sharp({ create: { width: 1200, height: 630, channels: 4, background: LONA } })
    .composite([
      { input: logo, left: 80, top: 160 },
      { input: equipo, left: 740, top: 110 },
    ])
    .jpeg({ quality: 90 })
    .toFile("app/opengraph-image.jpg");
}

console.log("Assets generados en", OUT);
