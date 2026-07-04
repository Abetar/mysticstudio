"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import BookStage from "./book/BookStage";
import CleansingBook from "./book/CleansingBook";

type CleansingBookExperienceProps = {
  onBack: () => void;
};

type BookState = "closed" | "opening" | "index";

const CLOSED_BOOK_IMAGE = "/images/objects/cleansing-book-closed-01.png";

export default function CleansingBookExperience({
  onBack,
}: CleansingBookExperienceProps) {
  const [bookState, setBookState] = useState<BookState>("closed");

  function handleOpenBook() {
    if (bookState !== "closed") return;

    setBookState("opening");

    window.setTimeout(() => {
      setBookState("index");
    }, 850);
  }

  const isOpen = bookState === "index";

  return (
    <motion.div
      key="cleansing-book"
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 16, filter: "blur(8px)" }}
      transition={{ delay: 0.2, duration: 0.65 }}
      className="absolute inset-0 z-[70] overflow-hidden"
    >
      <div className="pointer-events-none absolute left-1/2 top-[18%] h-72 w-72 -translate-x-1/2 rounded-full bg-[#caa46a]/10 blur-3xl" />

      {!isOpen ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pb-8 text-center">
          <motion.button
            type="button"
            onClick={handleOpenBook}
            disabled={bookState === "opening"}
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={
              bookState === "opening"
                ? {
                    y: -8,
                    scale: [1, 1.05, 1.14],
                    rotateY: [0, -12, -42],
                    rotateZ: [-2, -1, 0],
                    filter: ["blur(0px)", "blur(0px)", "blur(4px)"],
                  }
                : {
                    y: [0, -5, 0],
                    scale: [1, 1.025, 1],
                    rotate: [-2, -1.2, -2],
                    filter: "blur(0px)",
                  }
            }
            transition={
              bookState === "opening"
                ? { duration: 0.85, ease: "easeInOut" }
                : { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }
            className="relative aspect-[1.2] w-[190px] cursor-pointer sm:w-[300px]"
            aria-label="Abrir Libro de Limpias"
          >
            <Image
              src={CLOSED_BOOK_IMAGE}
              alt="Libro de Limpias cerrado"
              fill
              priority
              sizes="(max-width: 640px) 220px, 320px"
              className="object-contain drop-shadow-[0_34px_46px_rgba(0,0,0,0.72)]"
            />
          </motion.button>

          <p className="mt-7 text-[10px] uppercase tracking-[0.42em] text-[#caa46a]/70">
            Recetario tradicional
          </p>

          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[#f5ead2] sm:text-4xl">
            {bookState === "opening" ? "El libro se abre." : "Abre el libro."}
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#d7c7aa]/65">
            Explora limpias tradicionales con huevo, hierbas, lociones,
            veladoras y sahumerios.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleOpenBook}
              disabled={bookState === "opening"}
              className="rounded-full border border-[#caa46a]/45 bg-[#caa46a]/15 px-8 py-3 text-xs uppercase tracking-[0.32em] text-[#f8e7c4] shadow-[0_0_40px_rgba(202,164,106,0.16)] transition hover:bg-[#caa46a]/25 disabled:cursor-not-allowed disabled:opacity-45"
            >
              {bookState === "opening" ? "Abriendo..." : "Abrir libro"}
            </button>

            <button
              type="button"
              onClick={onBack}
              disabled={bookState === "opening"}
              className="rounded-full border border-[#caa46a]/20 bg-black/20 px-7 py-3 text-xs uppercase tracking-[0.28em] text-[#d7c7aa]/65 transition hover:bg-black/35 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Volver
            </button>
          </div>
        </div>
      ) : (
        <motion.div
          key="open-book"
          initial={{ opacity: 0, y: 20, scale: 0.86, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 16, scale: 0.9, filter: "blur(8px)" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <BookStage>
            <CleansingBook />
          </BookStage>

          <button
            type="button"
            onClick={onBack}
            className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-full border border-[#caa46a]/20 bg-black/30 px-7 py-3 text-xs uppercase tracking-[0.28em] text-[#d7c7aa]/65 backdrop-blur-xl transition hover:bg-black/45"
          >
            Volver a la mesa
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
