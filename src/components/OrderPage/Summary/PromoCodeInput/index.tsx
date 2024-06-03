import React, { Dispatch, FC, SetStateAction, useState } from "react";

import { DiscountCoupon } from "../icons/DiscountCoupon";
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
    <div className="_mt-3 _cursor-pointer">
      <div
        className="_р-14 _flex _rounded-full"
        style={{ background: promoStatus || "#F9F9F9" }}
      >
        <div className="_my-auto _mr-3 _ml-5">
          <DiscountCoupon />
        </div>
        <input
          type="text"
          placeholder={t("Promo code")}
          className={`_w-full _bg-white _outline-0 ${
            !promoStatus ? "" : "placeholder:_text-white"
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
          className="_ml-auto"
          disabled={isCheckPromoLoading}
          onClick={checkCode}
          title={t("Apply")}
         />
      </div>
    </div>
  );
};
