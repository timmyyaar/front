import React from "react";

interface CaretDownProps {
  className: string;
}

const CaretDownIcon = ({ className }: CaretDownProps) => (
  <svg
    width="6"
    height="7"
    viewBox="0 0 6 7"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M0.450686 1.53569C0.50119 1.44801 0.574106 1.37534 0.661956 1.32513C0.749806 1.27493 0.849429 1.24899 0.950608 1.24998L5.04983 1.24998C5.15101 1.24899 5.25063 1.27493 5.33848 1.32513C5.42633 1.37534 5.49924 1.44801 5.54975 1.53569C5.59903 1.62004 5.625 1.71597 5.625 1.81366C5.625 1.91135 5.59903 2.00728 5.54975 2.09162L3.50061 5.65108C3.44939 5.73828 3.37627 5.81059 3.2885 5.86083C3.20073 5.91107 3.10135 5.9375 3.00022 5.9375C2.89908 5.9375 2.79971 5.91107 2.71193 5.86083C2.62416 5.81059 2.55104 5.73828 2.49983 5.65108L0.450217 2.09163C0.401008 2.00724 0.375118 1.91128 0.3752 1.81359C0.375283 1.7159 0.401334 1.61999 0.450686 1.53569Z" />
  </svg>
);

export default CaretDownIcon;
