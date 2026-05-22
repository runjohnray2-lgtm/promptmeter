import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const OWNER_EMAIL = "ray@radiantz.com";

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    // Notify Ray instantly
    await resend.emails.send({
      from: "PromptMeter <onboarding@resend.dev>",
      to: OWNER_EMAIL,
      subject: `🚀 New waitlist signup: ${email}`,
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #6366f1;">New PromptMeter Signup 🎉</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #888;">Email</td>
              <td style="padding: 8px 0; font-weight: bold;">${email}</td>
            </tr>
            ${name ? `<tr><td style="padding: 8px 0; color: #888;">Name</td><td style="padding: 8px 0; font-weight: bold;">${name}</td></tr>` : ""}
            <tr>
              <td style="padding: 8px 0; color: #888;">Date</td>
              <td style="padding: 8px 0;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
          <p style="margin-top: 24px; color: #888; font-size: 14px;">
            Sent from promptmeter.io waitlist
          </p>
        </div>
      `,
    });

    // Send confirmation to subscriber
    await resend.emails.send({
      from: "PromptMeter <onboarding@resend.dev>",
      to: email,
      subject: "You're on the PromptMeter waitlist 🚀",
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 24px; background: #0a0a0f; color: #fff;">
          <h2 style="color: #6366f1;">You're in${name ? `, ${name.split(" ")[0]}` : ""}! 🎉</h2>
          <p style="color: #ccc; line-height: 1.6;">
            Thanks for joining the PromptMeter waitlist. You'll be first to know when Pro launches — 
            and as a founding member you'll get an exclusive discount.
          </p>
          <div style="margin: 24px 0; padding: 16px; background: #12121a; border-radius: 12px; border: 1px solid #222;">
            <p style="margin: 0; color: #888; font-size: 14px;">While you wait, the free tool is live now:</p>
            <a href="https://promptmeter.io" style="color: #6366f1; font-weight: bold; font-size: 18px;">promptmeter.io</a>
          </div>
          <p style="color: #666; font-size: 13px;">
            Reply to this email anytime — I read every one.<br/>
            — Ray, Builder of PromptMeter
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      message: "You're on the list! Check your email for confirmation.",
    });
  } catch (err) {
    console.error("Waitlist error:", err);
  }
}
