"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";

import "./style.scss";

export default function Error() {
  const { lang } = useParams();
  const router = useRouter();

  return (
    <main className="_flex _flex-col _h-screen bg-light">
      <div className="_flex-1 _flex _flex-col _justify-center _items-center">
        <span className="text-gradient error-title">
          This page doesn't exist
        </span>
        <button
          className="back-home-button _mt-4"
          onClick={() => router.push(`/${lang}`)}
        >
          Back home
        </button>
      </div>
    </main>
  );
}
