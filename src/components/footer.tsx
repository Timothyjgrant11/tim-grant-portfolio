import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t hairline">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-ink-faint sm:px-8">
        <span>
          © {new Date().getFullYear()} {siteConfig.name}
        </span>
        <a
          href={siteConfig.substackProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-accent"
        >
          Subscribe on Substack ↗
        </a>
      </div>
    </footer>
  );
}
