// Manually curated posts to show while the Substack RSS feed isn't
// returning items. Remove this once src/lib/substack.ts is pulling posts
// correctly again.
export interface FeaturedPost {
  title: string;
  url: string;
}

export const featuredPosts: FeaturedPost[] = [
  {
    title: "FERET: The Digital Artifact and the Accumulation of Capture",
    url: "https://timgrant212.substack.com/p/feret-the-digital-artifact-and-the",
  },
];
