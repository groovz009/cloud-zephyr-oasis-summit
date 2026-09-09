import { createFileRoute, Link } from "@tanstack/react-router";

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
  return (
    <main className="min-h-dvh bg-ivory text-ink">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <p className="text-[11px] font-semibold tracking-[0.28em] text-red uppercase">
          Grace and Harmony Press
        </p>
        <a
          href="/downloads/the-marriage-reset.pdf"
          className="text-[12px] tracking-wide text-red underline-offset-4 hover:underline"
        >
          Download the book
        </a>
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
            A 30-day guided path
          </p>
          <h1 className="mt-3 font-serif text-5xl leading-[1.05] md:text-7xl">
            <span className="italic">the</span>
            <span className="mt-1 block tracking-[0.08em] text-red uppercase">Marriage</span>
            <span className="italic">Reset</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            You did not fall out of love. You drifted. Thirty days of noticing, speaking,
            small trust, and choosing each other again.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/read"
              className="inline-flex min-h-12 items-center bg-red px-6 text-[13px] font-semibold tracking-[0.16em] text-ivory uppercase"
            >
              Read the workbook
            </Link>
            <a
              href="/downloads/the-marriage-reset.pdf"
              className="inline-flex min-h-12 items-center border border-red px-6 text-[13px] font-semibold tracking-[0.16em] text-red uppercase"
            >
              PDF · 30 pages
            </a>
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
              <div key={n} className="border border-rule bg-ivory p-5">
                <p className="text-[11px] tracking-[0.2em] text-red">{n}</p>
                <h2 className="mt-2 text-2xl text-red">{t}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <p className="text-[12px] font-semibold tracking-[0.28em] text-red uppercase">Bonus printables</p>
        <h2 className="mt-2 text-3xl">Keep these off the shelf.</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {bonuses.map((b) => (
            <article key={b.title} className="flex gap-4 border border-rule bg-white p-3">
              <img src={b.img} alt="" className="h-28 w-20 object-cover object-top" />
              <div className="flex flex-1 flex-col justify-between py-1">
                <div>
                  <p className="text-[10px] tracking-[0.22em] text-red uppercase">{b.kicker}</p>
                  <h3 className="text-xl">{b.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{b.blurb}</p>
                </div>
                <div className="mt-3 flex gap-4 text-[12px] tracking-wide text-red">
                  <Link to="/read/$id" params={{ id: b.id }} className="hover:underline">
                    Read
                  </Link>
                  <a href={b.pdf} className="hover:underline">
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
