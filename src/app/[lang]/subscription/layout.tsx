import { ReactNode } from "react";

export async function generateMetadata() {
  return {
    title:
      "Sprzątanie w abonamencie Kraków, subskrypcja | Firma sprzątająca TYT",
    description:
      "Sprzątanie w abonamencie Kraków: Kompleksowe usługi sprzątania. Nasza profesjonalna firma sprzątająca zadba o Twoją przestrzeń, abyś mógł cieszyć się czystością.",
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
