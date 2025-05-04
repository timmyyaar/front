import { ReactNode } from "react";
import { ALTERNATES_LANGUAGES } from "@/app/constants";
import { Language } from "@/types";

type MetadataProps = {
  params: Promise<{ lang: Language }>;
};

const titleByLanguage = {
  pl: "Zamów sprzątanie mieszkań online, Kraków | Firma sprzątająca",
  ru: "Заказать клининг онлайн в Кракове | Клининг TYT",
  en: "Order apartment cleaning online, Cracow | Cleaning company",
  ua: "Замовити прибирання квартир онлайн, Краків | Клінінгова компанія TYT",
};

const descriptionByLanguage = {
  pl: "Zamów sprzątanie mieszkań online w Krakowie. Usługa sprzątania mieszkań obejmuje zarówno sprzątanie generalne, jak i planowe.  Ciesz się czystym domem",
  ru: "Закажите уборку квартиры онлайн в Кракове. Уборка квартир включает в себя как генеральную, так и плановую уборку.  Наслаждайтесь чистым домом!",
  en: "Order house cleaning services online in Krakow. Our apartment cleaning service includes both general and scheduled cleaning. Enjoy a clean home.",
  ua: "Якісне прибирання квартир у Кракові. Послуга прибирання включає як загальне, так і планове прибирання. Насолоджуйтеся чистим простором.",
};

export async function generateMetadata({ params }: MetadataProps) {
  const { lang } = await params;

  return {
    title: titleByLanguage[lang],
    description: descriptionByLanguage[lang],
    alternates: {
      canonical: `https://www.takeutime.pl/${lang}/order`,
      languages: ALTERNATES_LANGUAGES.reduce(
        (result, { hrefLang, language }) => ({
          ...result,
          [`${hrefLang}`]: `https://www.takeutime.pl/${language}/order`,
        }),
        {}
      ),
    },
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
