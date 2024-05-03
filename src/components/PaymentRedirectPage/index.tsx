"use client";

import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { LocaleContext } from "@/components/Providers";
import { useLocales } from "@/hooks/useLocales";

import successDesktop from "./images/success-desktop.svg";
import failedDesktop from "./images/failed-desktop.svg";

import "./style.scss";

const REDIRECT_STATUSES = {
  SUCCEEDED: "succeeded",
  FAILED: "failed",
  PENDING: "pending",
};

function PaymentRedirect() {
  const { locales } = useContext(LocaleContext);
  const { t } = useLocales(locales);

  const searchParams = useSearchParams();
  const { lang } = useParams();
  const router = useRouter();

  const redirectStatus = searchParams.get("redirect_status") || "";
  const paymentIntent = searchParams.get("payment_intent");

  useEffect(() => {
    if (
      !Object.values(REDIRECT_STATUSES).includes(redirectStatus) ||
      !paymentIntent
    ) {
      router.push(`/${lang}`);
    }
  }, [redirectStatus, paymentIntent]);

  const onTryAgainClick = () => {
    router.push(`/${lang}/payment/${paymentIntent}`);
  };

  return (
    <div className="payment-redirect">
      <div className="_flex _flex-col _items-center">
        <div className="payment-status-title _mb-8 _mt-12 text-gradient">
          <span>
            {redirectStatus === REDIRECT_STATUSES.FAILED
              ? t("payment_failed")
              : t("payment_successful")}
          </span>
        </div>
        {redirectStatus === REDIRECT_STATUSES.FAILED ? (
          <>
            <Image
              src={failedDesktop}
              alt=""
              className="payment-status-image"
            />
            <button className="pay-button _mt-4" onClick={onTryAgainClick}>
              {t("try_again")}
            </button>
          </>
        ) : (
          <>
            <Image
              src={successDesktop}
              alt=""
              className="payment-status-image"
            />
            <div className="success-payment-message">
              {t("success_payment_contact_message")}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PaymentRedirect;
