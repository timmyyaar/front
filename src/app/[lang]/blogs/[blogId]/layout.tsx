import { ReactNode } from "react";
import { ALTERNATES_LANGUAGES } from "@/app/constants";
import { Language } from "@/types";

type MetadataProps = {
  params: { lang: Language; blogId: string };
};

export async function generateMetadata({ params }: MetadataProps) {
  const { lang, blogId } = params;

  return {
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

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
