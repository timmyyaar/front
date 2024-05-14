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
import { MAIN_CATEGORIES_URLS } from "@/constants";

function WindowModalContent({ t }: { t: TranslateFunction }) {
  const { prices } = useContext(PricesContext);

  const windowCosts = [
    {
      title: (
        <span className="cost-price">
          {prices.window * 5}
          <span className="_ml-1">{t("zl")}</span>
        </span>
      ),
      text: "window_price_description",
    },
  ];

  return (
    <div className="_text-center">
      <div className="modal-title-wrapper _text-center">
        <span className="modal-title-text text-gradient">
          {t("window_cleaning_title")}
        </span>
      </div>
      <div className="_grid col-3-mobile-1 _gap-6">
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
            <div className="window-block">
              <div className="img-wrapper">
                <Image src={windowImg[i as 0 | 1 | 2 | 3 | 4 | 5]} alt="" />
              </div>
              <div className="title">
                <Writer
                  text={t("window_cleaning_description_" + (i + 1))}
                  key={"window_cleaning" + "_" + i}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-16-mobile-8">
        <div className="modal-title-wrapper _text-center">
          <span className="modal-title-text text-gradient">{t("Prices")}</span>
        </div>
        <Costs
          t={t}
          redirectPathname={`order/${MAIN_CATEGORIES_URLS.SPECIAL}?selectedService=${ALL_SERVICE.WINDOW}`}
          costs={windowCosts}
        />
      </div>
    </div>
  );
}

export default WindowModalContent;
