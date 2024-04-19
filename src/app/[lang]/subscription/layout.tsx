import { ReactNode } from "react";

type MetadataProps = {
  params: { lang: string };
};

export async function generateMetadata({ params }: MetadataProps) {
  const { lang } = params;

  return {
    title:
      "Sprzątanie w abonamencie Kraków, subskrypcja | Firma sprzątająca TYT",
    description:
      "Sprzątanie w abonamencie Kraków: Kompleksowe usługi sprzątania. Nasza profesjonalna firma sprzątająca zadba o Twoją przestrzeń, abyś mógł cieszyć się czystością.",
    alternates: {
      canonical: `https://www.takeutime.pl/${lang}/subscription`,
      languages: {
        [`${lang}`]: `https://www.takeutime.pl/${lang}/subscription`,
      },
    },
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
