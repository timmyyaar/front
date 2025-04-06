import React from "react";
import Image from "next/image";

import { MessengerIcon } from "@/components/common/icons/components/Messenger";
import { TelegramIcon } from "@/components/common/icons/components/Telegram";
import { WhatsappIcon } from "@/components/common/icons/components/Whatsapp";
import { InstIcon } from "@/components/common/icons/components/Inst";
import { Writer } from "@/components/common/Writer";

import bubblesSvg from "./icons/bubbles.svg";
import iPhoneSvg from "./icons/iPhone.svg";
import chatPng from "./images/chat.png";
import "./style.scss";

export const PriceByPhoto = (props: any) => {
  const { t } = props;

  const iconClassName = `flex justify-center items-center gap-2 bg-primary
              hover:bg-primary-dark active:bg-primary-dark text-white lg:px-6 py-4 transition-all text-center
              font-medium rounded-40-px cursor-pointer`;

  return (
    <div
      className={`price-by-photo-component px-5-percents-mobile mb-14
        lg:mb-0 flex justify-center`}
    >
      <div className="price-by-photo-wrapper mobile-none pt-12 pb-10 rounded-3xl bg-light">
        <div className="flex flex-col">
          <div className="main-title whitespace-pre-line mb-5 flex justify-center">
            <span className="text-gradient">
              {t("post_cleaning_photos_and_messenger_support")}
            </span>
          </div>
          <div className="whitespace-pre-line flex justify-center text-center">
            {t("get_post_cleaning_photos")}
          </div>
          <div className="img-wrapper relative mt-8 mb-10 flex justify-center">
            <Image src={bubblesSvg} alt="" className="absolute" />
            <Image src={chatPng} alt="" className="absolute" />
            <Image src={iPhoneSvg} alt="" className="absolute" />
          </div>
        </div>
        <div className="flex justify-center gap-6">
          <a
            className={iconClassName}
            href="https://t.me/takeyourtime_pln"
            target="_blank"
          >
            <TelegramIcon isTransparent />
            <div>Telegram</div>
          </a>
          <a
            className={iconClassName}
            href="https://wa.me/48730003997"
            target="_blank"
          >
            <WhatsappIcon isTransparent />
            <div>Whatsapp</div>
          </a>
          <a
            className={iconClassName}
            href="https://m.me/227130810472971"
            target="_blank"
          >
            <MessengerIcon />
            <div>Messenger</div>
          </a>
        </div>
      </div>
      <div className="mobile-only bg-light rounded-3xl mobile-wrapper py-10">
        <div className="main-title mb-3">
          <span className="text-gradient whitespace-pre">
            {t("price_by_photo_title_mobile")}
          </span>
        </div>
        <div className="text-center mb-12">
          <span className="whitespace-pre">
            {t("price_by_photo_text_mobile")}
          </span>
        </div>
        <div className="img-wrapper-mobile relative flex justify-center">
          <Image src={chatPng} alt="" className="absolute" />
          <Image src={iPhoneSvg} alt="" className="absolute" />
        </div>
        <div className="px-10 grid grid-cols-2 gap-4 lg:gap-6">
          <a
            className={iconClassName}
            href="https://t.me/takeyourtime_pln"
            target="_blank"
          >
            <TelegramIcon isTransparent />
            <div>Telegram</div>
          </a>
          <a
            className={iconClassName}
            href="https://www.instagram.com/takeyourtime_pln/"
            target="_blank"
          >
            <InstIcon isTransparent />
            <div>Instagram</div>
          </a>
          <a
            className={iconClassName}
            href="https://wa.me/48730003997"
            target="_blank"
          >
            <WhatsappIcon isTransparent />
            <div>Whatsapp</div>
          </a>
          <a
            className={iconClassName}
            href="https://m.me/227130810472971"
            target="_blank"
          >
            <MessengerIcon />
            <div>Messenger</div>
          </a>
        </div>
      </div>
    </div>
  );
};
