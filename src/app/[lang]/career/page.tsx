"use client";

import React, { useEffect } from "react";

import { CareerPage as Page } from "@/components/CareerPage";
import { sendGAEvent } from "@/google-analytics";

export default async function CareerPage() {
  useEffect(() => {
    sendGAEvent({
      action: "page_view",
      category: "career",
      label: "Career page view",
      value: "career",
    });
  }, []);

  return (
    <main>
      <Page />
    </main>
  );
}
