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
};

function PaymentRedirect() {
  const { locales } = useContext(LocaleContext);
  const { t } = useLocales(locales);

  const searchParams = useSearchParams();
  const { lang } = useParams();
  const router = useRouter();

  const redirectStatus = searchParams.get("redirect_status") || "";

  useEffect(() => {
    if (!Object.values(REDIRECT_STATUSES).includes(redirectStatus)) {
      router.push(`/${lang}`);
    }
  }, [redirectStatus]);

  return (
    <div className="payment-redirect">
      <div className="_flex _flex-col _items-center">
        <div className="payment-status-title _mb-10 _mt-12 text-gradient">
          <span>
            {redirectStatus === REDIRECT_STATUSES.SUCCEEDED
              ? t("payment_successful")
              : t("payment_failed")}
          </span>
        </div>
        {redirectStatus === REDIRECT_STATUSES.SUCCEEDED ? (
          <>
            <Image src={successDesktop} alt="" />
            <div className="success-payment-message">
              {t("success_payment_contact_message")}
            </div>
          </>
        ) : (
          <Image src={failedDesktop} alt="" />
        )}
      </div>
    </div>
  );
}

export default PaymentRedirect;
