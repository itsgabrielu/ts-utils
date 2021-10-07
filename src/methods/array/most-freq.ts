// You are given as an array of strings the representation of each time we sold a
// meal in a restaurant.
// The meal is represented by its ID.
//
// Goal:
// - create a function called "mostFrequentMeal" which returns the most seen meal in
//   this restaurant
// - if two meals are spotted the same amount of time, we should then return the meal
//   with the lowest ID
//
// Examples:
// [1, 2, 3, 3] => 3
// [1] => 1
// [1, 4, 4, 4, 5, 3, 1, 1] => 1

// Most frequent -> Lower ID
export function mostFrequentMeal(meals: string[]) {
  const obj: Record<string, number> = {};
  meals.forEach((mealId) => {
    if (typeof obj[mealId] === "number") {
      obj[mealId] = obj[mealId] + 1;
    } else {
      obj[mealId] = 1;
    }
  });
  const [mostFreqMeal, nr] = Object.keys(obj).reduce(
    ([accMealId, nr], mealId) => {
      if (obj[mealId] === nr && mealId < `${accMealId}`) {
        return [mealId, obj[mealId]] as [string | undefined, number];
      }
      if (obj[mealId] > nr) {
        return [mealId, obj[mealId]] as [string | undefined, number];
      }
      return [accMealId, nr] as [string | undefined, number];
    },
    [undefined, 0] as [string | undefined, number],
  );
  return mostFreqMeal;
}
