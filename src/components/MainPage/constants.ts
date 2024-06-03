const REGULAR_BEDROOM_ITEMS = [
  "wiping_down_mirrors_and_frames",
  "removing_dust_from_all_accessible_lamps",
  "arranging_household_items",
  "dusting_all_the_surfaces",
  "picking_up_all_the_trash",
  "making_the_bed",
  "vacuuming_and_mopping_floors",
  "washing_window_sills_switches_radiators_baseboards_handles_doors",
];

const REGULAR_KITCHEN_ITEMS = [
  "washing_window_sills_switches_radiators_baseboards_handles_doors",
  "wiping_down_all_surfaces_refrigerator_hood_kitchen_appliances",
  "washing_dirty_dishes_in_the_sink",
  "washing_fronts_and_furniture",
  "mopping_the_floor",
];

const REGULAR_CORRIDOR_ITEMS = [
  "cleaning_mirror",
  "wiping_all_accessible_and_exposed_surfaces_free_of_dust",
  "arranging_the_shoes_neatly",
  "vacuuming_and_mopping_floors",
  "picking_up_all_the_trash",
  "washing_switches_radiators_baseboards_handles_doors",
];

const REGULAR_BATHROOM_ITEMS = [
  "wiping_the_mirrors_and_glass_surfaces",
  "cleaning_and_disinfecting_sink_toilet_shower_and_bathtub",
  "removing_slight_limescale",
  "laying_things_out_neatly",
  "mopping_the_floor",
  "washing_switches_radiators_baseboards_handles_doors",
];

export const HOW_IT_WORKS_TEXTS = {
  Regular: {
    Bedroom: REGULAR_BEDROOM_ITEMS,
    Kitchen: REGULAR_KITCHEN_ITEMS,
    Corridor: REGULAR_CORRIDOR_ITEMS,
    Bathroom: REGULAR_BATHROOM_ITEMS,
  },
  Deep: {
    Bedroom: [
      ...REGULAR_BEDROOM_ITEMS,
      "wiping_inside_of_cabinets_from_the_dust",
    ],
    Kitchen: [
      ...REGULAR_KITCHEN_ITEMS,
      "cleaning_the_interior_of_cabinets",
      "cleaning_the_fridge",
      "cleaning_the_oven",
      "cleaning_the_hood",
    ],
    Corridor: [
      ...REGULAR_CORRIDOR_ITEMS,
      "hanging_your_clothes_neatly",
      "wiping_inside_of_cabinets_from_the_dust",
    ],
    Bathroom: [
      ...REGULAR_BATHROOM_ITEMS,
      "wiping_inside_of_cabinets_from_the_dust",
    ],
    Balcony: [
      "wiping_all_accessible_and_exposed_surfaces_free_of_dust",
      "cleaning_floors_and_railings",
      "balcony_glass_on_the_inside",
    ],
  },
  Basic: {
    Bedroom: REGULAR_BEDROOM_ITEMS.filter(
      (item) =>
        item !==
        "washing_window_sills_switches_radiators_baseboards_handles_doors"
    ),
    Kitchen: REGULAR_KITCHEN_ITEMS,
    Corridor: REGULAR_CORRIDOR_ITEMS.filter(
      (item) => item !== "washing_switches_radiators_baseboards_handles_doors"
    ),
    Bathroom: REGULAR_BATHROOM_ITEMS.filter(
        (item) => item !== "washing_switches_radiators_baseboards_handles_doors"
    ),
  },
};
