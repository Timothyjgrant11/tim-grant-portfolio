import Link from "next/link";
import { getSubstackPosts } from "@/lib/substack";
import { siteConfig } from "@/lib/site-config";

export default async function Home() {
  const posts = await getSubstackPosts(3);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8 sm:py-24">
      <p className="case-label">Case files &amp; open-source research</p>
      <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
        Investigative research and data analysis, mapped out in the open.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
        I dig through public records, datasets, and paper trails to explain
        how people, money, and institutions connect. Long-form writing lives
        on Substack, the maps live here.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/investigations"
          className="rounded-full bg-ink px-5 py-2.5 text-sm text-paper transition-colors hover:bg-accent"
        >
          View investigations
        </Link>
        <a
          href={siteConfig.substackProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border hairline px-5 py-2.5 text-sm text-ink-soft transition-colors hover:border-accent hover:text-accent"
        >
          Subscribe on Substack ↗
        </a>
      </div>

      <section className="mt-20 border-t hairline pt-10">
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-2xl text-ink">Latest writing</h2>
          <Link
            href="/writing"
            className="case-label text-ink-soft transition-colors hover:text-accent"
          >
            All posts →
          </Link>
        </div>

        {posts.length > 0 ? (
          <ul className="mt-8 grid gap-6 sm:grid-cols-3">
            {posts.map((post) => (
              <li key={post.link}>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-lg border hairline bg-paper-raised p-5 transition-colors hover:border-accent"
                >
                  {post.isoDate && (
                    <p className="case-label">
                      {new Date(post.isoDate).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  )}
                  <h3 className="mt-2 font-serif text-lg leading-snug text-ink group-hover:text-accent">
                    {post.title}
                  </h3>
                  {post.contentSnippet && (
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {post.contentSnippet}…
                    </p>
                  )}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 text-ink-soft">
            New essays are landing soon on{" "}
            <a
              href={siteConfig.substackHomeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-4"
            >
              Substack
            </a>
            .
          </p>
        )}
      </section>

      <section className="mt-20 border-t hairline pt-10">
        <h2 className="font-serif text-2xl text-ink">What this is</h2>
        <div className="mt-6 grid gap-8 sm:grid-cols-3">
          <div>
            <p className="case-label">01 / Investigations</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Interactive, hand-drawn-style network diagrams mapping
              relationships between people, organizations, and money — in the
              tradition of Mark Lombardi.
            </p>
          </div>
          <div>
            <p className="case-label">02 / Writing</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Full write-ups and analysis published on Substack, syndicated
              here as they go live.
            </p>
          </div>
          <div>
            <p className="case-label">03 / Data</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Public records and datasets, cleaned up and made legible.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
