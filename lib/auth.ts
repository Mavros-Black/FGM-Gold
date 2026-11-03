import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  createSessionToken,
  sessionTtl,
  verifySessionToken,
} from "./session";

export const DEMO_USERNAME = process.env.ADMIN_USER || "admin";
export const DEMO_PASSWORD = process.env.ADMIN_PASSWORD || "fgm-admin";

export function authenticate(username: string, password: string) {
  return username === DEMO_USERNAME && password === DEMO_PASSWORD;
}

export async function setSessionCookie(username: string, remember: boolean) {
  const store = await cookies();
  store.set({
    name: SESSION_COOKIE,
    value: await createSessionToken(username, remember),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: Math.floor(sessionTtl(remember) / 1000),
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function getSession() {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}
