import { ReactNode } from "react";

export async function generateMetadata() {
  return {
    title: "Blog o sprzątaniu - jak sprzątać mieszkanie i porady domowe",
    description:
      "Zapraszamy na blog o sprzątaniu. Znajdziesz tutaj przydatne porady domowe oraz dotyczące sprzątania mieszkania, które ułatwią utrzymanie czystości.",
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
