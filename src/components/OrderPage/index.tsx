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
import { PRIVATE_HOUSE_SERVICES } from "./constants";

import PrivateHouse from "@/components/OrderPage/PrivateHouse";
import {
  LocaleContext,
  PricesContext,
  ServicesContext,
} from "@/components/Providers";
import { CITIES, MAIN_CATEGORIES, MAIN_CATEGORIES_REVERSED } from "@/constants";
import { getDefaultSubServicesByService } from "@/components/OrderPage/SubServicesList/utils";
import { sendGAEvent } from "@/google-analytics";
import { Discount } from "@/components/OrderPage/Summary";
import { getServicesWithIconsByCity, getTransformedPrices } from "@/utils";
import { ISubService } from "@/types";

interface OrderPageProps {
  discounts: Discount[];
}

const OZONATION_ADDITIONAL_SERVICE_TITLE = "ADD OZONATION SERVICE";

export const OrderPage = ({ discounts }: OrderPageProps) => {
  const { locales } = useContext(LocaleContext);
  const i18n = useLocales(locales);
  const { prices } = useContext(PricesContext);
  const { mainServices, subServices } = useContext(ServicesContext);
  const { lang, type } = useParams();
  const router = useRouter();
  const categoryTitle =
    MAIN_CATEGORIES[
      type as keyof { general: string; healthcare: string; special: string }
    ];

  const searchParams = useSearchParams();
  const urlService = searchParams.get("selectedService");
  const cityUrl = searchParams.get("city") || CITIES.KRAKOW.name;
  const isWarsaw = cityUrl === CITIES.WARSAW.name;

  const transformedPrices = getTransformedPrices(prices, cityUrl);

  // main service
  const filteredServices = getServicesWithIconsByCity({
    services: mainServices,
    city: cityUrl,
    serviceCategory: MAIN_CATEGORIES_REVERSED[categoryTitle],
  });

  const [selectedService, setService] = useState<string>(
    filteredServices.find(({ title }) => title === urlService)?.title || "",
  );
  const [counterValue, setCounterValue] = useState([]);
  const [selectedSubService, setSubService] = useState<ISubService[]>([]);
  // second service
  const [selectedSecondService, setSecondService] = useState<string>("");
  const [secondCounterValue, setSecondCounterValue] = useState([]);
  const [secondSelectedSubService, setSecondSubService] = useState([]);
  const [isPrivateHouse, setIsPrivateHouse] = useState<boolean>(false);
  const [ownCheckList, setOwnCheckList] = useState<boolean>(false);

  const onServiceSelect = (service: string) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());

    updatedSearchParams.set("selectedService", service);

    window.history.pushState(null, "", `?${updatedSearchParams.toString()}`);
  };

  useEffect(() => {
    const needToSyncUrl =
      urlService &&
      filteredServices.some(({ title }) => title === urlService) &&
      urlService !== selectedService;

    if (needToSyncUrl) {
      setService(urlService);
    }
  }, [urlService]);

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

    setSubService(
      getDefaultSubServicesByService(
        transformedPrices,
        selectedService,
        subServices,
      ),
    );
  }, [selectedService, cityUrl]);

  const additionalService = getAdditionalServices(selectedService);
  const filteredAdditionalService =
    isWarsaw && additionalService !== OZONATION_ADDITIONAL_SERVICE_TITLE
      ? ""
      : additionalService;

  useEffect(() => {
    setSecondService("");
    setSecondSubService([]);
  }, [selectedService]);

  useEffect(() => {
    if (selectedSecondService && !filteredAdditionalService) {
      setSecondService("");
      setSecondSubService([]);
    }
  }, [selectedSecondService, filteredAdditionalService]);

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
              router.push(`/${lang}/order?${searchParams.toString()}`);
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
            _px-24 _gap-14 lg:_gap-10`}
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
            {filteredAdditionalService.length > 0 && (
              <AddedMainService
                mainService={selectedService}
                selectedSecondService={selectedSecondService}
                setSecondService={setSecondService}
                t={i18n.t}
              >
                <>
                  {filteredAdditionalService ===
                  OZONATION_ADDITIONAL_SERVICE_TITLE ? (
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
              </AddedMainService>
            )}
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
