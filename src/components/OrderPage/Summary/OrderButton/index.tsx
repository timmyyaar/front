import React, { Dispatch, SetStateAction, useState } from "react";
import OnlinePaymentModal from "@/components/OrderPage/Summary/OrderButton/OnlinePaymentModal";
import { sendGAEvent } from "@/google-analytics";
import {
  createOrder,
  createPaymentIntent,
  deletePaymentIntent,
} from "@/components/OrderPage/Summary/OrderButton/actions";

export type CreateOrderPayload = {
  name: string;
  number: string;
  email: string;
  address: string;
  date: string;
  onlinePayment: boolean;
  requestPreviousCleaner: boolean;
  personalData: boolean;
  mainServicePrice: number;
  secondServicePrice: number;
  price: number;
  mainServicePriceOriginal: number;
  secondServicePriceOriginal: number;
  priceOriginal: number;
  promo: string;
  mainServiceEstimate: string;
  mainServiceCleanersCount: number;
  mainServiceManualCleanersCount: number;
  secondServiceEstimate: string;
  secondServiceCleanersCount: number;
  secondServiceManualCleanersCount: number;
  additionalInformation: string;
  city: string;
  transportationPrice: number;
  language: string;
  creationDate: string;
  ownCheckList: boolean;
  title: string;
  counter: string;
  subService: string;
  secTitle?: string;
  secCounter?: string;
  secSubService?: string;
};

interface OrderButtonProps {
  payload: any;
  setShowPromoErrorModal: Dispatch<SetStateAction<boolean>>;
  onCleanPromoData: () => void;
  setShowSuccessModal: Dispatch<SetStateAction<boolean>>;
  isDisabled: boolean;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  t: (text: string) => string;
}

function OrderButton({
  payload,
  setShowPromoErrorModal,
  onCleanPromoData,
  setShowSuccessModal,
  isDisabled,
  isLoading,
  setIsLoading,
  t,
}: OrderButtonProps) {
  const [showOnlinePaymentModal, setShowOnlinePaymentModal] =
    useState<boolean>(false);
  const [clientSecret, setClientSecret] = useState<string>("");
  const [isClientSecretLoading, setIsClientSecretLoading] =
    useState<boolean>(false);
  const [paymentIntentId, setPaymentIntentId] = useState<string>("");
  const [orderError, setOrderError] = useState<boolean>(false);

  const trackSuccessOrder = (response: { id: number | number[] }) => {
    sendGAEvent({
      action: "create_order",
      category: payload.secTitle
        ? `${payload.title} + ${payload.secTitle}`
        : payload.title,
      label: "Order created",
      value: Array.isArray(response)
        ? `${payload.title}: ${response[0].id} id, ${payload.secTitle}: ${response[1].id} id`
        : `${payload.title}: ${response.id} id`,
    });
  };

  const onCreatePaymentIntent = async () => {
    try {
      setIsClientSecretLoading(true);
      setOrderError(false);

      const intentResponse = await createPaymentIntent({
        price: payload.price,
        email: payload.email,
      });

      if (intentResponse.isError) {
        setOrderError(true);

        return;
      }

      setPaymentIntentId(intentResponse.id);
      setClientSecret(intentResponse.clientSecret as string);
      setShowOnlinePaymentModal(true);
    } finally {
      setIsClientSecretLoading(false);
    }
  };

  const onPaymentModalClose = async () => {
    await deletePaymentIntent(paymentIntentId);

    setShowOnlinePaymentModal(false);
    setClientSecret("");
  };

  const orderButtonClassName = `order-wrapper _cursor-pointer ${
    isDisabled || isClientSecretLoading ? "order-wrapper-disabled" : ""
  } ${isLoading || isClientSecretLoading ? "loading" : ""}`;

  return (
    <>
      <div className="_mt-6">
        <div
          className={orderButtonClassName}
          onClick={async () => {
            if (isDisabled) {
              return;
            }

            if (payload.onlinePayment) {
              await onCreatePaymentIntent();
            } else {
              try {
                setIsLoading(true);
                setOrderError(false);

                const orderResponse = await createOrder(payload);

                if (orderResponse.isError) {
                  if (orderResponse.code === 409) {
                    setShowPromoErrorModal(true);
                  } else {
                    setOrderError(true);
                  }
                } else {
                  trackSuccessOrder(orderResponse as { id: number | number[] });
                  setShowSuccessModal(true);
                }
              } finally {
                setIsLoading(false);
              }
            }
          }}
        >
          {t("Order")}
        </div>
        {orderError && (
          <div className="text-center _mt-2 text-danger _text-center">
            {t("unexpected_error")}
          </div>
        )}
      </div>
      {clientSecret && showOnlinePaymentModal && Boolean(paymentIntentId) && (
        <OnlinePaymentModal
          clientSecret={clientSecret}
          paymentIntentId={paymentIntentId}
          onClose={onPaymentModalClose}
          payload={payload}
          t={t}
          onCleanPromoData={onCleanPromoData}
        />
      )}
    </>
  );
}

export default OrderButton;
