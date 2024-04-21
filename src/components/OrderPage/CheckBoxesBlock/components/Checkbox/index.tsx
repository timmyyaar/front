import React, { FC } from "react";
import Image from "next/image";

import checkSvg from "./icons/mingcute_check-fill.svg";
import "./style.scss";

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
    <div
      className={`check-box-component ${
        isCentral ? "_flex _justify-center" : ""
      }`}
    >
      <div
        className={`check-box-wrapper ${isCentral ? "w-max" : ""}`}
        onClick={() => setCheck((ch: boolean) => !ch)}
      >
        <div className="icon-wrapper _flex _items-center">
          <div className="checked-icon-wrapper">
            {checked ? (
              <div className="checked-icon">
                <Image src={checkSvg} alt="" />
              </div>
            ) : null}
          </div>
          <div className="image-wrapper">
            <Image src={icon} alt="" />
          </div>
        </div>
        <div className="content-wrapper-checkbox">
          <div className="text-wrapper">
            <div className="title">{t(title)}</div>
            {subTitle ? <div className="sub-title">{t(subTitle)}</div> : null}
          </div>
        </div>
        {price && (
          <div
            className={`price-wrapper _whitespace-nowrap ${
              isNegativePrice ? "price-negative" : "price-positive"
            } ${!isCentral ? "_ml-auto" : ""}`}
          >
            <div>{t(price)}</div>
            {oldPrice ? (
              <div className="olr-price-wrapper _whitespace-nowrap">
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
