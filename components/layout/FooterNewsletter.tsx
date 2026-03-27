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
    <form className="flex gap-2 mt-3" onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className="flex-1 px-3 py-2 text-sm bg-bg-elevated border border-border-default rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-text-primary/50 transition-colors"
      />
      <button
        type="submit"
        className="px-3 py-2 text-sm bg-accent text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
      >
        Go
      </button>
    </form>
  );
}
