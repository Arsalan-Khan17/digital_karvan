"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Hi! I'm Digital Karvan's AI assistant. Ask me anything about our web, app, AI, and data services — how can I help?",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  // Focus the input when the panel opens
  useEffect(() => {
    if (open) {
      setHasOpened(true);
      const t = setTimeout(() => inputRef.current?.focus(), 250);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    setError(null);
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data?.error ?? "Something went wrong.");

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [input, loading]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="font-sans">
      {/* Floating launcher */}
      <motion.button
        ref={triggerRef}
        onClick={() => setOpen((v) => !v)}
        className="group fixed z-50 bottom-5 right-5 flex items-center justify-center w-14 h-14 rounded-full bg-accent text-white shadow-lg shadow-accent/30 outline-none transition-[box-shadow,background-color] duration-300 hover:bg-red-600 hover:shadow-xl hover:shadow-accent/45 focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
        style={{ marginBottom: "env(safe-area-inset-bottom)" }}
        aria-label={open ? "Close chat" : "Open chat assistant"}
        aria-expanded={open}
        aria-controls="chat-widget-panel"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Attention pulse — only until the user first opens the chat */}
        {!hasOpened && (
          <motion.span
            className="absolute inset-0 rounded-full bg-accent"
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 1.6 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            aria-hidden
          />
        )}
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              className="relative"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X size={24} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              className="relative transition-transform duration-300 group-hover:-rotate-12"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <MessageCircle size={24} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="chat-widget-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="false"
            aria-label="Chat assistant"
            className="fixed z-50 bottom-24 right-5 left-5 sm:left-auto sm:w-[380px] flex flex-col overflow-hidden rounded-2xl border border-border-default bg-bg-primary shadow-2xl"
            style={{
              height: "min(560px, calc(100dvh - 8rem))",
              marginBottom: "env(safe-area-inset-bottom)",
            }}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border-subtle bg-bg-card shrink-0">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-accent/10 border border-accent/20 text-accent shrink-0">
                <Bot size={18} />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-bg-card" aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-text-primary leading-tight">Digital Karvan Assistant</p>
                <p className="text-xs text-text-muted leading-tight">AI-powered • replies in seconds</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="ml-auto p-2 -mr-1 text-text-secondary rounded-lg outline-none transition-all duration-200 hover:text-text-primary hover:bg-bg-elevated hover:rotate-90 active:scale-90 focus-visible:ring-2 focus-visible:ring-accent/50"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-3"
            >
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <div
                    className={`group/msg max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words shadow-sm transition-shadow duration-200 hover:shadow-md ${
                      m.role === "user"
                        ? "bg-accent text-white rounded-br-md shadow-accent/20"
                        : "bg-bg-card border border-border-subtle text-text-secondary rounded-bl-md"
                    }`}
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-bl-md bg-bg-card border border-border-subtle">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="w-1.5 h-1.5 rounded-full bg-text-muted"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {error && (
                <p className="text-xs text-accent text-center px-2" role="alert">
                  {error}
                </p>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-border-subtle p-3 bg-bg-primary shrink-0">
              <div className="flex items-end gap-2 rounded-xl border border-border-default bg-bg-card transition-colors duration-200 focus-within:border-accent/60 focus-within:bg-bg-elevated px-3 py-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = `${Math.min(e.target.scrollHeight, 112)}px`;
                  }}
                  onKeyDown={onKeyDown}
                  rows={1}
                  placeholder="Type your message…"
                  // Inline `outline: none` — the global :focus-visible rule in globals.css is
                  // unlayered, so it beats Tailwind's layered outline-none utility. Inline style
                  // (style attribute) outranks it. Focus is shown via the container's accent border.
                  style={{ outline: "none" }}
                  className="flex-1 resize-none bg-transparent text-sm text-text-primary placeholder:text-text-muted max-h-28 leading-relaxed"
                  aria-label="Message"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent text-white shrink-0 outline-none transition-all duration-200 hover:bg-red-600 hover:scale-110 active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-accent focus-visible:ring-2 focus-visible:ring-accent/50"
                  aria-label="Send message"
                >
                  <Send size={16} className="-ml-px" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
