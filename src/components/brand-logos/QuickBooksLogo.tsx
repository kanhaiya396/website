import asset from "@/assets/logos/quickbooks.png.asset.json";

export function QuickBooksLogo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <img
      src={asset.url}
      alt="QuickBooks"
      className={`object-contain shrink-0 ${className}`}
      loading="lazy"
      decoding="async"
    />
  );
}
