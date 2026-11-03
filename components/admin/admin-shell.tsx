"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  ExternalLink,
  FileText,
  Images,
  Image as ImageIcon,
  LayoutDashboard,
  Mail,
  PanelLeft,
  Pin,
  Plus,
  Settings,
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
    setOpenGroups((current) => ({ ...current, [label]: !current[label] }));
  }

  return (
    <div className="admin-body">
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
          <span className="bar-mark">⋀⋀</span>
          <span>FGM Admin</span>
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
                  >
                    <Icon className="menu-icon" />
                    <span>{item.label}</span>
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
                >
                  <Icon className="menu-icon" />
                  <span>{item.label}</span>
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
        <div className="admin-menu-footer">
          FGM Resources
          <br />
          Ghana Limited
        </div>
      </aside>

      <div className="admin-frame">
        <div className="admin-content">
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
