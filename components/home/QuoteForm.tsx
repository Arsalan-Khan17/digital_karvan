"use client";

import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useState } from "react";

interface QuoteFormData {
  name: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
  companyUrl?: string;
  budget?: string;
  region?: string;
  services?: string[];
  _honey?: string;
}

const serviceOptions = [
  "Website Design & Development",
  "Branding & Identity Design",
  "Website Maintenance & Support",
  "Consultation & Technical Guidance",
];

export default function QuoteForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormData>({ mode: "onTouched" });

  const watchedName = watch("name");
  const watchedEmail = watch("email");
  const watchedMessage = watch("message");

  const onSubmit = async (data: QuoteFormData) => {
    // console.log(data);
    // if (data._honey) {
    //   setSubmitted(true);
    //   return;
    // }
    // console.log('honey passed');
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send");
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Failed to send enquiry.");
    }
  };

  const handleContinue = async () => {
    const valid = await trigger(["name", "email", "message"]);
    if (valid) setStep(2);
  };

  const inputClasses =
    "w-full px-4 py-3 bg-bg-elevated border border-border-default rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-text-primary/40 transition-colors text-sm";
  const labelClasses = "block text-sm font-medium text-text-secondary mb-2";
  const errorClasses = "text-xs text-red-400 mt-1";
  const positiveClasses = "text-xs text-green-400 mt-1";

  if (submitted) {
    return (
      <section className="py-16 md:py-24 bg-bg-secondary">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <CheckCircle size={52} className="text-accent mx-auto mb-6" />
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
              Thanks — we will be in touch.
            </h2>
            <p className="text-text-secondary text-base sm:text-lg max-w-md mx-auto">
              We review every enquiry personally and respond within one business day.
              Keep an eye on your inbox.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-bg-secondary">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-3">
            Start Your Project
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
            Get a Free Quote
          </h2>
          <p className="mt-4 text-text-secondary text-sm sm:text-base max-w-lg mx-auto">
            Tell us about your project. The more detail you share, the better we can
            tailor our response. We reply within one business day, always.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="p-5 sm:p-8 md:p-12 rounded-2xl bg-bg-card border border-border-subtle overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Honeypot anti-spam field */}
          <input
            type="text"
            {...register("_honey")}
            tabIndex={-1}
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-9999px",
              width: "1px",
              height: "1px",
              overflow: "hidden",
            }}
          />

          {/* Step indicator */}
          <p role="status" className="text-xs text-text-muted text-center mb-6">
            Step {step} of 2
          </p>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-5 sm:space-y-6"
              >
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className={labelClasses}>
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    aria-required="true"
                    aria-describedby={errors.name ? "name-error" : undefined}
                    {...register("name", { required: "Full name is required" })}
                    className={inputClasses}
                    placeholder="John Smith"
                  />
                  {errors.name ? (
                    <p id="name-error" className={errorClasses}>
                      {errors.name.message}
                    </p>
                  ) : watchedName ? (
                    <p className={positiveClasses}>Looks good ✓</p>
                  ) : null}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className={labelClasses}>
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    aria-required="true"
                    aria-describedby={errors.email ? "email-error" : undefined}
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email address" },
                    })}
                    className={inputClasses}
                    placeholder="john@company.com"
                  />
                  {errors.email ? (
                    <p id="email-error" className={errorClasses}>
                      {errors.email.message}
                    </p>
                  ) : watchedEmail ? (
                    <p className={positiveClasses}>Looks good ✓</p>
                  ) : null}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className={labelClasses}>
                    How can we help? *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    aria-required="true"
                    aria-describedby={errors.message ? "message-error" : undefined}
                    {...register("message", { required: "Please tell us about your project" })}
                    className={`${inputClasses} resize-none`}
                    placeholder="Tell us about your project..."
                  />
                  {errors.message ? (
                    <p id="message-error" className={errorClasses}>
                      {errors.message.message}
                    </p>
                  ) : watchedMessage ? (
                    <p className={positiveClasses}>Looks good ✓</p>
                  ) : null}
                </div>

                <button
                  type="button"
                  onClick={handleContinue}
                  className="w-full py-4 bg-accent text-white font-semibold rounded-xl hover:bg-red-700 transition-colors text-sm sm:text-base"
                >
                  Continue — Add More Details
                </button>

                <p className="text-center text-xs text-text-muted">
                  We respond to every enquiry within one business day. No spam, ever.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
                className="space-y-5 sm:space-y-6"
              >
                {/* Phone + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="phone" className={labelClasses}>
                      Phone (optional)
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      {...register("phone")}
                      className={inputClasses}
                      placeholder="+44 7XX XXX XXXX"
                    />
                    {errors.phone && (
                      <p id="phone-error" className={errorClasses}>
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="company" className={labelClasses}>
                      Company Name (optional)
                    </label>
                    <input
                      id="company"
                      type="text"
                      aria-describedby={errors.company ? "company-error" : undefined}
                      {...register("company")}
                      className={inputClasses}
                      placeholder="Acme Ltd"
                    />
                    {errors.company && (
                      <p id="company-error" className={errorClasses}>
                        {errors.company.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Company URL */}
                <div>
                  <label htmlFor="companyUrl" className={labelClasses}>
                    Company Website (optional)
                  </label>
                  <input
                    id="companyUrl"
                    type="url"
                    aria-describedby={errors.companyUrl ? "companyUrl-error" : undefined}
                    {...register("companyUrl")}
                    className={inputClasses}
                    placeholder="https://yourcompany.com"
                  />
                  {errors.companyUrl && (
                    <p id="companyUrl-error" className={errorClasses}>
                      {errors.companyUrl.message}
                    </p>
                  )}
                </div>

                {/* Budget + Region */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="budget" className={labelClasses}>
                      Budget (optional)
                    </label>
                    <select
                      id="budget"
                      aria-describedby={errors.budget ? "budget-error" : undefined}
                      {...register("budget")}
                      className={inputClasses}
                    >
                      <option value="">Select budget range</option>
                      <option value="under-5k">Under £5,000</option>
                      <option value="5k-15k">£5,000 – £15,000</option>
                      <option value="15k-30k">£15,000 – £30,000</option>
                      <option value="30k-plus">£30,000+</option>
                    </select>
                    {errors.budget && (
                      <p id="budget-error" className={errorClasses}>
                        {errors.budget.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="region" className={labelClasses}>
                      Your Region (optional)
                    </label>
                    <select
                      id="region"
                      aria-describedby={errors.region ? "region-error" : undefined}
                      {...register("region")}
                      className={inputClasses}
                    >
                      <option value="">Select region</option>
                      <option value="uk">United Kingdom</option>
                      <option value="uae">UAE / Middle East</option>
                      <option value="eu">Europe</option>
                      <option value="us">United States</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.region && (
                      <p id="region-error" className={errorClasses}>
                        {errors.region.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Services */}
                <div>
                  <p className={labelClasses}>Services Needed (optional)</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                    {serviceOptions.map((svc) => {
                      const svcId = `service-${svc.replace(/\s+/g, "-").toLowerCase()}`;
                      return (
                        <label
                          key={svc}
                          htmlFor={svcId}
                          className="flex items-start gap-3 cursor-pointer group"
                        >
                          <input
                            id={svcId}
                            type="checkbox"
                            value={svc}
                            {...register("services")}
                            className="mt-0.5 rounded border-border-default bg-bg-elevated text-accent focus:ring-0 focus:ring-offset-0"
                          />
                          <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors leading-snug">
                            {svc}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-accent text-white font-semibold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {isSubmitting ? "Sending..." : "Submit Enquiry"}
                  </button>
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-sm text-text-muted underline hover:text-text-secondary transition-colors"
                    >
                      ← Back
                    </button>
                  </div>
                </div>

                <p className="text-center text-xs text-text-muted">
                  We respond to every enquiry within one business day. No spam, ever.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  );
}
