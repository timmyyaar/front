import React from "react";

interface TelegramIconProps {
  isTransparent?: boolean;
  className?: string;
}

export const TelegramIcon = ({
  isTransparent,
  className,
}: TelegramIconProps) =>
  isTransparent ? (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.7786 4.42997C20.0257 4.32596 20.2962 4.29008 20.5619 4.32608C20.8276 4.36208 21.0788 4.46863 21.2893 4.63465C21.4998 4.80067 21.662 5.02008 21.759 5.27005C21.8559 5.52002 21.8841 5.79141 21.8406 6.05597L19.5726 19.813C19.3526 21.14 17.8966 21.901 16.6796 21.24C15.6616 20.687 14.1496 19.835 12.7896 18.946C12.1096 18.501 10.0266 17.076 10.2826 16.062C10.5026 15.195 14.0026 11.937 16.0026 9.99997C16.7876 9.23897 16.4296 8.79997 15.5026 9.49997C13.1996 11.238 9.50461 13.881 8.28261 14.625C7.20461 15.281 6.64261 15.393 5.97061 15.281C4.74461 15.077 3.60761 14.761 2.67961 14.376C1.42561 13.856 1.48661 12.132 2.67861 11.63L19.7786 4.42997Z"
        fill="currentColor"
      />
    </svg>
  ) : (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_14163_9009)">
        <path
          d="M22.5517 2.53038L1.28878 10.7722C0.433122 11.156 0.143716 11.9246 1.08197 12.3418L6.53681 14.0843L19.7259 5.89098C20.4461 5.37663 21.1833 5.51378 20.5489 6.07961L9.22125 16.3891L8.86542 20.752C9.195 21.4256 9.79847 21.4288 10.1834 21.094L13.3174 18.1132L18.6848 22.1532C19.9314 22.8951 20.6098 22.4163 20.878 21.0566L24.3985 4.30023C24.7641 2.62656 24.1407 1.88913 22.5517 2.53038Z"
          fill="url(#paint0_radial_14163_9009)"
        />
      </g>
      <defs>
        <radialGradient
          id="paint0_radial_14163_9009"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(12.5 12.4012) rotate(90) scale(10.1004 12)"
        >
          <stop stopColor="#5A74E8" />
          <stop offset="1" stopColor="#173CDC" />
        </radialGradient>
        <clipPath id="clip0_14163_9009">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.5 0.300781)"
          />
        </clipPath>
      </defs>
    </svg>
  );
