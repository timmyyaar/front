import { ReactNode } from "react";

type MetadataProps = {
  params: { lang: string };
};

export async function generateMetadata({ params }: MetadataProps) {
  const { lang } = params;

  return {
    alternates: {
      languages: {
        [`${lang}`]: `https://www.takeutime.pl/${lang}`,
      },
    },
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
