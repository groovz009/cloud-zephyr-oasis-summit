import { _ as Link, y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as PrintReader } from "./print-reader-DnDE56mX.mjs";
import { n as Route } from "./router-B0JUI2ho.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/read._id-GPAFFWC0.js
var import_jsx_runtime = require_jsx_runtime();
var meta = {
	"bonus-1": {
		title: "Repair Script",
		src: "/print/bonus-1.html",
		pages: 2,
		pdf: "/downloads/bonus-1-repair-script.pdf"
	},
	"bonus-2": {
		title: "Recommitment Letter",
		src: "/print/bonus-2.html",
		pages: 2,
		pdf: "/downloads/bonus-2-recommitment-letter.pdf"
	},
	"bonus-3": {
		title: "30 Nights of Prayer",
		src: "/print/bonus-3.html",
		pages: 3,
		pdf: "/downloads/bonus-3-30-nights-of-prayer.pdf"
	},
	"bonus-4": {
		title: "Weekly Check-In",
		src: "/print/bonus-4.html",
		pages: 2,
		pdf: "/downloads/bonus-4-weekly-check-in.pdf"
	}
};
function BonusRead() {
	const { id } = Route.useParams();
	const item = meta[id];
	if (!item) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "p-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "That bonus was not found." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "text-red",
			children: "Back"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrintReader, {
		src: item.src,
		title: item.title,
		pages: item.pages,
		pdf: item.pdf
	});
}
//#endregion
export { BonusRead as component };
