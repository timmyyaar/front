import React from "react";

interface RightArrow {
  className?: string;
}

export const RightArrow = ({ className }: RightArrow) => (
  <svg
    className={className}
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="40" height="40" rx="20" fill="#f9f9f9" />
    <path
      d="M24.8006 20C24.8006 20.7 24.5306 21.4 24.0006 21.93L17.4806 28.45C17.1906 28.74 16.7106 28.74 16.4206 28.45C16.1306 28.16 16.1306 27.68 16.4206 27.39L22.9406 20.87C23.4206 20.39 23.4206 19.61 22.9406 19.13L16.4206 12.61C16.1306 12.32 16.1306 11.84 16.4206 11.55C16.7106 11.26 17.1906 11.26 17.4806 11.55L24.0006 18.07C24.5306 18.6 24.8006 19.3 24.8006 20Z"
      fill="currentColor"
    />
  </svg>
);
