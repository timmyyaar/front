"use client";

import React, { useEffect } from "react";

import { GiftPage as Page } from "@/components/GiftPage";
import { sendGAEvent } from "@/google-analytics";

export default function GiftPage() {
  useEffect(() => {
    sendGAEvent({
      action: "page_view",
      category: "gift",
      label: "Gift page view",
      value: "gift",
    });
  }, []);

  return (
    <main>
      <Page />
    </main>
  );
}
