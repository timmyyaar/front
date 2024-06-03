import React from "react";
import Image from "next/image";

import cleaningProductsSvg from "./icons/cleaning-products.svg";
import discountSvg from "./icons/discount.svg";
import likeSvg from "./icons/like.svg";
import moneyBagSvg from "./icons/money-bag.svg";
import saluteSvg from "./icons/salute.svg";
import timerSvg from "./icons/timer.svg";
import teamSvg from "./icons/team.svg";

export const Benefits = ({ t }: any) => {
  const benefits = [
    { title: "money-block", lines: 3, svg: moneyBagSvg },
    { title: "time-block", lines: 3, svg: timerSvg },
    { title: "opportunity-block", lines: 3, svg: saluteSvg },
    { title: "team-block", lines: 3, svg: teamSvg },

    { title: "supplies-block", lines: 3, svg: cleaningProductsSvg },
    { title: "payment-block", lines: 3, svg: moneyBagSvg },
    { title: "program-block", lines: 3, svg: likeSvg },
    { title: "discount-block", lines: 2, svg: discountSvg },
  ];

  return (
    <div className="_flex _flex-col _items-center _gap-6">
      <div
        className={`_px-[20vw] _px-5-percents-mobile _grid _grid-cols-2
          lg:_grid-cols-4 _px-4 _gap-3 _w-full`}
      >
        {benefits.map((el, i) => (
          <div
            className={`_py-4 _rounded-2xl _bg-light _flex _flex-col
              _justify-center _items-center _gap-4`}
            key={el.title + i}
          >
            <Image src={el.svg} alt="" />
            <div className="_text-center">
              {[...new Array(el.lines)].map((_, j) => (
                <div key={el.title + i + j}>{t(el.title + "_line_" + j)}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
