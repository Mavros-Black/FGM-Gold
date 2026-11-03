export const SESSION_COOKIE = "fgm_admin_session";
export const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET || "fgm-admin-local-dev-secret-change-me";

const SHORT_TTL = 1000 * 60 * 60 * 8;
const REMEMBER_TTL = 1000 * 60 * 60 * 24 * 30;

export type AdminSession = {
  username: string;
  expiresAt: number;
};

export function sessionTtl(remember: boolean) {
  return remember ? REMEMBER_TTL : SHORT_TTL;
}

function toBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded.padEnd(Math.ceil(padded.length / 4) * 4, "="));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function hmacKey() {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SESSION_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
}

async function sign(value: string) {
  const signature = await crypto.subtle.sign(
    "HMAC",
    await hmacKey(),
    new TextEncoder().encode(value)
  );
  return toBase64Url(new Uint8Array(signature));
}

export async function createSessionToken(username: string, remember: boolean) {
  const payload: AdminSession = {
    username,
    expiresAt: Date.now() + sessionTtl(remember),
  };
  const encoded = toBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  return `${encoded}.${await sign(encoded)}`;
}

export async function verifySessionToken(token: string | undefined) {
  if (!token) return null;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;

  const expected = await sign(encoded);
  if (expected.length !== signature.length) return null;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i += 1) {
    mismatch |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  if (mismatch !== 0) return null;

  try {
    const payload = JSON.parse(
      new TextDecoder().decode(fromBase64Url(encoded))
    ) as AdminSession;
    if (!payload.username || !payload.expiresAt || payload.expiresAt < Date.now()) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
