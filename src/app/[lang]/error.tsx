"use client";

import React from "react";

import Button from "@/components/common/Button";
import Image from "next/image";

import errorPng from "@/assets/icons/error/error.png";

export default function Error() {
  return (
    <main className="_flex _flex-col _h-screen _bg-white _p-6">
      <div className="_flex-1 _flex _flex-col _justify-center _items-center">
        <Image src={errorPng} alt="" className="_w-3/4 lg:_w-1/4" />
        <div className="_flex _flex-col _items-center _justify-center _ml-0 lg:_ml-2 _mt-4 lg:_mt-0">
          <span className="text-gradient _main-title">
            Some unexpected error occurred, please, refresh the page
          </span>
          <Button
            className="_w-max _mt-4"
            onClick={() => window.location.reload()}
            title="Refresh"
          />
        </div>
      </div>
    </main>
  );
}
