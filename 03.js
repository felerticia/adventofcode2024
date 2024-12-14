const fs = require("fs");

fs.readFile("03.txt", "utf-8", (err, data) => {
  // Part I
  const pattern = /mul\(\d{1,3},\d{1,3}\)/g;
  const instructions = data.match(pattern);
  console.log(instructions);
  let sum = instructions.reduce((acc, instruction) => {
    const [left, right] = instruction.match(/\d{1,3}/g);
    acc += left * right;

    return acc;
  }, 0);
  console.log(sum);

  // Part II
  const pattern2 = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g;
  const instructions2 = data.match(pattern2);

  let isEnabled = true;
  let sum2 = instructions2.reduce((acc, instruction) => {
    if (instruction === "do()") {
      isEnabled = true;
    } else if (instruction === "don't()") {
      isEnabled = false;
    } else if (isEnabled) {
      const numbers = instruction.match(/\d{1,3}/g);
      if (numbers) {
        const [left, right] = numbers.map(Number); // Convert strings to numbers
        acc += left * right;
      }
    }
    return acc;
  }, 0);
  console.log(sum2);
});
