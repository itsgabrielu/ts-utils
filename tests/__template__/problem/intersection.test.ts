import { expect } from "chai";

const merge = (a: number[], b: number[]) => {
  return [...a, ...b];
};

/**
 * Problem here
 */
describe("Merge", () => {
  [
    [
      [2, 2, 4, 1],
      [1, 2, 0, 2],
      [2, 2, 4, 1, 1, 2, 0, 2],
    ],
  ].forEach(([first, second, expected]) => {
    describe(`For the problem`, () => {
      it(`should give ${first} merge ${second} -> ${expected}`, () => {
        const output = merge(first, second);
        expect(expected).to.deep.equal(output);
      });
    });
  });
});
