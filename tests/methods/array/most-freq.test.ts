import { expect } from "chai";
import { mostFrequentMeal } from "../../../src/methods/array/most-freq";

/**
 * You are given as an array of strings the representation of each time we sold a
 * meal in a restaurant.
 * The meal is represented by its ID.
 */
describe("Most frequent", () => {
  (
    [[["pizza", "pasta", "pizza", "salad"], "pizza"]] as [string[], string][]
  ).forEach(([actual, expected]) => {
    describe(`Key function`, () => {
      it(`should know that ${expected} is the most seen meal in this restaurant`, () => {
        const output = mostFrequentMeal(actual);
        expect(expected).to.equal(output);
      });
    });
  });
  (
    [[["apple", "apple", "apple", "salad", "salad", "salad"], "apple"]] as [
      string[],
      string,
    ][]
  ).forEach(([actual, expected]) => {
    describe(`If two meals are spotted the same amount of time...`, () => {
      it(`...should then return the meal with the lowest ID.`, () => {
        const output = mostFrequentMeal(actual);
        expect(expected).to.equal(output);
      });
    });
  });
});
