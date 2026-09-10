import { chromium } from "playwright";

const BASE = "http://127.0.0.1:8080";
const routes = ["/", "/login", "/dashboard", "/day/1", "/checkins", "/prayers", "/read"];

const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const results = [];
for (const route of routes) {
  const errors = { consoleErrors: [], pageErrors: [] };
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  page.on("console", (m) => {
    if (m.type() === "error") errors.consoleErrors.push(m.text());
  });
  page.on("pageerror", (e) => errors.pageErrors.push(String(e.message)));
  await page.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(900);
  const url = page.url();
  const title = await page.title();
  const text = (await page.locator("body").innerText().catch(() => ""))
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 8)
    .join(" | ");
  results.push({ route, finalUrl: url, title, text, ...errors });
  await page.screenshot({ path: `screenshots/route-${route.replaceAll("/", "-").replaceAll("$", "s") || "root"}.png` });
  await page.close();
}
console.log(JSON.stringify(results, null, 2));
await browser.close();