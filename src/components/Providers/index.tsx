"use client";
import React, { useState, createContext } from "react";
import { ILocales } from "@/locales";
import { MainService, Price, SubService } from "@/types";

interface Props {
  children: React.ReactNode;
  locales: ILocales[];
  prices?: Price[];
  mainServices?: MainService[];
  subServices?: SubService[];
}

export const LocaleContext = createContext({
  locale: "en" as "en" | "ru" | "pl" | "ua",
  locales: [] as ILocales[],
  setNewLocal: (locale: "en" | "ru" | "pl" | "ua") => {},
});

export const PricesContext = createContext({
  prices: {} as Price[],
});

export const ServicesContext = createContext({
  mainServices: [] as MainService[],
  subServices: [] as SubService[],
});

export const Providers = ({
  children,
  locales,
  prices = [],
  mainServices = [],
  subServices = [],
}: Props) => {
  const [locale, setNewLocal] = useState<"en" | "ru" | "pl" | "ua">("en");

  return (
    <ServicesContext.Provider value={{ mainServices, subServices }}>
      <PricesContext.Provider value={{ prices }}>
        <LocaleContext.Provider value={{ locale, setNewLocal, locales }}>
          {children}
        </LocaleContext.Provider>
      </PricesContext.Provider>
    </ServicesContext.Provider>
  );
};
