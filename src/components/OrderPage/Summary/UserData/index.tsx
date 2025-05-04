import React, { ChangeEvent, useEffect, useState } from "react";

import { PaymentForm } from "./components/PaymentForm";
import { CheckBox } from "./components/Checkbox";
import { DateAndTime } from "./components/DateAndTime";
import "./style.scss";
import { OrderAddress } from "@/components/OrderPage/Summary";
import PhoneInput from "@/components/common/PhoneInput";
import Cities, {
  City,
} from "@/components/OrderPage/Summary/UserData/components/Cities";
import Input from "@/components/OrderPage/Summary/UserData/components/Input";
import Button from "@/components/common/Button";
import lockSvg from "./icons/lock.svg";
import { useSearchParams } from "next/navigation";
import { CITIES } from "@/constants";

export const UserData = ({
  name,
  setName,
  number,
  setNumber,
  email,
  setEmail,
  setTotalDate,
  setOnlinePayment,
  previousCleaner,
  setPreviousCleaner,
  privacyAndPolicy,
  setPrivacyAndPolicy,
  personalData,
  setPersonalData,
  t,
  isPrivateHouse,
  addressObject,
  setAddressObject,
  phoneCountry,
  setPhoneCountry,
  discounts,
}: any) => {
  const [dataLayout, setDataLayout] = useState(false);
  const [data, setData] = useState("");
  const [time, setTime] = useState("");
  const [addressLayout, setAddressLayout] = useState(false);
  const [overflowUnset, setOverflowUnset] = useState(false);

  const searchParams = useSearchParams();

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

  const shortAddress = `${street} ${house} ${apartment} ${postcode} ${entrance} ${doorPhone} ${more}`;

  const setAddressField = (fieldName: string, value: string | City) => {
    setAddressObject((prev: OrderAddress) => ({ ...prev, [fieldName]: value }));
  };

  const requiredFields = street && house && (isPrivateHouse ? true : apartment);

  useEffect(() => {
    if (isPrivateHouse) {
      setAddressObject((prev: OrderAddress) => ({
        ...prev,
        apartment: "",
        doorPhone: "",
        entrance: "",
      }));
    }
  }, [isPrivateHouse]);

  const isAddressEmpty =
    !street &&
    !house &&
    !apartment &&
    !postcode &&
    !entrance &&
    !doorPhone &&
    !more;

  useEffect(() => {
    setTotalDate(`${data} ${time}`);
  }, [data, time]);

  const cityUrl = searchParams.get("city");
  const selectedCity =
    Object.values(CITIES).find(({ name }) => name === cityUrl) || CITIES.KRAKOW;
  const isSingleCity = selectedCity.isSingle;

  useEffect(() => {
    setAddressField("city", { name: selectedCity.name, price: 0 });
  }, [selectedCity]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3">
        <Input
          type="text"
          placeholder={t("Surname and Name")}
          value={name}
          onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
            setName(value)
          }
        />
        <div className="relative mobile-only">
          <PhoneInput
            t={t}
            number={number}
            setNumber={setNumber}
            phoneCountry={phoneCountry}
            setPhoneCountry={setPhoneCountry}
          />
        </div>
        <div className="flex gap-3 relative">
          <div className="w-full mobile-none">
            <PhoneInput
              t={t}
              number={number}
              setNumber={setNumber}
              phoneCountry={phoneCountry}
              setPhoneCountry={setPhoneCountry}
            />
          </div>
          <Input
            type="text"
            placeholder={t("E-mail")}
            value={email}
            onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
              setEmail(value)
            }
          />
        </div>
        <div className="flex gap-5">
          {!dataLayout ? (
            <div
              className={`flex justify-between items-center p-3 cursor-pointer
                w-full bg-light rounded-xl text-gray-lighter ${
                  data && time ? "text-gray-dark" : ""
                }`}
              onClick={() => setDataLayout(true)}
            >
              {!(data && time) ? t("Data and time") : `${data} ${time}`}
              <svg
                className="rotate-180 text-gray-lighter"
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 48 49"
                fill="none"
              >
                <path
                  d="M24.0009 14.9027C25.4009 14.9027 26.8009 15.4427 27.8609 16.5027L40.9009 29.5427C41.4809 30.1227 41.4809 31.0827 40.9009 31.6627C40.3209 32.2427 39.3609 32.2427 38.7809 31.6627L25.7409 18.6227C24.7809 17.6627 23.2209 17.6627 22.2609 18.6227L9.22094 31.6627C8.64095 32.2427 7.68094 32.2427 7.10094 31.6627C6.52094 31.0827 6.52094 30.1227 7.10094 29.5427L20.1409 16.5027C21.2009 15.4427 22.6009 14.9027 24.0009 14.9027Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          ) : (
            <div className="p-3 w-full bg-light rounded-xl overflow-hidden select-block-open-data-time">
              <DateAndTime
                data={data}
                setData={setData}
                time={time}
                setTime={setTime}
                t={t}
                discounts={discounts}
              />
              <Button
                className="mt-2 w-full h-11"
                disabled={!(data && time)}
                onClick={() => {
                  if (!(data && time)) return void 0;

                  setDataLayout(false);
                }}
                title={t("Continue")}
              />
            </div>
          )}
        </div>
        <div className="flex gap-5">
          {!addressLayout ? (
            <div
              className={`flex justify-between items-center p-3 cursor-pointer
                w-full bg-light rounded-xl text-gray-lighter`}
              onClick={() => setAddressLayout(true)}
            >
              {isAddressEmpty ? t("Address") : shortAddress}
              <svg
                className="rotate-180 text-gray-lighter"
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 48 49"
                fill="none"
              >
                <path
                  d="M24.0009 14.9027C25.4009 14.9027 26.8009 15.4427 27.8609 16.5027L40.9009 29.5427C41.4809 30.1227 41.4809 31.0827 40.9009 31.6627C40.3209 32.2427 39.3609 32.2427 38.7809 31.6627L25.7409 18.6227C24.7809 17.6627 23.2209 17.6627 22.2609 18.6227L9.22094 31.6627C8.64095 32.2427 7.68094 32.2427 7.10094 31.6627C6.52094 31.0827 6.52094 30.1227 7.10094 29.5427L20.1409 16.5027C21.2009 15.4427 22.6009 14.9027 24.0009 14.9027Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          ) : (
            <div
              className={`p-3 w-full bg-light rounded-xl overflow-hidden ${
                overflowUnset ? "overflow-visible" : ""
              }`}
            >
              <div className="mb-6 flex flex-col gap-3">
                <Input
                  isBordered
                  type="text"
                  placeholder={t("Street")}
                  value={street}
                  onChange={({
                    target: { value },
                  }: ChangeEvent<HTMLInputElement>) =>
                    setAddressField("street", value)
                  }
                />
                <div className="flex gap-5">
                  <Input
                    isBordered
                    type="text"
                    placeholder={t("House number")}
                    value={house}
                    onChange={({
                      target: { value },
                    }: ChangeEvent<HTMLInputElement>) =>
                      setAddressField("house", value)
                    }
                  />
                  {!isPrivateHouse && (
                    <Input
                      isBordered
                      type="text"
                      placeholder={t("Apartment")}
                      value={apartment}
                      onChange={({
                        target: { value },
                      }: ChangeEvent<HTMLInputElement>) =>
                        setAddressField("apartment", value)
                      }
                    />
                  )}
                </div>
                <Input
                  isBordered
                  type="text"
                  placeholder={t("Postcode")}
                  value={postcode}
                  onChange={({
                    target: { value },
                  }: ChangeEvent<HTMLInputElement>) =>
                    setAddressField("postcode", value)
                  }
                />
                {isSingleCity ? (
                  <Input
                    isBordered
                    icon={lockSvg}
                    disabled
                    type="text"
                    placeholder={t("E-mail")}
                    value={t(selectedCity.name)}
                  />
                ) : (
                  <Cities
                    t={t}
                    city={city}
                    setCity={(newCity) => setAddressField("city", newCity)}
                    callback={setOverflowUnset}
                  />
                )}
                {!isPrivateHouse && (
                  <div className="flex gap-5">
                    <Input
                      isBordered
                      type="text"
                      placeholder={t("Entrance number")}
                      value={entrance}
                      onChange={({
                        target: { value },
                      }: ChangeEvent<HTMLInputElement>) =>
                        setAddressField("entrance", value)
                      }
                    />
                    <Input
                      isBordered
                      type="text"
                      placeholder={t("Doorphone code")}
                      value={doorPhone}
                      onChange={({
                        target: { value },
                      }: ChangeEvent<HTMLInputElement>) =>
                        setAddressField("doorPhone", value)
                      }
                    />
                  </div>
                )}
              </div>
              <textarea
                className="w-full border border-solid border-gray py-3 pl-3
                    bg-light rounded-xl outline-0 text-gray-dark"
                placeholder={t("Add more details (optional)")}
                value={more}
                onChange={({
                  target: { value },
                }: ChangeEvent<HTMLTextAreaElement>) =>
                  setAddressField("more", value)
                }
              />
              <Button
                className="mt-6 w-full h-11"
                disabled={!requiredFields}
                onClick={() => {
                  if (!requiredFields) return void 0;

                  setAddressLayout(false);
                }}
                title={t("Continue")}
              />
            </div>
          )}
        </div>
      </div>
      <div className="mt-6">
        <CheckBox
          title={"Request previous cleaner"}
          checked={previousCleaner}
          setCheck={setPreviousCleaner}
          t={t}
        />
      </div>
      <div className="mt-6">
        <PaymentForm setOnlinePayment={setOnlinePayment} t={t} />
      </div>
      <div className="mt-6">
        <CheckBox
          title={"Public agreement and Privacy Policy"}
          checked={privacyAndPolicy}
          setCheck={setPrivacyAndPolicy}
          t={t}
          link="/Polityka_prywatności.pdf"
        />
      </div>
      <div className="mt-6">
        <CheckBox
          title={"Personal data"}
          checked={personalData}
          setCheck={setPersonalData}
          t={t}
          link="/Warunki_i_postanowienia.pdf"
        />
      </div>
    </div>
  );
};
