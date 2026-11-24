// Solo para CI: las fotos de la marca no se publican en el repo (ver .gitignore),
// así que creamos imágenes en blanco de 1x1 para que `next build` compile.
// Nunca sobrescribe: si la imagen existe (en local), no la toca.
import { readdirSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import sharp from "sharp";

const files = ["app", "components", "data", "lib"].flatMap((dir) =>
  readdirSync(dir, { recursive: true }).filter((f) => /\.tsx?$/.test(f)).map((f) => join(dir, f)),
);
const images = new Set(
  files.flatMap((f) => [...readFileSync(f, "utf8").matchAll(/@\/public\/(images\/[\w.-]+\.(?:png|jpe?g))/g)].map((m) => m[1])),
);

let created = 0;
for (const rel of images) {
  const out = join("public", rel);
  if (existsSync(out)) continue;
  mkdirSync(dirname(out), { recursive: true });
  await sharp({ create: { width: 1, height: 1, channels: 3, background: "#ffffff" } })
    .toFormat(out.endsWith(".png") ? "png" : "jpeg")
    .toFile(out);
  created++;
}
console.log(`placeholders: ${created} creadas, ${images.size - created} ya existían`);
