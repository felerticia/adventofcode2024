const fs = require("fs");

fs.readFile("11.txt", "utf-8", (err, input) => {
  let stones = input.split(" ").map(Number);

  for (let i = 0; i < 25; i++) {
    const newStones = [];

    stones.forEach((stone) => {
      if (stone === 0) {
        newStones.push(1);
      } else if (stone.toString().length % 2 === 0) {
        const str = stone.toString();
        const midPoint = str.length / 2;
        const left = parseInt(str.slice(0, midPoint), 10);
        const right = parseInt(str.slice(midPoint), 10);
        newStones.push(left, right);
      } else {
        newStones.push(stone * 2024);
      }
    });

    stones = newStones;
  }

  console.log(stones.length);
});
