"use client";

import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

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
        <div>
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
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <input className={inputClass} type="text" placeholder="Full Name" aria-label="Full Name" />
          <input className={inputClass} type="email" placeholder="Email" aria-label="Email" />
          <input className={inputClass} type="text" placeholder="Subject" aria-label="Subject" />
          <textarea className={`${inputClass} min-h-[150px] resize-y`} placeholder="Your message" aria-label="Your message" />
          <button
            type="submit"
            className="bg-brand-gradient mt-1 w-fit rounded-2xl px-7 py-4 text-[15px] font-semibold text-white shadow-[0_14px_34px_-12px_rgba(214,43,121,0.7)] transition-transform hover:-translate-y-0.5"
          >
            Send Message Now
          </button>
        </form>
      </Container>
    </section>
  );
}
