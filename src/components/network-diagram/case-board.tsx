"use client";

import { useRef, useState } from "react";
import type { NetworkEdge, NetworkNode } from "@/lib/network-types";
import { NetworkDiagram } from "./network-diagram";
import { DetailPanel } from "./detail-panel";
import { Legend } from "./legend";

interface CaseBoardProps {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  height?: number;
  width?: number;
}

export function CaseBoard({ nodes, edges, height = 560, width }: CaseBoardProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const zoomControlsRef = useRef<{
    zoomIn: () => void;
    zoomOut: () => void;
    reset: () => void;
  } | null>(null);

  const selectedNode = nodes.find((n) => n.id === selectedId) ?? null;

  return (
    <div>
      <div className="rounded-lg border hairline bg-paper-raised">
        <div className="relative">
          <NetworkDiagram
            nodes={nodes}
            edges={edges}
            height={height}
            width={width}
            selectedId={selectedId}
            onSelect={setSelectedId}
            zoomControlsRef={zoomControlsRef}
          />
          <div className="absolute right-3 top-3 flex flex-col gap-1">
            <button
              onClick={() => zoomControlsRef.current?.zoomIn()}
              aria-label="Zoom in"
              className="flex h-7 w-7 items-center justify-center rounded border hairline bg-paper text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              +
            </button>
            <button
              onClick={() => zoomControlsRef.current?.zoomOut()}
              aria-label="Zoom out"
              className="flex h-7 w-7 items-center justify-center rounded border hairline bg-paper text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              −
            </button>
            <button
              onClick={() => zoomControlsRef.current?.reset()}
              aria-label="Reset view"
              className="flex h-7 w-7 items-center justify-center rounded border hairline bg-paper text-[10px] text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              ⟲
            </button>
          </div>
        </div>
        <div className="border-t hairline px-4 py-3">
          <Legend />
        </div>
      </div>

      <div className="mt-6">
        <DetailPanel
          node={selectedNode}
          nodes={nodes}
          edges={edges}
          onSelect={setSelectedId}
          onClear={() => setSelectedId(null)}
        />
      </div>
    </div>
  );
}
