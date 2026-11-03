import { Plus, Search } from "lucide-react";
import { initials } from "@/lib/admin-data";
import { getUsers } from "@/lib/store";

export const metadata = {
  title: "Users — FGM Admin",
};

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <>
      <div className="wp-page-title">
        <h1 className="wp-heading-inline">Users</h1>
        <button type="button" className="page-title-action">
          <Plus size={14} /> Add New User
        </button>
      </div>

      <div className="tablenav">
        <select aria-label="Bulk actions" defaultValue="">
          <option value="">Bulk actions</option>
          <option value="edit">Edit</option>
          <option value="remove">Remove</option>
        </select>
        <button type="button" className="wp-button wp-button-secondary">
          Apply
        </button>
        <select aria-label="Filter by role" defaultValue="">
          <option value="">All roles</option>
          <option>Administrator</option>
          <option>Editor</option>
          <option>Author</option>
          <option>Subscriber</option>
        </select>
        <div className="tablenav-right">
          <span className="displaying-num">{users.length} items</span>
          <label className="screen-reader-text" htmlFor="user-search">
            Search users
          </label>
          <input id="user-search" type="search" placeholder="Search users" />
          <button type="button" className="wp-button wp-button-secondary" aria-label="Search">
            <Search size={14} />
          </button>
        </div>
      </div>

      <table className="wp-list-table">
        <thead>
          <tr>
            <td className="check-column">
              <input type="checkbox" aria-label="Select all users" />
            </td>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Posts</th>
            <th className="column-date">Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="check-column">
                <input type="checkbox" aria-label={`Select ${user.name}`} />
              </td>
              <td>
                <div className="user-cell">
                  <span className="user-avatar">{initials(user.name)}</span>
                  <span>
                    <strong style={{ fontSize: 14 }}>{user.name}</strong>
                    <div className="row-actions">
                      <a href="/admin/users">Edit</a> | <a href="/admin/users">View</a>
                    </div>
                  </span>
                </div>
              </td>
              <td>{user.email}</td>
              <td>
                <span className="role-badge">{user.role}</span>
              </td>
              <td>{user.posts}</td>
              <td className="column-date">{user.joined}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <span className="displaying-num">{users.length} items</span>
        <span className="is-current">1</span>
      </div>
    </>
  );
}
