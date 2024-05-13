import React, { FC } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import reactStringReplace from "react-string-replace";
import { FIGURE_BRACKETS_REGEX } from "@/constants";

import { CheckSvg } from "./icons/check-fill";
import vector from "./icons/vector.svg";
import "./style.scss";

export const MainOffer: FC<any> = (props) => {
  const { t, handleScroll } = props;
  const router = useRouter();
  const pathname = usePathname();
  const advantages = [
    { title: "Clear", text: "space" },
    { title: "Professional", text: "service" },
    { title: "Fair", text: "price" },
  ];

  return (
    <>
      <div className="vector-wrapper mobile-none">
        <Image src={vector} alt="" />
        <div className="offer-wrapper">
          <div className="title sub-title _w-max _whitespace-pre-wrap">
            {reactStringReplace(
              t("main_page_title"),
              FIGURE_BRACKETS_REGEX,
              (match) => (
                <b className="main-title">{match}</b>
              )
            )}
          </div>
          <div className="_mt-5 _flex _gap-5">
            {advantages.map((el) => (
              <div className="advantages-block _flex _gap-3" key={el.title}>
                <CheckSvg />
                <div>
                  <div className="advantages-title">{t(el.title)}</div>
                  <div className="advantages-text">{t(el.text)}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="_mt-10 _flex _gap-6">
            <div
              className="main-button _cursor-pointer"
              onClick={() => router.push(`${pathname}/order`)}
            >
              {t("Order online now")}
            </div>
            <div
              className="sub-button _cursor-pointer"
              onClick={() => handleScroll("costs-block")}
            >
              {t("Pricing")}
            </div>
          </div>
        </div>
      </div>
      <div className="main-offer-wrapper-mobile">
        <div
          className="main-button _cursor-pointer"
          onClick={() => router.push(`${pathname}/order`)}
        >
          {t("Order")}
        </div>
        <div
          className="sub-button _cursor-pointer"
          onClick={() => handleScroll("costs-block")}
        >
          {t("Pricing")}
        </div>
      </div>
    </>
  );
};
