import React, { useState } from "react";
import reactStringReplace from "react-string-replace";
import { Discount } from "@/components/MainPage/Costs/icons/Discount";
import { FIGURE_BRACKETS_REGEX } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import { SALES } from "@/components/MainPage/AllServices/Modals/Costs/constants";
import OzonationCosts from "@/components/MainPage/AllServices/Modals/Costs/OzonationCosts";
import { Cost } from "@/types";

interface CostsMobileProps {
  costs: Cost[] | { [key: string]: Cost[] };
  t: (text: string) => string;
  isSubscription?: boolean;
  redirectPathname: string;
  description?: string;
}

function CostsMobile({
  t,
  costs,
  redirectPathname,
  description,
  isSubscription,
}: CostsMobileProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [salesCost, setSalesCost] = useState(() => SALES[0].title);

  const isSingleItem =
    Array.isArray(costs) && costs.length === 1 && !costs[0].isOzonation;
  const firstItem = (costs as Cost[])[0];

  const costsOptions =
    isSubscription && !Array.isArray(costs) ? costs[salesCost] : costs;

  return (
    <div className="_flex _flex-col _gap-5 main-costs-mobile-wrapper">
      {isSubscription && (
        <div className="_flex _gap-4 _justify-between">
          {SALES.map(({ title, sale }) => (
            <div
              key={title}
              className={`_py-3 _px-2 _flex _flex-col _justify-center _items-center _gap-2 ${
                title === salesCost ? "subscription-mobile-active-item" : ""
              }`}
              onClick={(event) => {
                event.nativeEvent.stopImmediatePropagation();
                setSalesCost(title);
              }}
            >
              <div className="costs-sub-title sale _font-bold _p-2 _text-center _w-max">
                {t(sale)}
              </div>
              <div className="costs-small-text _font-bold">{t(title)}</div>
            </div>
          ))}
        </div>
      )}
      {isSingleItem ? (
        <div className="_flex _flex-col costs-mobile-item _p-6 _gap-10">
          <div>
            <div className="_flex _justify-center">
              <Discount width={102} height={102} />
            </div>
            <div className="_whitespace-pre _text-center">
              {reactStringReplace(
                t("main_page_get_the_discount"),
                FIGURE_BRACKETS_REGEX,
                (match) => (
                  <b className="costs-sub-title">{match}</b>
                )
              )}
            </div>
          </div>
          <div className="_flex _flex-col _gap-4">
            {firstItem.title && (
              <div className="_font-semibold _text-center">
                {typeof firstItem.title === "object"
                  ? firstItem.title
                  : t(firstItem.title as string)}
              </div>
            )}
            {firstItem.text && (
              <div className="text-secondary _whitespace-pre-wrap _text-center">
                {typeof firstItem.text === "object"
                  ? firstItem.text
                  : t(firstItem.text as string)}
              </div>
            )}
            {Boolean(firstItem.price) && (
              <div className="costs-sub-title _font-bold _text-center">
                {firstItem.price}
                {t("zl")}
              </div>
            )}
            <button
              className="costs-order-button full-width _font-semibold _py-3.5 _cursor-pointer _w-full"
              onClick={() => {
                router.push(`${pathname}/${redirectPathname}`);
              }}
            >
              {t("Order")}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="_flex _gap-4 _p-6 costs-mobile-item _items-center _justify-center">
            <div className="_flex _items-center">
              <Discount width={102} height={102} />
            </div>
            <div className="_whitespace-pre _text-center _h-max">
              {reactStringReplace(
                t("main_page_get_the_discount"),
                FIGURE_BRACKETS_REGEX,
                (match) => (
                  <b className="costs-sub-title">{match}</b>
                )
              )}
            </div>
          </div>
          {(costsOptions as Cost[]).map(
            ({ title, price, oldPrice, isOzonation }: Cost, index: number) =>
              isOzonation ? (
                <>
                  <OzonationCosts t={t} />
                  <button
                    className="costs-order-button full-width _font-semibold _py-3.5 _cursor-pointer _w-full"
                    onClick={() => {
                      router.push(`${pathname}/${redirectPathname}`);
                    }}
                  >
                    {t("Order")}
                  </button>
                </>
              ) : (
                <div
                  key={index}
                  className="costs-mobile-item _py-7 _flex _flex-col _justify-center _items-center _w-full _gap-4 _whitespace-nowrap"
                >
                  {title && (
                    <div className="_font-semibold _text-center">
                      {typeof title === "object" ? title : t(title as string)}
                    </div>
                  )}
                  {Boolean(price) && (
                    <div className="_flex _items-center">
                      <div className="costs-sub-title _font-bold _text-center">
                        {price}
                        {t("zl")}
                      </div>
                      {Boolean(oldPrice) && (
                        <div className="old-costs-price text-secondary _ml-2">
                          {oldPrice}
                          {t("zl")}
                        </div>
                      )}
                    </div>
                  )}
                  <button
                    className="costs-order-button _font-semibold _py-3.5 _cursor-pointer _w-full"
                    onClick={() => {
                      router.push(`${pathname}/${redirectPathname}`);
                    }}
                  >
                    {t("Order")}
                  </button>
                </div>
              )
          )}
        </>
      )}
      {Boolean(description) && (
        <div className="costs-description _px-6 _text-center">
          {t(description as string)}
        </div>
      )}
    </div>
  );
}

export default CostsMobile;
