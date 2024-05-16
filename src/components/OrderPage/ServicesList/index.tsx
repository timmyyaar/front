import React, { FC, useState } from "react";
import Image from "next/image";

import howItWorksSvg from "@/components/common/icons/howItWorks.svg";
import { Modals } from "@/components/MainPage/AllServices/Modals";
import { Overlay } from "@/components/common/Overlay";
import { useClickOutside } from "@/hooks/useClickOutSide";
import {SERVICES} from "@/components/OrderPage/constants";

import "./style.scss";

interface IProps {
  mainCategory: string;
  t: any;
  selectedService: string;
  setSelectedService: (val: string) => void;
}

export const ServicesList: FC<IProps> = (props) => {
  const { mainCategory, t, selectedService, setSelectedService } = props;

  const [serviceModal, setServiceModal] = useState("");
  const ref = useClickOutside(() => setServiceModal(""));

  return (
    <div className="services-list-component">
      <Overlay active={!!serviceModal}>
        <div ref={ref}>
          <Modals
            title={serviceModal}
            onClose={() => setServiceModal("")}
            t={t}
            isOrder
          />
        </div>
      </Overlay>
      <div className="_grid _grid-cols-3 _auto-rows-fr">
        {SERVICES[mainCategory].map((el, i) => (
          <div
            className={`service-wrapper ${
              el.title === selectedService ? "active-wrapper" : ""
            }`}
            onClick={() => setSelectedService(el.title)}
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
