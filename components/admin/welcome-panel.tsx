"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useState } from "react";

export function WelcomePanel({ unread, drafts }: { unread: number; drafts: number }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <section className="welcome-panel">
      <button
        type="button"
        className="welcome-panel-close"
        aria-label="Dismiss this panel"
        onClick={() => setVisible(false)}
      >
        <X size={16} />
      </button>
      <h2>Welcome to FGM Resources</h2>
      <p>
        You have <strong>{unread} unread messages</strong> and{" "}
        <strong>{drafts} draft items</strong> awaiting review. Use this console to manage
        content, media and enquiries across the website.
      </p>
      <div className="welcome-panel-actions">
        <Link href="/admin/posts/new" className="wp-button">
          Create a post
        </Link>
        <Link href="/admin/messages" className="wp-button wp-button-secondary">
          Review messages
        </Link>
        <Link href="/" className="wp-button wp-button-secondary">
          View site
        </Link>
      </div>
    </section>
  );
}
