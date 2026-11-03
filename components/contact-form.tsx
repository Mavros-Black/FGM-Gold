"use client";
import { FormEvent, useState } from "react";
import { ArrowUpRight } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          organisation: data.get("organisation"),
          subject: data.get("subject"),
          message: data.get("message"),
        }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(result.error || "We could not send your message. Please try again.");
      }
      form.reset();
      setStatus("sent");
    } catch (submitError) {
      setStatus("error");
      setError(
        submitError instanceof Error
          ? submitError.message
          : "We could not send your message. Please try again."
      );
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        Your name
        <input name="name" required placeholder="Full name" />
      </label>
      <label>
        Email address
        <input name="email" type="email" required placeholder="you@company.com" />
      </label>
      <label>
        Organisation <span>(optional)</span>
        <input name="organisation" placeholder="Company or organisation" />
      </label>
      <label>
        Subject
        <input name="subject" required placeholder="How can we help?" />
      </label>
      <label>
        Your message
        <textarea name="message" rows={5} required placeholder="Write your message here..." />
      </label>
      <button className="button button-gold" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send enquiry"} <ArrowUpRight size={16} />
      </button>
      {status === "sent" && (
        <p className="form-note">
          Thank you — your message has been received. Our team will respond shortly.
        </p>
      )}
      {status === "error" && (
        <p className="form-note" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
