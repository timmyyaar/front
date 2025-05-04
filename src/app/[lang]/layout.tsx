import { ReactNode } from "react";
import { ALTERNATES_LANGUAGES } from "@/app/constants";
import { Language } from "@/types";

type MetadataProps = {
  params: Promise<{ lang: Language }>;
};

const titleByLanguage = {
  pl: "Sprzątanie mieszkań Polska | Firma sprzątająca TYT",
  ru: "Уборка квартир Польша | Клининг TYT",
  en: "Cleaning services Poland | TYT Cleaning company",
  ua: "Прибирання квартир, клінінг у Польщі | Клінінгова компанія TYT",
};

const descriptionByLanguage = {
  pl: "Skuteczne i kompleksowe sprzątanie mieszkań Polska. Profesjionalna firma sprzątająca z całym niezbędnym sprzętem,  przyjeżdżamy i zaczynamy sprzątanie.",
  ru: "Эффективная и комплексная уборка квартир в Польше. Профессиональная клининговая компания со всем необходимым оборудованием, мы приезжаем и начинаем уборку.",
  en: "Effective and comprehensive apartment cleaning services in Poland. Professional cleaning company with all the necessary equipment, we arrive and start cleaning.",
  ua: "Якісне та комплексне прибирання квартир у Польщі  Надаємо всі види клінінгових послуг, аби ваша оселя була чистою.",
};

export async function generateMetadata({ params }: MetadataProps) {
  const { lang } = await params;

  return {
    title: titleByLanguage[lang],
    description: descriptionByLanguage[lang],
    alternates: {
      canonical: `https://www.takeutime.pl/${lang}`,
      languages: ALTERNATES_LANGUAGES.reduce(
        (result, { hrefLang, language }) => ({
          ...result,
          [`${hrefLang}`]: `https://www.takeutime.pl/${language}`,
        }),
        {},
      ),
    },
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
