// ===============================
// LinkedIn OAuth (Production Safe + Clerk Integrated)
// ===============================

import { Clerk } from "@clerk/clerk-js";

export interface LinkedInAuthData {
  access_token: string;
  expires_in: number;
  refresh_token: string | null;
  linkedin_user_id: string;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
  emailAddress: string;
}

export const LINKEDIN_AUTH_STORAGE_KEY = "linkedin_auth_data";

// N8N Workflow URL
const N8N_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;

// LinkedIn App Credentials
const LINKEDIN_CLIENT_ID = import.meta.env.VITE_LINKEDIN_CLIENT_ID;

// Final redirect after LinkedIn login
const REDIRECT_URI = "https://www.smartcontentsolutions.co.uk/linkedin/callback";

// Generate State Token
function generateState(length = 32) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return [...Array(length)]
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join("");
}

// ================================
// STEP 1 — Start LinkedIn OAuth
// ================================
export async function initiateLinkedInAuth() {
  const clerkUser = window.Clerk?.user;

  if (!clerkUser) {
    throw new Error("Clerk user not found. User must be logged in.");
  }

  const userId = clerkUser.id;
  const state = generateState();

  // Store only state (NOT USER)
  localStorage.setItem("linkedin_oauth_state", state);

  const authUrl =
    "https://www.linkedin.com/oauth/v2/authorization" +
    `?response_type=code` +
    `&client_id=${encodeURIComponent(LINKEDIN_CLIENT_ID)}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&scope=${encodeURIComponent("openid profile email w_member_social")}` +
    `&state=${state}`;

  window.location.href = authUrl;
}

// ===========================================
// STEP 2 — LinkedIn → Your Frontend → N8N
// ===========================================
export async function completeLinkedInAuth() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const returnedState = params.get("state");

  const storedState = localStorage.getItem("linkedin_oauth_state");
  localStorage.removeItem("linkedin_oauth_state");

  if (!code) throw new Error("No authorization code returned from LinkedIn");
  if (storedState !== returnedState)
    throw new Error("Invalid OAuth state value");

  const clerkUser = window.Clerk?.user;
  if (!clerkUser) throw new Error("Clerk user missing.");
  const userId = clerkUser.id;

  // Send to N8N
  const res = await fetch(`${N8N_URL}/oauth-callback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      provider: "linkedin",
      code,
      state: returnedState,
      user_id: userId,
      redirect_uri: REDIRECT_URI,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(text);
    throw new Error("OAuth callback failed.");
  }

  const json = await res.json();
  const authData = json.linkedin_auth_data;

  if (!authData) throw new Error("Invalid response from OAuth callback");

  saveLinkedInAuthData(authData);

  return authData;
}

// ===========================================
// Local Storage Helpers
// ===========================================
export function saveLinkedInAuthData(data: LinkedInAuthData): void {
  localStorage.setItem(LINKEDIN_AUTH_STORAGE_KEY, JSON.stringify(data));
}

export function getLinkedInAuthData(): LinkedInAuthData | null {
  const stored = localStorage.getItem(LINKEDIN_AUTH_STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
}

export function clearLinkedInAuthData(): void {
  localStorage.removeItem(LINKEDIN_AUTH_STORAGE_KEY);
}

export function isLinkedInConnected(): boolean {
  return !!localStorage.getItem(LINKEDIN_AUTH_STORAGE_KEY);
}
