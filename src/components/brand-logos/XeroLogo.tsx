import xeroLogo from "@/assets/logos/xero.png";

export function XeroLogo({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <img
      src={xeroLogo}
      alt="Xero"
      loading="lazy"
      decoding="async"
      className={`object-contain ${className}`}
    />
  );
}
