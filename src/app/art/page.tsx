import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { sketches, encryptionRitual } from "@/data/art";
import { P5Embed } from "@/components/p5-embed";

export const metadata: Metadata = {
  title: `Art — ${siteConfig.name}`,
};

export default function ArtPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8 sm:py-24">
      <p className="case-label">Sound &amp; generative work</p>
      <h1 className="mt-4 font-serif text-4xl tracking-tight text-ink">
        Art
      </h1>
      <p className="mt-4 max-w-xl text-ink-soft">
        Work outside the investigations — sound and performance pieces, and
        generative sketches built in p5.js.
      </p>

      <section className="mt-14">
        <h2 className="font-serif text-2xl text-ink">Sound &amp; Performance</h2>
        <Link
          href="/art/encryption-ritual"
          className="group mt-6 grid gap-6 overflow-hidden rounded-lg border hairline bg-paper-raised transition-colors hover:border-accent sm:grid-cols-2"
        >
          <div className="relative aspect-[16/10] sm:aspect-auto">
            <Image
              src={encryptionRitual.images[0]}
              alt="Performers reading from prepared scripts into microphones during The Encryption Ritual"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-6">
            <p className="case-label text-accent">Live performance</p>
            <h3 className="mt-2 font-serif text-2xl text-ink group-hover:text-accent">
              {encryptionRitual.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              {encryptionRitual.dek}
            </p>
            <span className="case-label mt-4 text-ink-soft group-hover:text-accent">
              Read more →
            </span>
          </div>
        </Link>
      </section>

      <section className="mt-16 border-t hairline pt-10">
        <h2 className="font-serif text-2xl text-ink">Generative Sketches</h2>
        <p className="mt-2 max-w-xl text-sm text-ink-soft">
          Interactive p5.js sketches — live and running below.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {sketches.map((sketch) => (
            <P5Embed
              key={sketch.id}
              title={sketch.title}
              embedUrl={sketch.embedUrl}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
