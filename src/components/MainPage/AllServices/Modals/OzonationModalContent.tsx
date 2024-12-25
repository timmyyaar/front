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
        <span className="_text-2lx _font-bold">
          {transformedPrices.ozonationSmallArea}
          <span className="_ml-1">
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
      <div className="_text-center _mb-8 lg:_mb-16">
        <div className="_mb-4 lg:_mb-6 _text-center">
          <span className="_main-title text-gradient">
            {t("ozonation_of_premises")}
          </span>
        </div>
        {t("ozonation_description")}
      </div>
      <div className="_text-center _mb-8 lg:_mb-16">
        <div className="_mb-4 lg:_mb-6 _text-center">
          <span className="_main-title text-gradient">
            {t("how_the_air_in_the_apartment_is_ozonized")}
          </span>
        </div>
        {t("how_the_air_in_the_apartment_is_ozonized_description")}
      </div>
      <div className="_mb-4 lg:_mb-6 _text-center">
        <span className="_main-title text-gradient">
          {t("stages_of_preparing")}
        </span>
      </div>
      <div className="_grid _grid-cols-5 _mb-8 _gap-5 mobile-none">
        {OZONATION_BLOCKS.map(({ title, description }, i) => (
          <div
            className={`_group hover:_bg-light-dark active:_bg-light-dark _flex _flex-col _flex-1 _gap-4
                _py-11 _px-5 _bg-light _rounded-xl _relative`}
          >
            <div className="_visible group-hover:_invisible">
              <div className="_flex _justify-center _mb-3">
                <div
                  className={`_w-10 _h-10 _flex _justify-center _items-center
                    _rounded-full _bg-primary _text-white`}
                >
                  {i + 1}
                </div>
              </div>
              <div className="_text-center _font-medium">
                <Writer text={t(title)} />
              </div>
            </div>
            <div
              className={`_invisible group-hover:_invisible _absolute
                _left-0 _text-center _px-2`}
            >
              {t(description)}
            </div>
          </div>
        ))}
      </div>
      <div className="_grid-cols-1 _mb-8 _gap-5 mobile-only-grid">
        {OZONATION_BLOCKS.map(({ title, description }, i) => (
          <div
            className={`hover:_bg-light-dark active:_bg-light-dark _flex _flex-col _flex-1 _gap-4 _py-11
              _px-5 _bg-light _rounded-xl`}
          >
            <div>
              <div className="_flex _justify-center _mb-3">
                <div
                  className={`_w-10 _h-10 _flex _justify-center _items-center
                    _rounded-full _bg-primary _text-white`}
                >
                  {i + 1}
                </div>
              </div>
              <div className="_text-center _font-medium">
                <Writer text={t(description)} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mobile-none _text-gray-dark _text-sm _text-center">
        {t("ozonation_reminder_text")}
      </div>
      {!isOrder && (
        <div className="_mt-8 lg:_mt-16">
          <div className="_mb-4 lg:_mb-6 _text-center">
            <span className="_main-title text-gradient">{t("Prices")}</span>
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
