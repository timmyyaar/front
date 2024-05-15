"use server";

import request, { HTTP_METHODS } from "@/utils/request";
import { CreateOrderPayload } from "@/components/OrderPage/Summary/OrderButton/index";

type CreatePaymentIntentBody = {
  price: number;
  email: string;
};

export const createPaymentIntent = async (body: CreatePaymentIntentBody) => {
  try {
    return await request({
      url: "payment-intent",
      method: HTTP_METHODS.POST,
      body,
      cache: "no-store",
    });
  } catch (error) {
    return { isError: true };
  }
};

type EditPaymentIntentBody = {
  metadata: { orderIds: string };
  description: string;
};

export const editPaymentIntent = async (
  paymentIntentId: string,
  body: EditPaymentIntentBody
) => {
  return await request({
    url: `payment-intent/${paymentIntentId}`,
    method: HTTP_METHODS.PATCH,
    body,
    cache: "no-store",
  });
};

export const deletePaymentIntent = async (id: string) => {
  return await request({
    url: `payment-intent/${id}`,
    method: HTTP_METHODS.DELETE,
    cache: "no-store",
  });
};

export const createOrder = async (body: CreateOrderPayload) => {
  try {
    return await request({
      url: "order",
      method: HTTP_METHODS.POST,
      body,
      cache: "no-store",
    });
  } catch (error: unknown) {
    return { isError: true, ...(error as { code: number; message: string }) };
  }
};
