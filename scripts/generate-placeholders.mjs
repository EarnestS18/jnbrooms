/**
 * Generates clearly-labelled placeholder photos under /public/images.
 * Replace any file with real photography using the SAME file name — no code changes needed.
 * Run: npm run images:placeholders
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('public/images');

const properties = [
  'pramuka',
  'utan-kayu',
  'tomang',
  'jatinegara',
  'senen',
  'bekasi',
  'sentul',
  'cikarang',
  'ende',
  'bnr',
];
const services = [
  'services-hero',
  'hotel-management',
  'operations',
  'revenue-management',
  'ota-management',
  'people-management',
];
const team = ['hie-yenny-kristina', 'aidil-putra-ardi', 'earnest-surya'];

function rng(seed) {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function label(file, w, h) {
  const fs = Math.round(Math.max(14, w / 70));
  return `<g font-family="DejaVu Sans, Arial, sans-serif" font-weight="700">
    <rect x="${fs}" y="${h - fs * 3.2}" width="${fs * 0.7 * (file.length + 15)}" height="${fs * 2}" fill="#0E2A47" fill-opacity="0.85"/>
    <text x="${fs * 1.5}" y="${h - fs * 1.8}" font-size="${fs}" fill="#FFF1E0" letter-spacing="1">PLACEHOLDER · ${file}</text>
  </g>`;
}

/** Stylised building facade at dusk. */
function building(file, w, h) {
  const r = rng(file);
  const hue = Math.round(r() * 40) + 190;
  const cols = 5 + Math.floor(r() * 6);
  const rows = 6 + Math.floor(r() * 8);
  const bx = w * (0.12 + r() * 0.2);
  const bw = w * (0.5 + r() * 0.25);
  const by = h * (0.12 + r() * 0.15);
  const bh = h - by;
  const cw = bw / cols;
  const rh = bh / rows;
  let windows = '';
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const lit = r() > 0.55;
      const o = lit ? 0.55 + r() * 0.4 : 0.08 + r() * 0.1;
      const fill = lit ? (r() > 0.5 ? '#FFC93C' : '#FFF1E0') : '#5a7391';
      windows += `<rect x="${bx + x * cw + cw * 0.18}" y="${by + y * rh + rh * 0.2}" width="${cw * 0.64}" height="${rh * 0.55}" fill="${fill}" fill-opacity="${o.toFixed(2)}"/>`;
    }
  }
  const nx = bx + bw + w * 0.03;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0E2A47"/>
        <stop offset="0.6" stop-color="hsl(${hue},45%,${24 + Math.round(r() * 8)}%)"/>
        <stop offset="1" stop-color="#FF6B2C"/>
      </linearGradient>
      <linearGradient id="bld" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#0a1f35"/><stop offset="1" stop-color="#14365a"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#sky)"/>
    <rect x="${nx}" y="${h * 0.45}" width="${w - nx}" height="${h * 0.55}" fill="#0a1d31"/>
    <rect x="0" y="${h * 0.55}" width="${bx - w * 0.02}" height="${h * 0.45}" fill="#0b2038"/>
    <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="url(#bld)"/>
    <rect x="${bx}" y="${by}" width="${bw}" height="${h * 0.012}" fill="#FF6B2C"/>
    ${windows}
    <rect x="0" y="${h * 0.93}" width="${w}" height="${h * 0.07}" fill="#08182a"/>
    ${label(file, w, h)}
  </svg>`;
}

/** Interior / abstract room scene. */
function interior(file, w, h) {
  const r = rng(file);
  const tone = 20 + Math.round(r() * 25);
  const lx = w * (0.15 + r() * 0.5);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <radialGradient id="light" cx="${lx / w}" cy="0.3" r="0.8">
        <stop offset="0" stop-color="#FFC93C"/>
        <stop offset="1" stop-color="hsl(211,${40 + tone}%,${tone - 2}%)"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#light)"/>
    <polygon points="0,${h} ${w * 0.22},${h * 0.62} ${w * 0.78},${h * 0.62} ${w},${h}" fill="#0E2A47" fill-opacity="0.45"/>
    <rect x="${w * 0.22}" y="${h * 0.18}" width="${w * 0.56}" height="${h * 0.44}" fill="#0E2A47" fill-opacity="0.15"/>
    <rect x="${w * 0.3}" y="${h * 0.55}" width="${w * 0.4}" height="${h * 0.14}" fill="#FFF1E0" fill-opacity="0.9"/>
    <rect x="${w * 0.3}" y="${h * 0.5}" width="${w * 0.4}" height="${h * 0.06}" fill="#f3dcc0"/>
    <rect x="${w * 0.33}" y="${h * 0.46}" width="${w * 0.1}" height="${h * 0.05}" fill="#FFF1E0"/>
    <rect x="${w * 0.57}" y="${h * 0.46}" width="${w * 0.1}" height="${h * 0.05}" fill="#FFF1E0"/>
    <rect x="${w * 0.47}" y="${h * 0.22}" width="${w * 0.06}" height="${h * 0.2}" fill="#FF6B2C" fill-opacity="0.9"/>
    ${label(file, w, h)}
  </svg>`;
}

/** Neutral portrait silhouette. */
function portrait(file, w, h) {
  const r = rng(file);
  const bg = 70 + Math.round(r() * 20);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="hsl(33,100%,${bg + 5}%)"/><stop offset="1" stop-color="hsl(18,100%,${bg - 15}%)"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#bg)"/>
    <ellipse cx="${w / 2}" cy="${h * 0.4}" rx="${w * 0.17}" ry="${w * 0.21}" fill="#14365a"/>
    <path d="M ${w * 0.12} ${h} C ${w * 0.14} ${h * 0.68}, ${w * 0.3} ${h * 0.62}, ${w / 2} ${h * 0.62} C ${w * 0.7} ${h * 0.62}, ${w * 0.86} ${h * 0.68}, ${w * 0.88} ${h} Z" fill="#0E2A47"/>
    ${label(file, w, h)}
  </svg>`;
}

const jobs = [
  ['hero/home-hero.jpg', building, 2400, 1500],
  ['hero/portfolio-hero.jpg', building, 2400, 1400],
  ['hero/partner-hero.jpg', interior, 2400, 1400],
  ['about/about-hero.jpg', interior, 2400, 1400],
  ['about/story.jpg', building, 1200, 1500],
  ...properties.map((p) => [`properties/${p}-hero.jpg`, building, 1200, 1500]),
  ...services.map((s) => [
    `services/${s}.jpg`,
    s === 'services-hero' ? interior : interior,
    s === 'services-hero' ? 2400 : 1600,
    s === 'services-hero' ? 1400 : 1200,
  ]),
  ...team.map((t) => [`team/${t}.jpg`, portrait, 900, 1200]),
];

for (const [rel, fn, w, h] of jobs) {
  const out = path.join(root, rel);
  await mkdir(path.dirname(out), { recursive: true });
  await sharp(Buffer.from(fn(path.basename(rel), w, h)))
    .jpeg({ quality: 78, progressive: true, mozjpeg: true })
    .toFile(out);
  console.log('✓', rel);
}
