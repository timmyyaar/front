"use client";

import React, { useContext } from "react";
import { TranslateFunction } from "@/types";
import { PricesContext } from "@/components/Providers";
import Costs from "@/components/MainPage/AllServices/Modals/Costs";
import { SALES } from "@/components/MainPage/AllServices/Modals/Costs/constants";
import {getOneDigitFloat, getTransformedPrices} from "@/utils";
import { useSearchParams } from "next/navigation";
import {CITIES} from "@/constants";

function SubscriptionModalContent({
  t,
  isOrder,
}: {
  t: TranslateFunction;
  isOrder?: boolean;
}) {
  const { prices } = useContext(PricesContext);
  const searchParams = useSearchParams();
  const city = searchParams.get('city') || CITIES.KRAKOW.name

  const transformedPrices = getTransformedPrices(prices, city);

  const subscriptionCosts = {
    [SALES[0].title]: [
      {
        title: "1-bedroom",
        text: "One-time 1-bedroom cleaning",
        price: getOneDigitFloat(transformedPrices.defaultRegular * 0.8),
        oldPrice: transformedPrices.defaultRegular,
      },
      {
        title: "2-bedroom",
        text: "One-time 2-bedroom cleaning",
        price: getOneDigitFloat(
          (transformedPrices.defaultRegular + transformedPrices.regularBedroom) * 0.8,
        ),
        oldPrice: transformedPrices.defaultRegular + transformedPrices.regularBedroom,
      },
      {
        title: "3-bedroom",
        text: "One-time 3-bedroom cleaning",
        price: getOneDigitFloat(
          (transformedPrices.defaultRegular + transformedPrices.regularBedroom * 2) * 0.8,
        ),
        oldPrice: transformedPrices.defaultRegular + transformedPrices.regularBedroom * 2,
      },
    ],
    [SALES[1].title]: [
      {
        title: "1-bedroom",
        text: "Twice a month 1-bedroom cleaning",
        price: getOneDigitFloat(transformedPrices.defaultRegular * 0.85),
        oldPrice: transformedPrices.defaultRegular,
      },
      {
        title: "2-bedroom",
        text: "Twice a month 2-bedroom cleaning",
        price: getOneDigitFloat(
          (transformedPrices.defaultRegular + transformedPrices.regularBedroom) * 0.85,
        ),
        oldPrice: transformedPrices.defaultRegular + transformedPrices.regularBedroom,
      },
      {
        title: "3-bedroom",
        text: "Twice a month 3-bedroom cleaning",
        price: getOneDigitFloat(
          (transformedPrices.defaultRegular + transformedPrices.regularBedroom * 2) * 0.85,
        ),
        oldPrice: transformedPrices.defaultRegular + transformedPrices.regularBedroom * 2,
      },
    ],
    [SALES[2].title]: [
      {
        title: "1-bedroom",
        text: "Once a month 1-bedroom cleaning",
        price: getOneDigitFloat(transformedPrices.defaultRegular * 0.9),
        oldPrice: transformedPrices.defaultRegular,
      },
      {
        title: "2-bedroom",
        text: "Once a month 2-bedroom cleaning",
        price: getOneDigitFloat(
          (transformedPrices.defaultRegular + transformedPrices.regularBedroom) * 0.9,
        ),
        oldPrice: transformedPrices.defaultRegular + transformedPrices.regularBedroom,
      },
      {
        title: "3-bedroom",
        text: "Once a month 3-bedroom cleaning",
        price: getOneDigitFloat(
          (transformedPrices.defaultRegular + transformedPrices.regularBedroom * 2) * 0.9,
        ),
        oldPrice: transformedPrices.defaultRegular + transformedPrices.regularBedroom * 2,
      },
    ],
  };

  return (
    <>
      <div className="_text-center">
        <div className="_mb-4 lg:_mb-6 _text-center">
          <span className="_main-title text-gradient">{t("Subscription")}</span>
        </div>
        <div className="_whitespace-pre-wrap">
          {t("subscription_description")}
        </div>
      </div>
      {!isOrder && (
        <div className="_mt-8 lg:_mt-16">
          <div className="_mb-4 lg:_mb-6 _text-center">
            <span className="_main-title text-gradient">{t("Prices")}</span>
          </div>
          <Costs
            t={t}
            redirectPathname={`subscription${city ? `?city=${city}` : ""}`}
            costs={subscriptionCosts}
            isSubscription
            description="regular_price_description_mobile"
          />
        </div>
      )}
    </>
  );
}

export default SubscriptionModalContent;
