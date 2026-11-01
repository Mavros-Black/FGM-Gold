"use client";
import { useEffect } from "react";
import { X } from "lucide-react";
import { ContactForm } from "./contact-form";

export function ContactModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div className="contact-modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="contact-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="contact-modal-close" onClick={onClose} aria-label="Close contact form">
          <X size={20} />
        </button>
        <h2 id="contact-modal-title">Get in touch.</h2>
        <p>Complete the form and your email application will open with your enquiry prepared.</p>
        <ContactForm />
      </div>
    </div>
  );
}
