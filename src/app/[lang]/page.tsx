import React from "react";

import { MainPage } from "@/components/MainPage";
import { Providers } from "@/components/Providers";
import { getBlogs, getLocales, getPrices, getReviews } from "@/app/api";
import { Header } from "@/components/Header";

export default async function Page() {
  const [locales, blogs, prices, reviews] = await Promise.all([
    getLocales(),
    getBlogs(),
    getPrices(),
    getReviews(),
  ]);

  return (
    <Providers locales={locales} prices={prices}>
      <main>
        <Header />
        <MainPage blogs={blogs} reviews={reviews} />
      </main>
    </Providers>
  );
}
