import type { NetworkEdge, NetworkNode } from "@/lib/network-types";

const TYPE_LABEL: Record<NetworkNode["type"], string> = {
  person: "Person",
  organization: "Organization",
  account: "Account / Entity",
  place: "Place",
  event: "Event",
};

interface DetailPanelProps {
  node: NetworkNode | null;
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  onSelect: (id: string) => void;
  onClear: () => void;
}

export function DetailPanel({
  node,
  nodes,
  edges,
  onSelect,
  onClear,
}: DetailPanelProps) {
  if (!node) {
    return (
      <div className="rounded-lg border hairline bg-paper-raised p-6 text-sm text-ink-soft">
        Click a node to inspect it. Drag nodes to rearrange the board; double-click
        to release a pinned node back into the layout.
      </div>
    );
  }

  const connections = edges
    .filter((e) => e.source === node.id || e.target === node.id)
    .map((e) => {
      const otherId = e.source === node.id ? e.target : e.source;
      const other = nodes.find((n) => n.id === otherId);
      return { edge: e, other };
    })
    .filter((c): c is { edge: NetworkEdge; other: NetworkNode } => !!c.other);

  return (
    <div className="rounded-lg border hairline bg-paper-raised p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="case-label">{TYPE_LABEL[node.type]}</p>
          <h3 className="mt-1 font-serif text-xl text-ink">{node.label}</h3>
          {node.subtitle && (
            <p className="mt-1 text-sm text-ink-soft">{node.subtitle}</p>
          )}
        </div>
        <button
          onClick={onClear}
          className="case-label shrink-0 text-ink-faint transition-colors hover:text-accent"
        >
          Clear ✕
        </button>
      </div>

      {node.notes && (
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          {node.notes}
        </p>
      )}

      {node.sourceUrl && (
        <a
          href={node.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm text-accent underline underline-offset-4"
        >
          Source ↗
        </a>
      )}

      {connections.length > 0 && (
        <div className="mt-6 border-t hairline pt-4">
          <p className="case-label">Connections</p>
          <ul className="mt-3 space-y-2">
            {connections.map(({ edge, other }) => (
              <li key={other.id + edge.label}>
                <button
                  onClick={() => onSelect(other.id)}
                  className="text-left text-sm text-ink transition-colors hover:text-accent"
                >
                  <span className="font-medium">{other.label}</span>
                  {edge.label && (
                    <span className="text-ink-faint"> — {edge.label}</span>
                  )}
                  {edge.confidence === "alleged" && (
                    <span className="case-label ml-2 text-accent-soft">
                      alleged
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
