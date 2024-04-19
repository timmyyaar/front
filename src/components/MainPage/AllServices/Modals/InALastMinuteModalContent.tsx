import { Writer } from "@/components/common/Writer";
import TextBlock from "@/components/MainPage/AllServices/Modals/TextBlock";
import React from "react";
import { TranslateFunction } from "@/types";

const IN_A_LAST_MINUTE_BLOCKS = [
  {
    title: "bedroom_cleaning",
    items: [
      "wiping_down_mirrors_and_frames",
      "removing_dust_from_all_accessible_lamps",
      "arranging_household_items",
      "dusting_all_the_surfaces",
      "picking_up_all_the_trash",
      "making_the_bed",
      "vacuuming_and_mopping_floors",
    ],
  },
  {
    title: "kitchen_cleaning",
    items: [
      "washing_window_sills_switches_radiators_baseboards_handles_doors",
      "wiping_down_all_surfaces_refrigerator_hood_kitchen_appliances",
      "washing_dirty_dishes_in_the_sink",
      "washing_fronts_and_furniture",
      "mopping_the_floor",
    ],
  },
  {
    title: "corridor_cleaning",
    items: [
      "cleaning_mirror",
      "wiping_all_accessible_and_exposed_surfaces_free_of_dust",
      "arranging_the_shoes_neatly",
      "vacuuming_and_mopping_floors",
      "picking_up_all_the_trash",
    ],
  },
  {
    title: "bathroom_cleaning",
    items: [
      "wiping_the_mirrors_and_glass_surfaces",
      "cleaning_and_disinfecting_sink_toilet_shower_and_bathtub",
      "removing_slight_limescale",
      "laying_things_out_neatly",
      "mopping_the_floor",
    ],
  },
];

function InALastMinuteModalContent({ t }: { t: TranslateFunction }) {
  return (
    <div>
      <div className="wrapper-title-text _mb-20">
        <div className="wrapper-title text-gradient">
          <Writer text={t("in_a_last_minute_title")} />
        </div>
        <div className="wrapper-text">{t("in_a_last_minute_description")}</div>
      </div>
      <div className="_grid _grid-cols-2 _gap-6">
        {IN_A_LAST_MINUTE_BLOCKS.map(({ title, items }, index) => (
          <TextBlock key={index} title={title} items={items} t={t} />
        ))}
      </div>
    </div>
  );
}

export default InALastMinuteModalContent;
