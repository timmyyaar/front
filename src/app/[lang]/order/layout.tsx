import { ReactNode } from "react";

export async function generateMetadata() {
  return {
    title: "Zamów sprzątanie mieszkań online, Kraków | Firma sprzątająca",
    description:
      "Zamów sprzątanie mieszkań online w Krakowie. Usługa sprzątania mieszkań obejmuje zarówno sprzątanie generalne, jak i planowe.  Ciesz się czystym domem",
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
