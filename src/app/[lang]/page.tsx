"use client";

import React, { useEffect } from "react";

import { MainPage } from "@/components/MainPage";
import { sendGAEvent } from "@/google-analytics";

export default function Page() {
  useEffect(() => {
    sendGAEvent({
      action: "page_view",
      category: "main",
      label: "Main page view",
      value: "main",
    });
  }, []);

  return (
    <main>
      <MainPage />
    </main>
  );
}
