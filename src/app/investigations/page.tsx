import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { investigations } from "@/data/investigations";

export const metadata: Metadata = {
  title: `Investigations — ${siteConfig.name}`,
};

const STATUS_LABEL: Record<(typeof investigations)[number]["status"], string> = {
  sample: "Demo",
  "in-progress": "In progress",
  published: "Published",
};

export default function InvestigationsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8 sm:py-24">
      <p className="case-label">Relationship mapping</p>
      <h1 className="mt-4 font-serif text-4xl tracking-tight text-ink">
        Investigations
      </h1>
      <p className="mt-4 max-w-xl text-ink-soft">
        Interactive network diagrams mapping relationships between people,
        organizations, and money — in the tradition of Mark Lombardi&apos;s
        hand-drawn maps of power and influence. Drag nodes to rearrange the
        board, click a node to inspect it, scroll to zoom.
      </p>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2">
        {investigations.map((investigation) => (
          <li key={investigation.slug}>
            <Link
              href={`/investigations/${investigation.slug}`}
              className="group block h-full rounded-lg border hairline p-6 transition-colors hover:border-accent"
            >
              <p className="case-label text-accent">
                {STATUS_LABEL[investigation.status]}
              </p>
              <h2 className="mt-2 font-serif text-xl text-ink group-hover:text-accent">
                {investigation.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {investigation.dek}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
