"use client";
import React, { useState, createContext } from "react";
import { ILocales } from "@/locales";
import { Prices } from "@/types";

interface Props {
  children: React.ReactNode;
  locales: ILocales[];
  prices?: Prices;
}

export const LocaleContext = createContext({
  locale: "en" as "en" | "ru" | "pl" | "ua",
  locales: [] as ILocales[],
  setNewLocal: (locale: "en" | "ru" | "pl" | "ua") => {},
});

export const PricesContext = createContext({
  prices: {} as Prices,
});

export const Providers = ({ children, locales, prices = {} }: Props) => {
  const [locale, setNewLocal] = useState<"en" | "ru" | "pl" | "ua">("en");

  return (
    <PricesContext.Provider value={{ prices }}>
      <LocaleContext.Provider value={{ locale, setNewLocal, locales }}>
        {children}
      </LocaleContext.Provider>
    </PricesContext.Provider>
  );
};
