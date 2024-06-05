"use client";

import { NUMBER_REGEX } from "@/constants";
import { getOzonationMultiplier } from "@/utils";
import React, { useContext } from "react";
import { PricesContext } from "@/components/Providers";

interface Props {
  title: string;
  cost: string;
  count: number;
}

const Cost = ({ title, cost, count }: Props) => {
  const { prices } = useContext(PricesContext);
  const transformedCost = title.toLowerCase().includes("ozonation")
    ? cost.replace(NUMBER_REGEX, String(getOzonationMultiplier(prices, count)))
    : cost;

  return (
    <div
      className={`_py-3 _px-4 _flex _justify-center _items-center _border-40
        _bg-warning _leading-5 lg:_leading-8`}
    >
      {transformedCost.indexOf("m2") !== -1 ? (
        <>
          {transformedCost.replace("m2", "")}
          <>
            m<sup>2</sup>
          </>
        </>
      ) : (
        transformedCost
      )}
    </div>
  );
};

export default Cost;
