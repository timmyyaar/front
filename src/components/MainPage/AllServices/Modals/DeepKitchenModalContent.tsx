"use client";

import TextBlock from "@/components/MainPage/AllServices/Modals/TextBlock";
import React, { useContext } from "react";
import reactStringReplace from "react-string-replace";
import {
  CITIES,
  FIGURE_BRACKETS_REGEX,
  MAIN_CATEGORIES_URLS,
} from "@/constants";
import { TranslateFunction } from "@/types";
import Costs from "./Costs";
import { PricesContext } from "@/components/Providers";
import { ALL_SERVICE } from "@/components/OrderPage/constants";
import { useSearchParams } from "next/navigation";
import { getTransformedPrices } from "@/utils";

const DEEP_KITCHEN_BLOCKS = [
  {
    title: "what_cleaning_consists_of",
    items: [
      [
        "cleaning_the_fridge",
        "cleaning_the_oven",
        "cleaning_the_hood",
        "clean_the_microwave",
      ],
      [
        "cleaning_kitchen_cabinets",
        "cleaning_the_dishwasher",
        "cleaning_tiles",
        "window_cleaning",
      ],
      [
        "mopping_the_floor",
        "wiping_the_lights",
        "washing_the_dishes",
        "cleaning_the_fridge",
      ],
      [
        "kitchen_appliances",
        "window_cleaning",
        "vacuuming_the_floor",
        "getting_rid_of_trash",
      ],
    ],
  },
];

function DeepKitchenModalContent({
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

  const deepKitchenCosts = [{ price: transformedPrices.defaultDeepKitchen }];

  return (
    <>
      <div className="text-center mb-10">
        <div className="mb-4 lg:mb-6">
          <span className="text-gradient main-title">
            {t("deep_kitchen_cleaning_title")}
          </span>
        </div>
        {reactStringReplace(
          t("deep_kitchen_description"),
          FIGURE_BRACKETS_REGEX,
          (match) => (
            <b>{match}</b>
          ),
        )}
      </div>
      {DEEP_KITCHEN_BLOCKS.map(({ title, items }, index) => (
        <TextBlock key={index} title={title} items={items} t={t} inline />
      ))}
      {!isOrder && (
        <div className="mt-8 lg:mt-16">
          <div className="mb-4 lg:mb-6 text-center">
            <span className="main-title text-gradient">{t("Prices")}</span>
          </div>
          <Costs
            t={t}
            redirectPathname={`order/${MAIN_CATEGORIES_URLS.SPECIAL}?selectedService=${ALL_SERVICE.DEEP_KITCHEN}${city ? `&city=${city}` : ""}`}
            costs={deepKitchenCosts}
          />
        </div>
      )}
    </>
  );
}

export default DeepKitchenModalContent;
