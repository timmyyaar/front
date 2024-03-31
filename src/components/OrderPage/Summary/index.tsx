import React, { FC, useState, useEffect, useRef } from "react";

import { useRouter } from "next/navigation";
import Image from "next/image";

import faceWithRollingEyesSvg from "./icons/face-with-rolling-eyes.svg";

import { ModalRequest } from "@/components/common/ModalRequest";
import { Overlay } from "@/components/common/Overlay";
import { useClickOutside } from "@/hooks/useClickOutSide";
import { ISubService } from "../SubServicesList/utils";
import { IconCrosse } from "./icons/IconCrosse";
import { PromoInput } from "./PromoCodeInput";
import { UserData } from "./UserData";
import {
  getHitherEstimate,
  getMinimalPriceByMainService,
  getPriceFromCounterByService,
  getPriceWithSaleOrSubSale,
  getServiceEstimate,
  getServicePriceBasedOnManualCleaners,
  getSubServices,
} from "./utils";
import "./style.scss";
import { EMAIL_REGEX, NUMBER_REGEX } from "@/constants";
import {
  DEFAULT_COUNTRY,
  Country,
} from "@/components/common/PhoneInput/constants";
import { OWN_SUPPLES_SERVICE_NAME } from "@/components/OrderPage/constants";
import { City } from "@/components/OrderPage/Summary/UserData/components/Cities";
import SummaryService from "@/components/OrderPage/Summary/SummaryService";

interface IProps {
  title: string;
  counter: { title: string; value: string; type?: string; param?: string }[];
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

export const Summary: FC<IProps> = (props: any) => {
  const {
    title,
    counter,
    subService,
    setSubService,
    secTitle = "",
    secCounter = {},
    secSubService = [],
    setSecSubService = () => {},
    subSale = "",
    t,
    isPrivateHouse,
  } = props;
  const [sale, setSale] = useState(0);
  const [promoInputValue, setPromoInputValue] = useState<string>("");
  const [promo, setPromo] = useState("");
  const [promoStatus, setPromoStatus] = useState<string>("");
  const [order, setOrder] = useState(false);
  const [scrolledToElement, targetElementRef] = ScrollDetector();

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [phoneCountry, setPhoneCountry] = useState<Country>(DEFAULT_COUNTRY!);
  const [email, setEmail] = useState("");
  const [totalDate, setTotalDate] = useState("");

  const [onlinePayment, setOnlinePayment] = useState(false);

  const [previousCleaner, setPreviousCleaner] = useState(false);
  const [privacyAndPolicy, setPrivacyAndPolicy] = useState(false);
  const [personalData, setPersonalData] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);

  const [addressObject, setAddressObject] = useState<OrderAddress>({
    street: "",
    house: "",
    apartment: "",
    postcode: "",
    entrance: "",
    doorPhone: "",
    more: "",
    city: { name: "Kraków", price: 0 },
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

  const [modal, setModal] = useState(false);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [showPromoErrorModal, setShowPromoErrorModal] =
    useState<boolean>(false);
  const [mainServiceManualCleanersCount, setMainServiceManualCleanersCount] =
    useState<number>(0);
  const [
    secondServiceManualCleanersCount,
    setSecondServiceManualCleanersCount,
  ] = useState<number>(0);

  const dayDiscount =
    discounts.find(({ date }) => date === totalDate?.split(" ")[0])?.value || 0;

  const onCloseModal = () => {
    setModal(false);
    router.push("/");
  };

  const onClosePromoErrorModal = () => {
    setShowPromoErrorModal(false);
    setPromo("");
    setSale(0);
    setPromoInputValue("");
    setPromoStatus("");
  };

  const ref = useClickOutside(() => onCloseModal());
  const promoModalRef = useClickOutside(() => onClosePromoErrorModal());

  const getDiscounts = async () => {
    try {
      const discountsResponse = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/discounts"
      );

      if (!discountsResponse.ok) {
        setDiscounts([]);
      } else {
        const parsedDiscounts = (await discountsResponse.json()) as Discount[];

        setDiscounts(parsedDiscounts);
      }
    } catch (error) {
      setDiscounts([]);
    }
  };

  useEffect(() => {
    getDiscounts();
  }, []);

  const onRemoveSubService = (title: string, sec: boolean) => {
    if (!sec) {
      setSubService((oldSubServices: any) => {
        return oldSubServices.filter((el: ISubService) => el.title !== title);
      });
    } else {
      setSecSubService((oldSubServices: any) => {
        return oldSubServices.filter((el: ISubService) => el.title !== title);
      });
    }
  };

  const getMainServicePrice = () => {
    const countEstimate =
      getPriceFromCounterByService(title, counter) * (isPrivateHouse ? 1.3 : 1);
    const subServiceEstimate = subService.reduce(
      (acc: number, el: ISubService) => (acc += el?.price || 0),
      0
    );

    return countEstimate + subServiceEstimate;
  };

  const getSecondServicePrice = () => {
    const secCountEstimate = getPriceFromCounterByService(secTitle, secCounter);
    const secSubServiceEstimate = secSubService.reduce(
      (acc: number, el: ISubService) => (acc += el?.price || 0),
      0
    );

    return secCountEstimate + secSubServiceEstimate;
  };

  const mainServiceEstimate = getServiceEstimate(
    title,
    counter,
    subService,
    isPrivateHouse
  );
  const secondServiceEstimate = getServiceEstimate(
    secTitle,
    secCounter,
    secSubService
  );

  const mainServicePrice = getServicePriceBasedOnManualCleaners(
    getMainServicePrice(),
    mainServiceEstimate.cleanersCount,
    mainServiceManualCleanersCount
  );
  const secondServicePrice = getServicePriceBasedOnManualCleaners(
    getSecondServicePrice(),
    secondServiceEstimate.cleanersCount,
    secondServiceManualCleanersCount
  );
  const mainServicePriceWithSale = getPriceWithSaleOrSubSale(
    mainServicePrice,
    sale,
    subSale,
    dayDiscount
  );
  const secondServicePriceWithSale = getPriceWithSaleOrSubSale(
    secondServicePrice,
    sale,
    subSale,
    dayDiscount
  );

  const getPrice = () => {
    const finalPrice = mainServicePrice + secondServicePrice;

    return parseFloat(finalPrice.toFixed(1));
  };

  const price = getPrice();
  const priceWithSale = getPriceWithSaleOrSubSale(
    price,
    sale,
    subSale,
    dayDiscount
  );

  const handleScroll = () => {
    const targetElement = document.getElementById("order-btn");

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const sendData = async () => {
    const main = {
      name,
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
      mainServicePriceOriginal: mainServicePrice,
      secondServicePriceOriginal: secondServicePrice,
      priceOriginal: price,
      promo,
      mainServiceEstimate: mainServiceEstimate.time,
      mainServiceCleanersCount: mainServiceEstimate.cleanersCount,
      secondServiceEstimate: secondServiceEstimate.time,
      secondServiceCleanersCount: secondServiceEstimate.cleanersCount,
      additionalInformation: more,
      city: city.name,
      transportationPrice: city.price,
    };

    const mainService = {
      title,
      counter: counter
        .map((el: any) =>
          el.title ? el.title + "(" + el.value + ")" : el.value
        )
        .join(" "),
      subService: getSubServices(subService)
        .map(
          (title: string) =>
            `${title + "_summery"} (${
              subService.filter((el: ISubService) => el.title === title).length
            })`
        )
        .join(" "),
    };

    const secService =
      secondServicePrice > 0 && secTitle
        ? {
            secTitle,
            secCounter: secCounter
              .map((el: any) =>
                el.title ? el.title + "(" + el.value + ")" : el.value
              )
              .join(" "),
            secSubService: getSubServices(secSubService)
              .map(
                (title: string) =>
                  `${title + "_summery"} (${
                    secSubService.filter(
                      (el: ISubService) => el.title === title
                    ).length
                  })`
              )
              .join(" "),
          }
        : {};

    setIsOrderLoading(true);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
          body: JSON.stringify({ ...main, ...mainService, ...secService }),
        }
      );

      if (!response.ok && response.status === 409) {
        setShowPromoErrorModal(true);

        return;
      }

      const data = await response.json();

      if (data) {
        setModal(true);
      }
    } finally {
      setIsOrderLoading(false);
    }
  };

  const addressRequiredFields =
    street && house && (isPrivateHouse ? true : apartment);

  const provideOwnSuppliesSelected = subService.find(
    ({ title }: { title: string }) => title === OWN_SUPPLES_SERVICE_NAME
  );
  const minimalPrice = getMinimalPriceByMainService(title);
  const minimalPriceWithSales = getPriceWithSaleOrSubSale(
    minimalPrice + (provideOwnSuppliesSelected?.price || 0),
    sale,
    subSale,
    dayDiscount
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
    price > 0;

  const higherEstimate = getHitherEstimate(
    mainServiceEstimate.time,
    secondServiceEstimate.time
  );

  return (
    <>
      <div className="summary-layout">
        <Overlay active={modal || showPromoErrorModal}>
          {modal ? (
            <div ref={ref}>
              <ModalRequest
                text={t("order_page_modal_title")}
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
                onClose={onClosePromoErrorModal}
                showLogo={false}
              />
            </div>
          )}
        </Overlay>
        <div className="summary-wrapper _flex _flex-col">
          <SummaryService
            serviceTitle={title}
            counterValue={counter}
            subServiceList={subService}
            onRemoveSubService={onRemoveSubService}
            t={t}
            manualCleanersCount={mainServiceManualCleanersCount}
            setManualCleanersCount={setMainServiceManualCleanersCount}
            {...mainServiceEstimate}
          />
          {secTitle !== "" ? (
            <>
              <div className="summary-wrapper-separator" />
              <SummaryService
                serviceTitle={secTitle}
                counterValue={secCounter}
                subServiceList={secSubService}
                onRemoveSubService={onRemoveSubService}
                t={t}
                manualCleanersCount={secondServiceManualCleanersCount}
                setManualCleanersCount={setSecondServiceManualCleanersCount}
                {...secondServiceEstimate}
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
              <span className="title">
                {t("summary_transportation_title")}:
              </span>
              <span className="price-title">{city.price} zl</span>
            </div>
          )}
          <div
            className="to-pay-wrapper _flex _items-baseline _mt-2"
            ref={targetElementRef as any}
          >
            <div className="title">{t("To pay:")}</div>
            {subSale || Boolean(sale) || Boolean(dayDiscount) ? (
              <>
                <div className="current-price">
                  {getPriceWithSaleOrSubSale(price, sale, subSale, dayDiscount)}
                  {t("zl")}
                </div>
                <div className="old-price">
                  {price}
                  {t("zl")}
                </div>
              </>
            ) : (
              <div className="current-price">
                {price}
                {t("zl")}
              </div>
            )}
          </div>
        </div>
        <div id="order-btn">
          {!order ? (
            <div
              className={`order-wrapper _cursor-pointer ${
                isOrderPriceLessThanMinimum ? "order-wrapper-disabled" : ""
              }`}
              onClick={() => setOrder(true)}
            >
              {t("Order")}
            </div>
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
              <div
                className={`order-wrapper _cursor-pointer ${
                  !requiredFields ||
                  isOrderLoading ||
                  isOrderPriceLessThanMinimum
                    ? "order-wrapper-disabled"
                    : ""
                } ${isOrderLoading ? "loading" : ""}`}
                style={{ marginTop: "24px" }}
                onClick={() => {
                  if (
                    !requiredFields ||
                    isOrderLoading ||
                    isOrderPriceLessThanMinimum
                  )
                    return void 0;
                  sendData();
                }}
              >
                {t("Order")}
              </div>
            </>
          )}
        </div>
      </div>
      {!scrolledToElement ? (
        <div
          className={`order-wrapper-absolute _cursor-pointer mobile-only-flex ${
            isOrderPriceLessThanMinimum ? "order-wrapper-disabled" : ""
          }`}
          onClick={handleScroll}
        >
          {price === 0 ? (
            t("Order")
          ) : subSale || Boolean(sale) || Boolean(dayDiscount) ? (
            <div className="_flex _items-end">
              <div className="current-price _mr-2">
                {getPriceWithSaleOrSubSale(price, sale, subSale, dayDiscount)}
                {t("zl")}
              </div>
              <div className="old-price">
                {price}
                {t("zl")}
              </div>
            </div>
          ) : (
            <div className="current-price">
              {price}
              {t("zl")}
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};
