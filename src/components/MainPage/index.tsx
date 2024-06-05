"use client";
import React, { useContext, useEffect } from "react";

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
import { LocaleContext } from "@/components/Providers";
import Blogs from "@/components/MainPage/Blogs";
import { sendGAEvent } from "@/google-analytics";
import { Blog } from "@/types";
import { Review } from "@/components/MainPage/Reviews/types";

interface MainPageProps {
  blogs: Blog[];
  reviews: Review[];
}

export const MainPage = ({ blogs, reviews }: MainPageProps) => {
  const { locales } = useContext(LocaleContext);
  const { t, lng } = useLocales(locales);

  useEffect(() => {
    sendGAEvent({
      action: "page_view",
      category: "main",
      label: "Main page view",
      value: "main",
    });
  }, []);

  return (
    <div className="_gap-0 lg:_gap-28 _flex _flex-col">
      <MainImage common t={t} />
      <Advantages t={t} />
      <AllServices t={t} />
      <Cleaning t={t} lng={lng} />
      <Costs t={t} />
      <AdditionalServices t={t} />
      <PriceByPhoto t={t} />
      <Promotions t={t} />
      <Blogs t={t} blogs={blogs} />
      <FAQ t={t} />
      <Reviews t={t} reviews={reviews} />
      <div className="_flex _flex-col">
        <Order t={t} />
        <Footer t={t} />
      </div>
    </div>
  );
};
