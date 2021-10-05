import type { GraphValue } from "../../../src/graph/directed/types";

export const basicTestSet = {
  vertices: [1, 2, 3, 4, 5, 6] as GraphValue[],
  edges: [
    [1, 2],
    [1, 5],
    [2, 3],
    [2, 5],
    [3, 4],
    [4, 5],
    [4, 6],
  ] as [parentNode: GraphValue, childNode: GraphValue][],
};
