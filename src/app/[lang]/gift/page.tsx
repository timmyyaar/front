import React from "react";

import { GiftPage as Page } from "@/components/GiftPage";
import { getLocales } from "@/app/api";
import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";

export default async function GiftPage() {
  const locales = await getLocales();

  return (
    <Providers locales={locales}>
      <main>
        <Header />
        <Page />
      </main>
    </Providers>
  );
}
