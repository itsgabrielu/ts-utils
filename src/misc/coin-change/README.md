# Coin change

## Greedy algorithm

First instinct I had was to sort the coins from largest to smallest, then take the largest coins first and then consider the second largest coins if the remainder was smaller than the largest coin. I later learnt that this way was called the "[greedy algorithm](https://encyclopediaofmath.org/index.php?title=Greedy_algorithm)".

However, this method did not detect other possible solutions, e.g. For `{ coins: [1, 2, 5], amount: 11, output: 3 }`, the greedy algorithm could find `5x2+1x1` but not `5x1+2x3`.

Some test cases also could not find the solution using this way, e.g.`{ coins: [186, 419, 83, 408], amount: 6249, output: 20 }`.

On surface level, it seemed backtracking had to be part of the solution somehow. I tried implementing my own solution but it timed out because my initial attempt naively explored every path regardless of the size of the minimum length of the coin selection, which resulted in a time out of the test environment.

I later learnt about using dynamic programming which implements recursion to solve problems in linear time and referring to existing solutions already available.

## Top down method

All possible coin selections are mapped into a decision tree where the bottom-most nodes are either 0 or a remainder amount with less than the current selected coin value.

The method will handle all the first choices
in the coin decision tree, where each node will be the subamount subtracted from the selected coin value.

For every branch of this decision tree, we get the minimum number of coins for every subamount node. Instead of calculating at every subamount node, we can memoise (or cache) the least amount for that particular subamount to be used when the subamount is later encountered in another branch while the method traverses back up to another branch on the decision tree, e.g. Every time we do a "`cachedCoinSelectionLengthsPerAmount[subamount] := minCoinSelectionLengthSoFar`" we can use just depend on the cached value every time a "Using cached value" is encountered as printed in the log below. This is part of dynamic programming.

```bash
# Arranged in order of execution
# Every indent equals to 1 level

# First we consider the options...
    Amount (11) - Coin Value (5): 6
        Amount (6) - Coin Value (5): 1
            Amount (1) - Coin Value (5): -4
            # > Dead end as amount is less than 0: -4
            Amount (1) - Coin Value (2): -1
            # > Dead end as amount is less than 0: -1
            Amount (1) - Coin Value (1): 0
            # > Solution found
            # > For the amount of 0, min number of coins so far: NaN vs min number of coins: 1
        # > cachedCoinSelectionLengthsPerAmount[1] := 1
        # > For the amount of 1, min number of coins so far: NaN vs min number of coins: 2
        Amount (6) - Coin Value (2): 4
            Amount (4) - Coin Value (5): -1
            # > Dead end as amount is less than 0: -1
            Amount (4) - Coin Value (2): 2
                Amount (2) - Coin Value (5): -3
                # > Dead end as amount is less than 0: -3
                Amount (2) - Coin Value (2): 0
                # > Solution found
                # > For the amount of 0, min number of coins so far: NaN vs min number of coins: 1
                Amount (2) - Coin Value (1): 1
                # > Using cached value: cachedCoinSelectionLengthsPerAmount[1] (1)
                # > For the amount of 1, min number of coins so far: 1 vs min number of coins: 2
            # > cachedCoinSelectionLengthsPerAmount[2] := 1
            # > For the amount of 2, min number of coins so far: NaN vs min number of coins: 2
            Amount (4) - Coin Value (1): 3
                Amount (3) - Coin Value (5): -2
                # > Dead end as amount is less than 0: -2
                Amount (3) - Coin Value (2): 1
                # > Using cached value: cachedCoinSelectionLengthsPerAmount[1] (1)
                # > For the amount of 1, min number of coins so far: NaN vs min number of coins: 2
                Amount (3) - Coin Value (1): 2
                # > Using cached value: cachedCoinSelectionLengthsPerAmount[2] (1)
                # > For the amount of 2, min number of coins so far: 2 vs min number of coins: 2
            # > cachedCoinSelectionLengthsPerAmount[3] := 2
            # > For the amount of 3, min number of coins so far: 2 vs min number of coins: 3
        # > cachedCoinSelectionLengthsPerAmount[4] := 2
        # > For the amount of 4, min number of coins so far: 2 vs min number of coins: 3
        Amount (6) - Coin Value (1): 5
            Amount (5) - Coin Value (5): 0
            # > Solution found
            # > For the amount of 0, min number of coins so far: NaN vs min number of coins: 1
            Amount (5) - Coin Value (2): 3
            # > Using cached value: cachedCoinSelectionLengthsPerAmount[3] (2)
            # > For the amount of 3, min number of coins so far: 1 vs min number of coins: 3
            Amount (5) - Coin Value (1): 4
            # > Using cached value: cachedCoinSelectionLengthsPerAmount[4] (2)
            # > For the amount of 4, min number of coins so far: 1 vs min number of coins: 3
        # > cachedCoinSelectionLengthsPerAmount[5] := 1
        # > For the amount of 5, min number of coins so far: 2 vs min number of coins: 2
    # > cachedCoinSelectionLengthsPerAmount[6] := 2
    # > For the amount of 6, min number of coins so far: NaN vs min number of coins: 3
    Amount (11) - Coin Value (2): 9
        Amount (9) - Coin Value (5): 4
        # > Using cached value: cachedCoinSelectionLengthsPerAmount[4] (2)
        # > For the amount of 4, min number of coins so far: NaN vs min number of coins: 3
        Amount (9) - Coin Value (2): 7
            Amount (7) - Coin Value (5): 2
            # > Using cached value: cachedCoinSelectionLengthsPerAmount[2] (1)
            # > For the amount of 2, min number of coins so far: NaN vs min number of coins: 2
            Amount (7) - Coin Value (2): 5
            # > Using cached value: cachedCoinSelectionLengthsPerAmount[5] (1)
            # > For the amount of 5, min number of coins so far: 2 vs min number of coins: 2
            Amount (7) - Coin Value (1): 6
            # > Using cached value: cachedCoinSelectionLengthsPerAmount[6] (2)
            # > For the amount of 6, min number of coins so far: 2 vs min number of coins: 3
        # > cachedCoinSelectionLengthsPerAmount[7] := 2
        # > For the amount of 7, min number of coins so far: 3 vs min number of coins: 3
        Amount (9) - Coin Value (1): 8
            Amount (8) - Coin Value (5): 3
            # > Using cached value: cachedCoinSelectionLengthsPerAmount[3] (2)
            # > For the amount of 3, min number of coins so far: NaN vs min number of coins: 3
            Amount (8) - Coin Value (2): 6
            # > Using cached value: cachedCoinSelectionLengthsPerAmount[6] (2)
            # > For the amount of 6, min number of coins so far: 3 vs min number of coins: 3
            Amount (8) - Coin Value (1): 7
            # > Using cached value: cachedCoinSelectionLengthsPerAmount[7] (2)
            # > For the amount of 7, min number of coins so far: 3 vs min number of coins: 3
        # > cachedCoinSelectionLengthsPerAmount[8] := 3
        # > For the amount of 8, min number of coins so far: 3 vs min number of coins: 4
    # > cachedCoinSelectionLengthsPerAmount[9] := 3
    # > For the amount of 9, min number of coins so far: 3 vs min number of coins: 4
    Amount (11) - Coin Value (1): 10
        Amount (10) - Coin Value (5): 5
        # > Using cached value: cachedCoinSelectionLengthsPerAmount[5] (1)
        # > For the amount of 5, min number of coins so far: NaN vs min number of coins: 2
        Amount (10) - Coin Value (2): 8
        # > Using cached value: cachedCoinSelectionLengthsPerAmount[8] (3)
        # > For the amount of 8, min number of coins so far: 2 vs min number of coins: 4
        Amount (10) - Coin Value (1): 9
        # > Using cached value: cachedCoinSelectionLengthsPerAmount[9] (3)
        # > For the amount of 9, min number of coins so far: 2 vs min number of coins: 4
    # > cachedCoinSelectionLengthsPerAmount[10] := 2
    # > For the amount of 10, min number of coins so far: 3 vs min number of coins: 3
# > cachedCoinSelectionLengthsPerAmount[11] := 3
# We then know that for the amount of 11, the minimum number of coins is 3.

```

# References

- https://betterprogramming.pub/learn-dynamic-programming-the-coin-change-problem-22a104478f50