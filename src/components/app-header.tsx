import type { ReactNode } from "react";
import { UserButton } from "@/lib/auth/gates";
import { Brand } from "@/components/brand";

export function AppHeader({
  nav,
  brandTitle = "The Marriage Reset",
}: {
  nav?: ReactNode;
  brandTitle?: string;
}) {
  return (
    <header className="border-b border-rule bg-white/60">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Brand title={brandTitle} />
          {nav ? (
            <nav className="flex flex-wrap items-center gap-x-4 gap-y-2">{nav}</nav>
          ) : null}
        </div>
        <UserButton />
      </div>
    </header>
  );
}

export const headerLink =
  "text-[13px] font-semibold tracking-[0.14em] text-red uppercase underline-offset-4 hover:underline";