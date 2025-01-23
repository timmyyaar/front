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
        className="_w-full _rounded-[3rem] _bg-light _py-5 _px-10 lg:_py-7 _flex _flex-col _justify-center"
        key={JSON.stringify(item)}
      >
        <div className="_h-14 lg:_h-11 _flex _justify-between">
          <div className="_font-medium _text-xl _flex _items-center">
            <b>{t(title)}</b>
          </div>
          <div
            className={`_flex _items-center _justify-center _cursor-pointer
            _transition-all _duration-500 _w-11 ${
              activeQuest === title ? "_rotateX-180" : ""
            }`}
            onClick={() => toggleActiveQuest(title)}
          >
            <Image src={arrowDownSvg} alt="" />
          </div>
        </div>
        <div
          className={`_transition-all ${activeQuest === title ? "_mt-5 _max-h-96 _overflow-visible" : "_max-h-0 _overflow-hidden"}`}
        >
          {t(text)}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="_px-24 mobile-none">
        <div className="_main-title _mb-8">
          <span className="text-gradient">{t("FAQ")}</span>
        </div>
        <div className="_w-full _flex _space-between _gap-5">
          <div className="_w-6/12 _grid _grid-cols-1 _gap-6 _justify-stretch">
            {faqQuestions.map((item, i) =>
              i % 2 ? (
                <Fragment key={"faq" + i + "left"}>{getFaqItem(item)}</Fragment>
              ) : null,
            )}
          </div>
          <div className="_w-6/12 _grid _grid-cols-1 _gap-6 _justify-stretch">
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
      <div className="mobile-only _px-5-percents-mobile _mb-14">
        <div className="_main-title _mb-4">
          <span className="text-gradient">{t("FAQ")}</span>
        </div>
        <div className="_grid _grid-cols-1 _gap-6">
          {faqQuestions.map((item, i) => (
            <Fragment key={"faq" + i + "left"}>{getFaqItem(item)}</Fragment>
          ))}
        </div>
      </div>
    </>
  );
};
