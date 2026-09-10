import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as UserButton, t as Brand } from "./brand-CXj82dLd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-header-QA1LvoHa.js
var import_jsx_runtime = require_jsx_runtime();
function AppHeader({ nav, brandTitle = "The Marriage Reset" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "border-b border-rule bg-white/60",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-x-4 gap-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, { title: brandTitle }), nav ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex flex-wrap items-center gap-x-4 gap-y-2",
					children: nav
				}) : null]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})]
		})
	});
}
var headerLink = "text-[13px] font-semibold tracking-[0.14em] text-red uppercase underline-offset-4 hover:underline";
//#endregion
export { headerLink as n, AppHeader as t };
