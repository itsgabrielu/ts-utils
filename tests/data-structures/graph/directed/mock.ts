import type {
  GraphValue,
  GraphNode,
} from "../../../../src/data-structures/graph/directed/types";

interface TestSet {
  vertices: GraphValue[];
  edges: [parentNode: GraphValue, childNode: GraphValue][];
  childrenNodesTest: [number, GraphNode[]][];
  hasRoutesTest: [number, number, boolean][];
}

export const basicTestSet: TestSet = {
  vertices: Array.from({ length: 6 }).map((_, i) => i + 1),
  edges: [
    [1, 2],
    [1, 5],
    [2, 3],
    [2, 5],
    [3, 4],
    [4, 5],
    [4, 6],
  ],
  childrenNodesTest: [
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
  ],
  hasRoutesTest: [
    [1, 6, true],
    [2, 6, true],
    [3, 1, false],
  ],
};

export const secondTestSet: TestSet = {
  vertices: Array.from({ length: 14 }).map((_, i) => i + 1),
  edges: [
    [1, 2],
    [1, 13],
    [2, 6],
    [2, 3],
    [3, 10],
    [4, 3],
    [4, 5],
    [5, 10],
    [5, 8],
    [6, 5],
    [7, 6],
    [9, 5],
    [10, 11],
    [12, 11],
    [13, 14],
    [13, 12],
  ],
  childrenNodesTest: [
    [
      1,
      [
        { value: 2, visited: false, queueing: false },
        { value: 13, visited: false, queueing: false },
      ],
    ],
  ],
  hasRoutesTest: [
    [1, 11, true],
    [1, 8, true],
    [7, 11, true],
    [1, 5, true],
    [2, 13, false],
    [1, 9, false],
  ],
};
