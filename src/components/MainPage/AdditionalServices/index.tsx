"use client";
import React from "react";
import Image from "next/image";

import { Slider } from "@/components/common/Slider";

import coffeeMachineSvg from "./icons/coffee-machine.svg";
import cleanClothesSvg from "./icons/clean-clothes.svg";
import cleanDishesSvg from "./icons/clean-dishes.svg";
import closetSvg from "./icons/closet.svg";
import cookerHoodSvg from "./icons/cooker-hood.svg";
import fridgeSvg from "./icons/fridge.svg";
import hoursglassSvg from "./icons/hoursglass.svg";
import ironSvg from "./icons/iron.svg";
import kitchenCabinets from "./icons/kitchen-cabinets.svg";
import laundrySvg from "./icons/laundry.svg";
import microwaveSvg from "./icons/microwave.svg";
import ovenSvg from "./icons/oven.svg";
import petToiletTraySvg from "./icons/pet-toilet-tray.svg";
import SlowCooker from "./icons/slow-cooker.svg";
import wateringPlantsSvg from "./icons/watering-plants.svg";
import windowSvg from "./icons/window.svg";

import { Writer } from "@/components/common/Writer";

export const AdditionalServices = (props: any) => {
  const { t } = props;
  const services = [
    { title: "Clean the oven", icons: ovenSvg },
    { title: "Clean the fridge", icons: fridgeSvg },
    { title: "Clean the hood", icons: cookerHoodSvg },
    { title: "Clean the microwave", icons: microwaveSvg },
    { title: "Clean kitchen cabinets", icons: kitchenCabinets },
    { title: "Wash the window", icons: windowSvg },
    { title: "Wash the dishes", icons: cleanDishesSvg },
    { title: "Space organizer", icons: cleanClothesSvg },
    { title: "Ironing", icons: ironSvg },
    { title: "Clean coffee-machine", icons: coffeeMachineSvg },
    { title: "Clean animal’s tray", icons: petToiletTraySvg },
    { title: "Laundry", icons: laundrySvg },
    { title: "Extra Tasks", icons: hoursglassSvg },
    { title: "Water plants", icons: wateringPlantsSvg },
    { title: "Wardrobe cleaning", icons: closetSvg },
    { title: "Clean slow-cooker", icons: SlowCooker },
  ];

  const getItem = ({ title, icons }: any) => (
    <div
      className={`_rounded-2.5xl _bg-light _min-h-36 lg:_min-h-52 _w-full
        _flex _flex-col _justify-center _gap-5`}
    >
      <div className="_flex _justify-center">
        <Image src={icons} alt="" className="_h-9 _w-9 lg:_h-auto lg:_w-auto" />
      </div>
      <div className="lg:_text-lg _text-center _font-semibold _px-4">
        <Writer text={t(title)} />
      </div>
    </div>
  );

  return (
    <div className="_px-5-percents lg:_px-24 _mb-14 lg:_mb-0">
      <div className="mobile-none">
        <div className="_main-title _mb-8">{t("Additional services")}</div>
        <Slider elements={services.map((el) => getItem(el))} />
      </div>
      <div className="mobile-only">
        <div className="_main-title _mb-3">
          <b>{t("Additional services")}</b>
        </div>
        <div className="_grid _grid-cols-2 _gap-6">
          {services.map((el, i) => (
            <div key={JSON.stringify(el) + i}>
              {getItem({ ...el, title: el.title + "_mobile" })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
