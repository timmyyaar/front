import React, { useContext } from "react";
import Image from "next/image";

import { Writer } from "@/components/common/Writer";

import timeMattersPng from "./icons/time-matters.png";
import cashOrCardPng from "./icons/cash-or-card.png";
import ecoFriendlyPng from "./icons/eco-friendly.png";
import servicesInsuredPng from "./icons/services-insured.png";
import { LocaleContext } from "@/components/Providers";
import { useLocales } from "@/hooks/useLocales";

export const Advantages = () => {
  const { locales } = useContext(LocaleContext);
  const { t } = useLocales(locales);

  const advantages = [
    {
      icon: timeMattersPng,
      title: "Fixed price",
      text: "The price for cleaning is determined by the count of rooms, not the overall size of the apartment",
    },
    {
      icon: cashOrCardPng,
      title: "Card or cash",
      text: "You can pay conveniently with cash and bank card",
    },
    {
      icon: ecoFriendlyPng,
      title: "Eco-Friendly Products",
      text: "We believe in being earth friendly, that's why we can refer cleaners who can use organic and green cleaning solutions for your home",
    },
    {
      icon: servicesInsuredPng,
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
              <Image src={el.icon} alt="" width={96} />
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
                <Image src={el.icon} alt="" width={80} height={80} />
              </div>
              <div className="_mt-2 _text-dark _text-center _text-lg _font-semibold text-gradient">
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
