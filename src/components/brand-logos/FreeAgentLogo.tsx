import asset from "@/assets/logos/freeagent.png.asset.json";

export function FreeAgentLogo({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <img
      src={asset.url}
      alt="FreeAgent"
      loading="lazy"
      decoding="async"
      className={`object-contain ${className}`}
    />
  );
}
