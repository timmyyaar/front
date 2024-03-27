import React, { Dispatch, FC, SetStateAction, useState } from "react";

import { DiscountCoupon } from "../icons/DiscountCoupon";

interface IProps {
  setSale: any;
  setPromo: any;
  t: any;
  promoInputValue: string;
  setPromoInputValue: Dispatch<SetStateAction<string>>;
  promoStatus: string;
  setPromoStatus: Dispatch<SetStateAction<string>>;
}

export const PromoInput: FC<IProps> = (props) => {
  const {
    setSale,
    setPromo,
    t,
    promoInputValue,
    setPromoInputValue,
    promoStatus,
    setPromoStatus,
  } = props;
  const [isCheckPromoLoading, setIsCheckPromoLoading] =
    useState<boolean>(false);

  const checkCode = async () => {
    if (promoInputValue) {
      try {
        setIsCheckPromoLoading(true);

        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/api/promo/" + promoInputValue,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
          }
        );
        const data = await response.json();

        if (data?.promo?.sale) {
          setPromoStatus("#82D46D");
          setSale(+data.promo.sale);
          setPromo(promoInputValue);
        } else if (data?.message === "Promo not found") {
          setPromoStatus("#FF8C8C");
        }
      } finally {
        setIsCheckPromoLoading(false);
      }
    }
  };

  return (
    <div className="input-promo-code _cursor-pointer">
      <div
        className="input-wrapper _flex"
        style={{ background: promoStatus || "#F9F9F9" }}
      >
        <div className="icon-wrapper">
          <DiscountCoupon />
        </div>
        <input
          type="text"
          placeholder={t("Promo code")}
          className={`input promo-code-input ${
            !promoStatus ? "" : "promo-status"
          }`}
          style={{
            background: promoStatus,
            color: !promoStatus ? "#848484" : "#FFF",
          }}
          value={promoInputValue}
          onChange={({ target: { value } }) => setPromoInputValue(value)}
          disabled={isCheckPromoLoading}
        />
        <div
          className={`button-wrapper ${
            isCheckPromoLoading ? "primary-button-disabled" : ""
          }`}
          onClick={checkCode}
        >
          {t("Apply")}
        </div>
      </div>
    </div>
  );
};
