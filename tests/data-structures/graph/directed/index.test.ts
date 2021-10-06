import { expect } from "chai";

import { DirectedGraph } from "../../../../src/data-structures/graph/directed";
import { basicTestSet, secondTestSet } from "./mock";

import type { GraphNode } from "../../../../src/data-structures/graph/directed/types";

describe("Directed Graph", () => {
  [basicTestSet, secondTestSet].map((testSet, i) => {
    describe(`For test set ${i + 1}`, () => {
      testSet.childrenNodesTest.forEach(
        ([activeNode, expectedChildrenNodes]) => {
          it(`should be able to find a route for Node ${activeNode} to its children nodes (i.e. \`[${expectedChildrenNodes.map(
            (n: GraphNode) => `${n.value}`,
          )}]\`)`, () => {
            const graph = new DirectedGraph(testSet.vertices, testSet.edges);
            const actualChildrenNodes = graph.getChildrenNodes(
              graph.getNode(activeNode) as GraphNode,
            );
            expect(actualChildrenNodes).to.deep.equal(expectedChildrenNodes);
          });
        },
      );
      testSet.hasRoutesTest.forEach(
        ([originGraphNode, destinationGraphNode, expectedHasRoute]) => {
          it(`should${
            expectedHasRoute ? "" : " not"
          } be able to find a route for Node ${originGraphNode} to Node ${destinationGraphNode} via breadth-first search`, () => {
            const graph = new DirectedGraph(testSet.vertices, testSet.edges);
            let hasRoute = false;
            graph.bfsSearch(graph.getNode(originGraphNode), (v) => {
              if (v && v == graph.getNode(destinationGraphNode)) {
                hasRoute = true;
              }
            });
            expect(hasRoute).to.equal(expectedHasRoute);
          });
        },
      );
      testSet.hasRoutesTest.forEach(
        ([originGraphNode, destinationGraphNode, expectedHasRoute]) => {
          it(`should${
            expectedHasRoute ? "" : " not"
          } be able to find a route for Node ${originGraphNode} to Node ${destinationGraphNode} via depth-first search`, () => {
            const graph = new DirectedGraph(testSet.vertices, testSet.edges);
            let hasRoute = false;
            graph.dfsSearch(graph.getNode(originGraphNode), (v) => {
              if (v && v == graph.getNode(destinationGraphNode)) {
                hasRoute = true;
              }
            });
            expect(hasRoute).to.equal(expectedHasRoute);
          });
        },
      );
    });
  });
});
