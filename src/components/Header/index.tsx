"use client";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

import { useLocales } from "@/hooks/useLocales";
import { MessengerIcon } from "@/components/common/icons/components/Messenger";
import { TelegramIcon } from "@/components/common/icons/components/Telegram";
import { WhatsappIcon } from "@/components/common/icons/components/Whatsapp";
import { InstIcon } from "@/components/common/icons/components/Inst";
import MenuIcon from "@/components/Header/icons/MenuIcon";
import NavigationItems from "@/components/Header/NavigrationItems";
import { LocaleContext } from "@/components/Providers";
import { ILocales } from "@/locales";

import { LogoIcon } from "./icons/Logo";
import { Polygon } from "./icons/Polygon";

import "./style.scss";
import NavigationItemsMobile from "@/components/Header/NavigationItemsMobile";

const mainLocales = {
  en: "English",
  ru: "Russian",
  pl: "Polish",
  uk: "Ukrainian",
};

interface Props {
  locales: ILocales[];
}

export const Header: FC<Props> = ({ locales }) => {
  const { t } = useLocales(locales);
  const [localesModal, setLocalesModal] = useState(false);
  const { locale, setNewLocal } = useContext(LocaleContext);
  const headerRef = useRef<HTMLHeadingElement | null>(null);

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const onSelectLocale = (e: any, language: string) => {
    e.stopPropagation();
    const newLocale =
      Object.keys(mainLocales).find((key) => {
        // @ts-ignore
        return mainLocales[key] === language;
      }) || "pl";

    Cookies.set("locale", newLocale);
    setNewLocal(newLocale);
    setLocalesModal(false);
  };

  useEffect(() => {
    const locale = Cookies.get("locale") || "pl";
    setNewLocal(locale);
  }, []);

  const headerHeight = headerRef?.current?.offsetHeight;

  return (
    <header ref={headerRef} className={isMenuOpened ? "header-sticky" : ""}>
      <nav className="_flex">
        <div className="logo-wrapper _flex">
          <Link className="navbar-brand _flex _items-center" href={"/"}>
            <div>
              <LogoIcon className="logo-icon" />
            </div>
          </Link>
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
          <Link
            href={"/"}
            className="_px-4 _py-2 _flex _gap-1"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {/* @ts-ignore */}
            <div className="nav-link">{t(mainLocales[locale])}</div>
            <div className="_flex _items-center">
              <Polygon />
            </div>
          </Link>
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
