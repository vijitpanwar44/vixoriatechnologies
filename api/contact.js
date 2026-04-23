import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, company, phone, message, industry } = req.body;

  if (!name || !company || !phone) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await resend.emails.send({
      from: "Vixoria Contact Form <onboarding@resend.dev>",
      to: "vijit.panwar42@gmail.com",
      subject: `New enquiry from ${name} — ${company}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:15px">
          <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f4f4">Name</td><td style="padding:8px 12px">${name}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f4f4">Company</td><td style="padding:8px 12px">${company}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f4f4">Phone / WhatsApp</td><td style="padding:8px 12px">${phone}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f4f4">Industry</td><td style="padding:8px 12px">${industry || "—"}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f4f4;vertical-align:top">Message</td><td style="padding:8px 12px">${message || "—"}</td></tr>
        </table>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
