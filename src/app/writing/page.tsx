import type { Metadata } from "next";
import { getSubstackPosts } from "@/lib/substack";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Writing — ${siteConfig.name}`,
};

export const revalidate = 3600;

export default async function WritingPage() {
  const posts = await getSubstackPosts(30);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8 sm:py-24">
      <p className="case-label">Dispatches</p>
      <h1 className="mt-4 font-serif text-4xl tracking-tight text-ink">
        Writing
      </h1>
      <p className="mt-4 max-w-xl text-ink-soft">
        Essays and investigations are published on{" "}
        <a
          href={siteConfig.substackProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline underline-offset-4"
        >
          Substack
        </a>{" "}
        first. Recent posts are mirrored below.
      </p>

      {posts.length > 0 ? (
        <ul className="mt-12 divide-y hairline border-t border-b hairline">
          {posts.map((post) => (
            <li key={post.link}>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1 py-6 transition-colors hover:text-accent sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span className="font-serif text-lg text-ink group-hover:text-accent">
                  {post.title}
                </span>
                {post.isoDate && (
                  <span className="case-label shrink-0">
                    {new Date(post.isoDate).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-12 rounded-lg border hairline bg-paper-raised p-8 text-center">
          <p className="text-ink-soft">
            Couldn&apos;t load the feed right now.
          </p>
          <a
            href={siteConfig.substackProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-accent underline underline-offset-4"
          >
            Subscribe on Substack ↗
          </a>
        </div>
      )}
    </div>
  );
}
