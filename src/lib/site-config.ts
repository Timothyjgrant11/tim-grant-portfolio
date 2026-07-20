export const siteConfig = {
  name: "Tim Grant",
  title: "Tim Grant — Investigative Research & Data Analysis",
  description:
    "Investigative research, data analysis, and network mapping by Tim Grant.",
  substackProfileUrl: "https://timgrant212.substack.com/subscribe",
  substackHomeUrl: "https://timgrant212.substack.com/",
  substackFeedUrl:
    process.env.SUBSTACK_FEED_URL ?? "https://timgrant212.substack.com/feed",
  nav: [
    { href: "/", label: "Home" },
    { href: "/investigations", label: "Investigations" },
    { href: "/writing", label: "Writing" },
    { href: "/about", label: "About" },
  ],
};
