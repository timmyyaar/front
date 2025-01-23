import React from "react";

import { MainPage } from "@/components/MainPage";
import { Providers } from "@/components/Providers";
import {
  getBlogs,
  getLocales,
  getMainServices,
  getOrdersCount,
  getPrices,
  getReviews,
} from "@/app/api";
import { Header } from "@/components/Header";

export default async function Page() {
  const [locales, blogs, prices, reviews, mainServices, ordersCount] =
    await Promise.all([
      getLocales(),
      getBlogs(),
      getPrices(),
      getReviews(),
      getMainServices(),
      getOrdersCount(),
    ]);

  return (
    <Providers locales={locales} prices={prices} mainServices={mainServices}>
      <main>
        <Header />
        <MainPage blogs={blogs} reviews={reviews} ordersCount={ordersCount} />
      </main>
    </Providers>
  );
}
