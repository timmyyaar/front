import { ReactNode } from "react";
import { MAIN_CATEGORIES_URLS } from "@/constants";
import { ALTERNATES_LANGUAGES } from "@/app/constants";
import { Language } from "@/types";

type MetadataProps = {
  params: { lang: Language; type: string };
};

const generalTitleByLanguage = {
  pl: "Generalne sprzątanie i sprzątanie kompleksowe w Krakowie | Firma sprzątająca TYT",
  ru: "Генеральная уборка: уборка после ремонта и уборка офисов  | Клининг TYT",
  en: "Deep and general cleaning services, Cracow | TYT Cleaning company",
  ua: "Генеральне та комплексне прибирання у Кракові | Клінінгова компанія TYT",
};

const healthcareTitleByLanguage = {
  pl: "Higieniczne sprzątanie: pranie chemiczne, sprzątanie mieszkania podczas choroby Kraków",
  ru: "Химчистка квартир Краков: химчистка ковров, мебели, диванов | Клининг TYT",
  en: "Hygienic & healthcare cleaning services, Cracow: dry cleaning",
  ua: "Виїздна хімчистка мяких меблів та килимів: замовте онлайн у Кракові!",
};

const specialTitleByLanguage = {
  pl: "Sprzątanie specjalistyczne i spersonalizowane: w ostatniej chwili, przeprowadzka",
  ru: "Специализированная уборка: уборка кухни, уборка при переезде | Клининг TYT",
  en: "Specialized and personalized cleaning: last-minute, move-in & move-out",
  ua: "Персоналізоване прибирання та догляд за чистотою, Краків | Фахівці з прибирання",
};

const getTitleByType = (type: string, lang: Language) => {
  switch (type) {
    case MAIN_CATEGORIES_URLS.GENERAL:
      return generalTitleByLanguage[lang];
    case MAIN_CATEGORIES_URLS.HEALTHCARE:
      return healthcareTitleByLanguage[lang];
    case MAIN_CATEGORIES_URLS.SPECIAL:
      return specialTitleByLanguage[lang];
    default:
      return "";
  }
};

const generalDescriptionByLanguage = {
  pl: "Zamów profesjonalną sprzątanie kompleksowe online w Krakowie! Nasza oferta obejmuje generalne sprzątanie, które obejmuje dokładne oczyszczenie każdego zakamarka Twojego mieszkania.",
  ru: "Закажите профессиональную комплексную уборку онлайн в Кракове! В наше предложение входит генеральная уборка, которая включает в себя тщательную очистку каждого уголка вашей квартиры.",
  en: "Order professional cleaning online in Krakow! Our offer includes deep and general cleaning - cleansing of every corner of your home.",
  ua: "Замовте професійне комплексне прибирання онлайн у Кракові! Генеральне прибирання забезпечить ретельну чистоту кожного кутка вашої квартири.",
};

const healthcareDescriptionByLanguage = {
  pl: "Zamów pranie chemiczne albo higieniczne sprzątanie online w Krakowie! Nasza usługa chemczyszczenia obejmuje głębokie czyszczenie dywanów, wykładzin, mebli tapicerowanych i więcej. ",
  ru: "Закажите химчистку или гигиеническую уборку онлайн в Кракове! Наша химчистка включает в себя глубокую чистку ковров, ковровых покрытий, мягкой мебели и многого другого.",
  en: "Order dry cleaning or hygienic cleaning online in Krakow! Our dry cleaning service includes deep cleaning of carpets, rugs, upholstered furniture, and more.",
  ua: "Замовте хімчистку м'яких меблів та килимів онлайн у Кракові. Послуги хімчистки включають глибоке очищення килимів, м'яких меблів та багато іншого.",
};

const specialDescriptionByLanguage = {
  pl: "Nasza firma sprzątająca to ekspert w usuwaniu trudnych zabrudzeń i utrzymaniu czystości. Skorzystaj z usług sprzątania specjalistycznego w Krakowie.",
  ru: "Клининговая компания TYT - эксперт в удалении сложных загрязнений и поддержании чистоты. Воспользуйтесь нашими специализированными услугами по уборке в Кракове.",
  en: "Our cleaning company specializes in removing tough stains and maintaining cleanliness. Take advantage of specialized cleaning services in Cracow.",
  ua: "Прибирання при переїзді, Airbnb, прибирання на сьогодні та персоналізвані запити. Професійні клінінгові послуги у Кракові.",
};

const getDescriptionByType = (type: string, lang: Language) => {
  switch (type) {
    case MAIN_CATEGORIES_URLS.GENERAL:
      return generalDescriptionByLanguage[lang];
    case MAIN_CATEGORIES_URLS.HEALTHCARE:
      return healthcareDescriptionByLanguage[lang];
    case MAIN_CATEGORIES_URLS.SPECIAL:
      return specialDescriptionByLanguage[lang];
    default:
      return "";
  }
};

export async function generateMetadata({ params }: MetadataProps) {
  const { lang, type } = params;

  return {
    title: getTitleByType(type, lang),
    description: getDescriptionByType(type, lang),
    alternates: {
      canonical: `https://www.takeutime.pl/${lang}/order/${type}`,
      languages: ALTERNATES_LANGUAGES.reduce(
        (result, { hrefLang, language }) => ({
          ...result,
          [`${hrefLang}`]: `https://www.takeutime.pl/${language}/order/${type}`,
        }),
        {}
      ),
    },
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
