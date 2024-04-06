"use client";
import React, { useEffect, useState } from "react";

import { Footer } from "@/components/Footer";
import { useLocales } from "@/hooks/useLocales";
import { MainImage } from "@/components/common/MainImage";
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

export const OrderPage = (props: any) => {
  const { locales } = props;
  const i18n = useLocales(locales);
  const services = ["General cleaning", "Healthcare", "Special cleaning"];
  const [selectedCategory, setCategory] = useState<
    (typeof services)[number] | ""
  >("");
  // main service
  const [selectedService, setService] = useState<string>("");
  const [counterValue, setCounterValue] = useState([]);
  const [selectedSubService, setSubService] = useState([]);
  // second service
  const [selectedSecondService, setSecondService] = useState<string>("");
  const [secondCounterValue, setSecondCounterValue] = useState([]);
  const [secondSelectedSubService, setSecondSubService] = useState([]);
  const [isPrivateHouse, setIsPrivateHouse] = useState(false);

  useEffect(() => {
    if (!PRIVATE_HOUSE_SERVICES.includes(selectedService)) {
      setIsPrivateHouse(false);
    }

    setSecondService("");
    setSubService([]);
    setSecondSubService([]);
  }, [selectedService]);

  useEffect(() => {
    setService("");
    setSubService([]);
    setSecondSubService([]);

    setSecondService("");
    setSecondCounterValue([]);
    setSecondSubService([]);
    setIsPrivateHouse(false);
  }, [selectedCategory]);

  return (
    <div className="order-page">
      {!selectedCategory ? (
        <MainImage services={services} setService={setCategory} t={i18n.t} />
      ) : (
        <div>
          <div className="header-wrapper _flex _items-center">
            <div
              className="_cursor-pointer _flex _items-center"
              onClick={() => setCategory("")}
            >
              <div className="arrow-button">
                <LeftArrow />
              </div>
              {i18n.t(selectedCategory)}
            </div>
          </div>
          <div className="content-wrapper">
            <div className="left-col">
              <ServicesList
                mainCategory={selectedCategory}
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
              />
            </div>
          </div>
        </div>
      )}
      <Footer t={i18n.t} />
    </div>
  );
};
