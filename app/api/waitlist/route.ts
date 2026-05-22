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

    await resend.emails.send({
      from: "PromptMeter <onboarding@resend.dev>",
      to: OWNER_EMAIL,
      subject: `New waitlist signup: ${email}`,
      html: `<div style="font-family:sans-serif;padding:24px;"><h2>New Signup!</h2><p><b>Email:</b> ${email}</p>${name ? `<p><b>Name:</b> ${name}</p>` : ""}<p><b>Date:</b> ${new Date().toLocaleString()}</p></div>`,
    });

    await resend.emails.send({
      from: "PromptMeter <onboarding@resend.dev>",
      to: email,
      subject: "You're on the PromptMeter waitlist!",
      html: `<div style="font-family:sans-serif;padding:24px;"><h2>You're in!</h2><p>Thanks for joining. You'll be first to know when Pro launches — with a founder discount.</p><p>The free tool is live now: <a href="https://promptmeter.io">promptmeter.io</a></p><p>— Ray, Builder of PromptMeter</p></div>`,
    });

    return NextResponse.json({
      message: "You're on the list! Check your email for confirmation.",
    });
  } catch (err) {
    console.error("Waitlist error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
