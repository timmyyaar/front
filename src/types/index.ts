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
