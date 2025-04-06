"use client";

import { Writer } from "@/components/common/Writer";
import window0 from "@/components/MainPage/AllServices/Modals/images/0.png";
import window1 from "@/components/MainPage/AllServices/Modals/images/1.png";
import window2 from "@/components/MainPage/AllServices/Modals/images/2.png";
import window3 from "@/components/MainPage/AllServices/Modals/images/3.png";
import window4 from "@/components/MainPage/AllServices/Modals/images/4.png";
import window5 from "@/components/MainPage/AllServices/Modals/images/5.png";
import Image from "next/image";
import React, { useContext } from "react";
import { TranslateFunction } from "@/types";
import { PricesContext } from "@/components/Providers";
import Costs from "@/components/MainPage/AllServices/Modals/Costs";
import { ALL_SERVICE } from "@/components/OrderPage/constants";
import { CITIES, MAIN_CATEGORIES_URLS } from "@/constants";
import { useSearchParams } from "next/navigation";
import { getTransformedPrices } from "@/utils";

function WindowModalContent({
  t,
  isOrder,
}: {
  t: TranslateFunction;
  isOrder?: boolean;
}) {
  const { prices } = useContext(PricesContext);
  const searchParams = useSearchParams();
  const city = searchParams.get("city") || CITIES.KRAKOW.name;

  const transformedPrices = getTransformedPrices(prices, city);

  const windowCosts = [
    {
      title: (
        <span className="text-2lx font-bold">
          {transformedPrices.window * 5}
          <span className="ml-1">{t("zl")}</span>
        </span>
      ),
      text: "window_price_description",
    },
  ];

  return (
    <div className="text-center">
      <div className="mb-4 lg:mb-6 text-center">
        <span className="main-title text-gradient">
          {t("window_cleaning_title")}
        </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[...new Array(6)].map((_, i) => {
          const windowImg = {
            0: window0,
            1: window1,
            2: window2,
            3: window3,
            4: window4,
            5: window5,
          };

          return (
            <div
              className={`flex flex-col py-6 px-4 items-center justify-center
                gap-6 rounded-xl bg-light`}
            >
              <div className="flex justify-center">
                <Image src={windowImg[i as 0 | 1 | 2 | 3 | 4 | 5]} alt="" />
              </div>
              <div className="text-center">
                <Writer
                  text={t("window_cleaning_description_" + (i + 1))}
                  key={"window_cleaning" + "_" + i}
                />
              </div>
            </div>
          );
        })}
      </div>
      {!isOrder && (
        <div className="mt-8 lg:mt-16">
          <div className="mb-4 lg:mb-6 text-center">
            <span className="main-title text-gradient">{t("Prices")}</span>
          </div>
          <Costs
            t={t}
            redirectPathname={`order/${MAIN_CATEGORIES_URLS.SPECIAL}?selectedService=${ALL_SERVICE.WINDOW}${city ? `&city=${city}` : ""}`}
            costs={windowCosts}
          />
        </div>
      )}
    </div>
  );
}

export default WindowModalContent;
