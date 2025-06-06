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

const AFTER_PARTY_BLOCKS = [
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

function AfterPartyModalContent({
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

  const generalAfterPartyPrice =
    transformedPrices.defaultAfterParty +
    transformedPrices.subServiceBalcony * 5 +
    transformedPrices.subServiceOven +
    transformedPrices.subServiceKitchenCabinets +
    transformedPrices.subServiceFridge +
    transformedPrices.subServiceMicrowave +
    transformedPrices.subServiceDishes;

  const afterPartyCosts = [
    {
      title: "1-bedroom",
      text: "deep_price_description",
      price: generalAfterPartyPrice,
    },
    {
      title: "2-bedroom",
      text: "deep_price_description",
      price: generalAfterPartyPrice + transformedPrices.afterPartyBedroom,
    },
    {
      title: "3-bedroom",
      text: "deep_price_description",
      price: generalAfterPartyPrice + transformedPrices.afterPartyBedroom * 2,
    },
  ];

  return (
    <>
      <div className="text-center mb-8 lg:mb-16">
        <div className="mb-4 lg:mb-6 text-center">
          <span className="main-title text-gradient">
            {t("after_party_title")}
          </span>
        </div>
        {t("after_party_description")}
      </div>
      <div className="mb-4 lg:mb-6 text-center">
        <span className="main-title text-gradient">
          {t("what_is_included")}
        </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {AFTER_PARTY_BLOCKS.map(({ title, items }, index) => (
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
            redirectPathname={`order/${MAIN_CATEGORIES_URLS.SPECIAL}?selectedService=${ALL_SERVICE.AFTER_PARTY}${city ? `&city=${city}` : ""}`}
            costs={afterPartyCosts}
            description="deep_price_description"
          />
        </div>
      )}
    </>
  );
}

export default AfterPartyModalContent;
