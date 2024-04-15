"use client";
import React, { useContext } from "react";

import { Footer } from "@/components/Footer";
import { useLocales } from "@/hooks/useLocales";
import { MainImage } from "@/components/common/MainImage";

import { AdditionalServices } from "./AdditionalServices";
import { Advantages } from "./Advantages";
import { AllServices } from "./AllServices";
import { Cleaning } from "./Cleaning";
import { Costs } from "./Costs";
import { FAQ } from "./FAQ";
import { Order } from "./Order";
import { PriceByPhoto } from "./PriceByPhoto";
import { Promotions } from "./Promotions";
import Reviews from "@/components/MainPage/Reviews";
import "./style.scss";
import { LocaleContext } from "@/components/Providers";
import Blogs from "@/components/MainPage/Blogs";

export const MainPage= () => {
  const { locales } = useContext(LocaleContext);
  const { t, lng } = useLocales(locales);

  return (
    <div className="main-page">
      <div className="main-content _flex _flex-col">
        <MainImage common t={t} />
        <Advantages t={t} />
        <AllServices t={t} />
        <Cleaning t={t} lng={lng} />
        <Costs t={t} />
        <AdditionalServices t={t} />
        <PriceByPhoto t={t} />
        <Promotions t={t} />
        <Blogs t={t} />
        <FAQ t={t} />
        <Reviews t={t} />
        <div className="_flex _flex-col">
          <Order t={t} />
          <Footer t={t} />
        </div>
      </div>
    </div>
  );
};
