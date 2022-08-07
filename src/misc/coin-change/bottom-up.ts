import { Amount, CoinDenomination, CoinSelectionLength } from "./types";

/**
 * Solution to the "Coin Change" problem using bottom up dynamic programming
 *
 * Best/Worst time complexity: `O(coins.length x amount)`
 * Space complexity: `O(amount)`
 *
 * @param coins All possible coin types
 * @param amount Sum of any considered coin selections
 * @returns Minimum length of coin selections that makes the amount
 */
const bottomUp = (
  coins: CoinDenomination[],
  amount: Amount,
): CoinSelectionLength => {
  const sortedCoins = [...coins].sort((a, b) => b - a);

  const minCoinSelectionLengths = Array.from({ length: amount + 1 }).reduce(
    (acc: Record<Amount, CoinSelectionLength>, _, index) => {
      acc[index] = NaN;
      return acc;
    },
    {} as Record<Amount, CoinSelectionLength>,
  );

  minCoinSelectionLengths[0] = 0;

  Object.keys(minCoinSelectionLengths).forEach((_, subamount) => {
    sortedCoins.forEach((coin) => {
      const existingMinLength = minCoinSelectionLengths[subamount];
      const nextSubamount = subamount - coin;
      // If the next subamount negative integer, it means that that is the end of the coin
      // selection. We can just skip and go to the next coin
      if (nextSubamount >= 0) {
        // Wondering why there is a need to "+ 1" ? As we are counting for the next subamount,
        // we also have to consider the 1 coin that is needed to create the next subamount
        const nextMinCoinSelectionLength =
          minCoinSelectionLengths[nextSubamount] + 1;
        if (
          // If either no previous min coin selection length...
          Number.isNaN(existingMinLength) ||
          // ... or if a smaller min coin selection length is detected...
          nextMinCoinSelectionLength < existingMinLength
        ) {
          // ...then save the smaller min coin selection length under the subamount
          minCoinSelectionLengths[subamount] = nextMinCoinSelectionLength;
        }
      }
    });
  });

  const minCoinSelectionLength = minCoinSelectionLengths[amount];

  return Number.isNaN(minCoinSelectionLength) ? -1 : minCoinSelectionLength;
};

export default bottomUp;
