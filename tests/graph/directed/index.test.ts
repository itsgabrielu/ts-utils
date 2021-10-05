import { expect } from "chai";

import { DirectedGraph } from "../../../src/graph/directed";
import { basicTestSet } from "./mock";

import type { GraphNode } from "../../../src/graph/directed/types";

describe("Directed Graph", () => {
  describe("for basic test set", () => {
    (
      [
        [
          1,
          [
            { value: 2, visited: false, queueing: false },
            { value: 5, visited: false, queueing: false },
          ],
        ],
        [
          2,
          [
            { value: 3, visited: false, queueing: false },
            { value: 5, visited: false, queueing: false },
          ],
        ],
        [3, [{ value: 4, visited: false, queueing: false }]],
        [
          4,
          [
            { value: 5, visited: false, queueing: false },
            { value: 6, visited: false, queueing: false },
          ],
        ],
        [5, []],
        [6, []],
      ] as [number, GraphNode[]][]
    ).forEach(([activeNode, expectedChildrenNodes]) => {
      it(`should be able to find a route for Node ${activeNode} to its children nodes (i.e. \`[${expectedChildrenNodes.map(
        (n: GraphNode) => `${n.value}`,
      )}]\`)`, () => {
        const graph = new DirectedGraph(
          basicTestSet.vertices,
          basicTestSet.edges,
        );
        const actualChildrenNodes = graph.getChildrenNodes(
          graph.getNode(activeNode) as GraphNode,
        );
        expect(actualChildrenNodes).to.deep.equal(expectedChildrenNodes);
      });
    });
    (
      [
        [1, 6, true],
        [2, 6, true],
        [3, 1, false],
      ] as [number, number, boolean][]
    ).forEach(([originGraphNode, destinationGraphNode, expectedHasRoute]) => {
      it(`should${
        expectedHasRoute ? "  " : " not"
      } be able to find a route for Node ${originGraphNode} to Node ${destinationGraphNode} via breadth-first search`, () => {
        const graph = new DirectedGraph(
          basicTestSet.vertices,
          basicTestSet.edges,
        );
        let hasRoute = false;
        graph.bfsSearch(graph.getNode(originGraphNode), (v) => {
          if (v && v == graph.getNode(destinationGraphNode)) {
            hasRoute = true;
          }
        });
        expect(hasRoute).to.equal(expectedHasRoute);
      });
    });
  });
});
