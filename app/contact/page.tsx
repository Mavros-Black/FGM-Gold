import { SectionHeading } from "@/components/section-heading";
import { Mail, MapPin, Phone, Clock, ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

const mapCoords = "5.65973,-0.16774";
const mapEmbed = `https://maps.google.com/maps?q=${mapCoords}&z=17&t=m&output=embed`;
const mapLink = `https://maps.google.com/?q=${mapCoords}`;

export default function Contact() {
  return <>
    <section className="page-hero contact-hero"><div className="container"><span className="eyebrow gold">LET'S CONNECT</span><h1>Contact <em>FGM.</em></h1><p>Let's build meaningful partnerships.</p><div className="breadcrumbs">Home <span>/</span> Contact</div></div></section>
    <section className="section container contact-layout">
      <div className="contact-details">
        <SectionHeading eyebrow="GET IN TOUCH" title="We'd be pleased to hear from you." text="For business enquiries, partnerships and further information, please contact our team."/>
        <div className="contact-grid">
          <div className="contact-item"><Phone/><div><strong>Telephone</strong><a href="tel:+233201749300">+233 20 174 9300</a><a href="tel:+2335454240">+233 5454240</a></div></div>
          <div className="contact-item"><Mail/><div><strong>Email</strong><a href="mailto:smarizini@gmail.com">smarizini@gmail.com</a></div></div>
          <div className="contact-item"><MapPin/><div><strong>Head office</strong><p>16 Netflix Street, Madina Estate<br/>Off IPS Road, East Legon<br/>Accra, Ghana</p></div></div>
          <div className="contact-item"><Clock/><div><strong>Office hours</strong><p>Monday – Friday<br/>8:00 AM – 5:00 PM (GMT)</p><small>Demo hours — confirm before publication.</small></div></div>
        </div>
        <div className="contact-map">
          <iframe src={mapEmbed} title="FGM Gold Mining Limited head office location" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/>
        </div>
        <a className="contact-map-link" href={mapLink} target="_blank" rel="noreferrer">Open in Google Maps <ArrowUpRight size={15}/></a>
      </div>
      <div className="form-panel"><h2>Send us a message.</h2><p>Complete the form and your email application will open with your enquiry prepared.</p><ContactForm/></div>
    </section>
  </>;
}
