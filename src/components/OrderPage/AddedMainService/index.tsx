import React, { FC, useEffect } from "react";
import Image from "next/image";

import OzonSvg from "./icons/ozone-layer.svg";
import CleanSvg from "./icons/rectangle.svg";
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
        className="_group _min-h-[4.5rem] lg:_min-h-0 _px-3 lg:_px-24 _gap-2 lg:_gap-5 _flex _justify-center lg:_justify-between _items-center _rounded-xl _bg-light _cursor-pointer"
        onClick={onClickSecondService}
      >
        <div className="_flex _items-center _select-none _w-16 _h-16 lg:_w-28 lg:_h-24">
          <Image src={isOzonation ? OzonSvg : CleanSvg} alt="" />
        </div>
        <div
          className={`_text-center group-hover:_text-primary lg:_text-xl _font-semibold
           _transition-all ${selectedSecondService ? "_text-primary" : ""}`}
        >
          {t(addService)}
        </div>
        <div
          className={`_transition-all _duration-300 _h-7 _w-7 lg:_h-auto lg:_w-auto ${
            selectedSecondService ? "" : "_rotateX-180"
          }`}
        >
          <Image src={caretUpSvg} alt="" />
        </div>
      </div>
      {selectedSecondService ? (
        <div className="_mt-6 _flex _justify-center">{children}</div>
      ) : null}
    </div>
  ) : null;
};
