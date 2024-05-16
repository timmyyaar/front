"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Coasts, FIGURE_BRACKETS_REGEX } from "@/constants";
import { Writer } from "@/components/common/Writer";
import { Switcher } from "@/components/common/Switcher";
import { Discount } from "./icons/Discount";
import { tabs, sales, TABS } from "./constants";
import "./style.scss";
import reactStringReplace from "react-string-replace";

export const Costs = (props: any) => {
  const { t } = props;
  const [tab, setTab] = useState(() => tabs[0]);
  const [salesCost, setSalesCost] = useState(() => sales[0].title);
  const router = useRouter();
  const pathname = usePathname();

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
      className="costs-component _flex _flex-col _items-center"
    >
      <div className="main-title mobile-none">
        <b>{t("How much it costs")}</b>
      </div>
      <div className="main-title-mobile mobile-only">
        <b>{t("How_much_it_costs_mobile")}</b>
      </div>
      <div className="_w-max">
        <Switcher
          tab={tab}
          tabs={tabs}
          t={t}
          onClick={(el: string) => setTab(el)}
        />
      </div>
      <div className="mobile-none">
        <div className="costs-sales-wrapper _flex _justify-between">
          {tab === TABS.SUBSCRIPTION ? (
            <div className="sales-list _flex _flex-col _justify-center">
              {sales.map((el) => (
                <div
                  className={`sale-item _flex _justify-between _items-center _cursor-pointer ${
                    el.title === salesCost ? " active " : ""
                  }`}
                  onClick={() => setSalesCost(el.title)}
                  key={el.title}
                >
                  <div className="title _flex _items-center _whitespace-nowrap _mr-1">
                    {t(el.title)}
                  </div>
                  <div className="sale _flex _items-center">{el.sale}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-sales-wrapper _flex _flex-col _justify-center">
              <div className="_flex _justify-center">
                <Discount />
              </div>
              <div className="_whitespace-pre-wrap _text-center">
                {reactStringReplace(
                  t("main_page_get_the_discount"),
                  FIGURE_BRACKETS_REGEX,
                  (match) => (
                    <b>{match}</b>
                  )
                )}
              </div>
            </div>
          )}
          <div className="costs-wrapper _flex _justify-around">
            {costs.map((el) => (
              <div className="costs-item _flex _flex-col" key={el.title}>
                <div className="title">{t(el.title)}</div>
                <div className="text _whitespace-pre-wrap">{t(el.text)}</div>
                <div className="_mt-auto">
                  <div className="_flex _justify-center">
                    <div className="coast">
                      {el.coast}
                      {t("zl")}
                    </div>
                    {el.oldCoast ? (
                      <div className="old-coast _flex _flex-col _justify-center">
                        {el.oldCoast}
                        {t("zl")}
                      </div>
                    ) : null}
                  </div>
                  <div
                    className="button _cursor-pointer"
                    onClick={() => {
                      router.push(
                        `${pathname}/${
                          tab === TABS.SUBSCRIPTION ? "subscription" : "order"
                        }`
                      );
                    }}
                  >
                    {t("Order")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="sub-mobile-wrapper mobile-only">
        {tab === TABS.SUBSCRIPTION ? (
          <div className="sub-mobile-sales-wrapper">
            {sales.map((el, i) => (
              <div
                className={`sub-mobile-sales-item ${
                  el.title === salesCost
                    ? " sub-mobile-sales-item-active "
                    : " "
                }`}
                onClick={() => setSalesCost(el.title)}
                key={el.title + "-mobile-sales-" + i}
              >
                <div className="sub-mobile-sales-sale">{el.sale}</div>
                <div className="sub-mobile-sales-title">
                  <b>
                    <Writer text={t(el.title)} />
                  </b>
                </div>
              </div>
            ))}
          </div>
        ) : null}
        <div className="grid-sales-mobile">
          {costs.map((el, j) => (
            <div className="sales-mobile-item" key={el.title + "_mobile_" + j}>
              <div className="sales-mobile-title _mt-4">
                <b>{t(el.title)}</b>
              </div>
              <div className="sales-mobile-price-wrapper">
                <div className="sales-mobile-current-price">
                  {el.coast}
                  {t("zl")}
                </div>
                {el.oldCoast ? (
                  <div className="sales-mobile-old-price _flex _flex-col _justify-center">
                    {el.oldCoast}
                    {t("zl")}
                  </div>
                ) : null}
              </div>
              <div
                className="sales-mobile-item-order-btn"
                onClick={() => {
                  router.push(
                    `${pathname}/${
                      tab === TABS.SUBSCRIPTION ? "subscription" : "order"
                    }`
                  );
                }}
              >
                {t("Order")}
              </div>
            </div>
          ))}
        </div>
        <div className="sub-text-below-mobile">
          <div>{t("sub-text-below-mobile_line-1")}</div>
          <div>{t("sub-text-below-mobile_line-2")}</div>
          <div>{t("sub-text-below-mobile_line-3")}</div>
        </div>
      </div>
    </div>
  );
};
