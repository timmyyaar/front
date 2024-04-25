import React from "react";

import { SubscriptionPage as Page } from "@/components/SubscriptionPage";
import { getLocales } from "@/app/api";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";

export default async function SubscriptionPage() {
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
