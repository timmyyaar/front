import TextBlock from "@/components/MainPage/AllServices/Modals/TextBlock";
import React from "react";
import { TranslateFunction } from "@/types";

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

function DryCleaningModalContent({ t }: { t: TranslateFunction }) {
  return (
    <div className="_grid col-2-mobile-1 _gap-6">
      {DRY_CLEANING_BLOCKS.map(({ title, items }, index) => (
        <TextBlock key={index} title={title} items={items} t={t} />
      ))}
    </div>
  );
}

export default DryCleaningModalContent;
