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
      <div className="_text-center">
        <div className="_mb-4 lg:_mb-6 _text-center">
          <span className="_main-title text-gradient">{t("airbnb_title")}</span>
        </div>
        <div className="_mb-8 lg:_mb-16">
          {reactStringReplace(
            t("airbnb_description"),
            FIGURE_BRACKETS_REGEX,
            (match) => (
              <b>{match}</b>
            ),
          )}
        </div>
        <div className="_mb-4 lg:_mb-6 _text-center">
          <span className="_main-title text-gradient">
            {t("stages_of_preparing")}
          </span>
        </div>
      </div>
      <div className="_grid _grid-cols-2 _grid-rows-2 lg:_flex _flex-row _justify-between _gap-5">
        {["Prepare", "Cleaning", "Sanitize", "Finish"].map((el, i) => (
          <div
            className={`hover:_bg-light-dark active:_bg-light-dark _flex _flex-col _flex-1 _gap-4
              _py-11 _px-5 _bg-light _rounded-xl`}
          >
            <div className="_flex _justify-center">
              <div
                className={`_w-10 _h-10 _flex _justify-center _items-center
                    _rounded-full _bg-primary _text-white`}
              >
                {i + 1}
              </div>
            </div>
            <div className="_text-center _font-medium">
              {t(el + "_airbnb_title")}
            </div>
          </div>
        ))}
      </div>
      {!isOrder && (
        <div className="_mt-8 lg:_mt-16">
          <div className="_mb-4 lg:_mb-6 _text-center">
            <span className="_main-title text-gradient">{t("Prices")}</span>
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
