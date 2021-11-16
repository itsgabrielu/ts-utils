import { expect } from "chai";
import { binarySearch } from "../../../src/methods/binary-search";

describe("Binary Search", () => {
  describe("should search within an ascending sorted array as long as ordered list provided", () => {
    (
      [
        ["return index of matched (3)", [12, 23, 45, 123, 234], 123, 3],
        ["return index of matched (4)", [12, 23, 45, 123, 234], 234, 4],
        ["return -1 if not found", [12, 23, 45, 123, 234], 123131, -1],
      ] as [string, number[], number, number][]
    ).forEach(([description, list, valueToLookup, expected]) => {
      it(`should ${description}`, () => {
        const output = binarySearch(list, (v: number) => v, valueToLookup);
        expect(output).to.equal(expected);
      });
    });
  });
});
