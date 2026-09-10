import { o as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useCurrentUserState } from "./use-current-user-DG6UNzh9.mjs";
import { n as RedirectToSignIn, o as loadWorkbookState, s as saveCheckin } from "./brand-CXj82dLd.mjs";
import { t as CHECKIN_CHECKPOINTS } from "./constants-7SPQgx53.mjs";
import { n as headerLink, t as AppHeader } from "./app-header-QA1LvoHa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkins-z5fQq9Rc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LABELS = {
	0: "Before Day 1",
	7: "Day 7",
	14: "Day 14",
	21: "Day 21",
	30: "Day 30"
};
function Checkins() {
	const { user, isPending } = useCurrentUserState();
	const { data, isLoading, refetch } = useQuery({
		queryKey: ["workbook-state"],
		queryFn: () => loadWorkbookState()
	});
	if (isPending) return null;
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (isLoading || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-dvh bg-ivory" });
	const filled = data.checkins;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-dvh bg-ivory text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, { nav: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/dashboard",
				className: headerLink,
				children: "Dashboard"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-rule",
				children: "|"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/prayers",
				className: headerLink,
				children: "Prayers"
			})
		] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-4xl px-4 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-semibold tracking-[0.28em] text-red uppercase",
					children: "The Weekly Check-In Card"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-serif text-4xl md:text-5xl",
					children: "How is it really going?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl font-serif text-base leading-relaxed text-muted",
					children: "Three questions, five minutes, five checkpoints. This is the one habit built to outlast the workbook — come back and answer honestly, even when the honest answer is \"not great.\""
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 flex flex-col gap-5",
					children: CHECKIN_CHECKPOINTS.map((cp) => {
						const card = filled.find((c) => c.checkpoint === cp);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckinCard, {
							checkpoint: cp,
							label: LABELS[cp],
							card,
							onSaved: refetch
						}, cp);
					})
				}),
				filled.length >= 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-10 border-t border-rule pt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-semibold tracking-[0.28em] text-red uppercase",
							children: "The timeline view"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-serif text-sm italic text-muted",
							children: "Day 22 asks you to read these side by side. Here they are."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 grid gap-4 md:grid-cols-2",
							children: filled.slice().sort((a, b) => a.checkpoint - b.checkpoint).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border border-rule bg-white p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] font-semibold tracking-[0.2em] text-red uppercase",
										children: LABELS[c.checkpoint]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 text-sm leading-relaxed text-ink",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-red",
												children: "How are we, really?"
											}),
											" ",
											c.q_how_are_we || "—"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm leading-relaxed text-ink",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-red",
												children: "What we need now:"
											}),
											" ",
											c.q_need_right_now || "—"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm leading-relaxed text-ink",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-red",
												children: "Next step:"
											}),
											" ",
											c.q_next_step || "—"
										]
									})
								]
							}, c.checkpoint))
						})
					]
				})
			]
		})]
	});
}
function CheckinCard({ checkpoint, label, card, onSaved }) {
	const [howAreWe, setHowAreWe] = (0, import_react.useState)(card?.q_how_are_we ?? "");
	const [need, setNeed] = (0, import_react.useState)(card?.q_need_right_now ?? "");
	const [next, setNext] = (0, import_react.useState)(card?.q_next_step ?? "");
	const [saved, setSaved] = (0, import_react.useState)(true);
	const save = async () => {
		setSaved(false);
		try {
			await saveCheckin({ data: {
				checkpoint,
				howAreWe,
				needRightNow: need,
				nextStep: next
			} });
			setSaved(true);
			onSaved();
		} catch {
			setSaved(true);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border border-gold bg-gold/10 p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-semibold tracking-[0.22em] text-red uppercase",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-serif text-[15px] text-ink",
							children: "1. How are we, really?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: howAreWe,
							onChange: (e) => setHowAreWe(e.target.value),
							rows: 2,
							placeholder: "Not a status update — an honest one-line read.",
							className: "mt-1 block w-full border border-rule bg-white p-2.5 font-serif text-[15px] text-ink placeholder:text-muted/60 focus:border-red focus:outline-none"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-serif text-[15px] text-ink",
							children: "2. What do we need right now?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: need,
							onChange: (e) => setNeed(e.target.value),
							rows: 2,
							placeholder: "One real, current need — yours or the marriage's.",
							className: "mt-1 block w-full border border-rule bg-white p-2.5 font-serif text-[15px] text-ink placeholder:text-muted/60 focus:border-red focus:outline-none"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-serif text-[15px] text-ink",
							children: "3. What's one small next step?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: next,
							onChange: (e) => setNext(e.target.value),
							rows: 2,
							placeholder: "One specific, doable thing before the next check-in.",
							className: "mt-1 block w-full border border-rule bg-white p-2.5 font-serif text-[15px] text-ink placeholder:text-muted/60 focus:border-red focus:outline-none"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center justify-end gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] text-muted/70",
					children: saved ? "Saved" : "…"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => void save(),
					className: "border border-red px-4 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-red uppercase",
					children: "Save"
				})]
			})
		]
	});
}
//#endregion
export { Checkins as component };
