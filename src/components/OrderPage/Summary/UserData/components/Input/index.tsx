import React from "react";
import Image from "next/image";

interface InputProps {
  isBordered?: boolean;
  [prop: string]: any;
}

function Input({ isBordered, icon, ...props }: InputProps) {
  return icon ? (
    <div
      className={`_flex _items-center _py-3 _pl-3 _w-full _bg-light _rounded-xl _outline-0 _text-gray-dark ${
        isBordered ? "_border _border-solid _border-gray" : ""
      }`}
    >
      <Image src={icon} alt="" className="_mr-1" />
      <input {...props} />
    </div>
  ) : (
    <input
      className={`_py-3 _pl-3 _w-full _bg-light _rounded-xl _outline-0 _text-gray-dark ${
        isBordered ? "_border _border-solid _border-gray" : ""
      }`}
      {...props}
    />
  );
}

export default Input;
