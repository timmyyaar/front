import React, { FC, useState } from "react";
import Image from "next/image";

import AfterParty from "@/components/common/icons/services/after-party.svg";
import Airbnb from "@/components/common/icons/services/airbnb.svg";
import CustomCleaning from "@/components/common/icons/services/custom-cleaning.svg";
import DeepKitchen from "@/components/common/icons/services/deep-kitchen.svg";
import Deep from "@/components/common/icons/services/deep.svg";
import DryCleaning from "@/components/common/icons/services/dry-cleaning.svg";
import EcoCleaning from "@/components/common/icons/services/eco-cleaning.svg";
import InaLastMinute from "@/components/common/icons/services/in-a-last-minute.svg";
import MoveInOut from "@/components/common/icons/services/move-in-out.svg";
import Office from "@/components/common/icons/services/office.svg";
import Ozonation from "@/components/common/icons/services/ozonation.svg";
import PostConstruction from "@/components/common/icons/services/post-construction.svg";
import Regular from "@/components/common/icons/services/regular.svg";
import Subscription from "@/components/common/icons/services/subscription.svg";
import WhileSickness from "@/components/common/icons/services/while-sickness.svg";
import WindowCleaning from "@/components/common/icons/services/window-cleaning.svg";

import howItWorksSvg from "@/components/common/icons/howItWorks.svg";
import { Modals } from "@/components/MainPage/AllServices/Modals";
import { Overlay } from "@/components/common/Overlay";
import { useClickOutside } from "@/hooks/useClickOutSide";

import "./style.scss";

interface IProps {
  mainCategory: string;
  t: any;
  setService: (val: string) => void;
}

interface IService {
  [key: string]: { title: string; icon: any }[];
}

export const ServicesList: FC<IProps> = (props) => {
  const { mainCategory, t, setService } = props;
  const services: IService = {
    "General cleaning": [
      { title: "Regular", icon: Regular },
      { title: "Deep", icon: Deep },
      { title: "Eco cleaning", icon: EcoCleaning },
      { title: "Custom cleaning", icon: CustomCleaning },
      { title: "Office", icon: Office },
      { title: "Post-construction", icon: PostConstruction },
    ],
    Healthcare: [
      { title: "Dry cleaning", icon: DryCleaning },
      { title: "Ozonation", icon: Ozonation },
      { title: "While sickness", icon: WhileSickness },
    ],
    "Special cleaning": [
      { title: "Window cleaning", icon: WindowCleaning },
      { title: "Move in/out", icon: MoveInOut },
      { title: "Deep kitchen", icon: DeepKitchen },
      { title: "After party", icon: AfterParty },
      { title: "Airbnb", icon: Airbnb },
      { title: "In a last minute", icon: InaLastMinute },
    ],
  };
  const [selectedService, setSelectedService] = useState("");
  const [serviceModal, setServiceModal] = useState("");
  const ref = useClickOutside(() => setServiceModal(""));

  const onSelectService = (service: string) => {
    setSelectedService(service);
    setService(service);
  };

  return (
    <div className="services-list-component">
      <Overlay active={!!serviceModal}>
        <div ref={ref}>
          <Modals
            title={serviceModal}
            onClose={() => setServiceModal("")}
            t={t}
          />
        </div>
      </Overlay>
      <div className="_grid _grid-cols-3">
        {services[mainCategory].map((el, i) => (
          <div
            className={`service-wrapper ${
              el.title === selectedService ? "active-wrapper" : ""
            }`}
            onClick={() => onSelectService(el.title)}
            key={el.title + i}
          >
            <div className="item-title">{t(el.title)}</div>
            <div
              className="_flex _justify-center"
              style={{ userSelect: "none" }}
            >
              <Image src={el.icon} alt="" />
            </div>
            <div className="how-to-work _flex _justify-center">
              <div
                className="_flex _gap-2 how-it-works-wrapper"
                onClick={() => setServiceModal(el.title)}
              >
                <div className="_text-center">{t("How it works")}</div>
                <div className="_py-1 _cursor-pointer">
                  <Image src={howItWorksSvg} alt="" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
