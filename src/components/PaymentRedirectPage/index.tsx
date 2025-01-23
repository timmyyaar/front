"use client";

import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { LocaleContext } from "@/components/Providers";
import { useLocales } from "@/hooks/useLocales";

import successPng from "./images/success.png";
import failedPng from "./images/failed.png";
import Button from "@/components/common/Button";

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
      router.push(`/${lang}?${searchParams.toString()}`);
    }
  }, [redirectStatus, paymentIntent]);

  const onTryAgainClick = () => {
    router.push(`/${lang}/payment/${paymentIntent}?${searchParams.toString()}`);
  };

  return (
    <div className="payment-redirect _bg-light _flex-1 _flex _flex-col _items-center _justify-center">
      <div className="_flex _flex-col _items-center">
        <div className="_main-title _mb-8 text-gradient">
          <span>
            {redirectStatus === REDIRECT_STATUSES.FAILED
              ? t("payment_failed")
              : t("payment_successful")}
          </span>
        </div>
        {redirectStatus === REDIRECT_STATUSES.FAILED ? (
          <>
            <Image src={failedPng} alt="" className="_w-64 _h-64 lg:_w-80 lg:_h-80" />
            <Button
              className="_w-full _max-w-full lg:_w-[30rem] _mt-4"
              onClick={onTryAgainClick}
              title={t("try_again")}
            />
          </>
        ) : (
          <>
            <Image src={successPng} alt="" className="_w-64 _h-64 lg:_w-80 lg:_h-80" />
            <div className="_px-4 _my-4 _text-center _max-w-3xl">
              {t("success_payment_contact_message")}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PaymentRedirect;
