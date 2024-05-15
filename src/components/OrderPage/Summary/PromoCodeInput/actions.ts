"use server";

import request from "@/utils/request";

export const checkPromo = async (promoInputValue: string) => {
  return await request({ url: `promo/${promoInputValue}`, cache: "no-store" });
};
