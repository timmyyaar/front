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
      <div className="advantages-component mx-24 mobile-none flex justify-around">
        {advantages.map((el) => (
          <div className="flex flex-col" key={el.title}>
            <div className="flex justify-center basis-1/4">
              <Image src={el.icon} alt="" width={96} />
            </div>
            <div className="mt-2 text-xl text-dark font-semibold text-center text-gradient">
              {t(el.title)}
            </div>
            <div className="mt-5 text-center">
              <Writer text={t(el.text)} />
            </div>
          </div>
        ))}
      </div>
      <div className="advantages-component-mobile mb-14 px-5-percents-mobile mobile-only">
        <div className="grid grid-cols-2 gap-6">
          {advantages.map((el) => (
            <div className="flex flex-col" key={el.title}>
              <div className="flex justify-center basis-1/4">
                <Image src={el.icon} alt="" width={80} height={80} />
              </div>
              <div className="mt-2 text-dark text-center text-lg font-semibold text-gradient">
                {t(el.title)}
              </div>
              <div className="text-center">
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
