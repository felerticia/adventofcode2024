const fs = require("fs");

fs.readFile("10.txt", "utf-8", (err, data) => {
  const input = data.split("\n").map((x) => x.split("").map(Number));

  let zeros = [];
  for (let i = 0; i < input.length; i++)
    for (let j = 0; j < input[i].length; j++)
      if (input[i][j] == 0) zeros.push([i, j]);

  function findNext(pos) {
    let current = input[pos[0]][pos[1]],
      next = [];

    if (input[pos[0] + 1]?.[pos[1]] == current + 1)
      next.push([pos[0] + 1, pos[1]]);
    if (input[pos[0] - 1]?.[pos[1]] == current + 1)
      next.push([pos[0] - 1, pos[1]]);
    if (input[pos[0]][pos[1] + 1] == current + 1)
      next.push([pos[0], pos[1] + 1]);
    if (input[pos[0]][pos[1] - 1] == current + 1)
      next.push([pos[0], pos[1] - 1]);

    return next;
  }

  let paths = 0;
  zeros.forEach((pos) => {
    let queue = [pos];
    while (queue.length) {
      let candidates = [];
      queue.forEach((pos) => {
        if (input[pos[0]][pos[1]] == 9) paths++;
        else candidates.push(...findNext(pos));
      });
      // found.forEach((pos, i) => {
      //   for (let j = i + 1; j < found.length; j++)
      //     if (found[j][0] == pos[0] && found[j][1] == pos[1]) found[j] = [];
      // });
      queue = candidates.filter((x) => x.length);
    }
  });

  console.log(paths);
});
