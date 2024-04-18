import { ReactNode } from "react";

type MetadataProps = {
  params: { lang: string };
};

export async function generateMetadata({ params }: MetadataProps) {
  const { lang } = params;

  return {
    title: "Sprzątanie mieszkań Kraków | Firma sprzątająca TYT",
    description:
      "Skuteczne i kompleksowe sprzątanie mieszkań Kraków. Profesjionalna firma sprzątająca z całym niezbędnym sprzętem,  przyjeżdżamy i zaczynamy sprzątanie.",
    alternates: {
      canonical: `https://www.takeutime.pl/${lang}`,
      languages: {
        [`${lang}`]: `https://www.takeutime.pl/${lang}`,
      },
    },
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
