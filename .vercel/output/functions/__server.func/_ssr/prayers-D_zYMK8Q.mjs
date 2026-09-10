import { o as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useCurrentUserState } from "./use-current-user-DG6UNzh9.mjs";
import { a as loadPrayerState, d as togglePrayerRead, n as RedirectToSignIn } from "./brand-CXj82dLd.mjs";
import { n as headerLink, t as AppHeader } from "./app-header-QA1LvoHa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/prayers-D_zYMK8Q.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PRAYERS = [
	{
		night: 1,
		week: 1,
		text: "God, help us see clearly — not to assign blame, just to notice where the distance actually lives.",
		reference: "Psalm 139:23–24"
	},
	{
		night: 2,
		week: 1,
		text: "Show us the moment connection quietly became logistics, and give us the patience to notice it without shame.",
		reference: "Proverbs 4:23"
	},
	{
		night: 3,
		week: 1,
		text: "Slow us down enough to actually hear each other's small, easy-to-miss bids for attention.",
		reference: "James 1:19"
	},
	{
		night: 4,
		week: 1,
		text: "We bring You what we're really longing for, even the parts we haven't said out loud to each other yet.",
		reference: "Psalm 62:8"
	},
	{
		night: 5,
		week: 1,
		text: "Where we've told ourselves a hopeless story about this marriage, help us see the truer, gentler one.",
		reference: "Isaiah 43:18–19"
	},
	{
		night: 6,
		week: 1,
		text: "Give us the courage for one small turn toward each other this week, however small it feels.",
		reference: "1 Thessalonians 5:11"
	},
	{
		night: 7,
		week: 1,
		text: "Thank You for whatever we were willing to notice this week, even the uncomfortable parts.",
		reference: "Psalm 100:4–5"
	},
	{
		night: 8,
		week: 2,
		text: "Where fear has kept us quiet, replace it with the steadiness to speak honestly.",
		reference: "2 Timothy 1:7"
	},
	{
		night: 9,
		week: 2,
		text: "Make us quick to repair and slow to escalate, even when we're tired or hurt.",
		reference: "Matthew 5:9"
	},
	{
		night: 10,
		week: 2,
		text: "Help us find the softer truth underneath our sharpest complaints.",
		reference: "Proverbs 20:5"
	},
	{
		night: 11,
		week: 2,
		text: "Let the words we practice this week actually land as gentle, even under pressure.",
		reference: "Proverbs 16:24"
	},
	{
		night: 12,
		week: 2,
		text: "Season our speech with grace tonight, especially in the small, ordinary friction.",
		reference: "Colossians 4:6"
	},
	{
		night: 13,
		week: 2,
		text: "Cast out whatever fear is keeping either of us from being fully honest.",
		reference: "1 John 4:18"
	},
	{
		night: 14,
		week: 2,
		text: "Thank You for whatever honest words got said this week — help us keep speaking truth in love.",
		reference: "Ephesians 4:15"
	},
	{
		night: 15,
		week: 3,
		text: "Remind us that we're stronger noticing and rebuilding this together than either of us could alone.",
		reference: "Ecclesiastes 4:9–10"
	},
	{
		night: 16,
		week: 3,
		text: "Teach us to number these small, ordinary days rightly, instead of waiting for a dramatic one.",
		reference: "Psalm 90:12"
	},
	{
		night: 17,
		week: 3,
		text: "Let our yes be yes this week — help us keep the small promises we make to each other.",
		reference: "Matthew 5:37"
	},
	{
		night: 18,
		week: 3,
		text: "Thank You for the small deposits we made into each other this week, even the ones that went unnoticed.",
		reference: "1 Thessalonians 5:18"
	},
	{
		night: 19,
		week: 3,
		text: "Give us the patience to keep this small habit going, even after the novelty wears off.",
		reference: "Galatians 6:9"
	},
	{
		night: 20,
		week: 3,
		text: "Help us be genuinely devoted to each other in this one small, ordinary ritual tonight.",
		reference: "Romans 12:10"
	},
	{
		night: 21,
		week: 3,
		text: "We commit this rebuilding to You, trusting it more than our own uncertain feelings about how it's going.",
		reference: "Proverbs 3:5–6"
	},
	{
		night: 22,
		week: 4,
		text: "Thank You for whatever has actually shifted this month, however small it looks from the outside.",
		reference: "Psalm 126:3"
	},
	{
		night: 23,
		week: 4,
		text: "Thank You that Your mercy toward us — and the mercy we owe each other — is new again tomorrow morning.",
		reference: "Lamentations 3:22–23"
	},
	{
		night: 24,
		week: 4,
		text: "As we write to each other tonight, help our words be true, specific, and kind.",
		reference: "Song of Solomon 8:6"
	},
	{
		night: 25,
		week: 4,
		text: "Be the third strand holding what the two of us alone couldn't hold as well.",
		reference: "Ecclesiastes 4:12"
	},
	{
		night: 26,
		week: 4,
		text: "Whatever one word describes this month, thank You for the chance to keep choosing better words going forward.",
		reference: "Proverbs 18:21"
	},
	{
		night: 27,
		week: 4,
		text: "Thank You for carrying the good work You started in this marriage this month, even in its unfinished shape.",
		reference: "Philippians 1:6"
	},
	{
		night: 28,
		week: 4,
		text: "Help us forgive tonight — each other, and ourselves — the way we've been forgiven.",
		reference: "Colossians 3:13"
	},
	{
		night: 29,
		week: 4,
		text: "Tomorrow we choose again. Tonight, prepare our hearts to mean it.",
		reference: "Joshua 24:15"
	},
	{
		night: 30,
		week: 4,
		text: "Wherever this marriage goes next, we go together — thank You for thirty days that brought us back to that choice.",
		reference: "Ruth 1:16–17"
	}
];
var WEEK_NAMES = [
	"",
	"Notice",
	"Speak",
	"Trust",
	"Reconnect"
];
function Prayers() {
	const { user, isPending } = useCurrentUserState();
	const { data, isLoading, refetch } = useQuery({
		queryKey: ["prayer-state"],
		queryFn: () => loadPrayerState()
	});
	const [openNight, setOpenNight] = (0, import_react.useState)(null);
	const readSet = (0, import_react.useMemo)(() => new Set((data?.prayers ?? []).filter((p) => p.read).map((p) => p.night)), [data]);
	const count = readSet.size;
	if (isPending) return null;
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (isLoading || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-dvh bg-ivory" });
	const toggle = async (night) => {
		const next = !readSet.has(night);
		setOpenNight(next ? night : null);
		await togglePrayerRead({ data: {
			night,
			read: next
		} });
		refetch();
	};
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
				to: "/checkins",
				className: headerLink,
				children: "Check-Ins"
			})
		] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-4xl px-4 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-semibold tracking-[0.28em] text-red uppercase",
					children: "Bonus · Invitation"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-serif text-4xl md:text-5xl",
					children: "30 Nights of Prayer"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 max-w-xl font-serif text-base leading-relaxed text-muted",
					children: ["One short prayer a night, said together if you can, said alone if you're the only one praying tonight.", count > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						" ",
						"You've prayed ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-red",
							children: [count, " of 30"]
						}),
						" nights."
					] }) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-sm italic text-muted",
					children: "Faith is an invitation here, never a requirement. If it's not your season, the rest of the reset still stands."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 flex flex-col gap-6",
					children: [
						1,
						2,
						3,
						4
					].map((week) => {
						const nights = PRAYERS.filter((p) => p.week === week);
						const weekCount = nights.filter((n) => readSet.has(n.night)).length;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between border-b border-rule pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] font-semibold tracking-[0.28em] text-red uppercase",
								children: [
									"Week ",
									week,
									" · ",
									WEEK_NAMES[week]
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[11px] text-muted",
								children: [
									weekCount,
									"/",
									nights.length
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 grid gap-2 sm:grid-cols-2",
							children: nights.map((p) => {
								const read = readSet.has(p.night);
								const open = openNight === p.night;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => void toggle(p.night),
									"aria-expanded": open,
									className: `border p-3 text-left transition-colors ${read ? "border-gold bg-gold/15" : "border-rule bg-white hover:border-red/40"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[11px] font-semibold tracking-[0.2em] text-red uppercase",
											children: ["Night ", p.night]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `mt-0.5 grid h-4 w-4 shrink-0 place-items-center border ${read ? "border-gold bg-gold" : "border-rule"}`,
											children: read ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 bg-ivory" }) : null
										})]
									}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-serif text-[15px] leading-relaxed text-ink",
											children: p.text
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-2 text-[11px] text-muted",
											children: ["Reference: ", p.reference]
										})]
									})]
								}, p.night);
							})
						})] }, week);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 border-t border-rule pt-6 text-center text-[11px] leading-relaxed text-muted",
					children: "The Marriage Reset is an educational workbook. It is not therapy, counseling, or medical advice. If you are in crisis or danger, contact local emergency services."
				})
			]
		})]
	});
}
//#endregion
export { Prayers as component };
