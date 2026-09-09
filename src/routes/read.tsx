import { createFileRoute } from "@tanstack/react-router";
import { PrintReader } from "@/components/print-reader";

export const Route = createFileRoute("/read")({ component: ReadWorkbook });

function ReadWorkbook() {
  return (
    <PrintReader
      src="/print/workbook.html"
      title="The Marriage Reset"
      pages={30}
      pdf="/downloads/the-marriage-reset.pdf"
    />
  );
}
