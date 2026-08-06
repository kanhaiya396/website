import freeagentLogo from "@/assets/logos/freeagent.png";

export function FreeAgentLogo({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <img
      src={freeagentLogo}
      alt="FreeAgent"
      loading="lazy"
      decoding="async"
      className={`object-contain ${className}`}
    />
  );
}
