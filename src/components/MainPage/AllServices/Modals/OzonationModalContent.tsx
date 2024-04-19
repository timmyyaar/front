import React from "react";
import { Writer } from "@/components/common/Writer";

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

function OzonationModalContent({ t }) {
  return (
    <div>
      <div className="wrapper-title-text _mb-20">
        <div className="wrapper-title text-gradient">
          <Writer text={t("ozonation_of_premises")} />
        </div>
        <div className="wrapper-text">{t("ozonation_description")}</div>
      </div>
      <div className="wrapper-title-text _mb-8">
        <div className="wrapper-title text-gradient">
          <Writer text={t("how_the_air_in_the_apartment_is_ozonized")} />
        </div>
        <div className="wrapper-text">
          {t("how_the_air_in_the_apartment_is_ozonized_description")}
        </div>
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
    </div>
  );
}

export default OzonationModalContent;
