export function QuickBooksLogo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 60"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      role="img"
      aria-label="QuickBooks"
    >
      <circle cx="30" cy="30" r="26" fill="#2CA01C" />
      <text
        x="30"
        y="40"
        textAnchor="middle"
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        fontSize="26"
        fontWeight="700"
        fill="#ffffff"
      >
        qb
      </text>
      <text
        x="68"
        y="40"
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        fontSize="24"
        fontWeight="700"
        fill="#2CA01C"
        letterSpacing="-0.3"
      >
        quickbooks
      </text>
    </svg>
  );
}
