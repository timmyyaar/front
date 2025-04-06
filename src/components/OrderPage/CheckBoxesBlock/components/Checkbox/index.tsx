import React, { FC } from "react";
import Image from "next/image";

import checkSvg from "./icons/mingcute_check-fill.svg";

const CheckBox: FC<any> = ({
  icon,
  title,
  subTitle,
  price,
  oldPrice,
  checked,
  setCheck,
  t,
  isCentral,
}) => {
  const isNegativePrice = price?.substring(0, 1) === "-";

  return (
    <div className={isCentral ? "flex justify-center" : ""}>
      <div
        className={`flex flex-col lg:flex-row gap-4 lg:gap-0
          items-center cursor-pointer ${isCentral ? "w-max" : ""}`}
        onClick={() => setCheck((ch: boolean) => !ch)}
      >
        <div className="gap-4 flex items-center">
          <div
            className={`rounded-full flex justify-center items-center
              h-10 w-10 lg:h-11 lg:w-11 bg-white`}
          >
            {checked ? (
              <div className="h-6 w-6">
                <Image src={checkSvg} alt="" />
              </div>
            ) : null}
          </div>
          <div className="w-10 lg:w-14 lg:h-14 lg:mr-3">
            <Image src={icon} alt="" />
          </div>
        </div>
        <div className="flex items-center select-none m-0 lg:mr-4">
          <div>
            <div
              className={`flex lg:block justify-center text-lg lg:text-xl
                select-none font-semibold`}
            >
              {t(title)}
            </div>
            {subTitle ? (
              <div
                className={`flex lg:block justify-center text-sm lg:text-base
                  text-gray-dark select-none`}
              >
                {t(subTitle)}
              </div>
            ) : null}
          </div>
        </div>
        {price && (
          <div
            className={`py-2 px-4 min-w-max flex items-center gap-2.5
              rounded-full text-lg lg:text-xl text-center font-semibold
              whitespace-nowrap ${
                isNegativePrice ? "bg-success" : "bg-warning"
              } ${!isCentral ? "ml-0 lg:ml-auto" : ""}`}
          >
            <div className="w-full">{t(price)}</div>
            {oldPrice ? (
              <div
                className={`text-gray text-sm font-semibold line-through
                  whitespace-nowrap w-full`}
              >
                {t(oldPrice)}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckBox;
