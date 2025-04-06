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
    <div className="bg-light flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="main-title mb-8 text-gradient">
          <span>
            {redirectStatus === REDIRECT_STATUSES.FAILED
              ? t("payment_failed")
              : t("payment_successful")}
          </span>
        </div>
        {redirectStatus === REDIRECT_STATUSES.FAILED ? (
          <>
            <Image
              src={failedPng}
              alt=""
              className="w-64 h-64 lg:w-80 lg:h-80"
            />
            <Button
              className="w-full max-w-full lg:w-[30rem] mt-4"
              onClick={onTryAgainClick}
              title={t("try_again")}
            />
          </>
        ) : (
          <>
            <Image
              src={successPng}
              alt=""
              className="w-64 h-64 lg:w-80 lg:h-80"
            />
            <div className="px-4 my-4 text-center max-w-3xl">
              {t("success_payment_contact_message")}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PaymentRedirect;
