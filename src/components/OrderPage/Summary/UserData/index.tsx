import React, { useEffect, useState } from "react";

// import { QuestionIcon } from './icons/QuestionIcon';
// import { ReferralIcon } from './icons/ReferralIcon';
import { PaymentForm } from "./components/PaymentForm";
import { CheckBox } from "./components/Checkbox";
import { DateAndTime } from "./components/DateAndTime";
import "./style.scss";
import { OrderAddress } from "@/components/OrderPage/Summary";
import PhoneInput from "@/components/common/PhoneInput";
import Cities, {
  City,
} from "@/components/OrderPage/Summary/UserData/components/Cities";

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
      setAddressObject({ apartment: "", doorPhone: "", entrance: "" });
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

  return (
    <div className="user-data-from">
      <div className="_mb-6 _flex _flex-col _gap-3">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder={t("Surname and Name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="_relative mobile-only">
          <PhoneInput
            t={t}
            number={number}
            setNumber={setNumber}
            phoneCountry={phoneCountry}
            setPhoneCountry={setPhoneCountry}
          />
        </div>
        <div className="_flex _gap-3 _relative">
          <div className="_w-full mobile-none">
            <PhoneInput
              t={t}
              number={number}
              setNumber={setNumber}
              phoneCountry={phoneCountry}
              setPhoneCountry={setPhoneCountry}
            />
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder={t("E-mail")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="_flex _gap-5">
          {!dataLayout ? (
            <div
              className={`select-block ${data && time ? "selected-block" : ""}`}
              style={{ cursor: "pointer" }}
              onClick={() => setDataLayout(true)}
            >
              {!(data && time) ? t("Data and time") : `${data} ${time}`}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 48 49"
                fill="none"
              >
                <path
                  d="M24.0009 14.9027C25.4009 14.9027 26.8009 15.4427 27.8609 16.5027L40.9009 29.5427C41.4809 30.1227 41.4809 31.0827 40.9009 31.6627C40.3209 32.2427 39.3609 32.2427 38.7809 31.6627L25.7409 18.6227C24.7809 17.6627 23.2209 17.6627 22.2609 18.6227L9.22094 31.6627C8.64095 32.2427 7.68094 32.2427 7.10094 31.6627C6.52094 31.0827 6.52094 30.1227 7.10094 29.5427L20.1409 16.5027C21.2009 15.4427 22.6009 14.9027 24.0009 14.9027Z"
                  fill="#13277E"
                />
              </svg>
            </div>
          ) : (
            <div className="select-block-open select-block-open-data-time">
              <DateAndTime
                data={data}
                setData={setData}
                time={time}
                setTime={setTime}
                t={t}
                discounts={discounts}
              />
              <div
                className={`order-wrapper ${
                  !(data && time) ? " order-wrapper-disabled" : ""
                }`}
                onClick={() => {
                  if (!(data && time)) return void 0;
                  setDataLayout(false);
                }}
              >
                {t("Continue")}
              </div>
            </div>
          )}
        </div>
        <div className="_flex _gap-5">
          {!addressLayout ? (
            <div
              className="select-block"
              style={{ cursor: "pointer" }}
              onClick={() => setAddressLayout(true)}
            >
              {isAddressEmpty ? t("Address") : shortAddress}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 48 49"
                fill="none"
              >
                <path
                  d="M24.0009 14.9027C25.4009 14.9027 26.8009 15.4427 27.8609 16.5027L40.9009 29.5427C41.4809 30.1227 41.4809 31.0827 40.9009 31.6627C40.3209 32.2427 39.3609 32.2427 38.7809 31.6627L25.7409 18.6227C24.7809 17.6627 23.2209 17.6627 22.2609 18.6227L9.22094 31.6627C8.64095 32.2427 7.68094 32.2427 7.10094 31.6627C6.52094 31.0827 6.52094 30.1227 7.10094 29.5427L20.1409 16.5027C21.2009 15.4427 22.6009 14.9027 24.0009 14.9027Z"
                  fill="#13277E"
                />
              </svg>
            </div>
          ) : (
            <div
              className={`select-block-open select-block-open-address ${
                overflowUnset ? "overflow-visible" : ""
              }`}
            >
              <div className="_mb-6 _flex _flex-col _gap-3">
                <div className="input-wrapper address-layout">
                  <input
                    type="text"
                    placeholder={t("Street")}
                    value={street}
                    onChange={(e) => setAddressField("street", e.target.value)}
                  />
                </div>
                <div className="_flex _gap-5">
                  <div className="input-wrapper address-layout">
                    <input
                      type="text"
                      placeholder={t("House number")}
                      value={house}
                      onChange={(e) => setAddressField("house", e.target.value)}
                    />
                  </div>
                  {!isPrivateHouse && (
                    <div className="input-wrapper address-layout">
                      <input
                        type="text"
                        placeholder={t("Apartment")}
                        value={apartment}
                        onChange={(e) =>
                          setAddressField("apartment", e.target.value)
                        }
                      />
                    </div>
                  )}
                </div>
                <div className="input-wrapper address-layout">
                  <input
                    type="text"
                    placeholder={t("Postcode")}
                    value={postcode}
                    onChange={(e) =>
                      setAddressField("postcode", e.target.value)
                    }
                  />
                </div>
                <Cities
                  t={t}
                  city={city}
                  setCity={(newCity) => setAddressField("city", newCity)}
                  callback={setOverflowUnset}
                />
                {!isPrivateHouse && (
                  <div className="_flex _gap-5">
                    <div className="input-wrapper address-layout">
                      <input
                        type="text"
                        placeholder={t("Entrance number")}
                        value={entrance}
                        onChange={(e) =>
                          setAddressField("entrance", e.target.value)
                        }
                      />
                    </div>
                    <div className="input-wrapper address-layout">
                      <input
                        type="text"
                        placeholder={t("Doorphone code")}
                        value={doorPhone}
                        onChange={(e) =>
                          setAddressField("doorPhone", e.target.value)
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="input-wrapper address-layout">
                <textarea
                  placeholder={t("Add more details (optional)")}
                  value={more}
                  onChange={(e) => setAddressField("more", e.target.value)}
                />
              </div>
              <div
                className={`order-wrapper ${
                  !requiredFields ? "order-wrapper-disabled" : ""
                }`}
                style={{ marginTop: "24px" }}
                onClick={() => {
                  if (!requiredFields) return void 0;
                  setAddressLayout(false);
                }}
              >
                {t("Continue")}
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={{ marginTop: "24px" }}>
        <CheckBox
          title={"Request previous cleaner"}
          checked={previousCleaner}
          setCheck={setPreviousCleaner}
          t={t}
        />
      </div>
      <div style={{ marginTop: "24px" }}>
        <PaymentForm setOnlinePayment={setOnlinePayment} t={t} />
      </div>
      <div style={{ marginTop: "24px" }}>
        <CheckBox
          title={"Public agreement and Privacy Policy"}
          checked={privacyAndPolicy}
          setCheck={setPrivacyAndPolicy}
          t={t}
          link="/Polityka_prywatności.pdf"
        />
      </div>
      <div style={{ marginTop: "24px" }}>
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
