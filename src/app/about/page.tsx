import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `About — ${siteConfig.name}`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-24">
      <p className="case-label">About</p>
      <h1 className="mt-4 font-serif text-4xl tracking-tight text-ink">
        Tim Grant
      </h1>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
        <p>
          I&apos;m an investigative researcher and data analyst focused on
          tracing how people, organizations, and money connect. My work
          combines public records research, dataset analysis, and network
          mapping to make those connections legible.
        </p>
        <p>
          Full write-ups are published on{" "}
          <a
            href={siteConfig.substackProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-4"
          >
            Substack
          </a>
          . This site collects that writing alongside interactive
          visualizations of the underlying research.
        </p>
      </div>
    </div>
  );
}
