"use client";
import { FormEvent, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Website enquiry: ${data.get("subject")}`);
    const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\nOrganisation: ${data.get("organisation")}\n\nMessage:\n${data.get("message")}`);
    window.location.href = `mailto:smarizini@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }
  return <form className="contact-form" onSubmit={handleSubmit}>
    <label>Your name<input name="name" required placeholder="Full name"/></label>
    <label>Email address<input name="email" type="email" required placeholder="you@company.com"/></label>
    <label>Organisation <span>(optional)</span><input name="organisation" placeholder="Company or organisation"/></label>
    <label>Subject<input name="subject" required placeholder="How can we help?"/></label>
    <label>Your message<textarea name="message" rows={5} required placeholder="Write your message here..."/></label>
    <button className="button button-gold" type="submit">Prepare enquiry <ArrowUpRight size={16}/></button>
    {sent && <p className="form-note">Your email app should open with the message prepared. If it doesn't, email smarizini@gmail.com directly.</p>}
  </form>;
}