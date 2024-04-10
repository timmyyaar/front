/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
<<<<<<< Updated upstream
=======
  exclude: ["/server-sitemap.xml"],
  robotsTxtOptions: {
    additionalSitemaps: [`${process.env.SITE_URL}server-sitemap.xml`],
  },
  alternateRefs: [
    {
      href: `${process.env.SITE_URL}pl`,
      hreflang: "pl",
    },
    {
      href: `${process.env.SITE_URL}en`,
      hreflang: "en",
    },
    {
      href: `${process.env.SITE_URL}ru`,
      hreflang: "ru",
    },
    {
      href: `${process.env.SITE_URL}ua`,
      hreflang: "ua",
    },
  ],
>>>>>>> Stashed changes
};
