import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { trashPost } from "@/app/admin/actions";
import { categories, formatDate } from "@/lib/admin-data";
import { getPosts } from "@/lib/store";

export const metadata = {
  title: "Posts — FGM Admin",
};

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <>
      <div className="wp-page-title">
        <h1 className="wp-heading-inline">Posts</h1>
        <Link href="/admin/posts/new" className="page-title-action">
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
        <select aria-label="Filter by category" defaultValue="">
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="tablenav-right">
          <span className="displaying-num">{posts.length} items</span>
          <label className="screen-reader-text" htmlFor="post-search">
            Search posts
          </label>
          <input id="post-search" type="search" placeholder="Search posts" />
          <button type="button" className="wp-button wp-button-secondary" aria-label="Search">
            <Search size={14} />
          </button>
        </div>
      </div>

      <table className="wp-list-table">
        <thead>
          <tr>
            <td className="check-column">
              <input type="checkbox" aria-label="Select all posts" />
            </td>
            <th className="column-title">Title</th>
            <th className="column-author">Author</th>
            <th>Categories</th>
            <th className="column-comments">Comments</th>
            <th className="column-date">Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="check-column">
                <input type="checkbox" aria-label={`Select ${post.title}`} />
              </td>
              <td className="column-title">
                <Link href={`/admin/posts/${post.id}`}>
                  <strong>{post.title}</strong>
                </Link>
                <div className="row-actions">
                  <Link href={`/admin/posts/${post.id}`}>Edit</Link> |{" "}
                  <Link href={`/admin/posts/${post.id}`}>Quick Edit</Link> |{" "}
                  <form action={trashPost}>
                    <input type="hidden" name="id" value={post.id} />
                    <button type="submit" className="wp-button-link is-delete">
                      Trash
                    </button>
                  </form>{" "}
                  | <Link href="/">View</Link>
                </div>
              </td>
              <td className="column-author">{post.author}</td>
              <td>{post.categories.join(", ")}</td>
              <td className="column-comments">{post.comments}</td>
              <td className="column-date">{formatDate(post.date)}</td>
              <td>
                <span
                  className={
                    post.status === "Published"
                      ? "status-text is-published"
                      : post.status === "Draft"
                        ? "status-text is-draft"
                        : "status-text is-pending"
                  }
                >
                  {post.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <span className="displaying-num">{posts.length} items</span>
        <span className="is-current">1</span>
      </div>
    </>
  );
}
