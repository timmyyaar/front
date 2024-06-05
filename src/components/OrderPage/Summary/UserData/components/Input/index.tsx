import React from "react";

interface InputProps {
  isBordered?: boolean;
  [prop: string]: any;
}

function Input({ isBordered, ...props }: InputProps) {
  return (
    <input
      className={`_py-3 _pl-3 _w-full _bg-light _rounded-xl _outline-0 _text-gray-dark ${
        isBordered ? "_border _border-solid _border-gray" : ""
      }`}
      {...props}
    />
  );
}

export default Input;
