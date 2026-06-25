export function NomiLogo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 60"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      role="img"
      aria-label="Nomi"
    >
      <circle cx="22" cy="30" r="14" fill="none" stroke="#1B2A4E" strokeWidth="5" />
      <circle cx="22" cy="30" r="4" fill="#F26A3F" />
      <text
        x="48"
        y="42"
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        fontSize="32"
        fontWeight="800"
        fill="#1B2A4E"
        letterSpacing="-0.5"
      >
        nomi
      </text>
    </svg>
  );
}
