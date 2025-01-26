"use client";

import React, { useContext } from "react";
import { TranslateFunction } from "@/types";
import { LocaleContext, PricesContext } from "@/components/Providers";
import Costs from "@/components/MainPage/AllServices/Modals/Costs";
import { SALES } from "@/components/MainPage/AllServices/Modals/Costs/constants";
import { getOneDigitFloat, getTransformedPrices } from "@/utils";
import { useSearchParams } from "next/navigation";
import { CITIES, FIGURE_BRACKETS_REGEX } from "@/constants";
import Image from "next/image";
import subscriptionPng from "@/assets/icons/main-services/subscription.png";
import reactStringReplace from "react-string-replace";
import Button from "@/components/common/Button";

function SubscriptionModalContent({
  t,
}: {
  t: TranslateFunction;
  isOrder?: boolean;
}) {
  const { locale } = useContext(LocaleContext);
  const { prices } = useContext(PricesContext);
  const searchParams = useSearchParams();
  const city = searchParams.get("city") || CITIES.KRAKOW.name;

  return (
    <>
      <div className="_mb-4 lg:_mb-6">
        <div className="_flex _justify-center _items-center _gap-2">
          <span className="text-gradient _main-title">{t("Subscription")}</span>
          <Image
            src={subscriptionPng}
            alt="Subscription"
            className="_w-8 lg:_w-12"
          />
        </div>
      </div>
      <div className="_bg-light lg:_mx-20 _py-7 _px-4 _rounded-3xl">
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
      <div className="_mt-6 lg:_mx-20">
        <Button title={t("create_account")} className="_w-full" disabled />
      </div>
    </>
  );
}

export default SubscriptionModalContent;
