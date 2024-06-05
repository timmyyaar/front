import React, { FC } from "react";
import Image from "next/image";

import { Writer } from "@/components/common/Writer";

import broom from "./icons/Broom.svg";
import shieldCheck from "./icons/shield-check 1.svg";
import soap from "./icons/Soap.svg";

interface IProps {
  t: any;
  services: string[];
  setService: (service: string) => void;
}
export const SelectService: FC<IProps> = (props) => {
  const { t, services, setService } = props;
  const iconsSrc = {
    "General cleaning": broom,
    Healthcare: shieldCheck,
    "Special cleaning": soap,
  };

  return (
    <div
      className={`_flex lg:_block _justify-center _w-full _absolute
        _left-auto lg:_left-1/2 _top-6 lg:_top-1/2 lg:_-translate-y-2/4
        lg:_-translate-x-2/4`}
    >
      <div
        className={`_flex _flex-col lg:_flex-row _justify-center
          _gap-6 _w-full _px-5-percents`}
      >
        {services.map((el, i) => (
          <div
            className={`hover:_bg-light-dark active:_bg-light-dark _transition-all _flex _flex-col
              _rounded-3xl _bg-light _cursor-pointer _justify-center _h-52
              _gap-2 lg:_gap-10 lg:_h-auto __w-full lg:_w-1/3 lg:_py-7 lg:_px-16`}
            onClick={() => setService(el)}
            key={el + i}
          >
            <div className="_flex _justify-center">
              {/* @ts-ignore */}
              <Image src={iconsSrc[el]} width={80} height={80} alt="" />
            </div>
            <div className="_text-2xl _text-center _font-semibold">
              <Writer text={t(el)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
