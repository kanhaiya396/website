import nomiLogo from "@/assets/logos/nomi.png";

export function NomiLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <img
      src={nomiLogo}
      alt="Nomi"
      loading="lazy"
      decoding="async"
      className={`object-contain ${className}`}
    />
  );
}
