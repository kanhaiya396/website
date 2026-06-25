import asset from "@/assets/logos/nomi.png.asset.json";

export function NomiLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <img
      src={asset.url}
      alt="Nomi"
      loading="lazy"
      decoding="async"
      className={`object-contain ${className}`}
    />
  );
}
