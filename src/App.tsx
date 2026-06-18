import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ScrollManager } from "@/components/ScrollManager";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { RouteFallback } from "@/components/RouteFallback";
import { AuthProvider } from "@/features/auth/AuthContext";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const loadPricing = () => import("./pages/Pricing");
const loadPrivacy = () => import("./pages/Privacy");
const loadTerms = () => import("./pages/Terms");
const loadDocumentation = () => import("./pages/Documentation");
const loadApiDocs = () => import("./pages/ApiDocs");
const loadAbout = () => import("./pages/About");
const loadBlog = () => import("./pages/Blog");
const loadBlogPost = () => import("./pages/BlogPost");
const loadCareers = () => import("./pages/Careers");
const loadStatus = () => import("./pages/Status");
const loadSecurity = () => import("./pages/Security");
const loadCookies = () => import("./pages/Cookies");
const loadDashboardDemo = () => import("./pages/DashboardDemo");
const loadLogin = () => import("./pages/auth/Login");
const loadSignup = () => import("./pages/auth/Signup");
const loadForgotPassword = () => import("./pages/auth/ForgotPassword");
const loadResetPassword = () => import("./pages/auth/ResetPassword");

const Pricing = lazy(loadPricing);
const Privacy = lazy(loadPrivacy);
const Terms = lazy(loadTerms);
const Documentation = lazy(loadDocumentation);
const ApiDocs = lazy(loadApiDocs);
const About = lazy(loadAbout);
const Blog = lazy(loadBlog);
const BlogPost = lazy(loadBlogPost);
const Careers = lazy(loadCareers);
const Status = lazy(loadStatus);
const Security = lazy(loadSecurity);
const Cookies = lazy(loadCookies);
const DashboardDemo = lazy(loadDashboardDemo);
const Login = lazy(loadLogin);
const Signup = lazy(loadSignup);
const ForgotPassword = lazy(loadForgotPassword);
const ResetPassword = lazy(loadResetPassword);

/**
 * Map of route path → lazy chunk preloader. Used by <SmoothNavLink> to warm
 * the chunk on hover/focus and await it before navigating, so the Suspense
 * fallback never visibly paints between pages.
 *
 * Keys are matched by exact path first, then by path prefix (for dynamic
 * routes like /blog/:slug).
 */
export const routePreloaders: Record<string, () => Promise<unknown>> = {
  "/pricing": loadPricing,
  "/privacy": loadPrivacy,
  "/terms": loadTerms,
  "/cookies": loadCookies,
  "/docs": loadDocumentation,
  "/api-docs": loadApiDocs,
  "/about": loadAbout,
  "/blog": loadBlog,
  "/blog/": loadBlogPost,
  "/careers": loadCareers,
  "/status": loadStatus,
  "/security": loadSecurity,
  "/dashboard-demo": loadDashboardDemo,
  "/login": loadLogin,
  "/signup": loadSignup,
  "/forgot-password": loadForgotPassword,
  "/reset-password": loadResetPassword,
};

export function preloadRoute(path: string): Promise<unknown> | undefined {
  const clean = path.split("?")[0].split("#")[0];
  const exact = routePreloaders[clean];
  if (exact) return exact();
  for (const key of Object.keys(routePreloaders)) {
    if (key.endsWith("/") && clean.startsWith(key)) {
      return routePreloaders[key]();
    }
  }
  return undefined;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Marketing content is rarely stale; refetching on every focus is noise.
      staleTime: 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <ScrollManager />
              <Suspense fallback={<RouteFallback />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/cookies" element={<Cookies />} />
                  <Route path="/docs" element={<Documentation />} />
                  <Route path="/api-docs" element={<ApiDocs />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/status" element={<Status />} />
                  <Route path="/security" element={<Security />} />
                  <Route path="/dashboard-demo" element={<DashboardDemo />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
