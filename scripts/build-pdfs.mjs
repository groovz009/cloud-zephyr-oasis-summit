import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public/downloads");
mkdirSync(outDir, { recursive: true });

const chrome =
  "/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
const base = process.env.PDF_BASE || "http://127.0.0.1:8080/print/";

const jobs = [
  ["workbook.html", "the-marriage-reset.pdf"],
  ["bonus-1.html", "bonus-1-repair-script.pdf"],
  ["bonus-2.html", "bonus-2-recommitment-letter.pdf"],
  ["bonus-3.html", "bonus-3-30-nights-of-prayer.pdf"],
  ["bonus-4.html", "bonus-4-weekly-check-in.pdf"],
];

const browser = await chromium.launch({
  executablePath: chrome,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

for (const [html, pdf] of jobs) {
  const page = await browser.newPage();
  const url = `${base}${html}`;
  await page.goto(url, { waitUntil: "networkidle", timeout: 120000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 600));
  const dest = join(outDir, pdf);
  await page.pdf({
    path: dest,
    format: "Letter",
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
  });
  console.log("wrote", dest);
  await page.close();
}

await browser.close();
