"use client";

import React, { useEffect } from "react";

import { SubscriptionPage as Page } from "@/components/SubscriptionPage";
import { sendGAEvent } from "@/google-analytics";

export default function SubscriptionPage() {
  useEffect(() => {
    sendGAEvent({
      action: "page_view",
      category: "subscription",
      label: "Subscription page view",
      value: "subscription",
    });
  }, []);

  return (
    <main>
      <Page />
    </main>
  );
}
