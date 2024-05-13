import TextBlock from "@/components/MainPage/AllServices/Modals/TextBlock";
import React, { useContext } from "react";
import { TranslateFunction } from "@/types";
import { PricesContext } from "@/components/Providers";
import Costs from "@/components/MainPage/AllServices/Modals/Costs";
import { ALL_SERVICE } from "@/components/OrderPage/constants";
import { MAIN_CATEGORIES_URLS } from "@/constants";

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

function PortConstructionModalContent({ t }: { t: TranslateFunction }) {
  const { prices } = useContext(PricesContext);

  const postConstructionCosts = [
    {
      title: (
        <span className="cost-price">
          {prices.postConstructionSquareMeter}
          <span className="_ml-1">
            {t("zl")}/{t("m")}
            <sup>2</sup>
          </span>
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="_text-center mb-16-mobile-8">
        <div className="modal-title-wrapper _text-center">
          <span className="modal-title-text text-gradient">
            {t("post_construction_cleaning")}
          </span>
        </div>
        {t("post_construction_description")}
      </div>
      <div className="modal-title-wrapper _text-center">
        <span className="modal-title-text text-gradient">
          {t("what_is_included")}
        </span>
      </div>
      <div className="_grid col-2-mobile-1 _gap-6">
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
      <div className="mt-16-mobile-8">
        <div className="modal-title-wrapper _text-center">
          <span className="modal-title-text text-gradient">{t("Prices")}</span>
        </div>
        <Costs
          t={t}
          redirectPathname={`order/${MAIN_CATEGORIES_URLS.GENERAL}?selectedService=${ALL_SERVICE.POST_CONSTRUCTION}`}
          costs={postConstructionCosts}
        />
      </div>
    </>
  );
}

export default PortConstructionModalContent;
