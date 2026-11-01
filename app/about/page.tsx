import { SectionHeading } from "@/components/section-heading";
import { Compass, Gem, Handshake, ShieldCheck, Target, Telescope } from "lucide-react";

export default function About() {
  return <>
    <section className="page-hero about-hero"><div className="container"><span className="eyebrow gold">GET TO KNOW FGM</span><h1>About Us</h1><p>Grounded in geology. Guided by integrity.</p><div className="breadcrumbs">Home <span>/</span> About us</div></div></section>
    <section className="section container split-section"><div><SectionHeading eyebrow="OUR STORY" title="We are geologists, engineers, and operators." text="FGM Gold Mining Limited was incorporated in 2010 in this demonstration profile with a clear ambition: to build a gold company grounded in technical rigour, responsible operations and long-term thinking."/><p>We bring together the disciplines that matter across the mining lifecycle: geological understanding, engineering judgement, operational planning and stakeholder engagement. Our work is guided by evidence and a commitment to doing things properly.</p></div><div className="image-frame tall"><img src="/images/geologist-fieldwork.jpg" alt="Technical team at work"/></div></section>
    <section className="dark-section"><div className="container"><SectionHeading eyebrow="OUR DIRECTION" title="Purpose with a long-term view." text="Our vision and mission describe the standard we aim to uphold as the company grows." light/><div className="vision-grid"><article><Telescope/><span>OUR VISION</span><h3>To be a respected gold company.</h3><p>Recognised for disciplined exploration, responsible resource development and enduring value creation.</p></article><article><Target/><span>OUR MISSION</span><h3>To develop resources responsibly.</h3><p>Apply scientific expertise, operational excellence and transparent governance to every stage of our work.</p></article></div></div></section>
    <section className="section container"><SectionHeading eyebrow="WHAT WE BELIEVE" title="Principles that guide our decisions." text="The orebody is the boss. No amount of ambition can replace geological evidence, sound planning or honest reporting."/><div className="values-grid">
      <article><Gem/><h3>Geological integrity</h3><p>We put data, field evidence and technical review ahead of assumptions.</p></article>
      <article><Compass/><h3>Disciplined decisions</h3><p>We assess risk and allocate resources with care at every project stage.</p></article>
      <article><ShieldCheck/><h3>Accountability</h3><p>We aim for clear responsibilities, reliable reporting and ethical conduct.</p></article>
      <article><Handshake/><h3>Respectful partnerships</h3><p>We value constructive relationships with communities and stakeholders.</p></article>
    </div></section>
    <section className="quote-section"><div className="container"><p>“Prove before we spend. Plan before we promise. Report before anyone has to ask.”</p><span>THE FGM APPROACH · DEMONSTRATION BRAND STATEMENT</span></div></section>
  </>;
}