import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "./AuthContext";

interface Props {
  children: ReactNode;
  /** Path to redirect unauthenticated users to. Defaults to /login. */
  redirectTo?: string;
}

/**
 * Wraps any route that requires an authenticated user. Currently unused by
 * any marketing route — provided so the future dashboard can be added with
 * zero refactoring:
 *
 *   <Route
 *     path="/app/*"
 *     element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
 *   />
 */
export function ProtectedRoute({ children, redirectTo = "/login" }: Props) {
  const { status } = useAuth();
  const location = useLocation();

  if (status === "loading") return null;

  if (status !== "authenticated") {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`${redirectTo}?redirect=${redirect}`} replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
