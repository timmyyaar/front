"use client";

import TextBlock from "@/components/MainPage/AllServices/Modals/TextBlock";
import React, { useContext } from "react";
import { TranslateFunction } from "@/types";
import { PricesContext } from "@/components/Providers";
import Costs from "@/components/MainPage/AllServices/Modals/Costs";
import { ALL_SERVICE } from "@/components/OrderPage/constants";
import { MAIN_CATEGORIES_URLS } from "@/constants";

const WHILE_SICK_ITEMS = [
  "preventive_disinfection_treatment_to_surfaces",
  "change_bedsheets",
  "take_away_trash",
  "cleaning_and_disinfecting_sink_toilet",
  "washing_dirty_dishes",
  "air_ventilation",
];

function WhileSickModalContent({ t }: { t: TranslateFunction }) {
  const { prices } = useContext(PricesContext);

  const regularCosts = [
    {
      title: "1-bedroom",
      text: "One-time 1-bedroom cleaning",
      price: prices.defaultWhiteSickness,
    },
    {
      title: "2-bedroom",
      text: "One-time 2-bedroom cleaning",
      price: prices.defaultWhiteSickness + prices.whileSicknessBedroom,
    },
    {
      title: "3-bedroom",
      text: "One-time 3-bedroom cleaning",
      price: prices.defaultWhiteSickness + prices.whileSicknessBedroom * 2,
    },
  ];

  return (
    <>
      <div className="modal-title-wrapper _text-center">
        <span className="modal-title-text text-gradient">
          {t("what_is_included")}
        </span>
      </div>
      <TextBlock
        title="disinfection_treatment_and_cleaning"
        items={WHILE_SICK_ITEMS}
        t={t}
      />
      <div className="mt-16-mobile-8">
        <div className="modal-title-wrapper _text-center">
          <span className="modal-title-text text-gradient">{t("Prices")}</span>
        </div>
        <Costs
          t={t}
          redirectPathname={`order/${MAIN_CATEGORIES_URLS.HEALTHCARE}?selectedService=${ALL_SERVICE.WHILE_SICKNESS}`}
          costs={regularCosts}
          description="regular_price_description_mobile"
        />
      </div>
    </>
  );
}

export default WhileSickModalContent;
