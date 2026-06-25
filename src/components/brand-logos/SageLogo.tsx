import asset from "@/assets/logos/sage.png.asset.json";

export function SageLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <img
      src={asset.url}
      alt="Sage"
      loading="lazy"
      decoding="async"
      className={`object-contain ${className}`}
    />
  );
}
