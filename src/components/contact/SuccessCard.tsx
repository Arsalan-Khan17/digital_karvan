"use client";

import { motion } from "framer-motion";

/**
 * Post-submit confirmation. Uses framer-motion for its own entrance so it never
 * depends on the global ScrollFX reveal (which only wires elements present at
 * mount — a dynamically-shown card tagged `data-anim` would stay invisible).
 */
export function SuccessCard({
  name,
  variant = "plain",
}: {
  name?: string;
  variant?: "plain" | "panel";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`flex h-full flex-col items-center justify-center rounded-[28px] border border-black/8 p-10 text-center sm:p-14 ${
        variant === "panel" ? "bg-[#f7f7f7]" : "bg-white"
      }`}
    >
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.12, type: "spring", stiffness: 200, damping: 14 }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-gradient text-white shadow-[0_16px_34px_-12px_rgba(214,43,121,0.7)]"
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12.5l5 5L20 6" />
        </svg>
      </motion.span>

      <h3 className="mt-6 text-[26px] font-bold tracking-tight text-black">
        Thank you{name ? `, ${name}` : ""}!
      </h3>
      <p className="mt-3 max-w-sm text-[16px] leading-relaxed text-neutral-500">
        Your message has been received. Our team will get back to you within{" "}
        <strong className="font-semibold text-neutral-800">24 hours</strong>.
      </p>
      <p className="mt-3 text-[14px] text-neutral-400">
        A confirmation email is on its way to your inbox.
      </p>
    </motion.div>
  );
}
