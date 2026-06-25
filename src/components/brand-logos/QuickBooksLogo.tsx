import asset from "@/assets/logos/quickbooks.png.asset.json";

export function QuickBooksLogo({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <img
      src={asset.url}
      alt="QuickBooks"
      loading="lazy"
      decoding="async"
      className={`object-contain ${className}`}
    />
  );
}
