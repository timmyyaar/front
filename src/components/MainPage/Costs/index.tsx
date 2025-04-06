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
      className="px-5-percents lg:px-24 mb-14 lg:mb-0 flex flex-col items-center"
    >
      <div className="main-title mb-3 lg:mb-5">
        <b>
          <span className="text-gradient">{t("How much it costs")}</span>
        </b>
      </div>
      <div className="w-max">
        <Switcher
          tab={tab}
          tabs={tabs}
          t={t}
          onClick={(el: string) => setTab(el)}
        />
      </div>
      <div className="mobile-none w-full">
        <div className="mt-8 w-full rounded-3xl bg-light flex justify-around">
          {tab === TABS.SUBSCRIPTION ? (
            <div className="m-6 w-64 flex flex-col justify-center">
              <div className="flex flex-col gap-5 px-6">
                <div className="flex flex-col justify-start items-center">
                  <Image
                    src={subscriptionPng}
                    alt="Subscription"
                    width="128"
                    height="128"
                  />
                  <div className="text-xl font-semibold whitespace-nowrap">
                    {t("how_much_it_costs_subscription_title")} - 18{t("zl")}/
                    {t("month")}
                  </div>
                  <div
                    className={`text-gray-dark text-sm flex items-center gap-2 hover:text-primary
                    transition-colors cursor-pointer py-0.5`}
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
            <div className="m-6 w-64 flex flex-col justify-center">
              <div className="flex justify-center">
                <Image
                  src={discountPng}
                  alt="Discount"
                  width="128"
                  height="128"
                  className="mb-2"
                />
              </div>
              <div className="whitespace-pre-wrap text-center">
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
            <div className="flex justify-around gap-4 p-4">
              {SUBSCRIPTION_ITEMS.map((item) => (
                <div
                  key={item.text}
                  className="flex flex-col gap-6 px-6  py-2.5 items-center justify-center max-w-52"
                >
                  <Image
                    className={item.isRotated ? "rotate-[30deg]" : ""}
                    src={item.icon}
                    alt={item.text}
                    width="75"
                    height="75"
                  />
                  <span className="text-lg font-medium text-center leading-6">
                    {t(item.translation)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-around gap-4 p-4">
              {costs.map((el) => (
                <div className="my-3 text-center flex flex-col" key={el.title}>
                  <div className="text-xl font-semibold">{t(el.title)}</div>
                  <div className="text-gray-dark mt-6 mb-4 px-5 whitespace-pre-wrap">
                    {t(el.text)}
                  </div>
                  <div className="mt-auto">
                    <div className="flex justify-center">
                      <div className="text-2xl font-bold">
                        {el.coast}
                        {t("zl")}
                      </div>
                    </div>
                    <Button
                      className="mt-6 w-full"
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
      <div className="mobile-only w-full">
        {tab === TABS.SUBSCRIPTION ? (
          <div className="flex flex-col gap-5">
            <div className="bg-light px-4 py-8 mt-5 rounded-xl flex flex-col items-center">
              <Image
                src={subscriptionPng}
                alt="Subscription"
                width="128"
                height="128"
              />
              <div className="text-xl font-semibold whitespace-nowrap">
                {t("how_much_it_costs_subscription_title")} - 18{t("zl")}/
                {t("month")}
              </div>
              <div
                className={`text-gray-dark text-sm flex items-center gap-2 hover:text-primary
                    transition-colors cursor-pointer py-0.5`}
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
              <div
                key={item.text}
                className="bg-light px-4 py-8 rounded-xl flex flex-col items-center gap-6"
              >
                <Image
                  className={item.isRotated ? "rotate-[30deg]" : ""}
                  src={item.icon}
                  alt={item.text}
                  width="75"
                  height="75"
                />
                <span className="font-medium text-center leading-6">
                  {t(item.translation)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="mt-5 flex flex-col gap-5">
              {costs.map((el, j) => (
                <div
                  className="p-4 rounded-xl bg-light"
                  key={el.title + "_mobile_" + j}
                >
                  <div className="text-center font-medium mt-4">
                    <b>{t(el.title)}</b>
                  </div>
                  <div className="my-3 flex justify-center gap-2">
                    <div className="text-lg font-semibold">
                      {el.coast}
                      {t("zl")}
                    </div>
                  </div>
                  <Button
                    className="w-36 mx-auto mt-7"
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
            <div className="text-gray-dark mt-5 text-center text-sm">
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
