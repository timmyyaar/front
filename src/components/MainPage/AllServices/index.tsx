import React, { useState } from "react";

import { Overlay } from "@/components/common/Overlay";
import { Slider } from "@/components/common/Slider";
import { ServiceItem } from "@/components/common/ServiceItem";
import { useClickOutside } from "@/hooks/useClickOutSide";

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

import { Modals } from "./Modals";

export const AllServices = (props: any) => {
  const { t } = props;
  const [active, setActive] = useState("");
  const ref = useClickOutside(() => setActive(""));

  const services = [
    { title: "Regular", icon: Regular },
    { title: "Dry cleaning", icon: DryCleaning },
    { title: "Deep", icon: Deep },
    { title: "Window cleaning", icon: WindowCleaning },
    { title: "Eco cleaning", icon: EcoCleaning },
    { title: "Post-construction", icon: PostConstruction },
    { title: "Move in/out", icon: MoveInOut },
    { title: "Ozonation", icon: Ozonation },
    { title: "Subscription", icon: Subscription },
    { title: "In a last minute", icon: InaLastMinute },
    { title: "Custom cleaning", icon: CustomCleaning },
    { title: "After party", icon: AfterParty },
    { title: "Office", icon: Office },
    { title: "While sickness", icon: WhileSickness },
    { title: "Deep kitchen", icon: DeepKitchen },
    { title: "Airbnb", icon: Airbnb },
  ];

  const getServicesGroup = () => {
    const group = [];

    for (let i = 1; i <= services.length; i += 2) {
      group.push({
        id: services[i - 1].title + "n" + i + services[i].title,
        coll: [services[i - 1], services[i]],
      });
    }

    return group;
  };

  return (
    <>
      <div className="_px-24 mobile-none">
        <Overlay active={!!active}>
          <div ref={ref}>
            <Modals title={active} onClose={() => setActive("")} t={t} />
          </div>
        </Overlay>
        <div className="_mb-5 _main-title">{t("All service")}</div>
        <Slider
          elements={getServicesGroup().map((el) => ({
            id: el.id,
            content: (): JSX.Element => (
              <div className="_px-2.5 _flex _flex-col _w-full _gap-6 _h-full">
                <ServiceItem
                  title={t(el.coll[0].title)}
                  icon={el.coll[0].icon}
                  t={t}
                  onClick={() => setActive(el.coll[0].title)}
                />
                <ServiceItem
                  title={t(el.coll[1].title)}
                  icon={el.coll[1].icon}
                  t={t}
                  onClick={() => setActive(el.coll[1].title)}
                />
              </div>
            ),
          }))}
        />
      </div>
      <div className="mobile-only _px-5-percents _mb-14">
        <Overlay active={!!active}>
          <div ref={ref}>
            <Modals title={active} onClose={() => setActive("")} t={t} />
          </div>
        </Overlay>
        <div className="_mb-3 _main-title">
          <b>{t("All service")}</b>
        </div>
        <div className="_grid _grid-cols-2 _gap-6">
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
