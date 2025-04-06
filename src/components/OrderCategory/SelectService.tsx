import React, { FC } from "react";
import Image from "next/image";

import { Writer } from "@/components/common/Writer";

import generalPng from "@/assets/icons/order-categories/general.png";
import hygienicPng from "@/assets/icons/order-categories/hygienic.png";
import specialPng from "@/assets/icons/order-categories/special.png";

import bubblesPng from "@/assets/icons/common/bubbles.png";

import girlPng from "@/assets/icons/main-cleaners/girl.png";
import boyPng from "@/assets/icons/main-cleaners/boy.png";
import { ALL_SERVICE } from "@/components/OrderPage/constants";

interface IProps {
  t: any;
  services: string[];
  setService: (service: string) => void;
}

const iconsSrc = {
  "General cleaning": generalPng,
  Healthcare: hygienicPng,
  "Special cleaning": specialPng,
};

const SERVICES_DESCRIPTION = {
  "General cleaning": [
    ALL_SERVICE.REGULAR,
    ALL_SERVICE.DEEP,
    ALL_SERVICE.POST_CONSTRUCTION,
    ALL_SERVICE.CUSTOM,
    ALL_SERVICE.OFFICE,
    ALL_SERVICE.ECO,
  ],
  Healthcare: [
    ALL_SERVICE.DRY,
    ALL_SERVICE.OZONATION,
    ALL_SERVICE.WHILE_SICKNESS,
  ],
  "Special cleaning": [
    ALL_SERVICE.WINDOW,
    ALL_SERVICE.MOVE_IN_OUT,
    ALL_SERVICE.DEEP_KITCHEN,
    ALL_SERVICE.AFTER_PARTY,
    ALL_SERVICE.AIRBNB,
  ],
};

const SelectService: FC<IProps> = (props) => {
  const { t, services, setService } = props;

  return (
    <div className="flex flex-col flex-1 w-full items-center justify-start relative lg:overflow-hidden">
      <div
        className={`flex flex-col lg:flex-row justify-center
          gap-10 w-full my-10 lg:mb-11 lg:mt-40 px-4 lg:px-0 lg:w-max`}
      >
        {services.map((el, index) => (
          <div
            className={`w-full lg:w-[25rem] shadow-md hover:shadow-custom-light-dark px-8 py-8 lg:py-12 flex
             flex-col justify-center items-center gap-6 rounded-3xl bg-light cursor-pointer z-10
              hover:bg-light-dark transition-all relative`}
            onClick={() => setService(el)}
            key={el + index}
          >
            {!Boolean(index) && (
              <>
                <Image
                  src={bubblesPng}
                  alt="Bubbles"
                  width="144"
                  height="144"
                  className="absolute hidden lg:block -left-16 -top-20 z-20"
                />
                <Image
                  src={bubblesPng}
                  alt="Bubbles"
                  width="144"
                  height="144"
                  className="absolute hidden lg:block -left-14 -bottom-20 z-20 bubble-left-bottom"
                />
              </>
            )}
            {index === services.length - 1 && (
              <>
                <Image
                  src={bubblesPng}
                  alt="Bubbles"
                  width="144"
                  height="144"
                  className="absolute hidden lg:block -right-16 -top-20 z-20 rotate-[-100deg]"
                />
                <Image
                  src={bubblesPng}
                  alt="Bubbles"
                  width="144"
                  height="144"
                  className="absolute hidden lg:block -right-16 -bottom-20 -rotate-6"
                />
              </>
            )}
            <div className="flex justify-center">
              {/* @ts-ignore */}
              <Image src={iconsSrc[el]} width={80} height={80} alt="" />
            </div>
            <div className="text-2xl text-center font-semibold">
              <Writer text={t(el)} />
            </div>
            <div className="text-center">
              {/* @ts-ignore */}
              {SERVICES_DESCRIPTION[el].map((item) => t(item)).join("; ")}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-28">
        <Image
          src={girlPng}
          alt="Girl"
          height="512"
          className="hidden lg:block relative -scale-x-100"
        />
        <Image
          src={boyPng}
          alt="Girl"
          height="512"
          className="hidden lg:block relative -scale-x-100"
        />
      </div>
    </div>
  );
};

export default SelectService;
