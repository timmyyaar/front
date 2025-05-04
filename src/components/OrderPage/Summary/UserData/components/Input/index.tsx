import React from "react";
import Image from "next/image";

interface InputProps {
  isBordered?: boolean;
  [prop: string]: any;
}

function Input({ isBordered, icon, isRound, ...props }: InputProps) {
  return icon ? (
    <div
      className={`${isRound ? "rounded-full" : "rounded-xl"} flex items-center py-3 px-3 w-full bg-light outline-0 text-gray-dark ${
        isBordered ? "border border-solid border-gray" : ""
      }`}
    >
      <Image src={icon} alt="" className="mr-1" />
      <input
        {...props}
        className={`w-full bg-light outline-0 text-gray-dark`}
      />
    </div>
  ) : (
    <input
      className={`${isRound ? "rounded-full" : "rounded-xl"} py-3 pl-3 w-full bg-light outline-0 text-gray-dark ${
        isBordered ? "border border-solid border-gray" : ""
      }`}
      {...props}
    />
  );
}

export default Input;
