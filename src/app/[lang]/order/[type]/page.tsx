"use client";

import { OrderPage as Page } from "@/components/OrderPage";
import React, { useEffect } from "react";
import { sendGAEvent } from "@/google-analytics";
import { useParams } from "next/navigation";

export default function OrderType() {
  const { type } = useParams();

  useEffect(() => {
    sendGAEvent({
      action: "page_view",
      category: "order",
      label: "Order page view",
      value: type,
    });
  }, []);

  return (
    <main>
      <Page />
    </main>
  );
}
