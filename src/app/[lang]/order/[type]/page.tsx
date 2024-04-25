import { OrderPage as Page } from "@/components/OrderPage";
import React from "react";
import { getLocales } from "@/app/api";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";

export default async function OrderType() {
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
