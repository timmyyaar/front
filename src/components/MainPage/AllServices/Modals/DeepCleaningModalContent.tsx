"use client";

import React, { useContext } from "react";
import TextBlock from "@/components/MainPage/AllServices/Modals/TextBlock";
import { TranslateFunction } from "@/types";
import { PricesContext } from "@/components/Providers";
import Costs from "@/components/MainPage/AllServices/Modals/Costs";
import { ALL_SERVICE } from "@/components/OrderPage/constants";
import { CITIES, MAIN_CATEGORIES_URLS } from "@/constants";
import { HOW_IT_WORKS_TEXTS } from "@/components/MainPage/constants";
import { useSearchParams } from "next/navigation";
import { getTransformedPrices } from "@/utils";

const DEEP_CLEANING_BLOCKS = [
  {
    title: "bedroom_cleaning",
    items: HOW_IT_WORKS_TEXTS.Deep.Bedroom,
  },
  {
    title: "kitchen_cleaning",
    items: HOW_IT_WORKS_TEXTS.Deep.Kitchen,
  },
  {
    title: "corridor_cleaning",
    items: HOW_IT_WORKS_TEXTS.Deep.Corridor,
  },
  {
    title: "bathroom_cleaning",
    items: HOW_IT_WORKS_TEXTS.Deep.Bathroom,
  },
  {
    title: "balcony_cleaning",
    items: HOW_IT_WORKS_TEXTS.Deep.Balcony,
  },
];

function DeepCleaningModalContent({
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

  const generalDeepPrice =
    transformedPrices.defaultDeep +
    transformedPrices.subServiceBalcony * 5 +
    transformedPrices.subServiceOven +
    transformedPrices.subServiceKitchenCabinets +
    transformedPrices.subServiceFridge +
    transformedPrices.subServiceHood +
    transformedPrices.subServiceWardrobe +
    transformedPrices.subServiceMicrowave;

  const deepCosts = [
    {
      title: "1-bedroom",
      text: "deep_price_description",
      price: generalDeepPrice,
    },
    {
      title: "2-bedroom",
      text: "deep_price_description",
      price: generalDeepPrice + transformedPrices.deepBedroom,
    },
    {
      title: "3-bedroom",
      text: "deep_price_description",
      price: generalDeepPrice + transformedPrices.deepBedroom * 2,
    },
  ];

  return (
    <>
      <div className="mb-4 lg:mb-6 text-center">
        <span className="text-gradient main-title">
          {t("what_is_included")}
        </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {DEEP_CLEANING_BLOCKS.map(({ title, items }, index) => (
          <TextBlock
            key={index}
            title={title}
            items={items}
            t={t}
            center={index === DEEP_CLEANING_BLOCKS.length - 1}
          />
        ))}
      </div>
      {!isOrder && (
        <div className="mt-8 lg:mt-16">
          <div className="mb-4 lg:mb-6 text-center">
            <span className="main-title text-gradient">{t("Prices")}</span>
          </div>
          <Costs
            t={t}
            redirectPathname={`order/${MAIN_CATEGORIES_URLS.GENERAL}?selectedService=${ALL_SERVICE.DEEP}${city ? `&city=${city}` : ""}`}
            costs={deepCosts}
            description="deep_price_description"
          />
        </div>
      )}
    </>
  );
}

export default DeepCleaningModalContent;
