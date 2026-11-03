export const metadata = {
  title: "Settings — FGM Admin",
};

const tabs = ["General", "Writing", "Reading", "Discussion", "Media", "Permalinks"];

export default function SettingsPage() {
  return (
    <>
      <div className="wp-page-title">
        <h1 className="wp-heading-inline">General Settings</h1>
      </div>

      <div className="settings-tabs">
        {tabs.map((tab) => (
          <span
            key={tab}
            className={tab === "General" ? "settings-tab is-active" : "settings-tab"}
          >
            {tab}
          </span>
        ))}
      </div>

      <div className="settings-panel">
        <h2>Site Identity</h2>
        <table className="form-table">
          <tbody>
            <tr>
              <th scope="row">
                <label htmlFor="site-title">Site Title</label>
              </th>
              <td>
                <input id="site-title" type="text" defaultValue="FGM Resources Ghana Limited" />
              </td>
            </tr>
            <tr>
              <th scope="row">
                <label htmlFor="tagline">Tagline</label>
              </th>
              <td>
                <input
                  id="tagline"
                  type="text"
                  defaultValue="Building Value. Unearthing Potential."
                />
                <p className="description">
                  In a few words, explain what this site is about.
                </p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <label htmlFor="site-url">Site Address (URL)</label>
              </th>
              <td>
                <input id="site-url" type="url" defaultValue="https://fgmresources.com" />
                <p className="description">
                  The public address of the website visitors see.
                </p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <label htmlFor="admin-email">Administration Email Address</label>
              </th>
              <td>
                <input
                  id="admin-email"
                  type="email"
                  defaultValue="admin@fgmresources.com"
                />
                <p className="description">
                  Contact form notifications and system alerts are sent here.
                </p>
              </td>
            </tr>
            <tr>
              <th scope="row">Membership</th>
              <td>
                <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input type="checkbox" />
                  <span>Anyone can register</span>
                </label>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <label htmlFor="default-role">New User Default Role</label>
              </th>
              <td>
                <select id="default-role" defaultValue="Subscriber">
                  <option>Subscriber</option>
                  <option>Author</option>
                  <option>Editor</option>
                  <option>Administrator</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <h2 style={{ marginTop: 28 }}>Localisation</h2>
        <table className="form-table">
          <tbody>
            <tr>
              <th scope="row">
                <label htmlFor="language">Site Language</label>
              </th>
              <td>
                <select id="language" defaultValue="English (UK)">
                  <option>English (UK)</option>
                  <option>English (US)</option>
                  <option>Twi</option>
                  <option>French</option>
                </select>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <label htmlFor="timezone">Timezone</label>
              </th>
              <td>
                <select id="timezone" defaultValue="Accra">
                  <option>Accra</option>
                  <option>London</option>
                  <option>Johannesburg</option>
                  <option>UTC</option>
                </select>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <label htmlFor="date-format">Date Format</label>
              </th>
              <td>
                <input id="date-format" type="text" defaultValue="F j, Y" />
                <p className="description">Preview: November 3, 2026</p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <label htmlFor="time-format">Time Format</label>
              </th>
              <td>
                <input id="time-format" type="text" defaultValue="g:i a" />
                <p className="description">Preview: 9:14 am</p>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="form-actions">
          <button type="button" className="wp-button">
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}
