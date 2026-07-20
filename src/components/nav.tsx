import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Nav() {
  return (
    <header className="border-b hairline">
      <div className="mx-auto flex max-w-4xl flex-wrap items-baseline justify-between gap-x-8 gap-y-3 px-6 py-6 sm:px-8">
        <Link href="/" className="group flex flex-col">
          <span className="font-serif text-xl tracking-tight text-ink">
            {siteConfig.name}
          </span>
          <span className="case-label mt-0.5">
            Investigative Research &amp; Data Analysis
          </span>
        </Link>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {siteConfig.nav
            .filter((item) => item.href !== "/")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="case-label text-ink-soft transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          <a
            href={siteConfig.substackProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="case-label rounded-full border hairline px-3 py-1 text-ink-soft transition-colors hover:border-accent hover:text-accent"
          >
            Subscribe ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
