import React from "react";

import OrderCategory from "@/components/OrderCategory";
import { getLocales } from "@/app/api";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";

export default async function OrderPage() {
  const locales = await getLocales();

  return (
    <Providers locales={locales}>
      <main>
        <Header />
        <OrderCategory />
      </main>
    </Providers>
  );
}
