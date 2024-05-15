"use client";
import React, { useContext, useEffect, useState } from "react";

import { Footer } from "@/components/Footer";
import { useLocales } from "@/hooks/useLocales";

import { sales } from "@/components/MainPage/Costs/constants";
import { CheckBoxesBlock } from "../OrderPage/CheckBoxesBlock";
import { CounterComponent } from "../OrderPage/Counter";
import { SubServicesList } from "../OrderPage/SubServicesList";
import { Summary } from "../OrderPage/Summary";
import "./style.scss";
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
    <div className="subscription-page">
      <div className="content-wrapper">
        <div className="left-col">
          <div className="subscription_header-block">
            <div className="subscription_header-title">
              <>
                <div className="mobile-none subscription_title">
                  {t("Subscription_page_title")}
                </div>
                <div className="mobile-none subscription_sub_title">
                  {t("subscription_sub_title")}
                </div>
                <div className="mobile-only subscription_mobile_title">
                  {t("How much it costs")}
                </div>
              </>
            </div>
            <div className="subscription_content">
              {sales.map((item) => (
                <div
                  className={`subscription_item ${
                    sale.sale === item.sale ? "subscription_item_active" : ""
                  }`}
                  onClick={() => setSale(item)}
                  key={JSON.stringify(item)}
                >
                  <div className="subscription_item_percent">{item.sale}</div>
                  <div className="subscription_item_percent-wrapper _mt-1">
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
        <div className="right-col">
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
    </div>
  );
};
