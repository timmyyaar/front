import type { Metadata } from "next";
import { Rubik } from "next/font/google";

import "./globals.css";
import Script from "next/script";

const inter = Rubik({
  subsets: ["latin", "cyrillic", "latin-ext"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Take Your Time",
  description:
    "Take Your Time provides high-quality professional cleaning services. Our team takes care of your space so you can enjoy cleanliness and comfort. Order our services now and leave the cleaning to us!",
  keywords:
    "professional cleaning, housekeeping, office cleaning, commercial cleaning, eco-friendly cleaning",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta
          name="p:domain_verify"
          content="a212016f6fcbc5b5b2e70698845b2e51"
        />
        <meta
          name="google-site-verification"
          content="av2s6aQA-JHPfX_BH2FLGLMDMD-ty5fsLmX4evD3R-E"
        />
      </head>
      <body className={`${inter.className} custom-scroll`}>{children}</body>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', { send_page_view: false });
          `}
      </Script>
    </html>
  );
}
