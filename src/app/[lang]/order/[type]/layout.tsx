import { ReactNode } from "react";
import { MAIN_CATEGORIES_URLS } from "@/constants";

type MetadataProps = {
  params: { type: string };
};

const getTitleByType = (type: string) => {
  switch (type) {
    case MAIN_CATEGORIES_URLS.GENERAL:
      return "Generalne sprzątanie i sprzątanie kompleksowe w Krakowie | Firma sprzątająca TYT";
    case MAIN_CATEGORIES_URLS.HEALTHCARE:
      return "Higieniczne sprzątanie: pranie chemiczne, sprzątanie mieszkania podczas choroby Kraków";
    case MAIN_CATEGORIES_URLS.SPECIAL:
      return "Sprzątanie specjalistyczne i spersonalizowane: w ostatniej chwili, przeprowadzka";
    default:
      return "";
  }
};

const getDescriptionByType = (type: string) => {
  switch (type) {
    case MAIN_CATEGORIES_URLS.GENERAL:
      return "Zamów profesjonalną sprzątanie kompleksowe online w Krakowie! Nasza oferta obejmuje generalne sprzątanie, które obejmuje dokładne oczyszczenie każdego zakamarka Twojego mieszkania.";
    case MAIN_CATEGORIES_URLS.HEALTHCARE:
      return "Zamów pranie chemiczne albo higieniczne sprzątanie online w Krakowie! Nasza usługa chemczyszczenia obejmuje głębokie czyszczenie dywanów, wykładzin, mebli tapicerowanych i więcej.";
    case MAIN_CATEGORIES_URLS.SPECIAL:
      return "Nasza firma sprzątająca to ekspert w usuwaniu trudnych zabrudzeń i utrzymaniu czystości. Skorzystaj z usług sprzątania specjalistycznego w Krakowie.";
    default:
      return "";
  }
};

export async function generateMetadata({ params }: MetadataProps) {
  const { lang, type } = params;

  return {
    title: getTitleByType(type),
    description: getDescriptionByType(type),
    alternates: {
      canonical: `https://www.takeutime.pl/${lang}/order/${type}`,
      languages: {
        [`${lang}`]: `https://www.takeutime.pl/${lang}/order/${type}`,
      },
    },
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
