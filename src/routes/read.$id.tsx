import { createFileRoute, Link } from "@tanstack/react-router";
import { PrintReader } from "@/components/print-reader";

export const Route = createFileRoute("/read/$id")({ component: BonusRead });

const meta: Record<string, { title: string; src: string; pages: number; pdf: string }> = {
  "bonus-1": {
    title: "Repair Script",
    src: "/print/bonus-1.html",
    pages: 2,
    pdf: "/downloads/bonus-1-repair-script.pdf",
  },
  "bonus-2": {
    title: "Recommitment Letter",
    src: "/print/bonus-2.html",
    pages: 2,
    pdf: "/downloads/bonus-2-recommitment-letter.pdf",
  },
  "bonus-3": {
    title: "30 Nights of Prayer",
    src: "/print/bonus-3.html",
    pages: 3,
    pdf: "/downloads/bonus-3-30-nights-of-prayer.pdf",
  },
  "bonus-4": {
    title: "Weekly Check-In",
    src: "/print/bonus-4.html",
    pages: 2,
    pdf: "/downloads/bonus-4-weekly-check-in.pdf",
  },
};

function BonusRead() {
  const { id } = Route.useParams();
  const item = meta[id];
  if (!item) {
    return (
      <main className="p-8">
        <p>That bonus was not found.</p>
        <Link to="/" className="text-red">
          Back
        </Link>
      </main>
    );
  }
  return <PrintReader src={item.src} title={item.title} pages={item.pages} pdf={item.pdf} />;
}
