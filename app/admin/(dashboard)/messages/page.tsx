import { Search } from "lucide-react";
import { markMessageRead, trashMessage } from "@/app/admin/actions";
import { getMessages } from "@/lib/store";

export const metadata = {
  title: "Messages — FGM Admin",
};

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const messages = await getMessages();
  const unread = messages.filter((message) => message.unread).length;

  return (
    <>
      <div className="wp-page-title">
        <h1 className="wp-heading-inline">Messages</h1>
        <span className="wp-title-count">
          ({messages.length}){unread > 0 ? ` · ${unread} unread` : ""}
        </span>
      </div>

      <div className="wp-notice is-success">
        <p>
          Contact form submissions from the public website arrive here. New enquiries
          appear as unread.
        </p>
      </div>

      <div className="tablenav">
        <select aria-label="Bulk actions" defaultValue="">
          <option value="">Bulk actions</option>
          <option value="read">Mark as read</option>
          <option value="unread">Mark as unread</option>
          <option value="trash">Move to Trash</option>
        </select>
        <button type="button" className="wp-button wp-button-secondary">
          Apply
        </button>
        <div className="tablenav-right">
          <span className="displaying-num">{messages.length} items</span>
          <label className="screen-reader-text" htmlFor="message-search">
            Search messages
          </label>
          <input id="message-search" type="search" placeholder="Search messages" />
          <button type="button" className="wp-button wp-button-secondary" aria-label="Search">
            <Search size={14} />
          </button>
        </div>
      </div>

      <table className="wp-list-table">
        <thead>
          <tr>
            <td className="check-column">
              <input type="checkbox" aria-label="Select all messages" />
            </td>
            <th>From</th>
            <th>Subject</th>
            <th className="column-date">Date</th>
          </tr>
        </thead>
        <tbody>
          {messages.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ padding: 24, textAlign: "center", color: "#646970" }}>
                No messages yet. Submissions from the contact form will appear here.
              </td>
            </tr>
          ) : null}
          {messages.map((message) => (
            <tr key={message.id}>
              <td className="check-column">
                <input type="checkbox" aria-label={`Select message from ${message.name}`} />
              </td>
              <td>
                <strong style={{ fontSize: 13 }}>{message.name}</strong>
                <div className="media-meta">{message.email}</div>
                <div className="media-meta">{message.company}</div>
              </td>
              <td>
                <span className="message-subject">
                  {message.unread ? <span className="unread-dot" /> : null}
                  {message.subject}
                </span>
                <div className="message-preview">{message.excerpt}</div>
                <div className="row-actions">
                  <form action={markMessageRead}>
                    <input type="hidden" name="id" value={message.id} />
                    <input type="hidden" name="unread" value={message.unread ? "0" : "1"} />
                    <button type="submit" className="wp-button-link">
                      Mark as {message.unread ? "read" : "unread"}
                    </button>
                  </form>{" "}
                  |{" "}
                  <a href={`mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.subject}`)}`}>
                    Reply
                  </a>{" "}
                  |{" "}
                  <form action={trashMessage}>
                    <input type="hidden" name="id" value={message.id} />
                    <button type="submit" className="wp-button-link is-delete">
                      Trash
                    </button>
                  </form>
                </div>
              </td>
              <td className="column-date">{message.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <span className="displaying-num">{messages.length} items</span>
        <span className="is-current">1</span>
      </div>
    </>
  );
}
