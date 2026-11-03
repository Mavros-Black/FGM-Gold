import Link from "next/link";
import {
  AlignLeft,
  Bold,
  Image as ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Plus,
  Quote,
  Strikethrough,
  Underline,
} from "lucide-react";
import { savePost, trashPost } from "@/app/admin/actions";
import {
  categories as allCategories,
  formatDate,
  type AdminPost,
} from "@/lib/admin-data";

function Toolbar() {
  return (
    <div className="editor-toolbar" role="toolbar" aria-label="Formatting">
      <button type="button" aria-label="Bold">
        <Bold size={15} />
      </button>
      <button type="button" aria-label="Italic">
        <Italic size={15} />
      </button>
      <button type="button" aria-label="Underline">
        <Underline size={15} />
      </button>
      <button type="button" aria-label="Strikethrough">
        <Strikethrough size={15} />
      </button>
      <span className="toolbar-sep" />
      <button type="button" aria-label="Bulleted list">
        <List size={15} />
      </button>
      <button type="button" aria-label="Numbered list">
        <ListOrdered size={15} />
      </button>
      <button type="button" aria-label="Blockquote">
        <Quote size={15} />
      </button>
      <span className="toolbar-sep" />
      <button type="button" aria-label="Insert link">
        <Link2 size={15} />
      </button>
      <button type="button" aria-label="Insert media">
        <ImageIcon size={15} />
      </button>
      <button type="button" aria-label="Paragraph">
        <AlignLeft size={15} />
      </button>
    </div>
  );
}

export function PostEditor({ post }: { post?: AdminPost }) {
  const editing = Boolean(post);
  const activeCategories = post?.categories ?? [];

  return (
    <>
      <div className="wp-page-title">
        <h1 className="wp-heading-inline">{editing ? "Edit Post" : "Add New Post"}</h1>
        {editing ? (
          <Link href="/admin/posts/new" className="page-title-action">
            <Plus size={14} /> Add New
          </Link>
        ) : null}
        <Link href="/admin/posts" className="wp-button-link">
          ← Back to Posts
        </Link>
      </div>

      <form action={savePost}>
        {post ? <input type="hidden" name="id" value={post.id} /> : null}

        <div className="editor-title">
          <label className="screen-reader-text" htmlFor="post-title">
            Post title
          </label>
          <input
            id="post-title"
            name="title"
            type="text"
            defaultValue={post?.title ?? ""}
            placeholder="Add title"
          />
        </div>

        <div className="editor-layout">
          <div>
            <div className="editor-card">
              <Toolbar />
              <textarea
                className="wp-editor"
                name="content"
                aria-label="Post content"
                defaultValue={
                  post?.content ??
                  "Start writing your update. Use the toolbar above to format the content before publishing."
                }
              />
            </div>

            <section className="editor-card">
              <h2>Excerpt</h2>
              <div className="editor-card-body">
                <textarea
                  className="wp-editor"
                  name="excerpt"
                  style={{ minHeight: 90 }}
                  aria-label="Excerpt"
                  defaultValue={post?.excerpt ?? ""}
                  placeholder="Write a short summary for listings and search results."
                />
              </div>
            </section>

            <section className="editor-card">
              <h2>Categories</h2>
              <div className="editor-card-body">
                <div className="at-glance-grid">
                  {allCategories.map((category) => (
                    <label key={category.name} style={{ display: "flex", gap: 8 }}>
                      <input
                        type="checkbox"
                        name="categories"
                        value={category.name}
                        defaultChecked={activeCategories.includes(category.name)}
                      />
                      <span>
                        {category.name} ({category.count})
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </section>

            <section className="editor-card">
              <h2>Tags</h2>
              <div className="editor-card-body">
                <input
                  type="text"
                  aria-label="Tags"
                  placeholder="Add tags, separated by commas"
                  defaultValue="gold, mining, ghana"
                  style={{
                    width: "100%",
                    padding: "7px 9px",
                    border: "1px solid #8c8f94",
                    borderRadius: 3,
                    font: "inherit",
                    fontSize: 13,
                  }}
                />
              </div>
            </section>
          </div>

          <div>
            <section className="editor-card">
              <h2>Publish</h2>
              <div className="meta-row">
                <span>Status</span>
                <select name="status" defaultValue={post?.status ?? "Draft"} aria-label="Status">
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
                <strong>{post ? formatDate(post.date) : "Immediately"}</strong>
              </div>
              <div className="meta-row">
                <span>Author</span>
                <select
                  name="author"
                  defaultValue={post?.author ?? "Kwame Mensah"}
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
                  <button type="submit" formAction={trashPost} className="wp-button-link is-delete">
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
              <h2>Featured Image</h2>
              <div className="editor-card-body">
                <div className="media-thumb" style={{ aspectRatio: "16 / 9" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post?.image ?? "/images/open-pit-mine.jpg"} alt="Featured" />
                </div>
                <p style={{ margin: "10px 0 0", fontSize: 12, color: "#646970" }}>
                  Set featured image
                </p>
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
                  <span style={{ color: "#1d2327" }}>{post?.slug ?? "new-post"}</span>
                </p>
              </div>
            </section>
          </div>
        </div>
      </form>
    </>
  );
}
