"use client";
import React, { useContext } from "react";

import { Footer } from "@/components/Footer";
import { useLocales } from "@/hooks/useLocales";

import { Benefits } from "./Benefits";
import { InputForm } from "./InputForm";
import { Instruction } from "./Instruction";
import "./style.scss";
import { LocaleContext } from "@/components/Providers";

export const CareerPage = () => {
  const { locales } = useContext(LocaleContext);
  const { t } = useLocales(locales);

  return (
    <div className="career-page">
      <div className="career-content _flex _flex-col">
        <div className="career-title">{t("Do you want to join T⅄T team?")}</div>
        <Benefits t={t} />
        <div className="career-title block-wrapper">{t("How to join?")}</div>
        <Instruction title="career" cardsCount={3} t={t} />
        <div className="career-title block-wrapper">{t("Filling form")}</div>
        <InputForm t={t} />
        <div className="_flex _flex-col">
          <Footer t={t} />
        </div>
      </div>
    </div>
  );
};
