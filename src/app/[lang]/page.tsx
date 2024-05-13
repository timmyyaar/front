import React from "react";

import { MainPage } from "@/components/MainPage";
import { Providers } from "@/components/Providers";
import { getBlogs, getLocales, getPrices } from "@/app/api";
import { Header } from "@/components/Header";

export default async function Page() {
  const locales = await getLocales();
  const blogs = await getBlogs();
  const prices = await getPrices();

  return (
    <Providers locales={locales} prices={prices}>
      <main>
        <Header />
        <MainPage blogs={blogs} />
      </main>
    </Providers>
  );
}
