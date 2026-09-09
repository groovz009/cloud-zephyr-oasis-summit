import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

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

  const showPage = useCallback((n: number) => {
    const doc = frame.current?.contentDocument;
    if (!doc) return;
    doc.querySelectorAll(".page").forEach((el) => {
      el.classList.toggle("is-active", el.id === `p${n}`);
    });
    doc.documentElement.scrollTop = 0;
    doc.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const onLoad = () => showPage(page);
    el.addEventListener("load", onLoad);
    showPage(page);
    return () => el.removeEventListener("load", onLoad);
  }, [page, showPage]);

  return (
    <div className="flex min-h-dvh flex-col bg-[#e8ddd2]">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-rule bg-ivory px-4 py-3">
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
              className="w-14 border border-rule bg-white text-center"
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
      <div className="flex min-h-0 flex-1 justify-center overflow-auto p-3">
        <iframe
          ref={frame}
          title={title}
          src={src}
          className="min-h-[70dvh] w-full max-w-[780px] border-0 bg-ivory"
          style={{ height: "calc(100dvh - 5.75rem)" }}
        />
      </div>
    </div>
  );
}
