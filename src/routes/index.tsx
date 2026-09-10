import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Download } from "lucide-react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { UserButton } from "@/lib/auth/gates";
import { Brand } from "@/components/brand";
import { loadWorkbookState } from "@/lib/workbook/server";

export const Route = createFileRoute("/")({ component: Home });

const bonuses = [
  {
    id: "bonus-1",
    pdf: "/downloads/bonus-1-repair-script.pdf",
    img: "/workbook/images/bonus-1.jpg",
    kicker: "Bonus 01",
    title: "Repair Script",
    blurb: "Six lines to de-escalate. Print it. Put it on the fridge.",
  },
  {
    id: "bonus-2",
    pdf: "/downloads/bonus-2-recommitment-letter.pdf",
    img: "/workbook/images/bonus-2.jpg",
    kicker: "Bonus 02",
    title: "Recommitment Letter",
    blurb: "Draft on Day 24. Exchange on Day 30.",
  },
  {
    id: "bonus-3",
    pdf: "/downloads/bonus-3-30-nights-of-prayer.pdf",
    img: "/workbook/images/bonus-3.jpg",
    kicker: "Bonus 03",
    title: "30 Nights of Prayer",
    blurb: "One short prayer a night. Invitation, never a requirement.",
  },
  {
    id: "bonus-4",
    pdf: "/downloads/bonus-4-weekly-check-in.pdf",
    img: "/workbook/images/bonus-4.jpg",
    kicker: "Bonus 04",
    title: "Weekly Check-In",
    blurb: "Three questions. Five minutes. The habit that outlasts the book.",
  },
];

function Home() {
  const { user, isPending } = useCurrentUserState();
  const { data } = useQuery({
    queryKey: ["workbook-state"],
    queryFn: () => loadWorkbookState(),
    enabled: Boolean(user),
  });

  const completed = data?.completedDays ?? [];
  const currentDay = data?.profile?.current_day ?? 1;
  const streak = computeStreak(completed);

  return (
    <main className="min-h-dvh bg-ivory text-ink">
      <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5">
        <Brand title="Grace and Harmony Press" />
        <div className="flex flex-wrap items-center gap-4">
          {!isPending && user ? (
            <>
              <Link
                to="/dashboard"
                className="text-[13px] font-semibold tracking-[0.14em] text-red uppercase underline-offset-4 hover:underline"
              >
                My journey
              </Link>
              <UserButton />
            </>
          ) : !isPending ? (
            <Link
              to="/login"
              className="text-[13px] font-semibold tracking-[0.14em] text-red uppercase underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          ) : null}
          <a
            href="/downloads/the-marriage-reset.pdf"
            download
            className="inline-flex items-center gap-2 bg-red px-4 py-2 text-[12px] font-semibold tracking-[0.14em] text-ivory uppercase transition-colors hover:bg-red/90"
          >
            <Download className="h-4 w-4" strokeWidth={2.25} />
            Download the book
          </a>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-4 md:grid-cols-[minmax(0,0.9fr)_1.1fr]">
        <div className="mx-auto max-h-[72vh] overflow-hidden rounded-sm border border-rule bg-white shadow-[0_24px_60px_-28px_rgba(119,19,44,0.35)]">
          <img
            src="/workbook/images/cover.png"
            alt="The Marriage Reset cover"
            className="mx-auto block h-auto max-h-[72vh] w-full object-contain"
          />
        </div>
        <div>
          <p className="text-[12px] font-semibold tracking-[0.32em] text-red uppercase">
            Thank you for your purchase
          </p>
          <h1 className="mt-3 font-serif text-5xl leading-[1.05] md:text-6xl">
            <span className="italic">Your copy of</span>
            <span className="mt-1 block tracking-[0.08em] text-red uppercase">the Marriage Reset</span>
            <span className="italic">is ready.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            Everything you need for the next 30 days is below — the workbook and all four bonuses.
            Your progress is saved to your account whenever you sign in.
          </p>

          {!isPending && user ? (
            <div className="mt-6 border border-rule bg-white p-4">
              <p className="text-[11px] font-semibold tracking-[0.22em] text-red uppercase">
                Your journey progress
              </p>
              <p className="mt-1 font-serif text-lg text-ink">
                Day {currentDay} of 30 · {completed.length} complete
                {streak > 1 ? (
                  <>
                    {" "}
                    · <span className="text-red">{streak}-day streak</span>
                  </>
                ) : null}
              </p>
              <Link
                to="/dashboard"
                className="mt-2 inline-block text-[13px] font-semibold tracking-[0.14em] text-red uppercase underline-offset-4 hover:underline"
              >
                {completed.length === 0 ? "Begin Day 1" : "Continue your journey"}
              </Link>
            </div>
          ) : !isPending ? (
            <div className="mt-6 border border-rule bg-white p-4">
              <p className="text-[11px] font-semibold tracking-[0.22em] text-red uppercase">
                Your progress
              </p>
              <p className="mt-1 font-serif text-base leading-relaxed text-muted">
                Sign in to start the 30 days — your entries stay private to your account.
              </p>
              <Link
                to="/login"
                className="mt-3 inline-block bg-red px-4 py-2 text-[12px] font-semibold tracking-[0.14em] text-ivory uppercase transition-colors hover:bg-red/90"
              >
                Sign in to begin
              </Link>
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/downloads/the-marriage-reset.pdf"
              download
              className="inline-flex min-h-12 items-center justify-center gap-2.5 bg-red px-6 text-[13px] font-semibold tracking-[0.16em] text-ivory uppercase transition-colors hover:bg-red/90"
            >
              <Download className="h-[18px] w-[18px]" strokeWidth={2.25} />
              Download the book
            </a>
            <Link
              to="/read"
              className="inline-flex min-h-12 items-center justify-center border border-red px-6 text-[13px] font-semibold tracking-[0.16em] text-red uppercase transition-colors hover:bg-red/5"
            >
              Read the workbook
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-rule bg-blush/50">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <p className="text-[12px] font-semibold tracking-[0.28em] text-red uppercase">The four weeks</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "Notice", "See where the distance actually shows up."],
              ["02", "Speak", "The exact words for a hard moment."],
              ["03", "Trust", "One small ritual, kept on purpose."],
              ["04", "Reconnect", "A spoken choice on Day 30."],
            ].map(([n, t, d]) => (
              <div
                key={n}
                className="border border-rule bg-ivory p-5 transition-colors hover:border-red/30 hover:bg-white"
              >
                <p className="text-[11px] tracking-[0.2em] text-red">{n}</p>
                <h2 className="mt-2 text-2xl text-red">{t}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <p className="text-[12px] font-semibold tracking-[0.28em] text-red uppercase">Your download library</p>
        <h2 className="mt-2 text-3xl">The workbook came with four bonuses. They're all yours.</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {bonuses.map((b) => (
            <article
              key={b.title}
              className="group flex gap-4 border border-rule bg-white p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-red/40 hover:shadow-[0_18px_40px_-26px_rgba(119,19,44,0.5)]"
            >
              <img src={b.img} alt="" className="h-28 w-20 object-cover object-top" />
              <div className="flex flex-1 flex-col justify-between py-1">
                <div>
                  <p className="text-[10px] tracking-[0.22em] text-red uppercase">{b.kicker}</p>
                  <h3 className="text-xl">{b.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{b.blurb}</p>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-[12px]">
                  <Link
                    to="/read/$id"
                    params={{ id: b.id }}
                    className="font-semibold tracking-[0.12em] text-red uppercase underline-offset-4 hover:underline"
                  >
                    Read
                  </Link>
                  <a
                    href={b.pdf}
                    download
                    className="inline-flex items-center gap-1.5 border border-red px-3 py-1.5 font-semibold tracking-[0.12em] text-red uppercase transition-colors hover:bg-red hover:text-ivory"
                  >
                    <Download className="h-3.5 w-3.5" strokeWidth={2.5} />
                    Download PDF
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-rule px-5 py-8 text-center text-[11px] leading-relaxed text-muted">
        The Marriage Reset is an educational workbook. It is not therapy, counseling, or medical advice.
        If you are in crisis or danger, contact local emergency services.
      </footer>
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