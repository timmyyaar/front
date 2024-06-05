"use client";
import React, { useContext, useEffect, useState } from "react";

import { Footer } from "@/components/Footer";
import { useLocales } from "@/hooks/useLocales";

import { sales } from "@/components/MainPage/Costs/constants";
import { CheckBoxesBlock } from "../OrderPage/CheckBoxesBlock";
import { CounterComponent } from "../OrderPage/Counter";
import { SubServicesList } from "../OrderPage/SubServicesList";
import { Summary } from "../OrderPage/Summary";
import { LocaleContext } from "@/components/Providers";
import { sendGAEvent } from "@/google-analytics";
import { Discount } from "@/components/OrderPage/Summary";

interface SubscriptionPageProps {
  discounts: Discount[];
}

export const SubscriptionPage = ({ discounts }: SubscriptionPageProps) => {
  const { locales } = useContext(LocaleContext);
  const { t } = useLocales(locales);

  const [sale, setSale] = useState(sales[0]);
  const [isPrivateHouse, setIsPrivateHouse] = useState<boolean>(false);
  const [ownCheckList, setOwnCheckList] = useState<boolean>(false);

  // main service
  const [counterValue, setCounterValue] = useState([]);
  const [selectedSubService, setSubService] = useState([]);

  const match = sale.sale.match(/^(-?\d*\.?\d+)\s*%$/);
  const salePercents = 100 - -parseFloat(match![0]);
  const priceMultiplier = salePercents / 100;

  useEffect(() => {
    sendGAEvent({
      action: "page_view",
      category: "subscription",
      label: "Subscription page view",
      value: "subscription",
    });
  }, []);

  return (
    <>
      <div className="_gap-10 _mt-10 _px-24 _px-5-percents-mobile _flex _flex-col lg:_flex-row">
        <div className="_w-full lg:_w-4/6 _gap-10 lg:_gap-20 _flex _flex-col">
          <div>
            <div className="_text-2xl _gap-2 _flex _justify-center _font-semibold _mb-5">
              <>
                <div className="mobile-none">
                  {t("Subscription_page_title")}
                </div>
                <div className="mobile-none _text-primary">
                  {t("subscription_sub_title")}
                </div>
                <div className="mobile-only _text-dark">
                  {t("How much it costs")}
                </div>
              </>
            </div>
            <div className="_flex _justify-center _gap-4 lg:_gap-6">
              {sales.map((item) => (
                <div
                  className={`hover:_rounded-xl hover:_border-4 hover:_border-solid
                    hover:_border-primary _flex _flex-col _justify-center _items-center
                    _cursor-pointer _border-4 _border-solid _border-transparent
                    _rounded-xl _p-3 ${
                      sale.sale === item.sale ? "_bg-primary" : ""
                    }`}
                  onClick={() => setSale(item)}
                  key={JSON.stringify(item)}
                >
                  <div
                    className={`_p-2 _rounded-full _bg-warning _text-lg lg:_text-xl
                    _font-semibold`}
                  >
                    {item.sale}
                  </div>
                  <div
                    className={`_text-sm lg:_text-xl _font-medium _text-center _mt-1 ${
                      sale.sale === item.sale ? "_text-white" : ""
                    }`}
                  >
                    {t(item.title)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <CounterComponent
            mainService={"Subscription"}
            setCounterValue={setCounterValue}
            t={t}
            isPrivateHouse={isPrivateHouse}
            setIsPrivateHouse={setIsPrivateHouse}
          />
          <SubServicesList
            mainService={"Subscription"}
            subServices={selectedSubService}
            setSubService={setSubService}
            priceMultiplier={priceMultiplier}
            t={t}
          />
          <CheckBoxesBlock
            mainService={"Subscription"}
            subServices={selectedSubService}
            setSubService={setSubService}
            priceMultiplier={priceMultiplier}
            ownCheckList={ownCheckList}
            setOwnCheckList={setOwnCheckList}
            t={t}
          />
        </div>
        <div className="__w-full _min-w-2/6 lg:_w-2/6">
          <Summary
            title={"Subscription"}
            counter={counterValue}
            subService={selectedSubService}
            setSubService={setSubService}
            subSale={sale.sale}
            t={t}
            isPrivateHouse={isPrivateHouse}
            discounts={discounts}
          />
        </div>
      </div>
      <Footer t={t} />
    </>
  );
};
