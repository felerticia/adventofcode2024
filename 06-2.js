const fs = require("fs");

fs.readFile("06.txt", "utf-8", (err, data) => {
  const detectInfiniteLoop = (grid, startX, startY, startDirection) => {
    const directions = [
      { dx: -1, dy: 0 }, // Up
      { dx: 0, dy: 1 }, // Right
      { dx: 1, dy: 0 }, // Down
      { dx: 0, dy: -1 }, // Left
    ];

    const rows = grid.length;
    const cols = grid[0].length;

    let x = startX;
    let y = startY;
    let direction = startDirection;
    const visited = new Set(); // Tracks visited positions with direction

    while (true) {
      // Create a unique key for the current position and direction
      const state = `${x},${y},${direction}`;

      // If we have already visited this state, we are in an infinite loop
      if (visited.has(state)) {
        return true;
      }

      visited.add(state);

      // Calculate next position
      const nextX = x + directions[direction].dx;
      const nextY = y + directions[direction].dy;

      // Check if the guard is leaving the grid
      if (nextX < 0 || nextX >= rows || nextY < 0 || nextY >= cols) {
        return false; // No infinite loop
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
  };

  const getStartingPosition = () => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] !== "." && grid[i][j] !== "#") return [i, j];
      }
    }
  };

  const grid = data.split("\n").map((row) => row.split(""));

  const [startX, startY] = getStartingPosition();
  const startDirection = 0;

  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // Skip cells that are not free
      if (grid[i][j] !== ".") continue;

      // Temporarily add an obstacle at (i, j)
      grid[i][j] = "#";

      // Check if adding this obstacle causes an infinite loop
      if (detectInfiniteLoop(grid, startX, startY, startDirection)) {
        count++;
      }

      // Remove the obstacle
      grid[i][j] = ".";
    }
  }

  console.log({ part2: count });
});
