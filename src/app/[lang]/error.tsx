"use client";

import React from "react";

import Button from "@/components/common/Button";
import Image from "next/image";

import errorPng from "@/assets/icons/error/error.png";

export default function Error() {
  return (
    <main className="flex flex-col h-screen bg-white p-6">
      <div className="flex-1 flex flex-col justify-center items-center">
        <Image src={errorPng} alt="" className="w-3/4 lg:w-1/4" />
        <div className="flex flex-col items-center justify-center ml-0 lg:ml-2 mt-4 lg:mt-0">
          <span className="text-gradient main-title">
            Some unexpected error occurred, please, refresh the page
          </span>
          <Button
            className="w-max mt-4"
            onClick={() => window.location.reload()}
            title="Refresh"
          />
        </div>
      </div>
    </main>
  );
}
