import { ReactNode } from "react";

type MetadataProps = {
  params: { lang: string };
};

export async function generateMetadata({ params }: MetadataProps) {
  const { lang } = params;

  return {
    alternates: {
      canonical: `https://www.takeutime.pl/${lang}/feedback`,
      languages: {
        [`${lang}`]: `https://www.takeutime.pl/${lang}/feedback`,
      },
    },
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
