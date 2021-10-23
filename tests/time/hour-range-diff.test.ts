import { expect } from "chai";

import { getMsBetweenStrHourRange } from "../../src/methods/time/hour-range-diff";

describe("getMsBetweenStrHourRange", () => {
  (
    [
      ["12:30pm-12:00am", 690],
      ["1:23am-1:08am", 1425],
    ] as [string, number][]
  ).forEach(([strHourRange, expectedMsDiff]) => {
    it(`should deduce that ${strHourRange} have a ${expectedMsDiff} ms difference`, () => {
      const actual = getMsBetweenStrHourRange(strHourRange);
      expect(actual).to.equal(expectedMsDiff);
    });
  });
});
