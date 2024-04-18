import { ReactNode } from "react";

export async function generateMetadata() {
  return {
    title: "Sprzątanie mieszkań, Kraków - oferty pracy | Firma sprzątająca",
    description:
      "Szukasz pracy w branży sprzątania mieszkań w Krakowie? Dołącz do naszej profesjonalnej firmy sprzątającej TYT. Sprawdź oferty pracy i pracuj już dziś!",
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
