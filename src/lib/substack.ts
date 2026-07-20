import Parser from "rss-parser";
import { siteConfig } from "./site-config";

export type SubstackPost = {
  title: string;
  link: string;
  isoDate: string;
  contentSnippet: string;
};

const parser = new Parser();

export async function getSubstackPosts(limit = 6): Promise<SubstackPost[]> {
  try {
    const feed = await parser.parseURL(siteConfig.substackFeedUrl);
    return (feed.items ?? [])
      .filter((item) => item.title && item.link)
      .slice(0, limit)
      .map((item) => ({
        title: item.title!,
        link: item.link!,
        isoDate: item.isoDate ?? "",
        contentSnippet: (item.contentSnippet ?? "").slice(0, 220).trim(),
      }));
  } catch {
    return [];
  }
}
