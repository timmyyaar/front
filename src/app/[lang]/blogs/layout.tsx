import { ReactNode } from "react";
import { Language } from "@/types";

type MetadataProps = {
  params: Promise<{ lang: Language; blogId: string }>;
};

const titleByLanguage = {
  pl: "Blog o sprzątaniu - jak sprzątać mieszkanie i porady domowe",
  ru: "Блог о чистоте и порядке: уборка дома  | Клининговая компания TYT",
  en: "Cleaning blog: Cleaning advices and household tips",
  ua: "Прибирання квартир та домашні поради | Блог про прибирання",
};

const descriptionByLanguage = {
  pl: "Zapraszamy na blog o sprzątaniu. Znajdziesz tutaj przydatne porady domowe oraz dotyczące sprzątania mieszkania, które ułatwią utrzymanie czystości.",
  ru: "Добро пожаловать в блог об уборке. Здесь вы найдете полезные советы по ведению домашнего хозяйства и уборке, которые облегчат вам жизнь.",
  en: "Welcome to the cleaning blog. Here you'll find useful household tips and advice on apartment cleaning to make cleanliness maintenance easier.",
  ua: "Корисні домашні поради і поради з прибирання квартири, які сприятимуть підтримці чистоти.",
};

export async function generateMetadata({ params }: MetadataProps) {
  const { lang } = await params;

  return {
    title: titleByLanguage[lang],
    description: descriptionByLanguage[lang],
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
