"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const topics = [
  { value: "LOVE", label: "Amor" },
  { value: "MONEY", label: "Dinero" },
  { value: "WORK", label: "Trabajo" },
  { value: "HEALTH", label: "Salud" },
  { value: "SPIRITUALITY", label: "Espiritualidad" },
  { value: "GENERAL", label: "General" },
];

const zodiacSigns = [
  "Aries",
  "Tauro",
  "Géminis",
  "Cáncer",
  "Leo",
  "Virgo",
  "Libra",
  "Escorpio",
  "Sagitario",
  "Capricornio",
  "Acuario",
  "Piscis",
];

export default function ReadingEntry() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    birthDate: "",
    zodiacSign: "",
    topic: "GENERAL",
    question: "",
  });

  useEffect(() => {
    const readingDraft = {
      name: form.name.trim(),
      birthDate: form.birthDate,
      zodiacSign: form.zodiacSign,
      topic: form.topic,
      question: form.question.trim(),
    };

    window.localStorage.setItem(
      "mysticstudio.readingDraft",
      JSON.stringify(readingDraft),
    );
  }, [form]);

  const steps = useMemo(
    () => [
      {
        eyebrow: "Primera marca",
        title: "¿Qué nombre dejamos sobre la mesa?",
        content: (
          <input
            autoFocus
            value={form.name}
            onChange={(event) =>
              setForm((current) => ({ ...current, name: event.target.value }))
            }
            placeholder="Escribe tu nombre"
            className="w-full rounded-3xl border border-[#caa46a]/25 bg-black/30 px-6 py-5 text-center text-xl text-[#f5ead2] outline-none transition placeholder:text-[#d7c7aa]/30 focus:border-[#caa46a]/70 sm:text-2xl"
          />
        ),
        canContinue: form.name.trim().length > 1,
      },
      {
        eyebrow: "Segunda marca",
        title: "¿Cuándo comenzó tu historia?",
        content: (
          <input
            autoFocus
            type="date"
            value={form.birthDate}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                birthDate: event.target.value,
              }))
            }
            className="w-full rounded-3xl border border-[#caa46a]/25 bg-black/30 px-6 py-5 text-center text-xl text-[#f5ead2] outline-none transition focus:border-[#caa46a]/70 sm:text-2xl"
          />
        ),
        canContinue: Boolean(form.birthDate),
      },
      {
        eyebrow: "Tercera marca",
        title: "¿Bajo qué signo se abre esta lectura?",
        content: (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {zodiacSigns.map((sign) => (
              <button
                key={sign}
                type="button"
                onClick={() => {
                  setForm((current) => ({ ...current, zodiacSign: sign }));
                  setTimeout(() => setStep((current) => current + 1), 220);
                }}
                className={`rounded-2xl border px-4 py-3 text-sm transition ${
                  form.zodiacSign === sign
                    ? "border-[#caa46a] bg-[#caa46a]/20 text-[#f7e6c3]"
                    : "border-[#caa46a]/20 bg-black/25 text-[#d7c7aa]/75 hover:border-[#caa46a]/55"
                }`}
              >
                {sign}
              </button>
            ))}
          </div>
        ),
        canContinue: Boolean(form.zodiacSign),
      },
      {
        eyebrow: "Cuarta marca",
        title: "¿Qué tema quieres poner en el centro?",
        content: (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {topics.map((topic) => (
              <button
                key={topic.value}
                type="button"
                onClick={() => {
                  setForm((current) => ({ ...current, topic: topic.value }));
                  setTimeout(() => setStep((current) => current + 1), 220);
                }}
                className={`rounded-2xl border px-4 py-3 text-sm transition ${
                  form.topic === topic.value
                    ? "border-[#caa46a] bg-[#caa46a]/20 text-[#f7e6c3]"
                    : "border-[#caa46a]/20 bg-black/25 text-[#d7c7aa]/75 hover:border-[#caa46a]/55"
                }`}
              >
                {topic.label}
              </button>
            ))}
          </div>
        ),
        canContinue: Boolean(form.topic),
      },
      {
        eyebrow: "Última marca",
        title: "¿Qué pregunta quieres dejar sobre la mesa?",
        content: (
          <textarea
            autoFocus
            value={form.question}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                question: event.target.value,
              }))
            }
            rows={4}
            placeholder="Puedes escribir una pregunta... o dejar que la lectura hable en general."
            className="w-full resize-none rounded-3xl border border-[#caa46a]/25 bg-black/30 px-6 py-5 text-center text-lg leading-8 text-[#f5ead2] outline-none transition placeholder:text-[#d7c7aa]/30 focus:border-[#caa46a]/70"
          />
        ),
        canContinue: true,
      },
    ],
    [form],
  );

  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;

  function goNext() {
    if (!currentStep.canContinue) return;

    if (isLastStep) {
      router.push("/room");
      return;
    }

    setStep((current) => current + 1);
  }

  function goBack() {
    setStep((current) => Math.max(0, current - 1));
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050308] px-5 py-10 text-[#f5ead2]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(202,164,106,0.16),transparent_42%),linear-gradient(to_bottom,#08050c,#030105)]" />

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-4xl items-center justify-center">
        <div className="w-full">
          <div className="mb-8 flex items-center justify-center gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all ${
                  index === step
                    ? "w-10 bg-[#caa46a]"
                    : index < step
                      ? "w-6 bg-[#caa46a]/55"
                      : "w-6 bg-[#caa46a]/15"
                }`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="rounded-[36px] border border-[#caa46a]/20 bg-[#120b10]/80 p-6 text-center shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-10"
            >
              <p className="mb-5 text-xs uppercase tracking-[0.42em] text-[#caa46a]">
                {currentStep.eyebrow}
              </p>

              <h1 className="mx-auto max-w-3xl text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
                {currentStep.title}
              </h1>

              <div className="mx-auto mt-10 max-w-2xl">
                {currentStep.content}
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={step === 0}
                  className="rounded-full border border-[#caa46a]/20 px-7 py-3 text-xs uppercase tracking-[0.28em] text-[#d7c7aa]/60 transition hover:bg-[#caa46a]/10 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Volver
                </button>

                <button
                  type="button"
                  onClick={goNext}
                  disabled={!currentStep.canContinue}
                  className="rounded-full border border-[#caa46a]/40 bg-[#caa46a]/10 px-7 py-3 text-xs uppercase tracking-[0.28em] text-[#f7e6c3] shadow-[0_0_40px_rgba(202,164,106,0.14)] transition hover:bg-[#caa46a]/20 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  {isLastStep ? "Entrar a la mesa" : "Continuar"}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          <p className="mx-auto mt-6 max-w-xl text-center text-xs leading-6 text-[#d7c7aa]/45">
            MysticStudio ofrece una experiencia simbólica y narrativa. No
            sustituye orientación profesional ni afirma predecir el futuro.
          </p>
        </div>
      </section>
    </main>
  );
}