import React from "react";

interface PolygonProps {
  className?: string;
}

export const Polygon = ({ className }: PolygonProps) => (
  <svg
    className={className}
    width="8"
    height="6"
    viewBox="0 0 8 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 6L0.535898 6.52533e-07L7.4641 4.68497e-08L4 6Z"
      fill="currentColor"
    />
  </svg>
);
