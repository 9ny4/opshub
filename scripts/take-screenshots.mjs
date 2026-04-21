import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';

const root = '/home/sekke/.openclaw/workspace/main/opshub';
const shotsDir = path.join(root, 'screenshots');
await fs.mkdir(shotsDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await context.newPage();

const pages = [
  ['dashboard.png', 'http://localhost:3000'],
  ['leads.png', 'http://localhost:3000/leads'],
  ['orders.png', 'http://localhost:3000/orders'],
  ['support.png', 'http://localhost:3000/support'],
  ['automations.png', 'http://localhost:3000/automations'],
  ['settings.png', 'http://localhost:3000/settings'],
];

for (const [file, url] of pages) {
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(shotsDir, file), fullPage: true });
}

await browser.close();
