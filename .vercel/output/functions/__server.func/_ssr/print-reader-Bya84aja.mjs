import { o as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Download } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/print-reader-Bya84aja.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PrintReader({ src, title, pages, pdf }) {
	const [page, setPage] = (0, import_react.useState)(1);
	const frame = (0, import_react.useRef)(null);
	const showPage = (0, import_react.useCallback)((n) => {
		const doc = frame.current?.contentDocument;
		if (!doc) return;
		doc.querySelectorAll(".page").forEach((el) => {
			el.classList.toggle("is-active", el.id === `p${n}`);
		});
		doc.documentElement.scrollTop = 0;
		doc.body.scrollTop = 0;
	}, []);
	(0, import_react.useEffect)(() => {
		const el = frame.current;
		if (!el) return;
		const onLoad = () => showPage(page);
		el.addEventListener("load", onLoad);
		showPage(page);
		return () => el.removeEventListener("load", onLoad);
	}, [page, showPage]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-[#e8ddd2]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-rule bg-ivory px-3 py-3 sm:px-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-4 gap-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-x-3 gap-y-1 sm:gap-x-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "text-[13px] font-semibold tracking-[0.16em] text-red uppercase underline-offset-4 hover:underline",
						children: "Library"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-serif text-base font-semibold text-ink sm:text-lg",
						children: title
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex w-full flex-wrap items-center gap-2 sm:w-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-[1_1_auto] items-center gap-1.5",
						children: [pdf ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: pdf,
							download: true,
							className: "inline-flex min-h-11 items-center gap-1.5 border border-red px-3 text-[12px] font-semibold tracking-[0.12em] text-red uppercase transition-colors hover:bg-red hover:text-ivory",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
									className: "h-3.5 w-3.5",
									strokeWidth: 2.5
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: "Download PDF"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sm:hidden",
									children: "PDF"
								})
							]
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ml-auto flex items-center gap-1 text-sm text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: 1,
								max: pages,
								value: page,
								onChange: (e) => setPage(Math.min(pages, Math.max(1, Number(e.target.value) || 1))),
								className: "w-14 border border-rule bg-white text-center",
								"aria-label": "Page number"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [" / ", pages] })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-[1_1_auto] gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "min-h-11 flex-1 border border-red px-3 font-semibold text-red sm:flex-none",
							onClick: () => setPage((p) => Math.max(1, p - 1)),
							"aria-label": "Previous page",
							children: "Prev"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "min-h-11 flex-1 border border-red px-3 font-semibold text-red sm:flex-none",
							onClick: () => setPage((p) => Math.min(pages, p + 1)),
							"aria-label": "Next page",
							children: "Next"
						})]
					})]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative flex min-h-0 flex-1 overflow-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
				ref: frame,
				title,
				src,
				className: "absolute inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)] max-w-[calc(780px_-_1rem)] border-0 bg-ivory sm:inset-3 sm:h-[calc(100%-1.5rem)] sm:w-[calc(100%-1.5rem)] sm:max-w-[calc(780px_-_1.5rem)]"
			})
		})]
	});
}
//#endregion
export { PrintReader as t };
