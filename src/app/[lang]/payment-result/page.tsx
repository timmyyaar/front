import React from "react";

import { getLocales } from "@/app/api";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import PaymentRedirect from "@/components/PaymentRedirectPage";

export default async function PaymentResult() {
  const locales = await getLocales();

  return (
    <Providers locales={locales}>
      <main className="_flex _flex-col _h-screen">
        <Header />
        <PaymentRedirect />
      </main>
    </Providers>
  );
}
