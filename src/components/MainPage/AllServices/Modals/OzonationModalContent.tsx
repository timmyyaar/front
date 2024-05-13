import React, { useContext } from "react";
import { Writer } from "@/components/common/Writer";
import { TranslateFunction } from "@/types";
import Costs from "@/components/MainPage/AllServices/Modals/Costs";
import { PricesContext } from "@/components/Providers";
import { ALL_SERVICE } from "@/components/OrderPage/constants";
import {MAIN_CATEGORIES_URLS} from "@/constants";

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

function OzonationModalContent({ t }: { t: TranslateFunction }) {
  const { prices } = useContext(PricesContext);

  const ozonationCosts = [
    {
      isOzonation: true,
      title: (
        <span className="cost-price">
          {prices.ozonationSmallArea}
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
            <sup>2</sup> - {prices.ozonationSmallArea} zl
          </div>
          <div>
            {t("up_to")} 120 {t("m")}
            <sup>2</sup> - {prices.ozonationMediumArea} zl
          </div>
          <div>
            {`>`} 120 {t("m")}
            <sup>2</sup> - {prices.ozonationBigArea} zl
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="_text-center mb-16-mobile-8">
        <div className="modal-title-wrapper _text-center">
          <span className="modal-title-text text-gradient">
            {t("ozonation_of_premises")}
          </span>
        </div>
        {t("ozonation_description")}
      </div>
      <div className="_text-center mb-16-mobile-8">
        <div className="modal-title-wrapper _text-center">
          <span className="modal-title-text text-gradient">
            {t("how_the_air_in_the_apartment_is_ozonized")}
          </span>
        </div>
        {t("how_the_air_in_the_apartment_is_ozonized_description")}
      </div>
      <div className="modal-title-wrapper _text-center">
        <span className="modal-title-text text-gradient">
          {t("stages_of_preparing")}
        </span>
      </div>
      <div className="_grid _grid-cols-5 _mb-8 _gap-5 mobile-none">
        {OZONATION_BLOCKS.map(({ title, description }, i) => (
          <div className="step-card _relative">
            <div className="un-hover-block">
              <div className="number-wrapper _mb-3">
                <div className="number">{i + 1}</div>
              </div>
              <div className="name">
                <Writer text={t(title)} />
              </div>
            </div>
            <div className="hover-block _absolute _left-0 _text-center _px-2">
              {t(description)}
            </div>
          </div>
        ))}
      </div>
      <div className="_grid-cols-1 _mb-8 _gap-5 mobile-only-grid">
        {OZONATION_BLOCKS.map(({ title, description }, i) => (
          <div className="step-card">
            <div>
              <div className="number-wrapper _mb-3">
                <div className="number">{i + 1}</div>
              </div>
              <div className="name">
                <Writer text={t(description)} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="reminder_text mobile-none">
        {t("ozonation_reminder_text")}
      </div>
      <div className="mt-16-mobile-8">
        <div className="modal-title-wrapper _text-center">
          <span className="modal-title-text text-gradient">{t("Prices")}</span>
        </div>
        <Costs
          t={t}
          redirectPathname={`order/${MAIN_CATEGORIES_URLS.HEALTHCARE}?selectedService=${ALL_SERVICE.OZONATION}`}
          costs={ozonationCosts}
        />
      </div>
    </>
  );
}

export default OzonationModalContent;
