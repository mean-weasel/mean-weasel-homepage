interface WeaselLogoProps {
  className?: string;
}

export function WeaselLogo({ className = "w-12 h-12" }: WeaselLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle - warm orange */}
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="#e85d04"
      />

      {/* Weasel body - elongated shape */}
      <ellipse
        cx="50"
        cy="58"
        rx="28"
        ry="20"
        fill="#fcd9b6"
      />

      {/* Weasel head */}
      <circle
        cx="50"
        cy="35"
        r="18"
        fill="#fcd9b6"
      />

      {/* Snout */}
      <ellipse
        cx="50"
        cy="42"
        rx="8"
        ry="6"
        fill="#fff5eb"
      />

      {/* Nose */}
      <ellipse
        cx="50"
        cy="40"
        rx="3"
        ry="2.5"
        fill="#1a1a1a"
      />

      {/* Left eye */}
      <ellipse
        cx="42"
        cy="32"
        rx="4"
        ry="5"
        fill="#1a1a1a"
      />
      {/* Left eye shine */}
      <circle
        cx="41"
        cy="31"
        r="1.5"
        fill="white"
      />

      {/* Right eye */}
      <ellipse
        cx="58"
        cy="32"
        rx="4"
        ry="5"
        fill="#1a1a1a"
      />
      {/* Right eye shine */}
      <circle
        cx="57"
        cy="31"
        r="1.5"
        fill="white"
      />

      {/* Left ear */}
      <ellipse
        cx="36"
        cy="22"
        rx="6"
        ry="8"
        fill="#fcd9b6"
        transform="rotate(-15 36 22)"
      />
      <ellipse
        cx="36"
        cy="23"
        rx="3"
        ry="5"
        fill="#f4a261"
        transform="rotate(-15 36 23)"
      />

      {/* Right ear */}
      <ellipse
        cx="64"
        cy="22"
        rx="6"
        ry="8"
        fill="#fcd9b6"
        transform="rotate(15 64 22)"
      />
      <ellipse
        cx="64"
        cy="23"
        rx="3"
        ry="5"
        fill="#f4a261"
        transform="rotate(15 64 23)"
      />

      {/* Mischievous eyebrows - angled for attitude */}
      <path
        d="M37 27 Q42 24 47 28"
        stroke="#5c4033"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M53 28 Q58 24 63 27"
        stroke="#5c4033"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Smirk - confident */}
      <path
        d="M44 46 Q50 51 56 46"
        stroke="#5c4033"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Belly patch */}
      <ellipse
        cx="50"
        cy="62"
        rx="12"
        ry="10"
        fill="#fff5eb"
      />

      {/* Tail - bushy */}
      <path
        d="M78 58 Q90 48 84 38 Q78 32 74 42 Q70 52 78 58"
        fill="#fcd9b6"
      />
      <path
        d="M82 42 Q78 36 76 44"
        fill="#c17f59"
        opacity="0.4"
      />
    </svg>
  );
}
