import { chromium } from "playwright";

const BASE = "http://127.0.0.1:8080";
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const errors = { consoleErrors: [], pageErrors: [], failedRequests: [] };
page.on("console", (m) => {
  if (m.type() === "error") errors.consoleErrors.push(m.text());
});
page.on("pageerror", (e) => errors.pageErrors.push(String(e.message)));
page.on("response", (r) => {
  if (r.url().includes("/api/auth/")) console.log("API RESP", r.status(), r.url());
});
page.on("requestfailed", (r) => errors.failedRequests.push(r.url() + " :: " + (r.failure()?.errorText ?? "")));

for (const route of ["/dashboard"]) {
  await page.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 30000 });
  for (const ms of [0, 1000, 2000, 4000]) {
    await page.waitForTimeout(ms === 0 ? 0 : ms - (await page.waitForTimeout(0), 0) ? 0 : 0);
    if (ms > 0) await page.waitForTimeout(ms);
    const url = page.url();
    const text = (await page.locator("body").innerText().catch(() => "")).split("\n").map((s) => s.trim()).filter(Boolean).slice(0, 5);
    console.log(`t+${4 + ms}ms`, "url:", url, "text:", text.length ? text.join("|").slice(0, 120) : "(empty)");
  }
}
console.log("ERRORS", JSON.stringify(errors, null, 2));
await page.screenshot({ path: "screenshots/dashboard-wait.png" });
await browser.close();