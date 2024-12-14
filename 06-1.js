const fs = require("fs");

fs.readFile("06.txt", "utf-8", (err, data) => {
  const getStartingPosition = () => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] !== "." && grid[i][j] !== "#") return [i, j];
      }
    }
  };

  const grid = data.split("\n").map((row) => row.split(""));
  const rows = grid.length;
  const cols = grid[0].length;
  let [x, y] = getStartingPosition();

  const directions = [
    { dx: -1, dy: 0 }, // Up
    { dx: 0, dy: 1 }, // Right
    { dx: 1, dy: 0 }, // Down
    { dx: 0, dy: -1 }, // Left
  ];
  let direction = 0; // 0: Up, 1: Right, 2: Down, 3: Left

  const visited = new Set();

  while (true) {
    visited.add(`${x},${y}`);

    // Calculate next position
    const nextX = x + directions[direction].dx;
    const nextY = y + directions[direction].dy;

    // Check if the guard is leaving the grid
    if (nextX < 0 || nextX >= rows || nextY < 0 || nextY >= cols) {
      break;
    }

    // Check if there's an obstacle at the next position
    if (grid[nextX][nextY] === "#") {
      // Turn 90 degrees to the right
      direction = (direction + 1) % 4;
    } else {
      // Move forward
      x = nextX;
      y = nextY;
    }
  }
  console.log({ part1: visited.size });
});
