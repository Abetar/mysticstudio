type BookHeaderProps = {
  eyebrow: string;
  title: string;
  quote?: string;
};

export default function BookHeader({ eyebrow, title, quote }: BookHeaderProps) {
  return (
    <header className="text-center">
      <p className="text-[10px] uppercase tracking-[0.46em] text-[#4a2812]/60">
        {eyebrow}
      </p>

      <h2 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.045em] text-[#241005] sm:text-5xl">
        {title}
      </h2>

      {quote ? (
        <p className="mx-auto mt-4 max-w-xl font-serif text-base italic leading-7 text-[#4b2b16]/80">
          “{quote}”
        </p>
      ) : null}
    </header>
  );
}