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
import Button from "@/components/common/Button";

interface CheckoutFormProps {
  payload: any;
  paymentIntentId: string;
  onClose: () => void;
  t: (text: string, defaultText?: string) => string;
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
    <div className="w-full">
      <div>
        <div
          className={`bg-primary rounded-full w-10 h-10 cursor-pointer
            absolute top-4 left-4 flex items-center justify-center ${
              isPaymentLoading
                ? "bg-primary-disabled pointer-events-none cursor-default"
                : ""
            }`}
          onClick={() => {
            if (!isPaymentLoading) {
              onClose();
            }
          }}
        >
          <ArrowDown />
        </div>
        <div
          className="text-gradient mt-14 lg:mt-0 mb-4 lg:mb-8
            lg:text-2xl font-semibold text-center"
        >
          {t("payment_modal_charges_title")}
        </div>
      </div>
      <PaymentElement
        onReady={(element) => element.focus()}
        onChange={(formState) => {
          setIsPayButtonEnabled(formState.complete);
          setError("");
        }}
      />
      {(error || orderError || promoError) && (
        <div className="text-danger mt-1 text-center">
          {error || promoError
            ? t("promo_error_modal_title")
            : t("unexpected_error")}
        </div>
      )}
      <div className="flex justify-center mt-4">
        <Button
          className="w-full max-w-full lg:w-[30rem]"
          onClick={onPayClick}
          isLoading={isPaymentLoading}
          disabled={isPaymentLoading || !isPayButtonEnabled}
          title={`${t("pay")} ${payload.price} zl`}
        />
      </div>
    </div>
  );
}

export default CheckoutForm;
