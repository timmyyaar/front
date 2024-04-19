import { ReactNode } from "react";

type MetadataProps = {
  params: { lang: string };
};

export async function generateMetadata({ params }: MetadataProps) {
  const { lang } = params;

  return {
    title: "Sprzątanie mieszkań, Kraków - oferty pracy | Firma sprzątająca",
    description:
      "Szukasz pracy w branży sprzątania mieszkań w Krakowie? Dołącz do naszej profesjonalnej firmy sprzątającej TYT. Sprawdź oferty pracy i pracuj już dziś!",
    alternates: {
      canonical: `https://www.takeutime.pl/${lang}/career`,
      languages: {
        [`${lang}`]: `https://www.takeutime.pl/${lang}/career`,
      },
    },
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
