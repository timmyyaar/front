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
      className={`_flex _items-center _justify-center disabled:_cursor-default disabled:_pointer-events-none
        disabled:_bg-primary-disabled _px-6 _py-3.5 lg:_py-4 _transition-all
        _text-center _font-medium _border-40 _cursor-pointer ${className || ""}
        ${isLoading ? "loading" : ""}
        ${
          isSecondary
            ? "hover:_bg-primary-dark active:_bg-primary-dark hover:_text-white active:_text-white _z-10 _bg-white _text-dark"
            : "_text-white _bg-primary hover:_bg-primary-dark active:_bg-primary-dark"
        }`}
      {...props}
    >
      {title}
    </button>
  );
}

export default Button;
