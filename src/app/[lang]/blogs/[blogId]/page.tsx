import Blogs from "@/components/Blogs";
import React from "react";
import { getLocales } from "@/app/api";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { getBlog } from "./actions";
import { Language } from "@/types";
import { ALTERNATES_LANGUAGES } from "@/app/constants";

interface BlogProps {
  params: { blogId: string };
}

type MetadataProps = {
  params: { lang: Language; blogId: string };
};

export async function generateMetadata({ params }: MetadataProps) {
  const { lang, blogId } = params;

  const locales = await getLocales();

  const currentLanguageLocales = locales
    .filter((item) => item.locale === lang)
    .reduce(
      (result: { [key: string]: string }, item) => ({
        ...result,
        [item.key]: item.value,
      }),
      {}
    );

  const blog = await getBlog(params.blogId);

  return {
    title: currentLanguageLocales[`blogs_title_${blog.id}`],
    description: currentLanguageLocales[`blogs_description_${blog.id}`],
    alternates: {
      canonical: `https://www.takeutime.pl/${lang}/blogs/${blogId}`,
      languages: ALTERNATES_LANGUAGES.reduce(
        (result, { hrefLang, language }) => ({
          ...result,
          [`${hrefLang}`]: `https://www.takeutime.pl/${language}/blogs/${blogId}`,
        }),
        {}
      ),
    },
  };
}

export default async function Page({ params }: BlogProps) {
  const locales = await getLocales();
  const blog = await getBlog(params.blogId);

  return (
    <Providers locales={locales}>
      <main>
        <Header />
        <Blogs blog={blog} />
      </main>
    </Providers>
  );
}
