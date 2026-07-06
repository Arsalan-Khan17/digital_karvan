export type ContactData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const BRAND = {
  name: "Digital Karvan",
  tagline: "Design · Build · Launch",
  email: "contact@digitalkarvan.com",
  phone: "+44 737 7259 354",
  site: "digitalkarvan.com",
};

/** Escape user-supplied text before dropping it into HTML. */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const GRADIENT = "linear-gradient(90deg,#ff6a66 0%,#f5318a 52%,#8a2be2 100%)";

/**
 * Shared, email-client-safe shell: table layout, inline styles, 600px card,
 * gradient header, dark footer. `bodyHtml` is the middle content.
 */
function layout({
  preheader,
  heading,
  intro,
  bodyHtml,
}: {
  preheader: string;
  heading: string;
  intro: string;
  bodyHtml: string;
}): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="light only" />
<title>${esc(heading)}</title>
</head>
<body style="margin:0;padding:0;background:#f4f5f7;-webkit-font-smoothing:antialiased;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <span style="display:none!important;visibility:hidden;opacity:0;height:0;width:0;overflow:hidden;mso-hide:all;">${esc(preheader)}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 12px 40px -18px rgba(20,20,40,0.35);">
          <!-- Header -->
          <tr>
            <td style="background:#f5318a;background-image:${GRADIENT};padding:26px 40px;">
              <div style="font-size:20px;font-weight:700;letter-spacing:-0.02em;color:#ffffff;">${BRAND.name}</div>
              <div style="margin-top:4px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.85);">${BRAND.tagline}</div>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:38px 40px 30px;">
              <h1 style="margin:0 0 12px;font-size:23px;line-height:1.25;font-weight:700;color:#141419;">${esc(heading)}</h1>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.65;color:#54555f;">${intro}</p>
              ${bodyHtml}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#0d0d10;padding:26px 40px;">
              <div style="font-size:15px;font-weight:700;color:#ffffff;">${BRAND.name}</div>
              <div style="margin-top:10px;font-size:13px;line-height:1.7;color:#9aa0a6;">
                <a href="mailto:${BRAND.email}" style="color:#cbd5e1;text-decoration:none;">${BRAND.email}</a>
                &nbsp;·&nbsp; ${BRAND.phone}
              </div>
              <div style="margin-top:14px;font-size:12px;color:#6b7078;">© 2026 ${BRAND.name}. All rights reserved.</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** A soft “field” row used inside the message summary boxes. */
function field(label: string, value: string, mono = false): string {
  return `
  <tr>
    <td style="padding:14px 18px;border-bottom:1px solid #ececed;">
      <div style="font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#9a9ba3;">${esc(label)}</div>
      <div style="margin-top:5px;font-size:15px;line-height:1.6;color:#1f2027;${mono ? "font-family:'SFMono-Regular',Menlo,Consolas,monospace;" : ""}">${value}</div>
    </td>
  </tr>`;
}

function summaryBox(rows: string): string {
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8fa;border:1px solid #ececef;border-radius:14px;overflow:hidden;">
    ${rows}
  </table>`;
}

/** Thank-you email sent to the person who submitted the form. */
export function customerEmail(d: ContactData): { subject: string; html: string } {
  const messageHtml = esc(d.message).replace(/\n/g, "<br/>");
  const rows =
    (d.subject ? field("Subject", esc(d.subject)) : "") +
    `<tr><td style="padding:14px 18px;">
       <div style="font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#9a9ba3;">Your message</div>
       <div style="margin-top:5px;font-size:15px;line-height:1.65;color:#1f2027;">${messageHtml}</div>
     </td></tr>`;

  const bodyHtml = `
    ${summaryBox(rows)}
    <p style="margin:26px 0 0;font-size:15px;line-height:1.65;color:#54555f;">
      In the meantime, feel free to reply directly to this email if you have anything to add.
    </p>
    <p style="margin:22px 0 0;font-size:15px;line-height:1.65;color:#141419;">
      Warm regards,<br/><strong>The ${BRAND.name} Team</strong>
    </p>`;

  return {
    subject: `Thanks for reaching out, ${d.name} — ${BRAND.name}`,
    html: layout({
      preheader: "We’ve received your message and will reply within 24 hours.",
      heading: `Thank you, ${esc(d.name)}!`,
      intro:
        "We’ve received your message and a member of our team will get back to you <strong>within 24 hours</strong>. Here’s a copy of what you sent us:",
      bodyHtml,
    }),
  };
}

/** Notification email sent to the Digital Karvan inbox. */
export function adminEmail(d: ContactData): { subject: string; html: string } {
  const messageHtml = esc(d.message).replace(/\n/g, "<br/>");
  const rows =
    field("Name", esc(d.name)) +
    field(
      "Email",
      `<a href="mailto:${esc(d.email)}" style="color:#c81e6e;text-decoration:none;">${esc(d.email)}</a>`,
    ) +
    field("Subject", d.subject ? esc(d.subject) : "—") +
    `<tr><td style="padding:14px 18px;">
       <div style="font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#9a9ba3;">Message</div>
       <div style="margin-top:5px;font-size:15px;line-height:1.65;color:#1f2027;">${messageHtml}</div>
     </td></tr>`;

  const bodyHtml = `
    ${summaryBox(rows)}
    <div style="margin-top:26px;">
      <a href="mailto:${esc(d.email)}?subject=${encodeURIComponent("Re: " + (d.subject || "Your enquiry"))}"
         style="display:inline-block;background:#f5318a;background-image:${GRADIENT};color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:12px 26px;border-radius:999px;">
        Reply to ${esc(d.name)}
      </a>
    </div>`;

  return {
    subject: `New enquiry from ${d.name}`,
    html: layout({
      preheader: `${d.name} sent a message via the website.`,
      heading: "New contact request",
      intro: "You’ve received a new enquiry through the website contact form.",
      bodyHtml,
    }),
  };
}
