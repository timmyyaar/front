import { OrderPage as Page } from "@/components/OrderPage";
import React from "react";
import { getLocales, getPrices } from "@/app/api";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";

export default async function OrderType() {
  const locales = await getLocales();
  const prices = await getPrices();

  return (
    <Providers locales={locales} prices={prices}>
      <main>
        <Header />
        <Page />
      </main>
    </Providers>
  );
}
