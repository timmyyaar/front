import { ReactNode } from "react";
import { ALTERNATES_LANGUAGES } from "@/app/constants";
import { Language } from "@/types";

type MetadataProps = {
  params: Promise<{ lang: Language }>;
};

const titleByLanguage = {
  pl: "Sprzątanie w prezencie, voucher na sprzątanie Kraków | TYT",
  ru: "Уборка в подарок и ваучер на уборку, Краков | Клининг TYT",
  en: "House cleaning gift vouchers, Cracow | TYT",
  ua: "Купити подарунковий сертифікат на прибирання у Кракові",
};

const descriptionByLanguage = {
  pl: "Kup voucher na sprzątanie domu lub mieszkania. Podaruj sprzątanie w prezencie! Zaskocz swoją ukochaną lub bliską osobę praktycznym upominkiem.",
  ru: "Купите ваучер на уборку вашего дома или квартиры. Подарите уборку в подарок! Удивите своего любимого или близкого человека практичным подарком.",
  en: "Purchase a voucher for house or apartment cleaning. Give the gift of cleaning! Surprise your loved one or close friend with a practical gift.",
  ua: "Ваучери та сертифікати на прибирання дому або квартири. Подаруйте прибирання в подарунок! Здивуйте своїх близьких практичним подарунком.",
};

export async function generateMetadata({ params }: MetadataProps) {
  const { lang } = await params;

  return {
    title: titleByLanguage[lang],
    description: descriptionByLanguage[lang],
    alternates: {
      canonical: `https://www.takeutime.pl/${lang}/gift`,
      languages: ALTERNATES_LANGUAGES.reduce(
        (result, { hrefLang, language }) => ({
          ...result,
          [`${hrefLang}`]: `https://www.takeutime.pl/${language}/gift`,
        }),
        {}
      ),
    },
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
