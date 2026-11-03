import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { addGallery, removeGallery } from "@/app/admin/actions";
import { getGalleryItems, getMedia } from "@/lib/store";

export const metadata = {
  title: "Gallery — FGM Admin",
};

export const dynamic = "force-dynamic";

export default async function GalleryAdminPage() {
  const [items, media] = await Promise.all([getGalleryItems(), getMedia()]);

  return (
    <>
      <div className="wp-page-title">
        <h1 className="wp-heading-inline">Gallery</h1>
      </div>

      <section className="editor-card">
        <h2>Add Gallery Item</h2>
        <form action={addGallery} className="gallery-add-form">
          <label>
            Title
            <input name="title" type="text" placeholder="Image title" required />
          </label>
          <label>
            Category
            <select name="category" defaultValue="Operations">
              <option>Exploration</option>
              <option>Operations</option>
              <option>Logistics</option>
              <option>Infrastructure</option>
              <option>Equipment</option>
            </select>
          </label>
          <label>
            Image
            <select name="src" defaultValue={media[0]?.src ?? ""}>
              {media.map((item) => (
                <option key={item.id} value={item.src}>
                  {item.file}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="wp-button">
            <Plus size={14} /> Add to Gallery
          </button>
        </form>
      </section>

      <div className="tablenav">
        <select aria-label="Bulk actions" defaultValue="">
          <option value="">Bulk actions</option>
          <option value="edit">Edit</option>
          <option value="trash">Remove from gallery</option>
        </select>
        <button type="button" className="wp-button wp-button-secondary">
          Apply
        </button>
        <select aria-label="Filter by category" defaultValue="">
          <option value="">All categories</option>
          <option>Exploration</option>
          <option>Operations</option>
          <option>Logistics</option>
          <option>Infrastructure</option>
          <option>Equipment</option>
        </select>
        <div className="tablenav-right">
          <span className="displaying-num">{items.length} items</span>
          <label className="screen-reader-text" htmlFor="gallery-search">
            Search gallery
          </label>
          <input id="gallery-search" type="search" placeholder="Search gallery" />
          <button type="button" className="wp-button wp-button-secondary" aria-label="Search">
            <Search size={14} />
          </button>
        </div>
      </div>

      <table className="wp-list-table">
        <thead>
          <tr>
            <td className="check-column">
              <input type="checkbox" aria-label="Select all gallery items" />
            </td>
            <th>Image</th>
            <th>Category</th>
            <th className="column-date">Uploaded</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="check-column">
                <input type="checkbox" aria-label={`Select ${item.title}`} />
              </td>
              <td>
                <div className="gallery-cell">
                  <span className="gallery-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.src} alt={item.title} loading="lazy" />
                  </span>
                  <span>
                    <strong style={{ fontSize: 14 }}>{item.title}</strong>
                    <div className="row-actions">
                      <Link href="/admin/media">Edit</Link> |{" "}
                      <form action={removeGallery}>
                        <input type="hidden" name="id" value={item.id} />
                        <button type="submit" className="wp-button-link is-delete">
                          Remove
                        </button>
                      </form>{" "}
                      | <Link href="/gallery">View</Link>
                    </div>
                  </span>
                </div>
              </td>
              <td>{item.category}</td>
              <td className="column-date">{item.uploaded}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <span className="displaying-num">{items.length} items</span>
        <span className="is-current">1</span>
      </div>
    </>
  );
}
