export type PostStatus = "Published" | "Draft" | "Pending";

export type AdminPost = {
  id: number;
  title: string;
  slug: string;
  author: string;
  categories: string[];
  comments: number;
  date: string;
  status: PostStatus;
  excerpt: string;
  content: string;
  image: string;
};

export type AdminPage = {
  id: number;
  title: string;
  slug: string;
  author: string;
  date: string;
  status: PostStatus;
  template: string;
  content?: string;
};

export type MediaItem = {
  id: number;
  title: string;
  file: string;
  src: string;
  uploaded: string;
  size: string;
  dimensions: string;
};

export type GalleryItem = {
  id: number;
  title: string;
  category: string;
  src: string;
  uploaded: string;
};

export type Message = {
  id: number;
  name: string;
  email: string;
  company: string;
  subject: string;
  excerpt: string;
  date: string;
  unread: boolean;
};

export type AdminUser = {
  id: number;
  name: string;
  email: string;
  role: "Administrator" | "Editor" | "Author" | "Subscriber";
  posts: number;
  joined: string;
};

export const posts: AdminPost[] = [
  {
    id: 41,
    title: "FGM Commissions New Exploration Rig at the Ashanti Concession",
    slug: "fgm-commissions-exploration-rig",
    author: "Kwame Mensah",
    categories: ["Operations", "Exploration"],
    comments: 4,
    date: "2026-11-02 09:14",
    status: "Published",
    excerpt:
      "The new multi-purpose drill rig strengthens our resource definition programme across the Ashanti belt.",
    content:
      "FGM Resources Ghana Limited has commissioned a new multi-purpose exploration rig at its Ashanti concession, extending the company's resource definition programme into the 2027 financial year.\n\nThe rig, supported by an expanded field geology team, will target down-dip extensions of the known mineralised zones while maintaining the environmental safeguards outlined in our exploration permit.",
    image: "/gallery/drill-rig.jpeg",
  },
  {
    id: 40,
    title: "Responsible Water Management at the Tailings Facility",
    slug: "responsible-water-management",
    author: "Ama Boateng",
    categories: ["Sustainability", "Environment"],
    comments: 7,
    date: "2026-10-28 14:40",
    status: "Published",
    excerpt:
      "A closer look at the closed-loop water system that keeps our processing operations efficient and accountable.",
    content:
      "Water stewardship sits at the centre of our operating philosophy. This update outlines the closed-loop system installed at the tailings facility, the monitoring regime that supports it, and the results of the most recent independent audit.",
    image: "/gallery/processing-plant.jpeg",
  },
  {
    id: 39,
    title: "Community Skills Programme Graduates 38 Trainees",
    slug: "community-skills-programme",
    author: "Efua Owusu",
    categories: ["Community"],
    comments: 3,
    date: "2026-10-21 11:05",
    status: "Published",
    excerpt:
      "Local trainees completed certified programmes in heavy equipment operation, welding and site safety.",
    content:
      "Thirty-eight trainees from host communities have graduated from FGM's skills development programme. The programme is delivered in partnership with regional technical institutes and prioritises practical placement on FGM sites.",
    image: "/images/community-engagement.jpg",
  },
  {
    id: 38,
    title: "Q3 Operational Review: Safety, Throughput and Recovery",
    slug: "q3-operational-review",
    author: "Kwame Mensah",
    categories: ["Operations"],
    comments: 0,
    date: "2026-10-14 08:30",
    status: "Published",
    excerpt:
      "Quarterly figures show improved plant availability and a continued reduction in recordable incidents.",
    content:
      "The third-quarter operational review highlights improved plant availability, stable throughput and a continued reduction in recordable safety incidents across all active sites.",
    image: "/gallery/processing-silos.jpeg",
  },
  {
    id: 37,
    title: "Field Notes: Mapping the Northern Extension",
    slug: "field-notes-northern-extension",
    author: "Dr. Nana Adjei",
    categories: ["Exploration", "Geology"],
    comments: 2,
    date: "2026-10-06 16:20",
    status: "Draft",
    excerpt:
      "Preliminary mapping notes from the northern extension, including structural observations and sample results.",
    content:
      "Draft field notes covering the structural observations, alteration patterns and assay results gathered from the northern extension during the September mapping campaign.",
    image: "/images/geologist-fieldwork.jpg",
  },
  {
    id: 36,
    title: "Supplier Spotlight: Building Local Procurement Capacity",
    slug: "supplier-spotlight-local-procurement",
    author: "Efua Owusu",
    categories: ["Community", "Procurement"],
    comments: 1,
    date: "2026-09-29 10:10",
    status: "Published",
    excerpt:
      "How FGM's procurement framework is creating predictable demand for local suppliers and contractors.",
    content:
      "Our procurement framework prioritises local suppliers for categories where capacity exists. This spotlight covers the onboarding process, payment terms and the capacity-building support available to registered vendors.",
    image: "/gallery/logistics.jpeg",
  },
  {
    id: 35,
    title: "Independent Environmental Audit Returns Positive Findings",
    slug: "independent-environmental-audit",
    author: "Ama Boateng",
    categories: ["Sustainability", "Environment"],
    comments: 5,
    date: "2026-09-18 13:45",
    status: "Published",
    excerpt:
      "The annual independent audit confirmed compliance with our environmental management plan.",
    content:
      "The annual independent environmental audit has confirmed compliance with the company's environmental management plan, with two minor observations already addressed by site teams.",
    image: "/images/environment-landscape.jpg",
  },
  {
    id: 34,
    title: "Draft: 2027 Exploration Budget and Work Programme",
    slug: "2027-exploration-budget",
    author: "Kwame Mensah",
    categories: ["Exploration", "Corporate"],
    comments: 0,
    date: "2026-09-09 09:00",
    status: "Pending",
    excerpt:
      "Internal draft outlining proposed exploration expenditure and drilling targets for the coming year.",
    content:
      "Internal draft of the 2027 exploration budget, including proposed metreage, target generation and the associated permitting timeline.",
    image: "/images/open-pit-mine.jpg",
  },
];

export const pages: AdminPage[] = [
  {
    id: 12,
    title: "Home",
    slug: "home",
    author: "Kwame Mensah",
    date: "2026-10-30 08:12",
    status: "Published",
    template: "Landing",
  },
  {
    id: 11,
    title: "About",
    slug: "about",
    author: "Kwame Mensah",
    date: "2026-10-18 15:36",
    status: "Published",
    template: "Default",
  },
  {
    id: 10,
    title: "Our Projects",
    slug: "projects",
    author: "Dr. Nana Adjei",
    date: "2026-10-15 11:22",
    status: "Published",
    template: "Portfolio",
  },
  {
    id: 9,
    title: "Gallery",
    slug: "gallery",
    author: "Efua Owusu",
    date: "2026-10-11 09:48",
    status: "Published",
    template: "Gallery",
  },
  {
    id: 8,
    title: "Sustainability",
    slug: "sustainability",
    author: "Ama Boateng",
    date: "2026-10-04 14:05",
    status: "Published",
    template: "Default",
  },
  {
    id: 7,
    title: "Contact",
    slug: "contact",
    author: "Efua Owusu",
    date: "2026-09-27 10:31",
    status: "Published",
    template: "Contact",
  },
];

export const media: MediaItem[] = [
  {
    id: 60,
    title: "Open pit mine",
    file: "open-pit-mine.jpg",
    src: "/images/open-pit-mine.jpg",
    uploaded: "November 2, 2026",
    size: "1.8 MB",
    dimensions: "2400 × 1600",
  },
  {
    id: 59,
    title: "Drill rig on site",
    file: "drill-rig.jpeg",
    src: "/gallery/drill-rig.jpeg",
    uploaded: "November 2, 2026",
    size: "940 KB",
    dimensions: "1800 × 1200",
  },
  {
    id: 58,
    title: "Processing plant",
    file: "processing-plant.jpeg",
    src: "/gallery/processing-plant.jpeg",
    uploaded: "November 1, 2026",
    size: "1.1 MB",
    dimensions: "1800 × 1200",
  },
  {
    id: 57,
    title: "Geologist fieldwork",
    file: "geologist-fieldwork.jpg",
    src: "/images/geologist-fieldwork.jpg",
    uploaded: "October 30, 2026",
    size: "760 KB",
    dimensions: "1600 × 1067",
  },
  {
    id: 56,
    title: "Processing silos",
    file: "processing-silos.jpeg",
    src: "/gallery/processing-silos.jpeg",
    uploaded: "October 28, 2026",
    size: "870 KB",
    dimensions: "1800 × 1200",
  },
  {
    id: 55,
    title: "Site fleet",
    file: "site-fleet.jpeg",
    src: "/gallery/site-fleet.jpeg",
    uploaded: "October 25, 2026",
    size: "1.0 MB",
    dimensions: "1800 × 1200",
  },
  {
    id: 54,
    title: "Community engagement",
    file: "community-engagement.jpg",
    src: "/images/community-engagement.jpg",
    uploaded: "October 21, 2026",
    size: "690 KB",
    dimensions: "1600 × 1067",
  },
  {
    id: 53,
    title: "Environment landscape",
    file: "environment-landscape.jpg",
    src: "/images/environment-landscape.jpg",
    uploaded: "October 18, 2026",
    size: "820 KB",
    dimensions: "1600 × 1067",
  },
  {
    id: 52,
    title: "Access road",
    file: "access-road.jpeg",
    src: "/gallery/access-road.jpeg",
    uploaded: "October 14, 2026",
    size: "730 KB",
    dimensions: "1800 × 1200",
  },
  {
    id: 51,
    title: "Haulage trucks",
    file: "haulage.jpeg",
    src: "/gallery/haulage.jpeg",
    uploaded: "October 11, 2026",
    size: "910 KB",
    dimensions: "1800 × 1200",
  },
  {
    id: 50,
    title: "Site workshop",
    file: "site-workshop.jpeg",
    src: "/gallery/site-workshop.jpeg",
    uploaded: "October 7, 2026",
    size: "880 KB",
    dimensions: "1800 × 1200",
  },
  {
    id: 49,
    title: "Gold ore sample",
    file: "gold-ore.jpg",
    src: "/images/gold-ore.jpg",
    uploaded: "October 2, 2026",
    size: "640 KB",
    dimensions: "1600 × 1067",
  },
];

export const galleryItems: GalleryItem[] = [
  { id: 24, title: "Exploration drilling", category: "Exploration", src: "/gallery/drill-rig.jpeg", uploaded: "November 1, 2026" },
  { id: 23, title: "Processing plant", category: "Operations", src: "/gallery/processing-plant.jpeg", uploaded: "October 30, 2026" },
  { id: 22, title: "Site fleet", category: "Logistics", src: "/gallery/site-fleet.jpeg", uploaded: "October 27, 2026" },
  { id: 21, title: "Access road", category: "Infrastructure", src: "/gallery/access-road.jpeg", uploaded: "October 24, 2026" },
  { id: 20, title: "Haulage operations", category: "Logistics", src: "/gallery/haulage.jpeg", uploaded: "October 20, 2026" },
  { id: 19, title: "Site workshop", category: "Operations", src: "/gallery/site-workshop.jpeg", uploaded: "October 16, 2026" },
  { id: 18, title: "Processing silos", category: "Operations", src: "/gallery/processing-silos.jpeg", uploaded: "October 12, 2026" },
  { id: 17, title: "Wheel loader", category: "Equipment", src: "/gallery/wheel-loader.jpeg", uploaded: "October 8, 2026" },
  { id: 16, title: "Steel stock", category: "Equipment", src: "/gallery/steel-stock.jpeg", uploaded: "October 3, 2026" },
  { id: 15, title: "Site buildings", category: "Infrastructure", src: "/gallery/site-buildings.jpeg", uploaded: "September 29, 2026" },
];

export const messages: Message[] = [
  {
    id: 1,
    name: "Daniel Ofori",
    email: "d.ofori@goldfieldslogistics.com",
    company: "Goldfields Logistics",
    subject: "Partnership enquiry — heavy haulage",
    excerpt:
      "Good afternoon, we operate a fleet of articulated trucks in the Ashanti region and would like to discuss...",
    date: "November 2, 2026",
    unread: true,
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    email: "s.mitchell@resourcecapital.co.uk",
    company: "Resource Capital Partners",
    subject: "Investor briefing request",
    excerpt:
      "Hello, I am researching West African gold producers and would appreciate an introduction to your IR team...",
    date: "November 1, 2026",
    unread: true,
  },
  {
    id: 3,
    name: "Yaw Antwi",
    email: "yaw.antwi@kwabenatech.edu.gh",
    company: "Kwabena Technical Institute",
    subject: "Graduate placement programme",
    excerpt:
      "We would like to explore a formal placement arrangement for our final-year mining engineering students...",
    date: "October 30, 2026",
    unread: true,
  },
  {
    id: 4,
    name: "Linda Asare",
    email: "l.asare@communitytrust.org",
    company: "Ashanti Community Trust",
    subject: "Community development fund",
    excerpt:
      "Following our recent meeting, please find attached the proposed framework for the community development fund...",
    date: "October 26, 2026",
    unread: false,
  },
  {
    id: 5,
    name: "Michael Chen",
    email: "m.chen@minetechsystems.com",
    company: "MineTech Systems",
    subject: "Fleet telematics proposal",
    excerpt:
      "We supply real-time telematics for mining fleets and would welcome the opportunity to present a short demo...",
    date: "October 22, 2026",
    unread: false,
  },
  {
    id: 6,
    name: "Akosua Frimpong",
    email: "akosua.f@gmail.com",
    company: "—",
    subject: "Career enquiry — geologist",
    excerpt:
      "I am a Ghanaian geologist with six years of exploration experience and would like to know about current openings...",
    date: "October 17, 2026",
    unread: false,
  },
];

export const users: AdminUser[] = [
  { id: 1, name: "Kwame Mensah", email: "kwame.mensah@fgmresources.com", role: "Administrator", posts: 18, joined: "January 12, 2024" },
  { id: 2, name: "Ama Boateng", email: "ama.boateng@fgmresources.com", role: "Editor", posts: 11, joined: "March 4, 2024" },
  { id: 3, name: "Efua Owusu", email: "efua.owusu@fgmresources.com", role: "Author", posts: 9, joined: "June 19, 2024" },
  { id: 4, name: "Dr. Nana Adjei", email: "nana.adjei@fgmresources.com", role: "Author", posts: 6, joined: "September 2, 2025" },
];

export const activity = [
  { text: "Post published: FGM Commissions New Exploration Rig", date: "November 2, 2026 at 09:14" },
  { text: "Media uploaded: open-pit-mine.jpg", date: "November 2, 2026 at 08:51" },
  { text: "Message received from Daniel Ofori", date: "November 2, 2026 at 08:20" },
  { text: "Post published: Responsible Water Management at the Tailings Facility", date: "October 28, 2026 at 14:40" },
  { text: "Page updated: Sustainability", date: "October 27, 2026 at 16:02" },
  { text: "New user registered: Dr. Nana Adjei", date: "October 25, 2026 at 10:18" },
];

export const categories = [
  { name: "Operations", count: 9 },
  { name: "Exploration", count: 6 },
  { name: "Sustainability", count: 5 },
  { name: "Community", count: 4 },
  { name: "Environment", count: 3 },
  { name: "Corporate", count: 2 },
];

export function formatDate(value: string) {
  const normalized = value.includes("T") ? value : value.replace(" ", "T");
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
