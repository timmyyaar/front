import React from "react";
import Image from "next/image";

import getPaidPng from "./icons/get_paid.png";
import pickYourOwnWorkHoursPng from "./icons/pick_your_own_work_hours.png";
import independentWorkPng from "./icons/independent_work.png";
import supportiveTeamPng from "./icons/supportive_team.png";
import suppliesPng from "./icons/supplies.png";
import cleanerOfTheMonthPng from "./icons/cleaner_of_the_month.png";
import referralPng from "./icons/referral.png";
import discountPng from "./icons/discount.png";

export const Benefits = ({ t }: any) => {
  const benefits = [
    { title: "money-block", lines: 3, svg: getPaidPng },
    { title: "time-block", lines: 3, svg: pickYourOwnWorkHoursPng },
    { title: "opportunity-block", lines: 3, svg: independentWorkPng },
    { title: "team-block", lines: 3, svg: supportiveTeamPng },

    { title: "supplies-block", lines: 3, svg: suppliesPng },
    { title: "payment-block", lines: 3, svg: cleanerOfTheMonthPng },
    { title: "program-block", lines: 3, svg: referralPng },
    { title: "discount-block", lines: 2, svg: discountPng },
  ];

  return (
    <div className="_flex _flex-col _items-center _gap-6">
      <div
        className={`_px-[20vw] _px-5-percents-mobile _grid _grid-cols-2
          lg:_grid-cols-4 _gap-3 _w-full`}
      >
        {benefits.map((el, i) => (
          <div
            className={`_py-4 _rounded-2xl _bg-light _flex _flex-col
              _justify-center _items-center _gap-4`}
            key={el.title + i}
          >
            <Image src={el.svg} alt={el.title} width="48" height="48" />
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
