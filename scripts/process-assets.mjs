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

// Quita un fondo de color plano: alfa según distancia al color de fondo y
// "des-contaminación" del color en los bordes antialiasados.
async function keyOut(img, bg, { inner = 10, outer = 60 } = {}) {
  const { data, info } = await img
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const dr = data[i] - bg[0];
    const dg = data[i + 1] - bg[1];
    const db = data[i + 2] - bg[2];
    const dist = Math.sqrt(dr * dr + dg * dg + db * db);
    const a = Math.min(1, Math.max(0, (dist - inner) / (outer - inner)));
    if (a > 0 && a < 1) {
      for (let c = 0; c < 3; c++) {
        const v = (data[i + c] - bg[c] * (1 - a)) / a;
        data[i + c] = Math.max(0, Math.min(255, Math.round(v)));
      }
    }
    data[i + 3] = Math.round(a * 255);
  }
  return sharp(data, { raw: info });
}

async function sampleColor(src, x, y) {
  const { data } = await sharp(src)
    .extract({ left: x, top: y, width: 6, height: 6 })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const avg = [0, 0, 0];
  for (let i = 0; i < data.length; i += 3)
    for (let c = 0; c < 3; c++) avg[c] += data[i + c];
  return avg.map((v) => Math.round(v / (data.length / 3)));
}

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

// Logo: fondo blanco -> transparente
{
  const keyed = await keyOut(sharp("assets/logo/logo.jpg"), [255, 255, 255], {
    inner: 8,
    outer: 40,
  });
  const buf = await keyed.png().toBuffer();
  await sharp(buf)
    .trim({ threshold: 1 })
    .resize({ width: 1000 })
    .png({ palette: true, quality: 95 })
    .toFile(`${OUT}/logo.png`);
}

// Mascota: recortada del menú gráfico, sin el fondo rosa pastel
{
  const bg = await sampleColor(MENU, 455, 1050);
  const keyed = await keyOut(crop(MENU, 440, 1040, 205, 278), bg, {
    inner: 14,
    outer: 48,
  });
  const buf = await keyed.png().toBuffer();
  await sharp(buf).trim({ threshold: 1 }).png().toFile(`${OUT}/mascota.png`);
}

// Hero
await saveJpg(sharp(PLATO), "plato-surtido");

// Menú (4:3). Los recortes evitan el sticker del vaso cuando se puede.
await saveJpg(crop(PLATO, 860, 400, 440, 330), "chips-chocolate");
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

// Así es por dentro (capturas de Instagram, sin la interfaz)
await saveJpg(crop(shot("7.52.24 PM (3)"), 59, 440, 420, 315), "por-dentro-chocolate");
await saveJpg(crop(shot("7.52.24 PM"), 37, 325, 640, 800).resize(560), "por-dentro-nutella");

// Postres por encargo (4:3)
await saveJpg(crop(shot("10.35.31 PM"), 100, 330, 920, 690).resize(720), "postre-cheesecake");
await saveJpg(crop(shot("10.35.57 PM"), 73, 740, 807, 605).resize(720), "postre-pave");

// Comunidad
await saveJpg(crop(STAND_VALIENTES, 200, 640, 800, 960).resize(560), "feria-stand");
await saveJpg(crop(GRID, 247, 843, 245, 325), "meme-uno");
await saveJpg(crop(GRID, 247, 1215, 245, 282), "a-que-sabe-colombia");
await saveJpg(crop(GRID, 494, 1215, 245, 282), "meme-perro");

// Íconos y Open Graph (app/)
{
  const BLUSH = "#FDE4EE";
  const mascot = (size) =>
    sharp(`${OUT}/mascota.png`)
      .resize({ width: size, height: size, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();

  await sharp(await mascot(512)).toFile("app/icon.png");

  await sharp({ create: { width: 180, height: 180, channels: 4, background: BLUSH } })
    .composite([{ input: await mascot(150), gravity: "center" }])
    .png()
    .toFile("app/apple-icon.png");

  const logo = await sharp(`${OUT}/logo.png`).resize({ width: 640 }).png().toBuffer();
  await sharp({ create: { width: 1200, height: 630, channels: 4, background: BLUSH } })
    .composite([
      { input: logo, left: 70, top: 170 },
      { input: await mascot(460), left: 710, top: 90 },
    ])
    .jpeg({ quality: 90 })
    .toFile("app/opengraph-image.jpg");
}

console.log("Assets generados en", OUT);
