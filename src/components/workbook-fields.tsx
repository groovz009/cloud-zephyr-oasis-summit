import { useState } from "react";
import type { ExerciseField, WriteLineField, WriteBoxField, SentenceTemplateField, CheckboxGroupField as CheckboxGroupFieldConfig } from "@/lib/workbook/constants";
import { saveJournalEntry } from "@/lib/workbook/server";

export function WriteLineField({
  field,
  value,
  onChange,
}: {
  field: WriteLineField;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="mt-3 block">
      <span className="block font-serif text-base leading-relaxed text-ink">{field.prompt}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className="mt-2 block w-full border-b border-rule bg-transparent py-2 font-serif text-base text-ink placeholder:text-muted/60 focus:border-red focus:outline-none"
      />
    </label>
  );
}

export function WriteBoxField({
  field,
  value,
  onChange,
}: {
  field: WriteBoxField;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="mt-3 block">
      <span className="block font-serif text-base leading-relaxed text-ink">{field.prompt}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        rows={field.tall ? 6 : 4}
        className="mt-2 block w-full resize-y border border-rule bg-white p-3 font-serif text-base text-ink placeholder:text-muted/60 focus:border-red focus:outline-none"
      />
    </label>
  );
}

export function SentenceTemplateField({
  field,
  value,
  onChange,
}: {
  field: SentenceTemplateField;
  value: string;
  onChange: (v: string) => void;
}) {
  const placeholder = field.placeholder ?? "";
  const [before, after] = splitOnBlank(placeholder);
  return (
    <div className="mt-3">
      <span className="block font-serif text-base leading-relaxed text-ink">{field.prompt}</span>
      <div className="mt-2 flex flex-wrap items-baseline gap-x-1 border-b border-rule py-2">
        <span className="font-serif text-base leading-relaxed text-ink">{before}</span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="â€¦"
          className="min-w-28 flex-1 bg-transparent font-serif text-base text-red underline decoration-red/40 decoration-2 underline-offset-4 placeholder:text-muted/40 focus:outline-none"
        />
        <span className="font-serif text-base leading-relaxed text-ink">{after}</span>
      </div>
    </div>
  );
}

function splitOnBlank(template: string): [string, string] {
  const idx = template.indexOf("____");
  if (idx < 0) return [template, ""];
  return [template.slice(0, idx), template.slice(idx + 4)];
}

export function CheckboxGroupField({
  field,
  value,
  onChange,
  multiple = false,
}: {
  field: CheckboxGroupFieldConfig;
  value: string;
  onChange: (v: string) => void;
  multiple?: boolean;
}) {
  const selected = value ? value.split("||") : [];
  const toggle = (label: string) => {
    if (multiple) {
      const next = selected.includes(label)
        ? selected.filter((s) => s !== label)
        : [...selected, label];
      onChange(next.join("||"));
    } else {
      onChange(selected[0] === label ? "" : label);
    }
  };
  return (
    <div className="mt-3">
      <span className="block font-serif text-base leading-relaxed text-ink">{field.prompt}</span>
      <div className="mt-2 flex flex-col gap-2">
        {field.options.map((opt) => {
          const checked = selected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              aria-pressed={checked}
              className={`flex items-start gap-3 border px-3 py-2 text-left font-serif text-[15px] leading-snug transition-colors ${
                checked ? "border-red bg-red/5 text-ink" : "border-rule bg-white text-muted hover:border-red/40"
              }`}
            >
              <span
                className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center border ${
                  checked ? "border-red bg-red" : "border-rule"
                }`}
              >
                {checked ? <span className="h-1.5 w-1.5 bg-ivory" /> : null}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function AutoSaveField({
  field,
  day,
  initial,
  multiple,
}: {
  field: ExerciseField;
  day: number;
  initial: string;
  multiple?: boolean;
}) {
  const [value, setValue] = useState(initial);
  const [saved, setSaved] = useState(true);
  const [error, setError] = useState(false);

  const commit = (next: string) => {
    setValue(next);
    setSaved(false);
    setError(false);
    const send = async () => {
      try {
        await saveJournalEntry({ data: { day, key: field.key, value: next } });
        setSaved(true);
      } catch {
        setSaved(true);
        setError(true);
      }
    };
    void send();
  };

return (
    <div>
      {field.type === "write_line" && <WriteLineField field={field} value={value} onChange={commit} />}
      {field.type === "write_box" && <WriteBoxField field={field} value={value} onChange={commit} />}
      {field.type === "sentence_template" && (
        <SentenceTemplateField field={field} value={value} onChange={commit} />
      )}
      {field.type === "checkbox_group" && (
        <CheckboxGroupField field={field} value={value} onChange={commit} multiple={multiple ?? field.options.length > 8} />
      )}
      <p className="mt-1 text-right text-[11px] text-muted/70">
        {error ? "Couldn't save — will retry on next edit" : saved ? "Saved" : "…"}
      </p>
    </div>
  );
}
