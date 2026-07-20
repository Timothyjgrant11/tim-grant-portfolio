interface P5EmbedProps {
  title: string;
  embedUrl: string;
}

export function P5Embed({ title, embedUrl }: P5EmbedProps) {
  return (
    <div className="overflow-hidden rounded-lg border hairline bg-paper-raised">
      <iframe
        src={embedUrl}
        title={title}
        loading="lazy"
        className="h-[400px] w-full border-0"
      />
    </div>
  );
}
