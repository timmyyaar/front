import { getServerSideSitemap } from "next-sitemap";

const locales: string[] = ["en", "pl", "ru", "ua"];

export async function GET() {
  const sitemapsLocales: any = locales.map(
    (locale: string) => `${process.env.SITE_URL}${locale}`
  );
  const sitemaps = sitemapsLocales
    .reduce(
      (result: { loc: string }[], item: string) => [
        ...result,
        ...[
          { loc: item },
          { loc: `${item}/order` },
          { loc: `${item}/order/general` },
          { loc: `${item}/order/healthcare` },
          { loc: `${item}/order/special` },
          { loc: `${item}/subscription` },
          { loc: `${item}/career` },
          { loc: `${item}/gift` },
        ],
      ],
      []
    )
    .map((item: { loc: string }) => ({
      ...item,
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }));

  return getServerSideSitemap(sitemaps);
}
