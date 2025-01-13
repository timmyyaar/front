"use client";

import TextBlock from "@/components/MainPage/AllServices/Modals/TextBlock";
import React, { useContext } from "react";
import { TranslateFunction } from "@/types";
import { PricesContext } from "@/components/Providers";
import Costs from "@/components/MainPage/AllServices/Modals/Costs";
import { ALL_SERVICE } from "@/components/OrderPage/constants";
import { CITIES, MAIN_CATEGORIES_URLS } from "@/constants";
import { useSearchParams } from "next/navigation";
import { getTransformedPrices } from "@/utils";

const DRY_CLEANING_BLOCKS = [
  {
    title: "deep_cleaning_and_stain_removal",
    items: [
      "effective_cleaning_of_various_fabric_types",
      "removal_of_stains_from_coffee_wine_oil_paint_and_other_contaminants",
    ],
  },
  {
    title: "anti_dust_treatment",
    items: [
      "professional_treatment_to_prevent_dust_and_allergen_buildup_on_furniture",
      "enhanced_hygiene_for_your_furniture",
    ],
  },
  {
    title: "disinfection_and_antiseptic_treatment",
    items: [
      "safe_furniture_treatment_to_eliminate_bacteria_and_microorganisms",
      "preventive_antiseptic_treatment_to_ward_off_unpleasant_odors",
    ],
  },
  {
    title: "using_a_furniture_dryer",
    items: ["we_employ_fans_and_air_exchange_systems"],
  },
];

function DryCleaningModalContent({
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

  const dryCosts = [
    {
      title: "Two-seater sofa",
      text: "dry_price_description",
      price: transformedPrices.subServiceTwoSeaterSofa,
    },
    {
      title: "Three-seater sofa",
      text: "dry_price_description",
      price: transformedPrices.subServiceThreeSeaterSofa,
    },
    {
      title: "Four-seater sofa",
      text: "dry_price_description",
      price: transformedPrices.subServiceFourSeaterSofa,
    },
  ];

  return (
    <>
      <div className="_mb-4 lg:_mb-6 _text-center">
        <span className="_main-title text-gradient">
          {t("what_is_included")}
        </span>
      </div>
      <div className="_grid _grid-cols-1 lg:_grid-cols-2 _gap-6">
        {DRY_CLEANING_BLOCKS.map(({ title, items }, index) => (
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
            redirectPathname={`order/${MAIN_CATEGORIES_URLS.HEALTHCARE}?selectedService=${ALL_SERVICE.DRY}${city ? `&city=${city}` : ""}`}
            costs={dryCosts}
            description="dry_price_description"
          />
        </div>
      )}
    </>
  );
}

export default DryCleaningModalContent;
