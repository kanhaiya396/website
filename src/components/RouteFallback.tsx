/**
 * Minimal, layout-stable loader used as the <Suspense> fallback for lazy
 * routes. Intentionally low-key — most route chunks load fast enough that a
 * full skeleton would just flash. Reserves vertical space so the header
 * doesn't jump.
 */
export function RouteFallback() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-background"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="h-6 w-6 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
    </div>
  );
}

export default RouteFallback;
