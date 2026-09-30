// Generates raster brand assets from the official SVGs in /public/brand.
//   app/apple-icon.png                  180×180, black monogram centred on white
//   app/[locale]/opengraph-image.png    1200×630, black stacked logo centred on white
// Run with `npm run brand:assets` after the logo files change.
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const brand = (file) => path.join(root, 'public', 'brand', file);

async function onWhite({ svg, width, height, box, out }) {
  // Render the SVG large, then scale it down into the box so edges stay crisp.
  const logo = await sharp(brand(svg), { density: 600 })
    .resize(box.width, box.height, { fit: 'contain', background: '#ffffff00' })
    .png()
    .toBuffer();

  await sharp({ create: { width, height, channels: 4, background: '#ffffff' } })
    .composite([{ input: logo, gravity: 'center' }])
    .flatten({ background: '#ffffff' })
    .png()
    .toFile(path.join(root, out));
  console.log(`wrote ${out}`);
}

await onWhite({
  svg: 'jb-rooms-monogram-black.svg',
  width: 180,
  height: 180,
  box: { width: 132, height: 132 },
  out: 'app/apple-icon.png',
});

await onWhite({
  svg: 'jb-rooms-logo-black.svg',
  width: 1200,
  height: 630,
  box: { width: 760, height: 440 },
  out: 'app/[locale]/opengraph-image.png',
});
