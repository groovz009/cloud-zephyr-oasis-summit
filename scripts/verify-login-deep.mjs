import { chromium } from "playwright";

const BASE = "http://127.0.0.1:8080";
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const reqs = [];
page.on("request", (r) => {
  if (/\.(js|ts|css)/.test(r.url()) || r.url().includes("/api/")) reqs.push(`${r.method()} ${r.url()}`);
});
page.on("console", (m) => {
  const t = `${m.type()}: ${m.text()}`;
  if (m.type() === "error" || m.type() === "warning") console.log("CONSOLE", t.slice(0, 300));
});
page.on("pageerror", (e) => console.log("PAGEERR", String(e.message)));
const resp = await page.goto(BASE + "/login", { waitUntil: "domcontentloaded", timeout: 30000 });
await page.waitForTimeout(3000);
console.log("STATUS", resp.status());
console.log("REQUESTS", JSON.stringify(reqs, null, 2));
const html = await page.content();
console.log("HAS APP ROOT", html.includes('id="root"'));
const state = await page.evaluate(() => ({
  hasWindow: typeof window !== "undefined",
  html: document.documentElement.outerHTML.slice(0, 600),
  bodyChildren: document.body.children.length,
  rootChildCount: document.getElementById("root")?.children.length ?? -1,
  rootText: (document.getElementById("root")?.textContent ?? "").slice(0, 200),
}));
console.log("STATE", JSON.stringify(state, null, 2));
await browser.close();