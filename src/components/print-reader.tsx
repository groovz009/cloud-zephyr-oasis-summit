import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export function PrintReader({
  src,
  title,
  pages,
  pdf,
}: {
  src: string;
  title: string;
  pages: number;
  pdf?: string;
}) {
  const [page, setPage] = useState(1);
  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const go = () => {
      try {
        const doc = el.contentDocument;
        const target = doc?.getElementById(`p${page}`);
        target?.scrollIntoView({ behavior: "instant", block: "start" });
      } catch {
        /* ignore */
      }
    };
    el.addEventListener("load", go);
    go();
    return () => el.removeEventListener("load", go);
  }, [page, src]);

  return (
    <div className="flex min-h-dvh flex-col bg-[#e8ddd2]">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#d9cbbd] bg-ivory px-4 py-3">
        <Link to="/" className="text-[12px] tracking-[0.16em] text-red uppercase">
          Library
        </Link>
        <p className="font-serif text-lg text-ink">{title}</p>
        <div className="flex flex-wrap items-center gap-2">
          {pdf ? (
            <a href={pdf} className="text-[12px] text-red underline-offset-4 hover:underline">
              Download PDF
            </a>
          ) : null}
          <button
            type="button"
            className="min-h-11 min-w-11 border border-red px-3 text-red"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            aria-label="Previous page"
          >
            Prev
          </button>
          <label className="text-sm text-muted">
            <input
              type="number"
              min={1}
              max={pages}
              value={page}
              onChange={(e) => setPage(Math.min(pages, Math.max(1, Number(e.target.value) || 1)))}
              className="w-14 border border-[#d9cbbd] bg-white text-center"
              aria-label="Page number"
            />
            <span> / {pages}</span>
          </label>
          <button
            type="button"
            className="min-h-11 min-w-11 border border-red px-3 text-red"
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      </header>
      <div className="flex flex-1 justify-center overflow-auto p-4">
        <div className="h-[min(88dvh,1100px)] w-full max-w-[820px] overflow-hidden bg-white shadow-xl">
          <iframe
            ref={frame}
            title={title}
            src={`${src}#p${page}`}
            className="h-full w-full border-0 bg-ivory"
          />
        </div>
      </div>
    </div>
  );
}
