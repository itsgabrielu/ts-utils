export type GraphValue = number;
export type Edge = [parentNode: GraphValue, childNode: GraphValue];
export interface GraphNode {
  value: GraphValue;
  queueing: boolean; // Used for BFS
  visited: boolean;
}
