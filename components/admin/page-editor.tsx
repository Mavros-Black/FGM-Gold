import Link from "next/link";
import {
  AlignLeft,
  Bold,
  Image as ImageIcon,
  Italic,
  Link2,
  List,
  Plus,
  Quote,
  type LucideIcon,
} from "lucide-react";
import { savePage, trashPage } from "@/app/admin/actions";
import { type AdminPage, formatDate } from "@/lib/admin-data";

function PageToolbarButton({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <button type="button" aria-label={label}>
      <Icon size={15} />
    </button>
  );
}

export function PageEditor({ page }: { page?: AdminPage }) {
  const editing = Boolean(page);

  return (
    <>
      <div className="wp-page-title">
        <h1 className="wp-heading-inline">{editing ? "Edit Page" : "Add New Page"}</h1>
        {editing ? (
          <Link href="/admin/pages/new" className="page-title-action">
            <Plus size={14} /> Add New
          </Link>
        ) : null}
        <Link href="/admin/pages" className="wp-button-link">
          ← Back to Pages
        </Link>
      </div>

      <form action={savePage}>
        {page ? <input type="hidden" name="id" value={page.id} /> : null}

        <div className="editor-title">
          <label className="screen-reader-text" htmlFor="page-title">
            Page title
          </label>
          <input
            id="page-title"
            name="title"
            type="text"
            defaultValue={page?.title ?? ""}
            placeholder="Add title"
          />
        </div>

        <div className="editor-layout">
          <div>
            <div className="editor-card">
              <div className="editor-toolbar" role="toolbar" aria-label="Formatting">
                <PageToolbarButton icon={Bold} label="Bold" />
                <PageToolbarButton icon={Italic} label="Italic" />
                <span className="toolbar-sep" />
                <PageToolbarButton icon={List} label="Bulleted list" />
                <PageToolbarButton icon={Quote} label="Blockquote" />
                <span className="toolbar-sep" />
                <PageToolbarButton icon={Link2} label="Insert link" />
                <PageToolbarButton icon={ImageIcon} label="Insert media" />
                <PageToolbarButton icon={AlignLeft} label="Paragraph" />
              </div>
              <textarea
                className="wp-editor"
                name="content"
                aria-label="Page content"
                defaultValue={
                  page?.content ??
                  `Update the ${page?.title ?? "new page"} content here.`
                }
              />
            </div>
          </div>

          <div>
            <section className="editor-card">
              <h2>Publish</h2>
              <div className="meta-row">
                <span>Status</span>
                <select name="status" defaultValue={page?.status ?? "Draft"} aria-label="Status">
                  <option>Draft</option>
                  <option>Pending</option>
                  <option>Published</option>
                </select>
              </div>
              <div className="meta-row">
                <span>Visibility</span>
                <strong>Public</strong>
              </div>
              <div className="meta-row">
                <span>Publish</span>
                <strong>{page ? formatDate(page.date) : "Immediately"}</strong>
              </div>
              <div className="meta-row">
                <span>Author</span>
                <select
                  name="author"
                  defaultValue={page?.author ?? "Kwame Mensah"}
                  aria-label="Author"
                >
                  <option>Kwame Mensah</option>
                  <option>Ama Boateng</option>
                  <option>Efua Owusu</option>
                  <option>Dr. Nana Adjei</option>
                </select>
              </div>
              <div className="publish-actions">
                {editing ? (
                  <button type="submit" formAction={trashPage} className="wp-button-link is-delete">
                    Move to Trash
                  </button>
                ) : (
                  <span />
                )}
                <button type="submit" className="wp-button">
                  {editing ? "Update" : "Publish"}
                </button>
              </div>
            </section>

            <section className="editor-card">
              <h2>Page Attributes</h2>
              <div className="editor-card-body">
                <label
                  htmlFor="page-template"
                  style={{ display: "block", fontSize: 12, marginBottom: 6, color: "#646970" }}
                >
                  Template
                </label>
                <select
                  id="page-template"
                  name="template"
                  defaultValue={page?.template ?? "Default"}
                  style={{
                    width: "100%",
                    padding: "5px 8px",
                    border: "1px solid #8c8f94",
                    borderRadius: 3,
                    font: "inherit",
                    fontSize: 13,
                  }}
                >
                  <option>Default</option>
                  <option>Landing</option>
                  <option>Portfolio</option>
                  <option>Gallery</option>
                  <option>Contact</option>
                </select>
              </div>
            </section>

            <section className="editor-card">
              <h2>Permalink</h2>
              <div className="editor-card-body">
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    color: "#646970",
                    wordBreak: "break-all",
                  }}
                >
                  fgmresources.com/
                  <span style={{ color: "#1d2327" }}>{page?.slug ?? "new-page"}</span>
                </p>
              </div>
            </section>
          </div>
        </div>
      </form>
    </>
  );
}
