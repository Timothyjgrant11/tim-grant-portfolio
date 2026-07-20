import Script from "next/script";
import { siteConfig } from "@/lib/site-config";

interface SubstackEmbedProps {
  url: string;
  title: string;
  author?: string;
}

export function SubstackEmbed({
  url,
  title,
  author = siteConfig.name,
}: SubstackEmbedProps) {
  return (
    <div className="overflow-hidden rounded-lg border hairline bg-paper-raised">
      <div className="substack-post-embed">
        <p lang="en">
          {title} by {author}
        </p>
        <a data-post-link href={url}>
          Read on Substack
        </a>
      </div>
      <Script
        async
        src="https://substack.com/embedjs/embed.js"
        strategy="lazyOnload"
      />
    </div>
  );
}
