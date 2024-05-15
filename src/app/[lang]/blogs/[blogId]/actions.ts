"use server";

import request from "@/utils/request";

export const getBlog = async (id: string) => {
  return await request({ url: `blogs/${id}`, cache: "no-store" });
};
