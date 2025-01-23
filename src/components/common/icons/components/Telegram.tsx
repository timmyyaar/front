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
      <path
        d="M22.0517 0.729594L0.788779 8.97144C-0.0668777 9.35525 -0.356284 10.1239 0.581966 10.541L6.03681 12.2835L19.2259 4.0902C19.9461 3.57584 20.6833 3.713 20.0489 4.27883L8.72125 14.5883L8.36542 18.9512C8.695 19.6249 9.29847 19.628 9.6834 19.2932L12.8174 16.3124L18.1848 20.3525C19.4314 21.0943 20.1098 20.6156 20.378 19.2559L23.8985 2.49945C24.2641 0.825781 23.6407 0.0883438 22.0517 0.729594Z"
        fill="url(#paint1_radial_11916_93924)"
      />
      <defs>
        <radialGradient
          id="paint1_radial_11916_93924"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(12 10.6004) rotate(90) scale(10.1004 12)"
        >
          <stop stopColor="#19286D" />
          <stop offset="1" stopColor="#214AFF" />
        </radialGradient>
        <clipPath id="clip0_11916_93924">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
