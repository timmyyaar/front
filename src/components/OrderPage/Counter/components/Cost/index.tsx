"use client";

import { CITIES, NUMBER_REGEX } from "@/constants";
import { getOzonationMultiplier, getTransformedPrices } from "@/utils";
import React, { useContext } from "react";
import { useSearchParams } from "next/navigation";
import { LocaleContext, PricesContext } from "@/components/Providers";
import { useLocales } from "@/hooks/useLocales";

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

  const { locales } = useContext(LocaleContext);
  const { t } = useLocales(locales);
  
  const transformedCost = title.toLowerCase().includes("ozonation")
    ? cost.replace(
        NUMBER_REGEX,
        String(getOzonationMultiplier(transformedPrices, count)),
      )
    : cost;

  return (
    <div
      className="py-3 px-4 flex justify-center items-center rounded-40-px
        bg-warning leading-5 lg:leading-8"
    >
      {transformedCost.indexOf("m2") !== -1 ? (
        <>
          {transformedCost.replace(`m2`, "")}
          <>
            {t("m")}
            <sup>2</sup>
          </>
        </>
      ) : (
        transformedCost
      )}
    </div>
  );
};

export default Cost;
