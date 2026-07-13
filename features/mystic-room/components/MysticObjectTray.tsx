"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type MysticObjectTrayProps = {
  onSelectGrimoire: () => void;
  onSelectFortune: () => void;
  onSelectCleansing: () => void;
};

const objects = [
  {
    key: "grimoire",
    label: "Grimorio",
    src: "/images/objects/grimoire-01.png",
    className:
      "left-[5%] top-[32%] w-[110px] rotate-[-10deg] sm:left-[7%] sm:top-[34%] sm:w-[230px] sm:rotate-[-9deg]",
    disabled: false,
  },
  {
    key: "fortune-cookie",
    label: "Fortuna",
    src: "/images/objects/fortune-cookie-01.png",
    className:
      "right-[4%] top-[31%] w-[95px] rotate-[8deg] sm:right-[8%] sm:top-[31%] sm:w-[190px] sm:rotate-[8deg]",
    disabled: false,
  },
  {
    key: "bowl",
    label: "Limpias",
    src: "/images/objects/ritual-bowl-01.png",
    className:
      "right-[11%] bottom-[20%] w-[105px] rotate-[-5deg] sm:right-[31%] sm:bottom-[13%] sm:w-[165px]",
    disabled: false,
  },
];

export default function MysticObjectTray({
  onSelectGrimoire,
  onSelectFortune,
  onSelectCleansing,
}: MysticObjectTrayProps) {
  return (
    <>
      {objects.map((object, index) => {
        const handleClick =
          object.key === "grimoire"
            ? onSelectGrimoire
            : object.key === "fortune-cookie"
              ? onSelectFortune
              : object.key === "bowl"
                ? onSelectCleansing
                : undefined;

        return (
          <motion.button
            key={object.key}
            type="button"
            onClick={handleClick}
            disabled={object.disabled}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={
              object.disabled
                ? undefined
                : {
                    y: -8,
                    scale: 1.03,
                  }
            }
            whileTap={
              object.disabled
                ? undefined
                : {
                    scale: 0.97,
                  }
            }
            transition={{
              delay: 0.75 + index * 0.12,
              duration: 0.8,
            }}
            className={`absolute z-30 aspect-square transition ${
              object.className
            } ${
              object.disabled
                ? "cursor-default opacity-80"
                : "mystic-interactive opacity-90"
            }`}
            aria-label={object.label}
          >
            <Image
              src={object.src}
              alt={object.label}
              fill
              sizes="(max-width: 640px) 110px, 240px"
              className="pointer-events-none object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.68)] sm:drop-shadow-[0_24px_32px_rgba(0,0,0,0.65)]"
            />

            <span className="pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap text-[8px] uppercase tracking-[0.24em] text-[#caa46a]/70 sm:mt-2 sm:text-[10px] sm:tracking-[0.3em]">
              {object.label}
            </span>
          </motion.button>
        );
      })}
    </>
  );
}