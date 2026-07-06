import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { adminEmail, customerEmail } from "@/lib/email-templates";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const name = typeof data.name === "string" ? data.name.trim() : "";
    const email = typeof data.email === "string" ? data.email.trim() : "";
    const subject = typeof data.subject === "string" ? data.subject.trim() : "";
    const message = typeof data.message === "string" ? data.message.trim() : "";

    if (!name || !email || !/^\S+@\S+\.\S+$/.test(email) || !message) {
      return NextResponse.json(
        { success: false, error: "Please provide your name, a valid email, and a message." },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const data2 = { name, email, subject, message };

    // 1) Notify the team (critical).
    const admin = adminEmail(data2);
    await transporter.sendMail({
      from: `"DigitalKarvan Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: admin.subject,
      html: admin.html,
    });

    // 2) Thank-you confirmation to the customer (best-effort — don't fail the
    // request if this one bounces).
    try {
      const customer = customerEmail(data2);
      await transporter.sendMail({
        from: `"Digital Karvan" <${process.env.SMTP_USER}>`,
        to: email,
        replyTo: process.env.CONTACT_EMAIL,
        subject: customer.subject,
        html: customer.html,
      });
    } catch (err) {
      console.error("[contact] customer confirmation email failed:", err);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[contact] email error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
