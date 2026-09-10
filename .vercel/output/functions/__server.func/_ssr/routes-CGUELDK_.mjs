import { r as require_jsx_runtime, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Download } from "../_libs/lucide-react.mjs";
import { n as useCurrentUserState } from "./use-current-user-DG6UNzh9.mjs";
import { o as loadWorkbookState, r as UserButton, t as Brand } from "./brand-CXj82dLd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CGUELDK_.js
var import_jsx_runtime = require_jsx_runtime();
var bonuses = [
	{
		id: "bonus-1",
		pdf: "/downloads/bonus-1-repair-script.pdf",
		img: "/workbook/images/bonus-1.jpg",
		kicker: "Bonus 01",
		title: "Repair Script",
		blurb: "Six lines to de-escalate. Print it. Put it on the fridge."
	},
	{
		id: "bonus-2",
		pdf: "/downloads/bonus-2-recommitment-letter.pdf",
		img: "/workbook/images/bonus-2.jpg",
		kicker: "Bonus 02",
		title: "Recommitment Letter",
		blurb: "Draft on Day 24. Exchange on Day 30."
	},
	{
		id: "bonus-3",
		pdf: "/downloads/bonus-3-30-nights-of-prayer.pdf",
		img: "/workbook/images/bonus-3.jpg",
		kicker: "Bonus 03",
		title: "30 Nights of Prayer",
		blurb: "One short prayer a night. Invitation, never a requirement."
	},
	{
		id: "bonus-4",
		pdf: "/downloads/bonus-4-weekly-check-in.pdf",
		img: "/workbook/images/bonus-4.jpg",
		kicker: "Bonus 04",
		title: "Weekly Check-In",
		blurb: "Three questions. Five minutes. The habit that outlasts the book."
	}
];
function Home() {
	const { user, isPending } = useCurrentUserState();
	const { data } = useQuery({
		queryKey: ["workbook-state"],
		queryFn: () => loadWorkbookState(),
		enabled: Boolean(user)
	});
	const completed = data?.completedDays ?? [];
	const currentDay = data?.profile?.current_day ?? 1;
	const streak = computeStreak(completed);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-dvh bg-ivory text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, { title: "Grace and Harmony Press" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-4",
					children: [!isPending && user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/dashboard",
						className: "text-[13px] font-semibold tracking-[0.14em] text-red uppercase underline-offset-4 hover:underline",
						children: "My journey"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})] }) : !isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "text-[13px] font-semibold tracking-[0.14em] text-red uppercase underline-offset-4 hover:underline",
						children: "Sign in"
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "/downloads/the-marriage-reset.pdf",
						download: true,
						className: "inline-flex items-center gap-2 bg-red px-4 py-2 text-[12px] font-semibold tracking-[0.14em] text-ivory uppercase transition-colors hover:bg-red/90",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
							className: "h-4 w-4",
							strokeWidth: 2.25
						}), "Download the book"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-4 md:grid-cols-[minmax(0,0.9fr)_1.1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-h-[72vh] overflow-hidden rounded-sm border border-rule bg-white shadow-[0_24px_60px_-28px_rgba(119,19,44,0.35)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/workbook/images/cover.png",
						alt: "The Marriage Reset cover",
						className: "mx-auto block h-auto max-h-[72vh] w-full object-contain"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[12px] font-semibold tracking-[0.32em] text-red uppercase",
						children: "Thank you for your purchase"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-3 font-serif text-5xl leading-[1.05] md:text-6xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic",
								children: "Your copy of"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block tracking-[0.08em] text-red uppercase",
								children: "the Marriage Reset"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic",
								children: "is ready."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-md text-lg leading-relaxed text-muted",
						children: "Everything you need for the next 30 days is below — the workbook and all four bonuses. Your progress is saved to your account whenever you sign in."
					}),
					!isPending && user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 border border-rule bg-white p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-semibold tracking-[0.22em] text-red uppercase",
								children: "Your journey progress"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-serif text-lg text-ink",
								children: [
									"Day ",
									currentDay,
									" of 30 · ",
									completed.length,
									" complete",
									streak > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										" ",
										"· ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-red",
											children: [streak, "-day streak"]
										})
									] }) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/dashboard",
								className: "mt-2 inline-block text-[13px] font-semibold tracking-[0.14em] text-red uppercase underline-offset-4 hover:underline",
								children: completed.length === 0 ? "Begin Day 1" : "Continue your journey"
							})
						]
					}) : !isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 border border-rule bg-white p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-semibold tracking-[0.22em] text-red uppercase",
								children: "Your progress"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-serif text-base leading-relaxed text-muted",
								children: "Sign in to start the 30 days — your entries stay private to your account."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								className: "mt-3 inline-block bg-red px-4 py-2 text-[12px] font-semibold tracking-[0.14em] text-ivory uppercase transition-colors hover:bg-red/90",
								children: "Sign in to begin"
							})
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "/downloads/the-marriage-reset.pdf",
							download: true,
							className: "inline-flex min-h-12 items-center justify-center gap-2.5 bg-red px-6 text-[13px] font-semibold tracking-[0.16em] text-ivory uppercase transition-colors hover:bg-red/90",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
								className: "h-[18px] w-[18px]",
								strokeWidth: 2.25
							}), "Download the book"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/read",
							className: "inline-flex min-h-12 items-center justify-center border border-red px-6 text-[13px] font-semibold tracking-[0.16em] text-red uppercase transition-colors hover:bg-red/5",
							children: "Read the workbook"
						})]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-rule bg-blush/50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-5 py-14",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[12px] font-semibold tracking-[0.28em] text-red uppercase",
						children: "The four weeks"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
						children: [
							[
								"01",
								"Notice",
								"See where the distance actually shows up."
							],
							[
								"02",
								"Speak",
								"The exact words for a hard moment."
							],
							[
								"03",
								"Trust",
								"One small ritual, kept on purpose."
							],
							[
								"04",
								"Reconnect",
								"A spoken choice on Day 30."
							]
						].map(([n, t, d]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border border-rule bg-ivory p-5 transition-colors hover:border-red/30 hover:bg-white",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] tracking-[0.2em] text-red",
									children: n
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-2 text-2xl text-red",
									children: t
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-muted",
									children: d
								})
							]
						}, n))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-5 py-14",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[12px] font-semibold tracking-[0.28em] text-red uppercase",
						children: "Your download library"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 text-3xl",
						children: "The workbook came with four bonuses. They're all yours."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-6 sm:grid-cols-2",
						children: bonuses.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "group flex gap-4 border border-rule bg-white p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-red/40 hover:shadow-[0_18px_40px_-26px_rgba(119,19,44,0.5)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: b.img,
								alt: "",
								className: "h-28 w-20 object-cover object-top"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-1 flex-col justify-between py-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] tracking-[0.22em] text-red uppercase",
										children: b.kicker
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xl",
										children: b.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm leading-relaxed text-muted",
										children: b.blurb
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex flex-wrap items-center gap-4 text-[12px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/read/$id",
										params: { id: b.id },
										className: "font-semibold tracking-[0.12em] text-red uppercase underline-offset-4 hover:underline",
										children: "Read"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: b.pdf,
										download: true,
										className: "inline-flex items-center gap-1.5 border border-red px-3 py-1.5 font-semibold tracking-[0.12em] text-red uppercase transition-colors hover:bg-red hover:text-ivory",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
											className: "h-3.5 w-3.5",
											strokeWidth: 2.5
										}), "Download PDF"]
									})]
								})]
							})]
						}, b.title))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-rule px-5 py-8 text-center text-[11px] leading-relaxed text-muted",
				children: "The Marriage Reset is an educational workbook. It is not therapy, counseling, or medical advice. If you are in crisis or danger, contact local emergency services."
			})
		]
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
//#endregion
export { Home as component };
