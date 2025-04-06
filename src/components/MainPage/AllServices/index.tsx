import React, { useContext, useState } from "react";

import { Overlay } from "@/components/common/Overlay";
import { Slider } from "@/components/common/Slider";
import { ServiceItem } from "@/components/common/ServiceItem";
import { useClickOutside } from "@/hooks/useClickOutSide";

import { Modals } from "./Modals";
import { useSearchParams } from "next/navigation";
import { CITIES } from "@/constants";
import { ServicesContext } from "@/components/Providers";
import { getServicesWithIconsByCity } from "@/utils";

export const AllServices = (props: any) => {
  const { t } = props;
  const { mainServices } = useContext(ServicesContext);

  const [active, setActive] = useState<string>("");
  const ref = useClickOutside(() => setActive(""));

  const searchParams = useSearchParams();
  const cityUrl = searchParams.get("city") || CITIES.KRAKOW.name;

  const services = getServicesWithIconsByCity({
    services: mainServices,
    city: cityUrl,
    includeEmptyCategory: true,
  });

  return (
    <>
      <div className="px-24 mobile-none">
        <Overlay active={!!active}>
          <div ref={ref}>
            <Modals title={active} onClose={() => setActive("")} t={t} />
          </div>
        </Overlay>
        <div className="mb-5 main-title">
          <span className="text-gradient">{t("All service")}</span>
        </div>
        <Slider
          elements={services.map((el) => (
            <ServiceItem
              title={t(el.title)}
              icon={el.icon}
              t={t}
              onClick={() => setActive(el.title)}
            />
          ))}
        />
      </div>
      <div className="mobile-only px-5-percents mb-14">
        <Overlay active={!!active}>
          <div ref={ref}>
            <Modals title={active} onClose={() => setActive("")} t={t} />
          </div>
        </Overlay>
        <div className="mb-3 main-title">
          <b>
            <span className="text-gradient">{t("All service")}</span>
          </b>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {services.map((el, i) => (
            <div key={JSON.stringify(el) + i}>
              <ServiceItem
                title={t(el.title)}
                icon={el.icon}
                t={t}
                onClick={() => setActive(el.title)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
