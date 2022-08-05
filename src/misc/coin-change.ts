const coinChange = (coins: number[], amount: number): number => {
  const newCoins = [...coins] as number[];
  newCoins.sort((a, b) => b - a);
  let amountRemaining = amount;
  const coinIndex = Object.values(newCoins).reduce((acc, val) => {
    acc[val] = 0;
    return acc;
  }, {} as Record<number, number>);

  newCoins.forEach((c) => {
    if (amountRemaining >= c) {
      coinIndex[c] = Math.floor(amountRemaining / c);
      amountRemaining = amountRemaining - coinIndex[c] * c;
    }
  });

  console.log(coinIndex);

  if (amountRemaining > 0) {
    return -1;
  }

  return Object.values(coinIndex).reduce(
    (acc: number, val: number) => acc + val,
    0,
  );
};

export default coinChange;
