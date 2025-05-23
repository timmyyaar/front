"use client";

import TextBlock from "@/components/MainPage/AllServices/Modals/TextBlock";
import React, { useContext } from "react";
import { TranslateFunction } from "@/types";
import Costs from "@/components/MainPage/AllServices/Modals/Costs";
import { PricesContext } from "@/components/Providers";
import { ALL_SERVICE } from "@/components/OrderPage/constants";
import { CITIES, MAIN_CATEGORIES_URLS } from "@/constants";
import { useSearchParams } from "next/navigation";
import { getTransformedPrices } from "@/utils";

const OFFICE_CLEANING_BLOCKS = [
  {
    title: "floor_cleaning",
    items: [
      "vacuuming_carpets_and_carpeted_areas",
      "mopping_and_disinfecting_hard_floors_such_as_linoleum_tile_or_wood",
    ],
  },
  {
    title: "surface_cleaning",
    items: [
      "dusting_surfaces_of_furniture_tables_chairs_and_other_horizontal_surfaces",
      "cleaning_work_desks_mice_keyboards_and_other_items_at_workstations",
    ],
  },
  {
    title: "kitchen_and_common_areas",
    items: [
      "cleaning_kitchen_table_surfaces_sinks_and_other_kitchen_elements",
      "cleaning_common_areas_including_lobbies_halls_and_reception_areas",
    ],
  },
  {
    title: "restroom_cleaning",
    items: [
      "washing_and_disinfecting_toilets_sinks_floors_and_walls_in_restrooms",
      "maintaining_supplies_of_toilet_paper_soap_and_other_hygiene_products",
    ],
  },
  {
    title: "waste_removal",
    items: [
      "collecting_and_disposing_of_trash_from_office_spaces",
      "replacing_trash_bags",
    ],
  },
  {
    title: "cleaning_tech_devices",
    items: [
      "dusting_and_cleaning_computer_equipment_printers_scanners_and_other_devices",
    ],
  },
];

function OfficeCleaningModalContent({
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

  const officeCosts = [
    {
      title: (
        <span className="text-2lx font-bold">
          {transformedPrices.officeSquareMeter}
          <span className="ml-1">
            {t("zl")}/{t("m")}
            <sup>2</sup>
          </span>
        </span>
      ),
      text: "office_price_description",
    },
  ];

  return (
    <>
      <div className="text-center mb-6">
        <div className="mb-4 lg:mb-6">
          <span className="text-gradient main-title">{t("Office")}</span>
        </div>
        {t("office_cleaning_description")}
      </div>
      <div className="mb-4 lg:mb-6 text-center">
        <span className="main-title text-gradient">
          {t("what_is_included")}
        </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {OFFICE_CLEANING_BLOCKS.map(({ title, items }, index) => (
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
            redirectPathname={`order/${MAIN_CATEGORIES_URLS.GENERAL}?selectedService=${ALL_SERVICE.OFFICE}${city ? `&city=${city}` : ""}`}
            costs={officeCosts}
          />
        </div>
      )}
    </>
  );
}

export default OfficeCleaningModalContent;
