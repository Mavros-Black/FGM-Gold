import { SectionHeading } from "@/components/section-heading";
import { Leaf, Users, HardHat, Scale, Recycle, HeartHandshake } from "lucide-react";

const pillars = [
  {icon:Leaf,title:"Environmental stewardship",text:"Plan operations with care for land, water, biodiversity and responsible rehabilitation."},
  {icon:Users,title:"Community partnership",text:"Listen to host communities and support respectful, constructive engagement."},
  {icon:HardHat,title:"Health & safety",text:"Promote safe work practices, hazard awareness and a culture where people come first."},
  {icon:Scale,title:"Governance & compliance",text:"Uphold applicable laws, clear oversight, ethical conduct and accountable decisions."},
  {icon:Recycle,title:"Resource efficiency",text:"Encourage efficient use of materials, energy and water throughout project planning."},
  {icon:HeartHandshake,title:"Shared value",text:"Seek opportunities for local participation, skills development and lasting benefits."}
];

export default function Sustainability() {
  return <>
    <section className="page-hero sustainability-hero"><div className="container"><span className="eyebrow gold">OUR RESPONSIBILITY</span><h1>Mining with <em>respect.</em></h1><p>Responsible development begins long before production.</p><div className="breadcrumbs">Home <span>/</span> Sustainability</div></div></section>
    <section className="section container split-section sustainability-intro"><div><SectionHeading eyebrow="OUR COMMITMENT" title="Responsible mining. A sustainable future." text="We recognise that the long-term success of mining depends on how responsibly people, the environment and resources are managed."/><p>FGM's sustainability approach is presented here as a demonstration framework. The company should publish only policies, targets, certifications and performance data that have been formally approved and can be substantiated.</p></div><div className="image-frame tall"><img src="/images/environment-landscape.jpg" alt="Green forest landscape"/></div></section>
    <section className="dark-section"><div className="container"><SectionHeading eyebrow="OUR PRIORITIES" title="A responsible approach at every stage." text="Six focus areas for responsible project planning and operations." light/><div className="sustainability-grid">{pillars.map(({icon:Icon,title,text})=><article key={title}><Icon/><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section className="section container"><div className="commitment-panel"><div className="commitment-head"><span className="eyebrow">A NOTE ON TRANSPARENCY</span><h2>Clear commitments.<br/><em>Honest reporting.</em></h2></div><div className="commitment-body"><p>As the company develops, this page can host approved environmental and social policies, health and safety standards, community programmes, rehabilitation plans and annual performance reports.</p><a className="text-link" href="/contact">Ask us about our approach <span>→</span></a></div></div></section>
  </>;
}