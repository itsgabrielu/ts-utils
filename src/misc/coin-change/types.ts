/**
 * Value of a coin option
 *
 * Assuming coin values are positive integers
 */
export type CoinDenomination = number;
/**
 * Any positive integer less than or equal to the amount
 * or a positive integer that can obtained from subtracting
 * any CoinDenomination from the amount
 */
export type Amount = number;
/**
 * Number of coins in a selection
 *
 * `-1` -> Invalid selection
 */
export type CoinSelectionLength = number;
