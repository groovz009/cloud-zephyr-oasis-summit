import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";

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
      <header className="border-b border-rule bg-ivory px-3 py-3 sm:px-4">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 sm:gap-x-4">
            <Link
              to="/"
              className="text-[13px] font-semibold tracking-[0.16em] text-red uppercase underline-offset-4 hover:underline"
            >
              Library
            </Link>
            <p className="font-serif text-base font-semibold text-ink sm:text-lg">{title}</p>
          </div>
          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
            <div className="flex flex-[1_1_auto] items-center gap-1.5">
              {pdf ? (
                <a
                  href={pdf}
                  download
                  className="inline-flex min-h-11 items-center gap-1.5 border border-red px-3 text-[12px] font-semibold tracking-[0.12em] text-red uppercase transition-colors hover:bg-red hover:text-ivory"
                >
                  <Download className="h-3.5 w-3.5" strokeWidth={2.5} />
                  <span className="hidden sm:inline">Download PDF</span>
                  <span className="sm:hidden">PDF</span>
                </a>
              ) : null}
              <label className="ml-auto flex items-center gap-1 text-sm text-muted">
                <input
                  type="number"
                  min={1}
                  max={pages}
                  value={page}
                  onChange={(e) =>
                    setPage(Math.min(pages, Math.max(1, Number(e.target.value) || 1)))
                  }
                  className="w-14 border border-rule bg-white text-center"
                  aria-label="Page number"
                />
                <span> / {pages}</span>
              </label>
            </div>
            <div className="flex flex-[1_1_auto] gap-1.5">
              <button
                type="button"
                className="min-h-11 flex-1 border border-red px-3 font-semibold text-red sm:flex-none"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                aria-label="Previous page"
              >
                Prev
              </button>
              <button
                type="button"
                className="min-h-11 flex-1 border border-red px-3 font-semibold text-red sm:flex-none"
                onClick={() => setPage((p) => Math.min(pages, p + 1))}
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="relative flex min-h-0 flex-1 overflow-auto">
        <iframe
          ref={frame}
          title={title}
          src={src}
          className="absolute inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)] max-w-[calc(780px_-_1rem)] border-0 bg-ivory sm:inset-3 sm:h-[calc(100%-1.5rem)] sm:w-[calc(100%-1.5rem)] sm:max-w-[calc(780px_-_1.5rem)]"
        />
      </div>
    </div>
  );
}
