import React from "react";

interface MenuIconProps {
  className: string;
}

const MenuIcon = ({ className }: MenuIconProps) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M1.5 6H26.5M1.5 14H26.5M1.5 22H26.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
    />
  </svg>
);

export default MenuIcon;
