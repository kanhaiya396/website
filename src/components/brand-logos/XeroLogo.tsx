export function XeroLogo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 60"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      role="img"
      aria-label="Xero"
    >
      <circle cx="30" cy="30" r="26" fill="#13B5EA" />
      <path
        d="M21.5 22.5l8.5 7.5 8.5-7.5M21.5 37.5l8.5-7.5 8.5 7.5"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="68"
        y="40"
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        fontSize="30"
        fontWeight="700"
        fill="#13B5EA"
        letterSpacing="-0.5"
      >
        xero
      </text>
    </svg>
  );
}
