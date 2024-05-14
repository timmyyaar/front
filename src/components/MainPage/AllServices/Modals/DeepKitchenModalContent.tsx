"use client";

import TextBlock from "@/components/MainPage/AllServices/Modals/TextBlock";
import React, { useContext } from "react";
import reactStringReplace from "react-string-replace";
import { FIGURE_BRACKETS_REGEX, MAIN_CATEGORIES_URLS } from "@/constants";
import { TranslateFunction } from "@/types";
import Costs from "./Costs";
import { PricesContext } from "@/components/Providers";
import { ALL_SERVICE } from "@/components/OrderPage/constants";

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

function DeepKitchenModalContent({ t }: { t: TranslateFunction }) {
  const { prices } = useContext(PricesContext);

  const deepKitchenCosts = [{ price: prices.defaultDeepKitchen }];

  return (
    <>
      <div className="_text-center _mb-10">
        <div className="modal-title-wrapper">
          <span className="text-gradient modal-title-text">
            {t("deep_kitchen_cleaning_title")}
          </span>
        </div>
        {reactStringReplace(
          t("deep_kitchen_description"),
          FIGURE_BRACKETS_REGEX,
          (match) => (
            <b>{match}</b>
          )
        )}
      </div>
      {DEEP_KITCHEN_BLOCKS.map(({ title, items }, index) => (
        <TextBlock key={index} title={title} items={items} t={t} inline />
      ))}
      <div className="mt-16-mobile-8">
        <div className="modal-title-wrapper _text-center">
          <span className="modal-title-text text-gradient">{t("Prices")}</span>
        </div>
        <Costs
          t={t}
          redirectPathname={`order/${MAIN_CATEGORIES_URLS.SPECIAL}?selectedService=${ALL_SERVICE.DEEP_KITCHEN}`}
          costs={deepKitchenCosts}
        />
      </div>
    </>
  );
}

export default DeepKitchenModalContent;
