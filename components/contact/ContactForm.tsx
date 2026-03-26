"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  const onSubmit = async (_data: ContactFormData) => {
    await new Promise((res) => setTimeout(res, 800));
    setSubmitted(true);
  };

  const inputClasses =
    "w-full px-4 py-3 bg-bg-elevated border border-border-default rounded-xl text-white placeholder-text-muted focus:outline-none focus:border-white/40 transition-colors text-sm";
  const labelClasses = "block text-sm font-medium text-text-secondary mb-2";
  const errorClasses = "text-xs text-red-400 mt-1";

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-16"
      >
        <CheckCircle size={48} className="text-accent mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-text-secondary">
          We will get back to you within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className={labelClasses}>Name *</label>
        <input
          {...register("name", { required: "Name is required" })}
          className={inputClasses}
          placeholder="Your full name"
        />
        {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
      </div>

      <div>
        <label className={labelClasses}>Email *</label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
          })}
          type="email"
          className={inputClasses}
          placeholder="you@company.com"
        />
        {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
      </div>

      <div>
        <label className={labelClasses}>Subject *</label>
        <input
          {...register("subject", { required: "Subject is required" })}
          className={inputClasses}
          placeholder="How can we help?"
        />
        {errors.subject && <p className={errorClasses}>{errors.subject.message}</p>}
      </div>

      <div>
        <label className={labelClasses}>Message *</label>
        <textarea
          {...register("message", { required: "Message is required" })}
          rows={6}
          className={`${inputClasses} resize-none`}
          placeholder="Tell us more about your project or enquiry..."
        />
        {errors.message && <p className={errorClasses}>{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-accent text-white font-semibold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
