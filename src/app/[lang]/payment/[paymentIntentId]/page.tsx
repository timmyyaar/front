import React from "react";

import { getLocales, getPaymentIntent } from "@/app/api";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import Payment from "@/components/Payment";

interface PaymentProps {
  params: { paymentIntentId: string };
}

export default async function ({ params }: PaymentProps) {
  const locales = await getLocales();
  const paymentIntent = await getPaymentIntent(params.paymentIntentId);

  return (
    <Providers locales={locales}>
      <main className="_flex _flex-col _h-screen">
        <Header />
        <Payment paymentIntent={paymentIntent} />
      </main>
    </Providers>
  );
}
