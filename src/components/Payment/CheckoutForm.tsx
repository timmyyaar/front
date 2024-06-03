import React, { useContext, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { LocaleContext } from "@/components/Providers";
import Button from "@/components/common/Button";

interface CheckoutFormProps {
  paymentIntent: {
    status: string;
    metadata: { orderIds: string };
    client_secret: string;
    amount: number;
  };
  t: (text: string, defaultText?: string) => string;
}

function CheckoutForm({ t, paymentIntent }: CheckoutFormProps) {
  const { locale } = useContext(LocaleContext);
  const [error, setError] = useState("");
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [isPayButtonEnabled, setIsPayButtonEnabled] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const onPayClick = async () => {
    setIsPaymentLoading(true);
    setError("");

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

      setIsPaymentLoading(false);
    }
  };

  return (
    <div>
      <PaymentElement
        onReady={(element) => element.focus()}
        onChange={(formState) => {
          setIsPayButtonEnabled(formState.complete);
        }}
      />
      {error && (
        <div className="text-danger _mt-1 _text-center">
          {error || t("promo_error_modal_title")}
        </div>
      )}
      <div className="_flex _justify-center _mt-4">
        <Button
          className="_w-full _max-w-full lg:_w-[30rem]"
          onClick={onPayClick}
          isLoading={isPaymentLoading}
          disabled={isPaymentLoading || !isPayButtonEnabled}
          title={`${t("pay")} ${parseFloat(
            (paymentIntent.amount / 100).toFixed(1)
          )} zl`}
        />
      </div>
    </div>
  );
}

export default CheckoutForm;
