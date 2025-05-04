import React, { FC } from "react";
import Image from "next/image";

import OzonSvg from "./icons/ozone-layer.svg";
import CleanSvg from "./icons/rectangle.svg";

import ozonationPng from '@/assets/icons/main-services/ozonation.png'
import dryPng from '@/assets/icons/main-services/dry.png'

import caretUpSvg from "./icons/caret-up.svg";
import { getAdditionalServices } from "./utils";

interface IProps {
  mainService: string;
  setSecondService: (props: any) => void;
  t: any;
  children: any;
  selectedSecondService: string;
}

export { getAdditionalServices };

export const AddedMainService: FC<IProps> = (props) => {
  const { mainService, selectedSecondService, setSecondService, t, children } =
    props;
  const addService = getAdditionalServices(mainService);
  const isOzonation = addService === "ADD OZONATION SERVICE";

  const onClickSecondService = () => {
    setSecondService((prevSecondService: string) => {
      if (prevSecondService) {
        return "";
      } else {
        return isOzonation ? "Ozonation" : "Dry cleaning";
      }
    });
  };

  return addService ? (
    <div>
      <div
        className="group min-h-[4.5rem] lg:min-h-0 px-3 lg:px-24 gap-2 lg:gap-5 flex justify-center lg:justify-between items-center rounded-xl bg-light cursor-pointer"
        onClick={onClickSecondService}
      >
        <div className="flex items-center select-none w-11 lg:w-20">
          <Image src={isOzonation ? ozonationPng : dryPng} alt="" />
        </div>
        <div
          className={`text-center group-hover:text-primary lg:text-xl font-semibold
           transition-all ${selectedSecondService ? "text-primary" : ""}`}
        >
          {t(addService)}
        </div>
        <div
          className={`transition-all duration-300 h-7 w-7 lg:h-auto lg:w-auto ${
            selectedSecondService ? "" : "rotate-x-180"
          }`}
        >
          <Image src={caretUpSvg} alt="" />
        </div>
      </div>
      {selectedSecondService ? (
        <div className="mt-6 flex justify-center">{children}</div>
      ) : null}
    </div>
  ) : null;
};
