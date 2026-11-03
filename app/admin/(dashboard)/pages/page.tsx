import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { trashPage } from "@/app/admin/actions";
import { formatDate } from "@/lib/admin-data";
import { getPages } from "@/lib/store";

export const metadata = {
  title: "Pages — FGM Admin",
};

export const dynamic = "force-dynamic";

export default async function PagesPage() {
  const pages = await getPages();

  return (
    <>
      <div className="wp-page-title">
        <h1 className="wp-heading-inline">Pages</h1>
        <Link href="/admin/pages/new" className="page-title-action">
          <Plus size={14} /> Add New
        </Link>
      </div>

      <div className="tablenav">
        <select aria-label="Bulk actions" defaultValue="">
          <option value="">Bulk actions</option>
          <option value="edit">Edit</option>
          <option value="trash">Move to Trash</option>
        </select>
        <button type="button" className="wp-button wp-button-secondary">
          Apply
        </button>
        <div className="tablenav-right">
          <span className="displaying-num">{pages.length} items</span>
          <label className="screen-reader-text" htmlFor="page-search">
            Search pages
          </label>
          <input id="page-search" type="search" placeholder="Search pages" />
          <button type="button" className="wp-button wp-button-secondary" aria-label="Search">
            <Search size={14} />
          </button>
        </div>
      </div>

      <table className="wp-list-table">
        <thead>
          <tr>
            <td className="check-column">
              <input type="checkbox" aria-label="Select all pages" />
            </td>
            <th className="column-title">Title</th>
            <th className="column-author">Author</th>
            <th>Template</th>
            <th className="column-date">Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {pages.map((page) => (
            <tr key={page.id}>
              <td className="check-column">
                <input type="checkbox" aria-label={`Select ${page.title}`} />
              </td>
              <td className="column-title">
                <Link href={`/admin/pages/${page.id}`}>
                  <strong>{page.title}</strong>
                </Link>
                <div className="row-actions">
                  <Link href={`/admin/pages/${page.id}`}>Edit</Link> |{" "}
                  <Link href={`/admin/pages/${page.id}`}>Quick Edit</Link> |{" "}
                  <form action={trashPage}>
                    <input type="hidden" name="id" value={page.id} />
                    <button type="submit" className="wp-button-link is-delete">
                      Trash
                    </button>
                  </form>{" "}
                  | <Link href="/">View</Link>
                </div>
              </td>
              <td className="column-author">{page.author}</td>
              <td>{page.template}</td>
              <td className="column-date">{formatDate(page.date)}</td>
              <td>
                <span
                  className={
                    page.status === "Published"
                      ? "status-text is-published"
                      : "status-text is-draft"
                  }
                >
                  {page.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <span className="displaying-num">{pages.length} items</span>
        <span className="is-current">1</span>
      </div>
    </>
  );
}
