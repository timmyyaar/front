"use client";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { Footer } from "@/components/Footer";
import { useLocales } from "@/hooks/useLocales";
import { LeftArrow } from "@/components/common/Slider/icons/LeftArrow";

import { AddedMainService, getAdditionalServices } from "./AddedMainService";
import { CheckBoxesBlock } from "./CheckBoxesBlock";
import { CounterComponent } from "./Counter";
import { ServicesList } from "./ServicesList";
import { SubServicesList } from "./SubServicesList";
import { Summary } from "./Summary";
import { PRIVATE_HOUSE_SERVICES, SERVICES } from "./constants";

import PrivateHouse from "@/components/OrderPage/PrivateHouse";
import { LocaleContext, PricesContext } from "@/components/Providers";
import { MAIN_CATEGORIES } from "@/constants";
import {
  getDefaultSubServicesByService,
  SelectedSubService,
} from "@/components/OrderPage/SubServicesList/utils";
import { sendGAEvent } from "@/google-analytics";
import { Discount } from "@/components/OrderPage/Summary";

interface OrderPageProps {
  discounts: Discount[];
}

export const OrderPage = ({ discounts }: OrderPageProps) => {
  const { locales } = useContext(LocaleContext);
  const i18n = useLocales(locales);
  const { prices } = useContext(PricesContext);
  const { lang, type } = useParams();
  const router = useRouter();
  const categoryTitle =
    MAIN_CATEGORIES[
      type as keyof { general: string; healthcare: string; special: string }
    ];
  // main service
  const [selectedService, setService] = useState<string>("");
  const [counterValue, setCounterValue] = useState([]);
  const [selectedSubService, setSubService] = useState<SelectedSubService[]>(
    []
  );
  // second service
  const [selectedSecondService, setSecondService] = useState<string>("");
  const [secondCounterValue, setSecondCounterValue] = useState([]);
  const [secondSelectedSubService, setSecondSubService] = useState([]);
  const [isPrivateHouse, setIsPrivateHouse] = useState<boolean>(false);
  const [ownCheckList, setOwnCheckList] = useState<boolean>(false);

  const servicesList = SERVICES[categoryTitle];

  const searchParams = useSearchParams();
  const urlService = searchParams.get("selectedService");

  const onServiceSelect = (service: string) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());

    updatedSearchParams.set("selectedService", service);

    window.history.pushState(null, "", `?${updatedSearchParams.toString()}`);
  };

  useEffect(() => {
    const needToSyncUrl =
      urlService &&
      servicesList.some(({ title }) => title === urlService) &&
      urlService !== selectedService;

    if (needToSyncUrl) {
      setService(urlService);
    }
  }, [urlService, servicesList]);

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

    setSubService(getDefaultSubServicesByService(prices, selectedService));
  }, [selectedService]);

  return (
    <div className="order-page">
      <div>
        <div
          className={`header-wrapper _text-2xl _font-semibold _text-primary
            _px-24 _h-14 _mb-10 _border-b _border-solid _border-light _px-5-percents-mobile
            _flex _items-center`}
        >
          <div
            className="_cursor-pointer _flex _items-center"
            onClick={() => {
              router.push(`/${lang}/order`);
            }}
          >
            <div className="_h-7 _w-7 _mr-3 _cursor-pointer _text-gray-dark hover:_text-primary">
              <LeftArrow className="_w-full _h-full" />
            </div>
            {i18n.t(categoryTitle)}
          </div>
        </div>
        <div
          className={`_flex _flex-col lg:_flex-row _px-5-percents-mobile
            _px-24 _flex _gap-14 lg:_gap-10`}
        >
          <div className="_gap-20 _flex _flex-col _w-full lg:_w-4/6">
            <ServicesList
              mainCategory={categoryTitle}
              t={i18n.t}
              selectedService={selectedService}
              setSelectedService={onServiceSelect}
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
          <div className="_w-full lg:_w-2/6 _min-w-2/6">
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
              discounts={discounts}
            />
          </div>
        </div>
      </div>
      <Footer t={i18n.t} />
    </div>
  );
};
