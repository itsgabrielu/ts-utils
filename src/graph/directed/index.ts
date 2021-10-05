import type { Edge, GraphNode, GraphValue } from "./types";

class Queue {
  line: GraphNode[];
  constructor() {
    this.line = [];
  }
  enqueue(graphNode: GraphNode) {
    this.line.push(graphNode);
  }
  dequeue(): GraphNode | undefined {
    return this.line.shift(); // Returns first-in item out
  }
  isEmpty(): boolean {
    return this.line.length === 0;
  }
}

// Directed Graph just means graphs where all nodes only have one way relationships
export class DirectedGraph {
  private edges: Edge[];

  // Processed on instantiation
  graphNodes: GraphNode[];

  constructor(vertices: GraphValue[], edges: Edge[]) {
    this.graphNodes = vertices.map((vertex) => ({
      value: vertex,
      queueing: false,
      visited: false,
    }));
    this.edges = edges;
  }
  getNode(graphValue: GraphValue): GraphNode | undefined {
    return this.graphNodes.find((graphNode) => graphNode.value === graphValue);
  }
  getChildrenNodes(activeNode: GraphNode): GraphNode[] {
    const childrenEdges = this.edges.filter(
      (edge) => activeNode.value === edge[0],
    );
    const chilren = childrenEdges.map((edge) => edge[1]);
    return this.graphNodes.filter((graphNode) =>
      chilren.includes(graphNode.value),
    );
  }
  // DFS means we explore the deeper node of this node first. To do so, we use recursion.
  dfsSearch(activeNode: GraphNode | undefined, visit: (v: GraphNode) => void) {
    if (!activeNode) {
      return;
    }
    visit(activeNode); // Visit this node first
    activeNode.visited = true;
    const childNodes = this.getChildrenNodes(activeNode);
    childNodes.forEach((childNode) => {
      if (!childNode.visited) {
        // It will keep diving in the same branch, visiting graph nodes along the way until it hits a leaf node
        this.dfsSearch(childNode, visit);
      }
    });
  }
  // BFS means we explore all siblings first before moving to the first deeper node
  bfsSearch(activeNode: GraphNode | undefined, visit: (v: GraphNode) => void) {
    if (!activeNode) {
      return;
    }
    const q = new Queue();
    activeNode.queueing = true;
    q.enqueue(activeNode);
    const childrenNodes = this.getChildrenNodes(activeNode);
    while (!q.isEmpty()) {
      const firstSiblingNode = q.dequeue();
      if (firstSiblingNode && !firstSiblingNode.visited) {
        visit(firstSiblingNode);
        firstSiblingNode.visited = true;
      }
      childrenNodes.forEach((childrenNode) => {
        if (!childrenNode.queueing) {
          childrenNode.queueing = true;
          q.enqueue(childrenNode);
        }
      });
    }
    childrenNodes.forEach((childrenNode) => {
      this.bfsSearch(childrenNode, visit);
    });
  }
}
