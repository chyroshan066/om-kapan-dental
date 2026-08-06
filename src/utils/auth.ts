import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import type { AdminSessionPayload } from "@/types/admin";

const encoder = new TextEncoder();

function getSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error(
      "JWT_SECRET is not set. Add a long random string to .env (see .env.example)."
    );
  }
  return encoder.encode(secret);
}

export const ADMIN_SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function signSessionToken(payload: AdminSessionPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(getSecretKey());
}

export async function verifySessionToken(
  token: string
): Promise<AdminSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as unknown as AdminSessionPayload;
  } catch {
    return null;
  }
}