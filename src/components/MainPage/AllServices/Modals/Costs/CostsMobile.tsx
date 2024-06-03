import React, { useState } from "react";
import reactStringReplace from "react-string-replace";
import { Discount } from "@/components/MainPage/Costs/icons/Discount";
import { FIGURE_BRACKETS_REGEX } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import { SALES } from "@/components/MainPage/AllServices/Modals/Costs/constants";
import OzonationCosts from "@/components/MainPage/AllServices/Modals/Costs/OzonationCosts";
import { Cost } from "@/types";
import Button from "@/components/common/Button";

interface CostsMobileProps {
  costs: Cost[] | { [key: string]: Cost[] };
  t: (text: string, defaultText?: string) => string;
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
    <div className="_flex _flex-col _gap-5">
      {isSubscription && (
        <div className="_flex _gap-4 _justify-between">
          {SALES.map(({ title, sale }) => (
            <div
              key={title}
              className={`_py-3 _px-2 _flex _flex-col _justify-center _items-center _gap-2 ${
                title === salesCost ? "_bg-primary _text-white _rounded-md" : ""
              }`}
              onClick={(event) => {
                event.nativeEvent.stopImmediatePropagation();
                setSalesCost(title);
              }}
            >
              <div
                className={`_text-black _text-lg _rounded-full _bg-warning
                  _font-bold _p-2 _text-center _w-max`}
              >
                {t(sale)}
              </div>
              <div className="_text-center _text-sm _font-bold">{t(title)}</div>
            </div>
          ))}
        </div>
      )}
      {isSingleItem ? (
        <div className="_flex _flex-col _rounded-xl _bg-light _p-6 _gap-10">
          <div>
            <div className="_flex _justify-center">
              <Discount width={102} height={102} />
            </div>
            <div className="_whitespace-pre _text-center">
              {reactStringReplace(
                t("main_page_get_the_discount"),
                FIGURE_BRACKETS_REGEX,
                (match) => (
                  <b className="_text-lg">{match}</b>
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
              <div className="_text-gray-dark _whitespace-pre-wrap _text-center">
                {typeof firstItem.text === "object"
                  ? firstItem.text
                  : t(firstItem.text as string)}
              </div>
            )}
            {Boolean(firstItem.price) && (
              <div className="_text-lg _font-bold _text-center">
                {firstItem.price}
                {t("zl")}
              </div>
            )}
            <Button
              className="_max-w-60 _max-w-full _font-semibold _py-3.5 _cursor-pointer _w-full"
              onClick={() => {
                router.push(`${pathname}/${redirectPathname}`);
              }}
              title={t("Order")}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="_flex _gap-4 _p-6 _rounded-xl _bg-light _items-center _justify-center">
            <div className="_flex _items-center">
              <Discount width={102} height={102} />
            </div>
            <div className="_whitespace-pre _text-center _h-max">
              {reactStringReplace(
                t("main_page_get_the_discount"),
                FIGURE_BRACKETS_REGEX,
                (match) => (
                  <b className="_text-lg">{match}</b>
                )
              )}
            </div>
          </div>
          {(costsOptions as Cost[]).map(
            ({ title, price, oldPrice, isOzonation }: Cost, index: number) =>
              isOzonation ? (
                <>
                  <OzonationCosts t={t} />
                  <Button
                    className="_max-w-60 _max-w-full _font-semibold _py-3.5 _cursor-pointer _w-full"
                    onClick={() => {
                      router.push(`${pathname}/${redirectPathname}`);
                    }}
                    title={t("Order")}
                  />
                </>
              ) : (
                <div
                  key={index}
                  className="_rounded-xl _bg-light _py-7 _flex _flex-col _justify-center _items-center _w-full _gap-4 _whitespace-nowrap"
                >
                  {title && (
                    <div className="_font-semibold _text-center">
                      {typeof title === "object" ? title : t(title as string)}
                    </div>
                  )}
                  {Boolean(price) && (
                    <div className="_flex _items-center">
                      <div className="_text-lg _font-bold _text-center">
                        {price}
                        {t("zl")}
                      </div>
                      {Boolean(oldPrice) && (
                        <div className="_line-through _text-gray-dark _ml-2">
                          {oldPrice}
                          {t("zl")}
                        </div>
                      )}
                    </div>
                  )}
                  <Button
                    className="_max-w-60 _font-semibold _py-3.5 _cursor-pointer _w-full"
                    onClick={() => {
                      router.push(`${pathname}/${redirectPathname}`);
                    }}
                    title={t("Order")}
                  />
                </div>
              )
          )}
        </>
      )}
      {Boolean(description) && (
        <div className="_text-sm _text-gray-dark _px-6 _text-center">
          {t(description as string)}
        </div>
      )}
    </div>
  );
}

export default CostsMobile;
