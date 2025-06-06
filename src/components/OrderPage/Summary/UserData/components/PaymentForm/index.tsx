import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Switcher } from "@/components/common/Switcher";
import { Tooltip } from "@/components/common/Tooltip";

import creditCardPng from "./icons/credit-card.png";
import cashPng from "./icons/cash.png";

const TABS = [{ label: "Cash" }, { label: "Online", isDisabled: true }];

export const PaymentForm = ({ setOnlinePayment, t }: any) => {
  const [tab, setTab] = useState(() => TABS[0].label);

  useEffect(() => {
    setOnlinePayment(tab === "Online");
  }, [tab]);

  return (
    <Tooltip
      content={
        <div className="flex flex-col text-center whitespace-pre-wrap">
          {t("online_payment_disabled_message")}
        </div>
      }
      className="w-[120%]"
    >
      <div>
        <Switcher
          icons={[
            <div className="flex justify-center">
              <Image src={cashPng} alt="" width="36" height="36" />
            </div>,
            <div className="flex justify-center">
              <Image src={creditCardPng} alt="" width="36" height="36" />
            </div>,
          ]}
          tab={tab}
          tabs={TABS}
          onClick={(el: string) => setTab(el)}
          t={t}
        />
      </div>
    </Tooltip>
  );
};
