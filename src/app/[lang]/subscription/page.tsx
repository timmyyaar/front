import React from "react";

import { SubscriptionPage as Page } from "@/components/SubscriptionPage";
import { getDiscounts, getLocales, getPrices } from "@/app/api";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";

export default async function SubscriptionPage() {
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
