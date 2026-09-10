import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
for (const route of ["/dashboard"]) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const reqs = [];
  page.on("request", (r) => {
    if (r.url().includes("/api/") || r.url().includes("?") ) reqs.push(`${r.method()} ${r.url().split("?")[0]}`);
  });
  page.on("console", (m) => {
    if (m.type() === "error" || m.type() === "warning") console.log("CONSOLE", m.text().slice(0, 200));
  });
  page.on("pageerror", (e) => console.log("PAGEERR", String(e.message).slice(0, 200)));
  await page.goto("http://127.0.0.1:8080" + route, { waitUntil: "domcontentloaded", timeout: 30000 });
  for (const ms of [1000, 2000, 4000, 6000]) {
    await page.waitForTimeout(ms - (ms === 1000 ? 0 : 1000));
    const url = page.url();
    const text = (await page.locator("body").innerText().catch(() => "")).split("\n").map((s) => s.trim()).filter(Boolean).slice(0, 6);
    const root = await page.evaluate(() => (document.getElementById("root")?.textContent ?? "").slice(0, 100));
    console.log(`t=${ms}ms url=${url} text=${text.length ? text.join("|").slice(0, 110) : "(empty)"} objRoot=${root.length ? root.slice(0,60) : "-"}`);
  }
  console.log("REQS:", JSON.stringify(reqs, null, 2));
  await page.close();
}
await browser.close();