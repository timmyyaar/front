"use server";

import request, { HTTP_METHODS } from "@/utils/request";

type SendFeedbackBody = {
  feedback: string;
  rating: number | null;
};

export const sendFeedback = async (id: number, body: SendFeedbackBody) => {
  try {
    return await request({
      url: `order/${id}/send-feedback`,
      method: HTTP_METHODS.PATCH,
      body,
      cache: "no-store",
    });
  } catch (error) {
    return { isError: true };
  }
};
