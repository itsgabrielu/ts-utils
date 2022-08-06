import { expect } from "chai";
import topDown from "../../src/misc/coin-change/top-down";

describe("Coin change", () => {
  describe(
    [
      "You are given an integer array coins representing coins of different CoinDenominations and an integer amount representing a total amount of money.",
      "Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.",
      "You may assume that you have an infinite number of each kind of coin.",
    ].join(" "),
    () => {
      [
        { coins: [1, 2, 5], amount: 11, output: 3 },
        { coins: [2], amount: 3, output: -1 },
        { coins: [1], amount: 0, output: 0 },
        // More likely scenario where you can get more than 1 solution
        { coins: [186, 419, 83, 408], amount: 6249, output: 20 },
      ].forEach(({ coins, amount, output }) => {
        describe("Using the top-down method - topDown", () => {
          it(`should take the ${coins} expecting a value amount of ${amount} and produce ${output}`, () => {
            const actual = topDown(coins, amount);
            expect(actual).to.equal(output);
          });
        });
      });
    },
  );
});
