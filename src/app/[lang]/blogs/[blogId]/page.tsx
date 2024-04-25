import Blogs from "@/components/Blogs";
import React from "react";
import { getLocales } from "@/app/api";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";

export default async function Page() {
  const locales = await getLocales();

  return (
    <Providers locales={locales}>
      <main>
        <Header />
        <Blogs />
      </main>
    </Providers>
  );
}
