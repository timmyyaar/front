"use client";

import Blogs from "@/components/Blogs";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { sendGAEvent } from "@/google-analytics";

export default function Page() {
  const { blogId } = useParams();

  useEffect(() => {
    sendGAEvent({
      action: "page_view",
      category: "blog",
      label: "Blog page view",
      value: blogId,
    });
  }, []);

  return (
    <main>
      <Blogs />
    </main>
  );
}
