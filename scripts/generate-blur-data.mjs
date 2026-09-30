/**
 * Builds tiny base64 blur placeholders for every image in /public/images.
 * Output: lib/blur-data.generated.json (keyed by public path). Runs before each build.
 */
import sharp from 'sharp';
import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const publicDir = path.resolve('public');
const imagesDir = path.join(publicDir, 'images');

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)])),
  );
  return files.flat();
}

const files = (await walk(imagesDir)).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f)).sort();
const out = {};
for (const file of files) {
  const buf = await sharp(file).resize(12, 12, { fit: 'inside' }).webp({ quality: 40 }).toBuffer();
  const key = '/' + path.relative(publicDir, file).split(path.sep).join('/');
  out[key] = `data:image/webp;base64,${buf.toString('base64')}`;
}
await writeFile('lib/blur-data.generated.json', JSON.stringify(out, null, 2) + '\n');
console.log(`blur data: ${files.length} images`);
