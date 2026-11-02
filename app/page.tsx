import Link from "next/link";
import { ArrowRight, ArrowUpRight, Compass, Gem, Leaf, ShieldCheck, Pickaxe, Users, ChartNoAxesCombined } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const projects = [
  { name: "Ayanfuri Project", stage: "Exploration", location: "Western Region, Ghana", image: "/images/open-pit-mine.jpg", description: "A demonstration exploration asset focused on geological mapping and target evaluation." },
  { name: "Kwahu Project", stage: "Evaluation", location: "Eastern Region, Ghana", image: "/images/geologist-fieldwork.jpg", description: "A conceptual project area for staged technical review and exploration planning." },
  { name: "Bonsa Project", stage: "Exploration", location: "Western Region, Ghana", image: "/images/environment-landscape.jpg", description: "A sample portfolio entry illustrating the company's project presentation format." },
];

export default function Home() {
  return <>
    <section className="hero">
      <div className="hero-shade"/>
      <div className="container hero-content">
        <span className="eyebrow gold" style={{ textTransform: "none" }}>FGM Resources Ghana Limited</span>
        <h1>Building Value.<br/><em>Unearthing Potential.</em></h1>
        <p>A new generation of gold exploration and mining, driven by geological excellence, operational discipline, and responsible development.</p>
        <div className="button-row"><Link className="button button-gold" href="/projects">Explore Our Projects <ArrowUpRight size={17}/></Link><Link className="button button-outline" href="/about">About FGM</Link></div>
        <div className="hero-caption"><span>01 / 05</span><span>DISCIPLINE · INTEGRITY · RESPONSIBILITY</span></div>
      </div>
      <div className="hero-bottom container"><span>GOLD EXPLORATION & MINING</span><span>ACCRA, GHANA</span></div>
    </section>

    <section className="stat-strip"><div className="container stats">
      <div><strong>5</strong><span>Mining Licences <small>Demonstration figure</small></span></div>
      <div><strong>2010</strong><span>Founded <small>Demonstration figure</small></span></div>
      <div><strong>Ghana</strong><span>Our Home <small>Demo positioning</small></span></div>
      <div><strong>Gold</strong><span>Our Focus <small>Core commodity</small></span></div>
    </div></section>

    <section className="section container about-preview">
      <div className="about-image image-frame"><img src="/images/geology-team.jpg" alt="Mining and geology professionals reviewing project information" /></div>
      <div className="about-copy"><SectionHeading eyebrow="ABOUT FGM" title="Driven by geology. Defined by integrity." text="FGM Gold Mining Limited is a gold exploration and mining company focused on unlocking mineral potential and creating enduring value."/><p>Our approach is grounded in geological evidence, responsible planning and transparent communication.</p><Link className="text-link" href="/about">Learn More <ArrowRight size={16}/></Link></div>
    </section>

    <section className="principles-band"><div className="container"><SectionHeading eyebrow="OUR CORE PRINCIPLES" title="Our Core Principles" text="Safety first. Operational excellence. Transparency. Sustainable growth." light/><div className="principle-grid">
      <div><span className="principle-icon"><Gem/></span><h3>Safety First</h3><p>People, communities and the environment.</p></div>
      <div><span className="principle-icon"><ChartNoAxesCombined/></span><h3>Operational Excellence</h3><p>Do it right, always.</p></div>
      <div><span className="principle-icon"><ShieldCheck/></span><h3>Transparency</h3><p>Build trust through open reporting.</p></div>
      <div><span className="principle-icon"><Leaf/></span><h3>Sustainable Growth</h3><p>Create long-term value.</p></div>
    </div></div></section>

    <section className="section container"><div className="section-top"><SectionHeading eyebrow="OUR PORTFOLIO" title="Five licences. One strategic vision." text="FGM is developing a portfolio of five exploration and mining licences with the objective of identifying, evaluating and advancing promising gold assets."/><Link className="text-link desktop-link" href="/projects">View all projects <ArrowRight size={16}/></Link></div><div className="project-grid">{projects.map(p=><article className="project-card" key={p.name}><div className="project-photo"><img src={p.image} alt={p.name}/><span>{p.stage}</span></div><div className="project-info"><small>{p.location}</small><h3>{p.name}</h3><p>{p.description}</p><Link href="/projects" aria-label={`View ${p.name}`}><ArrowUpRight/></Link></div></article>)}</div><Link className="text-link mobile-link" href="/projects">View all projects <ArrowRight size={16}/></Link></section>

    <section className="cta-banner"><div className="container cta-inner"><span className="eyebrow gold">PARTNER WITH FGM</span><h2>Let’s Build a Prosperous Future Together.</h2><p>Partner with us for responsible mining and sustainable growth.</p><Link className="button button-gold" href="/contact">Contact our team <ArrowUpRight size={17}/></Link></div></section>
  </>;
}