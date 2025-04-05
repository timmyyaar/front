import React from "react";

import { getBlogs, getLocales } from "@/app/api";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import Blogs from "@/components/Blogs";

export default async function BlogsPage() {
  const [blogs, locales] = await Promise.all([getBlogs(), getLocales()]);

  return (
    <Providers locales={locales}>
      <main>
        <Header />
        <Blogs blogs={blogs} />
      </main>
    </Providers>
  );
}
