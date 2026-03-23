// Client and server auth helpers used across the app.
// This file provides a clear separation between server-only APIs (like
// next/headers) and client-side wrappers that call the app's API routes.

import { cookies } from "next/headers";

export type User = { id: string; email: string; name?: string } | null;

// Server-side: get current user from cookies (used in server components / API)
export async function getCurrentUser(): Promise<User> {
  try {
    const c = cookies();
    const token = c.get("token")?.value;
    if (!token) return null;
    // In a real app, validate token and fetch user info. Here we return a placeholder.
    return { id: "srv-user", email: "server@example.com", name: "Server User" } as User;
  } catch (e) {
    return null;
  }
}

// Client-side helpers: these must run in the browser. They call the app's API
// endpoints which are implemented under app/api/auth/*.

// Note: other modules in the codebase expect named exports with specific
// names (e.g. getCurrentUser, signOut). To preserve compatibility, we
// provide client-side functions and also re-export them under the expected
// names with a "Client" suffix and as the default-named client helpers.

export async function getCurrentUserClient(): Promise<User | { user?: any }> {
  try {
    const res = await fetch("/api/auth/me");
    if (!res.ok) return null;
    const data = await res.json();
    // API returns { user } on success
    return data.user ? data.user as User : null;
  } catch (e) {
    return null;
  }
}

export async function signOutClient(): Promise<void> {
  try {
    await fetch("/api/auth/logout", { method: "POST" });
  } catch (e) {
    // ignore
  }
}

// Implement client-side token helpers expected by API routes
// These functions call the app's auth API endpoints to create/verify tokens.
// They are thin wrappers so server code can import them by name.

export async function signAccessToken(userId: string): Promise<string | null> {
  try {
    const res = await fetch("/api/auth/token/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, type: "access" }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.token ?? null;
  } catch (e) {
    return null;
  }
}

export async function signRefreshToken(userId: string): Promise<string | null> {
  try {
    const res = await fetch("/api/auth/token/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, type: "refresh" }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.token ?? null;
  } catch (e) {
    return null;
  }
}

export async function verifyToken(token: string): Promise<any | null> {
  try {
    const res = await fetch("/api/auth/token/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.payload ?? null;
  } catch (e) {
    return null;
  }
}

// Provide backward-compatible named exports that other files import.
// The app's client components should import the client versions explicitly
// (this file is imported in both server and client contexts). To avoid
// importing next/headers from client code path, keep server-only logic in
// getCurrentUser above and expose client helpers with explicit names.

export { getCurrentUserClient as getCurrentUser, signOutClient as signOut };
