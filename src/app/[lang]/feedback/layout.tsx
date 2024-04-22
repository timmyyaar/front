import { ReactNode } from "react";
import { ALTERNATES_LANGUAGES } from "@/app/constants";
import { Language } from "@/types";

type MetadataProps = {
  params: { lang: Language };
};

export async function generateMetadata({ params }: MetadataProps) {
  const { lang } = params;

  return {
    alternates: {
      canonical: `https://www.takeutime.pl/${lang}/feedback`,
      languages: ALTERNATES_LANGUAGES.reduce(
        (result, { hrefLang, language }) => ({
          ...result,
          [`${hrefLang}`]: `https://www.takeutime.pl/${language}/feedback`,
        }),
        {}
      ),
    },
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
