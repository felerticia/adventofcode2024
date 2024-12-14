const fs = require("fs");

function doIntersectHorizontalVertical(line1, line2) {
  // Destructure line coordinates
  const [x1, y1, x2, y2] = line1;
  const [x3, y3, x4, y4] = line2;

  // Check if line1 is horizontal and line2 is vertical
  if (y1 === y2 && x3 === x4) {
    // Horizontal line: y = y1, x between [x1, x2]
    // Vertical line: x = x3, y between [y3, y4]
    if (x1 < x3 && x3 < x2 && y3 < y1 && y1 < y4) {
      return true;
    }
  }

  // Check if line1 is vertical and line2 is horizontal
  if (x1 === x2 && y3 === y4) {
    // Vertical line: x = x1, y between [y1, y2]
    // Horizontal line: y = y3, x between [x3, x4]
    if (y1 < y3 && y3 < y2 && x3 < x1 && x1 < x4) {
      return true;
    }
  }

  return false;
}

// Function to count intersections that are not at endpoints
function countMiddleIntersections(lines) {
  let count = 0;
  for (let i = 0; i < lines.length; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      if (doIntersectHorizontalVertical(lines[i], lines[j])) {
        count += 2;
      }
    }
  }
  return count;
}

fs.readFile("12.txt", "utf-8", (err, input) => {
  const grid = input.split("\n").map((row) => row.split(""));

  const rows = grid.length;
  const cols = grid[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const directions = {
    r: [0, 1],
    l: [0, -1],
    d: [1, 0],
    u: [-1, 0],
  };

  function isInside(x, y) {
    return x >= 0 && y >= 0 && x < rows && y < cols;
  }

  function process(x, y, char) {
    let count = 0;
    let sides = [];
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

      for (const dir in directions) {
        const [dx, dy] = directions[dir];
        const newX = curX + dx;
        const newY = curY + dy;

        if (!isInside(newX, newY) || grid[newX][newY] !== char) {
          if (dir === "u") {
            const lIdx = sides.findIndex(
              (side) => side[2] === curX && side[3] === curY && side[0] === curX
            );
            const rIdx = sides.findIndex(
              (side) =>
                side[0] === curX && side[1] === curY + 1 && side[2] === curX
            );
            if (lIdx !== -1 && rIdx !== -1) {
              sides[lIdx][3] = sides[rIdx][3];
              sides = sides.slice(0, rIdx).concat(sides.slice(rIdx + 1));
            } else if (lIdx !== -1) {
              sides[lIdx][3]++;
            } else if (rIdx !== -1) {
              sides[rIdx][1]--;
            } else {
              sides.push([curX, curY, curX, curY + 1]);
            }
          }
          if (dir === "d") {
            const lIdx = sides.findIndex(
              (side) =>
                side[2] === curX + 1 && side[3] === curY && side[0] === curX + 1
            );
            const rIdx = sides.findIndex(
              (side) =>
                side[0] === curX + 1 &&
                side[1] === curY + 1 &&
                side[2] === curX + 1
            );
            if (lIdx !== -1 && rIdx !== -1) {
              sides[lIdx][3] = sides[rIdx][3];
              sides = sides.slice(0, rIdx).concat(sides.slice(rIdx + 1));
            } else if (lIdx !== -1) {
              sides[lIdx][3]++;
            } else if (rIdx !== -1) {
              sides[rIdx][1]--;
            } else {
              sides.push([curX + 1, curY, curX + 1, curY + 1]);
            }
          }
          if (dir === "l") {
            const uIdx = sides.findIndex(
              (side) => side[2] === curX && side[3] === curY && side[1] === curY
            );
            const dIdx = sides.findIndex(
              (side) =>
                side[0] === curX + 1 && side[1] === curY && side[3] === curY
            );
            if (uIdx !== -1 && dIdx !== -1) {
              sides[uIdx][2] = sides[dIdx][2];
              sides = sides.slice(0, dIdx).concat(sides.slice(dIdx + 1));
            } else if (uIdx !== -1) {
              sides[uIdx][2]++;
            } else if (dIdx !== -1) {
              sides[dIdx][0]--;
            } else {
              sides.push([curX, curY, curX + 1, curY]);
            }
          }
          if (dir === "r") {
            const uIdx = sides.findIndex(
              (side) =>
                side[2] === curX && side[3] === curY + 1 && side[1] === curY + 1
            );
            const dIdx = sides.findIndex(
              (side) =>
                side[0] === curX + 1 &&
                side[1] === curY + 1 &&
                side[3] === curY + 1
            );
            if (uIdx !== -1 && dIdx !== -1) {
              sides[uIdx][2] = sides[dIdx][2];
              sides = sides.slice(0, dIdx).concat(sides.slice(dIdx + 1));
            } else if (uIdx !== -1) {
              sides[uIdx][2]++;
            } else if (dIdx !== -1) {
              sides[dIdx][0]--;
            } else {
              sides.push([curX, curY + 1, curX + 1, curY + 1]);
            }
          }
        } else if (!visited[newX][newY]) {
          stack.push([newX, newY]);
        }
      }
    }

    const extraInnerIntersections = countMiddleIntersections(sides);

    return { count, sides: sides.length + extraInnerIntersections };
  }

  const regions = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (!visited[i][j]) {
        const char = grid[i][j];
        const region = process(i, j, char);
        regions.push({ count: region.count, sides: region.sides });
      }
    }
  }

  const processed = regions.reduce((acc, v) => {
    acc += v.count * v.sides;
    return acc;
  }, 0);
  console.log(processed);
});
