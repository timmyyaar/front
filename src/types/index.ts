import { ReactNode } from "react";
import { StaticImageData } from "next/image";

export type TBlog = {
  id: number;
  title: string;
  text: string;
  read_time: number;
  main_image: string;
  date: string;
  category: string;
  key: string;
};

export type TranslateFunction = (text: string) => string;

export type Language = "pl" | "ru" | "en" | "ua";

export type Price = { id: number; key: string; city: string; price: number };

export type Prices = { [key: string]: number };

export type MainService = {
  id: number;
  title: string;
  disabledCities: string[];
  category: string | null;
};

export type SubService = {
  id: number;
  key: string;
  title: string;
  time: number;
  isDiscountExcluded: boolean;
  mainServices: number[];
  isStandalone: boolean;
  disabledCities: string[];
  countInPrivateHouse: boolean;
};

export interface ISubService {
  id: number;
  countInPrivateHouse: boolean;
  disabledCities: string[];
  isDiscountExcluded: boolean;
  isStandalone: boolean;
  key: string;
  mainServices: number[];
  title: string;
  icons?: StaticImageData;
  price: number;
  originalPrice: number;
  oldPrice: string | number;
  time: number;
  count: number;
}

export type Counter = {
  title?: string;
  value: string;
  type?: string;
  param?: string;
};

export type Cost = {
  title?: ReactNode;
  text?: ReactNode;
  price?: number;
  oldPrice?: number;
  isOzonation?: boolean;
};
