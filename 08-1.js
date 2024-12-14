const fs = require("fs");

fs.readFile("08.txt", "utf-8", (err, data) => {
  const grid = data.split("\n");
  const gridSize = grid.length;

  const antennas = [];
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      if (grid[x][y] !== ".") {
        antennas.push({
          char: grid[x][y],
          x: x,
          y: y,
        });
      }
    }
  }

  const antiNodes = new Set();
  antennas.forEach((a) => {
    antennas.forEach((b) => {
      if (a.char !== b.char || a === b) return;

      const dY = b.y - a.y;
      const dX = b.x - a.x;
      const newPoint = {
        y: b.y + dY,
        x: b.x + dX,
      };

      if (
        newPoint.y < 0 ||
        newPoint.x < 0 ||
        newPoint.x >= gridSize ||
        newPoint.y >= gridSize
      )
        return;

      antiNodes.add(`${newPoint.x}|${newPoint.y}`);
    });
  });

  console.log(antiNodes.size);
});
