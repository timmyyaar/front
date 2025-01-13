"use client";

import TextBlock from "@/components/MainPage/AllServices/Modals/TextBlock";
import React, { useContext } from "react";
import { TranslateFunction } from "@/types";
import { PricesContext } from "@/components/Providers";
import Costs from "@/components/MainPage/AllServices/Modals/Costs";
import { ALL_SERVICE } from "@/components/OrderPage/constants";
import { CITIES, MAIN_CATEGORIES_URLS } from "@/constants";
import { HOW_IT_WORKS_TEXTS } from "@/components/MainPage/constants";
import { useSearchParams } from "next/navigation";
import { getTransformedPrices } from "@/utils";

const REGULAR_CLEANING_BLOCKS = [
  {
    title: "bedroom_cleaning",
    items: HOW_IT_WORKS_TEXTS.Regular.Bedroom,
  },
  {
    title: "kitchen_cleaning",
    items: HOW_IT_WORKS_TEXTS.Regular.Kitchen,
  },
  {
    title: "corridor_cleaning",
    items: HOW_IT_WORKS_TEXTS.Regular.Corridor,
  },
  {
    title: "bathroom_cleaning",
    items: HOW_IT_WORKS_TEXTS.Regular.Bathroom,
  },
];

function RegularCleaningModalContent({
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
      price: transformedPrices.defaultRegular,
    },
    {
      title: "2-bedroom",
      text: "One-time 2-bedroom cleaning",
      price:
        transformedPrices.defaultRegular + transformedPrices.regularBedroom,
    },
    {
      title: "3-bedroom",
      text: "One-time 3-bedroom cleaning",
      price:
        transformedPrices.defaultRegular + transformedPrices.regularBedroom * 2,
    },
  ];

  return (
    <>
      <div className="_mb-4 lg:_mb-6 _text-center">
        <span className="_main-title text-gradient">
          {t("what_is_included")}
        </span>
      </div>
      <div className="_grid _grid-cols-1 lg:_grid-cols-2 _gap-6">
        {REGULAR_CLEANING_BLOCKS.map(({ title, items }, index) => (
          <TextBlock key={index} title={title} items={items} t={t} />
        ))}
      </div>
      {!isOrder && (
        <div className="_mt-8 lg:_mt-16">
          <div className="_mb-4 lg:_mb-6 _text-center">
            <span className="_main-title text-gradient">{t("Prices")}</span>
          </div>
          <Costs
            t={t}
            redirectPathname={`order/${MAIN_CATEGORIES_URLS.GENERAL}?selectedService=${ALL_SERVICE.REGULAR}${city ? `&city=${city}` : ""}`}
            costs={regularCosts}
            description="regular_price_description_mobile"
          />
        </div>
      )}
    </>
  );
}

export default RegularCleaningModalContent;
