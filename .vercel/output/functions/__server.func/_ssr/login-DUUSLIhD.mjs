import { o as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as GROK_PROVIDERS } from "./server-CVnrzVI8.mjs";
import { r as signIn, t as authClient } from "./client-B40BzJxt.mjs";
import { n as useCurrentUserState } from "./use-current-user-DG6UNzh9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DUUSLIhD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var providerMark = (providerId) => providerId === "grok-google" ? "G" : "𝕏";
function LoginPage() {
	const { user, isPending } = useCurrentUserState();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	if (isPending) return null;
	const submit = async (event) => {
		event.preventDefault();
		setBusy(true);
		setError(null);
		try {
			if (mode === "signup") {
				const { error: signUpError } = await authClient.signUp.email({
					name,
					email,
					password
				});
				if (signUpError) throw new Error(signUpError.message ?? "Could not create your account.");
			} else {
				const { error: signInError } = await authClient.signIn.email({
					email,
					password
				});
				if (signInError) throw new Error(signInError.message ?? "That sign-in didn't work.");
			}
			navigate({ to: "/dashboard" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong.");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-dvh items-center justify-center bg-ivory px-5 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-semibold tracking-[0.28em] text-red uppercase",
							children: "Grace and Harmony Press"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-4 font-serif text-3xl text-ink",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "italic",
									children: "the"
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-red",
									children: "Marriage"
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "italic",
									children: "Reset"
								})
							]
						}),
						!user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-muted",
							children: "Sign in to continue your 30-day journey."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-muted",
							children: "You're signed in."
						})
					]
				}),
				user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-rule bg-white p-6 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-serif text-lg text-ink",
						children: "Welcome back."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/dashboard",
						className: "mt-4 inline-block bg-red px-5 py-2.5 text-[12px] font-semibold tracking-[0.16em] text-ivory uppercase transition-colors hover:bg-red/90",
						children: "Continue to dashboard"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-rule bg-white p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-0 border border-rule",
							children: ["signin", "signup"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setMode(m);
									setError(null);
								},
								className: `px-3 py-2 text-[12px] font-semibold tracking-[0.14em] uppercase transition-colors ${mode === m ? "bg-red text-ivory" : "bg-white text-muted hover:text-red"}`,
								children: m === "signin" ? "Sign in" : "Create account"
							}, m))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: submit,
							className: "mt-4 flex flex-col gap-3",
							children: [
								mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-semibold tracking-[0.16em] text-muted uppercase",
										children: "Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: name,
										onChange: (e) => setName(e.target.value),
										autoComplete: "name",
										required: true,
										className: "mt-1 block w-full border border-rule bg-white p-2.5 font-serif text-[15px] text-ink placeholder:text-muted/60 focus:border-red focus:outline-none"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-semibold tracking-[0.16em] text-muted uppercase",
										children: "Email"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "email",
										value: email,
										onChange: (e) => setEmail(e.target.value),
										autoComplete: "email",
										required: true,
										className: "mt-1 block w-full border border-rule bg-white p-2.5 font-serif text-[15px] text-ink placeholder:text-muted/60 focus:border-red focus:outline-none"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-semibold tracking-[0.16em] text-muted uppercase",
										children: "Password"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "password",
										value: password,
										onChange: (e) => setPassword(e.target.value),
										autoComplete: mode === "signup" ? "new-password" : "current-password",
										required: true,
										minLength: 8,
										className: "mt-1 block w-full border border-rule bg-white p-2.5 font-serif text-[15px] text-ink placeholder:text-muted/60 focus:border-red focus:outline-none"
									})]
								}),
								error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									role: "alert",
									className: "border border-red/30 bg-red/5 p-2.5 text-sm leading-relaxed text-red",
									children: error
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: busy,
									className: "mt-1 bg-red px-4 py-2.5 text-[12px] font-semibold tracking-[0.16em] text-ivory uppercase transition-colors hover:bg-red/90 disabled:cursor-wait disabled:opacity-60",
									children: busy ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "my-5 flex items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-rule" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-semibold tracking-[0.2em] text-muted uppercase",
									children: "or continue with"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-rule" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-col gap-2",
							children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									signIn(p.providerId, { callbackURL: "/dashboard" });
								},
								className: "flex w-full items-center justify-center gap-2.5 border border-rule bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-red/40 hover:bg-ivory",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-6 w-6 place-items-center bg-red/10 text-[13px] font-bold text-red",
										children: providerMark(p.providerId)
									}),
									"Continue with ",
									p.label
								]
							}, p.providerId))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 text-center text-[11px] leading-relaxed text-muted",
					children: "Your entries are private and stored only in your account."
				})
			]
		})
	});
}
//#endregion
export { LoginPage as component };
