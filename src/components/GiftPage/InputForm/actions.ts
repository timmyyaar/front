"use server";

import request, { HTTP_METHODS } from "@/utils/request";

type CreateGiftBody = {
  email: string;
  phone: string;
  comment: string;
};

export const createGift = async (body: CreateGiftBody) => {
  try {
    return await request({
      url: "gift",
      method: HTTP_METHODS.POST,
      body,
      cache: "no-store",
    });
  } catch (error) {
    return { isError: true };
  }
};
