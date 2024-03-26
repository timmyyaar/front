"use client";
import React, { useState } from "react";

import { ModalRequest } from "@/components/common/ModalRequest";
import { Overlay } from "@/components/common/Overlay";
import { useClickOutside } from "@/hooks/useClickOutSide";
import "./style.scss";
import { EMAIL_REGEX, POSITIVE_NUMBER_EMPTY_REGEX } from "@/constants";
import {
  Country,
  DEFAULT_COUNTRY,
} from "@/components/common/PhoneInput/constants";
import PhoneInput from "@/components/common/PhoneInput";

export const InputForm = ({ t }: any) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [isSendLoading, setIsSendLoading] = useState<boolean>(false);
  const [phoneCountry, setPhoneCountry] = useState<Country>(DEFAULT_COUNTRY!);

  const [modal, setModal] = useState(false);
  const ref = useClickOutside(() => setModal(false));

  const onSend = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/gift",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
          body: JSON.stringify({
            email,
            phone: `+${phoneCountry.phoneCode}${phone}`,
            comment,
          }),
        }
      );

      const data = await response.json();

      if (data.gift.id) {
        setModal(true);
      }

      setEmail("");
      setPhone("");
      setComment("");
    } finally {
      setIsSendLoading(false);
    }
  };

  const isEmailValid = EMAIL_REGEX.test(email);
  const isPhoneValid = POSITIVE_NUMBER_EMPTY_REGEX.test(phone);
  const isSendGiftButtonDisabled =
    (!email && !phone) ||
    (email && !isEmailValid) ||
    (isPhoneValid && !isPhoneValid);

  return (
    <div className="input-form-component">
      <Overlay active={modal}>
        <div ref={ref}>
          <ModalRequest
            text={t("gift_page_modal_title")}
            title={t("gift_page_modal_text")}
            onClose={() => setModal(false)}
          />
        </div>
      </Overlay>
      <div className="_mb-4 _flex _flex-col _gap-4">
        <div className="input-wrapper">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("Email where to send gift")}
          />
        </div>
        <PhoneInput
          t={t}
          number={phone}
          setNumber={setPhone}
          phoneCountry={phoneCountry}
          setPhoneCountry={setPhoneCountry}
          isPhoneRelative
        />
        <div className="input-wrapper text-about-input">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t("Accompanying text")}
          />
        </div>
      </div>
      <div className="_mb-6 _flex _flex-col _gap-3">
        <div
          className={`button-wrapper ${
            isSendGiftButtonDisabled || isSendLoading
              ? "order-wrapper-disabled"
              : ""
          } ${isSendLoading ? "loading" : ""}`}
          onClick={() => {
            if (!isSendGiftButtonDisabled) {
              onSend();
            }
          }}
        >
          {t("send")}
        </div>
      </div>
    </div>
  );
};
