import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="brand"><span className="brand-mark">⋀⋀</span><span className="brand-copy"><strong>FGM</strong><small>RESOURCES GHANA COMPANY</small></span></Link>
          <p>Building value through disciplined exploration, responsible mining and long-term thinking.</p>
        </div>
        <div><h4>Explore</h4><Link href="/">Home</Link><Link href="/about">About us</Link><Link href="/projects">Our projects</Link><Link href="/gallery">Gallery</Link><Link href="/sustainability">Sustainability</Link><Link href="/contact">Contact</Link></div>
        <div><h4>Contact</h4><p><Phone size={15}/> +233 20 174 9300 / +233 54 545 4240</p><p><WhatsAppIcon size={15}/> +233 20 174 9300</p><p><Mail size={15}/> smarizini@gmail.com</p><p><MapPin size={15}/> 16 Netflix Street, Madina Estate, Off IPS Road, East Legon, Accra, Ghana</p></div>
        <div className="footer-note"><span>GHANA</span><strong>Mining with<br/>purpose.</strong><Link href="/contact">Start a conversation <ArrowUpRight size={15}/></Link></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} FGM Resources Ghana Limited. All rights reserved.</span><span>Built by Mavros Black</span></div>
    </footer>
  );
}