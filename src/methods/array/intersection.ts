/**
 * Intersection of unique elements from two arrays
 * Time complexity O(n) where n is the length of both the first and second arrays,
 * Space complexity O(n) where n is the length of the first array
 * @see https://github.com/kennymkchan/interview-questions-in-javascript#array--intersection
 * @param first
 * @param second
 * @returns Intersected array
 */
export const intersection = (first: number[], second: number[]) => {
  // The logic here is to create a hashmap with the elements of the firstArray as the keys.
  // After that, you can use the hashmap's O(1) look up time to check if the element exists in the hash
  // If it does exist, add that element to the new array.

  const hashmap: Record<number, number | undefined> = {};
  const intersectionArray: number[] = [];

  first.forEach((element) => {
    hashmap[element] = 1;
  });

  // Since we only want to push unique elements in our case... we can implement a counter to keep track of what we already added
  second.forEach((element) => {
    const val = hashmap[element];
    if (val === 1) {
      intersectionArray.push(element);
      hashmap[element] = val + 1;
    }
  });

  return intersectionArray;
};
