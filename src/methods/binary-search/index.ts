const binarySearch = <T>(
  list: T[],
  getValue: (val: T) => number,
  valueToLookup: number,
) => {
  let startIndex = 0;
  let endIndex = list.length - 1;

  while (startIndex <= endIndex) {
    // Find the mid index
    let mid = Math.floor((startIndex + endIndex) / 2);
    if (getValue(list[mid]) === valueToLookup) {
      return mid;
    }

    if (getValue(list[mid]) < valueToLookup) {
      startIndex = mid + 1;
    } else {
      endIndex = mid - 1;
    }
  }

  return -1;
};

export { binarySearch };
