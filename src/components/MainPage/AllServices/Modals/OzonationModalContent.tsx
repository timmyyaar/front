"use client";

import React, { useContext } from "react";
import { Writer } from "@/components/common/Writer";
import { TranslateFunction } from "@/types";
import Costs from "@/components/MainPage/AllServices/Modals/Costs";
import { PricesContext } from "@/components/Providers";
import { ALL_SERVICE } from "@/components/OrderPage/constants";
import { CITIES, MAIN_CATEGORIES_URLS } from "@/constants";
import { useSearchParams } from "next/navigation";
import { getTransformedPrices } from "@/utils";

const OZONATION_BLOCKS = [
  {
    title: "wet_cleaning_and_sealing_of_rooms",
    description: "wet_cleaning_and_sealing_of_rooms_description",
  },
  {
    title: "isolation_of_pets_and_indoor_plants",
    description: "isolation_of_pets_and_indoor_plants_description",
  },
  {
    title: "covering_artwork_and_protect_electronic_equipment",
    description:
      "covering_artwork_and_protect_electronic_equipment_description",
  },
  {
    title: "adjustment_of_the_equipment_for_work",
    description: "adjustment_of_the_equipment_for_work_description",
  },
  { title: "ventilation", description: "ventilation_description" },
];

function OzonationModalContent({
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

  const ozonationCosts = [
    {
      isOzonation: true,
      title: (
        <span className="text-2lx font-bold">
          {transformedPrices.ozonationSmallArea}
          <span className="ml-1">
            {t("zl")}/{t("m")}
            <sup>2</sup>
          </span>
        </span>
      ),
      text: (
        <>
          <div>
            {t("up_to")} 50 {t("m")}
            <sup>2</sup> - {transformedPrices.ozonationSmallArea} zl
          </div>
          <div>
            {t("up_to")} 120 {t("m")}
            <sup>2</sup> - {transformedPrices.ozonationMediumArea} zl
          </div>
          <div>
            {`>`} 120 {t("m")}
            <sup>2</sup> - {transformedPrices.ozonationBigArea} zl
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="text-center mb-8 lg:mb-16">
        <div className="mb-4 lg:mb-6 text-center">
          <span className="main-title text-gradient">
            {t("ozonation_of_premises")}
          </span>
        </div>
        {t("ozonation_description")}
      </div>
      <div className="text-center mb-8 lg:mb-16">
        <div className="mb-4 lg:mb-6 text-center">
          <span className="main-title text-gradient">
            {t("how_the_air_in_the_apartment_is_ozonized")}
          </span>
        </div>
        {t("how_the_air_in_the_apartment_is_ozonized_description")}
      </div>
      <div className="mb-4 lg:mb-6 text-center">
        <span className="main-title text-gradient">
          {t("stages_of_preparing")}
        </span>
      </div>
      <div className="grid grid-cols-5 mb-8 gap-5 mobile-none">
        {OZONATION_BLOCKS.map(({ title, description }, i) => (
          <div
            className={`group hover:bg-light-dark active:bg-light-dark flex flex-col flex-1 gap-4
                py-11 px-5 bg-light rounded-xl relative`}
          >
            <div className="visible group-hover:invisible">
              <div className="flex justify-center mb-3">
                <div
                  className={`w-10 h-10 flex justify-center items-center
                    rounded-full bg-primary text-white`}
                >
                  {i + 1}
                </div>
              </div>
              <div className="text-center font-medium">
                <Writer text={t(title)} />
              </div>
            </div>
            <div
              className={`invisible group-hover:visible absolute
                left-0 text-center px-2`}
            >
              {t(description)}
            </div>
          </div>
        ))}
      </div>
      <div className="grid-cols-1 mb-8 gap-5 mobile-only-grid">
        {OZONATION_BLOCKS.map(({ title, description }, i) => (
          <div
            className={`hover:bg-light-dark active:bg-light-dark flex flex-col flex-1 gap-4 py-11
              px-5 bg-light rounded-xl`}
          >
            <div>
              <div className="flex justify-center mb-3">
                <div
                  className={`w-10 h-10 flex justify-center items-center
                    rounded-full bg-primary text-white`}
                >
                  {i + 1}
                </div>
              </div>
              <div className="text-center font-medium">
                <Writer text={t(description)} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mobile-none text-gray-dark text-sm text-center">
        {t("ozonation_reminder_text")}
      </div>
      {!isOrder && (
        <div className="mt-8 lg:mt-16">
          <div className="mb-4 lg:mb-6 text-center">
            <span className="main-title text-gradient">{t("Prices")}</span>
          </div>
          <Costs
            t={t}
            redirectPathname={`order/${MAIN_CATEGORIES_URLS.HEALTHCARE}?selectedService=${ALL_SERVICE.OZONATION}${city ? `&city=${city}` : ""}`}
            costs={ozonationCosts}
          />
        </div>
      )}
    </>
  );
}

export default OzonationModalContent;
