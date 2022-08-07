import { CoinDenomination, Amount, CoinSelectionLength } from "./types";

const getMinCoinSelectionLength = (
  coins: CoinDenomination[],
  amount: Amount,
  cachedCoinSelectionLengthsPerAmount: Record<Amount, CoinSelectionLength>,
): CoinSelectionLength => {
  // Since we have already worked out the min coin selection
  // length for this subamount, we just use this cached amount
  // instead, preventing a repeated check for every coin
  // denomination for that subamount
  if (typeof cachedCoinSelectionLengthsPerAmount[amount] !== "undefined") {
    // console.log(
    //   `# > Using cached value: cachedCoinSelectionLengthsPerAmount[${amount}] (${cachedCoinSelectionLengthsPerAmount[amount]})`,
    // );
    return cachedCoinSelectionLengthsPerAmount[amount];
  }
  if (amount === 0) {
    // console.log("# > Solution found");
    return 0;
  }
  if (amount < 0) {
    // console.log(`# > Dead end as amount is less than 0: ${amount}`);
    return -1;
  }

  let minCoinSelectionLength = NaN;
  let currentMinCoinSelectionLength = 0;

  // For every next possible coin choice...
  coins.forEach((coinValue) => {
    // ...handle the next coin choice
    // See README.md
    // console.log(
    //   `Amount (${amount}) - Coin Value (${coinValue}): ${amount - coinValue}`,
    // );
    // It will handle the left most choice (smallest amount)
    currentMinCoinSelectionLength = getMinCoinSelectionLength(
      coins,
      amount - coinValue,
      cachedCoinSelectionLengthsPerAmount,
    );
    if (currentMinCoinSelectionLength !== -1) {
      const nextMinCoinSelectionLength = currentMinCoinSelectionLength + 1;
      // console.log(
      //   `# > For the amount of ${amount}, min number of coins so far: ${minCoinSelectionLength} vs min number of coins: ${nextMinCoinSelectionLength}`,
      // );
      minCoinSelectionLength = Number.isNaN(minCoinSelectionLength)
        ? nextMinCoinSelectionLength
        : Math.min(minCoinSelectionLength, nextMinCoinSelectionLength);
    }
  });

  cachedCoinSelectionLengthsPerAmount[amount] = Number.isNaN(
    minCoinSelectionLength,
  )
    ? -1
    : minCoinSelectionLength;

  // console.log(
  //   `# > cachedCoinSelectionLengthsPerAmount[${amount}] := ${cachedCoinSelectionLengthsPerAmount[amount]}`,
  // );

  return cachedCoinSelectionLengthsPerAmount[amount];
};

/**
 * Solution to the "Coin Change" problem using top down dynamic programming
 *
 * Best/Worst time complexity: `O(coins.length x amount)`
 * Space complexity: `O((coins.length x amount) x amount)`
 *
 * @param coins All possible coin types
 * @param amount Sum of any considered coin selections
 * @returns Minimum length of coin selections that makes the amount
 */
const topDown = (
  coins: CoinDenomination[],
  amount: Amount,
): CoinSelectionLength => {
  const cachedCoinSelectionLengthsPerAmount: Record<
    Amount,
    CoinSelectionLength
  > = {};
  // Here we sort the coins from biggest to smallest
  // As it is more likely to arrive at a solution where the bigger coin
  // considered will produce the min coin selection length
  const sortedCoins = [...coins].sort((a, b) => b - a);
  const minCoinSelectionLength = getMinCoinSelectionLength(
    sortedCoins,
    amount,
    cachedCoinSelectionLengthsPerAmount,
  );
  return minCoinSelectionLength;
};

export default topDown;
