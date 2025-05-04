import React, { Fragment, useState } from "react";
import Image from "next/image";

import arrowDownSvg from "./icons/arrow-down.svg";

export const FAQ = (props: any) => {
  const { t } = props;
  const [activeQuest, setActiveQuest] = useState("");
  const faqQuestions = [
    "faq_how_to_make_order",
    "faq_subscription",
    "faq_how_to_cancel_order",
    "faq_do_i_need_to_provide",
    "faq_what_should_i_do_if_im_dissatisfied",
    "faq_is_it_possible_for_me_to_cancel",
    "faq_things_which_are_not_included",
    "faq_can_i_order_few_services",
    "faq_what_is_the_eco_cleaning",
    "faq_promocodes",
  ];

  const toggleActiveQuest = (title: string) => {
    setActiveQuest((c) => (c === title ? "" : title));
  };

  const getFaqItem = (item: string) => {
    const title = `${item}_title`;
    const text = `${item}_text`;

    return (
      <div
        className="w-full rounded-[3rem] bg-light py-5 px-10 lg:py-7 flex flex-col justify-center"
        key={JSON.stringify(item)}
      >
        <div className="h-14 lg:h-11 flex justify-between">
          <div className="font-medium text-xl flex items-center">
            <b>{t(title)}</b>
          </div>
          <div
            className={`flex items-center justify-center cursor-pointer
            transition-all duration-500 w-11 ${
              activeQuest === title ? "rotate-x-180" : ""
            }`}
            onClick={() => toggleActiveQuest(title)}
          >
            <Image src={arrowDownSvg} alt="" />
          </div>
        </div>
        <div
          className={`transition-all ${activeQuest === title ? "mt-5 max-h-96 overflow-visible" : "max-h-0 overflow-hidden"}`}
        >
          {t(text)}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="px-24 mobile-none">
        <div className="main-title mb-8">
          <span className="text-gradient">{t("FAQ")}</span>
        </div>
        <div className="w-full flex space-between gap-5">
          <div className="w-6/12 grid grid-cols-1 gap-6 justify-stretch">
            {faqQuestions.map((item, i) =>
              i % 2 ? (
                <Fragment key={"faq" + i + "left"}>{getFaqItem(item)}</Fragment>
              ) : null,
            )}
          </div>
          <div className="w-6/12 grid grid-cols-1 gap-6 justify-stretch">
            {faqQuestions.map((item, i) =>
              !(i % 2) ? (
                <Fragment key={"faq" + i + "right"}>
                  {getFaqItem(item)}
                </Fragment>
              ) : null,
            )}
          </div>
        </div>
      </div>
      <div className="mobile-only px-5-percents-mobile mb-14">
        <div className="main-title mb-4">
          <span className="text-gradient">{t("FAQ")}</span>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {faqQuestions.map((item, i) => (
            <Fragment key={"faq" + i + "left"}>{getFaqItem(item)}</Fragment>
          ))}
        </div>
      </div>
    </>
  );
};
