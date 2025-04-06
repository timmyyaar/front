import React from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import boyPng from "@/assets/icons/main-cleaners/boy.png";
import girlPng from "@/assets/icons/main-cleaners/girl.png";
import bubblesPng from "@/assets/icons/common/bubbles.png";
import soapPng from "./icons/soap.png";
import broomPng from "./icons/broom.png";
import handPng from "./icons/hand.png";
import vacuumPng from "./icons/vacuum.png";
import cloudSvg from "./icons/cloud.svg";

import { CITIES } from "@/constants";
import Button from "@/components/common/Button";
import "./style.scss";

interface MainImageProps {
  t: (text: string) => string;
  ordersCount: number;
}

export const MainImage = ({ t, ordersCount }: MainImageProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const cityUrl = searchParams.get("city");

  const handleScroll = (targetId: string) => {
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div
        className={`h-[calc(100vh-80px)] mobile-none relative overflow-hidden
       flex items-center justify-center`}
      >
        <div className="flex flex-col gap-28 h-full mobile-none">
          <div className="flex items-start justify-center h-full py-20">
            <Image
              src={handPng}
              alt="Hand"
              className="absolute left-auto -top-14 rotate-105 w-1/5"
            />
            <Image
              src={soapPng}
              width="240"
              alt="Soap"
              className="absolute right-0 top-6 rotate-35 w-1/5"
            />
            <Image
              src={broomPng}
              alt="Broom"
              className="absolute -left-36 -bottom-20 -rotate-165 w-1/4"
            />
            <Image
              src={vacuumPng}
              alt="Vacuum"
              className="absolute bottom-0 -right-14 w-1/5"
            />
            <Image
              src={bubblesPng}
              alt="Bubbles"
              className="absolute left-6 top-6 w-1/5"
            />
            <div className="flex items-center justify-center h-full relative">
              <Image
                src={boyPng}
                alt="Boy"
                priority
                className="h-4/5 w-auto z-10"
              />
              <div className="relative">
                <Image
                  src={cloudSvg}
                  alt="Bubbles"
                  className="absolute top-6 left-7 z-[-1]"
                />
                <div className="flex flex-col text-xl p-20">
                  <span className="text-gradient text-center">
                    <b>{t("main_page_title")}</b>
                    <b> {t(cityUrl || CITIES.KRAKOW.name)}</b>
                  </span>
                  <span className="text-5xl text-gradient font-bold text-center">
                    Take your time
                  </span>
                  <div className="mt-4 flex gap-6">
                    <Button
                      className="text-lg py-6 font-medium min-w-44"
                      onClick={() =>
                        router.push(
                          `${pathname}/order?${searchParams.toString()}`,
                        )
                      }
                      title={t("Order online now")}
                    />
                    <Button
                      isSecondary
                      className="text-base z-10 font-medium shadow-md"
                      onClick={() => handleScroll("costs-block")}
                      title={t("Pricing")}
                    />
                  </div>
                  <div className="mt-8 text-lg font-semibold text-center text-gradient">
                    {ordersCount} {t("happy_clients")}
                  </div>
                </div>
              </div>
              <Image
                src={girlPng}
                alt="Girl"
                priority
                className="h-4/5 w-auto z-10"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-only relative overflow-hidden">
        <div className="mt-10 mb-14 flex relative justify-center">
          <Image
            src={boyPng}
            alt=""
            height={180}
            priority
            className="rotate-15 absolute -left-3"
          />
          <div className="flex flex-col text-lg">
            <span className="text-gradient text-center">
              <b>{t("main_page_title")}</b>
              <b> {t(cityUrl || CITIES.KRAKOW.name)}</b>
            </span>
            <span className="text-2xl text-gradient font-bold text-center">
              Take your time
            </span>
            <div className="mt-4 flex flex-col gap-3 justify-center">
              <Button
                className="text-base h-12 font-medium min-w-44 z-10"
                onClick={() =>
                  router.push(`${pathname}/order?${searchParams.toString()}`)
                }
                title={t("Order online now")}
              />
              <Button
                isSecondary
                className="text-base h-12 z-10 font-medium shadow-md"
                onClick={() => handleScroll("costs-block")}
                title={t("Pricing")}
              />
            </div>
            <div className="mt-3 text-lg font-semibold text-center text-gradient">
              {ordersCount} {t("happy_clients")}
            </div>
          </div>
          <Image
            src={girlPng}
            alt=""
            height={180}
            priority
            className="-rotate-15 absolute -right-5"
          />
        </div>
      </div>
    </>
  );
};
