import { chromium } from "playwright";

const BASE = "http://127.0.0.1:8080";
const VIEWPORTS = [
  { w: 360, h: 740 },
  { w: 390, h: 844 },
  { w: 768, h: 1024 },
  { w: 1024, h: 768 },
  { w: 1280, h: 800 },
  { w: 1440, h: 900 },
  { w: 1920, h: 1080 },
];
const ROUTES = ["/", "/login", "/dashboard", "/checkins", "/prayers", "/day/1", "/day/30", "/read", "/read/bonus-1"];

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const consoleErrors = [];
  page.on("pageerror", (e) => consoleErrors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(`console: ${m.text()}`);
  });

  await page.goto(BASE + "/login", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Create account" }).click();
  await page.fill('input[type="text"]', "Responsive QA");
  await page.fill('input[type="email"]', `resp-qa-${Date.now()}@example.com`);
  await page.fill('input[type="password"]', "supersecret123");
  await page.getByRole("button", { name: /create account/i }).last().click();
  await page.waitForURL("**/dashboard", { timeout: 20000 });
  console.log("signed in");

  let failures = 0;
  for (const v of VIEWPORTS) {
    await page.setViewportSize({ width: v.w, height: v.h });
    for (const route of ROUTES) {
      await page.goto(BASE + route, { waitUntil: "networkidle" });
      await page.waitForTimeout(300);
      const report = await page.evaluate(() => {
        const de = document.documentElement;
        const overflow = de.scrollWidth - de.clientWidth;
        const widest = [];
        const offenders = [];
        for (const el of document.querySelectorAll("body *")) {
          const r = el.getBoundingClientRect();
          const style = getComputedStyle(el);
          if (style.position === "fixed") continue;
          if (r.width > window.innerWidth + 1 || r.right > window.innerWidth + 1 || r.left < -1) {
            offenders.push({
              tag: el.tagName,
              cls: String(el.className).slice(0, 80),
              left: Math.round(r.left),
              right: Math.round(r.right),
              width: Math.round(r.width),
            });
          }
        }
        // keep the 6 worst offenders by width
        offenders.sort((a, b) => b.width - a.width);
        return {
          overflow,
          clientW: de.clientWidth,
          scrollW: de.scrollWidth,
          offenders: offenders.slice(0, 6),
        };
      });
      const bad = report.overflow > 1;
      if (bad) {
        failures++;
        console.log(
          `OVERFLOW vp=${v.w}x${v.h} route=${route} diff=${report.overflow}px worst=`,
          JSON.stringify(report.offenders.slice(0, 3)),
        );
      }
    }
    console.log(`viewport ${v.w}x${v.h} done (${failures} failures so far)`);
  }

  console.log(consoleErrors.length ? `CONSOLE ERRORS:\n${consoleErrors.join("\n")}` : "no console errors");
  await browser.close();
  console.log(failures + consoleErrors.length === 0 ? "ALL_CLEAN" : "HAS_ISSUES");
  process.exit(failures + consoleErrors.length === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});