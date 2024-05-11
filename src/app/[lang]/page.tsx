import React from "react";

import { MainPage } from "@/components/MainPage";
import { Providers } from "@/components/Providers";
import { getBlogs, getLocales } from "@/app/api";
import { Header } from "@/components/Header";

export default async function Page() {
  const locales = await getLocales();
  const blogs = await getBlogs();

  return (
    <Providers locales={locales}>
      <main>
        <Header />
        <MainPage blogs={blogs} />
      </main>
    </Providers>
  );
}
