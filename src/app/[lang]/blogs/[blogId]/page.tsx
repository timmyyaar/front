import Blog from "@/components/Blogs/Blog";
import React from "react";
import { getLocales } from "@/app/api";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { getBlog } from "./actions";
import { Language } from "@/types";
import { ALTERNATES_LANGUAGES } from "@/app/constants";

interface BlogProps {
  params: Promise<{ blogId: string }>;
}

type MetadataProps = {
  params: Promise<{ lang: Language; blogId: string }>;
};

export async function generateMetadata({ params }: MetadataProps) {
  const { lang, blogId } = await params;

  const locales = await getLocales();

  const currentLanguageLocales = locales
    .filter((item) => item.locale === lang)
    .reduce(
      (result: { [key: string]: string }, item) => ({
        ...result,
        [item.key]: item.value,
      }),
      {},
    );

  const blog = await getBlog(blogId);

  return {
    title: currentLanguageLocales[`blog_metadata_title_${blog.key}`],
    description:
      currentLanguageLocales[`blog_metadata_description_${blog.key}`],
    alternates: {
      canonical: `https://www.takeutime.pl/${lang}/blogs/${blogId}`,
      languages: ALTERNATES_LANGUAGES.reduce(
        (result, { hrefLang, language }) => ({
          ...result,
          [`${hrefLang}`]: `https://www.takeutime.pl/${language}/blogs/${blogId}`,
        }),
        {},
      ),
    },
  };
}

export default async function Page({ params }: BlogProps) {
  const { blogId } = await params;

  const locales = await getLocales();
  const blog = await getBlog(blogId);

  return (
    <Providers locales={locales}>
      <main>
        <Header />
        <Blog blog={blog} />
      </main>
    </Providers>
  );
}
