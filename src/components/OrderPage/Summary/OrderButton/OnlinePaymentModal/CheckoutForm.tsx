import React, { useContext, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import request, { HTTP_METHODS } from "@/utils/request";
import ArrowDown from "@/components/OrderPage/Summary/OrderButton/OnlinePaymentModal/icons/ArrowDown";
import { LocaleContext } from "@/components/Providers";
import {
  getPaymentIntentDescription,
  getTranslatedServices,
} from "@/components/OrderPage/Summary/utils";

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
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderIds, setOrderIds] = useState<number[] | null>(null);
  const [promoError, setPromoError] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const onPayClick = async () => {
    try {
      setIsPaymentLoading(true);
      setError("");

      if (!orderIds) {
        const orderResponse = await request({
          url: "order",
          method: HTTP_METHODS.POST,
          body: payload,
        });

        const responseOrderIds = Array.isArray(orderResponse)
          ? orderResponse.map(({ id }) => id)
          : [orderResponse.id];

        setOrderIds(responseOrderIds);

        await request({
          url: `payment-intent/${paymentIntentId}`,
          method: HTTP_METHODS.PATCH,
          body: {
            metadata: { orderIds: responseOrderIds.join(",") },
            description: getPaymentIntentDescription(payload, t),
          },
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
    } catch (error: any) {
      if (error.code === 409) {
        setPromoError(true);
        onCleanPromoData();
      }
    } finally {
      setIsPaymentLoading(false);
    }
  };

  return (
    <div className="_w-full">
      <div>
        <div
          className="back-button _flex _items-center _justify-center"
          onClick={onClose}
        >
          <ArrowDown />
        </div>
        <div className="text-gradient payment-confirm-title _text-center">
          {t("payment_modal_charges_title")}
        </div>
      </div>
      <PaymentElement />
      {error ||
        (promoError && (
          <div className="text-danger _mt-1 _text-center">
            {error || t("promo_error_modal_title")}
          </div>
        ))}
      <div className="d-flex justify-content-center _mt-4">
        <button
          className={`pay-button ${isPaymentLoading ? "disabled loading" : ""}`}
          onClick={onPayClick}
          disabled={isPaymentLoading}
        >
          {t("pay")} {payload.price} zl
        </button>
      </div>
    </div>
  );
}

export default CheckoutForm;
