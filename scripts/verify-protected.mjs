import { chromium } from "playwright";

const BASE = "http://127.0.0.1:8080";
const routes = ["/dashboard", "/day/1", "/day/7", "/day/30", "/checkins", "/prayers"];
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const out = [];
for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const errs = { console: [], page: [] };
  page.on("console", (m) => { if (m.type() === "error") errs.console.push(m.text()); });
  page.on("pageerror", (e) => errs.page.push(String(e.message)));
  await page.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(3500);
  const finalUrl = page.url();
  const text = (await page.locator("body").innerText().catch(() => "")).split("\n").map((s) => s.trim()).filter(Boolean).join(" | ").slice(0, 140);
  out.push({ route, finalUrl, text, ...errs });
  await page.close();
}
console.log(JSON.stringify(out, null, 2));
await browser.close();