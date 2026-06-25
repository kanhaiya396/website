import sageLogo from "@/assets/logos/sage.png";

export function SageLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <img
      src={sageLogo}
      alt="Sage"
      loading="lazy"
      decoding="async"
      className={`object-contain ${className}`}
    />
  );
}
