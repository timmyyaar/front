import React, { useEffect, useState } from "react";

// import { QuestionIcon } from './icons/QuestionIcon';
// import { ReferralIcon } from './icons/ReferralIcon';
import { PaymentForm } from "./components/PaymentForm";
import { CheckBox } from "./components/Checkbox";
import { DateAndTime } from "./components/DateAndTime";
import "./style.scss";

export const UserData = ({
  name,
  setName,
  number,
  setNumber,
  email,
  setEmail,
  setTotalAddress,
  setTotalDate,
  setOnlinePayment,
  previousCleaner,
  setPreviousCleaner,
  privacyAndPolicy,
  setPrivacyAndPolicy,
  personalData,
  setPersonalData,
  t,
}: any) => {
  const [dataLayout, setDataLayout] = useState(false);
  const [data, setData] = useState('');
  const [time, setTime] = useState('');
  const [addressLayout, setAddressLayout] = useState(false);
  const [address, setAddress] = useState("");

  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");
  const [apartment, setApartment] = useState("");
  const [postcode, setPostCode] = useState("");
  const [entrance, setEntrance] = useState("");
  const [doorPhone, setDoorPhone] = useState("");
  const [more, setMore] = useState("");

  const requiredFields = street && house && apartment;

  useEffect(() => {
    if (
      !addressLayout &&
      (street ||
        house ||
        apartment ||
        postcode ||
        entrance ||
        doorPhone ||
        more)
    ) {
      setAddress(
        `${street} ${house} ${apartment} ${postcode} ${entrance} ${doorPhone} ${more}`
      );
    }
  }, [addressLayout]);

  useEffect(() => {
    setTotalAddress(address);
    setTotalDate(`${data} ${time}`);
  }, [address, data, time]);

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
        <div className="_flex _gap-5">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder={t("Contact number")}
              value={number}
              onChange={(e) => setNumber(e.target.value)}
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
            <div className={`select-block ${data && time ? 'selected-block' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setDataLayout(true)}>
              {!(data && time) ? t('Data and time') : `${data} ${time}`}
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 48 49" fill="none">
                <path d="M24.0009 14.9027C25.4009 14.9027 26.8009 15.4427 27.8609 16.5027L40.9009 29.5427C41.4809 30.1227 41.4809 31.0827 40.9009 31.6627C40.3209 32.2427 39.3609 32.2427 38.7809 31.6627L25.7409 18.6227C24.7809 17.6627 23.2209 17.6627 22.2609 18.6227L9.22094 31.6627C8.64095 32.2427 7.68094 32.2427 7.10094 31.6627C6.52094 31.0827 6.52094 30.1227 7.10094 29.5427L20.1409 16.5027C21.2009 15.4427 22.6009 14.9027 24.0009 14.9027Z" fill="#13277E"/>
              </svg>
            </div>
          ) : (
            <div className="select-block-open select-block-open-data-time">
              <DateAndTime data={data} setData={setData} time={time} setTime={setTime} t={t} />
              <div
                className={`order-wrapper ${!(data && time) ? ' order-wrapper-disabled' : ''}`}
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
            <div className="select-block" style={{ cursor: 'pointer' }} onClick={() => setAddressLayout(true)}>
              {address === '' ? t('Address') : address}
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 48 49" fill="none">
                <path d="M24.0009 14.9027C25.4009 14.9027 26.8009 15.4427 27.8609 16.5027L40.9009 29.5427C41.4809 30.1227 41.4809 31.0827 40.9009 31.6627C40.3209 32.2427 39.3609 32.2427 38.7809 31.6627L25.7409 18.6227C24.7809 17.6627 23.2209 17.6627 22.2609 18.6227L9.22094 31.6627C8.64095 32.2427 7.68094 32.2427 7.10094 31.6627C6.52094 31.0827 6.52094 30.1227 7.10094 29.5427L20.1409 16.5027C21.2009 15.4427 22.6009 14.9027 24.0009 14.9027Z" fill="#13277E"/>
              </svg>
            </div>
          ) : (
            <div className="select-block-open select-block-open-address">
              <div className="_mb-6 _flex _flex-col _gap-3">
                <div className="input-wrapper address-layout">
                  <input
                    type="text"
                    placeholder={t("Street")}
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>
                <div className="_flex _gap-5">
                  <div className="input-wrapper address-layout">
                    <input
                      type="text"
                      placeholder={t("House number")}
                      value={house}
                      onChange={(e) => setHouse(e.target.value)}
                    />
                  </div>
                  <div className="input-wrapper address-layout">
                    <input
                      type="text"
                      placeholder={t("Apartment")}
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                    />
                  </div>
                </div>
                <div className="_flex _gap-5">
                  <div className="input-wrapper address-layout">
                    <input
                      type="text"
                      placeholder={t("Postcode")}
                      value={postcode}
                      onChange={(e) => setPostCode(e.target.value)}
                    />
                  </div>
                  <div className="input-wrapper address-layout">
                    {/* <input type="text" placeholder="Floor" /> */}
                    <div className="city-wrapper">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M17 9V7C17 4.2 14.8 2 12 2C9.2 2 7 4.2 7 7V9C5.3 9 4 10.3 4 12V19C4 20.7 5.3 22 7 22H17C18.7 22 20 20.7 20 19V12C20 10.3 18.7 9 17 9ZM9 7C9 5.3 10.3 4 12 4C13.7 4 15 5.3 15 7V9H9V7Z"
                          fill="#848484"
                        />
                      </svg>
                      <div className="city-name-wrapper">Krakow</div>
                    </div>
                  </div>
                </div>
                <div className="_flex _gap-5">
                  <div className="input-wrapper address-layout">
                    <input
                      type="text"
                      placeholder={t("Entrance number")}
                      value={entrance}
                      onChange={(e) => setEntrance(e.target.value)}
                    />
                  </div>
                  <div className="input-wrapper address-layout">
                    <input
                      type="text"
                      placeholder={t("Doorphone code")}
                      value={doorPhone}
                      onChange={(e) => setDoorPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="input-wrapper address-layout">
                <textarea
                  placeholder={t("Add more details (optional)")}
                  value={more}
                  onChange={(e) => setMore(e.target.value)}
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
        />
      </div>
      <div style={{ marginTop: "24px" }}>
        <CheckBox
          title={"Personal data"}
          checked={personalData}
          setCheck={setPersonalData}
          t={t}
        />
      </div>
    </div>
  );
};
