import { ReactNode } from "react";
import { ALTERNATES_LANGUAGES } from "@/app/constants";
import { Language } from "@/types";

type MetadataProps = {
  params: { lang: Language };
};

const titleByLanguage = {
  pl: "Sprzątanie mieszkań, Kraków - oferty pracy | Firma sprzątająca",
  ru: "Работа - уборка квартир, Краков | Клининговая компания TYT",
  en: "Cleaning jobs, Cracow - become a cleaner | Cleaning company",
  ua: "Прибирання квартир, вакансії Краків | Клінінгова компаія TYT",
};

const descriptionByLanguage = {
  pl: "Szukasz pracy w branży sprzątania mieszkań w Krakowie? Dołącz do naszej profesjonalnej firmy sprzątającej TYT. Sprawdź oferty pracy i pracuj już dziś!",
  ru: "Вы ищете работу в сфере уборки жилых помещений в Кракове? Присоединяйтесь к нашей профессиональной клининговой компании TYT. Ознакомьтесь с предложениями о работе и работайте уже сегодня!",
  en: "Looking for cleaning jobs in Krakow? Join our professional cleaning services company TYT. Check out job offers and start working today!",
  ua: "Прибирання квартир, вакансії Краків. Приєднуйтесь до нашої професійної компанії з прибирання TYT. Перевірте вакансії і почніть працювати вже сьогодні!",
};

export async function generateMetadata({ params }: MetadataProps) {
  const { lang } = params;

  return {
    title: titleByLanguage[lang],
    description: descriptionByLanguage[lang],
    alternates: {
      canonical: `https://www.takeutime.pl/${lang}/career`,
      languages: ALTERNATES_LANGUAGES.reduce(
        (result, { hrefLang, language }) => ({
          ...result,
          [`${hrefLang}`]: `https://www.takeutime.pl/${language}/career`,
        }),
        {}
      ),
    },
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
