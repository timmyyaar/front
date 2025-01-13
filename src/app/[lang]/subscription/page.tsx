import React from "react";

import { SubscriptionPage as Page } from "@/components/SubscriptionPage";
import {getDiscounts, getLocales, getMainServices, getPrices, getSubServices} from "@/app/api";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";

export default async function SubscriptionPage() {
  const [locales, prices, discounts, mainServices, subServices] = await Promise.all([
    getLocales(),
    getPrices(),
    getDiscounts(),
    getMainServices(),
    getSubServices(),
  ]);

  return (
    <Providers locales={locales} prices={prices} mainServices={mainServices} subServices={subServices}>
      <main>
        <Header />
        <Page discounts={discounts} />
      </main>
    </Providers>
  );
}
