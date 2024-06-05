"use client";
import React from "react";
import Image from "next/image";

import { Writer } from "@/components/common/Writer";

import giftSvg from "./images/gift.svg";
import parentAndChildrenSvg from "./images/parent-and-children.svg";
import studentSvg from "./images/student.svg";

export const Promotions = (props: any) => {
  const { t } = props;

  const promotions = [
    {
      img: giftSvg,
      text: "Make the first",
      text2: "order Promo code",
      text3: "promotion_1_discount",
      text4: "off your first order",
    },
    {
      img: studentSvg,
      text: "Students",
      text2: ", save big on your cleaning services with us! Use promo code",
      text3: "STUDENTCLEAN",
      text4: "for",
      text5: "promotion_2_discount",
      text6: "off",
    },
    {
      img: parentAndChildrenSvg,
      text: "Large family?",
      text2: "Enjoy more family time, less cleaning time. Get",
      text3: "promotion_3_discount",
      text4: "off with promo code",
      text5: "FAMILYCLEAN",
    },
  ];

  const discounts = [
    { save: "-15%", services: ["Cleaning", "Ozonation"] },
    { save: "-15%", services: ["Cleaning", "Dry cleaning"] },
    { save: "-15%", services: ["Eco cleaning", "Dry cleaning"] },
    { save: "-15%", services: ["Eco cleaning", "Ozonation"] },
    { save: "-15%", services: ["Move in/out", "Ozonation"] },
    { save: "-15%", services: ["Move in/out", "Dry cleaning"] },
    { save: "-15%", services: ["Construction", "Ozonation"] },
    { save: "-20%", services: ["Dry cleaning", "Ozonation"] },
  ];

  return (
    <>
      <div className="_flex _flex-col mobile-none">
        <div className="_main-title _mb-8">
          {t("Promotions and discounts")}
        </div>
        <div className="promotions-block _mx-24 _py-7 _rounded-3xl _bg-light _flex _justify-around">
          {promotions.map((el, i) => (
            <div className="_w-60" key={el.text + i}>
              <div className="_flex _justify-center">
                <Image src={el.img} alt="" />
              </div>
              <div className="_mt-1 _text-center">
                <b>
                  <Writer text={t(el.text)} className="_inline" />
                </b>
                {el.text2 && <Writer text={t(el.text2)} className="_inline" />}
                <b>
                  {el.text3 && (
                    <Writer text={t(el.text3)} className="_inline" />
                  )}
                </b>
                {el.text4 && <Writer text={t(el.text4)} className="_inline" />}
                <b>
                  {el.text5 && (
                    <Writer text={t(el.text5)} className="_inline" />
                  )}
                </b>
                {el.text6 && <Writer text={t(el.text6)} className="_inline" />}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mobile-only _px-5-percents-mobile _mb-14">
        <div className="_main-title _mb-4">
          {t("promotions_title_mobile1")}
        </div>
        <div className="_py-6 _flex _flex-col _items-center _gap-5 _rounded-3xl _bg-light">
          {promotions.map((el, i) => (
            <div key={el.text + i}>
              <div className="_flex _justify-center">
                <Image src={el.img} alt="" />
              </div>
              <div className="_mt-1 _text-center">
                <b>
                  <Writer text={t(el.text + "_mobile")} className="_inline" />
                </b>
                {el.text2 && (
                  <Writer text={t(el.text2 + "_mobile")} className="_inline" />
                )}
                <b>
                  {el.text3 && (
                    <Writer
                      text={t(el.text3 + "_mobile")}
                      className="_inline"
                    />
                  )}
                </b>
                {el.text4 && (
                  <Writer text={t(el.text4 + "_mobile")} className="_inline" />
                )}
                <b>
                  {el.text5 && (
                    <Writer
                      text={t(el.text5 + "_mobile")}
                      className="_inline"
                    />
                  )}
                </b>
                {el.text6 && (
                  <Writer text={t(el.text6 + "_mobile")} className="_inline" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
