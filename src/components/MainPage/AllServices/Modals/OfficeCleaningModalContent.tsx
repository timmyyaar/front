import TextBlock from "@/components/MainPage/AllServices/Modals/TextBlock";
import React from "react";

const OFFICE_CLEANING_BLOCKS = [
  {
    title: "floor_cleaning",
    items: [
      "vacuuming_carpets_and_carpeted_areas",
      "mopping_and_disinfecting_hard_floors_such_as_linoleum_tile_or_wood",
    ],
  },
  {
    title: "surface_cleaning",
    items: [
      "dusting_surfaces_of_furniture_tables_chairs_and_other_horizontal_surfaces",
      "cleaning_work_desks_mice_keyboards_and_other_items_at_workstations",
    ],
  },
  {
    title: "kitchen_and_common_areas",
    items: [
      "cleaning_kitchen_table_surfaces_sinks_and_other_kitchen_elements",
      "cleaning_common_areas_including_lobbies_halls_and_reception_areas",
    ],
  },
  {
    title: "restroom_cleaning",
    items: [
      "washing_and_disinfecting_toilets_sinks_floors_and_walls_in_restrooms",
      "maintaining_supplies_of_toilet_paper_soap_and_other_hygiene_products",
    ],
  },
  {
    title: "waste_removal",
    items: [
      "collecting_and_disposing_of_trash_from_office_spaces",
      "replacing_trash_bags",
    ],
  },
  {
    title: "cleaning_tech_devices",
    items: [
      "dusting_and_cleaning_computer_equipment_printers_scanners_and_other_devices",
    ],
  },
];

function OfficeCleaningModalContent({ t }) {
  return (
    <div className="_grid _grid-cols-2 _gap-6">
      {OFFICE_CLEANING_BLOCKS.map(({ title, items }, index) => (
        <TextBlock key={index} title={title} items={items} t={t} />
      ))}
    </div>
  );
}

export default OfficeCleaningModalContent;
