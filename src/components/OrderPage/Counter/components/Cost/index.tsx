import { NUMBER_REGEX } from "@/constants";
import { getOzonationMultiplier } from "@/utils";
import React from "react";

interface Props {
  title: string;
  cost: string;
  count: number;
}

const Cost = ({ title, cost, count }: Props) => {
  const transformedCost = title.toLowerCase().includes("ozonation")
    ? cost.replace(NUMBER_REGEX, String(getOzonationMultiplier(count)))
    : cost;

  return (
    <div className="cost-wrapper">
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
