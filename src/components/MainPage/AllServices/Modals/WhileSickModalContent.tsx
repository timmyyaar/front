import TextBlock from "@/components/MainPage/AllServices/Modals/TextBlock";
import React from "react";
import {TranslateFunction} from "@/types";

const WHILE_SICK_ITEMS = [
  "preventive_disinfection_treatment_to_surfaces",
  "change_bedsheets",
  "take_away_trash",
  "cleaning_and_disinfecting_sink_toilet",
  "washing_dirty_dishes",
  "air_ventilation",
];

function WhileSickModalContent({ t }: { t: TranslateFunction }) {
  return (
    <TextBlock
      title="disinfection_treatment_and_cleaning"
      items={WHILE_SICK_ITEMS}
      t={t}
    />
  );
}

export default WhileSickModalContent;
