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
      <div className="mb-4 lg:mb-6">
        <div className="flex justify-center items-center gap-2">
          <span className="text-gradient main-title">{t("Subscription")}</span>
          <Image
            src={subscriptionPng}
            alt="Subscription"
            className="w-8 lg:w-12"
          />
        </div>
      </div>
      <div className="bg-light lg:mx-20 py-7 px-4 rounded-3xl">
        <div className="text-center mb-6">
          <span className="text-xl font-semibold text-gradient">
            {t("subscription_how_it_works")}
          </span>
        </div>
        <div className="whitespace-pre-wrap">
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
      <div className="mt-6 lg:mx-20">
        <Button title={t("create_account")} className="w-full" disabled />
      </div>
    </>
  );
}

export default SubscriptionModalContent;
