"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SuccessCard } from "@/components/contact/SuccessCard";

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.7a2 2 0 01-.5 2.1L8 9.6a16 16 0 006 6l1.1-1.1a2 2 0 012.1-.5c.9.3 1.8.5 2.7.6a2 2 0 011.7 2z" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

const info = [
  { icon: <MailIcon />, label: "Email", lines: ["contact@digitalkarvan.com"] },
  { icon: <PhoneIcon />, label: "Phone", lines: ["+44 737 7259 354"] },
  { icon: <PinIcon />, label: "UK Office", lines: ["Charter Avenue, Coventry"] },
  {
    icon: <PinIcon />,
    label: "Netherlands Office",
    lines: ["Leehove 40, 2678 MC De Lier", "+31 174 705 811"],
  },
  { icon: <ClockIcon />, label: "Business Hours", lines: ["Mon – Fri: 9:00 – 18:00 GMT"] },
];

const inputClass =
  "w-full rounded-2xl border border-black/12 bg-white px-5 py-4 text-[15px] text-neutral-900 placeholder:text-neutral-400 outline-none transition focus:border-brand-magenta focus:ring-2 focus:ring-brand-magenta/20";

export function ContactBody() {
  return (
    <section className="bg-white pb-20 lg:pb-24">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Info */}
        <div className="flex flex-col gap-3" data-anim-stagger>
          {info.map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-4 rounded-2xl border border-black/8 bg-white p-5 transition hover:border-black/20"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-white">
                {item.icon}
              </span>
              <div>
                <p className="text-[13px] font-semibold uppercase tracking-widest text-neutral-400">
                  {item.label}
                </p>
                {item.lines.map((l) => (
                  <p key={l} className="mt-1 text-[16px] text-neutral-800">
                    {l}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <ContactForm />
      </Container>
    </section>
  );
}

function ContactForm() {
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
    return <SuccessCard name={sentName} variant="panel" />;
  }

  return (
    <form
      className="rounded-[28px] border border-black/8 bg-[#f7f7f7] p-7 sm:p-10"
      onSubmit={onSubmit}
      data-anim
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <input className={inputClass} name="name" type="text" placeholder="Name" aria-label="Name" required />
        <input className={inputClass} name="email" type="email" placeholder="Email" aria-label="Email" required />
      </div>
      <input className={`${inputClass} mt-4`} name="subject" type="text" placeholder="Subject" aria-label="Subject" required />
      <textarea className={`${inputClass} mt-4 min-h-[170px] resize-y`} name="message" placeholder="Message" aria-label="Message" required />
      {status === "error" && (
        <p className="mt-4 text-[14px] text-red-500" role="alert">{error}</p>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-brand-gradient mt-5 w-full rounded-2xl px-7 py-4 text-[15px] font-semibold text-white shadow-[0_14px_34px_-12px_rgba(214,43,121,0.7)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit sm:px-10"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
