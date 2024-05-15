import reactStringReplace from "react-string-replace";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FIGURE_BRACKETS_REGEX } from "@/constants";
import { Discount } from "@/components/MainPage/Costs/icons/Discount";
import { SALES } from "@/components/MainPage/AllServices/Modals/Costs/constants";

import "./style.scss";
import { Cost } from "@/types";

interface CostsProps {
  costs: Cost[] | { [key: string]: Cost[] };
  t: (text: string) => string;
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
    <div className="_p-7 main-cost-wrapper _flex _rounded-3xl">
      {isSubscription ? (
        <div className="subscription-sale-list _flex _flex-col _justify-center _py-3.5 _gap-3.5 _mr-10">
          {SALES.map(({ title, sale }) => (
            <div
              className={`subscription-sale-item _flex _justify-between _items-center _cursor-pointer _py-3.5 _px-4 _gap-1 ${
                title === salesCost ? " active " : ""
              }`}
              onClick={(event) => {
                event.nativeEvent.stopImmediatePropagation();
                setSalesCost(title);
              }}
              key={title}
            >
              <div className="title _flex _items-center _whitespace-nowrap">
                {t(title)}
              </div>
              <div className="sale _flex _items-center _p-2">{sale}</div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`_p-6 _flex _flex-col _justify-center _items-center ${
            isSingleItem ? "_w-1/2" : "_mr-6"
          }`}
        >
          <>
            <div className="_flex _justify-center">
              <Discount />
            </div>
            <div className="_whitespace-pre _text-center">
              {reactStringReplace(
                t("main_page_get_the_discount"),
                FIGURE_BRACKETS_REGEX,
                (match) => (
                  <b>{match}</b>
                )
              )}
            </div>
          </>
        </div>
      )}
      <div
        className={`_grid _content-center grid-template-rows-1-max _gap-8 ${
          isSingleItem ? "_w-1/2 _grid-cols-1" : "_w-full _grid-cols-3"
        }`}
      >
        {(costsOptions as Cost[]).map(
          ({ title, text, price, oldPrice }: Cost, index: number) => (
            <div
              className="_flex _flex-col _justify-center _items-center _w-full _gap-4 _whitespace-nowrap"
              key={index}
            >
              {title && (
                <div className="cost-title _text-center">
                  {typeof title === "object" ? title : t(title as string)}
                </div>
              )}
              {text && (
                <div className="text-secondary _whitespace-pre-wrap _text-center">
                  {typeof text === "object" ? text : t(text as string)}
                </div>
              )}
              <div className="_flex _flex-col _gap-4 _w-full _items-center _mt-auto">
                <div className="_flex _items-center">
                  {Boolean(price) && (
                    <div className="cost-price _text-center">
                      {price}
                      {t("zl")}
                    </div>
                  )}
                  {Boolean(oldPrice) && (
                    <div className="old-cost-price text-secondary _ml-2">
                      {oldPrice}
                      {t("zl")}
                    </div>
                  )}
                </div>
                <button
                  className="cost-order-button _cursor-pointer _w-full"
                  onClick={() => {
                    router.push(`${pathname}/${redirectPathname}`);
                  }}
                >
                  {t("Order")}
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Costs;
