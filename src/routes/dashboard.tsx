import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { WEEKS, getDaysByWeek } from "@/lib/workbook/constants";
import { loadWorkbookState, saveSoloMode, loadHabitCheckoffs } from "@/lib/workbook/server";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { AppHeader, headerLink } from "@/components/app-header";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { user, isPending } = useCurrentUserState();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["workbook-state"],
    queryFn: () => loadWorkbookState(),
  });
  const [modeSaved, setModeSaved] = useState(true);

  if (isPending) return null;
  if (!user) return <RedirectToSignIn />;
  if (isLoading || !data) return <div className="min-h-dvh bg-ivory" />;

  const completed = data.completedDays;
  const currentDay = data.profile?.current_day ?? 1;
  const soloMode = data.profile?.solo_mode ?? true;
  const allDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const streak = computeStreak(completed);

  const switchMode = async (solo: boolean) => {
    setModeSaved(false);
    await saveSoloMode({ data: { solo } });
    setModeSaved(true);
    void refetch();
  };

  return (
    <main className="min-h-dvh bg-ivory text-ink">
      <AppHeader
        nav={
          <>
            <Link to="/checkins" className={headerLink}>
              Check-Ins
            </Link>
            <span className="text-rule">|</span>
            <Link to="/prayers" className={headerLink}>
              Prayers
            </Link>
          </>
        }
      />

      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* welcome */}
        <section className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.28em] text-red uppercase">
              {user.displayName ?? "Welcome back"}
            </p>
            <h1 className="mt-1 font-serif text-4xl md:text-5xl">
              {completed.length === 0 ? "Your journey starts here" : "Keep going"}
            </h1>
          </div>
          <div className="flex items-center gap-1 border border-rule bg-white p-1 text-[12px]">
            {([true, false] as const).map((solo) => (
              <button
                key={String(solo)}
                type="button"
                onClick={() => void switchMode(solo)}
                disabled={!modeSaved}
                className={`px-3 py-1.5 font-semibold tracking-[0.12em] uppercase transition-colors ${
                  soloMode === solo ? "bg-red text-ivory" : "text-muted hover:text-red"
                }`}
              >
                {solo ? "Doing this alone" : "With my spouse"}
              </button>
            ))}
            <span className="ml-1 pr-1 text-[11px] text-muted/60">{modeSaved ? "" : "…"}</span>
          </div>
        </section>

        {/* progress ring + streak */}
        <section className="mt-8 grid gap-4 md:grid-cols-[auto_1fr]">
          <ProgressRing completed={completed.length} total={30} />
          <div className="flex flex-col justify-center gap-3 border border-rule bg-white p-5">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-red uppercase">
              Progress
            </p>
            <p className="font-serif text-xl text-ink">
              {completed.length} of 30 days complete
              {streak > 1 ? <> · <span className="text-red">{streak}-day streak</span></> : null}
            </p>
            <p className="text-sm leading-relaxed text-muted">
              {completed.length === 0
                ? "Start with Day 1 — it takes about ten minutes."
                : completed.length === 30
                  ? "You finished all thirty days. The habit doesn't stop here."
                  : `You're on Day ${currentDay}. Small, kept, on purpose — that's the whole method.`}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {completed.length === 0 ? (
                <Link
                  to="/day/$dayNumber"
                  params={{ dayNumber: "1" }}
                  className="bg-red px-5 py-2.5 text-[12px] font-semibold tracking-[0.16em] text-ivory uppercase"
                >
                  Start Day 1
                </Link>
              ) : (
                <Link
                  to="/day/$dayNumber"
                  params={{ dayNumber: String(Math.min(30, currentDay)) }}
                  className="bg-red px-5 py-2.5 text-[12px] font-semibold tracking-[0.16em] text-ivory uppercase"
                >
                  Continue Day {Math.min(30, currentDay)}
                </Link>
              )}
              <a
                href="/downloads/the-marriage-reset.pdf"
                className="border border-rule px-5 py-2.5 text-[12px] font-semibold tracking-[0.16em] text-muted uppercase hover:border-red/40 hover:text-red"
              >
                Download PDF
              </a>
            </div>
          </div>
        </section>

        {/* the 30-day grid */}
        <section className="mt-10">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-red uppercase">The thirty days</p>
          <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-6 md:grid-cols-10">
            {allDays.map((d) => {
              const done = completed.includes(d);
              const isCurrent = d === currentDay && !done;
              return (
                <Link
                  key={d}
                  to="/day/$dayNumber"
                  params={{ dayNumber: String(d) }}
                  aria-label={done ? `Day ${d} complete` : `Day ${d}`}
                  className={`group flex aspect-square flex-col items-center justify-center border p-1 text-center transition-colors ${
                    done
                      ? "border-gold bg-gold text-ivory"
                      : isCurrent
                        ? "border-red bg-red text-ivory"
                        : "border-rule bg-white text-muted hover:border-red/40 hover:text-red"
                  }`}
                >
                  <span className="text-sm font-semibold">{d}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* weeks */}
        <section className="mt-10 grid gap-4 md:grid-cols-2">
          {WEEKS.map((w) => {
            const days = getDaysByWeek(w.number);
            const doneCount = days.filter((d) => completed.includes(d.day)).length;
            const pct = Math.round((doneCount / days.length) * 100);
            return (
              <div key={w.number} className="border border-rule bg-white p-5">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold tracking-[0.28em] text-red uppercase">
                    Week {w.number} — {w.name}
                  </p>
                  <span className="text-[12px] font-semibold text-muted">{pct}%</span>
                </div>
                <div className="mt-3 h-1.5 w-full bg-rule">
                  <div className="h-full bg-red transition-all" style={{ width: `${pct}%` }} />
                </div>
                <p className="mt-3 font-serif text-sm italic text-muted">{w.theme}</p>
                <Link
                  to="/day/$dayNumber"
                  params={{ dayNumber: String(days[0].day) }}
                  className="mt-3 inline-block text-[12px] font-semibold tracking-[0.14em] text-red uppercase underline-offset-4 hover:underline"
                >
                  {doneCount > 0 ? `Continue week ${w.number}` : `Begin week ${w.number}`}
                </Link>
              </div>
            );
          })}
        </section>

        {/* habit tracker preview */}
        <HabitPreview />

        <section className="mt-12 border-t border-rule px-5 pt-6 text-center text-[11px] leading-relaxed text-muted">
          The Marriage Reset is an educational workbook. It is not therapy, counseling, or medical advice.
          If you are in crisis or danger, contact local emergency services.
        </section>
      </div>
    </main>
  );
}

function computeStreak(doneDays: number[]): number {
  const set = new Set(doneDays);
  let streak = 0;
  for (let d = 30; d >= 1; d -= 1) {
    if (set.has(d)) streak += 1;
    else if (d < 30) break;
    else continue;
  }
  return streak;
}

function ProgressRing({ completed, total }: { completed: number; total: number }) {
  const pct = (completed / total) * 100;
  const r = 54;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative mx-auto grid h-36 w-36 place-items-center">
      <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90">
        <circle cx="64" cy="64" r={r} fill="none" stroke="#e4d8cc" strokeWidth="10" />
        <circle
          cx="64"
          cy="64"
          r={r}
          fill="none"
          stroke="#77132C"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (pct / 100) * c}
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute text-center">
        <p className="font-serif text-2xl text-red">{completed}</p>
        <p className="text-[10px] tracking-[0.18em] text-muted uppercase">of {total}</p>
      </div>
    </div>
  );
}

function HabitPreview() {
  const { data } = useQuery({
    queryKey: ["habit-checkoffs"],
    queryFn: () => loadHabitCheckoffs(),
  });
  const doneToday = (data ?? []).filter((h) => h.done).length;
  return (
    <section className="mt-10 border border-rule bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-red uppercase">Micro-habit tracker</p>
          <h2 className="mt-1 font-serif text-2xl">Small, kept, on purpose.</h2>
        </div>
        <span className="text-[12px] font-semibold text-muted">
          {doneToday} done today
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Return from Day 19 onward to check off your chosen ritual each day.
      </p>
    </section>
  );
}