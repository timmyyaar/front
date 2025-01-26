import React from "react";

interface MailIconProps {
  isTransparent?: boolean;
}

const MailIcon = ({ isTransparent }: MailIconProps) =>
  isTransparent ? (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 7.53516V17.0002C22 17.7654 21.7077 18.5017 21.1827 19.0584C20.6578 19.6152 19.9399 19.9503 19.176 19.9952L19 20.0002H5C4.23479 20.0002 3.49849 19.7078 2.94174 19.1829C2.38499 18.6579 2.04989 17.9401 2.005 17.1762L2 17.0002V7.53516L11.445 13.8322L11.561 13.8982C11.6977 13.965 11.8478 13.9997 12 13.9997C12.1522 13.9997 12.3023 13.965 12.439 13.8982L12.555 13.8322L22 7.53516Z"
        fill="currentColor"
      />
      <path
        d="M18.9998 4C20.0798 4 21.0268 4.57 21.5548 5.427L11.9998 11.797L2.44482 5.427C2.69555 5.01977 3.04004 4.6784 3.44953 4.43138C3.85903 4.18436 4.32166 4.03886 4.79882 4.007L4.99982 4H18.9998Z"
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
    >
      <g clip-path="url(#clip0_13586_105783)">
        <path
          d="M22 8.03516V17.5002C22 18.2654 21.7077 19.0017 21.1827 19.5584C20.6578 20.1152 19.9399 20.4503 19.176 20.4952L19 20.5002H5C4.23479 20.5002 3.49849 20.2078 2.94174 19.6829C2.38499 19.1579 2.04989 18.4401 2.005 17.6762L2 17.5002V8.03516L11.445 14.3322L11.561 14.3982C11.6977 14.465 11.8478 14.4997 12 14.4997C12.1522 14.4997 12.3023 14.465 12.439 14.3982L12.555 14.3322L22 8.03516Z"
          fill="url(#paint0_radial_13586_105783)"
        />
        <path
          d="M19.0003 4.5C20.0803 4.5 21.0273 5.07 21.5553 5.927L12.0003 12.297L2.44531 5.927C2.69604 5.51977 3.04053 5.1784 3.45002 4.93138C3.85951 4.68436 4.32214 4.53886 4.79931 4.507L5.00031 4.5H19.0003Z"
          fill="url(#paint1_radial_13586_105783)"
        />
      </g>
      <defs>
        <radialGradient
          id="paint0_radial_13586_105783"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(12 14.2677) rotate(90) scale(6.2325 10)"
        >
          <stop stop-color="#5A74E8" />
          <stop offset="1" stop-color="#173CDC" />
        </radialGradient>
        <radialGradient
          id="paint1_radial_13586_105783"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(12.0003 8.3985) rotate(90) scale(3.8985 9.555)"
        >
          <stop stop-color="#5A74E8" />
          <stop offset="1" stop-color="#173CDC" />
        </radialGradient>
        <clipPath id="clip0_13586_105783">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );

export default MailIcon;
