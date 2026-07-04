import type { ReactNode } from "react";

type BookSectionProps = {
  title: string;
  icon?: string;
  children: ReactNode;
};

export default function BookSection({
  title,
  icon,
  children,
}: BookSectionProps) {
  return (
    <section className="mt-5 rounded-2xl border border-[#3f2412]/15 bg-[#fff7df]/20 px-5 py-5">
      <div className="flex items-center gap-3">
        {icon ? <span className="text-lg">{icon}</span> : null}

        <h3 className="font-serif text-xl font-semibold text-[#241005]">
          {title}
        </h3>
      </div>

      <div className="mt-4 text-sm leading-6 text-[#4b2b16]/85">
        {children}
      </div>
    </section>
  );
}