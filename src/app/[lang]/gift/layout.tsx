import { ReactNode } from "react";

export async function generateMetadata() {
  return {
    title: "Sprzątanie w prezencie, voucher na sprzątanie Kraków | TYT",
    description:
      "Kup voucher na sprzątanie domu lub mieszkania. Podaruj sprzątanie w prezencie! Zaskocz swoją ukochaną lub bliską osobę praktycznym upominkiem.",
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
