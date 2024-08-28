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

  return (
    <div
      className={`price-by-photo-component _px-5-percents-mobile _mb-14
        lg:_mb-0 _flex _justify-center`}
    >
      <div className="price-by-photo-wrapper mobile-none _pt-12 _pb-10 _rounded-3xl _bg-light">
        <div className="_flex _flex-col">
          <div className="_main-title _whitespace-pre-line _mb-5 _flex _justify-center">
            <Writer
              text={t("Get the price from the photo with 99% accuracy")}
            />
          </div>
          <div className="_whitespace-pre-line _flex _justify-center _text-center">
            <Writer
              text={t(
                "Send a photo of the room and comments in any convenient messenger, and we will make an accurate calculation for you"
              )}
            />
          </div>
          <div className="img-wrapper _relative _mt-8 _mb-10 _flex _justify-center">
            <Image src={bubblesSvg} alt="" className="_absolute" />
            <Image src={chatPng} alt="" className="_absolute" />
            <Image src={iPhoneSvg} alt="" className="_absolute" />
          </div>
        </div>
        <div className="_flex _justify-center _gap-6">
          <a
            className={`_flex _justify-center _items-center _gap-2 _bg-primary
              hover:_bg-primary-dark active:_bg-primary-dark _text-white _px-6 _py-4 _transition-all _text-center
              _font-medium _border-40 _cursor-pointer`}
            href="https://t.me/takeyoourtime"
            target="_blank"
          >
            <TelegramIcon isTransparent />
            <div>Telegram</div>
          </a>
          <a
            className={`_flex _justify-center _items-center _gap-2 _bg-primary
              hover:_bg-primary-dark active:_bg-primary-dark _text-white _px-6 _py-4 _transition-all _text-center
              _font-medium _border-40 _cursor-pointer`}
            href="https://wa.me/48730003997"
            target="_blank"
          >
            <WhatsappIcon isTransparent />
            <div>Whatsapp</div>
          </a>
          <a
            className={`_flex _justify-center _items-center _gap-2 _bg-primary
              hover:_bg-primary-dark active:_bg-primary-dark _text-white _px-6 _py-4 _transition-all _text-center
              _font-medium _border-40 _cursor-pointer`}
            href="https://m.me/227130810472971"
            target="_blank"
          >
            <MessengerIcon />
            <div>Messenger</div>
          </a>
        </div>
      </div>
      <div className="mobile-only _bg-light _rounded-3xl mobile-wrapper _py-10">
        <div className="_main-title _mb-3">
          <Writer text={t("price_by_photo_title_mobile")} />
        </div>
        <div className="_text-center _mb-12">
          <Writer text={t("price_by_photo_text_mobile")} />
        </div>
        <div className="img-wrapper-mobile _relative _flex _justify-center">
          <Image src={chatPng} alt="" className="_absolute" />
          <Image src={iPhoneSvg} alt="" className="_absolute" />
        </div>
        <div className="_px-10 _grid _grid-cols-2 _gap-4 lg:_gap-6">
          <a
            className={`_flex _justify-center _items-center _gap-2 _bg-primary
              hover:_bg-primary-dark active:_bg-primary-dark _text-white lg:_px-6 _py-4 _transition-all _text-center
              _font-medium _border-40 _cursor-pointer`}
            href="https://t.me/takeyoourtime"
            target="_blank"
          >
            <TelegramIcon isTransparent />
            <div>Telegram</div>
          </a>
          <a
            className={`_flex _justify-center _items-center _gap-2 _bg-primary
              hover:_bg-primary-dark active:_bg-primary-dark _text-white lg:_px-6 _py-4 _transition-all _text-center
              _font-medium _border-40 _cursor-pointer`}
            href="https://www.instagram.com/takeyourtime_pln/"
            target="_blank"
          >
            <InstIcon isTransparent />
            <div>Instagram</div>
          </a>
          <a
            className={`_flex _justify-center _items-center _gap-2 _bg-primary
              hover:_bg-primary-dark active:_bg-primary-dark _text-white lg:_px-6 _py-4 _transition-all _text-center
              _font-medium _border-40 _cursor-pointer`}
            href="https://wa.me/48730003997"
            target="_blank"
          >
            <WhatsappIcon isTransparent />
            <div>Whatsapp</div>
          </a>
          <a
            className={`_flex _justify-center _items-center _gap-2 _bg-primary
              hover:_bg-primary-dark active:_bg-primary-dark _text-white lg:_px-6 _py-4 _transition-all _text-center
              _font-medium _border-40 _cursor-pointer`}
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
