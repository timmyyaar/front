import React from "react";

import { WhatsappIcon } from "@/components/common/icons/components/Whatsapp";
import { TelegramIcon } from "@/components/common/icons/components/Telegram";
import GoogleIcon from "@/components/common/icons/components/Google";
import { InstIcon } from "@/components/common/icons/components/Inst";
import { Writer } from "@/components/common/Writer";
import { sendGAEvent } from "@/google-analytics";
import { LogoIcon } from "@/components/common/icons/components/Logo";

import PhoneIcon from "@/components/common/icons/components/PhoneIcon";
import MailIcon from "@/components/common/icons/components/MailIcon";

export const Footer = (props: any) => {
  const { t } = props;

  const trackSocialMediaClick = (socialMedia: string) => {
    sendGAEvent({
      action: "social_media_click",
      category: "social_media",
      label: "Clicked on social media icon",
      value: socialMedia,
    });
  };

  return (
    <footer className="footer-wrapper _py-10 _text-dark">
      <div className="_flex _justify-center">
        <div className="_mb-0.5">
          <LogoIcon />
        </div>
      </div>
      <div className="_mb-6 _main-title _flex _justify-center">
        <div className="text-gradient">{t("Take Your Time")}</div>
      </div>
      <div className="_mb-5 _text-dark _flex _justify-center _gap-3 text-gradient">
        <a
          className="icon"
          href="https://t.me/takeyoourtime"
          target="_blank"
          onClick={() => trackSocialMediaClick("Telegram")}
        >
          <TelegramIcon />
        </a>
        <a
          className="icon"
          href="https://wa.me/48730003997"
          target="_blank"
          onClick={() => trackSocialMediaClick("WhatsApp")}
        >
          <WhatsappIcon />
        </a>
        <a
          className="icon"
          href="https://www.instagram.com/takeyourtime_pln/"
          target="_blank"
          onClick={() => trackSocialMediaClick("Instagram")}
        >
          <InstIcon />
        </a>
        <a
          className="icon"
          href="https://maps.app.goo.gl/uTEhCrLkdEXG6DDd8"
          target="_blank"
          onClick={() => trackSocialMediaClick("Google")}
        >
          <GoogleIcon />
        </a>
      </div>
      <div className="_flex _justify-center text-gradient">
        <div className="_mb-5 _text-dark _flex _justify-between _gap-3">
          <div className="_flex _gap-1">
            <PhoneIcon />
            +48 730 003 997
          </div>
        </div>
      </div>
      <div className="_flex _justify-center text-gradient">
        <div className="_mb-5 _text-dark _flex _justify-between _gap-3">
          <div className="_flex _gap-1 _items-center">
            <MailIcon />
            Mail: tytimeinbox@gmail.com
          </div>
        </div>
      </div>
      <div className="_flex _justify-center text-gradient">
        <div
          className="_flex _justify-between _text-center"
          style={{ width: 300, marginBottom: "20px" }}
        >
          <a href="/Polityka_prywatności.pdf" target="_blank">
            <Writer text={t("Privacy and policy")} />
          </a>
          <a href="/Warunki_i_postanowienia.pdf" target="_blank">
            <Writer text={t("Terms and conditions")} />
          </a>
        </div>
      </div>
    </footer>
  );
};
