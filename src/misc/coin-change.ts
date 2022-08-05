const getMinNrOfCoins = (
  coins: number[],
  amount: number,
  coinSelectionLengths: Record<number, number>,
) => {
  if (typeof coinSelectionLengths[amount - 1] !== "undefined") {
    return coinSelectionLengths[amount - 1];
  }
  if (amount < 0) {
    return -1;
  }
  if (amount === 0) {
    return 0;
  }

  let count = NaN;
  let currentMinNrOfCoins = 0;

  coins.forEach((coinValue) => {
    currentMinNrOfCoins = getMinNrOfCoins(
      coins,
      amount - coinValue,
      coinSelectionLengths,
    );
    if (currentMinNrOfCoins !== -1) {
      const nextMinNrOfCoins = currentMinNrOfCoins + 1;
      count = Number.isNaN(count)
        ? nextMinNrOfCoins
        : Math.min(count, nextMinNrOfCoins);
    }
  });

  coinSelectionLengths[amount - 1] = Number.isNaN(count) ? -1 : count;

  return coinSelectionLengths[amount - 1];
};

// Top down using dynamic programming
// Time complexity: O()
const coinChange = (coins: number[], amount: number): number => {
  const coinSelectionLengths: Record<number, number> = {};
  const minNumberOfCoins = getMinNrOfCoins(coins, amount, coinSelectionLengths);
  return minNumberOfCoins;
};

export default coinChange;
