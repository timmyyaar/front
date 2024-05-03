"use client";

import { loadStripe, StripeElementLocale, Appearance } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React, { useContext, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import CheckoutForm from "./CheckoutForm";
import { LocaleContext } from "@/components/Providers";
import { useLocales } from "@/hooks/useLocales";

import "./style.scss";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!);

interface PaymentProps {
  paymentIntent: {
    status: string;
    metadata: { orderIds: string };
    client_secret: string;
    amount: number;
  };
}

const PAYMENT_INTENT_STATUS = {
  REQUIRES_PAYMENT_METHOD: "requires_payment_method",
  REQUIRES_ACTION: "requires_action",
};

const appearance = {
  labels: "floating",
  theme: "stripe",
} as Appearance;

function Payment({ paymentIntent }: PaymentProps) {
  const { locales, locale } = useContext(LocaleContext);
  const { t } = useLocales(locales);

  const { lang } = useParams();
  const router = useRouter();

  const needRedirect =
    !paymentIntent ||
    !Object.values(PAYMENT_INTENT_STATUS).includes(paymentIntent.status) ||
    !paymentIntent.metadata.orderIds;

  useEffect(() => {
    if (needRedirect) {
      router.push(`/${lang}`);
    }
  }, [paymentIntent]);

  return (
    <div className="payment-page-wrapper _flex-1 _flex _flex-col _justify-center">
      {needRedirect ? null : (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntent.client_secret,
            appearance,
            locale: (locale === "ua" ? "auto" : locale) as StripeElementLocale,
          }}
        >
          <CheckoutForm paymentIntent={paymentIntent} t={t} />
        </Elements>
      )}
    </div>
  );
}

export default Payment;
