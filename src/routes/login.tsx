import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { authClient, GROK_PROVIDERS, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/login")({ component: LoginPage });

const providerMark = (providerId: string) =>
  providerId === "grok-google" ? "G" : "𝕏";

function LoginPage() {
  const { user, isPending } = useCurrentUserState();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  if (isPending) return null;

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (mode === "signup") {
        const { error: signUpError } = await authClient.signUp.email({
          name,
          email,
          password,
        });
        if (signUpError) throw new Error(signUpError.message ?? "Could not create your account.");
      } else {
        const { error: signInError } = await authClient.signIn.email({ email, password });
        if (signInError) throw new Error(signInError.message ?? "That sign-in didn't work.");
      }
      navigate({ to: "/dashboard" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="flex min-h-dvh items-center justify-center bg-ivory px-5 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-red uppercase">
            Grace and Harmony Press
          </p>
          <h1 className="mt-4 font-serif text-3xl text-ink">
            <span className="italic">the</span>{" "}
            <span className="text-red">Marriage</span>{" "}
            <span className="italic">Reset</span>
          </h1>
          {!user ? (
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Sign in to continue your 30-day journey.
            </p>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-muted">You're signed in.</p>
          )}
        </div>

        {user ? (
          <div className="border border-rule bg-white p-6 text-center">
            <p className="font-serif text-lg text-ink">Welcome back.</p>
            <Link
              to="/dashboard"
              className="mt-4 inline-block bg-red px-5 py-2.5 text-[12px] font-semibold tracking-[0.16em] text-ivory uppercase transition-colors hover:bg-red/90"
            >
              Continue to dashboard
            </Link>
          </div>
        ) : (
          <div className="border border-rule bg-white p-6">
            <div className="grid grid-cols-2 gap-0 border border-rule">
              {(["signin", "signup"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    setMode(m);
                    setError(null);
                  }}
                  className={`px-3 py-2 text-[12px] font-semibold tracking-[0.14em] uppercase transition-colors ${
                    mode === m ? "bg-red text-ivory" : "bg-white text-muted hover:text-red"
                  }`}
                >
                  {m === "signin" ? "Sign in" : "Create account"}
                </button>
              ))}
            </div>

            <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
              {mode === "signup" && (
                <label className="block">
                  <span className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
                    Name
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    required
                    className="mt-1 block w-full border border-rule bg-white p-2.5 font-serif text-[15px] text-ink placeholder:text-muted/60 focus:border-red focus:outline-none"
                  />
                </label>
              )}
              <label className="block">
                <span className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
                  Email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="mt-1 block w-full border border-rule bg-white p-2.5 font-serif text-[15px] text-ink placeholder:text-muted/60 focus:border-red focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
                  Password
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  required
                  minLength={8}
                  className="mt-1 block w-full border border-rule bg-white p-2.5 font-serif text-[15px] text-ink placeholder:text-muted/60 focus:border-red focus:outline-none"
                />
              </label>

              {error ? (
                <p role="alert" className="border border-red/30 bg-red/5 p-2.5 text-sm leading-relaxed text-red">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={busy}
                className="mt-1 bg-red px-4 py-2.5 text-[12px] font-semibold tracking-[0.16em] text-ivory uppercase transition-colors hover:bg-red/90 disabled:cursor-wait disabled:opacity-60"
              >
                {busy
                  ? "Please wait…"
                  : mode === "signup"
                    ? "Create account"
                    : "Sign in"}
              </button>
            </form>

            <div className="my-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-rule" />
              <span className="text-[10px] font-semibold tracking-[0.2em] text-muted uppercase">
                or continue with
              </span>
              <span className="h-px flex-1 bg-rule" />
            </div>

            <div className="flex flex-col gap-2">
              {GROK_PROVIDERS.map((p) => (
                <button
                  key={p.providerId}
                  type="button"
                  onClick={() => {
                    void signIn(p.providerId, { callbackURL: "/dashboard" });
                  }}
                  className="flex w-full items-center justify-center gap-2.5 border border-rule bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-red/40 hover:bg-ivory"
                >
                  <span className="grid h-6 w-6 place-items-center bg-red/10 text-[13px] font-bold text-red">
                    {providerMark(p.providerId)}
                  </span>
                  Continue with {p.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <p className="mt-8 text-center text-[11px] leading-relaxed text-muted">
          Your entries are private and stored only in your account.
        </p>
      </div>
    </main>
  );
}