import { Writer } from "@/components/common/Writer";
import TextBlock from "@/components/MainPage/AllServices/Modals/TextBlock";
import React from "react";
import reactStringReplace from "react-string-replace";
import { FIGURE_BRACKETS_REGEX } from "@/constants";
import { TranslateFunction } from "@/types";

const DEEP_KITCHEN_BLOCKS = [
  {
    title: "what_cleaning_consists_of",
    items: [
      [
        "cleaning_the_fridge",
        "cleaning_the_oven",
        "cleaning_the_hood",
        "clean_the_microwave",
      ],
      [
        "cleaning_kitchen_cabinets",
        "cleaning_the_dishwasher",
        "cleaning_tiles",
        "window_cleaning",
      ],
      [
        "mopping_the_floor",
        "wiping_the_lights",
        "washing_the_dishes",
        "cleaning_the_fridge",
      ],
      [
        "kitchen_appliances",
        "window_cleaning",
        "vacuuming_the_floor",
        "getting_rid_of_trash",
      ],
    ],
  },
];

function DeepKitchenModalContent({ t }: { t: TranslateFunction }) {
  return (
    <div>
      <div className="wrapper-title-text _mb-20">
        <div className="wrapper-title text-gradient">
          <Writer text={t("deep_kitchen_cleaning_title")} />
        </div>
        <div className="wrapper-text">
          {reactStringReplace(
            t("deep_kitchen_description"),
            FIGURE_BRACKETS_REGEX,
            (match) => (
              <b>{match}</b>
            )
          )}
        </div>
      </div>
      {DEEP_KITCHEN_BLOCKS.map(({ title, items }, index) => (
        <TextBlock key={index} title={title} items={items} t={t} inline />
      ))}
    </div>
  );
}

export default DeepKitchenModalContent;
