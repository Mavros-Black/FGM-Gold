"use server";

import { redirect } from "next/navigation";
import {
  authenticate,
  clearSessionCookie,
  setSessionCookie,
} from "@/lib/auth";

function safeRedirect(target: unknown) {
  const value = typeof target === "string" ? target : "";
  return value.startsWith("/admin") && !value.startsWith("/admin/login")
    ? value
    : "/admin";
}

export async function loginAction(formData: FormData) {
  const username = String(formData.get("log") ?? "").trim();
  const password = String(formData.get("pwd") ?? "");
  const remember = formData.get("rememberme") === "forever";
  const redirectTo = safeRedirect(formData.get("redirect_to"));

  if (!authenticate(username, password)) {
    const params = new URLSearchParams({ error: "1" });
    if (username) params.set("log", username);
    if (redirectTo !== "/admin") params.set("redirect_to", redirectTo);
    redirect(`/admin/login?${params.toString()}`);
  }

  await setSessionCookie(username, remember);
  redirect(redirectTo);
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/admin/login?loggedout=1");
}
