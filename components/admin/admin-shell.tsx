"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronsLeft,
  CircleHelp,
  ExternalLink,
  FileText,
  Gem,
  Images,
  Image as ImageIcon,
  LayoutDashboard,
  Mail,
  PanelLeft,
  Pin,
  Plus,
  Settings,
  Settings2,
  Users,
  type LucideIcon,
} from "lucide-react";
import { logoutAction } from "@/app/admin/login/actions";
import { initials } from "@/lib/admin-data";

type MenuChild = { label: string; href: string };

type MenuItem = {
  label: string;
  icon: LucideIcon;
  href?: string;
  badge?: number;
  children?: MenuChild[];
};

const menu: MenuItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  {
    label: "Posts",
    icon: Pin,
    children: [
      { label: "All Posts", href: "/admin/posts" },
      { label: "Add New", href: "/admin/posts/new" },
    ],
  },
  { label: "Media", icon: ImageIcon, href: "/admin/media" },
  {
    label: "Pages",
    icon: FileText,
    children: [
      { label: "All Pages", href: "/admin/pages" },
      { label: "Add New", href: "/admin/pages/new" },
    ],
  },
  { label: "Gallery", icon: Images, href: "/admin/gallery" },
  { label: "Messages", icon: Mail, href: "/admin/messages" },
  { label: "Users", icon: Users, href: "/admin/users" },
  { label: "Settings", icon: Settings, href: "/admin/settings" },
];

function isChildActive(pathname: string, href: string) {
  if (href === "/admin/posts") return pathname === "/admin/posts";
  if (href === "/admin/pages") return pathname === "/admin/pages";
  return pathname === href;
}

function isGroupActive(pathname: string, item: MenuItem) {
  if (item.children) {
    return item.children.some((child) =>
      child.href === "/admin/posts"
        ? pathname.startsWith("/admin/posts")
        : child.href === "/admin/pages"
          ? pathname.startsWith("/admin/pages")
          : isChildActive(pathname, child.href)
    );
  }
  if (!item.href) return false;
  return item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
}

export function AdminShell({
  username,
  unreadCount = 0,
  children,
}: {
  username: string;
  unreadCount?: number;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [screenPanel, setScreenPanel] = useState<"options" | "help" | null>(null);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      menu
        .filter((item) => item.children)
        .map((item) => [item.label, isGroupActive(pathname, item)])
    )
  );

  useEffect(() => {
    setMobileOpen(false);
    setOpenGroups((current) =>
      Object.fromEntries(
        menu
          .filter((item) => item.children)
          .map((item) => [
            item.label,
            current[item.label] || isGroupActive(pathname, item),
          ])
      )
    );
  }, [pathname]);

  function toggleGroup(label: string) {
    if (collapsed) {
      setCollapsed(false);
      setOpenGroups((current) => ({ ...current, [label]: true }));
      return;
    }
    setOpenGroups((current) => ({ ...current, [label]: !current[label] }));
  }

  return (
    <div className={collapsed ? "admin-body is-collapsed" : "admin-body"}>
      <div className="admin-bar">
        <button
          type="button"
          className="admin-bar-toggle"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((value) => !value)}
        >
          <PanelLeft size={19} />
        </button>
        <Link href="/admin" className="admin-bar-brand">
          <Gem size={18} className="bar-mark-icon" />
          <span>FGM Resources</span>
        </Link>
        <nav className="admin-bar-nav" aria-label="Admin shortcuts">
          <Link href="/" target="_blank" className="admin-bar-link is-visit">
            Visit Site <ExternalLink size={13} />
          </Link>
          <Link href="/admin/posts/new" className="admin-bar-link">
            <Plus size={14} /> New
          </Link>
        </nav>
        <div className="admin-bar-right">
          <Link href="/admin/users" className="admin-bar-user">
            <span className="admin-bar-avatar">{initials(username)}</span>
            Howdy, {username}
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="admin-bar-logout">
              Log Out
            </button>
          </form>
        </div>
      </div>

      <aside className={mobileOpen ? "admin-menu is-open" : "admin-menu"}>
        <ul className="admin-menu-list">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = isGroupActive(pathname, item);
            const badge =
              item.href === "/admin/messages" ? unreadCount : item.badge;

            if (item.children) {
              const open = Boolean(openGroups[item.label]);
              return (
                <li key={item.label}>
                  <button
                    type="button"
                    className={
                      active ? "admin-menu-toggle is-active" : "admin-menu-toggle"
                    }
                    aria-expanded={open}
                    onClick={() => toggleGroup(item.label)}
                    title={item.label}
                  >
                    <Icon className="menu-icon" />
                    <span className="menu-label">{item.label}</span>
                    <ChevronDown className="menu-chevron" />
                  </button>
                  <ul
                    className={
                      open ? "admin-submenu-list is-open" : "admin-submenu-list"
                    }
                  >
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={
                            isChildActive(pathname, child.href)
                              ? "admin-submenu-link is-active"
                              : "admin-submenu-link"
                          }
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            }

            return (
              <li key={item.label}>
                <Link
                  href={item.href ?? "/admin"}
                  className={
                    active ? "admin-menu-link is-active" : "admin-menu-link"
                  }
                  title={item.label}
                >
                  <Icon className="menu-icon" />
                  <span className="menu-label">{item.label}</span>
                  {badge ? <span className="menu-badge">{badge}</span> : null}
                </Link>
              </li>
            );
          })}
          <li className="menu-divider" aria-hidden="true" />
          <li>
            <Link href="/" target="_blank" className="admin-menu-link">
              <ExternalLink className="menu-icon" />
              <span>View Site</span>
            </Link>
          </li>
        </ul>
        <button
          type="button"
          className="collapse-menu"
          onClick={() => setCollapsed((value) => !value)}
          aria-expanded={!collapsed}
        >
          <ChevronsLeft size={18} />
          <span>{collapsed ? "Expand menu" : "Collapse menu"}</span>
        </button>
      </aside>

      <div className="admin-frame">
        <div className="admin-content">
          <div className="screen-meta-links">
            <button
              type="button"
              className="screen-meta-tab"
              aria-expanded={screenPanel === "options"}
              onClick={() =>
                setScreenPanel((current) => (current === "options" ? null : "options"))
              }
            >
              <Settings2 size={13} /> Screen Options
            </button>
            <button
              type="button"
              className="screen-meta-tab"
              aria-expanded={screenPanel === "help"}
              onClick={() =>
                setScreenPanel((current) => (current === "help" ? null : "help"))
              }
            >
              <CircleHelp size={13} /> Help
            </button>
          </div>

          {screenPanel === "options" ? (
            <div className="screen-meta-panel">
              <h3>Columns</h3>
              <div className="screen-meta-columns">
                {["Author", "Categories", "Comments", "Date", "Status"].map((column) => (
                  <label key={column}>
                    <input type="checkbox" defaultChecked />
                    <span>{column}</span>
                  </label>
                ))}
              </div>
              <button
                type="button"
                className="wp-button wp-button-secondary"
                onClick={() => setScreenPanel(null)}
              >
                Apply
              </button>
            </div>
          ) : null}

          {screenPanel === "help" ? (
            <div className="screen-meta-panel">
              <h3>Help</h3>
              <p>
                Use the sidebar to manage posts, pages, media, gallery items and website
                enquiries. Changes are saved to the content store and reflected across the
                console.
              </p>
              <button
                type="button"
                className="wp-button wp-button-secondary"
                onClick={() => setScreenPanel(null)}
              >
                Close
              </button>
            </div>
          ) : null}

          <div className="wrap">{children}</div>
          <div className="wrap">
            <footer className="admin-footer">
              Thank you for creating with{" "}
              <Link href="/">FGM Resources Ghana Limited</Link> · Version 1.0
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
