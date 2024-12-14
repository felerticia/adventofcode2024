const fs = require("fs");
const checkSequence = (row) => {
  const isIncreasing = row[1] > row[0];
  const isDecreasing = row[1] < row[0];

  for (let i = 1; i < row.length; i++) {
    const diff = row[i] - row[i - 1];

    // Check if difference is at least 1 and at most 3
    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) return false;

    // Check if the sequence maintains a consistent trend
    if (isIncreasing && diff <= 0) return false; // Increasing but found a decrease or no change
    if (isDecreasing && diff >= 0) return false; // Decreasing but found an increase or no change
  }
  return true;
};
fs.readFile("02.txt", "utf-8", (err, data) => {
  const arr = data.split("\n").map((row) => row.split(" ").map(Number));

  // Part I
  let safe = 0;
  arr.forEach((row) => {
    if (checkSequence(row)) safe++;
  });
  console.log(safe);

  // Part II
  safe = 0;
  arr.forEach((row) => {
    if (checkSequence(row)) {
      safe++;
      return;
    } else {
      for (let i = 0; i < row.length; i++) {
        const modifiedArr = row.slice(0, i).concat(row.slice(i + 1)); // Remove one element
        if (checkSequence(modifiedArr)) {
          safe++;
          return;
        }
      }
    }
  });
  console.log(safe);
});
