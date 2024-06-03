"use client";

import reactStringReplace from "react-string-replace";
import { FIGURE_BRACKETS_REGEX, MAIN_CATEGORIES_URLS } from "@/constants";
import TextBlock from "@/components/MainPage/AllServices/Modals/TextBlock";
import React, { useContext } from "react";
import { TranslateFunction } from "@/types";
import { PricesContext } from "@/components/Providers";
import Costs from "@/components/MainPage/AllServices/Modals/Costs";
import { ALL_SERVICE } from "@/components/OrderPage/constants";
import {HOW_IT_WORKS_TEXTS} from "@/components/MainPage/constants";

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

  const generalMoveInOutPrice =
    prices.defaultMoveInOut +
    prices.subServiceBalcony * 5 +
    prices.subServiceOven +
    prices.subServiceKitchenCabinets +
    prices.subServiceFridge +
    prices.subServiceHood +
    prices.subServiceWardrobe +
    prices.subServiceMicrowave;

  const moveInOutCosts = [
    {
      title: "1-bedroom",
      text: "deep_price_description",
      price: generalMoveInOutPrice,
    },
    {
      title: "2-bedroom",
      text: "deep_price_description",
      price: generalMoveInOutPrice + prices.moveInOutBedroom,
    },
    {
      title: "3-bedroom",
      text: "deep_price_description",
      price: generalMoveInOutPrice + prices.moveInOutBedroom * 2,
    },
  ];

  return (
    <>
      <div className="_text-center _mb-8 lg:_mb-16">
        <div className="_mb-4 lg:_mb-6 _text-center">
          <span className="_main-title text-gradient">
            {t("move_in_out_title")}
          </span>
        </div>
        {reactStringReplace(
          t("move_in_out_description"),
          FIGURE_BRACKETS_REGEX,
          (match) => (
            <b>{match}</b>
          )
        )}
      </div>
      <div className="_mb-4 lg:_mb-6 _text-center">
        <span className="_main-title text-gradient">
          {t("what_is_included")}
        </span>
      </div>
      <div className="_grid _grid-cols-1 lg:_grid-cols-2 _gap-6">
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
        <div className="_mt-8 lg:_mt-16">
          <div className="_mb-4 lg:_mb-6 _text-center">
            <span className="_main-title text-gradient">
              {t("Prices")}
            </span>
          </div>
          <Costs
            t={t}
            redirectPathname={`order/${MAIN_CATEGORIES_URLS.SPECIAL}?selectedService=${ALL_SERVICE.MOVE_IN_OUT}`}
            costs={moveInOutCosts}
            description="deep_price_description"
          />
        </div>
      )}
    </>
  );
}

export default MoveInOutModalContent;
