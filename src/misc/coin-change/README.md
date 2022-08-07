# Coin change

## Greedy algorithm

First instinct I had was to sort the coins from largest to smallest, then take the largest coins first and then consider the second largest coins if the remainder was smaller than the largest coin. I later learnt that this way was called the "[greedy algorithm](https://encyclopediaofmath.org/index.php?title=Greedy_algorithm)".

However, this method did not detect other possible solutions, e.g. For `{ coins: [1, 2, 5], amount: 11, output: 3 }`, the greedy algorithm could find `5x2+1x1` but not `5x1+2x3`. Some test cases also could not find the solution using this way, e.g.`{ coins: [186, 419, 83, 408], amount: 6249, output: 20 }`. Therefore, optimal choices for a decision for a single coin choice in the selection may not necessarily be optimal for the entire selection, and as such does not have a "greedy property" and cannot use the greedy algorithm.

On surface level, it seemed backtracking had to be part of the solution somehow. I tried implementing my own solution but it timed out because my initial attempt naively explored every path regardless of the size of the minimum length of the coin selection.

I later learnt about using dynamic programming which implements optimisation while recursively solving problems in linear time.

## Top down method

All possible coin selections are mapped into a decision tree where the bottom-most nodes are either 0 or a remainder amount with less than the current selected coin value.

The method will handle all the first choices
in the coin decision tree, where each node will be the subamount subtracted from the selected coin value.

For every branch of this decision tree, we get the minimum number of coins for every subamount node. Instead of calculating at every subamount node, we can memoise (or cache) the least amount for that particular subamount to be used when the subamount is later encountered in another branch while the method traverses back up to another branch on the decision tree, e.g. Every time we do a "`cachedCoinSelectionLengthsPerAmount[subamount] := minCoinSelectionLengthSoFar`" we can use just depend on the cached value every time a "Using cached value" is encountered as printed in the log below. This is part of dynamic programming.

```bash
# Arranged in order of execution
# Every indent equals to 1 level

# First we consider the options (5, 2, 1)...
    Amount (11) - Coin Value (5): 6
        Amount (6) - Coin Value (5): 1
            Amount (1) - Coin Value (5): -4
            # > Dead end as amount is less than 0: -4
            Amount (1) - Coin Value (2): -1
            # > Dead end as amount is less than 0: -1
            Amount (1) - Coin Value (1): 0
            # > Solution found
            # > For the amount of 1, min number of coins so far: NaN vs min number of coins: 1
        # > cachedCoinSelectionLengthsPerAmount[1] := 1
    # > For the amount of 6, min number of coins so far: NaN vs min number of coins: 2
        Amount (6) - Coin Value (2): 4
            Amount (4) - Coin Value (5): -1
            # > Dead end as amount is less than 0: -1
            Amount (4) - Coin Value (2): 2
                Amount (2) - Coin Value (5): -3
                # > Dead end as amount is less than 0: -3
                Amount (2) - Coin Value (2): 0
                # > Solution found
                # > For the amount of 2, min number of coins so far: NaN vs min number of coins: 1
                Amount (2) - Coin Value (1): 1
                # > Using cached value: cachedCoinSelectionLengthsPerAmount[1] (1)
            # > For the amount of 2, min number of coins so far: 1 vs min number of coins: 2
            # > cachedCoinSelectionLengthsPerAmount[2] := 1
        # > For the amount of 4, min number of coins so far: NaN vs min number of coins: 2
            Amount (4) - Coin Value (1): 3
                Amount (3) - Coin Value (5): -2
                # > Dead end as amount is less than 0: -2
                Amount (3) - Coin Value (2): 1
                # > Using cached value: cachedCoinSelectionLengthsPerAmount[1] (1)
                # > For the amount of 3, min number of coins so far: NaN vs min number of coins: 2
                Amount (3) - Coin Value (1): 2
                # > Using cached value: cachedCoinSelectionLengthsPerAmount[2] (1)
                # > For the amount of 3, min number of coins so far: 2 vs min number of coins: 2
            # > cachedCoinSelectionLengthsPerAmount[3] := 2
        # > For the amount of 4, min number of coins so far: 2 vs min number of coins: 3
        # > cachedCoinSelectionLengthsPerAmount[4] := 2
    # > For the amount of 6, min number of coins so far: 2 vs min number of coins: 3
        Amount (6) - Coin Value (1): 5
            Amount (5) - Coin Value (5): 0
            # > Solution found
            # > For the amount of 5, min number of coins so far: NaN vs min number of coins: 1
            Amount (5) - Coin Value (2): 3
            # > Using cached value: cachedCoinSelectionLengthsPerAmount[3] (2)
            # > For the amount of 5, min number of coins so far: 1 vs min number of coins: 3
            Amount (5) - Coin Value (1): 4
            # > Using cached value: cachedCoinSelectionLengthsPerAmount[4] (2)
            # > For the amount of 5, min number of coins so far: 1 vs min number of coins: 3
        # > cachedCoinSelectionLengthsPerAmount[5] := 1
    # > For the amount of 6, min number of coins so far: 2 vs min number of coins: 2
    # > cachedCoinSelectionLengthsPerAmount[6] := 2
# > For the amount of 11, min number of coins so far: NaN vs min number of coins: 3
    Amount (11) - Coin Value (2): 9
        Amount (9) - Coin Value (5): 4
        # > Using cached value: cachedCoinSelectionLengthsPerAmount[4] (2)
        # > For the amount of 9, min number of coins so far: NaN vs min number of coins: 3
        Amount (9) - Coin Value (2): 7
            Amount (7) - Coin Value (5): 2
            # > Using cached value: cachedCoinSelectionLengthsPerAmount[2] (1)
        # > For the amount of 7, min number of coins so far: NaN vs min number of coins: 2
            Amount (7) - Coin Value (2): 5
            # > Using cached value: cachedCoinSelectionLengthsPerAmount[5] (1)
        # > For the amount of 7, min number of coins so far: 2 vs min number of coins: 2
            Amount (7) - Coin Value (1): 6
            # > Using cached value: cachedCoinSelectionLengthsPerAmount[6] (2)
        # > For the amount of 7, min number of coins so far: 2 vs min number of coins: 3
        # > cachedCoinSelectionLengthsPerAmount[7] := 2
    # > For the amount of 9, min number of coins so far: 3 vs min number of coins: 3
        Amount (9) - Coin Value (1): 8
            Amount (8) - Coin Value (5): 3
            # > Using cached value: cachedCoinSelectionLengthsPerAmount[3] (2)
            # > For the amount of 8, min number of coins so far: NaN vs min number of coins: 3
            Amount (8) - Coin Value (2): 6
            # > Using cached value: cachedCoinSelectionLengthsPerAmount[6] (2)
            # > For the amount of 8, min number of coins so far: 3 vs min number of coins: 3
            Amount (8) - Coin Value (1): 7
            # > Using cached value: cachedCoinSelectionLengthsPerAmount[7] (2)
            # > For the amount of 8, min number of coins so far: 3 vs min number of coins: 3
            # > cachedCoinSelectionLengthsPerAmount[8] := 3
    # > For the amount of 9, min number of coins so far: 3 vs min number of coins: 4
    # > cachedCoinSelectionLengthsPerAmount[9] := 3
# > For the amount of 11, min number of coins so far: 3 vs min number of coins: 4
    Amount (11) - Coin Value (1): 10
        Amount (10) - Coin Value (5): 5
        # > Using cached value: cachedCoinSelectionLengthsPerAmount[5] (1)
    # > For the amount of 10, min number of coins so far: NaN vs min number of coins: 2
        Amount (10) - Coin Value (2): 8
        # > Using cached value: cachedCoinSelectionLengthsPerAmount[8] (3)
    # > For the amount of 10, min number of coins so far: 2 vs min number of coins: 4
        Amount (10) - Coin Value (1): 9
        # > Using cached value: cachedCoinSelectionLengthsPerAmount[9] (3)
    # > For the amount of 10, min number of coins so far: 2 vs min number of coins: 4
    # > cachedCoinSelectionLengthsPerAmount[10] := 2
# > For the amount of 11, min number of coins so far: 3 vs min number of coins: 3
# > cachedCoinSelectionLengthsPerAmount[11] := 3
# We then know that for the amount of 11 with the coin options of 5, 2, 1, the minimum number of coins is 3.

```

However, with a space complexity of `O((coins.length * amount) * coins.length)`, this method is only good when you have a small number of possible coins.

# Bottom up method

We create a table where for each row, each coin denomination is subtracted with all possible subamounts inclusive of the amount. The subamounts are sorted in an ascending order, then coin denomination in a descending order. We then handle the next subamounts that are positive integers or zero. All minimum coin selection lengths are
stored in a hashmap like data structure (in this case, JavaScript object `Record<Amount, CoinSelectionLength>` named `dp` as used below) as it calculates every subamount towards the final amount.

Illustrating the test case `{ coins: [1, 2, 5], amount: 11, output: 3 }`, we can then slowly work out the minimum length once `subamount === amount`.

| Subamount | Coin | Next Subamount (Subamount - Coin) | Action   | Existing Min Length for Next Subamount | Min Length for Next Subamount to consider | Action                        |
| --------- | ---- | --------------------------------- | -------- | -------------------------------------- | ----------------------------------------- | ----------------------------- |
| 0         | 5    | -5                                | Skip     | -                                      | -                                         | -                             |
| 0         | 2    | -2                                | Skip     | -                                      | -                                         | -                             |
| 0         | 1    | -1                                | Skip     | -                                      | -                                         | -                             |
| 1         | 5    | -4                                | Skip     | -                                      | -                                         | -                             |
| 1         | 2    | -1                                | Skip     | -                                      | -                                         | -                             |
| 1         | 1    | 0                                 | Continue | Initial value                          | 1                                         | dp[1] := ~~Initial value~~ 1  |
| 2         | 5    | -3                                | Skip     | -                                      | -                                         | -                             |
| 2         | 2    | 0                                 | Continue | Initial value                          | 1                                         | dp[2] := ~~Initial value~~ 1  |
| 2         | 1    | 1                                 | Continue | 1                                      | 2                                         | Keep                          |
| 3         | 5    | -2                                | Skip     | -                                      | -                                         | -                             |
| 3         | 2    | 1                                 | Continue | Initial value                          | 2                                         | dp[3] := ~~Initial value~~ 2  |
| 3         | 1    | 2                                 | Continue | 2                                      | 2                                         | Keep                          |
| 4         | 5    | -1                                | Skip     | -                                      | -                                         | -                             |
| 4         | 2    | 2                                 | Continue | Initial value                          | 2                                         | dp[4] := ~~Initial value~~ 2  |
| 4         | 1    | 3                                 | Continue | 2                                      | 3                                         | Keep                          |
| 5         | 5    | 0                                 | Continue | Initial value                          | 1                                         | dp[5] := ~~Initial value~~ 1  |
| 5         | 2    | 3                                 | Continue | 1                                      | 3                                         | Keep                          |
| 5         | 1    | 4                                 | Continue | 1                                      | 3                                         | Keep                          |
| 6         | 5    | 1                                 | Continue | Initial value                          | 2                                         | dp[6] := ~~Initial value~~ 2  |
| 6         | 2    | 4                                 | Continue | 2                                      | 3                                         | Keep                          |
| 6         | 1    | 5                                 | Continue | 2                                      | 2                                         | Keep                          |
| 7         | 5    | 2                                 | Continue | Initial value                          | 2                                         | dp[7] := ~~Initial value~~ 2  |
| 7         | 2    | 5                                 | Continue | 2                                      | 2                                         | Keep                          |
| 7         | 1    | 6                                 | Continue | 2                                      | 3                                         | Keep                          |
| 8         | 5    | 3                                 | Continue | Initial value                          | 3                                         | dp[8] := ~~Initial value~~ 3  |
| 8         | 2    | 6                                 | Continue | 3                                      | 3                                         | Keep                          |
| 8         | 1    | 7                                 | Continue | 3                                      | 3                                         | Keep                          |
| 9         | 5    | 4                                 | Continue | Initial value                          | 3                                         | dp[9] := ~~Initial value~~ 3  |
| 9         | 2    | 7                                 | Continue | 3                                      | 3                                         | Keep                          |
| 9         | 1    | 8                                 | Continue | 3                                      | 4                                         | Keep                          |
| 10        | 5    | 5                                 | Continue | Initial value                          | 2                                         | dp[10] := ~~Initial value~~ 2 |
| 10        | 2    | 8                                 | Continue | 2                                      | 4                                         | Keep                          |
| 10        | 1    | 9                                 | Continue | 2                                      | 4                                         | Keep                          |
| 11        | 5    | 6                                 | Continue | Initial value                          | 3                                         | dp[11] := ~~Initial value~~ 3 |
| 11        | 2    | 9                                 | Continue | 3                                      | 4                                         | Keep                          |
| 11        | 1    | 10                                | Continue | 3                                      | 3                                         | Keep                          |

After reaching all possible coin choices and the final amount, we can then get the minimum number of coins as `dp[11] = 3`.

# References

- https://betterprogramming.pub/learn-dynamic-programming-the-coin-change-problem-22a104478f50
- https://stackoverflow.com/questions/6164629/what-is-the-difference-between-bottom-up-and-top-down
- https://acm.wustl.edu/cse232/fundamentals.md
