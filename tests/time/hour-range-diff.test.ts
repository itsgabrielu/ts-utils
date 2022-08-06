import { expect } from "chai";

import { getMsBetweenStrHourRange } from "../../src/methods/time/hour-range-diff";

describe("getMsBetweenStrHourRange", () => {
  (
    [
      // Sometimes this test fails because it returns 691ms
      // e.g. 2022-08-06 11:24:??
      ["12:30pm-12:00am", 690],
      ["1:23am-1:08am", 1425],
    ] as [string, number][]
  ).forEach(([strHourRange, expectedMsDiff]) => {
    it(`should deduce that ${strHourRange} have a ${expectedMsDiff} ms difference`, () => {
      const actual = getMsBetweenStrHourRange(strHourRange);

      // For the above 690/691ms discrepency
      expect(actual).is.greaterThanOrEqual(expectedMsDiff);
      expect(actual).is.lessThanOrEqual(expectedMsDiff + 1);
    });
  });
});
