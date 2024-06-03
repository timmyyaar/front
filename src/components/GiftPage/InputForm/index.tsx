"use client";
import React, { useState } from "react";

import { ModalRequest } from "@/components/common/ModalRequest";
import { Overlay } from "@/components/common/Overlay";
import { useClickOutside } from "@/hooks/useClickOutSide";
import { EMAIL_REGEX, POSITIVE_NUMBER_EMPTY_REGEX } from "@/constants";
import {
  Country,
  DEFAULT_COUNTRY,
} from "@/components/common/PhoneInput/constants";
import PhoneInput from "@/components/common/PhoneInput";
import { createGift } from "@/components/GiftPage/InputForm/actions";
import Button from "@/components/common/Button";

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
    <div className="_px-20-percents-desktop _px-4">
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
        <div className="_w-full">
          <input
            className={`_w-full _py-3.5 _pl-3.5 __w-full _bg-light
              _rounded-xl _outline-0 _text-gray-dark`}
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
        />
        <div className="_w-full">
          <textarea
            className={`_w-full _py-3.5 _pl-3.5 __w-full _bg-light
              _rounded-xl _outline-0 _text-gray-dark`}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t("Accompanying text")}
            rows={4}
          />
        </div>
      </div>
      <div className="_mb-4">
        <Button
          className="_w-full"
          onClick={onSend}
          title={t("send")}
          disabled={isSendGiftButtonDisabled || isSendLoading}
          isLoading={isSendLoading}
        />
        {giftError && (
          <div className="_text-center _mt-2 _text-danger">
            {t("unexpected_error")}
          </div>
        )}
      </div>
    </div>
  );
};
