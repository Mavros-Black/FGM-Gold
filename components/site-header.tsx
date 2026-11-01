"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { ContactModal } from "./contact-modal";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Our Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/sustainability", label: "Sustainability" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
    <header className="site-header">
      <div className="nav-wrap container">
        <Link href="/" className="brand" aria-label="FGM Gold Mining Limited home">
          <span className="brand-mark">⋀⋀</span>
          <span className="brand-copy"><strong>FGM</strong><small>GOLD MINING LIMITED</small></span>
        </Link>
        <nav className={open ? "nav-links is-open" : "nav-links"}>
          {links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
          <button className="nav-cta nav-cta-mobile" onClick={() => { setOpen(false); setModalOpen(true); }}>
            Get in touch <ArrowUpRight size={15} />
          </button>
        </nav>
        <div className="nav-actions">
          <button className="nav-cta" onClick={() => { setOpen(false); setModalOpen(true); }}>
            Get in touch <ArrowUpRight size={15} />
          </button>
          <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
    {modalOpen && <ContactModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
