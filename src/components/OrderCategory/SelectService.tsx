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
    <div className="_flex _flex-col _flex-1 _w-full _items-center _justify-start _relative lg:_overflow-hidden">
      <div
        className={`_flex _flex-col lg:_flex-row _justify-center
          _gap-10 _w-full _my-10 lg:_mb-11 lg:_mt-40 _px-4 lg_px-0 lg:_w-max`}
      >
        {services.map((el, index) => (
          <div
            className={`_w-full lg:_w-[25rem] _shadow-md hover:_shadow-custom-light-dark _px-8 lg_px-16 _py-8 lg:_py-12 _flex
             _flex-col _justify-center _items-center _gap-6 _rounded-3xl _bg-light _cursor-pointer _z-10
              hover:_bg-light-dark _transition-all _relative`}
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
                  className="_absolute _hidden lg:_block _-left-16 _-top-20 _z-20"
                />
                <Image
                  src={bubblesPng}
                  alt="Bubbles"
                  width="144"
                  height="144"
                  className="_absolute _hidden lg:_block _-left-14 _-bottom-20 _z-20 bubble-left-bottom"
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
                  className="_absolute _hidden lg:_block _-right-16 _-top-20 _z-20 _rotate-[-100deg]"
                />
                <Image
                  src={bubblesPng}
                  alt="Bubbles"
                  width="144"
                  height="144"
                  className="_absolute _hidden lg:_block _-right-16 _-bottom-20 _-rotate-6"
                />
              </>
            )}
            <div className="_flex _justify-center">
              {/* @ts-ignore */}
              <Image src={iconsSrc[el]} width={80} height={80} alt="" />
            </div>
            <div className="_text-2xl _text-center _font-semibold">
              <Writer text={t(el)} />
            </div>
            <div className="_text-center">
              {/* @ts-ignore */}
              {SERVICES_DESCRIPTION[el].map((item) => t(item)).join("; ")}
            </div>
          </div>
        ))}
      </div>
      <div className="_flex _gap-28">
        <Image
          src={girlPng}
          alt="Girl"
          height="512"
          className="_hidden lg:_block _relative _-scale-x-100"
        />
        <Image
          src={boyPng}
          alt="Girl"
          height="512"
          className="_hidden lg:_block _relative _-scale-x-100"
        />
      </div>
    </div>
  );
};

export default SelectService;
