"use client";
import React, { useState, createContext } from "react";
import { ILocales } from "@/locales";

interface Props {
  children: React.ReactNode;
  locales: ILocales[];
}

export const LocaleContext = createContext({
  locale: "en",
  locales: [] as ILocales[],
  setNewLocal: (locale: string) => {},
});

export const Providers = ({ children, locales }: Props) => {
  const [locale, setNewLocal] = useState("en");

  return (
    <LocaleContext.Provider value={{ locale, setNewLocal, locales }}>
      {children}
    </LocaleContext.Provider>
  );
};
