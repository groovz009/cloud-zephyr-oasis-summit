import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.on("console", (m) => console.log(`[${m.type()}]`, m.text().slice(0, 200)));
page.on("pageerror", (e) => console.log("[pageerror]", String(e.message).slice(0, 300)));
await page.goto("http://127.0.0.1:8080/login", { waitUntil: "domcontentloaded", timeout: 30000 });
await page.waitForTimeout(2500);
const info = await page.evaluate(() => {
  const buttons = [...document.querySelectorAll("button")].map((b) => b.textContent?.trim()).filter(Boolean);
  const main = document.querySelector("main");
  return {
    bodyChildren: document.body.children.length,
    mainText: main?.textContent?.slice(0, 300) ?? null,
    buttons,
    bodyHtml: document.body.innerHTML.slice(0, 800),
    scripts: [...document.scripts].map((s) => s.src || s.type).slice(0, 10),
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();