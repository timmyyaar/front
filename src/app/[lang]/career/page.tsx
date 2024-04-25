import React from "react";

import { CareerPage as Page } from "@/components/CareerPage";
import { getLocales } from "@/app/api";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";

export default async function CareerPage() {
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
