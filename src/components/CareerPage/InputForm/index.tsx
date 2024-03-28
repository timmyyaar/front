"use client";
import React, { useState } from "react";

import { ModalRequest } from "@/components/common/ModalRequest";
import { Overlay } from "@/components/common/Overlay";
import { useClickOutside } from "@/hooks/useClickOutSide";
import "./style.scss";
import { EMAIL_REGEX, POSITIVE_NUMBER_EMPTY_REGEX } from "@/constants";
import PhoneInput from "@/components/common/PhoneInput";
import {
  Country,
  DEFAULT_COUNTRY,
} from "@/components/common/PhoneInput/constants";

export const InputForm = ({ t }: any) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [isSendLoading, setIsSendLoading] = useState<boolean>(false);
  const [phoneCountry, setPhoneCountry] = useState<Country>(DEFAULT_COUNTRY!);

  const [modal, setModal] = useState(false);
  const ref = useClickOutside(() => setModal(false));

  const requiredFields =
    name &&
    phone &&
    email &&
    POSITIVE_NUMBER_EMPTY_REGEX.test(phone) &&
    EMAIL_REGEX.test(email);

  const onSend = async () => {
    try {
      setIsSendLoading(true);

      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/careers",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
          body: JSON.stringify({
            name,
            phone: `+${phoneCountry.phoneCode}${phone}`,
            email,
            about,
          }),
        }
      );

      const data = await response.json();

      if (data.id) {
        setModal(true);
      }

      setName("");
      setPhone("");
      setEmail("");
      setAbout("");
    } finally {
      setIsSendLoading(false);
    }
  };

  return (
    <div className="input-form-component">
      <Overlay active={modal}>
        <div ref={ref}>
          <ModalRequest
            text={t("career_page_modal_title")}
            title={t("career_page_modal_text")}
            onClose={() => setModal(false)}
          />
        </div>
      </Overlay>
      <div className="_mb-6 _flex _flex-col _gap-3">
        <div className="input-wrapper">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("Surname and Name")}
          />
        </div>
        <div className="_relative mobile-only">
          <PhoneInput
            t={t}
            number={phone}
            setNumber={setPhone}
            phoneCountry={phoneCountry}
            setPhoneCountry={setPhoneCountry}
          />
        </div>
        <div className="_flex _gap-3 _relative">
          <div className="_w-full mobile-none">
            <PhoneInput
              t={t}
              number={phone}
              setNumber={setPhone}
              phoneCountry={phoneCountry}
              setPhoneCountry={setPhoneCountry}
            />
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("E-mail")}
            />
          </div>
        </div>
        <div className="input-wrapper text-about-input">
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder={t("Add more details")}
          />
        </div>
      </div>
      <div className="_mb-4 _flex _flex-col _gap-3">
        <div
          className={`button-wrapper ${
            !requiredFields || isSendLoading ? "order-wrapper-disabled" : ""
          } ${isSendLoading ? "loading" : ""}`}
          onClick={() => {
            if (requiredFields) onSend();
          }}
        >
          {t("send")}
        </div>
      </div>
    </div>
  );
};
