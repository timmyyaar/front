import type { Metadata } from "next";
import { Rubik } from "next/font/google";

import "./globals.css";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { ILocales } from "@/locales";

const inter = Rubik({
  subsets: ["latin", "cyrillic", "latin-ext"],
  weight: "400",
});

async function getServerSideProps(): Promise<ILocales[]> {
  const response = await fetch(process.env.API_URL + "/api/locales", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data = await response.json();

  return data.locales;
}

export const metadata: Metadata = {
  title: "Take Your Time",
  description:
    "Take Your Time provides high-quality professional cleaning services. Our team takes care of your space so you can enjoy cleanliness and comfort. Order our services now and leave the cleaning to us!",
  keywords:
    "professional cleaning, housekeeping, office cleaning, commercial cleaning, eco-friendly cleaning",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locales = await getServerSideProps();

  return (
    <Providers locales={locales}>
      <html lang="en">
        <head>
          <meta
            name="p:domain_verify"
            content="a212016f6fcbc5b5b2e70698845b2e51"
          />
        </head>
        <body className={`${inter.className} custom-scroll`}>
          <Header />
          {children}
        </body>
      </html>
    </Providers>
  );
}
