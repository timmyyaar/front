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
        className={`_h-[calc(100vh-80px)] mobile-none _relative _overflow-hidden
       _flex _items-center _justify-center`}
      >
        <div className="_flex _flex-col _gap-28 _h-full mobile-none">
          <div className="_flex _items-start _justify-center _h-full _py-20">
            <Image
              src={handPng}
              alt="Hand"
              className="_absolute _left-auto _-top-14 _rotate-[105deg] _w-1/5"
            />
            <Image
              src={soapPng}
              width="240"
              alt="Soap"
              className="_absolute _right-0 _top-6 _rotate-[35deg] _w-1/5"
            />
            <Image
              src={broomPng}
              alt="Broom"
              className="_absolute _bottom-0 _-left-36 _-rotate-[165deg] _w-1/4"
            />
            <Image
              src={vacuumPng}
              alt="Vacuum"
              className="_absolute _bottom-0 _-right-14 _w-1/5"
            />
            <Image
              src={bubblesPng}
              alt="Bubbles"
              className="_absolute _left-6 _top-6 _w-1/5"
            />
            <div className="_flex _items-center _justify-center _h-full _relative">
              <Image
                src={boyPng}
                alt="Boy"
                priority
                className="_h-4/5 _w-auto _z-10"
              />
              <div className="_relative">
                <Image
                  src={cloudSvg}
                  alt="Bubbles"
                  className="_absolute _top-6 _left-7 _z-[-1]"
                />
                <div className="_flex _flex-col _text-xl _p-20">
                  <span className="text-gradient _text-center">
                    <b>{t("main_page_title")}</b>
                    <b> {t(cityUrl || CITIES.KRAKOW.name)}</b>
                  </span>
                  <span className="_text-5xl text-gradient _font-bold _text-center">
                    Take your time
                  </span>
                  <div className="_mt-4 _flex _gap-6">
                    <Button
                      className="_text-lg _py-6 _font-medium _min-w-44"
                      onClick={() =>
                        router.push(
                          `${pathname}/order?${searchParams.toString()}`,
                        )
                      }
                      title={t("Order online now")}
                    />
                    <button
                      className={`_text-lg _flex _justify-center _items-center hover:_bg-primary-dark active:_bg-primary-dark
                hover:_text-white active:_text-white _transition-all _min-w-24 _py-6
                _text-center _border-40 _bg-white _text-dark _font-medium _cursor-pointer`}
                      onClick={() => handleScroll("costs-block")}
                    >
                      {t("Pricing")}
                    </button>
                  </div>
                  <div className="_mt-8 _text-lg _font-semibold _text-center text-gradient">
                    {ordersCount} {t("happy_clients")}
                  </div>
                </div>
              </div>
              <Image
                src={girlPng}
                alt="Girl"
                priority
                className="_h-4/5 _w-auto _z-10"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-only _relative _overflow-hidden">
        <div className="_mt-10 _mb-14 _flex _relative _justify-center">
          <Image
            src={boyPng}
            alt=""
            height={180}
            priority
            className="_rotate-[15deg] _absolute _-left-3"
          />
          <div className="_flex _flex-col _text-lg">
            <span className="text-gradient _text-center">
              <b>{t("main_page_title")}</b>
              <b> {t(cityUrl || CITIES.KRAKOW.name)}</b>
            </span>
            <span className="_text-2xl text-gradient _font-bold _text-center">
              Take your time
            </span>
            <div className="_mt-4 _flex _flex-col _gap-3 _justify-center">
              <Button
                className="_text-base _h-12 _font-medium _min-w-44 _z-10"
                onClick={() =>
                  router.push(`${pathname}/order?${searchParams.toString()}`)
                }
                title={t("Order online now")}
              />
              <Button
                isSecondary
                className="_text-base _h-12 _z-10 _font-medium"
                onClick={() => handleScroll("costs-block")}
                title={t("Pricing")}
              />
            </div>
            <div className="_mt-3 _text-lg _font-semibold _text-center text-gradient">
              {ordersCount} {t("happy_clients")}
            </div>
          </div>
          <Image
            src={girlPng}
            alt=""
            height={180}
            priority
            className="_rotate-[-15deg] _absolute _-right-5"
          />
        </div>
      </div>
    </>
  );
};
