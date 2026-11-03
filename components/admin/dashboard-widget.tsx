"use client";

import { ChevronUp } from "lucide-react";
import { useState } from "react";

export function DashboardWidget({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <section className={open ? "wp-widget" : "wp-widget is-closed"}>
      <h2>
        <button
          type="button"
          className="wp-widget-toggle"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span>{title}</span>
          <ChevronUp size={16} />
        </button>
      </h2>
      {open ? <div className="wp-widget-body">{children}</div> : null}
    </section>
  );
}
