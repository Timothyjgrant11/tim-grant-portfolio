import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { encryptionRitual } from "@/data/art";

export const metadata: Metadata = {
  title: `${encryptionRitual.title} — ${siteConfig.name}`,
};

export default function EncryptionRitualPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-24">
      <Link
        href="/art"
        className="case-label text-ink-soft transition-colors hover:text-accent"
      >
        ← Art
      </Link>

      <p className="case-label mt-6">Live performance</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink">
        {encryptionRitual.title}
      </h1>
      <p className="mt-4 text-lg text-ink-soft">{encryptionRitual.dek}</p>

      <div className="mt-10 overflow-hidden rounded-lg border hairline">
        <div className="relative aspect-[16/9]">
          <Image
            src={encryptionRitual.images[0]}
            alt="Two performers reading from prepared scripts into microphones, headphones on, with a third collaborator running the live encryption program on a laptop between them"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-10 space-y-6 text-ink-soft">
        <p>
          Two performers read a prepared script to each other — text built
          from a private conversation between a parent and a child making
          plans to end a pregnancy. Conversations like this one have been
          extracted from messaging platforms and handed to law enforcement,
          becoming evidence in criminal prosecutions. This piece doesn&apos;t
          reproduce any real conversation. It responds to the pattern: a
          private exchange, never meant to be read by anyone else, made
          legible to the state because the channel it traveled through
          wasn&apos;t built to keep it private.
        </p>

        <p>
          Each performer&apos;s voice ran live through an encryption program
          built with my collaborator{" "}
          <strong className="text-ink">{encryptionRitual.collaborator}</strong>,
          scrambling what the audience heard. The performers themselves heard
          each other clearly, through headphones, on a channel that stayed
          open between them — so the reading could shift, depart from the
          page, adapt in the moment, in ways only the two of them would ever
          know. Afterward, each performer destroyed their physical script as
          thoroughly as they could.
        </p>

        <p>
          Underneath the whole performance ran a musical cipher — a short
          sequence of notes spelling out a word tied to the ritual. It was
          never published as a key, though a musically literate ear might
          still recognize it. Even if the script had somehow survived, or the
          encryption had somehow been broken, the cipher was one more layer
          of a message built to resist being fully recovered by anyone but
          its intended listener.
        </p>

        <p>
          The point isn&apos;t to guess at the words. The words were never
          the point — they never should have existed in public record to
          begin with. The point is the principle: that a private conversation
          is allowed to stay private, and that privacy, especially around the
          most consequential decisions a person makes about their own body,
          is a fundamental right, not a byproduct of which app you happened
          to use.
        </p>
      </div>
    </div>
  );
}
