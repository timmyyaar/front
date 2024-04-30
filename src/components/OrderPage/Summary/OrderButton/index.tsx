import React, { Dispatch, SetStateAction, useState } from "react";
import OnlinePaymentModal from "@/components/OrderPage/Summary/OrderButton/OnlinePaymentModal";
import request, { HTTP_METHODS } from "@/utils/request";
import { sendGAEvent } from "@/google-analytics";

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
  const [showOnlinePaymentModal, setShowOnlinePaymentModal] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [isClientSecretLoading, setIsClientSecretLoading] = useState(false);
  const [paymentIntentId, setPaymentIntentId] = useState(null);

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

  const createPaymentIntent = async () => {
    try {
      setIsClientSecretLoading(true);

      const intentResponse = await request({
        url: "payment-intent",
        method: HTTP_METHODS.POST,
        body: { price: payload.price, email: payload.email },
      });

      setPaymentIntentId(intentResponse.id);
      setClientSecret(intentResponse.clientSecret as string);
      setShowOnlinePaymentModal(true);
    } catch (error) {
    } finally {
      setIsClientSecretLoading(false);
    }
  };

  const onPaymentModalClose = async () => {
    await request({
      url: `payment-intent/${paymentIntentId}`,
      method: HTTP_METHODS.DELETE,
    });

    setShowOnlinePaymentModal(false);
    setClientSecret("");
  };

  const orderButtonClassName = `order-wrapper _mt-6 _cursor-pointer ${
    isDisabled || isClientSecretLoading ? "order-wrapper-disabled" : ""
  } ${isLoading || isClientSecretLoading ? "loading" : ""}`;

  return (
    <>
      <div
        className={orderButtonClassName}
        onClick={async () => {
          if (isDisabled) {
            return;
          }

          if (payload.onlinePayment) {
            await createPaymentIntent();
          } else {
            try {
              setIsLoading(true);

              const orderResponse = await request({
                url: "order",
                method: HTTP_METHODS.POST,
                body: payload,
              });

              trackSuccessOrder(orderResponse as { id: number | number[] });
              setShowSuccessModal(true);
            } catch (error: any) {
              if (error.code === 409) {
                setShowPromoErrorModal(true);
              }
            } finally {
              setIsLoading(false);
            }
          }
        }}
      >
        {t("Order")}
      </div>
      {clientSecret && showOnlinePaymentModal && paymentIntentId && (
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
