"use server";

import request, { HTTP_METHODS } from "@/utils/request";

type CreateCareerBody = {
  name: string;
  phone: string;
  email: string;
  about: string;
  referralCode: string | null;
};

export const createCareer = async (body: CreateCareerBody) => {
  try {
    return await request({
      url: "careers",
      method: HTTP_METHODS.POST,
      body,
      cache: "no-store",
    });
  } catch (error) {
    return { isError: true };
  }
};
