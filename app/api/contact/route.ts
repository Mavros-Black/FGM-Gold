import { NextResponse } from "next/server";
import { addMessage } from "@/lib/store";

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;

  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = asText(payload.name);
  const email = asText(payload.email);
  const organisation = asText(payload.organisation);
  const subject = asText(payload.subject);
  const message = asText(payload.message);

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "Please complete all required fields." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  await addMessage({ name, email, company: organisation, subject, body: message });

  return NextResponse.json({ ok: true });
}
