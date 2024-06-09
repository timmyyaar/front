"use client";

import React from "react";

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
import DryCleaningModalContent from "@/components/MainPage/AllServices/Modals/DryCleaningModalContent";
import WindowModalContent from "@/components/MainPage/AllServices/Modals/WindowModalContent";
import OzonationModalContent from "@/components/MainPage/AllServices/Modals/OzonationModalContent";
import WhileSickModalContent from "@/components/MainPage/AllServices/Modals/WhileSickModalContent";
import SubscriptionModalContent from "@/components/MainPage/AllServices/Modals/SubscriptionModalContent";
import { TranslateFunction } from "@/types";
import Modal from "@/components/common/Modal";

interface ModalsProps {
  title: string;
  onClose: () => void;
  t: TranslateFunction;
  isOrder?: boolean;
}

export const Modals = ({ title, onClose, t, isOrder }: ModalsProps) => {
  return (
    <Modal isWhiteBackground className="_max-h-[80%]" onClose={onClose}>
      <div className="_py-14 lg:_py-0">
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
    </Modal>
  );
};
