const fs = require("fs");

fs.readFile("01.txt", "utf-8", (err, data) => {
  const arr = data.split("\n").map((row) => row.split("   "));

  const left = arr.map(([leftItem]) => +leftItem).sort();
  const right = arr.map(([, rightItem]) => +rightItem).sort();

  // Part I
  let sum = 0;
  for (let i = 0; i < left.length; i++) {
    sum += Math.abs(right[i] - left[i]);
  }
  console.log(sum);

  // Part II
  sum = 0;
  for (let i = 0; i < left.length; i++) {
    const number = left[i];
    const leftIdx = right.indexOf(number);
    if (leftIdx === -1) {
      continue;
    }

    const rightIdx = right.lastIndexOf(number);
    sum += (rightIdx - leftIdx + 1) * number;
  }
  console.log(sum);
});
