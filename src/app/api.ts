import { ILocales } from "@/locales";
import request from "@/utils/request";
import { Prices } from "@/types";

export async function getLocales(): Promise<ILocales[]> {
  const { locales } = await request({ url: "locales", cache: "no-store" });

  return locales;
}

export async function getPrices(): Promise<Prices> {
  const pricesResponse = await request({ url: "prices", cache: "no-store" });

  return pricesResponse.reduce(
    (result: Prices, item: { key: string; price: number }) => ({
      ...result,
      [item.key]: item.price,
    }),
    {}
  );
}

export async function getPaymentIntent(id: string) {
  return await request({ url: `payment-intent/${id}`, cache: "no-store" });
}

export async function getBlogs() {
  return await request({ url: "blogs", cache: "no-store" });
}

export async function getDiscounts() {
  return await request({ url: "discounts", cache: "no-store" });
}

export async function getReviews() {
  return await request({ url: "reviews", cache: "no-store" });
}
