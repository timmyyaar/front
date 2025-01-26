"use client";
import React, { useContext, useEffect } from "react";

import { Footer } from "@/components/Footer";
import { useLocales } from "@/hooks/useLocales";

import { Benefits } from "./Benefits";
import { InputForm } from "./InputForm";
import { Instruction } from "./Instruction";
import { LocaleContext } from "@/components/Providers";
import { sendGAEvent } from "@/google-analytics";

export const CareerPage = () => {
  const { locales } = useContext(LocaleContext);
  const { t } = useLocales(locales);

  useEffect(() => {
    sendGAEvent({
      action: "page_view",
      category: "career",
      label: "Career page view",
      value: "career",
    });
  }, []);

  return (
    <div className="career-page">
      <div className="career-content _flex _flex-col _gap-6 _mt-6 lg:_gap-10 lg:_mt-14">
        <div className="_main-title text-gradient">
          {t("Do you want to join T⅄T team?")}
        </div>
        <Benefits t={t} />
        <div className="_main-title _mt-6 lg:_mt-0 text-gradient">
          {t("How to join?")}
        </div>
        <Instruction title="career" cardsCount={3} t={t} />
        <div className="_main-title _mt-6 lg:_mt-0 text-gradient">
          {t("Filling form")}
        </div>
        <InputForm t={t} />
        <div className="_flex _flex-col">
          <Footer t={t} />
        </div>
      </div>
    </div>
  );
};
