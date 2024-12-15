const fs = require("fs");

fs.readFile("14.txt", "utf-8", (err, input) => {
  const lines = input.trim().split("\n");

  const cols = 103;
  const rows = 101;

  const robots = [];

  for (const line of lines) {
    const match = line.match(/p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/);
    if (match) {
      const [, x, y, vx, vy] = match.map(Number);
      robots.push({ x, y, vx, vy });
    }
  }

  for (let n = 1; n < 1_000_000; n++) {
    const grid = Array.from({ length: cols }, () => Array(rows).fill("."));
    const locations = new Map();
    let duplicate = false;

    for (const r of robots) {
      r.x = (r.x + r.vx) % rows;
      r.y = (r.y + r.vy) % cols;

      while (r.x < 0) r.x += rows;
      while (r.y < 0) r.y += cols;

      const key = `${r.y},${r.x}`;
      if (locations.has(key)) {
        duplicate = true;
        continue;
      }
      locations.set(key, true);
      grid[r.y][r.x] = "#";
    }

    if (duplicate) continue;

    console.log(n);
    for (const row of grid) {
      console.log(row.join(""));
    }
    return;
  }
});
