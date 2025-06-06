import React from "react";

interface LeftArrowProps {
  className?: string;
}

export const LeftArrow = ({ className }: LeftArrowProps) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="40"
      y="40"
      width="40"
      height="40"
      rx="20"
      transform="rotate(180 40 40)"
      fill="#f9f9f9"
    />
    <path
      d="M15.1994 20C15.1994 19.3 15.4694 18.6 15.9994 18.07L22.5194 11.55C22.8094 11.26 23.2894 11.26 23.5794 11.55C23.8694 11.84 23.8694 12.32 23.5794 12.61L17.0594 19.13C16.5794 19.61 16.5794 20.39 17.0594 20.87L23.5794 27.39C23.8694 27.68 23.8694 28.16 23.5794 28.45C23.2894 28.74 22.8094 28.74 22.5194 28.45L15.9994 21.93C15.4694 21.4 15.1994 20.7 15.1994 20Z"
      fill="currentColor"
    />
  </svg>
);
