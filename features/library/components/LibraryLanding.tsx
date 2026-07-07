import Link from "next/link";

const collections = [
  {
    title: "Cartas del Tarot",
    description:
      "Explora el significado, simbolismo e interpretación de las 78 cartas del tarot.",
    href: "/biblioteca/tarot",
    status: "Disponible",
  },
  {
    title: "Limpias",
    description:
      "Conoce el origen, propósito y simbolismo de las limpias tradicionales.",
    href: "/room",
    status: "En el estudio",
  },
  {
    title: "Grimorio",
    description:
      "Rituales, tradiciones ocultistas y archivos reservados del estudio.",
    href: "/room",
    status: "Próximamente",
  },
];

export default function LibraryLanding() {
  return (
    <main className="min-h-screen bg-[#050308] text-[#f5ead2]">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="mb-4 text-[10px] uppercase tracking-[0.42em] text-[#caa46a]">
          Mystic Studio
        </p>

        <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">
          Biblioteca del Estudio
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d7c7aa]/75">
          Un archivo vivo de símbolos, cartas, limpias y tradiciones esotéricas.
          Aquí puedes explorar conocimiento antes de cruzar la puerta del
          estudio.
        </p>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {collections.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-[1.8rem] border border-[#caa46a]/14 bg-[#0c070b] p-6 transition hover:border-[#caa46a]/35 hover:bg-[#10090d]"
            >
              <p className="mb-4 text-[10px] uppercase tracking-[0.28em] text-[#caa46a]">
                {item.status}
              </p>

              <h2 className="text-2xl font-semibold text-[#f7e6c3]">
                {item.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#d7c7aa]/68">
                {item.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-[#d7c7aa]/15 bg-transparent px-7 py-3 text-xs uppercase tracking-[0.28em] text-[#d7c7aa]/80 transition hover:border-[#caa46a]/35 hover:text-[#f7e6c3]"
          >
            Página Principal
          </Link>

          <Link
            href="/reading"
            className="inline-flex items-center justify-center rounded-full border border-[#caa46a]/35 bg-[#caa46a]/10 px-7 py-3 text-xs uppercase tracking-[0.28em] text-[#f7e6c3] transition hover:bg-[#caa46a]/20"
          >
            Entrar al Estudio
          </Link>
        </div>
      </section>
    </main>
  );
}
