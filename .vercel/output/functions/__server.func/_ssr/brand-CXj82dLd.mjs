import { o as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { v as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { a as hasGateSessionMarker } from "./server-CVnrzVI8.mjs";
import { i as signOut } from "./client-B40BzJxt.mjs";
import { t as authMiddleware } from "./middleware-DNAHkllt.mjs";
import { t as useCurrentUser } from "./use-current-user-DG6UNzh9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/brand-CXj82dLd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var loadWorkbookState = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("b4ab9db9e97af5a036810f7b636d3cfc65ab7e686d03101ac18834225945309e"));
var saveJournalEntry = createServerFn({ method: "POST" }).validator((input) => input).middleware([authMiddleware]).handler(createSsrRpc("8d15ec6e00fcbf7ba37fd94bf83c0d98f34cc9e1252ba5fcd7a1dd71af623aa0"));
var saveCheckin = createServerFn({ method: "POST" }).validator((input) => input).middleware([authMiddleware]).handler(createSsrRpc("903e6d363189793e36406b5cd3bbdaa4e3733ba775df1d18bb6d18150f5ae49d"));
var toggleDayComplete = createServerFn({ method: "POST" }).validator((input) => input).middleware([authMiddleware]).handler(createSsrRpc("69e2f7970b445ff43bba82817f0c07adceb3c5a679e5b8e08189b59bc23c6bed"));
var unmarkDayComplete = createServerFn({ method: "POST" }).validator((input) => input).middleware([authMiddleware]).handler(createSsrRpc("4e09f71f74a23b393f984e6df6254bf3fe47647235bfcf2bf89cfe75bf9c31d4"));
var saveSoloMode = createServerFn({ method: "POST" }).validator((input) => input).middleware([authMiddleware]).handler(createSsrRpc("aa03d203f369b82c13cd7621ea8c5035c1e098a0f17213bc7818834ab6207ea1"));
createServerFn({ method: "POST" }).validator((input) => input).middleware([authMiddleware]).handler(createSsrRpc("4b1598c541bd6cf0b85b57bc4e4cdbb66e4eedde0df77762d09726df1060206e"));
var loadPrayerState = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("764dcc09ac7c0a77e4fffbe0dfd17a9d36c6ede1ff9c17038dad604ef5ff5024"));
var togglePrayerRead = createServerFn({ method: "POST" }).validator((input) => input).middleware([authMiddleware]).handler(createSsrRpc("6bd732f3cb5e0fbe0042f4708c2ebb6455fb2f896617991dd3d195430d56e077"));
var loadHabitCheckoffs = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("249b9ffe49bf3781f66ea31c5f4f59be25f0a5e2fc12742a708c3d1c0cd48dfe"));
createServerFn({ method: "POST" }).validator((input) => input).middleware([authMiddleware]).handler(createSsrRpc("5bf07b3912cd68f0c4a8435cc7341acbf6e14a83c7f2ce8c8394b8d37f5b821c"));
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
/**
* Auth state components — plain wrappers around `useCurrentUserState()`.
*
* With auth on, visitors are signed out until they authenticate — in the sandbox
* live preview too, which does real sign-in. The shared dev user appears only
* when auth is disabled (`VITE_AUTH_ENABLED=false`, the shipped default).
* While the session is still resolving, gates that care about signed-out state
* render nothing so there's no signed-out flash on hard reload.
*/
/** Where `RedirectToSignIn` sends signed-out visitors. Create this route. */
var SIGN_IN_PATH = "/login";
/**
* Client-side redirect to the sign-in route (TanStack `<Navigate>` — NOT a full
* `window.location` reload). A hard navigation re-bootstraps the SPA and re-runs
* session loading, which feels like a second "Loading…" on /login.
*
* Guard routes by waiting out `isPending` first (see `use-current-user`), then
* render this.
*/
function RedirectToSignIn({ to = SIGN_IN_PATH }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to });
}
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
function Brand({ title = "The Marriage Reset", className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `inline-flex items-center gap-2.5 ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid h-9 w-9 shrink-0 place-items-center bg-red",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "select-none font-serif text-[16px] font-semibold leading-none text-ivory",
				children: [
					"G",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-gold",
						children: "·"
					}),
					"H"
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-serif text-[17px] font-bold leading-tight text-ink",
			children: title
		})]
	});
}
//#endregion
export { loadPrayerState as a, saveJournalEntry as c, togglePrayerRead as d, unmarkDayComplete as f, loadHabitCheckoffs as i, saveSoloMode as l, RedirectToSignIn as n, loadWorkbookState as o, UserButton as r, saveCheckin as s, Brand as t, toggleDayComplete as u };
