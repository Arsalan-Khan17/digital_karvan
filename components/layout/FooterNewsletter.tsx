"use client";

import { useState } from "react";

export default function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  if (submitted) {
    return (
      <p className="text-sm text-text-secondary mt-3">
        Thanks for subscribing!
      </p>
    );
  }

  return (
    <form className="flex gap-2 mt-3 max-w-[330px]" onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        aria-label="Newsletter email"
        className="flex-1 px-4 py-2.5 text-sm bg-transparent border border-border-default rounded-full text-text-primary placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
      />
      <button
        type="submit"
        className="px-5 py-2.5 text-sm bg-accent text-white rounded-full hover:bg-accent-bright transition-colors font-semibold"
      >
        Go
      </button>
    </form>
  );
}
