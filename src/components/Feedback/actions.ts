"use server";

import request from "@/utils/request";

export const getOrdersByIds = async (ids: string) => {
  return await request({
    url: `order/client-order?ids=${ids}`,
    cache: "no-store",
  });
};
