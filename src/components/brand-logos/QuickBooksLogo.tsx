import quickbooksLogo from "@/assets/logos/quickbooks.png";

export function QuickBooksLogo({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <img
      src={quickbooksLogo}
      alt="QuickBooks"
      loading="lazy"
      decoding="async"
      className={`object-contain ${className}`}
    />
  );
}
