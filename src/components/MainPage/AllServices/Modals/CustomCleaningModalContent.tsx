import reactStringReplace from "react-string-replace";
import {FIGURE_BRACKETS_REGEX, MAIN_CATEGORIES_URLS} from "@/constants";
import React, { useContext } from "react";
import { TranslateFunction } from "@/types";
import { PricesContext } from "@/components/Providers";
import Costs from "@/components/MainPage/AllServices/Modals/Costs";
import { ALL_SERVICE } from "@/components/OrderPage/constants";

function CustomCleaningModalContent({ t }: { t: TranslateFunction }) {
  const { prices } = useContext(PricesContext);

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
        <div className="modal-title-wrapper _text-center">
          <span className="modal-title-text text-gradient">
            {t("custom_cleaning_title")}
          </span>
        </div>
        {reactStringReplace(
          t("custom_cleaning_description"),
          FIGURE_BRACKETS_REGEX,
          (match) => (
            <b>{match}</b>
          )
        )}
      </div>
      <div className="mt-16-mobile-8">
        <div className="modal-title-wrapper _text-center">
          <span className="modal-title-text text-gradient">{t("Prices")}</span>
        </div>
        <Costs
          t={t}
          redirectPathname={`order/${MAIN_CATEGORIES_URLS.GENERAL}?selectedService=${ALL_SERVICE.CUSTOM}`}
          costs={customCosts}
        />
      </div>
    </>
  );
}

export default CustomCleaningModalContent;
