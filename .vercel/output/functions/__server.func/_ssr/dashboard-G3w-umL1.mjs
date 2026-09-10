import { o as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useCurrentUserState } from "./use-current-user-DG6UNzh9.mjs";
import { i as loadHabitCheckoffs, l as saveSoloMode, n as RedirectToSignIn, o as loadWorkbookState } from "./brand-CXj82dLd.mjs";
import { i as getDaysByWeek, n as WEEKS } from "./constants-7SPQgx53.mjs";
import { n as headerLink, t as AppHeader } from "./app-header-QA1LvoHa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-G3w-umL1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const { user, isPending } = useCurrentUserState();
	const { data, isLoading, refetch } = useQuery({
		queryKey: ["workbook-state"],
		queryFn: () => loadWorkbookState()
	});
	const [modeSaved, setModeSaved] = (0, import_react.useState)(true);
	if (isPending) return null;
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (isLoading || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-dvh bg-ivory" });
	const completed = data.completedDays;
	const currentDay = data.profile?.current_day ?? 1;
	const soloMode = data.profile?.solo_mode ?? true;
	const allDays = Array.from({ length: 30 }, (_, i) => i + 1);
	const streak = computeStreak(completed);
	const switchMode = async (solo) => {
		setModeSaved(false);
		await saveSoloMode({ data: { solo } });
		setModeSaved(true);
		refetch();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-dvh bg-ivory text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, { nav: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/checkins",
				className: headerLink,
				children: "Check-Ins"
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
			className: "mx-auto max-w-5xl px-4 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "flex flex-wrap items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-semibold tracking-[0.28em] text-red uppercase",
						children: user.displayName ?? "Welcome back"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 font-serif text-4xl md:text-5xl",
						children: completed.length === 0 ? "Your journey starts here" : "Keep going"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 border border-rule bg-white p-1 text-[12px]",
						children: [[true, false].map((solo) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => void switchMode(solo),
							disabled: !modeSaved,
							className: `px-3 py-1.5 font-semibold tracking-[0.12em] uppercase transition-colors ${soloMode === solo ? "bg-red text-ivory" : "text-muted hover:text-red"}`,
							children: solo ? "Doing this alone" : "With my spouse"
						}, String(solo))), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-1 pr-1 text-[11px] text-muted/60",
							children: modeSaved ? "" : "…"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-8 grid gap-4 md:grid-cols-[auto_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressRing, {
						completed: completed.length,
						total: 30
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col justify-center gap-3 border border-rule bg-white p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-semibold tracking-[0.22em] text-red uppercase",
								children: "Progress"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-serif text-xl text-ink",
								children: [
									completed.length,
									" of 30 days complete",
									streak > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" · ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-red",
										children: [streak, "-day streak"]
									})] }) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-relaxed text-muted",
								children: completed.length === 0 ? "Start with Day 1 — it takes about ten minutes." : completed.length === 30 ? "You finished all thirty days. The habit doesn't stop here." : `You're on Day ${currentDay}. Small, kept, on purpose — that's the whole method.`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex flex-wrap gap-2",
								children: [completed.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/day/$dayNumber",
									params: { dayNumber: "1" },
									className: "bg-red px-5 py-2.5 text-[12px] font-semibold tracking-[0.16em] text-ivory uppercase",
									children: "Start Day 1"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/day/$dayNumber",
									params: { dayNumber: String(Math.min(30, currentDay)) },
									className: "bg-red px-5 py-2.5 text-[12px] font-semibold tracking-[0.16em] text-ivory uppercase",
									children: ["Continue Day ", Math.min(30, currentDay)]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "/downloads/the-marriage-reset.pdf",
									className: "border border-rule px-5 py-2.5 text-[12px] font-semibold tracking-[0.16em] text-muted uppercase hover:border-red/40 hover:text-red",
									children: "Download PDF"
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-semibold tracking-[0.28em] text-red uppercase",
						children: "The thirty days"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid grid-cols-5 gap-2 sm:grid-cols-6 md:grid-cols-10",
						children: allDays.map((d) => {
							const done = completed.includes(d);
							const isCurrent = d === currentDay && !done;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/day/$dayNumber",
								params: { dayNumber: String(d) },
								"aria-label": done ? `Day ${d} complete` : `Day ${d}`,
								className: `group flex aspect-square flex-col items-center justify-center border p-1 text-center transition-colors ${done ? "border-gold bg-gold text-ivory" : isCurrent ? "border-red bg-red text-ivory" : "border-rule bg-white text-muted hover:border-red/40 hover:text-red"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-semibold",
									children: d
								})
							}, d);
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mt-10 grid gap-4 md:grid-cols-2",
					children: WEEKS.map((w) => {
						const days = getDaysByWeek(w.number);
						const doneCount = days.filter((d) => completed.includes(d.day)).length;
						const pct = Math.round(doneCount / days.length * 100);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border border-rule bg-white p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] font-semibold tracking-[0.28em] text-red uppercase",
										children: [
											"Week ",
											w.number,
											" — ",
											w.name
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[12px] font-semibold text-muted",
										children: [pct, "%"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 h-1.5 w-full bg-rule",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full bg-red transition-all",
										style: { width: `${pct}%` }
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 font-serif text-sm italic text-muted",
									children: w.theme
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/day/$dayNumber",
									params: { dayNumber: String(days[0].day) },
									className: "mt-3 inline-block text-[12px] font-semibold tracking-[0.14em] text-red uppercase underline-offset-4 hover:underline",
									children: doneCount > 0 ? `Continue week ${w.number}` : `Begin week ${w.number}`
								})
							]
						}, w.number);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HabitPreview, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mt-12 border-t border-rule px-5 pt-6 text-center text-[11px] leading-relaxed text-muted",
					children: "The Marriage Reset is an educational workbook. It is not therapy, counseling, or medical advice. If you are in crisis or danger, contact local emergency services."
				})
			]
		})]
	});
}
function computeStreak(doneDays) {
	const set = new Set(doneDays);
	let streak = 0;
	for (let d = 30; d >= 1; d -= 1) if (set.has(d)) streak += 1;
	else if (d < 30) break;
	else continue;
	return streak;
}
function ProgressRing({ completed, total }) {
	const pct = completed / total * 100;
	const r = 54;
	const c = 2 * Math.PI * r;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative mx-auto grid h-36 w-36 place-items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 128 128",
			className: "h-full w-full -rotate-90",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "64",
				cy: "64",
				r,
				fill: "none",
				stroke: "#e4d8cc",
				strokeWidth: "10"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "64",
				cy: "64",
				r,
				fill: "none",
				stroke: "#77132C",
				strokeWidth: "10",
				strokeLinecap: "round",
				strokeDasharray: c,
				strokeDashoffset: c - pct / 100 * c,
				className: "transition-all duration-700"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-serif text-2xl text-red",
				children: completed
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[10px] tracking-[0.18em] text-muted uppercase",
				children: ["of ", total]
			})]
		})]
	});
}
function HabitPreview() {
	const { data } = useQuery({
		queryKey: ["habit-checkoffs"],
		queryFn: () => loadHabitCheckoffs()
	});
	const doneToday = (data ?? []).filter((h) => h.done).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-10 border border-rule bg-white p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-semibold tracking-[0.28em] text-red uppercase",
				children: "Micro-habit tracker"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-serif text-2xl",
				children: "Small, kept, on purpose."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-[12px] font-semibold text-muted",
				children: [doneToday, " done today"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm leading-relaxed text-muted",
			children: "Return from Day 19 onward to check off your chosen ritual each day."
		})]
	});
}
//#endregion
export { Dashboard as component };
