"use client";
import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Coasts, FIGURE_BRACKETS_REGEX } from "@/constants";
import { Writer } from "@/components/common/Writer";
import { Switcher } from "@/components/common/Switcher";
import { Discount } from "./icons/Discount";
import { tabs, sales, TABS } from "./constants";
import reactStringReplace from "react-string-replace";
import Button from "@/components/common/Button";

export const Costs = (props: any) => {
  const { t } = props;
  const [tab, setTab] = useState(() => tabs[0]);
  const [salesCost, setSalesCost] = useState(() => sales[0].title);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getText = (title: string) => {
    if (tab === TABS.ONE_TIME) {
      if (title === "1-bedroom") return "One-time 1-bedroom cleaning";
      if (title === "2-bedroom") return "One-time 2-bedroom cleaning";
      if (title === "3-bedroom") return "One-time 3-bedroom cleaning";
    } else {
      if (salesCost === "Once a week") {
        if (title === "1-bedroom") return "Weekly 1-bedroom cleaning";
        if (title === "2-bedroom") return "Weekly 2-bedroom cleaning";
        if (title === "3-bedroom") return "Weekly 3-bedroom cleaning";
      }

      if (salesCost === "Twice a month") {
        if (title === "1-bedroom") return "Twice a month 1-bedroom cleaning";
        if (title === "2-bedroom") return "Twice a month 2-bedroom cleaning";
        if (title === "3-bedroom") return "Twice a month 3-bedroom cleaning";
      }

      if (salesCost === "Once a month") {
        if (title === "1-bedroom") return "Once a month 1-bedroom cleaning";
        if (title === "2-bedroom") return "Once a month 2-bedroom cleaning";
        if (title === "3-bedroom") return "Once a month 3-bedroom cleaning";
      }
    }
    return "";
  };

  const getCoast = (title: string) => {
    if (tab === TABS.ONE_TIME) {
      // @ts-ignore
      return Coasts[TABS.ONE_TIME][title];
    } else {
      // @ts-ignore
      return Coasts[salesCost][title];
    }
  };

  const getOldCoast = (title: string) => {
    if (tab === TABS.ONE_TIME) return "";
    // @ts-ignore
    return Coasts[TABS.ONE_TIME][title];
  };

  const costs = [
    {
      title: "1-bedroom",
      text: getText("1-bedroom"),
      coast: getCoast("1-bedroom"),
      oldCoast: getOldCoast("1-bedroom"),
    },
    {
      title: "2-bedroom",
      text: getText("2-bedroom"),
      coast: getCoast("2-bedroom"),
      oldCoast: getOldCoast("2-bedroom"),
    },
    {
      title: "3-bedroom",
      text: getText("3-bedroom"),
      coast: getCoast("3-bedroom"),
      oldCoast: getOldCoast("3-bedroom"),
    },
  ];

  return (
    <div
      id="costs-block"
      className="_px-5-percents lg:_px-24 _mb-14 lg:_mb-0 _flex _flex-col _items-center"
    >
      <div className="_main-title _mb-3 lg:_mb-5">
        <b>{t("How much it costs")}</b>
      </div>
      <div className="_w-max">
        <Switcher
          tab={tab}
          tabs={tabs}
          t={t}
          onClick={(el: string) => setTab(el)}
        />
      </div>
      <div className="mobile-none _w-full">
        <div className="_mt-8 _w-full _rounded-3xl _bg-light _flex _justify-around">
          {tab === TABS.SUBSCRIPTION ? (
            <div className="_m-6 _w-64 _flex _flex-col _justify-center">
              {sales.map((el) => (
                <div
                  className={`_py-3.5 _px-7 _flex _justify-between _items-center _cursor-pointer ${
                    el.title === salesCost ? " _rounded-full _bg-primary " : ""
                  }`}
                  onClick={() => setSalesCost(el.title)}
                  key={el.title}
                >
                  <div
                    className={`_w-full _text-center _font-semibold _text-xl
                      _flex _items-center _whitespace-nowrap _mr-1 ${
                        el.title === salesCost ? "_text-white" : ""
                      }`}
                  >
                    {t(el.title)}
                  </div>
                  <div
                    className={`_p-2 _flex _items-center _rounded-full _bg-warning
                      _text-xl _font-semibold`}
                  >
                    {el.sale}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="_m-6 _w-64 _flex _flex-col _justify-center">
              <div className="_flex _justify-center">
                <Discount />
              </div>
              <div className="_whitespace-pre-wrap _text-center">
                {reactStringReplace(
                  t("main_page_get_the_discount"),
                  FIGURE_BRACKETS_REGEX,
                  (match) => (
                    <b>{match}</b>
                  ),
                )}
              </div>
            </div>
          )}
          <div className="_flex _justify-around _gap-4 _p-4">
            {costs.map((el) => (
              <div
                className="_my-3 _text-center _flex _flex-col"
                key={el.title}
              >
                <div className="_text-xl _font-semibold">{t(el.title)}</div>
                <div className="_text-gray-dark _mt-6 _mb-4 _px-5 _whitespace-pre-wrap">
                  {t(el.text)}
                </div>
                <div className="_mt-auto">
                  <div className="_flex _justify-center">
                    <div className="_text-2xl _font-bold">
                      {el.coast}
                      {t("zl")}
                    </div>
                    {el.oldCoast ? (
                      <div className="_ml-2 _text-gray-dark _line-through _flex _flex-col _justify-center">
                        {el.oldCoast}
                        {t("zl")}
                      </div>
                    ) : null}
                  </div>
                  <Button
                    className="_mt-6 _w-full"
                    onClick={() => {
                      router.push(
                        `${pathname}/${
                          tab === TABS.SUBSCRIPTION ? "subscription" : "order"
                        }?${searchParams.toString()}`,
                      );
                    }}
                    title={t("Order")}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mobile-only _w-full">
        {tab === TABS.SUBSCRIPTION ? (
          <div className="_mt-5 _flex _justify-center _gap-4">
            {sales.map((el, i) => (
              <div
                className={`_w-1/3 _py-3 _px-1 _text-center ${
                  el.title === salesCost ? "_rounded-md _bg-primary" : ""
                }`}
                onClick={() => setSalesCost(el.title)}
                key={el.title + "-mobile-sales-" + i}
              >
                <div
                  className={`_mx-auto _mb-1 _w-3/4 _py-2 _text-lg _font-semibold ${
                    el.title === salesCost ? "_rounded-full _bg-warning" : ""
                  }`}
                >
                  {el.sale}
                </div>
                <div
                  className={`_text-sm _font-medium _whitespace-nowrap ${
                    el.title === salesCost ? "_text-white" : ""
                  }`}
                >
                  <b>
                    <Writer text={t(el.title)} />
                  </b>
                </div>
              </div>
            ))}
          </div>
        ) : null}
        <div className="_mt-5 _flex _flex-col _gap-5">
          {costs.map((el, j) => (
            <div
              className="_p-4 _rounded-xl _bg-light"
              key={el.title + "_mobile_" + j}
            >
              <div className="_text-center _font-medium _mt-4">
                <b>{t(el.title)}</b>
              </div>
              <div className="_my-3 _flex _justify-center _gap-2">
                <div className="_text-lg _font-semibold">
                  {el.coast}
                  {t("zl")}
                </div>
                {el.oldCoast ? (
                  <div className="_text-gray-dark _line-through _flex _flex-col _justify-center">
                    {el.oldCoast}
                    {t("zl")}
                  </div>
                ) : null}
              </div>
              <Button
                className="_w-36 _mx-auto _mt-7"
                onClick={() => {
                  router.push(
                    `${pathname}/${
                      tab === TABS.SUBSCRIPTION ? "subscription" : "order"
                    }?${searchParams.toString()}`,
                  );
                }}
                title={t("Order")}
              />
            </div>
          ))}
        </div>
        <div className="_text-gray-dark _mt-5 _text-center _text-sm">
          <div>{t("sub-text-below-mobile_line-1")}</div>
          <div>{t("sub-text-below-mobile_line-2")}</div>
          <div>{t("sub-text-below-mobile_line-3")}</div>
        </div>
      </div>
    </div>
  );
};
