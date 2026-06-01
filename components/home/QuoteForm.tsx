"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";

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

const labelClass = "block text-[0.7rem] uppercase tracking-[0.1em] text-text-muted mb-2";
const errorClass = "text-xs text-accent-bright mt-1.5";

export default function QuoteForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const stepRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormData>({ mode: "onTouched" });

  // TODO(backend): no contact endpoint exists yet — this is a stubbed submit
  // (honeypot + simulated latency, then success UI). Wire to a real handler/API
  // when one is available. Do NOT treat submissions as delivered.
  const onSubmit = async (data: QuoteFormData) => {
    if (data._honey) {
      setSubmitted(true);
      return;
    }
    await new Promise((res) => setTimeout(res, 800));
    setSubmitted(true);
  };

  const handleContinue = async () => {
    const valid = await trigger(["name", "email", "message"]);
    if (valid) setStep(2);
  };

  // Entrance reveal
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".c-reveal", {
        opacity: 0,
        y: 26,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
    },
    { scope: sectionRef }
  );

  // Crossfade the step container on step change
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!stepRef.current) return;
      gsap.fromTo(stepRef.current, { opacity: 0, x: step === 1 ? -18 : 18 }, { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" });
    },
    { dependencies: [step, submitted], scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="contact bg-bg-secondary border-t border-border-subtle py-[clamp(4.5rem,11vh,9rem)]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 grid lg:grid-cols-[1.05fr_1fr] gap-[clamp(2.5rem,6vw,6rem)] items-start">
        {/* Left — info */}
        <div>
          <span className="c-reveal eyebrow">Start Your Project</span>
          <h2 className="c-reveal sec-title text-[clamp(2.2rem,5.5vw,4.6rem)] font-normal leading-[1] tracking-[-0.02em] text-text-primary mt-6">
            Get a <em>Free</em> Quote
          </h2>
          <p className="c-reveal text-text-secondary leading-[1.7] mt-6 max-w-[42ch]">
            Tell us about your project. The more detail you share, the better we can tailor our response. We reply
            within one business day, always.
          </p>
          <div className="c-reveal mt-10 flex flex-col gap-4">
            <a
              href="mailto:contact@digitalkarvan.com"
              className="flex items-center gap-3 text-[1.05rem] text-text-secondary hover:text-accent-soft transition-colors"
            >
              <span className="w-[42px] h-[42px] shrink-0 border border-border-default rounded-full grid place-items-center text-accent-soft">
                ✉
              </span>
              contact@digitalkarvan.com
            </a>
            <a
              href="tel:+447377259354"
              className="flex items-center gap-3 text-[1.05rem] text-text-secondary hover:text-accent-soft transition-colors"
            >
              <span className="w-[42px] h-[42px] shrink-0 border border-border-default rounded-full grid place-items-center text-accent-soft">
                ☎
              </span>
              +44 737 7259 354
            </a>
          </div>
        </div>

        {/* Right — form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="c-reveal bg-bg-primary border border-border-subtle rounded-[18px] p-[clamp(1.6rem,3vw,2.4rem)]"
        >
          {/* Honeypot anti-spam field */}
          <input
            type="text"
            {...register("_honey")}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] w-px h-px overflow-hidden"
          />

          {submitted ? (
            <div className="text-center py-6">
              <CheckCircle size={48} className="text-accent mx-auto mb-5" />
              <h3 className="text-2xl font-medium text-text-primary mb-3">Thanks — we&apos;ll be in touch.</h3>
              <p className="text-text-secondary max-w-sm mx-auto leading-relaxed">
                We review every enquiry personally and respond within one business day. Keep an eye on your inbox.
              </p>
            </div>
          ) : (
            <>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent-soft mb-7" role="status">
                Step {step} of 2
              </p>

              <div ref={stepRef}>
                {step === 1 ? (
                  <div className="space-y-6">
                    <div className="cfield">
                      <label htmlFor="name" className={labelClass}>Full Name *</label>
                      <input id="name" type="text" placeholder="Jane Doe" {...register("name", { required: "Full name is required" })} />
                      {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                    </div>
                    <div className="cfield">
                      <label htmlFor="email" className={labelClass}>Email *</label>
                      <input
                        id="email"
                        type="email"
                        placeholder="jane@company.com"
                        {...register("email", {
                          required: "Email is required",
                          pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address" },
                        })}
                      />
                      {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                    </div>
                    <div className="cfield">
                      <label htmlFor="message" className={labelClass}>How can we help? *</label>
                      <textarea
                        id="message"
                        rows={3}
                        placeholder="A few lines about your project…"
                        {...register("message", { required: "Please tell us about your project" })}
                      />
                      {errors.message && <p className={errorClass}>{errors.message.message}</p>}
                    </div>

                    <button type="button" onClick={handleContinue} className="btn btn--solid w-full justify-center">
                      <span className="lbl">Continue — Add More Details</span>
                      <span className="arr">→</span>
                    </button>
                    <p className="text-sm text-text-muted">We respond to every enquiry within one business day. No spam, ever.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="cfield">
                        <label htmlFor="phone" className={labelClass}>Phone (optional)</label>
                        <input id="phone" type="tel" inputMode="tel" placeholder="+44 7XX XXX XXXX" {...register("phone")} />
                      </div>
                      <div className="cfield">
                        <label htmlFor="company" className={labelClass}>Company (optional)</label>
                        <input id="company" type="text" placeholder="Acme Ltd" {...register("company")} />
                      </div>
                    </div>
                    <div className="cfield">
                      <label htmlFor="companyUrl" className={labelClass}>Company Website (optional)</label>
                      <input id="companyUrl" type="url" placeholder="https://yourcompany.com" {...register("companyUrl")} />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="cfield">
                        <label htmlFor="budget" className={labelClass}>Budget (optional)</label>
                        <select id="budget" {...register("budget")}>
                          <option value="">Select budget range</option>
                          <option value="under-5k">Under £5,000</option>
                          <option value="5k-15k">£5,000 – £15,000</option>
                          <option value="15k-30k">£15,000 – £30,000</option>
                          <option value="30k-plus">£30,000+</option>
                        </select>
                      </div>
                      <div className="cfield">
                        <label htmlFor="region" className={labelClass}>Region (optional)</label>
                        <select id="region" {...register("region")}>
                          <option value="">Select region</option>
                          <option value="uk">United Kingdom</option>
                          <option value="uae">UAE / Middle East</option>
                          <option value="eu">Europe</option>
                          <option value="us">United States</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <p className={labelClass}>Services Needed (optional)</p>
                      <div className="grid sm:grid-cols-2 gap-3 mt-2">
                        {serviceOptions.map((svc) => {
                          const svcId = `service-${svc.replace(/\s+/g, "-").toLowerCase()}`;
                          return (
                            <label key={svc} htmlFor={svcId} className="flex items-start gap-3 cursor-pointer group">
                              <input
                                id={svcId}
                                type="checkbox"
                                value={svc}
                                {...register("services")}
                                className="mt-0.5 accent-[var(--accent)]"
                              />
                              <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors leading-snug">
                                {svc}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <button type="submit" disabled={isSubmitting} className="btn btn--solid w-full justify-center disabled:opacity-60">
                        <span className="lbl">{isSubmitting ? "Sending…" : "Submit Enquiry"}</span>
                        <span className="arr">→</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-sm text-text-muted hover:text-text-secondary transition-colors"
                      >
                        ← Back
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
