import { OrderPage as Page } from "@/components/OrderPage";
import React from "react";
import {
  getLocales,
  getPrices,
  getDiscounts,
  getMainServices,
  getSubServices,
} from "@/app/api";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";

export default async function OrderType() {
  const [locales, prices, discounts, mainServices, subServices] =
    await Promise.all([
      getLocales(),
      getPrices(),
      getDiscounts(),
      getMainServices(),
      getSubServices(),
    ]);

  return (
    <Providers
      locales={locales}
      prices={prices}
      mainServices={mainServices}
      subServices={subServices}
    >
      <main>
        <Header />
        <Page discounts={discounts} />
      </main>
    </Providers>
  );
}
