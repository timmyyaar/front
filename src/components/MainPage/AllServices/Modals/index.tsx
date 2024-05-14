"use client";

import React, { useEffect } from "react";

import { CloseSvg } from "@/components/common/icons/closeButton";

import "./style.scss";
import DeepCleaningModalContent from "@/components/MainPage/AllServices/Modals/DeepCleaningModalContent";
import RegularCleaningModalContent from "@/components/MainPage/AllServices/Modals/RegularCleaningModalContent";
import EcoCleaningModalContent from "@/components/MainPage/AllServices/Modals/EcoCleaningModalContent";
import CustomCleaningModalContent from "@/components/MainPage/AllServices/Modals/CustomCleaningModalContent";
import OfficeCleaningModalContent from "@/components/MainPage/AllServices/Modals/OfficeCleaningModalContent";
import PortConstructionModalContent from "@/components/MainPage/AllServices/Modals/PostConstructionModalContent";
import MoveInOutModalContent from "@/components/MainPage/AllServices/Modals/MoveInOutModalContent";
import DeepKitchenModalContent from "@/components/MainPage/AllServices/Modals/DeepKitchenModalContent";
import AfterPartyModalContent from "@/components/MainPage/AllServices/Modals/AfterPartyModalContent";
import AirbnbModalContent from "@/components/MainPage/AllServices/Modals/AirbnbModalContent";
import InALastMinuteModalContent from "@/components/MainPage/AllServices/Modals/InALastMinuteModalContent";
import DryCleaningModalContent from "@/components/MainPage/AllServices/Modals/DryCleaningModalContent";
import WindowModalContent from "@/components/MainPage/AllServices/Modals/WindowModalContent";
import OzonationModalContent from "@/components/MainPage/AllServices/Modals/OzonationModalContent";
import WhileSickModalContent from "@/components/MainPage/AllServices/Modals/WhileSickModalContent";
import SubscriptionModalContent from "@/components/MainPage/AllServices/Modals/SubscriptionModalContent";

export const Modals = ({
  title,
  onClose,
  t,
}: {
  title: string;
  onClose: () => void;
  t: any;
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className="modal-wrapper-component custom-scroll"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="icon-wrapper-modal" onClick={onClose}>
        <CloseSvg />
      </div>
      <div>
        {title === "Regular" ? <RegularCleaningModalContent t={t} /> : null}
        {title === "Dry cleaning" ? <DryCleaningModalContent t={t} /> : null}
        {title === "Deep" ? <DeepCleaningModalContent t={t} /> : null}
        {title === "Window cleaning" ? <WindowModalContent t={t} /> : null}
        {title === "Eco cleaning" ? <EcoCleaningModalContent t={t} /> : null}
        {title === "Post-construction" ? (
          <PortConstructionModalContent t={t} />
        ) : null}
        {title === "Move in/out" ? <MoveInOutModalContent t={t} /> : null}
        {title === "Ozonation" ? <OzonationModalContent t={t} /> : null}
        {title === "Subscription" ? <SubscriptionModalContent t={t} /> : null}
        {title === "In a last minute" ? (
          <InALastMinuteModalContent t={t} />
        ) : null}
        {title === "Custom cleaning" ? (
          <CustomCleaningModalContent t={t} />
        ) : null}
        {title === "After party" ? <AfterPartyModalContent t={t} /> : null}
        {title === "Office" ? <OfficeCleaningModalContent t={t} /> : null}
        {title === "While sickness" ? <WhileSickModalContent t={t} /> : null}
        {title === "Deep kitchen" ? <DeepKitchenModalContent t={t} /> : null}
        {title === "Airbnb" ? <AirbnbModalContent t={t} /> : null}
      </div>
    </div>
  );
};
