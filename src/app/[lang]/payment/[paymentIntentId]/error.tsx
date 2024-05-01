"use client";

import React from "react";

import "./style.scss";

export default function Error() {
  return (
    <main className="_flex _flex-col _h-screen bg-light">
      <div className="_flex-1 _flex _flex-col _justify-center _items-center text-gradient error-title">
        Not found...
      </div>
    </main>
  );
}
