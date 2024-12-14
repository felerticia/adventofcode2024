const fs = require("fs");

fs.readFile("12.txt", "utf-8", (err, input) => {
  const grid = input.split("\n").map((row) => row.split(""));

  const rows = grid.length;
  const cols = grid[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  function isInside(x, y) {
    return x >= 0 && y >= 0 && x < rows && y < cols;
  }

  function process(x, y, char) {
    let count = 0;
    let perimeter = 0;
    const stack = [[x, y]];

    while (stack.length) {
      const [curX, curY] = stack.pop();

      if (
        !isInside(curX, curY) ||
        visited[curX][curY] ||
        grid[curX][curY] !== char
      ) {
        continue;
      }

      visited[curX][curY] = true;
      count++;

      for (const [dx, dy] of directions) {
        const newX = curX + dx;
        const newY = curY + dy;

        if (!isInside(newX, newY) || grid[newX][newY] !== char) {
          perimeter++;
        } else if (!visited[newX][newY]) {
          stack.push([newX, newY]);
        }
      }
    }

    return { count, perimeter };
  }

  const regions = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (!visited[i][j]) {
        const char = grid[i][j];
        const region = process(i, j, char);
        regions.push({ count: region.count, perimeter: region.perimeter });
      }
    }
  }

  const processed = regions.reduce((acc, v) => {
    acc += v.count * v.perimeter;
    return acc;
  }, 0);
  console.log(processed);
});
