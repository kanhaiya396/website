import asset from "@/assets/logos/xero.png.asset.json";

export function XeroLogo({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <img
      src={asset.url}
      alt="Xero"
      loading="lazy"
      decoding="async"
      className={`object-contain ${className}`}
    />
  );
}
