"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { SuccessCard } from "@/components/contact/SuccessCard";

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.7a2 2 0 01-.5 2.1L8 9.6a16 16 0 006 6l1.1-1.1a2 2 0 012.1-.5c.9.3 1.8.5 2.7.6a2 2 0 011.7 2z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

const inputClass =
  "w-full rounded-2xl border border-black/12 bg-white px-5 py-4 text-[15px] text-neutral-900 placeholder:text-neutral-400 outline-none transition focus:border-brand-magenta focus:ring-2 focus:ring-brand-magenta/20";

export function Contact() {
  return (
    <section id="contact" className="relative bg-white py-20 lg:py-24" style={{ backgroundImage: "var(--page-wash)" }}>
      <Container className="grid gap-12 lg:grid-cols-2">
        {/* Left */}
        <div data-anim>
          <Badge>Get In Touch</Badge>
          <h2 className="mt-6 max-w-md text-[34px] font-bold leading-tight tracking-tight text-black sm:text-[40px]">
            We Are Always Ready To Help You &amp; Answer Your Questions
          </h2>

          <div className="mt-16 flex flex-wrap gap-12">
            <div>
              <div className="flex items-center gap-2 text-brand-magenta">
                <PhoneIcon />
                <span className="text-[15px] font-semibold">Contact</span>
              </div>
              <p className="mt-3 text-[16px] text-neutral-800">+44 737 7259 354</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-brand-magenta">
                <MailIcon />
                <span className="text-[15px] font-semibold">Email</span>
              </div>
              <p className="mt-3 text-[16px] text-neutral-800">contact@digitalkarvan.com</p>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <HomeContactForm />
      </Container>
    </section>
  );
}

function HomeContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [sentName, setSentName] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      subject: String(fd.get("subject") || ""),
      message: String(fd.get("message") || ""),
    };
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to send message.");
      form.reset();
      setSentName(payload.name.split(" ")[0] || "");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to send message.");
    }
  };

  if (status === "success") {
    return <SuccessCard name={sentName} />;
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit} data-anim-stagger>
      <input className={inputClass} name="name" type="text" placeholder="Full Name" aria-label="Full Name" required />
      <input className={inputClass} name="email" type="email" placeholder="Email" aria-label="Email" required />
      <input className={inputClass} name="subject" type="text" placeholder="Subject" aria-label="Subject" />
      <textarea className={`${inputClass} min-h-[150px] resize-y`} name="message" placeholder="Your message" aria-label="Your message" required />
      {status === "error" && <p className="text-[14px] text-red-500" role="alert">{error}</p>}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-brand-gradient mt-1 w-fit rounded-2xl px-7 py-4 text-[15px] font-semibold text-white shadow-[0_14px_34px_-12px_rgba(214,43,121,0.7)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send Message Now"}
      </button>
    </form>
  );
}
