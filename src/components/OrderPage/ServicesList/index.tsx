import React, { FC, useEffect, useState } from "react";
import Image from "next/image";

import howItWorksSvg from "@/components/common/icons/howItWorks.svg";
import { Modals } from "@/components/MainPage/AllServices/Modals";
import { Overlay } from "@/components/common/Overlay";
import { useClickOutside } from "@/hooks/useClickOutSide";
import {
  EXCLUDED_SERVICES_WARSAW,
  SERVICES,
} from "@/components/OrderPage/constants";
import { useSearchParams } from "next/navigation";
import { CITIES } from "@/constants";

interface IProps {
  mainCategory: string;
  t: any;
  selectedService: string;
  setSelectedService: (val: string) => void;
}

const getFilteredServices = (
  city: string | null,
  services: { title: string; icon: any }[],
) => {
  const isWarsaw = city === CITIES.WARSAW.name;

  return isWarsaw
    ? services.filter(({ title }) => !EXCLUDED_SERVICES_WARSAW.includes(title))
    : services;
};

export const ServicesList: FC<IProps> = (props) => {
  const { mainCategory, t, selectedService, setSelectedService } = props;
  const searchParams = useSearchParams();

  const cityUrl = searchParams.get("city");
  const filteredServices = getFilteredServices(cityUrl, SERVICES[mainCategory]);

  useEffect(() => {
    const needToResetSelectedService =
      selectedService &&
      !filteredServices.some(({ title }) => title === selectedService);

    if (needToResetSelectedService) {
      setSelectedService(filteredServices[0].title);
    }
  }, [filteredServices]);

  const [serviceModal, setServiceModal] = useState("");
  const ref = useClickOutside(() => setServiceModal(""));

  return (
    <div>
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
      <div className="_grid _grid-cols-2 lg:_grid-cols-3 _auto-rows-fr _gap-5">
        {filteredServices.map((el, i) => (
          <div
            className={`_py-3.5 _flex _flex-col _justify-center _items-center _gap-5
              _rounded-2xl _border-solid _bg-light _border-4 _border-light _cursor-pointer
              hover:_bg-light-dark ${
                el.title === selectedService
                  ? "_border-solid _border-4 _border-primary hover:_border-primary"
                  : "hover:_border-light-dark"
              }`}
            onClick={() => setSelectedService(el.title)}
            key={el.title + i}
          >
            <div className="_font-sm lg:_font-base _text-center _font-semibold _px-4">
              {t(el.title)}
            </div>
            <div
              className="_flex _justify-center"
              style={{ userSelect: "none" }}
            >
              <Image src={el.icon} alt="" width="80" />
            </div>
            <div className="_select-none _flex _justify-center">
              <div
                className={`_flex _items-center _gap-2 _text-sm _transition-all
                  hover:_text-primary`}
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
