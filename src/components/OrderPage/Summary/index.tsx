"use client";

import React, { FC, useState, useEffect, useRef, useContext } from "react";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import faceWithRollingEyesSvg from "./icons/face-with-rolling-eyes.svg";

import { ModalRequest } from "@/components/common/ModalRequest";
import { Overlay } from "@/components/common/Overlay";
import { useClickOutside } from "@/hooks/useClickOutSide";
import { ISubService, SelectedSubService } from "../SubServicesList/utils";
import { PromoInput } from "./PromoCodeInput";
import { UserData } from "./UserData";
import {
  getHitherEstimate,
  getMinimalPriceByMainService,
  getPriceFromCounterByService,
  getPriceWithOwnSupplies,
  getPriceWithSaleOrSubSale,
  getServiceEstimate,
  getServicePriceBasedOnManualCleaners,
} from "./utils";
import { CITIES, EMAIL_REGEX, NUMBER_REGEX } from "@/constants";
import {
  DEFAULT_COUNTRY,
  Country,
} from "@/components/common/PhoneInput/constants";
import { OWN_SUPPLES_SERVICE_NAME } from "@/components/OrderPage/constants";
import { City } from "@/components/OrderPage/Summary/UserData/components/Cities";
import SummaryService from "@/components/OrderPage/Summary/SummaryService";
import { LocaleContext, PricesContext } from "@/components/Providers";
import { getDateString, getDateTimeString } from "@/utils";
import { Counter } from "@/types";
import OrderButton from "@/components/OrderPage/Summary/OrderButton";
import Button from "@/components/common/Button";

export interface OrderAddress {
  street: string;
  house: string;
  apartment: string;
  postcode: string;
  entrance: string;
  doorPhone: string;
  more: string;
  city: City;
}

export type Discount = {
  id: number;
  date: string;
  value: number;
};

interface IProps {
  title: string;
  counter: Counter[];
  subService: ISubService[];
  setSubService: (service: any) => void;
  secTitle?: string;
  secCounter?: {
    title: string;
    value: string;
    type?: string;
    param?: string;
  }[];
  secSubService?: ISubService[];
  setSecSubService?: (service: any) => void;
  subSale?: string;
  t: any;
  isPrivateHouse?: boolean;
  ownCheckList?: boolean;
  discounts: Discount[];
}

function ScrollDetector() {
  const [scrolledToElement, setScrolledToElement] = useState(false);
  const targetElementRef = useRef<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (targetElementRef.current) {
        const targetElementPosition =
          targetElementRef.current.getBoundingClientRect().top;
        if (targetElementPosition <= window.innerHeight) {
          setScrolledToElement(true);
        } else {
          setScrolledToElement(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [targetElementRef]);

  return [scrolledToElement, targetElementRef];
}

export const Summary: FC<IProps> = (props: any) => {
  const {
    title,
    counter,
    subService,
    setSubService,
    secTitle = "",
    secCounter = [],
    secSubService = [],
    setSecSubService,
    subSale = "",
    t,
    isPrivateHouse,
    ownCheckList,
    discounts,
  } = props;
  const { locale } = useContext(LocaleContext);
  const { prices } = useContext(PricesContext);
  const { lang } = useParams();
  const searchParams = useSearchParams();
  const [sale, setSale] = useState<number>(0);
  const [promoInputValue, setPromoInputValue] = useState<string>("");
  const [promo, setPromo] = useState<string>("");
  const [promoStatus, setPromoStatus] = useState<string>("");
  const [order, setOrder] = useState<boolean>(false);
  const [scrolledToElement, targetElementRef] = ScrollDetector();

  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [phoneCountry, setPhoneCountry] = useState<Country>(DEFAULT_COUNTRY!);
  const [email, setEmail] = useState<string>("");
  const [totalDate, setTotalDate] = useState<string>("");

  const [onlinePayment, setOnlinePayment] = useState<boolean>(false);

  const [previousCleaner, setPreviousCleaner] = useState<boolean>(false);
  const [privacyAndPolicy, setPrivacyAndPolicy] = useState<boolean>(false);
  const [personalData, setPersonalData] = useState<boolean>(false);
  const [isOrderLoading, setIsOrderLoading] = useState<boolean>(false);

  const [addressObject, setAddressObject] = useState<OrderAddress>({
    street: "",
    house: "",
    apartment: "",
    postcode: "",
    entrance: "",
    doorPhone: "",
    more: "",
    city: { name: CITIES.KRAKOW.name, price: 0 },
  });

  const {
    street,
    house,
    apartment,
    postcode,
    entrance,
    doorPhone,
    more,
    city,
  } = addressObject;

  const router = useRouter();

  const [successModal, setSuccessModal] = useState(false);
  const [showPromoErrorModal, setShowPromoErrorModal] =
    useState<boolean>(false);
  const [mainServiceManualCleanersCount, setMainServiceManualCleanersCount] =
    useState<number>(0);
  const [
    secondServiceManualCleanersCount,
    setSecondServiceManualCleanersCount,
  ] = useState<number>(0);
  const orderButtonRef = useRef<HTMLDivElement | null>(null);

  const selectedDateDay = totalDate?.split(" ")[0];
  const dayDiscount =
    discounts.find(({ date }: Discount) => date === selectedDateDay)?.value ||
    (selectedDateDay === getDateString(new Date()) ? -10 : 0);

  const onCloseModal = () => {
    setSuccessModal(false);

    router.push(`/${lang}?${searchParams.toString()}`);
  };

  const onCleanPromoData = () => {
    setShowPromoErrorModal(false);
    setPromo("");
    setSale(0);
    setPromoInputValue("");
    setPromoStatus("");
  };

  const ref = useClickOutside(() => onCloseModal());
  const promoModalRef = useClickOutside(() => onCleanPromoData());

  const onRemoveSubService = (title: string, isSecond?: boolean) => {
    const setSubServiceFunction = isSecond ? setSecSubService : setSubService;

    setSubServiceFunction((oldSubServices: SelectedSubService[]) =>
      oldSubServices.filter((el: SelectedSubService) => el.title !== title),
    );
  };

  const getMainServicePrice = () => {
    const countPrice =
      getPriceFromCounterByService(prices, title, counter) *
      (isPrivateHouse ? 1.3 : 1);
    const subServicePrice = subService
      .filter(
        ({ title }: { title: string }) => title !== OWN_SUPPLES_SERVICE_NAME,
      )
      .reduce(
        (acc: number, el: SelectedSubService) =>
          acc +
          (el?.originalPrice
            ? [
                "Clean the room",
                "Clean the bathroom",
                "Clean the kitchen",
                "Clean the corridor",
              ].includes(el.title) && isPrivateHouse
              ? el.originalPrice * el.count * 1.3
              : el.originalPrice * el.count
            : 0),
        0,
      );

    return countPrice ? countPrice + subServicePrice : subServicePrice;
  };

  const getSecondServicePrice = () => {
    const secCountPrice = getPriceFromCounterByService(
      prices,
      secTitle,
      secCounter,
    );
    const secSubServicePrice = secSubService.reduce(
      (acc: number, el: SelectedSubService) =>
        acc + el.originalPrice * el.count,
      0,
    );

    return secCountPrice
      ? secCountPrice + secSubServicePrice
      : secSubServicePrice;
  };

  const mainServiceEstimate = getServiceEstimate(
    title,
    counter,
    subService,
    mainServiceManualCleanersCount,
    isPrivateHouse,
  );
  const secondServiceEstimate = getServiceEstimate(
    secTitle,
    secCounter,
    secSubService,
    secondServiceManualCleanersCount,
  );

  const provideOwnSuppliesSelected = subService.find(
    ({ title }: { title: string }) => title === OWN_SUPPLES_SERVICE_NAME,
  );

  const mainServicePrice = getServicePriceBasedOnManualCleaners(
    getMainServicePrice(),
    mainServiceEstimate.cleanersCount,
    mainServiceManualCleanersCount,
  );
  const secondServicePrice = getServicePriceBasedOnManualCleaners(
    getSecondServicePrice(),
    secondServiceEstimate.cleanersCount,
    secondServiceManualCleanersCount,
  );
  const mainServicePriceWithSale = getPriceWithOwnSupplies(
    getPriceWithSaleOrSubSale(mainServicePrice, sale, subSale, dayDiscount),
    provideOwnSuppliesSelected,
  );
  const secondServicePriceWithSale = getPriceWithSaleOrSubSale(
    secondServicePrice,
    sale,
    subSale,
    dayDiscount,
  );

  const getPrice = () => {
    const finalPrice = mainServicePrice + secondServicePrice;

    return parseFloat(finalPrice.toFixed(1));
  };

  const price = getPrice();
  const priceWithSale = getPriceWithOwnSupplies(
    getPriceWithSaleOrSubSale(price, sale, subSale, dayDiscount),
    provideOwnSuppliesSelected,
  );

  const handleScroll = () => {
    const targetElement = orderButtonRef.current;

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const cityUrl = searchParams.get("city");
  const selectedCity =
    Object.values(CITIES).find(({ name }) => name === cityUrl) || CITIES.KRAKOW;

  const payload = {
    name: name.trim(),
    number: `+${phoneCountry.phoneCode}${number}`,
    email,
    address: `Street: ${street}, House: ${house}${
      isPrivateHouse ? " (Private house)" : ""
    }${apartment ? `, Apartment: ${apartment}` : ""}${
      postcode ? `, Postcode: ${postcode}` : ""
    }${entrance ? `, Entrance: ${entrance}` : ""}${
      doorPhone ? `, Door phone: ${doorPhone}` : ""
    }`,
    date: totalDate,
    onlinePayment: onlinePayment,
    requestPreviousCleaner: previousCleaner,
    personalData: personalData,
    mainServicePrice: mainServicePriceWithSale,
    secondServicePrice: secondServicePriceWithSale,
    price: priceWithSale,
    mainServicePriceOriginal: getPriceWithOwnSupplies(
      mainServicePrice,
      provideOwnSuppliesSelected,
    ),
    secondServicePriceOriginal: secondServicePrice,
    priceOriginal: getPriceWithOwnSupplies(price, provideOwnSuppliesSelected),
    promo,
    mainServiceEstimate: mainServiceEstimate.time,
    mainServiceCleanersCount:
      mainServiceEstimate.cleanersCount + mainServiceManualCleanersCount,
    mainServiceManualCleanersCount,
    secondServiceEstimate: secondServiceEstimate.time,
    secondServiceCleanersCount:
      secondServiceEstimate.cleanersCount + secondServiceManualCleanersCount,
    secondServiceManualCleanersCount,
    additionalInformation: more,
    city: city.name,
    mainCity: selectedCity.name,
    transportationPrice: city.price,
    language: locale,
    creationDate: getDateTimeString(new Date()),
    ownCheckList,
    title,
    counter: counter
      .map((el: any) => (el.title ? el.title + "(" + el.value + ")" : el.value))
      .join(" "),
    subService: subService
      .map(
        (service: SelectedSubService) =>
          `${service.title + "_summery"} (${service.count})`,
      )
      .join(" "),
    ...(secondServicePrice > 0 && secTitle
      ? {
          secTitle,
          secCounter: secCounter
            .map((el: any) =>
              el.title ? el.title + "(" + el.value + ")" : el.value,
            )
            .join(" "),
          secSubService: secSubService
            .map(
              (service: SelectedSubService) =>
                `${service.title + "_summery"} (${service.count})`,
            )
            .join(" "),
        }
      : {}),
  };

  const addressRequiredFields =
    street && house && (isPrivateHouse ? true : apartment);

  const minimalPrice = getMinimalPriceByMainService(prices, title);
  const minimalPriceWithSales = getPriceWithOwnSupplies(
    getPriceWithSaleOrSubSale(minimalPrice, sale, subSale, dayDiscount),
    provideOwnSuppliesSelected,
  );

  const isOrderPriceLessThanMinimum = priceWithSale < minimalPriceWithSales;

  const requiredFields =
    name &&
    number &&
    NUMBER_REGEX.test(number) &&
    email &&
    EMAIL_REGEX.test(email) &&
    totalDate &&
    privacyAndPolicy &&
    personalData &&
    addressRequiredFields &&
    getPriceWithOwnSupplies(price, provideOwnSuppliesSelected) > 0;

  const higherEstimate = getHitherEstimate(
    mainServiceEstimate.time,
    secondServiceEstimate.time,
  );

  const isOrderButtonDisabled =
    !requiredFields || isOrderLoading || isOrderPriceLessThanMinimum;

  return (
    <>
      <div className="_flex _flex-col _gap-6 _sticky _top-2">
        <Overlay active={successModal || showPromoErrorModal}>
          {successModal ? (
            <div ref={ref}>
              <ModalRequest
                text={
                  <div className="_flex _justify-center">
                    <div className="_whitespace-normal _w-full lg:_w-3/4">
                      {t("order_page_modal_title")}
                    </div>
                  </div>
                }
                title={t("order_page_modal_text")}
                onClose={onCloseModal}
              />
            </div>
          ) : (
            <div ref={promoModalRef}>
              <ModalRequest
                text={
                  <>
                    <div className="_flex _justify-center _mb-6">
                      <Image src={faceWithRollingEyesSvg} alt="" />
                    </div>
                    {t("promo_error_modal_title")}
                  </>
                }
                onClose={onCleanPromoData}
                showLogo={false}
              />
            </div>
          )}
        </Overlay>
        <div className="_p-10 _bg-light _rounded-3xl _flex _flex-col">
          <SummaryService
            serviceTitle={title}
            counterValue={counter}
            subServiceList={subService.filter(
              (item: { title: string }) =>
                item.title !== "Own_supplies_sub_service",
            )}
            onRemoveSubService={onRemoveSubService}
            t={t}
            manualCleanersCount={mainServiceManualCleanersCount}
            setManualCleanersCount={setMainServiceManualCleanersCount}
            {...mainServiceEstimate}
          />
          {secTitle !== "" ? (
            <>
              <div className="_mt-1 _mb-2 _border-t _border-dashed _border-gray-lighter-x2" />
              <SummaryService
                serviceTitle={secTitle}
                counterValue={secCounter}
                subServiceList={secSubService}
                onRemoveSubService={onRemoveSubService}
                t={t}
                manualCleanersCount={secondServiceManualCleanersCount}
                setManualCleanersCount={setSecondServiceManualCleanersCount}
                {...secondServiceEstimate}
                isSecond
              />
            </>
          ) : null}
          {!subSale ? (
            <PromoInput
              setSale={setSale}
              setPromo={setPromo}
              t={t}
              promoInputValue={promoInputValue}
              setPromoInputValue={setPromoInputValue}
              promoStatus={promoStatus}
              setPromoStatus={setPromoStatus}
            />
          ) : null}
          <div className="_mt-3">
            {`${t("Estimated Duration of service:")} `}
            <b>{higherEstimate}</b>
          </div>
          {city?.price > 0 && (
            <div className="_mt-2">
              <span className="_mr-1.5">
                {t("summary_transportation_title")}:
              </span>
              <span className="_text-2xl _font-semibold">{city.price} zl</span>
            </div>
          )}
          <div
            className="_h-8 _flex _items-baseline _mt-2"
            ref={targetElementRef as any}
          >
            <div className="_mr-1.5">{t("To pay:")}</div>
            {subSale || Boolean(sale) || Boolean(dayDiscount) ? (
              <>
                <div className="_mr-1.5 _text-2xl _font-semibold">
                  {getPriceWithOwnSupplies(
                    getPriceWithSaleOrSubSale(
                      price,
                      sale,
                      subSale,
                      dayDiscount,
                    ),
                    provideOwnSuppliesSelected,
                  )}
                  {t("zl")}
                </div>
                <div className="_text-gray _text-lg _font-semibold _line-through">
                  {getPriceWithOwnSupplies(price, provideOwnSuppliesSelected)}
                  {t("zl")}
                </div>
              </>
            ) : (
              <div className="_mr-1.5 _text-2xl _font-semibold">
                {getPriceWithOwnSupplies(price, provideOwnSuppliesSelected)}
                {t("zl")}
              </div>
            )}
          </div>
        </div>
        <div ref={orderButtonRef}>
          {!order ? (
            <Button
              className="_w-full _h-14"
              disabled={isOrderPriceLessThanMinimum}
              onClick={() => {
                if (!isOrderPriceLessThanMinimum) {
                  setOrder(true);
                }
              }}
              title={t("Order")}
            />
          ) : (
            <>
              <UserData
                name={name}
                setName={setName}
                number={number}
                setNumber={setNumber}
                email={email}
                setEmail={setEmail}
                setTotalDate={setTotalDate}
                setOnlinePayment={setOnlinePayment}
                previousCleaner={previousCleaner}
                setPreviousCleaner={setPreviousCleaner}
                privacyAndPolicy={privacyAndPolicy}
                setPrivacyAndPolicy={setPrivacyAndPolicy}
                personalData={personalData}
                setPersonalData={setPersonalData}
                t={t}
                isPrivateHouse={isPrivateHouse}
                addressObject={addressObject}
                setAddressObject={setAddressObject}
                phoneCountry={phoneCountry}
                setPhoneCountry={setPhoneCountry}
                discounts={discounts}
              />
              <OrderButton
                payload={payload}
                setShowSuccessModal={setSuccessModal}
                setShowPromoErrorModal={setShowPromoErrorModal}
                onCleanPromoData={onCleanPromoData}
                isDisabled={isOrderButtonDisabled}
                isLoading={isOrderLoading}
                setIsLoading={setIsOrderLoading}
                t={t}
              />
            </>
          )}
        </div>
      </div>
      {!scrolledToElement ? (
        <Button
          className={`mobile-only _fixed _bottom-6 _left-1/2 _-translate-y-1/2 _-translate-x-1/2
            _z-50 _w-[90%] _h-14`}
          disabled={isOrderPriceLessThanMinimum}
          onClick={handleScroll}
          title={
            getPriceWithOwnSupplies(price, provideOwnSuppliesSelected) === 0 ? (
              t("Order")
            ) : subSale || Boolean(sale) || Boolean(dayDiscount) ? (
              <div className="_flex _items-end">
                <div className="_mr-2">
                  {getPriceWithOwnSupplies(
                    getPriceWithSaleOrSubSale(
                      price,
                      sale,
                      subSale,
                      dayDiscount,
                    ),
                    provideOwnSuppliesSelected,
                  )}
                  {t("zl")}
                </div>
                <div className="_text-xs _line-through">
                  {getPriceWithOwnSupplies(price, provideOwnSuppliesSelected)}
                  {t("zl")}
                </div>
              </div>
            ) : (
              <div>
                {getPriceWithOwnSupplies(price, provideOwnSuppliesSelected)}
                {t("zl")}
              </div>
            )
          }
        />
      ) : null}
    </>
  );
};
