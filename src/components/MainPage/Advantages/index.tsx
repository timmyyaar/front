import React from "react";
import Image from "next/image";

import { Writer } from "@/components/common/Writer";
import BookmarkTabs from "./icons/BookmarkTabs.svg";
import Hand from "./icons/Hand.svg";
import MoneyBag from "./icons/MoneyBag.svg";
import Time from "./icons/Time.svg";

export const Advantages = (props: any) => {
  const { t } = props;
  const advantages = [
    {
      icon: Time,
      title: "Fixed price",
      text: "The price for cleaning is determined by the count of rooms, not the overall size of the apartment",
    },
    {
      icon: MoneyBag,
      title: "Card or cash",
      text: "You can pay conveniently with cash and bank card",
    },
    {
      icon: Hand,
      title: "Eco-Friendly Products",
      text: "We believe in being earth friendly, that's why we can refer cleaners who can use organic and green cleaning solutions for your home",
    },
    {
      icon: BookmarkTabs,
      title: "Our services are insured",
      text: "Payment is required only after the cleaning has been completed",
    },
  ];

  return (
    <>
      <div className="advantages-component _mx-24 mobile-none _flex _justify-around	">
        {advantages.map((el) => (
          <div className="_flex _flex-col" key={el.title}>
            <div className="_flex _justify-center _basis-1/4">
              <Image src={el.icon} alt="" />
            </div>
            <div className="_mt-2 _text-xl _text-dark _font-semibold _text-center">
              {t(el.title)}
            </div>
            <div className="_mt-5 _text-center">
              <Writer text={t(el.text)} />
            </div>
          </div>
        ))}
      </div>
      <div className="advantages-component-mobile _mb-14 _px-5-percents-mobile mobile-only">
        <div className="_grid _grid-cols-2 _gap-6">
          {advantages.map((el) => (
            <div className="_flex _flex-col" key={el.title}>
              <div className="_flex _justify-center _basis-1/4">
                <Image src={el.icon} alt="" />
              </div>
              <div className="_mt-2 _text-dark _text-center _text-lg _font-medium">
                {t(el.title)}
              </div>
              <div className="_text-center">
                {[...new Array(3)].map((_, j) => (
                  <div key={el.title + j}>
                    <Writer text={t(el.title + "_" + j)} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
