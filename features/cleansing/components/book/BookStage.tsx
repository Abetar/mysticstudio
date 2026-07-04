"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type BookStageProps = {
  children: ReactNode;
};

export default function BookStage({ children }: BookStageProps) {
  return (
    <motion.div className="relative flex h-full w-full items-center justify-center px-3 pb-18 pt-4 sm:px-6 sm:pb-20 sm:pt-6">
      <div className="relative flex h-[86%] w-[90%] max-w-[980px] items-center justify-center sm:h-[86%] sm:w-[88%]">
        {children}
      </div>
    </motion.div>
  );
}