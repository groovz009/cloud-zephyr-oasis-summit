import { o as __toESM } from "./_runtime.mjs";
import { i as require_react, r as require_jsx_runtime, t as useQuery } from "./_libs/react+tanstack__react-query.mjs";
import { _ as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as Download } from "./_libs/lucide-react.mjs";
import { r as Route$2 } from "./_ssr/router-CPsXEPyb.mjs";
import { n as useCurrentUserState } from "./_ssr/use-current-user-DG6UNzh9.mjs";
import { c as saveJournalEntry, f as unmarkDayComplete, n as RedirectToSignIn, o as loadWorkbookState, s as saveCheckin, u as toggleDayComplete } from "./_ssr/brand-CXj82dLd.mjs";
import { i as getDaysByWeek, n as WEEKS, r as getDayByNumber } from "./_ssr/constants-7SPQgx53.mjs";
import { n as headerLink, t as AppHeader } from "./_ssr/app-header-QA1LvoHa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_dayNumber-Q_RrAE-y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function WriteLineField({ field, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "mt-3 block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block font-serif text-base leading-relaxed text-ink",
			children: field.prompt
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "text",
			value,
			onChange: (e) => onChange(e.target.value),
			placeholder: field.placeholder,
			className: "mt-2 block w-full border-b border-rule bg-transparent py-2 font-serif text-base text-ink placeholder:text-muted/60 focus:border-red focus:outline-none"
		})]
	});
}
function WriteBoxField({ field, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "mt-3 block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block font-serif text-base leading-relaxed text-ink",
			children: field.prompt
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			value,
			onChange: (e) => onChange(e.target.value),
			placeholder: field.placeholder,
			rows: field.tall ? 6 : 4,
			className: "mt-2 block w-full resize-y border border-rule bg-white p-3 font-serif text-base text-ink placeholder:text-muted/60 focus:border-red focus:outline-none"
		})]
	});
}
function SentenceTemplateField({ field, value, onChange }) {
	const [before, after] = splitOnBlank(field.placeholder ?? "");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block font-serif text-base leading-relaxed text-ink",
			children: field.prompt
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 flex flex-wrap items-baseline gap-x-1 border-b border-rule py-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-serif text-base leading-relaxed text-ink",
					children: before
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					value,
					onChange: (e) => onChange(e.target.value),
					placeholder: "â€¦",
					className: "min-w-28 flex-1 bg-transparent font-serif text-base text-red underline decoration-red/40 decoration-2 underline-offset-4 placeholder:text-muted/40 focus:outline-none"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-serif text-base leading-relaxed text-ink",
					children: after
				})
			]
		})]
	});
}
function splitOnBlank(template) {
	const idx = template.indexOf("____");
	if (idx < 0) return [template, ""];
	return [template.slice(0, idx), template.slice(idx + 4)];
}
function CheckboxGroupField({ field, value, onChange, multiple = false }) {
	const selected = value ? value.split("||") : [];
	const toggle = (label) => {
		if (multiple) onChange((selected.includes(label) ? selected.filter((s) => s !== label) : [...selected, label]).join("||"));
		else onChange(selected[0] === label ? "" : label);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block font-serif text-base leading-relaxed text-ink",
			children: field.prompt
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 flex flex-col gap-2",
			children: field.options.map((opt) => {
				const checked = selected.includes(opt);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => toggle(opt),
					"aria-pressed": checked,
					className: `flex items-start gap-3 border px-3 py-2 text-left font-serif text-[15px] leading-snug transition-colors ${checked ? "border-red bg-red/5 text-ink" : "border-rule bg-white text-muted hover:border-red/40"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `mt-0.5 grid h-4 w-4 shrink-0 place-items-center border ${checked ? "border-red bg-red" : "border-rule"}`,
						children: checked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 bg-ivory" }) : null
					}), opt]
				}, opt);
			})
		})]
	});
}
function AutoSaveField({ field, day, initial, multiple }) {
	const [value, setValue] = (0, import_react.useState)(initial);
	const [saved, setSaved] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(false);
	const commit = (next) => {
		setValue(next);
		setSaved(false);
		setError(false);
		const send = async () => {
			try {
				await saveJournalEntry({ data: {
					day,
					key: field.key,
					value: next
				} });
				setSaved(true);
			} catch {
				setSaved(true);
				setError(true);
			}
		};
		send();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		field.type === "write_line" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WriteLineField, {
			field,
			value,
			onChange: commit
		}),
		field.type === "write_box" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WriteBoxField, {
			field,
			value,
			onChange: commit
		}),
		field.type === "sentence_template" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SentenceTemplateField, {
			field,
			value,
			onChange: commit
		}),
		field.type === "checkbox_group" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxGroupField, {
			field,
			value,
			onChange: commit,
			multiple: multiple ?? field.options.length > 8
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-right text-[11px] text-muted/70",
			children: error ? "Couldn't save — will retry on next edit" : saved ? "Saved" : "…"
		})
	] });
}
function DayPage() {
	const { dayNumber } = Route$2.useParams();
	const day = getDayByNumber(Number(dayNumber));
	const { user, isPending } = useCurrentUserState();
	const [localMode, setLocalMode] = (0, import_react.useState)("solo");
	const { data, isLoading } = useQuery({
		queryKey: ["workbook-state"],
		queryFn: () => loadWorkbookState()
	});
	if (isPending) return null;
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (!day) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-dvh flex-col items-center justify-center gap-4 bg-ivory px-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-serif text-2xl text-ink",
			children: "That day doesn't exist."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/dashboard",
			className: "text-red underline-offset-4 hover:underline",
			children: "Back to dashboard"
		})]
	});
	if (isLoading || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-dvh bg-ivory" });
	const week = WEEKS.find((w) => w.number === day.week);
	const journalMap = new Map(data.journal.map((j) => [`${j.day_number}:${j.field_key}`, j.value]));
	const isCompleted = data.completedDays.includes(day.day);
	const prevDay = day.day > 1 ? day.day - 1 : null;
	const nextDay = day.day < 30 ? day.day + 1 : null;
	const weekDays = getDaysByWeek(day.week);
	const mode = day.mode === "solo" ? "solo" : localMode;
	const showCheckin = day.checkinAtStart === true || day.checkinAtEnd === true;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-dvh bg-ivory text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, { nav: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
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
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-rule",
					children: "|"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/prayers",
					className: headerLink,
					children: "Prayers"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-rule",
					children: "|"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "/downloads/the-marriage-reset.pdf",
					download: true,
					className: "inline-flex items-center gap-1.5 text-[13px] font-semibold tracking-[0.14em] text-red uppercase underline-offset-4 hover:underline",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
						className: "h-3.5 w-3.5",
						strokeWidth: 2.5
					}), "Download PDF"]
				})
			] }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl px-4 pb-16 pt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] font-semibold tracking-[0.28em] text-red uppercase",
						children: [
							"Day ",
							day.day,
							" · Week ",
							day.week,
							" — ",
							week?.name,
							day.mode === "couple" || day.mode === "couple_integration" || day.mode === "couple_finale" ? " · Couple" : day.mode === "solo_tool" ? " · Tool" : day.mode === "couple_or_solo" ? " · Quick Win" : ""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-serif text-4xl leading-tight md:text-5xl",
						children: day.title
					}),
					(day.mode === "couple" || day.mode === "couple_integration" || day.mode === "couple_finale" || day.mode === "couple_or_solo") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex gap-1 border border-rule bg-white p-1 text-[12px]",
						children: ["solo", "couple"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setLocalMode(m),
							className: `flex-1 px-3 py-1.5 font-semibold tracking-[0.12em] uppercase transition-colors ${mode === m ? "bg-red text-ivory" : "text-muted hover:text-red"}`,
							children: m === "solo" ? "Going solo" : "Doing this together"
						}, m))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 font-serif text-lg leading-relaxed text-ink",
						children: day.intro
					}),
					day.whyItMatters && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 font-serif text-base leading-relaxed text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-red",
								children: "Why this matters:"
							}),
							" ",
							day.whyItMatters
						]
					}),
					(day.day === 1 || day.day === 8 || day.day === 15 || day.day === 22) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: `/workbook/images/week-${day.week}-band.jpg`,
						alt: `Week ${day.week} — ${week?.name}`,
						className: "mt-6 aspect-[3/1] w-full object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-[12px] font-semibold tracking-[0.24em] text-red uppercase",
								children: "Today's reflection"
							}),
							showCheckin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckinSection, {
								checkpoint: day.checkinAtStart === true ? 0 : day.day,
								initialCards: data.checkins
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 flex flex-col gap-4",
								children: day.exercises.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AutoSaveField, {
									field,
									day: day.day,
									initial: journalMap.get(`${day.day}:${field.key}`) ?? ""
								}, field.key))
							}),
							day.soloNote && mode === "solo" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 border-l-2 border-gold bg-white px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-serif text-[15px] italic leading-relaxed text-muted",
									children: day.soloNote
								})
							}),
							day.prayer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 border-l-2 border-red/30 bg-white px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-serif text-[15px] italic leading-relaxed text-muted",
									children: day.prayer
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] tracking-[0.2em] text-muted uppercase",
							children: [
								"Week ",
								day.week,
								" — ",
								weekDays.length,
								" days"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-1.5",
							children: weekDays.map((d) => {
								const done = data.completedDays.includes(d.day);
								const isCur = d.day === day.day;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/day/$dayNumber",
									params: { dayNumber: String(d.day) },
									"aria-current": isCur ? "page" : void 0,
									className: `grid h-8 w-8 place-items-center rounded-sm text-[12px] font-semibold ${isCur ? "bg-red text-ivory ring-2 ring-red/30" : done ? "bg-gold text-ivory" : "border border-rule bg-white text-muted hover:border-red/40"}`,
									children: d.day
								}, d.day);
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex w-full flex-wrap items-center gap-2 sm:w-auto",
							children: [prevDay ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/day/$dayNumber",
								params: { dayNumber: String(prevDay) },
								className: "inline-flex min-h-11 items-center border border-red px-4 text-[12px] font-semibold tracking-[0.14em] text-red uppercase",
								children: ["Day ", prevDay]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/dashboard",
								className: "inline-flex min-h-11 items-center border border-rule px-4 text-[12px] font-semibold tracking-[0.14em] text-muted uppercase",
								children: "Back"
							}), nextDay ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/day/$dayNumber",
								params: { dayNumber: String(nextDay) },
								className: "inline-flex min-h-11 flex-1 items-center justify-center border border-red bg-red px-4 text-[12px] font-semibold tracking-[0.14em] text-ivory uppercase sm:flex-none",
								children: ["Day ", nextDay]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/dashboard",
								className: "inline-flex min-h-11 flex-1 items-center justify-center border border-red bg-red px-4 text-[12px] font-semibold tracking-[0.14em] text-ivory uppercase sm:flex-none",
								children: "Finish"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								if (isCompleted) unmarkDayComplete({ data: { day: day.day } });
								else toggleDayComplete({ data: { day: day.day } });
								window.location.reload();
							},
							className: `inline-flex min-h-11 items-center px-4 text-[12px] font-semibold tracking-[0.14em] uppercase ${isCompleted ? "border border-gold bg-gold text-ivory" : "border border-ink text-ink"}`,
							children: isCompleted ? "Completed ✓" : "Mark as complete"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-rule px-5 py-6 text-center text-[11px] leading-relaxed text-muted",
				children: "The Marriage Reset is an educational workbook. It is not therapy, counseling, or medical advice. If you are in crisis or danger, contact local emergency services."
			})
		]
	});
}
function CheckinSection({ checkpoint, initialCards }) {
	const existing = initialCards.find((c) => c.checkpoint === checkpoint);
	const [howAreWe, setHowAreWe] = (0, import_react.useState)(existing?.q_how_are_we ?? "");
	const [need, setNeed] = (0, import_react.useState)(existing?.q_need_right_now ?? "");
	const [next, setNext] = (0, import_react.useState)(existing?.q_next_step ?? "");
	const [saved, setSaved] = (0, import_react.useState)(true);
	const commit = async () => {
		setSaved(false);
		try {
			await saveCheckin({ data: {
				checkpoint,
				howAreWe,
				needRightNow: need,
				nextStep: next
			} });
			setSaved(true);
		} catch {
			setSaved(true);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 border border-gold bg-gold/10 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-semibold tracking-[0.22em] text-red uppercase",
				children: "Weekly Check-In Card"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-serif text-sm italic text-muted",
				children: "Five minutes. Be honest even when the honest answer is \"not great\"."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WriteBoxField, {
						field: {
							key: "how_are_we",
							type: "write_box",
							prompt: "How are we, really?"
						},
						value: howAreWe,
						onChange: setHowAreWe
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WriteBoxField, {
						field: {
							key: "need",
							type: "write_box",
							prompt: "What do we need right now?"
						},
						value: need,
						onChange: setNeed
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WriteBoxField, {
						field: {
							key: "next",
							type: "write_box",
							prompt: "What's one small next step?"
						},
						value: next,
						onChange: setNext
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
					onClick: () => void commit(),
					className: "border border-red px-4 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-red uppercase",
					children: "Save"
				})]
			})
		]
	});
}
//#endregion
export { DayPage as component };
