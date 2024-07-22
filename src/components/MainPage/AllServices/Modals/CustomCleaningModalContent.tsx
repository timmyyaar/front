"use client";

import reactStringReplace from "react-string-replace";
import { FIGURE_BRACKETS_REGEX, MAIN_CATEGORIES_URLS } from "@/constants";
import React, { useContext } from "react";
import { TranslateFunction } from "@/types";
import { PricesContext } from "@/components/Providers";
import Costs from "@/components/MainPage/AllServices/Modals/Costs";
import { ALL_SERVICE } from "@/components/OrderPage/constants";
import { useSearchParams } from "next/navigation";

function CustomCleaningModalContent({
  t,
  isOrder,
}: {
  t: TranslateFunction;
  isOrder?: boolean;
}) {
  const { prices } = useContext(PricesContext);
  const searchParams = useSearchParams();
  const city = searchParams.get("city");

  const customCosts = [
    {
      title: (
        <>
          {t("minimal_price")} {prices.minimalCustom}
          {t("zl")}
        </>
      ),
    },
  ];

  return (
    <>
      <div className="_text-center">
        <div className="_mb-4 lg:_mb-6 _text-center">
          <span className="_main-title text-gradient">
            {t("custom_cleaning_title")}
          </span>
        </div>
        {reactStringReplace(
          t("custom_cleaning_description"),
          FIGURE_BRACKETS_REGEX,
          (match) => (
            <b>{match}</b>
          ),
        )}
      </div>
      {!isOrder && (
        <div className="_mt-8 lg:_mt-16">
          <div className="_mb-4 lg:_mb-6 _text-center">
            <span className="_main-title text-gradient">{t("Prices")}</span>
          </div>
          <Costs
            t={t}
            redirectPathname={`order/${MAIN_CATEGORIES_URLS.GENERAL}?selectedService=${ALL_SERVICE.CUSTOM}${city ? `&city=${city}` : ""}`}
            costs={customCosts}
          />
        </div>
      )}
    </>
  );
}

export default CustomCleaningModalContent;
