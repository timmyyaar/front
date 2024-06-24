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

const mainLocales = {
  en: "English",
  ru: "Русский",
  pl: "Polski",
  ua: "Україньска",
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

  return (
    <header
      ref={headerRef}
      className={`_h-auto lg:_h-20 _py-2 _px-6 lg:_py-2 lg:_px-24 _bg-white
        _flex _items-center ${
          isMenuOpened ? "_fixed _top-0 _w-full _z-50" : ""
        }`}
    >
      <nav className="_flex _w-full _items-center">
        <div className="_m-0 lg:_mr-3 _flex">
          <div
            className="navbar-brand _flex _items-center _cursor-pointer"
            onClick={() => {
              router.push(`/${lang}?${searchParams.toString()}`);
            }}
          >
            <div>
              <LogoIcon className="_w-11 _h-9 lg:_w-auto lg:_h-auto" />
            </div>
          </div>
          <div className="_ml-2 _flex _items-center">
            <Dropdown
              isBoldText
              translateOptions
              options={Object.values(CITIES).map(({ name }) => name)}
              onSelect={onCitySelect}
              t={t}
              value={selectedCity || CITIES.KRAKOW.name}
            />
          </div>
        </div>
        <NavigationItems t={t} />
        <Dropdown
          options={Object.values(mainLocales)}
          onSelect={onSelectLocale}
          t={t}
          value={mainLocales[locale]}
        />
        <div
          className={`_text-sm lg:_text-lg _font-semibold _pl-2
            lg:_pl-0 mobile-none _ml-auto _flex _gap-6`}
        >
          <div className="_hidden xl:_flex _flex-col _justify-center text-gradient">
            +48 730 003 997
          </div>
          <div className="_flex _gap-3">
            <a
              className="_flex _flex-col _justify-center"
              href="https://t.me/takeyoourtime"
              target="_blank"
              onClick={() => trackSocialMediaClick("Telegram")}
            >
              <TelegramIcon />
            </a>
            <a
              className="_flex _flex-col _justify-center"
              href="https://wa.me/48730003997"
              target="_blank"
              onClick={() => trackSocialMediaClick("WhatsApp")}
            >
              <WhatsappIcon />
            </a>
            <a
              className="_flex _flex-col _justify-center"
              href="https://www.instagram.com/takeyourtime_krakow/"
              target="_blank"
              onClick={() => trackSocialMediaClick("Instagram")}
            >
              <InstIcon />
            </a>
            <a
              className="_flex _flex-col _justify-center"
              href="https://maps.app.goo.gl/uTEhCrLkdEXG6DDd8"
              target="_blank"
              onClick={() => trackSocialMediaClick("Google")}
            >
              <GoogleIcon />
            </a>
          </div>
        </div>
        <div
          className="mobile-only-flex _items-center _ml-auto"
          onClick={() => setIsMenuOpened(!isMenuOpened)}
        >
          <MenuIcon
            className={`${isMenuOpened ? "_text-primary" : "_text-dark"}`}
          />
        </div>
      </nav>
      {isMenuOpened && (
        <div
          className="_fixed _w-full _h-full _left-0 _bg-light _z-10"
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
