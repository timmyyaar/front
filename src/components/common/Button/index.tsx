import React from "react";

interface ButtonProps {
  className?: string;
  title: React.ReactNode;
  isLink?: boolean;
  isLoading?: boolean;
  [prop: string]: any;
}

function Button({
  className,
  title,
  isLink,
  isLoading,
  isSecondary,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`flex items-center justify-center disabled:cursor-default disabled:pointer-events-none
        disabled:bg-primary-disabled px-6 py-3.5 lg:py-4 transition-all
        text-center font-medium rounded-40-px cursor-pointer ${className || ""}
        ${isLoading ? "loading" : ""}
        ${
          isSecondary
            ? "hover:bg-primary-dark active:bg-primary-dark hover:text-white active:text-white z-10 bg-white text-dark"
            : "text-white bg-primary hover:bg-primary-dark active:bg-primary-dark"
        }`}
      {...props}
    >
      {title}
    </button>
  );
}

export default Button;
