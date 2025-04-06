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
    <footer className="footer-wrapper py-10 text-dark">
      <div className="flex justify-center">
        <div className="mb-0.5">
          <LogoIcon />
        </div>
      </div>
      <div className="mb-6 main-title flex justify-center">
        <div className="text-gradient">{t("Take Your Time")}</div>
      </div>
      <div className="mb-5 text-dark flex justify-center gap-3 text-gradient">
        <a
          className="icon"
          href="https://t.me/takeyourtime_pln"
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
      <div className="flex justify-center text-gradient">
        <div className="mb-5 text-dark flex justify-between gap-3">
          <div className="flex gap-1">
            <PhoneIcon />
            +48 730 003 997
          </div>
        </div>
      </div>
      <div className="flex justify-center text-gradient">
        <div className="mb-5 text-dark flex justify-between gap-3">
          <div className="flex gap-1 items-center">
            <MailIcon />
            Mail: tytimeinbox@gmail.com
          </div>
        </div>
      </div>
      <div className="flex justify-center text-gradient">
        <div
          className="flex justify-between text-center"
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
