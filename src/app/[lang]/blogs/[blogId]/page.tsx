import Blogs from "@/components/Blogs";
import React from "react";
import { getLocales } from "@/app/api";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { getBlog } from "./actions";

interface BlogProps {
  params: { blogId: string };
}

export default async function Page({ params }: BlogProps) {
  const locales = await getLocales();
  const blog = await getBlog(params.blogId);

  return (
    <Providers locales={locales}>
      <main>
        <Header />
        <Blogs blog={blog}/>
      </main>
    </Providers>
  );
}
