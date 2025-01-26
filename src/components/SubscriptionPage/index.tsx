"use client";

import React, { useContext, useEffect } from "react";
import Image from "next/image";
import reactStringReplace from "react-string-replace";

import { sendGAEvent } from "@/google-analytics";
import { FIGURE_BRACKETS_REGEX } from "@/constants";
import { Footer } from "@/components/Footer";
import { useLocales } from "@/hooks/useLocales";
import { LocaleContext } from "@/components/Providers";
import subscriptionPng from "@/assets/icons/main-services/subscription.png";
import Button from "@/components/common/Button";

export const SubscriptionPage = () => {
  const { locale, locales } = useContext(LocaleContext);
  const { t } = useLocales(locales);

  useEffect(() => {
    sendGAEvent({
      action: "page_view",
      category: "subscription",
      label: "Subscription page view",
      value: "subscription",
    });
  }, []);

  return (
    <>
      <div className="_mt-8 lg:_mt-14 _mb-4 lg:_mb-6">
        <div className="_flex _justify-center _items-center _gap-2">
          <span className="text-gradient _main-title">{t("Subscription")}</span>
          <Image
            src={subscriptionPng}
            alt="Subscription"
            className="_w-8 lg:_w-12"
          />
        </div>
      </div>
      <div className="_bg-light _mx-4 lg:_mx-72 _py-7 _px-4 _rounded-3xl">
        <div className="_text-center _mb-6">
          <span className="_text-xl _font-semibold text-gradient">
            {t("subscription_how_it_works")}
          </span>
        </div>
        <div className="_whitespace-pre-wrap">
          {reactStringReplace(
            t("subscription_page_description"),
            FIGURE_BRACKETS_REGEX,
            (match) => (
              <b key={match}>{match}</b>
            ),
          )}
        </div>
        {/*<br />*/}
        {/*🚨 {t("subscription_page_window_disappear")}{" "}*/}
        {/*<a*/}
        {/*  className="_text-primary hover:_text-primary-dark _break-all"*/}
        {/*  href={`${process.env.NEXT_PUBLIC_SITE_URL}${locale}/subscription`}*/}
        {/*  target="_blank"*/}
        {/*  rel="noopener noreferrer"*/}
        {/*>*/}
        {/*  {process.env.NEXT_PUBLIC_SITE_URL}*/}
        {/*  {locale}/subscription*/}
        {/*</a>*/}
      </div>
      <div className="_mt-6 _mx-4 lg:_mx-72">
        <Button title={t("create_account")} className="_w-full" disabled />
      </div>
      <Footer t={t} />
    </>
  );
};
