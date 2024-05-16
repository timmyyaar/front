"use client";

import React, { useContext, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import ArrowDown from "@/components/OrderPage/Summary/OrderButton/OnlinePaymentModal/icons/ArrowDown";
import { LocaleContext } from "@/components/Providers";
import {
  createOrder,
  editPaymentIntent,
} from "@/components/OrderPage/Summary/OrderButton/actions";

interface CheckoutFormProps {
  payload: any;
  paymentIntentId: string;
  onClose: () => void;
  t: (text: string) => string;
  onCleanPromoData: () => void;
}

function CheckoutForm({
  payload,
  paymentIntentId,
  onClose,
  t,
  onCleanPromoData,
}: CheckoutFormProps) {
  const { locale } = useContext(LocaleContext);
  const [isPaymentLoading, setIsPaymentLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [orderError, setOrderError] = useState<boolean>(false);
  const [orderIds, setOrderIds] = useState<number[] | null>(null);
  const [promoError, setPromoError] = useState<boolean>(false);
  const [isPayButtonEnabled, setIsPayButtonEnabled] = useState<boolean>(false);

  const stripe = useStripe();
  const elements = useElements();

  const onPayClick = async () => {
    try {
      setIsPaymentLoading(true);
      setError("");
      setOrderError(false);
      setPromoError(false);

      if (!orderIds) {
        const orderResponse = await createOrder({
          ...payload,
          paymentIntentId,
        });

        if (orderResponse.isError) {
          if (orderResponse.code === 409) {
            setPromoError(true);
            onCleanPromoData();
          } else {
            setOrderError(true);
          }

          return;
        }

        const responseOrderIds = Array.isArray(orderResponse)
          ? orderResponse.map(({ id }) => id)
          : [orderResponse.id];

        setOrderIds(responseOrderIds);

        await editPaymentIntent(paymentIntentId, {
          metadata: { orderIds: responseOrderIds.join(",") },
          description: `Customer name: ${payload.name}, Date: ${
            payload.date
          }, Service: ${payload.title}${
            payload.secTitle
              ? `, Second service title: ${payload.secTitle}`
              : ""
          }`,
        });
      }

      if (stripe && elements) {
        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${process.env.NEXT_PUBLIC_SITE_URL}${locale}/payment-result`,
          },
        } as any);

        if (error) {
          setError(error.message as string);
        }
      }
    } finally {
      setIsPaymentLoading(false);
    }
  };

  return (
    <div className="_w-full">
      <div>
        <div
          className={`back-button _flex _items-center _justify-center ${
            isPaymentLoading ? "primary-button-disabled" : ""
          }`}
          onClick={() => {
            if (!isPaymentLoading) {
              onClose();
            }
          }}
        >
          <ArrowDown />
        </div>
        <div className="text-gradient payment-confirm-title _text-center">
          {t("payment_modal_charges_title")}
        </div>
      </div>
      <PaymentElement
        onReady={(element) => element.focus()}
        onChange={(formState) => {
          setIsPayButtonEnabled(formState.complete);
        }}
      />
      {(error || orderError || promoError) && (
        <div className="text-danger _mt-1 _text-center">
          {error || promoError
            ? t("promo_error_modal_title")
            : t("unexpected_error")}
        </div>
      )}
      <div className="d-flex justify-content-center _mt-4">
        <button
          className={`pay-button ${
            isPaymentLoading ? "primary-button-disabled loading" : ""
          }`}
          onClick={onPayClick}
          disabled={isPaymentLoading || !isPayButtonEnabled}
        >
          {t("pay")} {payload.price} zl
        </button>
      </div>
    </div>
  );
}

export default CheckoutForm;
