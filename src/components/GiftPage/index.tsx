"use client";
import React, { useContext, useEffect } from "react";
import Image from "next/image";

import { Footer } from "@/components/Footer";
import { useLocales } from "@/hooks/useLocales";

import { Instruction } from "../CareerPage/Instruction";

import { InputForm } from "./InputForm";
import aSvg from "./icons/150.svg";
import bSvg from "./icons/250.svg";
import cSvg from "./icons/350.svg";
import dSvg from "./icons/500.svg";
import { LocaleContext } from "@/components/Providers";
import { sendGAEvent } from "@/google-analytics";

export const GiftPage = () => {
  const { locales } = useContext(LocaleContext);
  const { t } = useLocales(locales);

  useEffect(() => {
    sendGAEvent({
      action: "page_view",
      category: "gift",
      label: "Gift page view",
      value: "gift",
    });
  }, []);

  return (
    <div className="gift-page">
      <div className="gift-content gap-6 mt-6 lg:gap-10 lg:mt-14 flex flex-col">
        <div>
          <div className="main-title text-gradient">{t("Gifts card")}</div>
          <div className="text-center mt-8 font-semibold mobile-none">
            {t("Gifts card text")}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-2 gap-5 px-4 lg:gap-4 lg:px-0">
            <Image src={aSvg} alt="" className="rounded-2xl" />
            <Image src={bSvg} alt="" className="rounded-2xl" />
            <Image src={cSvg} alt="" className="rounded-2xl" />
            <Image src={dSvg} alt="" className="rounded-2xl" />
          </div>
        </div>
        <div className="main-title mt-6 lg:mt-0 text-gradient">{t("How it works?")}</div>
        <Instruction title="gifts" cardsCount={5} t={t} />
        <div className="main-title mt-6 lg:mt-0 text-gradient">{t("Filling form")}</div>
        <InputForm t={t} />
        <div className="flex flex-col">
          <Footer t={t} />
        </div>
      </div>
    </div>
  );
};
