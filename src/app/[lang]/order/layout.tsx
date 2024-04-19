import { ReactNode } from "react";

type MetadataProps = {
  params: { lang: string };
};

export async function generateMetadata({ params }: MetadataProps) {
  const { lang } = params;

  return {
    title: "Zamów sprzątanie mieszkań online, Kraków | Firma sprzątająca",
    description:
      "Zamów sprzątanie mieszkań online w Krakowie. Usługa sprzątania mieszkań obejmuje zarówno sprzątanie generalne, jak i planowe.  Ciesz się czystym domem",
    alternates: {
      canonical: `https://www.takeutime.pl/${lang}/order`,
      languages: {
        [`${lang}`]: `https://www.takeutime.pl/${lang}/order`,
      },
    },
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
