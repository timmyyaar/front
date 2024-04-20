"use client";

import React, { useEffect } from "react";

import Feedback from "../../../components/Feedback/index";
import { sendGAEvent } from "@/google-analytics";

export default async function FeedbackPage() {
  useEffect(() => {
    sendGAEvent({
      action: "page_view",
      category: "feedback",
      label: "Feedback page view",
      value: "feedback",
    });
  }, []);

  return (
    <main>
      <Feedback />
    </main>
  );
}
