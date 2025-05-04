"use client";

import TextBlock from "@/components/MainPage/AllServices/Modals/TextBlock";
import React, { useContext } from "react";
import { TranslateFunction } from "@/types";
import { PricesContext } from "@/components/Providers";
import Costs from "@/components/MainPage/AllServices/Modals/Costs";
import { ALL_SERVICE } from "@/components/OrderPage/constants";
import { CITIES, MAIN_CATEGORIES_URLS } from "@/constants";
import { useSearchParams } from "next/navigation";
import { getTransformedPrices } from "@/utils";

const WHILE_SICK_ITEMS = [
  "preventive_disinfection_treatment_to_surfaces",
  "change_bedsheets",
  "take_away_trash",
  "cleaning_and_disinfecting_sink_toilet",
  "washing_dirty_dishes",
  "air_ventilation",
];

function WhileSickModalContent({
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

  const regularCosts = [
    {
      title: "1-bedroom",
      text: "One-time 1-bedroom cleaning",
      price: transformedPrices.defaultWhiteSickness,
    },
    {
      title: "2-bedroom",
      text: "One-time 2-bedroom cleaning",
      price:
        transformedPrices.defaultWhiteSickness +
        transformedPrices.whileSicknessBedroom,
    },
    {
      title: "3-bedroom",
      text: "One-time 3-bedroom cleaning",
      price:
        transformedPrices.defaultWhiteSickness +
        transformedPrices.whileSicknessBedroom * 2,
    },
  ];

  return (
    <>
      <div className="mb-4 lg:mb-6 text-center">
        <span className="main-title text-gradient">
          {t("what_is_included")}
        </span>
      </div>
      <TextBlock
        title="disinfection_treatment_and_cleaning"
        items={WHILE_SICK_ITEMS}
        t={t}
      />
      {!isOrder && (
        <div className="mt-8 lg:mt-16">
          <div className="mb-4 lg:mb-6 text-center">
            <span className="main-title text-gradient">{t("Prices")}</span>
          </div>
          <Costs
            t={t}
            redirectPathname={`order/${MAIN_CATEGORIES_URLS.HEALTHCARE}?selectedService=${ALL_SERVICE.WHILE_SICKNESS}${city ? `&city=${city}` : ""}`}
            costs={regularCosts}
            description="regular_price_description_mobile"
          />
        </div>
      )}
    </>
  );
}

export default WhileSickModalContent;
