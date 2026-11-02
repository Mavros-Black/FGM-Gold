import { SectionHeading } from "@/components/section-heading";
import { GalleryGrid, type GalleryImage } from "@/components/gallery-grid";

const curated: GalleryImage[] = [
  { src: "/gallery/drill-rig.jpeg", alt: "Exploration drill rig set up at a site in the forest", caption: "Exploration drilling", tag: "Exploration" },
  { src: "/gallery/wheel-loader.jpeg", alt: "Wheel loader moving material on site", caption: "Material handling", tag: "Operations" },
  { src: "/gallery/processing-silos.jpeg", alt: "Processing plant silos and steel structures", caption: "Processing plant", tag: "Processing" },
  { src: "/gallery/processing-plant.jpeg", alt: "Processing plant structures at dusk", caption: "Plant infrastructure", tag: "Processing" },
  { src: "/gallery/site-workshop.jpeg", alt: "Covered workshop area at the project site", caption: "Site workshop", tag: "Infrastructure" },
  { src: "/gallery/admin-block.jpeg", alt: "Administrative building at the project site", caption: "Site administration", tag: "Infrastructure" },
  { src: "/gallery/site-buildings.jpeg", alt: "Yellow site buildings under a cloudy sky", caption: "Site facilities", tag: "Infrastructure" },
  { src: "/gallery/site-fleet.jpeg", alt: "Pickup trucks parked at the site", caption: "Site fleet", tag: "Logistics" },
  { src: "/gallery/logistics.jpeg", alt: "Pickup truck and trailer under a canopy", caption: "Field logistics", tag: "Logistics" },
  { src: "/gallery/haulage.jpeg", alt: "Haulage trailer parked near a site building", caption: "Haulage support", tag: "Logistics" },
  { src: "/gallery/steel-stock.jpeg", alt: "Coiled steel stock and equipment on site", caption: "Materials & equipment", tag: "Operations" },
  { src: "/gallery/access-road.jpeg", alt: "Gravel access road leading through the forest", caption: "Access road", tag: "Infrastructure" },
];

const fieldImages: GalleryImage[] = Array.from({ length: 61 }, (_, i) => {
  const file = `fgm-${String(i + 1).padStart(2, "0")}.jpeg`;
  return {
    src: `/gallery/${file}`,
    alt: `FGM Resources field photograph ${i + 1}`,
    caption: "Field operations",
    tag: "Field gallery",
  };
});

const images: GalleryImage[] = [...curated, ...fieldImages];

export default function Gallery() {
  return <>
    <section className="page-hero gallery-hero"><div className="container"><span className="eyebrow gold">FIELD NOTES</span><h1>Inside our <em>operations.</em></h1><p>People, equipment and sites that move our projects forward.</p><div className="breadcrumbs">Home <span>/</span> Gallery</div></div></section>
    <section className="section container">
      <SectionHeading eyebrow="OUR GALLERY" title="A closer look at the work." text="A visual record of exploration, processing, logistics and site operations."/>
      <GalleryGrid images={images}/>
    </section>
  </>;
}
