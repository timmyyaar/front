import { ILocales } from "@/locales";
import request from "@/utils/request";
import { Prices } from "@/types";

export async function getLocales(): Promise<ILocales[]> {
  const { locales } = await request({ url: "locales" });

  return locales;
}

export async function getPrices(): Promise<Prices> {
  const pricesResponse = await request({ url: "prices" });

  return pricesResponse.reduce(
    (result: Prices, item: { key: string; price: number }) => ({
      ...result,
      [item.key]: item.price,
    }),
    {}
  );
}
