import React, { FC, useContext, useEffect, useState } from "react";
import Image from "next/image";

import howItWorksSvg from "@/components/common/icons/howItWorks.svg";
import { Modals } from "@/components/MainPage/AllServices/Modals";
import { Overlay } from "@/components/common/Overlay";
import { useClickOutside } from "@/hooks/useClickOutSide";
import { useSearchParams } from "next/navigation";
import { CITIES, MAIN_CATEGORIES_REVERSED } from "@/constants";
import { ServicesContext } from "@/components/Providers";
import { getServicesWithIconsByCity } from "@/utils";
import moreDetailsPng from "@/assets/icons/common/more-details.png";

interface IProps {
  mainCategory: string;
  t: any;
  selectedService: string;
  setSelectedService: (val: string) => void;
}

export const ServicesList: FC<IProps> = (props) => {
  const { mainCategory, t, selectedService, setSelectedService } = props;
  const { mainServices } = useContext(ServicesContext);
  const searchParams = useSearchParams();

  const cityUrl = searchParams.get("city") || CITIES.KRAKOW.name;
  const filteredServices = getServicesWithIconsByCity({
    services: mainServices,
    city: cityUrl,
    serviceCategory: MAIN_CATEGORIES_REVERSED[mainCategory],
  });

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
      <div className="grid grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-5">
        {filteredServices.map((el, i) => (
          <div
            className={`hover:shadow-custom-light-dark py-3.5 flex flex-col justify-center items-center gap-5
              rounded-2xl border-solid bg-light border-4 border-light cursor-pointer
              hover:bg-light-dark transition-all ${
                el.title === selectedService
                  ? "border-solid border-4 border-primary hover:border-primary"
                  : "hover:border-light-dark"
              }`}
            onClick={() => setSelectedService(el.title)}
            key={el.title + i}
          >
            <div className="font-sm lg:font-base text-center font-semibold px-4">
              {t(el.title)}
            </div>
            <div className="flex justify-center select-none">
              <Image src={el.icon} alt="" width="80" />
            </div>
            <div className="select-none flex justify-center">
              <div
                className={`flex items-center gap-2 text-sm transition-all
                  hover:text-primary`}
                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                  event.stopPropagation();

                  setServiceModal(el.title);
                }}
              >
                <div className="text-center">{t("How it works")}</div>
                <div className="py-1 cursor-pointer">
                  <Image src={moreDetailsPng} alt="" width="22" height="22" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
