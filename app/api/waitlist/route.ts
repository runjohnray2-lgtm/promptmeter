import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });
    await resend.emails.send({ from: "PromptMeter <onboarding@resend.dev>", to: "ray@radiantz.com", subject: "New signup: " + email, html: "<p>" + email + " just joined the waitlist!</p>" });
    return NextResponse.json({ message: "You're on the list!" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error" }, { status: 500 });
    }
}
