"use client";

import TextBlock from "@/components/MainPage/AllServices/Modals/TextBlock";
import React, { useContext } from "react";
import { TranslateFunction } from "@/types";
import { PricesContext } from "@/components/Providers";
import Costs from "@/components/MainPage/AllServices/Modals/Costs";
import { ALL_SERVICE } from "@/components/OrderPage/constants";
import { MAIN_CATEGORIES_URLS } from "@/constants";
import { HOW_IT_WORKS_TEXTS } from "@/components/MainPage/constants";

const IN_A_LAST_MINUTE_BLOCKS = [
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

function InALastMinuteModalContent({
  t,
  isOrder,
}: {
  t: TranslateFunction;
  isOrder?: boolean;
}) {
  const { prices } = useContext(PricesContext);

  const lastMinuteCosts = [
    {
      title: "1-bedroom",
      text: "One-time 1-bedroom cleaning",
      price: prices.defaultLastMinute,
    },
    {
      title: "2-bedroom",
      text: "One-time 2-bedroom cleaning",
      price: prices.defaultLastMinute + prices.lastMinuteBedroom,
    },
    {
      title: "3-bedroom",
      text: "One-time 3-bedroom cleaning",
      price: prices.defaultLastMinute + prices.lastMinuteBedroom * 2,
    },
  ];

  return (
    <>
      <div className="_text-center _mb-8 lg:_mb-16">
        <div className="_mb-4 lg:_mb-6 _text-center">
          <span className="_main-title text-gradient">
            {t("in_a_last_minute_title")}
          </span>
        </div>
        {t("in_a_last_minute_description")}
      </div>
      <div className="_grid _grid-cols-1 lg:_grid-cols-2 _gap-6">
        {IN_A_LAST_MINUTE_BLOCKS.map(({ title, items }, index) => (
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
            redirectPathname={`order/${MAIN_CATEGORIES_URLS.SPECIAL}?selectedService=${ALL_SERVICE.LAST_MINUTE}`}
            costs={lastMinuteCosts}
            description="regular_price_description_mobile"
          />
        </div>
      )}
    </>
  );
}

export default InALastMinuteModalContent;
