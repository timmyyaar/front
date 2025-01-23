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
      <div className="_grid _grid-cols-2 lg:_grid-cols-3 _auto-rows-fr _gap-5">
        {filteredServices.map((el, i) => (
          <div
            className={`hover:_shadow-custom-light-dark _py-3.5 _flex _flex-col _justify-center _items-center _gap-5
              _rounded-2xl _border-solid _bg-light _border-4 _border-light _cursor-pointer
              hover:_bg-light-dark _transition-all ${
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
            <div className="_flex _justify-center _select-none">
              <Image src={el.icon} alt="" width="80" />
            </div>
            <div className="_select-none _flex _justify-center">
              <div
                className={`_flex _items-center _gap-2 _text-sm _transition-all
                  hover:_text-primary`}
                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                  event.stopPropagation();

                  setServiceModal(el.title);
                }}
              >
                <div className="_text-center">{t("How it works")}</div>
                <div className="_py-1 _cursor-pointer">
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
