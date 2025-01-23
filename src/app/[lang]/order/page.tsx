import React from "react";

import OrderCategory from "@/components/OrderCategory";
import {
  getDiscounts,
  getLocales,
  getMainServices,
  getPrices,
  getSubServices,
} from "@/app/api";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";

export default async function OrderPage() {
  const [locales, mainServices] = await Promise.all([
    getLocales(),
    getMainServices(),
  ]);

  return (
    <Providers locales={locales} mainServices={mainServices}>
      <main className="_flex _flex-col _h-screen">
        <Header />
        <OrderCategory />
      </main>
    </Providers>
  );
}
