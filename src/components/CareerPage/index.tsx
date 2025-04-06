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
    <div className="flex flex-col gap-6 mt-6 lg:gap-10 lg:mt-14">
      <div className="main-title text-gradient">
        {t("Do you want to join T⅄T team?")}
      </div>
      <Benefits t={t} />
      <div className="main-title mt-6 lg:mt-0 text-gradient">
        {t("How to join?")}
      </div>
      <Instruction title="career" cardsCount={3} t={t} />
      <div className="main-title mt-6 lg:mt-0 text-gradient">
        {t("Filling form")}
      </div>
      <InputForm t={t} />
      <div className="flex flex-col">
        <Footer t={t} />
      </div>
    </div>
  );
};
