import { NextResponse } from "next/server";

// Proxy to the chatbot backend. Kept server-side so the browser talks to our
// own origin (no CORS, backend URL not exposed). Override with CHATBOT_API_URL.
const BACKEND_URL =
  process.env.CHATBOT_API_URL ?? "https://digitalkarvan-chatbot.onrender.com/chat";

export async function POST(request: Request) {
  let message: unknown;
  try {
    ({ message } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (typeof message !== "string" || message.trim().length === 0) {
    return NextResponse.json({ error: "A non-empty 'message' is required." }, { status: 400 });
  }

  try {
    // Render free tier can cold-start (~30-50s), so allow a generous timeout.
    const upstream = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message.trim() }),
      signal: AbortSignal.timeout(60_000),
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: `Chat service responded with ${upstream.status}.` },
        { status: 502 }
      );
    }

    const data = await upstream.json();
    const reply = typeof data?.reply === "string" ? data.reply : null;

    if (!reply) {
      return NextResponse.json({ error: "Empty response from chat service." }, { status: 502 });
    }

    return NextResponse.json({ reply });
  } catch (err) {
    const timedOut = err instanceof Error && err.name === "TimeoutError";
    return NextResponse.json(
      {
        error: timedOut
          ? "The assistant took too long to respond. Please try again."
          : "Could not reach the chat service. Please try again.",
      },
      { status: 504 }
    );
  }
}
