"use client";

import React from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import Button from "@/components/common/Button";

export default function Error() {
  const { lang } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <main className="flex flex-col h-screen bg-white">
      <div className="flex-1 flex flex-col justify-center items-center">
        <span className="text-gradient main-title">
          This page doesn't exist
        </span>
        <Button
          className="w-max mt-4"
          onClick={() => router.push(`/${lang}?${searchParams.toString()}`)}
          title="Back home"
        />
      </div>
    </main>
  );
}
