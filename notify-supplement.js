// netlify/functions/notify-supplement.js
// Securely sends two emails via Resend when a customer requests
// notification for an out-of-stock / broken-link supplement.
// RESEND_KEY is read server-side — never exposed to the browser.

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  const RESEND_KEY = process.env.RESEND_KEY;
  if (!RESEND_KEY) {
    return { statusCode: 500, body: "Email service not configured" };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: "Invalid request body" };
  }

  const {
    email,
    supplementName,
    supplementBrand,
    supplementSubtitle,
    supplementAsin,
    supplementEmoji,
  } = body;

  if (!email || !email.includes("@") || !supplementName) {
    return { statusCode: 400, body: "Missing required fields" };
  }

  const send = async (payload) => {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_KEY}`,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Resend error: ${res.status} — ${text}`);
    }
    return res.json();
  };

  try {
    // 1. Confirmation email to customer
    await send({
      from: "Chai Holistic <hello@chaiholistic.com>",
      to: [email],
      subject: `✦ You're on the list — ${supplementName}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;color:#2A1A0A;padding:32px 24px;background:#FFFDF8">
          <div style="margin-bottom:24px">
            <span style="font-size:1.8rem">${supplementEmoji || "🌿"}</span>
          </div>
          <h2 style="font-family:Georgia,serif;font-size:1.5rem;font-weight:700;color:#2A1A0A;margin:0 0 8px">
            You're on the list ✦
          </h2>
          <p style="font-size:.95rem;line-height:1.8;color:#5A4030;margin:0 0 20px">
            Thank you for your interest in <strong>${supplementName}</strong> by ${supplementBrand} — <em>${supplementSubtitle}</em>.
          </p>
          <p style="font-size:.9rem;line-height:1.85;color:#6A5040;margin:0 0 20px">
            We source only supplements that meet our exact standard for ingredient form, purity, and third-party testing. 
            That means availability can be limited — we won't point you somewhere we can't stand behind.
          </p>
          <p style="font-size:.9rem;line-height:1.85;color:#6A5040;margin:0 0 28px">
            We'll reach out personally the moment this is available — or with an equal-or-better alternative 
            curated to the same standard. You'll hear from us directly.
          </p>
          <div style="border-top:1px solid #E8DDD0;padding-top:20px">
            <p style="font-size:.8rem;color:#9A8070;margin:0;line-height:1.6">
              With warmth,<br/>
              <strong style="color:#5A4030">The Chai Holistic Team</strong><br/>
              <a href="https://chaiholistic.com" style="color:#C4893A;text-decoration:none;font-size:.75rem">chaiholistic.com</a>
            </p>
          </div>
          <p style="font-size:.65rem;color:#C0B0A0;margin-top:20px;line-height:1.5">
            We'll never share your email. You'll receive one notification only — no newsletters, no spam.
          </p>
        </div>
      `,
    });

    // 2. Internal alert to store owner
    await send({
      from: "Chai Holistic Alerts <hello@chaiholistic.com>",
      to: ["alexisw2025@gmail.com"],
      subject: `🔔 Supplement Notify Request — ${supplementName}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:480px;padding:24px;color:#1A1A1A">
          <h3 style="margin:0 0 16px;color:#C4893A">Supplement Notification Request</h3>
          <table style="width:100%;border-collapse:collapse;font-size:.9rem">
            <tr><td style="padding:8px 0;color:#666;width:140px"><strong>Customer:</strong></td><td>${email}</td></tr>
            <tr><td style="padding:8px 0;color:#666"><strong>Supplement:</strong></td><td>${supplementEmoji || ""} ${supplementName}</td></tr>
            <tr><td style="padding:8px 0;color:#666"><strong>Brand:</strong></td><td>${supplementBrand}</td></tr>
            <tr><td style="padding:8px 0;color:#666"><strong>ASIN on file:</strong></td><td><code>${supplementAsin}</code></td></tr>
            <tr><td style="padding:8px 0;color:#666"><strong>Amazon link:</strong></td><td><a href="https://www.amazon.com/dp/${supplementAsin}?tag=xiomaka-20">Check this link</a></td></tr>
          </table>
          <div style="margin-top:20px;padding:14px;background:#FFF8EE;border:1px solid #E8C880;border-radius:8px">
            <strong style="color:#8A6020">Action needed:</strong>
            <p style="margin:6px 0 0;font-size:.85rem;color:#5A4020">
              Verify the Amazon link above works. If broken, update the ASIN in 
              <code>SupplementsPage.jsx</code> and remove <code>linkBroken: true</code> from that supplement. 
              Then reply to the customer at <a href="mailto:${email}">${email}</a> with the correct link 
              or an equal-or-better alternative.
            </p>
          </div>
        </div>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("notify-supplement error:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send notification emails" }),
    };
  }
};
