type BookFooterProps = {
  page: number;
  totalPages?: number;
};

const romanNumerals: Record<number, string> = {
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
  6: "VI",
  7: "VII",
  8: "VIII",
  9: "IX",
  10: "X",
};

function toRoman(value: number) {
  return romanNumerals[value] ?? String(value);
}

export default function BookFooter({ page, totalPages }: BookFooterProps) {
  return (
    <footer className="mt-12 flex items-center justify-center border-t border-[#6f431f]/20 pt-6">
      <div className="flex flex-col items-center">
        <div className="h-px w-24 bg-[#6f431f]/30" />

        <span className="mt-3 font-serif text-xs uppercase tracking-[0.24em] text-[#3f2412]/70">
          {totalPages
            ? `Página ${toRoman(page)} de ${toRoman(totalPages)}`
            : `Página ${toRoman(page)}`}
        </span>
      </div>
    </footer>
  );
}