"use client";
import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import reactStringReplace from "react-string-replace";

import { Costs as CostsConst, FIGURE_BRACKETS_REGEX } from "@/constants";
import { Switcher } from "@/components/common/Switcher";
import subscriptionPng from "@/assets/icons/main-services/subscription.png";
import moreDetailsPng from "@/assets/icons/common/more-details.png";
import Button from "@/components/common/Button";
import { tabs, TABS } from "./constants";
import discountPng from "./icons/discount.png";
import referralPng from "./icons/referral.png";
import gamePng from "./icons/game.png";
import accountPng from "./icons/account.png";

const SUBSCRIPTION_ITEMS = [
  {
    icon: accountPng,
    text: "Personal account with order history",
    translation: "how_much_it_costs_subscription_personal_account",
  },
  {
    icon: discountPng,
    text: "Discounts on orders",
    translation: "how_much_it_costs_subscription_personal_discounts",
  },
  {
    icon: gamePng,
    text: "Gamification with rewards",
    isRotated: true,
    translation: "how_much_it_costs_subscription_personal_gamification",
  },
  {
    icon: referralPng,
    text: "Referral program with bonuses",
    translation: "how_much_it_costs_subscription_personal_referral",
  },
];

export const Costs = (props: any) => {
  const { t } = props;
  const [tab, setTab] = useState(() => tabs[0]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getText = (title: string) => {
    if (title === "1-bedroom") {
      return "One-time 1-bedroom cleaning";
    }

    if (title === "2-bedroom") {
      return "One-time 2-bedroom cleaning";
    }

    if (title === "3-bedroom") {
      return "One-time 3-bedroom cleaning";
    }
  };

  const getCoast = (title: string) => {
    // @ts-ignore
    return CostsConst[TABS.ONE_TIME][title];
  };

  const costs = [
    {
      title: "1-bedroom",
      text: getText("1-bedroom"),
      coast: getCoast("1-bedroom"),
    },
    {
      title: "2-bedroom",
      text: getText("2-bedroom"),
      coast: getCoast("2-bedroom"),
    },
    {
      title: "3-bedroom",
      text: getText("3-bedroom"),
      coast: getCoast("3-bedroom"),
    },
  ];

  return (
    <div
      id="costs-block"
      className="_px-5-percents lg:_px-24 _mb-14 lg:_mb-0 _flex _flex-col _items-center"
    >
      <div className="_main-title _mb-3 lg:_mb-5">
        <b>
          <span className="text-gradient">{t("How much it costs")}</span>
        </b>
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
              <div className="_flex _flex-col _gap-5 _px-6">
                <div className="_flex _flex-col _justify-start _items-center">
                  <Image
                    src={subscriptionPng}
                    alt="Subscription"
                    width="128"
                    height="128"
                  />
                  <div className="_text-xl _font-semibold _whitespace-nowrap">
                    {t("Subscription")} - 18{t("zl")}/{t("month")}
                  </div>
                  <div
                    className={`_text-gray-dark _text-sm _flex _items-center _gap-2 hover:_text-primary
                    _transition-colors _cursor-pointer _py-0.5`}
                    onClick={() => {
                      router.push(
                        `${pathname}/subscription?${searchParams.toString()}`,
                      );
                    }}
                  >
                    {t("How it works")}
                    <Image
                      src={moreDetailsPng}
                      alt="More details"
                      width="22"
                      height="22"
                    />
                  </div>
                </div>
                <Button title="Buy" />
              </div>
            </div>
          ) : (
            <div className="_m-6 _w-64 _flex _flex-col _justify-center">
              <div className="_flex _justify-center">
                <Image
                  src={discountPng}
                  alt="Discount"
                  width="128"
                  height="128"
                  className="_mb-2"
                />
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
          {tab === TABS.SUBSCRIPTION ? (
            <div className="_flex _justify-around _gap-4 _p-4">
              {SUBSCRIPTION_ITEMS.map((item) => (
                <div className="_flex _flex-col _gap-6 _px-6  _py-2.5 _items-center _justify-center _max-w-52">
                  <Image
                    className={item.isRotated ? "_rotate-[30deg]" : ""}
                    src={item.icon}
                    alt={item.text}
                    width="75"
                    height="75"
                  />
                  <span className="_text-lg _font-medium _text-center _leading-6">
                    {t(item.translation)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
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
          )}
        </div>
      </div>
      <div className="mobile-only _w-full">
        {tab === TABS.SUBSCRIPTION ? (
          <div className="_flex _flex-col _gap-5">
            <div className="_bg-light _px-4 _py-8 _mt-5 _rounded-xl _flex _flex-col _items-center">
              <Image
                src={subscriptionPng}
                alt="Subscription"
                width="128"
                height="128"
              />
              <div className="_text-xl _font-semibold _whitespace-nowrap">
                {t("Subscription")} - 18{t("zl")}/{t("month")}
              </div>
              <div
                className={`_text-gray-dark _text-sm _flex _items-center _gap-2 hover:_text-primary
                    _transition-colors _cursor-pointer _py-0.5`}
                onClick={() => {
                  router.push(
                    `${pathname}/subscription?${searchParams.toString()}`,
                  );
                }}
              >
                {t("How it works")}
                <Image
                  src={moreDetailsPng}
                  alt="More details"
                  width="22"
                  height="22"
                />
              </div>
            </div>
            {SUBSCRIPTION_ITEMS.map((item) => (
              <div className="_bg-light _px-4 _py-8 _rounded-xl _flex _flex-col _items-center _gap-6">
                <Image
                  className={item.isRotated ? "_rotate-[30deg]" : ""}
                  src={item.icon}
                  alt={item.text}
                  width="75"
                  height="75"
                />
                <span className="_font-medium _text-center _leading-6">
                  {t(item.translation)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};
