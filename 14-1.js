const fs = require("fs");

fs.readFile("14.txt", "utf-8", (err, data) => {
  function getRobotsCount(a, b, c, d) {
    let count = 0;
    for (let i = a; i < b; i++) {
      for (let j = c; j < d; j++) {
        for (const position of positions) {
          if (i === position[0] && j === position[1]) {
            count++;
          }
        }
      }
    }
    return count;
  }

  const input = data.split("\n");

  const cols = 103;
  const rows = 101;

  let positions = [];
  let velocities = [];

  for (const line of input) {
    const [a, b] = line.split(" ");
    const position = a.split("=")[1].split(",").map(Number);
    const velocity = b.split("=")[1].split(",").map(Number);
    positions.push([position[1], position[0]]);
    velocities.push([velocity[1], velocity[0]]);
  }

  for (let i = 1; i <= 100; i++) {
    for (let i = 0; i < positions.length; i++) {
      positions[i][0] = (positions[i][0] + velocities[i][0] + cols) % cols;
      positions[i][1] = (positions[i][1] + velocities[i][1] + rows) % rows;
    }
  }

  const quad1 = getRobotsCount(
    0,
    Math.floor(cols / 2),
    0,
    Math.floor(rows / 2)
  );
  const quad2 = getRobotsCount(
    Math.floor(cols / 2) + 1,
    cols,
    0,
    Math.floor(rows / 2)
  );
  const quad3 = getRobotsCount(
    0,
    Math.floor(cols / 2),
    Math.floor(rows / 2) + 1,
    rows
  );
  const quad4 = getRobotsCount(
    Math.floor(cols / 2) + 1,
    cols,
    Math.floor(rows / 2) + 1,
    rows
  );

  console.log(quad1 * quad2 * quad3 * quad4);
});
