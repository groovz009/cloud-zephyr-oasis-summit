import { i as __toESM } from "../_runtime.mjs";
import { R as require_react, _ as Link, y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/print-reader-DnDE56mX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PrintReader({ src, title, pages, pdf }) {
	const [page, setPage] = (0, import_react.useState)(1);
	const frame = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = frame.current;
		if (!el) return;
		const go = () => {
			try {
				(el.contentDocument?.getElementById(`p${page}`))?.scrollIntoView({
					behavior: "instant",
					block: "start"
				});
			} catch {}
		};
		el.addEventListener("load", go);
		go();
		return () => el.removeEventListener("load", go);
	}, [page, src]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-[#e8ddd2]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex flex-wrap items-center justify-between gap-3 border-b border-[#d9cbbd] bg-ivory px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-[12px] tracking-[0.16em] text-red uppercase",
					children: "Library"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif text-lg text-ink",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						pdf ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: pdf,
							className: "text-[12px] text-red underline-offset-4 hover:underline",
							children: "Download PDF"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "min-h-11 min-w-11 border border-red px-3 text-red",
							onClick: () => setPage((p) => Math.max(1, p - 1)),
							"aria-label": "Previous page",
							children: "Prev"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-sm text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: 1,
								max: pages,
								value: page,
								onChange: (e) => setPage(Math.min(pages, Math.max(1, Number(e.target.value) || 1))),
								className: "w-14 border border-[#d9cbbd] bg-white text-center",
								"aria-label": "Page number"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [" / ", pages] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "min-h-11 min-w-11 border border-red px-3 text-red",
							onClick: () => setPage((p) => Math.min(pages, p + 1)),
							"aria-label": "Next page",
							children: "Next"
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-1 justify-center overflow-auto p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-[min(88dvh,1100px)] w-full max-w-[820px] overflow-hidden bg-white shadow-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					ref: frame,
					title,
					src: `${src}#p${page}`,
					className: "h-full w-full border-0 bg-ivory"
				})
			})
		})]
	});
}
//#endregion
export { PrintReader as t };
