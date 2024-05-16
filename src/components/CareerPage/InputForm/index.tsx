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
import { createCareer } from "./actions";

export const InputForm = ({ t }: any) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [isSendLoading, setIsSendLoading] = useState<boolean>(false);
  const [phoneCountry, setPhoneCountry] = useState<Country>(DEFAULT_COUNTRY!);
  const [referralCode, setReferralCode] = useState<string>("");
  const [careerError, setCareerError] = useState<boolean>(false);

  const [modal, setModal] = useState(false);
  const ref = useClickOutside(() => setModal(false));

  const requiredFields =
    name &&
    phone &&
    email &&
    POSITIVE_NUMBER_EMPTY_REGEX.test(phone) &&
    EMAIL_REGEX.test(email);

  const onSend = async () => {
    if (!requiredFields) {
      return;
    }

    try {
      setIsSendLoading(true);
      setCareerError(false);

      const response = await createCareer({
        name,
        phone: `+${phoneCountry.phoneCode}${phone}`,
        email,
        about,
        referralCode: referralCode || null,
      });

      if (response.isError) {
        setCareerError(true);

        return;
      }

      setModal(true);
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
            text={t("career_page_modal_text")}
            title={t("career_page_modal_title")}
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
        <div className="input-wrapper">
          <input
            value={referralCode}
            onChange={({ target: { value } }) => setReferralCode(value)}
            placeholder={t("referral_code")}
          />
        </div>
        <div className="input-wrapper text-about-input">
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder={t("Add more details")}
          />
        </div>
      </div>
      <div className="_mb-4">
        <div
          className={`button-wrapper ${
            !requiredFields || isSendLoading ? "order-wrapper-disabled" : ""
          } ${isSendLoading ? "loading" : ""}`}
          onClick={onSend}
        >
          {t("send")}
        </div>
        {careerError && (
          <div className="text-center _mt-2 text-danger _text-center">
            {t("unexpected_error")}
          </div>
        )}
      </div>
    </div>
  );
};
