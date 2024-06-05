"use client";

import React, { useContext } from "react";
import reactStringReplace from "react-string-replace";
import { FIGURE_BRACKETS_REGEX, MAIN_CATEGORIES_URLS } from "@/constants";
import TextBlock from "@/components/MainPage/AllServices/Modals/TextBlock";
import { TranslateFunction } from "@/types";
import { PricesContext } from "@/components/Providers";
import Costs from "./Costs";
import { ALL_SERVICE } from "@/components/OrderPage/constants";
import { HOW_IT_WORKS_TEXTS } from "@/components/MainPage/constants";

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

  const ecoCosts = [
    {
      title: "1-bedroom",
      text: "One-time 1-bedroom cleaning",
      price: prices.defaultEco,
    },
    {
      title: "2-bedroom",
      text: "One-time 2-bedroom cleaning",
      price: prices.defaultEco + prices.ecoBedroom,
    },
    {
      title: "3-bedroom",
      text: "One-time 3-bedroom cleaning",
      price: prices.defaultEco + prices.ecoBedroom * 2,
    },
  ];

  return (
    <div>
      <div className="_text-center _mb-6">
        <div className="_mb-4 lg:_mb-6">
          <span className="text-gradient _main-title">
            {t("eco_cleaning_title")}
          </span>
        </div>
        {t("eco_cleaning_description")}
      </div>
      <div className="_text-center _mb-8 lg:_mb-16">
        <div className="_mb-4 lg:_mb-6 _text-center">
          <span className="text-gradient _main-title">
            {t("eco_cleaning_how_is_made_title")}
          </span>
        </div>
        <div className="_mb-10">
          {reactStringReplace(
            t("eco_cleaning_how_is_made_description"),
            FIGURE_BRACKETS_REGEX,
            (match) => (
              <b>{match}</b>
            )
          )}
        </div>
        {t("eco_cleaning_we_use_products_description")}
      </div>
      <div className="_mb-4 lg:_mb-6 _text-center">
        <span className="text-gradient _main-title">
          {t("what_is_included")}
        </span>
      </div>
      <div className="_grid _grid-cols-1 lg:_grid-cols-2 _gap-6">
        {ECO_CLEANING_BLOCKS.map(({ title, items }, index) => (
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
            redirectPathname={`order/${MAIN_CATEGORIES_URLS.GENERAL}?selectedService=${ALL_SERVICE.ECO}`}
            costs={ecoCosts}
            description="regular_price_description_mobile"
          />
        </div>
      )}
    </div>
  );
}

export default EcoCleaningModalContent;
