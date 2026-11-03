import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { getUnreadMessageCount } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const unreadCount = await getUnreadMessageCount();

  return (
    <AdminShell username={session.username} unreadCount={unreadCount}>
      {children}
    </AdminShell>
  );
}
