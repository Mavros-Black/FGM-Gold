import { Plus, Search } from "lucide-react";
import { getMedia } from "@/lib/store";

export const metadata = {
  title: "Media Library — FGM Admin",
};

export const dynamic = "force-dynamic";

export default async function MediaPage() {
  const media = await getMedia();

  return (
    <>
      <div className="wp-page-title">
        <h1 className="wp-heading-inline">Media Library</h1>
        <button type="button" className="page-title-action">
          <Plus size={14} /> Add New
        </button>
      </div>

      <div className="media-toolbar">
        <select aria-label="Bulk actions" defaultValue="">
          <option value="">Bulk actions</option>
          <option value="delete">Delete permanently</option>
        </select>
        <button type="button" className="wp-button wp-button-secondary">
          Apply
        </button>
        <select aria-label="Filter by type" defaultValue="">
          <option value="">All media items</option>
          <option value="images">Images</option>
          <option value="documents">Documents</option>
        </select>
        <span style={{ marginLeft: "auto" }}>{media.length} items</span>
        <label className="screen-reader-text" htmlFor="media-search">
          Search media
        </label>
        <input id="media-search" type="search" placeholder="Search media" />
        <button type="button" className="wp-button wp-button-secondary" aria-label="Search">
          <Search size={14} />
        </button>
      </div>

      <div className="media-grid">
        {media.map((item) => (
          <figure key={item.id} className="media-item" style={{ margin: 0 }}>
            <div className="media-thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} alt={item.title} loading="lazy" />
            </div>
            <figcaption>
              <div className="media-name" title={item.file}>
                {item.file}
              </div>
              <div className="media-meta">
                {item.dimensions} · {item.size}
              </div>
              <div className="media-meta">{item.uploaded}</div>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="pagination">
        <span className="displaying-num">{media.length} items</span>
        <span className="is-current">1</span>
      </div>
    </>
  );
}
