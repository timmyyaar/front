// app/server-sitemap.xml/route.ts
import { getServerSideSitemap } from "next-sitemap";

const locales = ["en", "pl", "ru", "ua"];

export async function GET(request: Request) {
  const sitemapsLocales: any = locales.map(
    (locale) => `${process.env.SITE_URL}${locale}`
  );
  const sitemaps = sitemapsLocales
    .reduce(
      (result: any, item: any) => [
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
      [] as any
    )
    .map((item: any) => ({ ...item, lastmod: new Date().toISOString() }));

  console.log(sitemaps);

  return getServerSideSitemap(sitemaps);
}
