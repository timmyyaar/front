import { OrderPage as Page } from "@/components/OrderPage";
import React from "react";
import { getLocales, getPrices, getDiscounts } from "@/app/api";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";

export default async function OrderType() {
  const [locales, prices, discounts] = await Promise.all([
    getLocales(),
    getPrices(),
    getDiscounts(),
  ]);

  return (
    <Providers locales={locales} prices={prices}>
      <main>
        <Header />
        <Page discounts={discounts} />
      </main>
    </Providers>
  );
}
