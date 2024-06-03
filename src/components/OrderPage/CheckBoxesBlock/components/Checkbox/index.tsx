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
    <div className={isCentral ? "_flex _justify-center" : ""}>
      <div
        className={`_flex _flex-col lg:_flex-row _gap-4 lg:_gap-0
          _items-center _cursor-pointer ${isCentral ? "w-max" : ""}`}
        onClick={() => setCheck((ch: boolean) => !ch)}
      >
        <div className="_gap-4 _flex _items-center">
          <div
            className={`_rounded-full _flex _justify-center _items-center
              _h-10 _w-10 lg:_h-11 lg:_w-11 _bg-white`}
          >
            {checked ? (
              <div className="_h-6 _w-6">
                <Image src={checkSvg} alt="" />
              </div>
            ) : null}
          </div>
          <div className="_w-10 _w-10 lg:_w-14 lg:_h-14 lg:_mr-3">
            <Image src={icon} alt="" />
          </div>
        </div>
        <div className="_flex _items-center _select-none _m-0 lg:_mr-4">
          <div>
            <div
              className={`_flex lg:_block _justify-center _text-lg lg:_text-xl
                _select-none _font-semibold`}
            >
              {t(title)}
            </div>
            {subTitle ? (
              <div
                className={`_flex lg:_block _justify-center _text-sm lg:_text-base
                  _text-gray-dark _select-none`}
              >
                {t(subTitle)}
              </div>
            ) : null}
          </div>
        </div>
        {price && (
          <div
            className={`_py-2 _px-4 _min-w-max _flex _items-center _gap-2.5
              _rounded-full _text-lg lg:_text-xl _text-center _font-semibold
              _whitespace-nowrap ${
                isNegativePrice ? "_bg-success" : "_bg-warning"
              } ${!isCentral ? "_ml-0 lg:_ml-auto" : ""}`}
          >
            <div className="_w-full">{t(price)}</div>
            {oldPrice ? (
              <div
                className={`_text-gray _text-sm _font-semibold _line-through
                  _whitespace-nowrap _w-full`}
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
