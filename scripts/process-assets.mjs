// Genera public/images/* a partir de ./assets. Provisional: las fotos actuales
// son capturas de Instagram, así que se recortan para quitar la interfaz.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const OUT = "public/images";
const FOTOS = "assets/fotos";
const shot = (name) => `${FOTOS}/WhatsApp Image 2026-09-13 at ${name}.jpeg`;

const GRID = shot("7.52.23 PM");
const TOWER = shot("7.52.24 PM");
const AWARD = shot("7.52.24 PM (1)");
const MINI = shot("7.52.24 PM (2)");
const CHOCO = shot("7.52.24 PM (3)");
const MENU = shot("7.52.24 PM (4)");

await mkdir(OUT, { recursive: true });

const crop = (src, left, top, width, height) =>
  sharp(src).extract({ left, top, width, height });

const saveJpg = (img, name) =>
  img.jpeg({ quality: 90, mozjpeg: true }).toFile(`${OUT}/${name}.jpg`);

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
  await sharp(buf).trim({ threshold: 1 }).resize({ width: 1000 }).png({ palette: true, quality: 95 }).toFile(`${OUT}/logo.png`);
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

// Fotos completas
await saveJpg(crop(TOWER, 0, 295, 739, 865), "galletas-nutella");
await saveJpg(crop(AWARD, 0, 490, 739, 610), "premio-emprendimiento");
await saveJpg(crop(MINI, 75, 192, 590, 738), "mini-galletas");
await saveJpg(crop(CHOCO, 75, 192, 590, 708), "chips-chocolate");

// Galletas del menú gráfico (recorte circular)
await circle(MENU, 203, 640, 56, "red-velvet");
await circle(MENU, 198, 744, 60, "cheesecake-maracuya");
await circle(MENU, 194, 860, 62, "oreo");
await circle(MENU, 194, 1005, 68, "temporada");

// Miniaturas del perfil de Instagram
await saveJpg(crop(GRID, 247, 565, 245, 275), "feria-entrega");
await saveJpg(crop(GRID, 0, 565, 245, 275), "cliente-sundae");
await saveJpg(crop(GRID, 494, 560, 245, 280), "sundae");
await saveJpg(crop(GRID, 0, 843, 245, 325), "cheesecake-frutos-rojos");
await saveJpg(crop(GRID, 247, 843, 245, 325), "meme-uno");
await saveJpg(crop(GRID, 494, 843, 245, 325), "galletas-con-leche");
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
