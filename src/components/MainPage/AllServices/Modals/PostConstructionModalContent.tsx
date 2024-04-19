import { Writer } from "@/components/common/Writer";
import reactStringReplace from "react-string-replace";
import { FIGURE_BRACKETS_REGEX } from "@/constants";
import TextBlock from "@/components/MainPage/AllServices/Modals/TextBlock";
import React from "react";

const POST_CUNSTRUCTION_CLEANING_BLOCKS = [
  {
    title: "bathroom_cleaning",
    items: [
      "we_eliminate_dust_on_all_surfaces_and_walls_excluding_the_ceiling",
      "we_perform_a_wet_cleaning_of_the_floor_tile_doors_radiators_mirrors",
      "effectively_remove_stains_from_construction_mixtures",
      "carry_out_the_collection_and_disposal_of_trash",
      "clean_furniture_both_inside_and_outside",
    ],
  },
  {
    title: "kitchen_cleaning",
    items: [
      "washing_window_sills_switches_radiators_baseboards_handles_doors",
      "wiping_down_all_surfaces_refrigerator_hood_kitchen_appliances",
      "removing_traces_and_stains_from_building_mixtures",
      "washing_fronts_and_furniture",
      "wiping_inside_of_cabinets_from_the_dust",
      "picking_up_all_the_trash",
    ],
  },
  {
    title: "residential_premises",
    items: [
      "we_conduct_a_thorough_cleaning_of_all_surfaces_and_walls_excluding_the_ceiling",
      "we_perform_a_damp_mop_of_the_floor_windowsills_radiators_doors_and_baseboards",
      "effectively_eliminate_traces_and_stains_from_construction_mixtures",
      "collect_and_dispose_of_trash",
    ],
  },
];

function PortConstructionModalContent({ t }) {
  return (
    <div>
      <div className="wrapper-title-text _mb-20">
        <div className="wrapper-title text-gradient">
          <Writer text={t("post_construction_cleaning")} />
        </div>
        <div className="wrapper-text">{t("post_construction_description")}</div>
      </div>
      <div className="_grid _grid-cols-2 _gap-6">
        {POST_CUNSTRUCTION_CLEANING_BLOCKS.map(({ title, items }, index) => (
          <TextBlock
            key={index}
            title={title}
            items={items}
            t={t}
            center={index === POST_CUNSTRUCTION_CLEANING_BLOCKS.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

export default PortConstructionModalContent;
