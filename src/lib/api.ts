/**
 * Django REST API client
 * - Auto-attaches JWT access token from localStorage
 * - Auto-refreshes token on 401 responses
 * - Throws structured errors for easy handling
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const TOKEN_KEY = "outworx_access";
const REFRESH_KEY = "outworx_refresh";

function getCookie(name: string): string | null {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

function isUnsafeMethod(method?: string): boolean {
  const value = (method ?? "GET").toUpperCase();
  return value !== "GET" && value !== "HEAD" && value !== "OPTIONS";
}

let csrfPromise: Promise<string | null> | null = null;

async function ensureCsrfToken(): Promise<string | null> {
  const existing = getCookie("csrftoken");
  if (existing) return existing;

  if (!csrfPromise) {
    csrfPromise = fetch(`${BASE_URL}/api/auth/csrf/`, {
      method: "GET",
      credentials: "include",
    })
      .then(() => getCookie("csrftoken"))
      .finally(() => {
        csrfPromise = null;
      });
  }

  return csrfPromise;
}

export const tokenStorage = {
  getAccess: () => localStorage.getItem(TOKEN_KEY),
  getRefresh: () => localStorage.getItem(REFRESH_KEY),
  set: (access: string, refresh: string) => {
    localStorage.setItem(TOKEN_KEY, access);
    localStorage.setItem(REFRESH_KEY, refresh);
  },
  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};

async function refreshAccessToken(): Promise<string | null> {
  const refresh = tokenStorage.getRefresh();
  if (!refresh) return null;

  const csrfToken = await ensureCsrfToken();

  const res = await fetch(`${BASE_URL}/api/auth/refresh/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(csrfToken ? { "X-CSRFToken": csrfToken } : {}),
    },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) {
    tokenStorage.clear();
    return null;
  }

  const data = await res.json();
  localStorage.setItem(TOKEN_KEY, data.access);
  return data.access;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public data: unknown,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

let isRefreshing = false;
let refreshQueue: Array<(token: string | null) => void> = [];

// Transient upstream-unreachable statuses worth retrying. 502 = nginx can't
// connect to backend (deploy in flight, container restart). 503 = backend
// reports overloaded. We deliberately do NOT retry 504 — gateway timeout
// means the backend received the request and may have committed it; a
// retry could create duplicate documents/jobs. 502 in particular hit the
// user during a deploy-mid-batch on 2026-04-30 and silently failed every
// in-flight upload — bracketing it with a few retries turns a 25-second
// blip into a transparent recovery.
const TRANSIENT_RETRY_STATUSES = new Set([502, 503]);
const TRANSIENT_MAX_RETRIES = 3;

function shouldRetryTransient(status: number, attempt: number): boolean {
  return TRANSIENT_RETRY_STATUSES.has(status) && attempt < TRANSIENT_MAX_RETRIES;
}

function transientBackoffMs(attempt: number): number {
  // 500ms, 1500ms, 3500ms — enough to span a typical short container
  // restart (~5–20s) without wedging the UI for slow paths. Add jitter so
  // a herd of parallel uploads doesn't synchronise their retries and hit
  // the backend the instant it comes back up.
  const base = 500 * Math.pow(2, attempt) - 500;
  const jitter = Math.random() * 250;
  return base + jitter;
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const makeRequest = async (token: string | null): Promise<Response> => {
    const method = options.method ?? "GET";
    const csrfToken = isUnsafeMethod(method) ? await ensureCsrfToken() : null;
    // Don't set Content-Type for FormData — the browser sets it automatically
    // with the correct multipart boundary.
    const isFormData = options.body instanceof FormData;
    const headers: Record<string, string> = {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(options.headers as Record<string, string>),
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    if (csrfToken) headers["X-CSRFToken"] = csrfToken;

    return fetch(`${BASE_URL}${path}`, {
      ...options,
      method,
      credentials: "include",
      headers,
    });
  };

  const shouldAttemptRefresh =
    path !== "/api/auth/login/" &&
    path !== "/api/auth/email-login/" &&
    path !== "/api/auth/register/" &&
    path !== "/api/auth/refresh/" &&
    !!tokenStorage.getRefresh();

  // Wrap the fetch attempt in a retry loop for 502/503. Each iteration
  // re-runs the FULL request including the 401-refresh handling below, so
  // a token expiry during the backoff window is handled cleanly.
  let res: Response;
  let attempt = 0;
  while (true) {
    res = await makeRequest(tokenStorage.getAccess());
    if (!shouldRetryTransient(res.status, attempt)) break;
    // Drain the body so the browser releases the connection before we sleep
    // — without this the connection sits in a half-read state for the full
    // backoff and subsequent fetches in the same origin can starve.
    try { await res.text(); } catch { /* ignore */ }
    await sleep(transientBackoffMs(attempt));
    attempt += 1;
  }

  if (res.status === 401 && shouldAttemptRefresh) {
    // Only one refresh at a time
    if (!isRefreshing) {
      isRefreshing = true;
      const newToken = await refreshAccessToken();
      isRefreshing = false;
      refreshQueue.forEach((cb) => cb(newToken));
      refreshQueue = [];

      if (!newToken) throw new ApiError(401, null, "Session expired. Please log in again.");
      res = await makeRequest(newToken);
    } else {
      // Wait for the ongoing refresh
      const newToken = await new Promise<string | null>((resolve) => {
        refreshQueue.push(resolve);
      });
      if (!newToken) throw new ApiError(401, null, "Session expired. Please log in again.");
      res = await makeRequest(newToken);
    }
  }

  if (!res.ok) {
    let data: unknown;
    try { data = await res.json(); } catch { data = null; }
    const message =
      typeof data === "object" && data !== null && "detail" in data
        ? String((data as Record<string, unknown>).detail)
        : `Request failed with status ${res.status}`;
    throw new ApiError(res.status, data, message);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

async function requestBlob(path: string): Promise<Blob> {
  const makeRequest = async (token: string | null): Promise<Response> => {
    const headers: Record<string, string> = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return fetch(`${BASE_URL}${path}`, { credentials: "include", headers });
  };

  // Mirror the JSON path's transient-error retry — blob fetches (PDF
  // previews, exports) hit the same upstream and would otherwise fail
  // silently during a deploy.
  let res: Response;
  let attempt = 0;
  while (true) {
    res = await makeRequest(tokenStorage.getAccess());
    if (!shouldRetryTransient(res.status, attempt)) break;
    try { await res.text(); } catch { /* ignore */ }
    await sleep(transientBackoffMs(attempt));
    attempt += 1;
  }

  if (res.status === 401 && tokenStorage.getRefresh()) {
    const newToken = await refreshAccessToken();
    if (!newToken) throw new ApiError(401, null, "Session expired. Please log in again.");
    res = await makeRequest(newToken);
  }

  if (!res.ok) {
    throw new ApiError(res.status, null, `Request failed with status ${res.status}`);
  }

  return res.blob();
}

export const api = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  /** Upload a FormData payload. Content-Type is set by the browser (with boundary). */
  postMultipart: <T>(path: string, body: FormData) =>
    request<T>(path, { method: "POST", body }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(body) }),
  patch: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
  getBlob: (path: string) => requestBlob(path),
};
