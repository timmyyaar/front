import React, { useContext } from "react";
import reactStringReplace from "react-string-replace";
import {FIGURE_BRACKETS_REGEX, MAIN_CATEGORIES_URLS} from "@/constants";
import { TranslateFunction } from "@/types";
import { PricesContext } from "@/components/Providers";
import Costs from "@/components/MainPage/AllServices/Modals/Costs";
import { ALL_SERVICE } from "@/components/OrderPage/constants";

function AirbnbModalContent({ t }: { t: TranslateFunction }) {
  const { prices } = useContext(PricesContext);

  const airbnbCosts = [
    {
      title: "1-bedroom",
      text: "One-time 1-bedroom cleaning",
      price: prices.defaultAirbnb,
    },
    {
      title: "2-bedroom",
      text: "One-time 2-bedroom cleaning",
      price: prices.defaultAirbnb + prices.airbnbBedroom,
    },
    {
      title: "3-bedroom",
      text: "One-time 3-bedroom cleaning",
      price: prices.defaultAirbnb + prices.airbnbBedroom * 2,
    },
  ];

  return (
    <>
      <div className="_text-center">
        <div className="modal-title-wrapper _text-center">
          <span className="modal-title-text text-gradient">
            {t("airbnb_title")}
          </span>
        </div>
        <div className="mb-16-mobile-8">
          {reactStringReplace(
            t("airbnb_description"),
            FIGURE_BRACKETS_REGEX,
            (match) => (
              <b>{match}</b>
            )
          )}
        </div>
        <div className="modal-title-wrapper _text-center">
          <span className="modal-title-text text-gradient">
            {t("stages_of_preparing")}
          </span>
        </div>
      </div>
      <div className="_flex _flex-row _justify-between airbnb-mobile _gap-5">
        {["Prepare", "Cleaning", "Sanitize", "Finish"].map((el, i) => (
          <div className="step-card">
            <div className="number-wrapper">
              <div className="number">{i + 1}</div>
            </div>
            <div className="name">{t(el + "_airbnb_title")}</div>
          </div>
        ))}
      </div>
      <div className="mt-16-mobile-8">
        <div className="modal-title-wrapper _text-center">
          <span className="modal-title-text text-gradient">{t("Prices")}</span>
        </div>
        <Costs
          t={t}
          redirectPathname={`order/${MAIN_CATEGORIES_URLS.SPECIAL}?selectedService=${ALL_SERVICE.AIRBNB}`}
          costs={airbnbCosts}
          description="regular_price_description_mobile"
        />
      </div>
    </>
  );
}

export default AirbnbModalContent;
