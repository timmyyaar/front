"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";

import Button from "@/components/common/Button";

export default function Error() {
  const { lang } = useParams();
  const router = useRouter();

  return (
    <main className="_flex _flex-col _h-screen _bg-white">
      <div className="_flex-1 _flex _flex-col _justify-center _items-center">
        <span className="text-gradient _main-title">
          This page doesn't exist
        </span>
        <Button
          className="_w-max _mt-4"
          onClick={() => router.push(`/${lang}`)}
          title="Back home"
        />
      </div>
    </main>
  );
}
