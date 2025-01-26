"use client";
import React from "react";
import Image from "next/image";

import { Slider } from "@/components/common/Slider";

import coffeeMachinePng from "@/assets/icons/sub-services/coffee-machine.png";
import spaceOrganizerPng from "@/assets/icons/sub-services/space-organizer.png";
import dishesPng from "@/assets/icons/sub-services/dishes.png";
import hoodPng from "@/assets/icons/sub-services/hood.png";
import fridgePng from "@/assets/icons/sub-services/fridge.png";
import extraTasksPng from "@/assets/icons/sub-services/extra-tasks.png";
import ironPng from "@/assets/icons/sub-services/iron.png";
import wardrobePng from "@/assets/icons/sub-services/wardrobe.png";
import laundryPng from "@/assets/icons/sub-services/laundry.png";
import microwavePng from "@/assets/icons/sub-services/microwave.png";
import ovenPng from "@/assets/icons/sub-services/oven.png";
import animalsTrayPng from "@/assets/icons/sub-services/animals-tray.png";
import balconyPng from "@/assets/icons/sub-services/balcony.png";
import plantsPng from "@/assets/icons/sub-services/plants.png";
import windowPng from "@/assets/icons/sub-services/window.png";
import kitchenCabinetsPng from "@/assets/icons/sub-services/kitchen-cabinets.png";

import { Writer } from "@/components/common/Writer";

export const AdditionalServices = (props: any) => {
  const { t } = props;
  const services = [
    { title: "Clean the oven", icons: ovenPng },
    { title: "Clean the fridge", icons: fridgePng },
    { title: "Clean the hood", icons: hoodPng },
    { title: "Clean the microwave", icons: microwavePng },
    { title: "Clean kitchen cabinets", icons: kitchenCabinetsPng },
    { title: "Wash the window", icons: windowPng },
    { title: "Wash the dishes", icons: dishesPng },
    { title: "Space organizer", icons: spaceOrganizerPng },
    { title: "Ironing", icons: ironPng },
    { title: "Clean coffee-machine", icons: coffeeMachinePng },
    { title: "Clean animal’s tray", icons: animalsTrayPng },
    { title: "Laundry", icons: laundryPng },
    { title: "Extra Tasks", icons: extraTasksPng },
    { title: "Water plants", icons: plantsPng },
    { title: "Wardrobe cleaning", icons: wardrobePng },
    { title: "Balcony", icons: balconyPng },
  ];

  const getItem = ({ title, icons }: any) => (
    <div
      className={`_rounded-2.5xl _bg-light _min-h-36 lg:_min-h-52 _w-full
        _flex _flex-col _justify-center _gap-5`}
    >
      <div className="_flex _justify-center">
        <div className="_h-10 _w-10 lg:_w-24 lg:_h-24 _relative">
          <Image fill src={icons} alt={title} />
        </div>
      </div>
      <div className="lg:_text-lg _text-center _font-semibold _px-4">
        <Writer text={t(title)} />
      </div>
    </div>
  );

  return (
    <div className="_px-5-percents lg:_px-24 _mb-14 lg:_mb-0">
      <div className="mobile-none">
        <div className="_main-title _mb-8">
          <span className="text-gradient">{t("Additional services")}</span>
        </div>
        <Slider elements={services.map((el) => getItem(el))} />
      </div>
      <div className="mobile-only">
        <div className="_main-title _mb-3">
          <b>
            <span className="text-gradient">{t("Additional services")}</span>
          </b>
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
