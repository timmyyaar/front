import { ReactNode } from "react";
import { ALTERNATES_LANGUAGES } from "@/app/constants";
import { Language } from "@/types";

type MetadataProps = {
  params: { lang: Language };
};

const titleByLanguage = {
  pl: "Sprzątanie w abonamencie Kraków, subskrypcja | Firma sprzątająca TYT",
  ru: "Абонемент и подписка на уборку в Кракове | Клининг TYT",
  en: "Cleaning subscription in Cracow | TYT Cleaning company",
  ua: "Абонемент та підписка на прибирання у Кракові | Послуги прибирання TYT",
};

const descriptionByLanguage = {
  pl: "Sprzątanie w abonamencie Kraków: Kompleksowe usługi sprzątania. Nasza profesjonalna firma sprzątająca zadba o Twoją przestrzeń, abyś mógł cieszyć się czystością.",
  ru: "Абонентская уборка Краков: комплексные услуги по уборке. Наша профессиональная клининговая компания позаботится о вашем помещении, чтобы вы могли наслаждаться чистотой.",
  en: "Cleaning subscription in Krakow: Comprehensive cleaning services. Professional cleaning company will take care of your space so you can enjoy cleanliness.",
  ua: "Абонемент та підписка на прибирання у Кракові: Комплексні та регулярні послуги прибирання. Наша професійна компанія з прибиранням попіклується про ваш простір.",
};

export async function generateMetadata({ params }: MetadataProps) {
  const { lang } = params;

  return {
    title: titleByLanguage[lang],
    description: descriptionByLanguage[lang],
    alternates: {
      canonical: `https://www.takeutime.pl/${lang}/subscription`,
      languages: ALTERNATES_LANGUAGES.reduce(
        (result, { hrefLang, language }) => ({
          ...result,
          [`${hrefLang}`]: `https://www.takeutime.pl/${language}/subscription`,
        }),
        {}
      ),
    },
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
