import { SectionHeading } from "@/components/section-heading";
import { ArrowUpRight, MapPin, Pickaxe } from "lucide-react";

const projects = [
  ["Ayanfuri Project","Exploration","Western Region, Ghana","/images/open-pit-mine.jpg","A demonstration project profile for presenting exploration priorities, geological context and future work programmes."],
  ["Kwahu Project","Evaluation","Eastern Region, Ghana","/images/geologist-fieldwork.jpg","A sample asset profile illustrating how technical evaluation, access and development considerations can be communicated."],
  ["Bonsa Project","Exploration","Western Region, Ghana","/images/environment-landscape.jpg","A conceptual portfolio entry for communicating exploration rationale and staged technical assessment."],
  ["Daboase Project","Early-stage review","Western Region, Ghana","/images/drilling-team.jpg","A sample project page showing how early-stage opportunities may be introduced to stakeholders."],
  ["Akumadan Project","Evaluation","Ashanti Region, Ghana","/images/community-engagement.jpg","A demonstration entry for sharing project overview, licence details and future evaluation milestones."]
];

export default function Projects() {
  return <>
    <section className="page-hero projects-hero"><div className="container"><span className="eyebrow gold">OUR ASSETS</span><h1>Our <em>projects.</em></h1><p>A portfolio built through disciplined exploration and careful evaluation.</p><div className="breadcrumbs">Home <span>/</span> Our projects</div></div></section>
    <section className="section container"><SectionHeading eyebrow="OUR PORTFOLIO" title="Five licences. A strategic portfolio." text="A portfolio of exploration and evaluation projects across Ghana's key gold belts, advanced through disciplined technical review."/><div className="portfolio-summary"><div><strong>05</strong><span>Mining licences</span></div><div><strong>GOLD</strong><span>Primary commodity</span></div><div><strong>GHANA</strong><span>Operating jurisdiction</span></div></div><div className="portfolio-grid">{projects.map(([name,stage,location,image,description])=><article className="portfolio-card" key={name}><div className="portfolio-image"><img src={image} alt={`${name} landscape`}/><span>{stage}</span></div><div className="portfolio-copy"><small><MapPin size={13}/>{location}</small><h3>{name}</h3><p>{description}</p><a href="/contact">Project enquiries <ArrowUpRight size={15}/></a></div></article>)}</div><div className="project-feature"><div className="project-feature-icon"><Pickaxe size={20}/></div><div className="project-feature-copy"><h3>A disciplined path from target to value.</h3><p>Every project advances through geological review, staged technical evaluation and responsible development planning — with clear decision points before capital is committed.</p></div><a className="button button-gold" href="/contact">Discuss a project <ArrowUpRight size={16}/></a></div></section>
  </>;
}