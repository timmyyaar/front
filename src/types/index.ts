import { ReactNode } from "react";

export type Blog = {
  id: number;
  title: string;
  text: string;
  read_time: number;
  main_image: string;
  date: string;
  category: string;
  blog_image_one: string;
  blog_image_two: string;
};

export type TranslateFunction = (text: string) => string;

export type Language = "pl" | "ru" | "en" | "ua";

export type Prices = { [key: string]: number };

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
