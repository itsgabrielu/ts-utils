import { expect } from "chai";
import { intersection } from "../../../src/methods/array/intersection";

/**
 * Find the intersection of two arrays.
 * An intersection would be the common elements that
 * exists within both arrays.
 * In this case, these elements should be unique!
 */
describe(
  [
    "Find the intersection of two arrays.",
    "An intersection would be the common elements that",
    "exists within both arrays.",
    "In this case, these elements should be unique!",
  ].join(" "),
  () => {
    [
      [
        [2, 2, 4, 1],
        [1, 2, 0, 2],
        [1, 2],
      ],
    ].forEach(([first, second, expected]) => {
      describe(`For the problem`, () => {
        it(`should give ${first} intersect ${second} -> ${expected}`, () => {
          const output = intersection(first, second);
          expect(expected).to.deep.equal(output);
        });
      });
    });
  },
);
