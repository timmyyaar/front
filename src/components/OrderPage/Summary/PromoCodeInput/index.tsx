import React, { Dispatch, FC, SetStateAction, useState } from "react";
import Image from "next/image";

import discountPng from "../icons/discount.png";
import { checkPromo } from "@/components/OrderPage/Summary/PromoCodeInput/actions";
import Button from "@/components/common/Button";

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

        const data = await checkPromo(promoInputValue);

        if (data?.promo?.sale) {
          setPromoStatus("#82D46D");
          setSale(+data.promo.sale);
          setPromo(promoInputValue);
        } else {
          setPromoStatus("#FF8C8C");
        }
      } catch (error) {
        setPromoStatus("#FF8C8C");
      } finally {
        setIsCheckPromoLoading(false);
      }
    }
  };

  return (
    <div className="mt-3 cursor-pointer">
      <div
        className="р-14 flex rounded-full"
        style={{ background: promoStatus || "#F9F9F9" }}
      >
        <div className="my-auto mr-3 ml-5">
          <Image src={discountPng} alt="Promo" width="32" height="32" className="max-w-max h-8 w-8" />
        </div>
        <input
          type="text"
          placeholder={t("Promo code")}
          className={`w-full bg-white outline-0 ${
            !promoStatus ? "" : "placeholder:text-white"
          }`}
          style={{
            background: promoStatus,
            color: !promoStatus ? "#848484" : "#FFF",
          }}
          value={promoInputValue}
          onChange={({ target: { value } }) => setPromoInputValue(value)}
          disabled={isCheckPromoLoading}
        />
        <Button
          className="ml-auto"
          disabled={isCheckPromoLoading}
          onClick={checkCode}
          title={t("Apply")}
        />
      </div>
    </div>
  );
};
