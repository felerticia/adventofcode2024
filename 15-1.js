const fs = require("fs");

const directionsMap = {
  "^": { x: 0, y: -1 },
  ">": { x: 1, y: 0 },
  v: { x: 0, y: 1 },
  "<": { x: -1, y: 0 },
};

fs.readFile("15.txt", "utf-8", (err, input) => {
  const parts = input
    .trim()
    .split("\n\n")
    .map((lines) => lines.split("\n"));
  const grid = parts[0].map((line) => line.split(""));
  const instructions = parts[1].join("");
  const width = grid[0].length;
  const height = grid.length;

  const moveBox = (position, direction) => {
    const next = { x: position.x + direction.x, y: position.y + direction.y };

    if (grid[next.y][next.x] === ".") {
      // if next spot is empty, swap positions
      let temp = grid[position.y][position.x];
      grid[position.y][position.x] = grid[next.y][next.x];
      grid[next.y][next.x] = temp;
      return true;
    } else if (grid[next.y][next.x] === "#") {
      // if next spot is a wall, stop all boxes from moving
      return false;
    } else {
      // only move the current box if the next box can move
      if (moveBox(next, direction)) {
        let temp = grid[position.y][position.x];
        grid[position.y][position.x] = grid[next.y][next.x];
        grid[next.y][next.x] = temp;
        return true;
      }
    }
  };

  // find the robot and clear it spaces
  let robot = {};
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (grid[x][y] === "@") {
        robot = { x, y };
      }
    }
  }

  for (let i = 0; i < instructions.length; i++) {
    const direction = directionsMap[instructions[i]];
    const position = { x: robot.x + direction.x, y: robot.y + direction.y };

    // if there is a wall, don't move
    if (grid[position.y][position.x] !== "#") {
      // if there is an emprt spot, move without moving boxes
      if (grid[position.y][position.x] === ".") robot = position;

      // if there is a box, try to move all the boxes, then move
      if (grid[position.y][position.x] === "O") {
        if (moveBox(position, direction)) {
          robot = position;
        }
      }
    }
  }

  let score = 0;
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (grid[x][y] === "O") score += x * 100 + y;
    }
  }

  console.log(score);
});
