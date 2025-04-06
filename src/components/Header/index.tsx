"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  useRouter,
  usePathname,
  useParams,
  useSearchParams,
} from "next/navigation";
import Cookies from "js-cookie";

import { useLocales } from "@/hooks/useLocales";
import GoogleIcon from "@/components/common/icons/components/Google";
import { TelegramIcon } from "@/components/common/icons/components/Telegram";
import { WhatsappIcon } from "@/components/common/icons/components/Whatsapp";
import { InstIcon } from "@/components/common/icons/components/Inst";
import MenuIcon from "@/components/Header/icons/MenuIcon";
import NavigationItems from "@/components/Header/NavigrationItems";
import { LocaleContext } from "@/components/Providers";

import { LogoIcon } from "../common/icons/components/Logo";

import NavigationItemsMobile from "@/components/Header/NavigationItemsMobile";
import { sendGAEvent } from "@/google-analytics";
import Dropdown from "@/components/Header/Dropdown";
import { CITIES } from "@/constants";
import SocialMedia from "./icons/SocialMedia";

const mainLocales = {
  en: "English",
  ru: "Русский",
  pl: "Polski",
  ua: "Україньска",
};

const SOCIAL_MEDIAS = {
  GOOGLE: "Google",
  INSTAGRAM: "Instagram",
  WHATSAPP: "Whatsapp",
  TELEGRAM: "Telegram",
};

const SOCIAL_MEDIAS_OPTIONS = [
  { value: SOCIAL_MEDIAS.GOOGLE, icon: <GoogleIcon className="w-5 h-5" /> },
  { value: SOCIAL_MEDIAS.INSTAGRAM, icon: <InstIcon className="w-5 h-5" /> },
  {
    value: SOCIAL_MEDIAS.WHATSAPP,
    icon: <WhatsappIcon className="w-5 h-5" />,
  },
  {
    value: SOCIAL_MEDIAS.TELEGRAM,
    icon: <TelegramIcon className="w-5 h-5" />,
  },
];

const SOCIAL_MEDIA_LINKS = {
  [SOCIAL_MEDIAS.GOOGLE]: "https://maps.app.goo.gl/uTEhCrLkdEXG6DDd8",
  [SOCIAL_MEDIAS.INSTAGRAM]: "https://www.instagram.com/takeyourtime_pln/",
  [SOCIAL_MEDIAS.WHATSAPP]: "https://wa.me/48730003997",
  [SOCIAL_MEDIAS.TELEGRAM]: "https://t.me/takeyourtime_pln",
};

export const Header = () => {
  const { locales, locale, setNewLocal } = useContext(LocaleContext);
  const { t } = useLocales(locales);
  const headerRef = useRef<HTMLHeadingElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { lang } = useParams();
  const searchParams = useSearchParams();

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const onSelectLocale = (e: any, language: string) => {
    e.stopPropagation();
    const newLocale =
      Object.keys(mainLocales).find((key) => {
        // @ts-ignore
        return mainLocales[key] === language;
      }) || "pl";

    Cookies.set("locale", newLocale, { expires: 30 });

    sendGAEvent({
      action: "language_change",
      category: "language",
      label: "Changed language",
      value: `Previous language: ${lang}, Selected language: ${newLocale}`,
    });

    router.push(
      `${pathname.replace(/\/(en|ru|pl|ua)/, `/${newLocale}`)}?${searchParams.toString()}`,
    );
  };

  useEffect(() => {
    setNewLocal(lang as "en" | "ru" | "pl" | "ua");
  }, [lang]);

  const headerHeight = headerRef?.current?.offsetHeight;

  const trackSocialMediaClick = (socialMedia: string) => {
    sendGAEvent({
      action: "social_media_click",
      category: "social_media",
      label: "Clicked on social media icon",
      value: socialMedia,
    });
  };

  const selectedCity = searchParams.get("city");

  const onCitySelect = (
    event: React.MouseEvent<HTMLDivElement>,
    service: string,
  ) => {
    event.stopPropagation();
    const updatedSearchParams = new URLSearchParams(searchParams.toString());

    updatedSearchParams.set("city", service);

    window.history.pushState(null, "", `?${updatedSearchParams.toString()}`);
  };

  const onSocialMediaClick = (
    event: React.MouseEvent<HTMLDivElement>,
    value: string,
  ) => {
    event.stopPropagation();

    trackSocialMediaClick(value);

    window.open(SOCIAL_MEDIA_LINKS[value], "_blank", "noopener,noreferrer");
  };

  return (
    <header
      ref={headerRef}
      className={`h-auto lg:h-20 py-2 px-6 lg:py-2 lg:px-24 bg-white
        flex items-center ${
          isMenuOpened ? "fixed top-0 w-full z-50" : ""
        }`}
    >
      <nav className="flex w-full items-center">
        <div className="m-0 lg:mr-3 flex">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              router.push(`/${lang}?${searchParams.toString()}`);
            }}
          >
            <div>
              <LogoIcon className="w-11 h-9 lg:w-auto lg:h-auto" />
            </div>
          </div>
          <div className="ml-2 flex items-center">
            <Dropdown
              isBoldText
              translateOptions
              options={Object.values(CITIES).map(({ name }) => ({
                value: name,
              }))}
              onSelect={onCitySelect}
              t={t}
              value={selectedCity || CITIES.KRAKOW.name}
            />
          </div>
        </div>
        <NavigationItems t={t} />
        <div className="ml-auto lg:ml-0 mr-3 lg:mr-0">
          <Dropdown
            options={Object.values(mainLocales).map((item) => ({
              value: item,
            }))}
            onSelect={onSelectLocale}
            t={t}
            value={mainLocales[locale]}
          />
        </div>
        <div className={`pl-2 lg:pl-0 mobile-none ml-auto flex gap-6`}>
          <div className="hidden xl:flex flex-col justify-center text-gradient text-sm lg:text-lg font-semibold">
            +48 730 003 997
          </div>
          <div className="flex gap-3">
            <Dropdown
              options={SOCIAL_MEDIAS_OPTIONS}
              onSelect={onSocialMediaClick}
              t={t}
              plainContent={<SocialMedia />}
            />
          </div>
        </div>
        <div
          className="mobile-only-flex items-center"
          onClick={() => setIsMenuOpened(!isMenuOpened)}
        >
          <MenuIcon
            className={`${isMenuOpened ? "text-primary" : "text-dark"}`}
          />
        </div>
      </nav>
      {isMenuOpened && (
        <div
          className="fixed w-full h-full left-0 bg-light z-10"
          style={{
            top: headerHeight ? headerHeight - 1 : 0,
          }}
        >
          <NavigationItemsMobile t={t} setIsMenuOpened={setIsMenuOpened} />
        </div>
      )}
    </header>
  );
};
