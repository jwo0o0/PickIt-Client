/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: "http://sns.jwoo.site",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*", // 모든 agent 허용
        allow: "/", // 모든 페이지 주소 크롤링 허용
        disallow: ["/login", "/signup", "/chat"],
      },
    ],
  },
};
