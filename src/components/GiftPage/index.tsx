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
      <div className="gift-content _gap-6 _mt-6 lg:_gap-10 lg:_mt-14 _flex _flex-col">
        <div>
          <div className="_main-title">{t("Gifts card")}</div>
          <div className="_text-center _mt-8 _font-semibold mobile-none">
            {t("Gifts card text")}
          </div>
        </div>
        <div className="_flex _justify-center">
          <div className="_grid _grid-cols-2 _gap-5 _px-4 lg:_gap-4 lg:_px-0">
            <Image src={aSvg} alt="" className="_rounded-2xl" />
            <Image src={bSvg} alt="" className="_rounded-2xl" />
            <Image src={cSvg} alt="" className="_rounded-2xl" />
            <Image src={dSvg} alt="" className="_rounded-2xl" />
          </div>
        </div>
        <div className="_main-title _mt-6 lg:_mt-0">{t("How it works?")}</div>
        <Instruction title="gifts" cardsCount={5} t={t} />
        <div className="_main-title _mt-6 lg:_mt-0">{t("Filling form")}</div>
        <InputForm t={t} />
        <div className="_flex _flex-col">
          <Footer t={t} />
        </div>
      </div>
    </div>
  );
};
