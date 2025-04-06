import React, { useState } from "react";
import reactStringReplace from "react-string-replace";
import discountPng from "@/components/MainPage/Costs/icons/discount.png";
import { FIGURE_BRACKETS_REGEX } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import { SALES } from "@/components/MainPage/AllServices/Modals/Costs/constants";
import OzonationCosts from "@/components/MainPage/AllServices/Modals/Costs/OzonationCosts";
import { Cost } from "@/types";
import Button from "@/components/common/Button";
import Image from "next/image";

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
    <div className="flex flex-col gap-5">
      {isSubscription && (
        <div className="flex gap-4 justify-between">
          {SALES.map(({ title, sale }) => (
            <div
              key={title}
              className={`py-3 px-2 flex flex-col justify-center items-center gap-2 ${
                title === salesCost ? "bg-primary text-white rounded-md" : ""
              }`}
              onClick={(event) => {
                event.nativeEvent.stopImmediatePropagation();
                setSalesCost(title);
              }}
            >
              <div
                className={`text-black text-lg rounded-full bg-warning
                  font-bold p-2 text-center w-max`}
              >
                {t(sale)}
              </div>
              <div className="text-center text-sm font-bold">{t(title)}</div>
            </div>
          ))}
        </div>
      )}
      {isSingleItem ? (
        <div className="flex flex-col rounded-xl bg-light p-6 gap-10">
          <div>
            <div className="flex justify-center">
              <Image
                src={discountPng}
                alt="Discount"
                width={102}
                height={102}
              />
            </div>
            <div className="whitespace-pre text-center">
              {reactStringReplace(
                t("main_page_get_the_discount"),
                FIGURE_BRACKETS_REGEX,
                (match) => (
                  <b className="text-lg">{match}</b>
                ),
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {firstItem.title && (
              <div className="font-semibold text-center">
                {typeof firstItem.title === "object"
                  ? firstItem.title
                  : t(firstItem.title as string)}
              </div>
            )}
            {firstItem.text && (
              <div className="text-gray-dark whitespace-pre-wrap text-center">
                {typeof firstItem.text === "object"
                  ? firstItem.text
                  : t(firstItem.text as string)}
              </div>
            )}
            {Boolean(firstItem.price) && (
              <div className="text-lg font-bold text-center">
                {firstItem.price}
                {t("zl")}
              </div>
            )}
            <Button
              className="max-w-60 max-w-full font-semibold py-3.5 cursor-pointer w-full"
              onClick={() => {
                router.push(`${pathname}/${redirectPathname}`);
              }}
              title={t("Order")}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="flex gap-4 p-6 rounded-xl bg-light items-center justify-center">
            <div className="flex items-center">
              <Image
                src={discountPng}
                alt="Discount"
                width={102}
                height={102}
              />
            </div>
            <div className="whitespace-pre text-center h-max">
              {reactStringReplace(
                t("main_page_get_the_discount"),
                FIGURE_BRACKETS_REGEX,
                (match) => (
                  <b className="text-lg">{match}</b>
                ),
              )}
            </div>
          </div>
          {(costsOptions as Cost[]).map(
            ({ title, price, oldPrice, isOzonation }: Cost, index: number) =>
              isOzonation ? (
                <>
                  <OzonationCosts t={t} />
                  <Button
                    className="max-w-60 max-w-full font-semibold py-3.5 cursor-pointer w-full"
                    onClick={() => {
                      router.push(`${pathname}/${redirectPathname}`);
                    }}
                    title={t("Order")}
                  />
                </>
              ) : (
                <div
                  key={index}
                  className="rounded-xl bg-light py-7 flex flex-col justify-center items-center w-full gap-4 whitespace-nowrap"
                >
                  {title && (
                    <div className="font-semibold text-center">
                      {typeof title === "object" ? title : t(title as string)}
                    </div>
                  )}
                  {Boolean(price) && (
                    <div className="flex items-center">
                      <div className="text-lg font-bold text-center">
                        {price}
                        {t("zl")}
                      </div>
                      {Boolean(oldPrice) && (
                        <div className="line-through text-gray-dark ml-2">
                          {oldPrice}
                          {t("zl")}
                        </div>
                      )}
                    </div>
                  )}
                  <Button
                    className="max-w-60 font-semibold py-3.5 cursor-pointer w-full"
                    onClick={() => {
                      router.push(`${pathname}/${redirectPathname}`);
                    }}
                    title={t("Order")}
                  />
                </div>
              ),
          )}
        </>
      )}
      {Boolean(description) && (
        <div className="text-sm text-gray-dark px-6 text-center">
          {t(description as string)}
        </div>
      )}
    </div>
  );
}

export default CostsMobile;
