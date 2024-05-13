import React, { useContext } from "react";
import { TranslateFunction } from "@/types";
import { PricesContext } from "@/components/Providers";
import Costs from "@/components/MainPage/AllServices/Modals/Costs";
import { SALES } from "@/components/MainPage/AllServices/Modals/Costs/constants";
import { getOneDigitFloat } from "@/utils";

function SubscriptionModalContent({ t }: { t: TranslateFunction }) {
  const { prices } = useContext(PricesContext);

  const subscriptionCosts = {
    [SALES[0].title]: [
      {
        title: "1-bedroom",
        text: "One-time 1-bedroom cleaning",
        price: getOneDigitFloat(prices.defaultRegular * 0.8),
        oldPrice: prices.defaultRegular,
      },
      {
        title: "2-bedroom",
        text: "One-time 2-bedroom cleaning",
        price: getOneDigitFloat(
          (prices.defaultRegular + prices.regularBedroom) * 0.8
        ),
        oldPrice: prices.defaultRegular + prices.regularBedroom,
      },
      {
        title: "3-bedroom",
        text: "One-time 3-bedroom cleaning",
        price: getOneDigitFloat(
          (prices.defaultRegular + prices.regularBedroom * 2) * 0.8
        ),
        oldPrice: prices.defaultRegular + prices.regularBedroom * 2,
      },
    ],
    [SALES[1].title]: [
      {
        title: "1-bedroom",
        text: "Twice a month 1-bedroom cleaning",
        price: getOneDigitFloat(prices.defaultRegular * 0.85),
        oldPrice: prices.defaultRegular,
      },
      {
        title: "2-bedroom",
        text: "Twice a month 2-bedroom cleaning",
        price: getOneDigitFloat(
          (prices.defaultRegular + prices.regularBedroom) * 0.85
        ),
        oldPrice: prices.defaultRegular + prices.regularBedroom,
      },
      {
        title: "3-bedroom",
        text: "Twice a month 3-bedroom cleaning",
        price: getOneDigitFloat(
          (prices.defaultRegular + prices.regularBedroom * 2) * 0.85
        ),
        oldPrice: prices.defaultRegular + prices.regularBedroom * 2,
      },
    ],
    [SALES[2].title]: [
      {
        title: "1-bedroom",
        text: "Once a month 1-bedroom cleaning",
        price: getOneDigitFloat(prices.defaultRegular * 0.9),
        oldPrice: prices.defaultRegular,
      },
      {
        title: "2-bedroom",
        text: "Once a month 2-bedroom cleaning",
        price: getOneDigitFloat(
          (prices.defaultRegular + prices.regularBedroom) * 0.9
        ),
        oldPrice: prices.defaultRegular + prices.regularBedroom,
      },
      {
        title: "3-bedroom",
        text: "Once a month 3-bedroom cleaning",
        price: getOneDigitFloat(
          (prices.defaultRegular + prices.regularBedroom * 2) * 0.9
        ),
        oldPrice: prices.defaultRegular + prices.regularBedroom * 2,
      },
    ],
  };

  return (
    <>
      <div className="_text-center">
        <div className="modal-title-wrapper _text-center">
          <span className="modal-title-text text-gradient">
            {t("Subscription")}
          </span>
        </div>
        <div className="_whitespace-pre-wrap">
          {t("subscription_description")}
        </div>
      </div>
      <div className="mt-16-mobile-8">
        <div className="modal-title-wrapper _text-center">
          <span className="modal-title-text text-gradient">{t("Prices")}</span>
        </div>
        <Costs
          t={t}
          redirectPathname="subscription"
          costs={subscriptionCosts}
          isSubscription
          description="regular_price_description_mobile"
        />
      </div>
    </>
  );
}

export default SubscriptionModalContent;
