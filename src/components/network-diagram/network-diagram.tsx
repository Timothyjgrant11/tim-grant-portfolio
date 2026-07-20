"use client";

import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import type { NetworkEdge, NetworkNode, SimEdge } from "@/lib/network-types";

const DEFAULT_WIDTH = 900;

function shapeRadius(type: NetworkNode["type"]) {
  switch (type) {
    case "organization":
      return 9;
    case "account":
      return 8;
    case "place":
      return 8;
    default:
      return 7;
  }
}

function appendShape(
  selection: d3.Selection<SVGGElement, NetworkNode, SVGGElement, unknown>,
) {
  selection.each(function (d) {
    const g = d3.select(this);
    const r = shapeRadius(d.type);
    switch (d.type) {
      case "organization":
        g.append("rect")
          .attr("class", "node-shape")
          .attr("x", -r)
          .attr("y", -r)
          .attr("width", r * 2)
          .attr("height", r * 2)
          .attr("transform", "rotate(45)");
        break;
      case "account":
        g.append("rect")
          .attr("class", "node-shape")
          .attr("x", -r)
          .attr("y", -r)
          .attr("width", r * 2)
          .attr("height", r * 2);
        break;
      case "place": {
        const h = r * 1.6;
        g.append("path")
          .attr("class", "node-shape")
          .attr("d", `M 0 ${-h} L ${h} ${h * 0.7} L ${-h} ${h * 0.7} Z`);
        break;
      }
      case "event":
        g.append("circle")
          .attr("class", "node-shape node-shape--event")
          .attr("r", r);
        break;
      default:
        g.append("circle").attr("class", "node-shape").attr("r", r);
    }
  });
}

function curvedPath(source: NetworkNode, target: NetworkNode) {
  const sx = source.x ?? 0;
  const sy = source.y ?? 0;
  const tx = target.x ?? 0;
  const ty = target.y ?? 0;
  const mx = (sx + tx) / 2;
  const my = (sy + ty) / 2;
  const dx = ty - sy;
  const dy = sx - tx;
  const len = Math.hypot(dx, dy) || 1;
  const bend = 26;
  const cx = mx + (dx / len) * bend;
  const cy = my + (dy / len) * bend;
  return `M ${sx} ${sy} Q ${cx} ${cy} ${tx} ${ty}`;
}

interface NetworkDiagramProps {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  height?: number;
  width?: number;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  zoomControlsRef?: React.RefObject<{
    zoomIn: () => void;
    zoomOut: () => void;
    reset: () => void;
  } | null>;
}

export function NetworkDiagram({
  nodes,
  edges,
  height = 560,
  width = DEFAULT_WIDTH,
  selectedId,
  onSelect,
  zoomControlsRef,
}: NetworkDiagramProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const nodeSelRef = useRef<d3.Selection<
    SVGGElement,
    NetworkNode,
    SVGGElement,
    unknown
  > | null>(null);
  const linkSelRef = useRef<d3.Selection<
    SVGPathElement,
    SimEdge,
    SVGGElement,
    unknown
  > | null>(null);
  const onSelectRef = useRef(onSelect);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  const adjacency = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const edge of edges) {
      if (!map.has(edge.source)) map.set(edge.source, new Set());
      if (!map.has(edge.target)) map.set(edge.target, new Set());
      map.get(edge.source)!.add(edge.target);
      map.get(edge.target)!.add(edge.source);
    }
    return map;
  }, [edges]);

  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const nodesCopy: NetworkNode[] = nodes.map((n) => ({ ...n }));
    const edgesCopy: SimEdge[] = edges.map((e) => ({ ...e }));

    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();

    const container = svg.append("g").attr("class", "network-viewport");

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.45, 2.5])
      .on("zoom", (event) => {
        container.attr("transform", event.transform.toString());
      });
    svg.call(zoom);
    svg.on("click", () => onSelectRef.current(null));

    if (zoomControlsRef) {
      zoomControlsRef.current = {
        zoomIn: () => svg.transition().duration(200).call(zoom.scaleBy, 1.3),
        zoomOut: () =>
          svg.transition().duration(200).call(zoom.scaleBy, 1 / 1.3),
        reset: () =>
          svg
            .transition()
            .duration(300)
            .call(zoom.transform, d3.zoomIdentity),
      };
    }

    const linkGroup = container.append("g").attr("class", "network-links");
    const nodeGroup = container.append("g").attr("class", "network-nodes");

    // Scale spacing with graph size so denser diagrams don't collapse into a knot.
    const nodeCount = nodesCopy.length;
    const linkDistance = 120 + nodeCount * 4;
    const chargeStrength = -(260 + nodeCount * 18);
    const collideRadius = 44 + Math.min(nodeCount, 20);

    const simulation = d3
      .forceSimulation<NetworkNode>(nodesCopy)
      .force(
        "link",
        d3
          .forceLink<NetworkNode, SimEdge>(edgesCopy)
          .id((d) => d.id)
          .distance(linkDistance)
          .strength(0.5),
      )
      .force("charge", d3.forceManyBody().strength(chargeStrength))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide(collideRadius))
      .force("x", d3.forceX(width / 2).strength(0.03))
      .force("y", d3.forceY(height / 2).strength(0.03));

    const linkSelection = linkGroup
      .selectAll<SVGPathElement, SimEdge>("path")
      .data(edgesCopy)
      .join("path")
      .attr("class", (d) =>
        d.confidence === "alleged" ? "network-link network-link--alleged" : "network-link",
      );

    const nodeSelection = nodeGroup
      .selectAll<SVGGElement, NetworkNode>("g")
      .data(nodesCopy)
      .join("g")
      .attr("class", "network-node")
      .call(
        d3
          .drag<SVGGElement, NetworkNode>()
          .on("start", (event) => {
            if (!event.active) simulation.alphaTarget(0.2).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
          })
          .on("drag", (event) => {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
          })
          .on("end", (event) => {
            if (!event.active) simulation.alphaTarget(0);
          }),
      )
      .on("click", (event, d) => {
        event.stopPropagation();
        onSelectRef.current(d.id);
      })
      .on("dblclick", (event, d) => {
        event.stopPropagation();
        d.fx = null;
        d.fy = null;
        simulation.alphaTarget(0.15).restart();
        setTimeout(() => simulation.alphaTarget(0), 300);
      });

    appendShape(nodeSelection);

    nodeSelection
      .append("text")
      .attr("class", "network-label")
      .attr("y", -16)
      .attr("text-anchor", "middle")
      .text((d) => d.label);

    simulation.on("tick", () => {
      linkSelection.attr("d", (d) =>
        curvedPath(d.source as NetworkNode, d.target as NetworkNode),
      );
      nodeSelection.attr("transform", (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
    });

    nodeSelRef.current = nodeSelection;
    linkSelRef.current = linkSelection;

    return () => {
      simulation.stop();
      svg.on(".zoom", null).on("click", null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, edges, height, width]);

  useEffect(() => {
    const nodeSel = nodeSelRef.current;
    const linkSel = linkSelRef.current;
    if (!nodeSel || !linkSel) return;

    if (!selectedId) {
      nodeSel.classed("is-dimmed", false).classed("is-selected", false);
      linkSel.classed("is-dimmed", false).classed("is-active", false);
      return;
    }

    const neighbors = adjacency.get(selectedId) ?? new Set<string>();
    nodeSel
      .classed("is-selected", (d) => d.id === selectedId)
      .classed(
        "is-dimmed",
        (d) => d.id !== selectedId && !neighbors.has(d.id),
      );
    linkSel
      .classed("is-active", (d) => {
        const source = d.source as NetworkNode;
        const target = d.target as NetworkNode;
        return source.id === selectedId || target.id === selectedId;
      })
      .classed("is-dimmed", (d) => {
        const source = d.source as NetworkNode;
        const target = d.target as NetworkNode;
        return source.id !== selectedId && target.id !== selectedId;
      });
  }, [selectedId, adjacency]);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full cursor-grab active:cursor-grabbing"
      role="img"
      aria-label="Interactive relationship diagram"
    />
  );
}
