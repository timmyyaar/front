import reactStringReplace from "react-string-replace";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FIGURE_BRACKETS_REGEX } from "@/constants";
import discountPng from "@/components/MainPage/Costs/icons/discount.png";
import { SALES } from "@/components/MainPage/AllServices/Modals/Costs/constants";

import { Cost } from "@/types";
import Button from "@/components/common/Button";
import Image from "next/image";

interface CostsProps {
  costs: Cost[] | { [key: string]: Cost[] };
  t: (text: string, defaultText?: string) => string;
  redirectPathname: string;
  isSubscription?: boolean;
}

function Costs({ costs, t, redirectPathname, isSubscription }: CostsProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [salesCost, setSalesCost] = useState(SALES[0].title);

  const isSingleItem = costs.length === 1;

  const costsOptions =
    isSubscription && !Array.isArray(costs) ? costs[salesCost] : costs;

  return (
    <div className="p-7 bg-light flex rounded-3xl">
      {isSubscription ? (
        <div className="flex flex-col justify-center py-3.5 gap-3.5 mr-10">
          {SALES.map(({ title, sale }) => (
            <div
              className={`text-xl leading-6 font-semibold flex
                justify-between items-center cursor-pointer py-3.5 px-4 gap-1 ${
                  title === salesCost
                    ? "rounded-full bg-primary text-white "
                    : ""
                }`}
              onClick={(event) => {
                event.nativeEvent.stopImmediatePropagation();
                setSalesCost(title);
              }}
              key={title}
            >
              <div className="flex items-center whitespace-nowrap">
                {t(title)}
              </div>
              <div className="bg-warning text-black rounded-full flex items-center p-2">
                {sale}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`p-6 flex flex-col justify-center items-center ${
            isSingleItem ? "w-1/2" : "mr-6"
          }`}
        >
          <>
            <div className="flex justify-center">
              <Image
                className="mb-2"
                src={discountPng}
                alt="Discount"
                width="128"
                height="128"
              />
            </div>
            <div className="whitespace-pre text-center">
              {reactStringReplace(
                t("main_page_get_the_discount"),
                FIGURE_BRACKETS_REGEX,
                (match) => (
                  <b>{match}</b>
                ),
              )}
            </div>
          </>
        </div>
      )}
      <div
        className={`grid content-center grid-rows-[max-content] gap-8 ${
          isSingleItem ? "w-1/2 grid-cols-1" : "w-full grid-cols-3"
        }`}
      >
        {(costsOptions as Cost[]).map(
          ({ title, text, price, oldPrice }: Cost, index: number) => (
            <div
              className="flex flex-col justify-center items-center w-full gap-4 whitespace-nowrap"
              key={index}
            >
              {title && (
                <div className="text-xl font-semibold text-center">
                  {typeof title === "object" ? title : t(title as string)}
                </div>
              )}
              {text && (
                <div className="text-gray-dark whitespace-pre-wrap text-center">
                  {typeof text === "object" ? text : t(text as string)}
                </div>
              )}
              <div className="flex flex-col gap-4 w-full items-center mt-auto">
                <div className="flex items-center">
                  {Boolean(price) && (
                    <div className="text-2lx font-bold text-center">
                      {price}
                      {t("zl")}
                    </div>
                  )}
                  {Boolean(oldPrice) && (
                    <div className="text-gray-dark line-through ml-2">
                      {oldPrice}
                      {t("zl")}
                    </div>
                  )}
                </div>
                <Button
                  className="max-w-72 w-full"
                  onClick={() => {
                    router.push(`${pathname}/${redirectPathname}`);
                  }}
                  title={t("Order")}
                />
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export default Costs;
