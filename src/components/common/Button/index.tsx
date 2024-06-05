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
  ...props
}: ButtonProps) {
  return (
    <button
      className={`_flex _items-center _justify-center _bg-primary hover:_bg-primary-dark
        active:_bg-primary-dark disabled:_cursor-default disabled:_pointer-events-none
        disabled:_bg-primary-disabled _text-white _px-6 _py-3.5 lg:_py-4 _transition-all
        _text-center _font-medium _border-40 _cursor-pointer ${
          className || ""
        } ${isLoading ? "loading" : ""}`}
      {...props}
    >
      {title}
    </button>
  );
}

export default Button;
