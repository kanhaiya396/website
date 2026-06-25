import asset from "@/assets/logos/nomi.png.asset.json";

export function NomiLogo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <img
      src={asset.url}
      alt="Nomi"
      className={`object-contain shrink-0 ${className}`}
      loading="lazy"
      decoding="async"
    />
  );
}
