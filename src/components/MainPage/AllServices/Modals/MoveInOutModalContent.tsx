"use client";

import reactStringReplace from "react-string-replace";
import {
  CITIES,
  FIGURE_BRACKETS_REGEX,
  MAIN_CATEGORIES_URLS,
} from "@/constants";
import TextBlock from "@/components/MainPage/AllServices/Modals/TextBlock";
import React, { useContext } from "react";
import { TranslateFunction } from "@/types";
import { PricesContext } from "@/components/Providers";
import Costs from "@/components/MainPage/AllServices/Modals/Costs";
import { ALL_SERVICE } from "@/components/OrderPage/constants";
import { HOW_IT_WORKS_TEXTS } from "@/components/MainPage/constants";
import { useSearchParams } from "next/navigation";
import { getTransformedPrices } from "@/utils";

const MOVE_IN_OUT_CLEANING_BLOCKS = [
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

function MoveInOutModalContent({
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

  const generalMoveInOutPrice =
    transformedPrices.defaultMoveInOut +
    transformedPrices.subServiceBalcony * 5 +
    transformedPrices.subServiceOven +
    transformedPrices.subServiceKitchenCabinets +
    transformedPrices.subServiceFridge +
    transformedPrices.subServiceHood +
    transformedPrices.subServiceWardrobe +
    transformedPrices.subServiceMicrowave;

  const moveInOutCosts = [
    {
      title: "1-bedroom",
      text: "deep_price_description",
      price: generalMoveInOutPrice,
    },
    {
      title: "2-bedroom",
      text: "deep_price_description",
      price: generalMoveInOutPrice + transformedPrices.moveInOutBedroom,
    },
    {
      title: "3-bedroom",
      text: "deep_price_description",
      price: generalMoveInOutPrice + transformedPrices.moveInOutBedroom * 2,
    },
  ];

  return (
    <>
      <div className="text-center mb-8 lg:mb-16">
        <div className="mb-4 lg:mb-6 text-center">
          <span className="main-title text-gradient">
            {t("move_in_out_title")}
          </span>
        </div>
        {reactStringReplace(
          t("move_in_out_description"),
          FIGURE_BRACKETS_REGEX,
          (match) => (
            <b>{match}</b>
          ),
        )}
      </div>
      <div className="mb-4 lg:mb-6 text-center">
        <span className="main-title text-gradient">
          {t("what_is_included")}
        </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {MOVE_IN_OUT_CLEANING_BLOCKS.map(({ title, items }, index) => (
          <TextBlock
            key={index}
            title={title}
            items={items}
            t={t}
            center={index === MOVE_IN_OUT_CLEANING_BLOCKS.length - 1}
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
            redirectPathname={`order/${MAIN_CATEGORIES_URLS.SPECIAL}?selectedService=${ALL_SERVICE.MOVE_IN_OUT}${city ? `&city=${city}` : ""}`}
            costs={moveInOutCosts}
            description="deep_price_description"
          />
        </div>
      )}
    </>
  );
}

export default MoveInOutModalContent;
