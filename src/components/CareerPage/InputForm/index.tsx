"use client";
import React, { useState } from "react";

import { ModalRequest } from "@/components/common/ModalRequest";
import { Overlay } from "@/components/common/Overlay";
import { useClickOutside } from "@/hooks/useClickOutSide";
import { EMAIL_REGEX, POSITIVE_NUMBER_EMPTY_REGEX } from "@/constants";
import PhoneInput from "@/components/common/PhoneInput";
import {
  Country,
  DEFAULT_COUNTRY,
} from "@/components/common/PhoneInput/constants";
import { createCareer } from "./actions";
import Button from "@/components/common/Button";

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
    <div className="px-20-percents-desktop px-4">
      <Overlay active={modal}>
        <div ref={ref}>
          <ModalRequest
            text={t("career_page_modal_text")}
            title={t("career_page_modal_title")}
            onClose={() => setModal(false)}
          />
        </div>
      </Overlay>
      <div className="mb-6 flex flex-col gap-3">
        <div className="w-full">
          <input
            className={`w-full py-3.5 pl-3.5 w-full bg-light
              rounded-xl outline-0 text-gray-dark`}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("Surname and Name")}
          />
        </div>
        <div className="relative mobile-only">
          <PhoneInput
            t={t}
            number={phone}
            setNumber={setPhone}
            phoneCountry={phoneCountry}
            setPhoneCountry={setPhoneCountry}
          />
        </div>
        <div className="flex gap-3 relative">
          <div className="w-full mobile-none">
            <PhoneInput
              t={t}
              number={phone}
              setNumber={setPhone}
              phoneCountry={phoneCountry}
              setPhoneCountry={setPhoneCountry}
            />
          </div>
          <div className="w-full">
            <input
              className={`w-full py-3.5 pl-3.5 w-full bg-light
                rounded-xl outline-0 text-gray-dark`}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("E-mail")}
            />
          </div>
        </div>
        <div className="w-full">
          <input
            className={`w-full py-3.5 pl-3.5 w-full bg-light
              rounded-xl outline-0 text-gray-dark`}
            value={referralCode}
            onChange={({ target: { value } }) => setReferralCode(value)}
            placeholder={t("referral_code")}
          />
        </div>
        <div className="w-full">
          <textarea
            className={`w-full py-3.5 pl-3.5 w-full bg-light
              rounded-xl outline-0 text-gray-dark`}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder={t("Add more details")}
            rows={4}
          />
        </div>
      </div>
      <div className="mb-4">
        <Button
          className="w-full"
          disabled={!requiredFields || isSendLoading}
          isLoading={isSendLoading}
          onClick={onSend}
          title={t("send")}
        />
        {careerError && (
          <div className="text-center mt-2 text-danger">
            {t("unexpected_error")}
          </div>
        )}
      </div>
    </div>
  );
};
