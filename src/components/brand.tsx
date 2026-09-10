export function Brand({
  title = "The Marriage Reset",
  className = "",
}: {
  title?: string;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="grid h-9 w-9 shrink-0 place-items-center bg-red">
        <span className="select-none font-serif text-[16px] font-semibold leading-none text-ivory">
          G<span className="text-gold">·</span>H
        </span>
      </span>
      <span className="font-serif text-[17px] font-bold leading-tight text-ink">
        {title}
      </span>
    </span>
  );
}