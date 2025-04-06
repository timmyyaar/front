"use client";

import React, { useContext } from "react";
import reactStringReplace from "react-string-replace";
import {
  CITIES,
  FIGURE_BRACKETS_REGEX,
  MAIN_CATEGORIES_URLS,
} from "@/constants";
import { TranslateFunction } from "@/types";
import { PricesContext } from "@/components/Providers";
import Costs from "@/components/MainPage/AllServices/Modals/Costs";
import { ALL_SERVICE } from "@/components/OrderPage/constants";
import { useSearchParams } from "next/navigation";
import { getTransformedPrices } from "@/utils";

function AirbnbModalContent({
  t,
  isOrder,
}: {
  t: TranslateFunction;
  isOrder?: boolean;
}) {
  const { prices } = useContext(PricesContext);
  const searchParams = useSearchParams();
  const city = searchParams.get("city") || CITIES.KRAKOW.name;

  const transformedPrices = getTransformedPrices(prices, city);

  const airbnbCosts = [
    {
      title: "1-bedroom",
      text: "One-time 1-bedroom cleaning",
      price: transformedPrices.defaultAirbnb,
    },
    {
      title: "2-bedroom",
      text: "One-time 2-bedroom cleaning",
      price: transformedPrices.defaultAirbnb + transformedPrices.airbnbBedroom,
    },
    {
      title: "3-bedroom",
      text: "One-time 3-bedroom cleaning",
      price:
        transformedPrices.defaultAirbnb + transformedPrices.airbnbBedroom * 2,
    },
  ];

  return (
    <>
      <div className="text-center">
        <div className="mb-4 lg:mb-6 text-center">
          <span className="main-title text-gradient">{t("airbnb_title")}</span>
        </div>
        <div className="mb-8 lg:mb-16">
          {reactStringReplace(
            t("airbnb_description"),
            FIGURE_BRACKETS_REGEX,
            (match) => (
              <b>{match}</b>
            ),
          )}
        </div>
      </div>
      {!isOrder && (
        <div className="mt-8 lg:mt-16">
          <div className="mb-4 lg:mb-6 text-center">
            <span className="main-title text-gradient">{t("Prices")}</span>
          </div>
          <Costs
            t={t}
            redirectPathname={`order/${MAIN_CATEGORIES_URLS.SPECIAL}?selectedService=${ALL_SERVICE.AIRBNB}${city ? `&city=${city}` : ""}`}
            costs={airbnbCosts}
            description="regular_price_description_mobile"
          />
        </div>
      )}
    </>
  );
}

export default AirbnbModalContent;
