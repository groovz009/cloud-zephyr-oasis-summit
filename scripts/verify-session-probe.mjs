import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const allReqs = [];
page.on("request", (r) => allReqs.push(`REQ ${r.method()} ${r.url()}`));
page.on("response", (r) => allReqs.push(`RES ${r.status()} ${r.url()}`));
page.on("console", (m) => {
  if (m.type() !== "debug") console.log(`[${m.type()}]`, m.text().slice(0, 250));
});
page.on("pageerror", (e) => console.log("[pageerror]", String(e.message).slice(0, 300)));
await page.goto("http://127.0.0.1:8080/login", { waitUntil: "domcontentloaded", timeout: 30000 });
await page.waitForTimeout(3000);

const inPage = await page.evaluate(async () => {
  const results = {};
  try {
    const r1 = await fetch("/api/auth/get-session", { method: "GET" });
    results.sessionStatus = r1.status;
    results.sessionBody = (await r1.text()).slice(0, 200);
  } catch (e) {
    results.sessionErr = String(e);
  }
  try {
    const r2 = await fetch("/api/auth/get-session", {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    results.altStatus = r2.status;
    results.altBody = (await r2.text()).slice(0, 200);
  } catch (e) {
    results.altErr = String(e);
  }
  return results;
});
console.log("INPAGE", JSON.stringify(inPage, null, 2));

const clicked = await page
  .locator('a[href="/"]')
  .first()
  .click()
  .then(() => true)
  .catch((e) => { console.log("CLICK ERR", String(e)); return false; });
await page.waitForTimeout(1500);
console.log("CLICKED", clicked, "URL NOW", page.url());

const api = allReqs.filter((r) => r.includes("/api/auth/"));
console.log("AUTH-RELATED REQUESTS", JSON.stringify(api, null, 2));
await browser.close();