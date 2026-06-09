import fs from "fs";
import path from "path";
import sharp from "sharp";

const IMAGES_DIR = path.join(process.cwd(), "public", "images");
const MAX_WIDTH = 1600;
const WEBP_QUALITY = 82;

const INPUT_EXT = new Set([".png", ".jpg", ".jpeg"]);

async function compressFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!INPUT_EXT.has(ext)) return null;

  const base = path.basename(filePath, ext);
  const outPath = path.join(IMAGES_DIR, `${base}.webp`);

  const inputStat = fs.statSync(filePath);
  const pipeline = sharp(filePath).rotate();

  const meta = await pipeline.metadata();
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  await pipeline.webp({ quality: WEBP_QUALITY, effort: 4 }).toFile(outPath);

  const outputStat = fs.statSync(outPath);
  const saved = ((1 - outputStat.size / inputStat.size) * 100).toFixed(1);

  return {
    name: base,
    before: inputStat.size,
    after: outputStat.size,
    saved,
  };
}

async function main() {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error("public/images not found");
    process.exit(1);
  }

  const files = fs.readdirSync(IMAGES_DIR).map((f) => path.join(IMAGES_DIR, f));
  const results = [];

  for (const file of files) {
    const result = await compressFile(file);
    if (result) results.push(result);
  }

  if (results.length === 0) {
    console.log("No PNG/JPEG files to compress.");
    return;
  }

  const totalBefore = results.reduce((s, r) => s + r.before, 0);
  const totalAfter = results.reduce((s, r) => s + r.after, 0);

  console.log("\nWebP compression complete:\n");
  for (const r of results) {
    console.log(
      `  ${r.name}: ${(r.before / 1024).toFixed(0)}KB → ${(r.after / 1024).toFixed(0)}KB (${r.saved}% smaller)`
    );
  }
  console.log(
    `\n  Total: ${(totalBefore / 1024 / 1024).toFixed(2)}MB → ${(totalAfter / 1024 / 1024).toFixed(2)}MB (${((1 - totalAfter / totalBefore) * 100).toFixed(1)}% saved)\n`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
