import { ReactNode } from "react";

type MetadataProps = {
  params: { lang: string };
};

export async function generateMetadata({ params }: MetadataProps) {
  const { lang } = params;

  return {
    title: "Sprzątanie w prezencie, voucher na sprzątanie Kraków | TYT",
    description:
      "Kup voucher na sprzątanie domu lub mieszkania. Podaruj sprzątanie w prezencie! Zaskocz swoją ukochaną lub bliską osobę praktycznym upominkiem.",
    alternates: {
      canonical: `https://www.takeutime.pl/${lang}/gift`,
      languages: {
        [`${lang}`]: `https://www.takeutime.pl/${lang}/gift`,
      },
    },
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
