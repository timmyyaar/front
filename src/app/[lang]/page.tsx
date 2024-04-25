import React from "react";

import { MainPage } from "@/components/MainPage";
import { Providers } from "@/components/Providers";
import { getLocales } from "@/app/api";
import { Header } from "@/components/Header";

export default async function Page() {
  const locales = await getLocales();

  return (
    <Providers locales={locales}>
      <main>
        <Header />
        <MainPage />
      </main>
    </Providers>
  );
}
