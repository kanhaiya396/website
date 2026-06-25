import asset from "@/assets/logos/sage.png.asset.json";

export function SageLogo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <img
      src={asset.url}
      alt="Sage"
      className={`object-contain shrink-0 ${className}`}
      loading="lazy"
      decoding="async"
    />
  );
}
