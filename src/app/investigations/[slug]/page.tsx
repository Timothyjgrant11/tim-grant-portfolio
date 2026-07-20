import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { investigations, getInvestigation } from "@/data/investigations";
import { siteConfig } from "@/lib/site-config";
import { CaseBoard } from "@/components/network-diagram/case-board";

export function generateStaticParams() {
  return investigations.map((investigation) => ({
    slug: investigation.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const investigation = getInvestigation(slug);
  return { title: `${investigation?.title ?? "Investigation"} — ${siteConfig.name}` };
}

export default async function InvestigationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const investigation = getInvestigation(slug);
  if (!investigation) notFound();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-24">
      <Link
        href="/investigations"
        className="case-label text-ink-soft transition-colors hover:text-accent"
      >
        ← Investigations
      </Link>

      {investigation.status === "sample" && (
        <p className="case-label mt-6 text-accent">
          Sample data — fictional entities, engine demo only
        </p>
      )}
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink">
        {investigation.title}
      </h1>
      <p className="mt-4 max-w-2xl text-ink-soft">{investigation.summary}</p>

      <div className="mt-10">
        <CaseBoard
          nodes={investigation.nodes}
          edges={investigation.edges}
          height={680}
          width={1100}
        />
      </div>

      {investigation.sources && investigation.sources.length > 0 && (
        <div className="mt-10 border-t hairline pt-6">
          <p className="case-label">Sources</p>
          <ul className="mt-3 space-y-1.5">
            {investigation.sources.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink-soft underline underline-offset-4 transition-colors hover:text-accent"
                >
                  {source.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
