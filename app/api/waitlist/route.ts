import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "waitlist.json");

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    ensureDataFile();
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const list: Array<{ email: string; name?: string; date: string; ip: string }> = JSON.parse(raw);

    const alreadyExists = list.find((e) => e.email.toLowerCase() === email.toLowerCase());
    if (alreadyExists) {
      return NextResponse.json({ message: "You're already on the list! We'll be in touch.", already: true });
    }

    const ip = req.headers.get("x-forwarded-for") || "unknown";
    list.push({ email, name: name || undefined, date: new Date().toISOString(), ip });
    fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2));

    return NextResponse.json({ message: "You're on the list! We'll notify you at launch.", count: list.length });
  } catch (err) {
    console.error("Waitlist error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // Simple admin endpoint — protect with a token in production
  const token = req.nextUrl.searchParams.get("token");
  if (token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  ensureDataFile();
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  const list = JSON.parse(raw);
  return NextResponse.json({ count: list.length, subscribers: list });
}
