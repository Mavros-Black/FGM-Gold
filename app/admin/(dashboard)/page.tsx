import Link from "next/link";
import {
  FileText,
  Image as ImageIcon,
  Images,
  Mail,
  Pin,
  Users,
} from "lucide-react";
import { quickDraft } from "@/app/admin/actions";
import { DashboardWidget } from "@/components/admin/dashboard-widget";
import { WelcomePanel } from "@/components/admin/welcome-panel";
import {
  getGalleryItems,
  getMedia,
  getMessages,
  getPages,
  getPosts,
  getUsers,
} from "@/lib/store";

export const metadata = {
  title: "Dashboard — FGM Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const [posts, pages, media, gallery, messages, users] = await Promise.all([
    getPosts(),
    getPages(),
    getMedia(),
    getGalleryItems(),
    getMessages(),
    getUsers(),
  ]);

  const published = posts.filter((post) => post.status === "Published").length;
  const drafts = posts.filter((post) => post.status !== "Published").length;
  const unread = messages.filter((message) => message.unread).length;

  return (
    <>
      <div className="wp-page-title">
        <h1 className="wp-heading-inline">Dashboard</h1>
      </div>

      <WelcomePanel unread={unread} drafts={drafts} />

      <div className="dashboard-columns">
        <div className="dashboard-column">
          <DashboardWidget title="At a Glance">
            <div className="at-glance-grid">
              <div className="at-glance-item">
                <Pin size={18} />
                <div>
                  <Link href="/admin/posts">{published}</Link>
                  <span>Posts</span>
                </div>
              </div>
              <div className="at-glance-item">
                <FileText size={18} />
                <div>
                  <Link href="/admin/pages">{pages.length}</Link>
                  <span>Pages</span>
                </div>
              </div>
              <div className="at-glance-item">
                <ImageIcon size={18} />
                <div>
                  <Link href="/admin/media">{media.length}</Link>
                  <span>Media</span>
                </div>
              </div>
              <div className="at-glance-item">
                <Images size={18} />
                <div>
                  <Link href="/admin/gallery">{gallery.length}</Link>
                  <span>Gallery</span>
                </div>
              </div>
              <div className="at-glance-item">
                <Mail size={18} />
                <div>
                  <Link href="/admin/messages">{unread}</Link>
                  <span>Unread</span>
                </div>
              </div>
              <div className="at-glance-item">
                <Users size={18} />
                <div>
                  <Link href="/admin/users">{users.length}</Link>
                  <span>Users</span>
                </div>
              </div>
            </div>
          </DashboardWidget>

          <DashboardWidget title="Quick Draft">
            <form className="quick-draft" action={quickDraft}>
              <label className="screen-reader-text" htmlFor="draft-title">
                Title
              </label>
              <input id="draft-title" name="title" type="text" placeholder="Title" required />
              <label className="screen-reader-text" htmlFor="draft-content">
                Content
              </label>
              <textarea id="draft-content" name="content" placeholder="What is on your mind?" />
              <div className="quick-draft-actions">
                <span>Saved as a draft post.</span>
                <button type="submit" className="wp-button wp-button-secondary">
                  Save Draft
                </button>
              </div>
            </form>
          </DashboardWidget>

          <DashboardWidget title="Latest Posts">
            <ul className="news-list">
              {posts.slice(0, 4).map((post) => (
                <li key={post.id}>
                  <Link href={`/admin/posts/${post.id}`}>{post.title}</Link>
                  <small>
                    {post.categories.join(", ")} · {post.date}
                  </small>
                </li>
              ))}
            </ul>
          </DashboardWidget>
        </div>

        <div className="dashboard-column">
          <DashboardWidget title="Activity">
            <ul className="activity-list">
              {posts.slice(0, 6).map((post) => (
                <li key={post.id}>
                  {post.status === "Published" ? "Post published" : "Draft updated"}:{" "}
                  <Link href={`/admin/posts/${post.id}`}>{post.title}</Link>
                  <span className="activity-date">
                    {post.author} · {post.date}
                  </span>
                </li>
              ))}
            </ul>
          </DashboardWidget>

          <DashboardWidget title="Site Health Status">
            <ul className="health-list">
              <li>
                <span>HTTPS connection</span>
                <span className="health-value">Good</span>
              </li>
              <li>
                <span>Contact form delivery</span>
                <span className="health-value">Good</span>
              </li>
              <li>
                <span>Image optimisation</span>
                <span className="health-value">Good</span>
              </li>
              <li>
                <span>Content storage</span>
                <span className="health-value">Good</span>
              </li>
            </ul>
          </DashboardWidget>

          <DashboardWidget title="Recent Messages">
            <ul className="news-list">
              {messages.slice(0, 4).map((message) => (
                <li key={message.id}>
                  <Link href="/admin/messages">
                    {message.unread ? <span className="unread-dot" /> : null}
                    {message.subject}
                  </Link>
                  <small>
                    {message.name} · {message.date}
                  </small>
                </li>
              ))}
            </ul>
          </DashboardWidget>
        </div>
      </div>
    </>
  );
}
