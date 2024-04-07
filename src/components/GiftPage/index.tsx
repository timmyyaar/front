"use client";
import React, { useContext } from "react";
import Image from "next/image";

import { Footer } from "@/components/Footer";
import { useLocales } from "@/hooks/useLocales";

import { Instruction } from "../CareerPage/Instruction";

import { InputForm } from "./InputForm";
import aSvg from "./icons/150.svg";
import bSvg from "./icons/250.svg";
import cSvg from "./icons/350.svg";
import dSvg from "./icons/500.svg";
import "./style.scss";
import { LocaleContext } from "@/components/Providers";

export const GiftPage = () => {
  const { locales } = useContext(LocaleContext);
  const { t } = useLocales(locales);

  return (
    <div className="gift-page">
      <div className="gift-content _flex _flex-col">
        <div>
          <div className="gifts-title">{t("Gifts card")}</div>
          <div className="gifts-text _mt-8 _font-semibold mobile-none">
            {t("Gifts card text")}
          </div>
        </div>
        <div className="_flex _justify-center">
          <div className="_grid _grid-cols-2 image-wrapper">
            <Image src={aSvg} alt="" />
            <Image src={bSvg} alt="" />
            <Image src={cSvg} alt="" />
            <Image src={dSvg} alt="" />
          </div>
        </div>
        <div className="gifts-title block-wrapper">{t("How it works?")}</div>
        <Instruction title="gifts" cardsCount={5} t={t} />
        <div className="gifts-title block-wrapper">{t("Filling form")}</div>
        <InputForm t={t} />
        <div className="_flex _flex-col">
          <Footer t={t} />
        </div>
      </div>
    </div>
  );
};
