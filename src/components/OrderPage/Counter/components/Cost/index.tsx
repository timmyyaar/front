"use client";

import { CITIES, NUMBER_REGEX } from "@/constants";
import { getOzonationMultiplier, getTransformedPrices } from "@/utils";
import React, { useContext } from "react";
import { PricesContext } from "@/components/Providers";
import { useSearchParams } from "next/navigation";

interface Props {
  title: string;
  cost: string;
  count: number;
}

const Cost = ({ title, cost, count }: Props) => {
  const { prices } = useContext(PricesContext);
  const searchParams = useSearchParams();
  const city = searchParams.get("city") || CITIES.KRAKOW.name;

  const transformedPrices = getTransformedPrices(prices, city);

  const transformedCost = title.toLowerCase().includes("ozonation")
    ? cost.replace(
        NUMBER_REGEX,
        String(getOzonationMultiplier(transformedPrices, count)),
      )
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
