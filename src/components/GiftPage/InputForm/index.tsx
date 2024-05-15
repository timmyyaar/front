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
import { createGift } from "@/components/GiftPage/InputForm/actions";

export const InputForm = ({ t }: any) => {
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [isSendLoading, setIsSendLoading] = useState<boolean>(false);
  const [phoneCountry, setPhoneCountry] = useState<Country>(DEFAULT_COUNTRY!);
  const [giftError, setGiftError] = useState<boolean>(false);

  const [modal, setModal] = useState(false);
  const ref = useClickOutside(() => setModal(false));

  const isEmailValid = EMAIL_REGEX.test(email);
  const isPhoneValid = POSITIVE_NUMBER_EMPTY_REGEX.test(phone);
  const isSendGiftButtonDisabled =
    (!email && !phone) ||
    (email && !isEmailValid) ||
    (isPhoneValid && !isPhoneValid);

  const onSend = async () => {
    if (isSendGiftButtonDisabled) {
      return;
    }

    try {
      setIsSendLoading(true);
      setGiftError(false);

      const response = await createGift({
        email,
        phone: `+${phoneCountry.phoneCode}${phone}`,
        comment,
      });

      if (response.isError) {
        setGiftError(true);

        return;
      }

      setModal(true);
      setEmail("");
      setPhone("");
      setComment("");
    } finally {
      setIsSendLoading(false);
    }
  };

  return (
    <div className="input-form-component">
      <Overlay active={modal}>
        <div ref={ref}>
          <ModalRequest
            text={t("gift_page_modal_text")}
            title={t("order_page_modal_text")}
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
      <div className="_mb-4">
        <div
          className={`button-wrapper ${
            isSendGiftButtonDisabled || isSendLoading
              ? "order-wrapper-disabled"
              : ""
          } ${isSendLoading ? "loading" : ""}`}
          onClick={onSend}
        >
          {t("send")}
        </div>
        {giftError && (
          <div className="text-center _mt-2 text-danger _text-center">
            {t("unexpected_error")}
          </div>
        )}
      </div>
    </div>
  );
};
