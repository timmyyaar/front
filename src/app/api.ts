import { ILocales } from "@/locales";
import request from "@/utils/request";

export async function getLocales(): Promise<ILocales[]> {
  const { locales } = await request({ url: "locales" });

  return locales;
}
