// scripts/convert-to-webp.mjs
// Converts all PNG frames in public/sequence/ to WebP
// Run: node scripts/convert-to-webp.mjs

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SEQUENCE_DIR = path.join(__dirname, "../public/sequence");

const files = fs.readdirSync(SEQUENCE_DIR).filter((f) => f.endsWith(".png"));

console.log(`\n🎞  Converting ${files.length} PNG frames → WebP (quality 85)...\n`);

let done = 0;
const CONCURRENCY = 8; // process 8 at a time

async function convertFile(file) {
  const input = path.join(SEQUENCE_DIR, file);
  const output = path.join(SEQUENCE_DIR, file.replace(".png", ".webp"));

  // Skip if already converted
  if (fs.existsSync(output)) {
    done++;
    return;
  }

  await sharp(input)
    .webp({ quality: 85, effort: 4 }) // quality 85 = visually lossless, effort 4 = fast
    .toFile(output);

  done++;
  if (done % 30 === 0 || done === files.length) {
    const pct = Math.round((done / files.length) * 100);
    const bar = "█".repeat(Math.floor(pct / 5)) + "░".repeat(20 - Math.floor(pct / 5));
    process.stdout.write(`\r  [${bar}] ${pct}% (${done}/${files.length})`);
  }
}

// Process in batches of CONCURRENCY
for (let i = 0; i < files.length; i += CONCURRENCY) {
  const batch = files.slice(i, i + CONCURRENCY);
  await Promise.all(batch.map(convertFile));
}

console.log("\n\n✅ Done! WebP frames are in public/sequence/");
console.log("   You can now delete the .png files if you want to free up disk space.\n");

// Print size comparison
const pngSize = files.reduce((sum, f) => sum + fs.statSync(path.join(SEQUENCE_DIR, f)).size, 0);
const webpFiles = files.map((f) => f.replace(".png", ".webp"));
const webpSize = webpFiles.reduce((sum, f) => {
  const fp = path.join(SEQUENCE_DIR, f);
  return sum + (fs.existsSync(fp) ? fs.statSync(fp).size : 0);
}, 0);

const ratio = ((1 - webpSize / pngSize) * 100).toFixed(1);
console.log(`📊 PNG total:  ${(pngSize / 1024 / 1024).toFixed(1)} MB`);
console.log(`📊 WebP total: ${(webpSize / 1024 / 1024).toFixed(1)} MB`);
console.log(`📊 Reduction:  ${ratio}% smaller\n`);
