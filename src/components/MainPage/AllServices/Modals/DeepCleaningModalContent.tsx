import React from "react";
import TextBlock from "@/components/MainPage/AllServices/Modals/TextBlock";
import { TranslateFunction } from "@/types";

const DEEP_CLEANING_BLOCKS = [
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
      "wiping_inside_of_cabinets_from_the_dust",
      "washing_window_sills_switches_radiators_baseboards_handles_doors",
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
      "cleaning_the_interior_of_cabinets",
      "cleaning_the_fridge",
      "cleaning_the_oven",
      "cleaning_the_hood",
    ],
  },
  {
    title: "corridor_cleaning",
    items: [
      "cleaning_mirror",
      "wiping_all_accessible_and_exposed_surfaces_free_of_dust",
      "hanging_your_clothes_neatly",
      "wiping_inside_of_cabinets_from_the_dust",
      "arranging_the_shoes_neatly",
      "vacuuming_and_mopping_floors",
      "picking_up_all_the_trash",
      "washing_switches_radiators_baseboards_handles_doors",
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
      "wiping_inside_of_cabinets_from_the_dust",
      "washing_switches_radiators_baseboards_handles_doors",
    ],
  },
  {
    title: "balcony_cleaning",
    items: [
      "wiping_all_accessible_and_exposed_surfaces_free_of_dust",
      "cleaning_floors_and_railings",
      "balcony_glass_on_the_inside",
    ],
  },
];

function DeepCleaningModalContent({ t }: { t: TranslateFunction }) {
  return (
    <div className="_grid _grid-cols-2 _gap-6">
      {DEEP_CLEANING_BLOCKS.map(({ title, items }, index) => (
        <TextBlock
          key={index}
          title={title}
          items={items}
          t={t}
          center={index === DEEP_CLEANING_BLOCKS.length - 1}
        />
      ))}
    </div>
  );
}

export default DeepCleaningModalContent;
