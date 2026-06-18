import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";

import type {
  ForgotPasswordInput,
  LoginInput,
  ResetPasswordInput,
  SignupInput,
} from "./schema";

/**
 * Drop-in auth context. The default implementation is a stub that mirrors the
 * current "demo only" UX (returns `{ ok: false, message }`). When a real
 * backend lands, replace the body of `signIn` / `signUp` / etc. — no UI or
 * page changes are required.
 *
 * Components consume `useAuth()` only. The shape is intentionally minimal and
 * backend-neutral so it can be backed by Supabase, Django, Auth0, Clerk, etc.
 */

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

export type AuthStatus = "anonymous" | "authenticated" | "loading";

export interface AuthResult {
  ok: boolean;
  message?: string;
}

export interface AuthContextValue {
  user: AuthUser | null;
  status: AuthStatus;
  signIn: (input: LoginInput) => Promise<AuthResult>;
  signUp: (input: SignupInput) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  requestPasswordReset: (input: ForgotPasswordInput) => Promise<AuthResult>;
  resetPassword: (input: ResetPasswordInput) => Promise<AuthResult>;
}

const DEMO_MESSAGE = "Authentication isn't wired up yet.";

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>("anonymous");

  const stub = useCallback(
    async (): Promise<AuthResult> => ({ ok: false, message: DEMO_MESSAGE }),
    []
  );

  const signOut = useCallback(async () => {
    setUser(null);
    setStatus("anonymous");
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      status,
      signIn: stub,
      signUp: stub,
      signOut,
      requestPasswordReset: stub,
      resetPassword: stub,
    }),
    [user, status, stub, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }
  return ctx;
}
