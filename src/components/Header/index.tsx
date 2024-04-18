"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname, useParams } from "next/navigation";
import Cookies from "js-cookie";

import { useLocales } from "@/hooks/useLocales";
import { MessengerIcon } from "@/components/common/icons/components/Messenger";
import { TelegramIcon } from "@/components/common/icons/components/Telegram";
import { WhatsappIcon } from "@/components/common/icons/components/Whatsapp";
import { InstIcon } from "@/components/common/icons/components/Inst";
import MenuIcon from "@/components/Header/icons/MenuIcon";
import NavigationItems from "@/components/Header/NavigrationItems";
import { LocaleContext } from "@/components/Providers";

import { LogoIcon } from "./icons/Logo";
import { Polygon } from "./icons/Polygon";

import "./style.scss";
import NavigationItemsMobile from "@/components/Header/NavigationItemsMobile";

const mainLocales = {
  en: "English",
  ru: "Russian",
  pl: "Polish",
  ua: "Ukrainian",
};

export const Header = () => {
  const { locales, locale, setNewLocal } = useContext(LocaleContext);
  const { t } = useLocales(locales);
  const [localesModal, setLocalesModal] = useState(false);
  const headerRef = useRef<HTMLHeadingElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { lang } = useParams();

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const onSelectLocale = (e: any, language: string) => {
    e.stopPropagation();
    const newLocale =
      Object.keys(mainLocales).find((key) => {
        // @ts-ignore
        return mainLocales[key] === language;
      }) || "pl";

    Cookies.set("locale", newLocale);

    router.push(`${pathname.replace(/\/(en|ru|pl|ua)/, `/${newLocale}`)}`);
    setLocalesModal(false);
  };

  useEffect(() => {
    setNewLocal(lang as string);
  }, [lang]);

  const headerHeight = headerRef?.current?.offsetHeight;

  return (
    <header ref={headerRef} className={isMenuOpened ? "header-sticky" : ""}>
      <nav className="_flex">
        <div className="logo-wrapper _flex">
          <div
            className="navbar-brand _flex _items-center _cursor-pointer"
            onClick={() => {
              router.push(`/${lang}`);
            }}
          >
            <div>
              <LogoIcon className="logo-icon" />
            </div>
          </div>
          <div className="sub-menu-wrapper _flex _flex-col _justify-center _pl-4">
            Krakow
          </div>
        </div>
        <NavigationItems t={t} />
        <div
          className="navigation-wrapper _flex _justify-between _items-center _cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            setLocalesModal(true);
          }}
        >
          <div
            className="_px-4 _py-2 _flex _gap-1 link"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {/* @ts-ignore */}
            <div className="nav-link">{t(mainLocales[locale])}</div>
            <div className="_flex _items-center">
              <Polygon />
            </div>
          </div>
          {localesModal ? (
            <div className="navigation-sub-menu-wrapper">
              {Object.values(mainLocales).map((option) => (
                <div
                  className="navigation-sub-menu-item"
                  onClick={(e) => onSelectLocale(e, option)}
                  key={option}
                >
                  {t(option)}
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="sub-menu-wrapper mobile-none _ml-auto _flex _gap-6">
          <div className="phone _flex _flex-col _justify-center">
            +48 730 003 997
          </div>
          <div className="_flex _gap-3">
            <a
              className="icon _flex _flex-col _justify-center"
              href="https://t.me/takeyoourtime"
              target="blanc"
            >
              <TelegramIcon />
            </a>
            <a
              className="icon _flex _flex-col _justify-center"
              href="https://wa.me/48730003997"
              target="blanc"
            >
              <WhatsappIcon />
            </a>
            <a
              className="icon _flex _flex-col _justify-center"
              href="https://m.me/227130810472971"
              target="blanc"
            >
              <MessengerIcon />
            </a>
            <a
              className="icon _flex _flex-col _justify-center"
              href="https://www.instagram.com/takeyourtime_krakow/"
              target="blanc"
            >
              <InstIcon />
            </a>
          </div>
        </div>
        <div
          className="mobile-only-flex _items-center menu-icon"
          onClick={() => setIsMenuOpened(!isMenuOpened)}
        >
          <MenuIcon className={`icon ${isMenuOpened ? "active" : ""}`} />
        </div>
      </nav>
      {isMenuOpened && (
        <div
          className="_fixed _w-full _h-full _left-0 menu-container _z-10"
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
