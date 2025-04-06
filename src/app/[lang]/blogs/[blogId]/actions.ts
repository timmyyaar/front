"use server";

import request from "@/utils/request";

export const getBlog = async (key: string) => {
  return await request({ url: `blogs/${key}`, cache: "no-store" });
};
