import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { WEEKS, getDayByNumber, getDaysByWeek } from "@/lib/workbook/constants";
import { AutoSaveField, WriteBoxField } from "@/components/workbook-fields";
import {
  loadWorkbookState,
  toggleDayComplete,
  unmarkDayComplete,
  saveCheckin,
} from "@/lib/workbook/server";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { AppHeader, headerLink } from "@/components/app-header";
import { Download } from "lucide-react";

export const Route = createFileRoute("/day/$dayNumber")({
  component: DayPage,
});

function DayPage() {
  const { dayNumber } = Route.useParams();
  const day = getDayByNumber(Number(dayNumber));
  const { user, isPending } = useCurrentUserState();
  const [localMode, setLocalMode] = useState<"solo" | "couple">("solo");

  const { data, isLoading } = useQuery({
    queryKey: ["workbook-state"],
    queryFn: () => loadWorkbookState(),
  });

  if (isPending) return null;
  if (!user) return <RedirectToSignIn />;
  if (!day) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-ivory px-5">
        <p className="font-serif text-2xl text-ink">That day doesn't exist.</p>
        <Link to="/dashboard" className="text-red underline-offset-4 hover:underline">
          Back to dashboard
        </Link>
      </main>
    );
  }
  if (isLoading || !data) return <div className="min-h-dvh bg-ivory" />;

  const week = WEEKS.find((w) => w.number === day.week);
  const journalMap = new Map(data.journal.map((j) => [`${j.day_number}:${j.field_key}`, j.value]));
  const isCompleted = data.completedDays.includes(day.day);
  const prevDay = day.day > 1 ? day.day - 1 : null;
  const nextDay = day.day < 30 ? day.day + 1 : null;
  const weekDays = getDaysByWeek(day.week);

  const mode = day.mode === "solo" ? "solo" : localMode;
  const showCheckin = day.checkinAtStart === true || day.checkinAtEnd === true;

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
            <span className="text-rule">|</span>
            <Link to="/prayers" className={headerLink}>
              Prayers
            </Link>
            <span className="text-rule">|</span>
            <a
              href="/downloads/the-marriage-reset.pdf"
              download
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold tracking-[0.14em] text-red uppercase underline-offset-4 hover:underline"
            >
              <Download className="h-3.5 w-3.5" strokeWidth={2.5} />
              Download PDF
            </a>
          </>
        }
      />

      <div className="mx-auto max-w-3xl px-4 pb-16 pt-8">
        <p className="text-[11px] font-semibold tracking-[0.28em] text-red uppercase">
          Day {day.day} · Week {day.week} — {week?.name}
          {day.mode === "couple" || day.mode === "couple_integration" || day.mode === "couple_finale"
            ? " · Couple"
            : day.mode === "solo_tool"
              ? " · Tool"
              : day.mode === "couple_or_solo"
                ? " · Quick Win"
                : ""}
        </p>
        <h1 className="mt-2 font-serif text-4xl leading-tight md:text-5xl">{day.title}</h1>

        {/* solo/couple toggle for couple-aware days */}
        {(day.mode === "couple" ||
          day.mode === "couple_integration" ||
          day.mode === "couple_finale" ||
          day.mode === "couple_or_solo") && (
          <div className="mt-4 flex gap-1 border border-rule bg-white p-1 text-[12px]">
            {(["solo", "couple"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setLocalMode(m)}
                className={`flex-1 px-3 py-1.5 font-semibold tracking-[0.12em] uppercase transition-colors ${
                  mode === m ? "bg-red text-ivory" : "text-muted hover:text-red"
                }`}
              >
                {m === "solo" ? "Going solo" : "Doing this together"}
              </button>
            ))}
          </div>
        )}

        <p className="mt-6 font-serif text-lg leading-relaxed text-ink">{day.intro}</p>

        {day.whyItMatters && (
          <p className="mt-4 font-serif text-base leading-relaxed text-muted">
            <span className="font-semibold text-red">Why this matters:</span> {day.whyItMatters}
          </p>
        )}

        {/* Week opener image for the first day of each week that has a band image */}
        {(day.day === 1 || day.day === 8 || day.day === 15 || day.day === 22) && (
          <img
            src={`/workbook/images/week-${day.week}-band.jpg`}
            alt={`Week ${day.week} — ${week?.name}`}
            className="mt-6 aspect-[3/1] w-full object-cover"
          />
        )}

        <div className="mt-8">
          <h2 className="text-[12px] font-semibold tracking-[0.24em] text-red uppercase">
            Today's reflection
          </h2>

          {showCheckin && (
            <CheckinSection
              checkpoint={day.checkinAtStart === true ? 0 : day.day}
              initialCards={data.checkins}
            />
          )}

          <div className="mt-4 flex flex-col gap-4">
            {day.exercises.map((field) => (
              <AutoSaveField
                key={field.key}
                field={field}
                day={day.day}
                initial={journalMap.get(`${day.day}:${field.key}`) ?? ""}
              />
            ))}
          </div>

          {day.soloNote && mode === "solo" && (
            <div className="mt-6 border-l-2 border-gold bg-white px-4 py-3">
              <p className="font-serif text-[15px] italic leading-relaxed text-muted">
                {day.soloNote}
              </p>
            </div>
          )}

          {day.prayer && (
            <div className="mt-6 border-l-2 border-red/30 bg-white px-4 py-3">
              <p className="font-serif text-[15px] italic leading-relaxed text-muted">
                {day.prayer}
              </p>
            </div>
          )}
        </div>

        {/* week progress */}
        <div className="mt-8">
          <p className="text-[11px] tracking-[0.2em] text-muted uppercase">
            Week {day.week} — {weekDays.length} days
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {weekDays.map((d) => {
              const done = data.completedDays.includes(d.day);
              const isCur = d.day === day.day;
              return (
                <Link
                  key={d.day}
                  to="/day/$dayNumber"
                  params={{ dayNumber: String(d.day) }}
                  aria-current={isCur ? "page" : undefined}
                  className={`grid h-8 w-8 place-items-center rounded-sm text-[12px] font-semibold ${
                    isCur
                      ? "bg-red text-ivory ring-2 ring-red/30"
                      : done
                        ? "bg-gold text-ivory"
                        : "border border-rule bg-white text-muted hover:border-red/40"
                  }`}
                >
                  {d.day}
                </Link>
              );
            })}
          </div>
        </div>

        {/* complete / navigation */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-6">
          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
            {prevDay ? (
              <Link
                to="/day/$dayNumber"
                params={{ dayNumber: String(prevDay) }}
                className="inline-flex min-h-11 items-center border border-red px-4 text-[12px] font-semibold tracking-[0.14em] text-red uppercase"
              >
                Day {prevDay}
              </Link>
            ) : (
              <Link
                to="/dashboard"
                className="inline-flex min-h-11 items-center border border-rule px-4 text-[12px] font-semibold tracking-[0.14em] text-muted uppercase"
              >
                Back
              </Link>
            )}
            {nextDay ? (
              <Link
                to="/day/$dayNumber"
                params={{ dayNumber: String(nextDay) }}
                className="inline-flex min-h-11 flex-1 items-center justify-center border border-red bg-red px-4 text-[12px] font-semibold tracking-[0.14em] text-ivory uppercase sm:flex-none"
              >
                Day {nextDay}
              </Link>
            ) : (
              <Link
                to="/dashboard"
                className="inline-flex min-h-11 flex-1 items-center justify-center border border-red bg-red px-4 text-[12px] font-semibold tracking-[0.14em] text-ivory uppercase sm:flex-none"
              >
                Finish
              </Link>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              if (isCompleted) void unmarkDayComplete({ data: { day: day.day } });
              else void toggleDayComplete({ data: { day: day.day } });
              // optimistic UI handled by invalidating below
              window.location.reload();
            }}
            className={`inline-flex min-h-11 items-center px-4 text-[12px] font-semibold tracking-[0.14em] uppercase ${
              isCompleted ? "border border-gold bg-gold text-ivory" : "border border-ink text-ink"
            }`}
          >
            {isCompleted ? "Completed ✓" : "Mark as complete"}
          </button>
        </div>
      </div>

      <div className="border-t border-rule px-5 py-6 text-center text-[11px] leading-relaxed text-muted">
        The Marriage Reset is an educational workbook. It is not therapy, counseling, or medical advice.
        If you are in crisis or danger, contact local emergency services.
      </div>
    </main>
  );
}

function CheckinSection({
  checkpoint,
  initialCards,
}: {
  checkpoint: number;
  initialCards: { checkpoint: number; q_how_are_we: string; q_need_right_now: string; q_next_step: string }[];
}) {
  const existing = initialCards.find((c) => c.checkpoint === checkpoint);
  const [howAreWe, setHowAreWe] = useState(existing?.q_how_are_we ?? "");
  const [need, setNeed] = useState(existing?.q_need_right_now ?? "");
  const [next, setNext] = useState(existing?.q_next_step ?? "");
  const [saved, setSaved] = useState(true);

  const commit = async () => {
    setSaved(false);
    try {
      await saveCheckin({ data: { checkpoint, howAreWe, needRightNow: need, nextStep: next } });
      setSaved(true);
    } catch {
      setSaved(true);
    }
  };

  return (
    <div className="mt-4 border border-gold bg-gold/10 p-4">
      <p className="text-[11px] font-semibold tracking-[0.22em] text-red uppercase">Weekly Check-In Card</p>
      <p className="mt-1 font-serif text-sm italic text-muted">
        Five minutes. Be honest even when the honest answer is "not great".
      </p>
      <div className="mt-3 flex flex-col gap-3">
        <WriteBoxField
          field={{ key: "how_are_we", type: "write_box", prompt: "How are we, really?" }}
          value={howAreWe}
          onChange={setHowAreWe}
        />
        <WriteBoxField
          field={{ key: "need", type: "write_box", prompt: "What do we need right now?" }}
          value={need}
          onChange={setNeed}
        />
        <WriteBoxField
          field={{ key: "next", type: "write_box", prompt: "What's one small next step?" }}
          value={next}
          onChange={setNext}
        />
      </div>
      <div className="mt-3 flex items-center justify-end gap-3">
        <span className="text-[11px] text-muted/70">{saved ? "Saved" : "…"}</span>
        <button
          type="button"
          onClick={() => void commit()}
          className="border border-red px-4 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-red uppercase"
        >
          Save
        </button>
      </div>
    </div>
  );
}