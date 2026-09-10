import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { loadWorkbookState, saveCheckin } from "@/lib/workbook/server";
import { CHECKIN_CHECKPOINTS } from "@/lib/workbook/constants";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { AppHeader, headerLink } from "@/components/app-header";

export const Route = createFileRoute("/checkins")({
  component: Checkins,
});

const LABELS: Record<number, string> = {
  0: "Before Day 1",
  7: "Day 7",
  14: "Day 14",
  21: "Day 21",
  30: "Day 30",
};

function Checkins() {
  const { user, isPending } = useCurrentUserState();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["workbook-state"],
    queryFn: () => loadWorkbookState(),
  });

  if (isPending) return null;
  if (!user) return <RedirectToSignIn />;
  if (isLoading || !data) return <div className="min-h-dvh bg-ivory" />;

  const filled = data.checkins;

  return (
    <main className="min-h-dvh bg-ivory text-ink">
      <AppHeader
        nav={
          <>
            <Link to="/dashboard" className={headerLink}>
              Dashboard
            </Link>
            <span className="text-rule">|</span>
            <Link to="/prayers" className={headerLink}>
              Prayers
            </Link>
          </>
        }
      />

      <div className="mx-auto max-w-4xl px-4 py-8">
        <p className="text-[11px] font-semibold tracking-[0.28em] text-red uppercase">The Weekly Check-In Card</p>
        <h1 className="mt-2 font-serif text-4xl md:text-5xl">How is it really going?</h1>
        <p className="mt-3 max-w-xl font-serif text-base leading-relaxed text-muted">
          Three questions, five minutes, five checkpoints. This is the one habit built to outlast the workbook — come
          back and answer honestly, even when the honest answer is "not great."
        </p>

        <div className="mt-8 flex flex-col gap-5">
          {CHECKIN_CHECKPOINTS.map((cp) => {
            const card = filled.find((c) => c.checkpoint === cp);
            return (
              <CheckinCard
                key={cp}
                checkpoint={cp}
                label={LABELS[cp]}
                card={card}
                onSaved={refetch}
              />
            );
          })}
        </div>

        {filled.length >= 2 && (
          <section className="mt-10 border-t border-rule pt-6">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-red uppercase">The timeline view</p>
            <p className="mt-2 font-serif text-sm italic text-muted">
              Day 22 asks you to read these side by side. Here they are.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {filled
                .slice()
                .sort((a, b) => a.checkpoint - b.checkpoint)
                .map((c) => (
                  <div key={c.checkpoint} className="border border-rule bg-white p-4">
                    <p className="text-[11px] font-semibold tracking-[0.2em] text-red uppercase">
                      {LABELS[c.checkpoint]}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink">
                      <span className="font-semibold text-red">How are we, really?</span> {c.q_how_are_we || "—"}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-ink">
                      <span className="font-semibold text-red">What we need now:</span> {c.q_need_right_now || "—"}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-ink">
                      <span className="font-semibold text-red">Next step:</span> {c.q_next_step || "—"}
                    </p>
                  </div>
                ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function CheckinCard({
  checkpoint,
  label,
  card,
  onSaved,
}: {
  checkpoint: number;
  label: string;
  card?: { q_how_are_we: string; q_need_right_now: string; q_next_step: string };
  onSaved: () => void;
}) {
  const [howAreWe, setHowAreWe] = useState(card?.q_how_are_we ?? "");
  const [need, setNeed] = useState(card?.q_need_right_now ?? "");
  const [next, setNext] = useState(card?.q_next_step ?? "");
  const [saved, setSaved] = useState(true);

  const save = async () => {
    setSaved(false);
    try {
      await saveCheckin({ data: { checkpoint, howAreWe, needRightNow: need, nextStep: next } });
      setSaved(true);
      onSaved();
    } catch {
      setSaved(true);
    }
  };

  return (
    <div className="border border-gold bg-gold/10 p-5">
      <p className="text-[11px] font-semibold tracking-[0.22em] text-red uppercase">{label}</p>
      <div className="mt-3 flex flex-col gap-3">
        <label className="block">
          <span className="font-serif text-[15px] text-ink">1. How are we, really?</span>
          <textarea
            value={howAreWe}
            onChange={(e) => setHowAreWe(e.target.value)}
            rows={2}
            placeholder="Not a status update — an honest one-line read."
            className="mt-1 block w-full border border-rule bg-white p-2.5 font-serif text-[15px] text-ink placeholder:text-muted/60 focus:border-red focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="font-serif text-[15px] text-ink">2. What do we need right now?</span>
          <textarea
            value={need}
            onChange={(e) => setNeed(e.target.value)}
            rows={2}
            placeholder="One real, current need — yours or the marriage's."
            className="mt-1 block w-full border border-rule bg-white p-2.5 font-serif text-[15px] text-ink placeholder:text-muted/60 focus:border-red focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="font-serif text-[15px] text-ink">3. What's one small next step?</span>
          <textarea
            value={next}
            onChange={(e) => setNext(e.target.value)}
            rows={2}
            placeholder="One specific, doable thing before the next check-in."
            className="mt-1 block w-full border border-rule bg-white p-2.5 font-serif text-[15px] text-ink placeholder:text-muted/60 focus:border-red focus:outline-none"
          />
        </label>
      </div>
      <div className="mt-3 flex items-center justify-end gap-3">
        <span className="text-[11px] text-muted/70">{saved ? "Saved" : "…"}</span>
        <button
          type="button"
          onClick={() => void save()}
          className="border border-red px-4 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-red uppercase"
        >
          Save
        </button>
      </div>
    </div>
  );
}