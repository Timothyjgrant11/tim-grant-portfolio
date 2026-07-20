import type { SimulationLinkDatum, SimulationNodeDatum } from "d3";

export type NodeType = "person" | "organization" | "account" | "place" | "event";

export type Confidence = "confirmed" | "alleged";

export interface NetworkNode extends SimulationNodeDatum {
  id: string;
  label: string;
  type: NodeType;
  subtitle?: string;
  notes?: string;
  sourceUrl?: string;
}

export interface NetworkEdge {
  source: string;
  target: string;
  label?: string;
  confidence: Confidence;
  notes?: string;
  sourceUrl?: string;
}

export interface SimEdge
  extends SimulationLinkDatum<NetworkNode>,
    Omit<NetworkEdge, "source" | "target"> {}

export interface Source {
  label: string;
  url: string;
}

export interface Investigation {
  slug: string;
  title: string;
  status: "sample" | "in-progress" | "published";
  dek: string;
  summary: string;
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  sources?: Source[];
}
