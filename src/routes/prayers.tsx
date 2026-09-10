import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { loadPrayerState, togglePrayerRead } from "@/lib/workbook/server";
import { PRAYERS } from "@/lib/workbook/prayers";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { AppHeader, headerLink } from "@/components/app-header";

export const Route = createFileRoute("/prayers")({
  component: Prayers,
});

const WEEK_NAMES = ["", "Notice", "Speak", "Trust", "Reconnect"] as const;

function Prayers() {
  const { user, isPending } = useCurrentUserState();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["prayer-state"],
    queryFn: () => loadPrayerState(),
  });
  const [openNight, setOpenNight] = useState<number | null>(null);

  const readSet = useMemo(
    () => new Set((data?.prayers ?? []).filter((p) => p.read).map((p) => p.night)),
    [data],
  );
  const count = readSet.size;

  if (isPending) return null;
  if (!user) return <RedirectToSignIn />;
  if (isLoading || !data) return <div className="min-h-dvh bg-ivory" />;

  const toggle = async (night: number) => {
    const next = !readSet.has(night);
    setOpenNight(next ? night : null);
    await togglePrayerRead({ data: { night, read: next } });
    void refetch();
  };

  return (
    <main className="min-h-dvh bg-ivory text-ink">
      <AppHeader
        nav={
          <>
            <Link to="/dashboard" className={headerLink}>
              Dashboard
            </Link>
            <span className="text-rule">|</span>
            <Link to="/checkins" className={headerLink}>
              Check-Ins
            </Link>
          </>
        }
      />

      <div className="mx-auto max-w-4xl px-4 py-8">
        <p className="text-[11px] font-semibold tracking-[0.28em] text-red uppercase">Bonus · Invitation</p>
        <h1 className="mt-2 font-serif text-4xl md:text-5xl">30 Nights of Prayer</h1>
        <p className="mt-3 max-w-xl font-serif text-base leading-relaxed text-muted">
          One short prayer a night, said together if you can, said alone if you're the only one praying tonight.
          {count > 0 ? (
            <>
              {" "}
              You've prayed <span className="text-red">{count} of 30</span> nights.
            </>
          ) : null}
        </p>
        <p className="mt-2 max-w-xl text-sm italic text-muted">
          Faith is an invitation here, never a requirement. If it's not your season, the rest of the reset still stands.
        </p>

        <div className="mt-8 flex flex-col gap-6">
          {[1, 2, 3, 4].map((week) => {
            const nights = PRAYERS.filter((p) => p.week === week);
            const weekCount = nights.filter((n) => readSet.has(n.night)).length;
            return (
              <section key={week}>
                <div className="flex items-baseline justify-between border-b border-rule pb-2">
                  <p className="text-[11px] font-semibold tracking-[0.28em] text-red uppercase">
                    Week {week} · {WEEK_NAMES[week]}
                  </p>
                  <span className="text-[11px] text-muted">
                    {weekCount}/{nights.length}
                  </span>
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {nights.map((p) => {
                    const read = readSet.has(p.night);
                    const open = openNight === p.night;
                    return (
                      <button
                        key={p.night}
                        type="button"
                        onClick={() => void toggle(p.night)}
                        aria-expanded={open}
                        className={`border p-3 text-left transition-colors ${
                          read ? "border-gold bg-gold/15" : "border-rule bg-white hover:border-red/40"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-[11px] font-semibold tracking-[0.2em] text-red uppercase">
                            Night {p.night}
                          </p>
                          <span
                            className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center border ${
                              read ? "border-gold bg-gold" : "border-rule"
                            }`}
                          >
                            {read ? <span className="h-1.5 w-1.5 bg-ivory" /> : null}
                          </span>
                        </div>
                        {open && (
                          <div className="mt-2">
                            <p className="font-serif text-[15px] leading-relaxed text-ink">{p.text}</p>
                            <p className="mt-2 text-[11px] text-muted">Reference: {p.reference}</p>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-10 border-t border-rule pt-6 text-center text-[11px] leading-relaxed text-muted">
          The Marriage Reset is an educational workbook. It is not therapy, counseling, or medical advice. If you are in
          crisis or danger, contact local emergency services.
        </div>
      </div>
    </main>
  );
}