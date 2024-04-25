"use client";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Footer } from "@/components/Footer";
import { useLocales } from "@/hooks/useLocales";
import { LeftArrow } from "@/components/common/Slider/icons/LeftArrow";

import { AddedMainService, getAdditionalServices } from "./AddedMainService";
import { CheckBoxesBlock } from "./CheckBoxesBlock";
import { CounterComponent } from "./Counter";
import { ServicesList } from "./ServicesList";
import { SubServicesList } from "./SubServicesList";
import { Summary } from "./Summary";
import { PRIVATE_HOUSE_SERVICES } from "./constants";

import "./style.scss";
import PrivateHouse from "@/components/OrderPage/PrivateHouse";
import { LocaleContext } from "@/components/Providers";
import { MAIN_CATEGORIES } from "@/constants";
import {
  getDefaultSubServicesByService,
  ISubService,
} from "@/components/OrderPage/SubServicesList/utils";
import { sendGAEvent } from "@/google-analytics";

export const OrderPage = () => {
  const { locales } = useContext(LocaleContext);
  const i18n = useLocales(locales);
  const { lang, type } = useParams();
  const router = useRouter();
  const categoryTitle =
    MAIN_CATEGORIES[
      type as keyof { general: string; healthcare: string; special: string }
    ];
  // main service
  const [selectedService, setService] = useState<string>("");
  const [counterValue, setCounterValue] = useState([]);
  const [selectedSubService, setSubService] = useState<ISubService[]>([]);
  // second service
  const [selectedSecondService, setSecondService] = useState<string>("");
  const [secondCounterValue, setSecondCounterValue] = useState([]);
  const [secondSelectedSubService, setSecondSubService] = useState([]);
  const [isPrivateHouse, setIsPrivateHouse] = useState<boolean>(false);
  const [ownCheckList, setOwnCheckList] = useState<boolean>(false);

  useEffect(() => {
    sendGAEvent({
      action: "page_view",
      category: "order",
      label: "Order page view",
      value: type,
    });
  }, []);

  useEffect(() => {
    if (!PRIVATE_HOUSE_SERVICES.includes(selectedService)) {
      setIsPrivateHouse(false);
    }

    setSecondService("");
    setSecondSubService([]);

    setSubService(getDefaultSubServicesByService(selectedService));
  }, [selectedService]);

  useEffect(() => {
    setService("");
    setSubService([]);
    setSecondSubService([]);

    setSecondService("");
    setSecondCounterValue([]);
    setSecondSubService([]);
    setIsPrivateHouse(false);
  }, [categoryTitle]);

  return (
    <div className="order-page">
      <div>
        <div className="header-wrapper _flex _items-center">
          <div
            className="_cursor-pointer _flex _items-center"
            onClick={() => {
              router.push(`/${lang}/order`);
            }}
          >
            <div className="arrow-button">
              <LeftArrow />
            </div>
            {i18n.t(categoryTitle)}
          </div>
        </div>
        <div className="content-wrapper">
          <div className="left-col">
            <ServicesList
              mainCategory={categoryTitle}
              t={i18n.t}
              setService={setService}
            />
            <CounterComponent
              mainService={selectedService}
              setCounterValue={setCounterValue}
              t={i18n.t}
              isPrivateHouse={isPrivateHouse}
              setIsPrivateHouse={setIsPrivateHouse}
            />
            {selectedService === "Custom cleaning" && (
              <PrivateHouse
                t={i18n.t}
                isPrivateHouse={isPrivateHouse}
                setIsPrivateHouse={setIsPrivateHouse}
              />
            )}
            <SubServicesList
              mainService={selectedService}
              subServices={selectedSubService}
              setSubService={setSubService}
              t={i18n.t}
            />
            <AddedMainService
              mainService={selectedService}
              setSecondService={setSecondService}
              t={i18n.t}
            >
              {getAdditionalServices(selectedService).length ? (
                <>
                  {getAdditionalServices(selectedService) ===
                  "ADD OZONATION SERVICE" ? (
                    <CounterComponent
                      mainService={"Ozonation"}
                      setCounterValue={setSecondCounterValue}
                      t={i18n.t}
                    />
                  ) : (
                    <div className="_flex _flex-col _gap-6">
                      <CounterComponent
                        mainService={"Dry cleaning"}
                        setCounterValue={setSecondCounterValue}
                        t={i18n.t}
                      />
                      <SubServicesList
                        mainService={"Dry cleaning"}
                        subServices={secondSelectedSubService}
                        setSubService={setSecondSubService}
                        t={i18n.t}
                      />
                    </div>
                  )}
                </>
              ) : null}
            </AddedMainService>
            <CheckBoxesBlock
              mainService={selectedService}
              subServices={selectedSubService}
              setSubService={setSubService}
              t={i18n.t}
              ownCheckList={ownCheckList}
              setOwnCheckList={setOwnCheckList}
            />
          </div>
          <div className="right-col">
            <Summary
              title={selectedService}
              counter={counterValue}
              subService={selectedSubService}
              setSubService={setSubService}
              secTitle={selectedSecondService}
              secCounter={secondCounterValue}
              secSubService={secondSelectedSubService}
              setSecSubService={setSecondSubService}
              t={i18n.t}
              isPrivateHouse={isPrivateHouse}
              ownCheckList={ownCheckList}
            />
          </div>
        </div>
      </div>
      <Footer t={i18n.t} />
    </div>
  );
};
