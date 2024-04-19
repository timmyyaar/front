import { Writer } from "@/components/common/Writer";
import React from "react";

function SubscriptionModalContent({ t }) {
  return (
    <div className="wrapper-title-text">
      <div className="wrapper-title text-gradient">
        <Writer text={t("Subscription")} />
      </div>
      <div className="wrapper-text _whitespace-pre-wrap">
        {t("subscription_description")}
      </div>
    </div>
  );
}

export default SubscriptionModalContent;
