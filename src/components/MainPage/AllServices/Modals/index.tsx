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
import { TranslateFunction } from "@/types";

interface ModalsProps {
  title: string;
  onClose: () => void;
  t: TranslateFunction;
  isOrder?: boolean;
}

export const Modals = ({ title, onClose, t, isOrder }: ModalsProps) => {
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
        {title === "Regular" ? (
          <RegularCleaningModalContent t={t} isOrder={isOrder} />
        ) : null}
        {title === "Dry cleaning" ? (
          <DryCleaningModalContent t={t} isOrder={isOrder} />
        ) : null}
        {title === "Deep" ? (
          <DeepCleaningModalContent t={t} isOrder={isOrder} />
        ) : null}
        {title === "Window cleaning" ? (
          <WindowModalContent t={t} isOrder={isOrder} />
        ) : null}
        {title === "Eco cleaning" ? (
          <EcoCleaningModalContent t={t} isOrder={isOrder} />
        ) : null}
        {title === "Post-construction" ? (
          <PortConstructionModalContent t={t} isOrder={isOrder} />
        ) : null}
        {title === "Move in/out" ? (
          <MoveInOutModalContent t={t} isOrder={isOrder} />
        ) : null}
        {title === "Ozonation" ? (
          <OzonationModalContent t={t} isOrder={isOrder} />
        ) : null}
        {title === "Subscription" ? (
          <SubscriptionModalContent t={t} isOrder={isOrder} />
        ) : null}
        {title === "In a last minute" ? (
          <InALastMinuteModalContent t={t} isOrder={isOrder} />
        ) : null}
        {title === "Custom cleaning" ? (
          <CustomCleaningModalContent t={t} isOrder={isOrder} />
        ) : null}
        {title === "After party" ? (
          <AfterPartyModalContent t={t} isOrder={isOrder} />
        ) : null}
        {title === "Office" ? (
          <OfficeCleaningModalContent t={t} isOrder={isOrder} />
        ) : null}
        {title === "While sickness" ? (
          <WhileSickModalContent t={t} isOrder={isOrder} />
        ) : null}
        {title === "Deep kitchen" ? (
          <DeepKitchenModalContent t={t} isOrder={isOrder} />
        ) : null}
        {title === "Airbnb" ? (
          <AirbnbModalContent t={t} isOrder={isOrder} />
        ) : null}
      </div>
    </div>
  );
};
