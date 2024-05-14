"use client";

import React, { useContext } from "react";
import reactStringReplace from "react-string-replace";
import { FIGURE_BRACKETS_REGEX, MAIN_CATEGORIES_URLS } from "@/constants";
import TextBlock from "@/components/MainPage/AllServices/Modals/TextBlock";
import { TranslateFunction } from "@/types";
import { PricesContext } from "@/components/Providers";
import Costs from "./Costs";
import { ALL_SERVICE } from "@/components/OrderPage/constants";

const ECO_CLEANING_BLOCKS = [
  {
    title: "bedroom_cleaning",
    items: [
      "wiping_down_mirrors_and_frames",
      "removing_dust_from_all_accessible_lamps",
      "arranging_household_items",
      "dusting_all_the_surfaces",
      "picking_up_all_the_trash",
      "making_the_bed",
      "vacuuming_and_mopping_floors",
    ],
  },
  {
    title: "kitchen_cleaning",
    items: [
      "washing_window_sills_switches_radiators_baseboards_handles_doors",
      "wiping_down_all_surfaces_refrigerator_hood_kitchen_appliances",
      "washing_dirty_dishes_in_the_sink",
      "washing_fronts_and_furniture",
      "mopping_the_floor",
    ],
  },
  {
    title: "corridor_cleaning",
    items: [
      "cleaning_mirror",
      "wiping_all_accessible_and_exposed_surfaces_free_of_dust",
      "arranging_the_shoes_neatly",
      "vacuuming_and_mopping_floors",
      "picking_up_all_the_trash",
    ],
  },
  {
    title: "bathroom_cleaning",
    items: [
      "wiping_the_mirrors_and_glass_surfaces",
      "cleaning_and_disinfecting_sink_toilet_shower_and_bathtub",
      "removing_slight_limescale",
      "laying_things_out_neatly",
      "mopping_the_floor",
    ],
  },
];

function EcoCleaningModalContent({ t }: { t: TranslateFunction }) {
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
        <div className="modal-title-wrapper">
          <span className="text-gradient modal-title-text">
            {t("eco_cleaning_title")}
          </span>
        </div>
        {t("eco_cleaning_description")}
      </div>
      <div className="_text-center mb-16-mobile-8">
        <div className="modal-title-wrapper _text-center">
          <span className="text-gradient modal-title-text">
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
      <div className="modal-title-wrapper _text-center">
        <span className="text-gradient modal-title-text">
          {t("what_is_included")}
        </span>
      </div>
      <div className="_grid col-2-mobile-1 _gap-6">
        {ECO_CLEANING_BLOCKS.map(({ title, items }, index) => (
          <TextBlock key={index} title={title} items={items} t={t} />
        ))}
      </div>
      <div className="mt-16-mobile-8">
        <div className="modal-title-wrapper _text-center">
          <span className="modal-title-text text-gradient">{t("Prices")}</span>
        </div>
        <Costs
          t={t}
          redirectPathname={`order/${MAIN_CATEGORIES_URLS.GENERAL}?selectedService=${ALL_SERVICE.ECO}`}
          costs={ecoCosts}
          description="regular_price_description_mobile"
        />
      </div>
    </div>
  );
}

export default EcoCleaningModalContent;
