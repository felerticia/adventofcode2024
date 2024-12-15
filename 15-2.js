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

  const walls = new Set();
  const boxes = [];
  let robot = { x: 0, y: 0 };
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (grid[y][x] === "@") robot = { x: x * 2, y };
      if (grid[y][x] === "#") {
        walls.add(`${x * 2},${y}`);
        walls.add(`${x * 2 + 1},${y}`);
      }
      if (grid[y][x] === "O") boxes.push({ x: x * 2, y });
    }
  }

  const moveBox = (collidedBox, direction, movements) => {
    // try both positions of the moved box
    const next = [
      { x: collidedBox.x + direction.x, y: collidedBox.y + direction.y },
      { x: collidedBox.x + 1 + direction.x, y: collidedBox.y + direction.y },
    ];

    // if collided with a wall, stop all movements
    for (let i = 0; i < next.length; i++) {
      if (walls.has(`${next[i].x},${next[i].y}`)) {
        return false;
      }
    }

    // find all boxes that are collided with
    const collidedBoxes = boxes.filter((box) => {
      for (let i = 0; i < next.length; i++) {
        if (box.x === collidedBox.x && box.y === collidedBox.y) return false;
        if (
          (box.x === next[i].x || box.x + 1 === next[i].x) &&
          box.y === next[i].y
        )
          return true;
      }
      return false;
    });

    // if there are no collided boxes, all movements are good
    if (collidedBoxes.length === 0) return true;

    // check for conflicts
    let conflicts = false;
    for (const box of collidedBoxes) {
      if (moveBox(box, direction, movements)) {
        // if box can move and we haven't already processed the movement, add to list of movements
        if (
          movements
            .map((movement) => movement.box)
            .find((b) => b.x === box.x && b.y === box.y) === undefined
        ) {
          movements.push({
            box,
            direction,
          });
        }
      } else {
        // if box can't move, prevent any movements from happening
        conflicts = true;
        break;
      }
    }

    return !conflicts;
  };

  for (let i = 0; i < instructions.length; i++) {
    const direction = directionsMap[instructions[i]];
    const position = { x: robot.x + direction.x, y: robot.y + direction.y };

    // only try to move if no wall is in the way
    if (!walls.has(`${position.x},${position.y}`)) {
      const collidedBox = boxes.find(
        (box) =>
          (box.x === position.x || box.x + 1 === position.x) &&
          box.y === position.y
      );

      // if there is a collided box, try to move all affected
      if (collidedBox !== undefined) {
        let movements = [];
        if (moveBox(collidedBox, direction, movements)) {
          for (const movement of movements) {
            movement.box.x += movement.direction.x;
            movement.box.y += movement.direction.y;
          }
          collidedBox.x += direction.x;
          collidedBox.y += direction.y;
          robot = position;
        }
      } else robot = position;
    }
  }

  let score = 0;

  for (const box of boxes) {
    score += box.y * 100 + box.x;
  }

  console.log(score);
});
