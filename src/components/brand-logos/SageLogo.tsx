export function SageLogo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 60"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      role="img"
      aria-label="Sage"
    >
      <rect x="2" y="10" width="40" height="40" rx="8" fill="#00DC06" />
      <text
        x="22"
        y="40"
        textAnchor="middle"
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        fontSize="22"
        fontWeight="800"
        fill="#0E1F2E"
      >
        s
      </text>
      <text
        x="54"
        y="42"
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        fontSize="32"
        fontWeight="800"
        fill="#0E1F2E"
        letterSpacing="-0.5"
      >
        sage
      </text>
    </svg>
  );
}
