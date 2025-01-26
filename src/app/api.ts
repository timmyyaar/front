import { ILocales } from "@/locales";
import request from "@/utils/request";
import { Price } from "@/types";

export async function getLocales(): Promise<ILocales[]> {
  const { locales } = await request({ url: "locales", cache: "no-store" });

  return locales;
}

export async function getPrices(): Promise<Price[]> {
  return await request({
    url: "prices",
    cache: "no-store",
  });
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

export async function getMainServices() {
  return await request({ url: "main-services", cache: "no-store" });
}

export async function getSubServices() {
  return await request({ url: "sub-services", cache: "no-store" });
}

export async function getOrdersCount() {
  return await request({ url: "order/orders-count", cache: "no-store" });
}
