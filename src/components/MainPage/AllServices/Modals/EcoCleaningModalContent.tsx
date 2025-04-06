"use client";

import React, { useContext } from "react";
import reactStringReplace from "react-string-replace";
import {
  CITIES,
  FIGURE_BRACKETS_REGEX,
  MAIN_CATEGORIES_URLS,
} from "@/constants";
import TextBlock from "@/components/MainPage/AllServices/Modals/TextBlock";
import { TranslateFunction } from "@/types";
import { PricesContext } from "@/components/Providers";
import Costs from "./Costs";
import { ALL_SERVICE } from "@/components/OrderPage/constants";
import { HOW_IT_WORKS_TEXTS } from "@/components/MainPage/constants";
import { useSearchParams } from "next/navigation";
import { getTransformedPrices } from "@/utils";

const ECO_CLEANING_BLOCKS = [
  {
    title: "bedroom_cleaning",
    items: HOW_IT_WORKS_TEXTS.Basic.Bedroom,
  },
  {
    title: "kitchen_cleaning",
    items: HOW_IT_WORKS_TEXTS.Basic.Kitchen,
  },
  {
    title: "corridor_cleaning",
    items: HOW_IT_WORKS_TEXTS.Basic.Corridor,
  },
  {
    title: "bathroom_cleaning",
    items: HOW_IT_WORKS_TEXTS.Basic.Bathroom,
  },
];

function EcoCleaningModalContent({
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

  const ecoCosts = [
    {
      title: "1-bedroom",
      text: "One-time 1-bedroom cleaning",
      price: transformedPrices.defaultEco,
    },
    {
      title: "2-bedroom",
      text: "One-time 2-bedroom cleaning",
      price: transformedPrices.defaultEco + transformedPrices.ecoBedroom,
    },
    {
      title: "3-bedroom",
      text: "One-time 3-bedroom cleaning",
      price: transformedPrices.defaultEco + transformedPrices.ecoBedroom * 2,
    },
  ];

  return (
    <div>
      <div className="text-center mb-6">
        <div className="mb-4 lg:mb-6">
          <span className="text-gradient main-title">
            {t("eco_cleaning_title")}
          </span>
        </div>
        {t("eco_cleaning_description")}
      </div>
      <div className="text-center mb-8 lg:mb-16">
        <div className="mb-4 lg:mb-6 text-center">
          <span className="text-gradient main-title">
            {t("eco_cleaning_how_is_made_title")}
          </span>
        </div>
        <div className="mb-10">
          {reactStringReplace(
            t("eco_cleaning_how_is_made_description"),
            FIGURE_BRACKETS_REGEX,
            (match) => (
              <b>{match}</b>
            ),
          )}
        </div>
        {t("eco_cleaning_we_use_products_description")}
      </div>
      <div className="mb-4 lg:mb-6 text-center">
        <span className="text-gradient main-title">
          {t("what_is_included")}
        </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {ECO_CLEANING_BLOCKS.map(({ title, items }, index) => (
          <TextBlock key={index} title={title} items={items} t={t} />
        ))}
      </div>
      {!isOrder && (
        <div className="mt-8 lg:mt-16">
          <div className="mb-4 lg:mb-6 text-center">
            <span className="main-title text-gradient">{t("Prices")}</span>
          </div>
          <Costs
            t={t}
            redirectPathname={`order/${MAIN_CATEGORIES_URLS.GENERAL}?selectedService=${ALL_SERVICE.ECO}${city ? `&city=${city}` : ""}`}
            costs={ecoCosts}
            description="regular_price_description_mobile"
          />
        </div>
      )}
    </div>
  );
}

export default EcoCleaningModalContent;
