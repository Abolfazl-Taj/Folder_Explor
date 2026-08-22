"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4 text-center w-full min-h-[65vh]">
      {/* Big 404 - each digit animated separately */}
      <motion.div
        className="flex items-center justify-center gap-1 sm:gap-2"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 },
          },
        }}
      >
        {["4", "0", "4"].map((digit, i) => (
          <motion.span
            key={i}
            className="text-7xl sm:text-8xl md:text-9xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50"
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.7, rotate: -8 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: 0,
                transition: {
                  type: "spring",
                  stiffness: 140,
                  damping: 12,
                },
              },
            }}
            animate={{
              y: [0, -12, 0],
              rotate: [0, i === 1 ? 3 : -3, 0],
            }}
            transition={{
              y: {
                duration: 2.8 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              },
              rotate: {
                duration: 3.5 + i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            {digit}
          </motion.span>
        ))}
      </motion.div>

      {/* Text content */}
      <motion.div
        className="space-y-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.5 },
          },
        }}
      >
        <motion.h2
          className="text-2xl sm:text-3xl font-semibold text-zinc-800 dark:text-zinc-200"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { type: "spring", stiffness: 100, damping: 16 },
            },
          }}
        >
          Page not found
        </motion.h2>

        <motion.p
          className="text-zinc-600 dark:text-zinc-400 max-w-md mx-auto text-base sm:text-lg"
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { type: "spring", stiffness: 100, damping: 18 },
            },
          }}
        >
          The page you are looking for doesn&apos;t exist or you don&apos;t have
          access.
        </motion.p>
      </motion.div>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.85, type: "spring", stiffness: 120, damping: 14 }}
      >
        <Link href="/dashboard">
          <motion.span
            className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-7 py-3.5 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-900 shadow-lg shadow-zinc-900/20 dark:shadow-zinc-50/10"
            whileHover={{
              scale: 1.06,
              y: -3,
              boxShadow: "0 12px 30px -8px rgba(0,0,0,0.25)",
            }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Back to Dashboard
          </motion.span>
        </Link>
      </motion.div>
    </div>
  );
}