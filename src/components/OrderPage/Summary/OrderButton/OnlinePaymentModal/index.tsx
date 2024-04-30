import React, { useContext } from "react";
import { loadStripe, StripeElementLocale, Appearance } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/OrderPage/Summary/OrderButton/OnlinePaymentModal/CheckoutForm";
import Modal from "@/components/common/Modal";
import { LocaleContext } from "@/components/Providers";

import "./style.scss";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!);

console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY);

const appearance = {
  labels: "floating",
  theme: "stripe",
} as Appearance;

interface OnlinePaymentModalProps {
  onClose: () => void;
  clientSecret: string;
  payload: any;
  paymentIntentId: string;
  t: (text: string) => string;
  onCleanPromoData: () => void;
}

function OnlinePaymentModal({
  onClose,
  clientSecret,
  payload,
  paymentIntentId,
  t,
  onCleanPromoData,
}: OnlinePaymentModalProps) {
  const { locale } = useContext(LocaleContext);

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance,
        locale: (locale === "ua" ? "auto" : locale) as StripeElementLocale,
      }}
    >
      <Modal
        onClose={onClose}
        showCloseIcon={false}
        closeOnOutsideClick={false}
      >
        <CheckoutForm
          payload={payload}
          paymentIntentId={paymentIntentId}
          onClose={onClose}
          t={t}
          onCleanPromoData={onCleanPromoData}
        />
      </Modal>
    </Elements>
  );
}

export default OnlinePaymentModal;
