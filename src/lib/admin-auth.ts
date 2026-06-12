import "server-only";

import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieName = "ikada_admin";

function secret() {
  if (process.env.SESSION_SECRET) return process.env.SESSION_SECRET;
  if (process.env.NODE_ENV === "production") {
    throw new Error("SESSION_SECRET is required in production.");
  }
  return "ikada-local-development-session-secret";
}

function adminPassword() {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
  if (process.env.NODE_ENV === "production") {
    throw new Error("ADMIN_PASSWORD is required in production.");
  }
  return "ikada-admin-local";
}

function sign(payload: string) {
  return crypto.createHmac("sha256", secret()).update(payload).digest("hex");
}

export function verifyAdminPassword(password: string) {
  const expected = crypto.createHash("sha256").update(adminPassword()).digest();
  const actual = crypto.createHash("sha256").update(password).digest();
  return crypto.timingSafeEqual(expected, actual);
}

export async function setAdminSession() {
  const expires = Date.now() + 1000 * 60 * 60 * 12;
  const payload = String(expires);
  const token = `${payload}.${sign(payload)}`;
  const jar = await cookies();
  jar.set(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    expires: new Date(expires),
  });
}

export async function clearAdminSession() {
  const jar = await cookies();
  jar.delete(cookieName);
}

export async function isAdminAuthenticated() {
  const jar = await cookies();
  const token = jar.get(cookieName)?.value;
  if (!token) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature) return false;
  if (Number(expires) < Date.now()) return false;
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(sign(expires)));
}

export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
}
