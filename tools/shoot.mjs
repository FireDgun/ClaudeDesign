// Screenshot helper — captures Minimal variant at desktop viewport.
// Usage: node tools/shoot.mjs [round-name]
import { chromium } from 'playwright';
import fs from 'fs';

const ROUND = process.argv[2] || 'shot';
const URL = process.env.SHOT_URL || 'http://localhost:5173/';
const OUT_DIR = '/tmp/shots';
fs.mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();

await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
// Make sure Minimal is selected
await page.evaluate(() => localStorage.setItem('proalgo.variant', 'minimal'));
await page.reload({ waitUntil: 'networkidle' });
await page.waitForTimeout(2000); // let loader exit + initial reveals

// Above-the-fold
await page.screenshot({ path: `${OUT_DIR}/${ROUND}-01-hero.png`, fullPage: false });

// Scroll through and capture each screen-height
const heights = await page.evaluate(() => document.body.scrollHeight);
const vh = 900;
const steps = Math.min(18, Math.ceil(heights / vh));
for (let i = 1; i < steps; i++) {
  await page.evaluate(y => window.scrollTo(0, y), i * vh * 0.92);
  await page.waitForTimeout(1500); // let scroll-trigger animations play
  await page.screenshot({ path: `${OUT_DIR}/${ROUND}-${String(i + 1).padStart(2, '0')}.png` });
}

await browser.close();
console.log(`Saved ${steps} screenshots to ${OUT_DIR}/${ROUND}-*.png`);
