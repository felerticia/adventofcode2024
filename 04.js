const fs = require("fs");

fs.readFile("04.txt", "utf-8", (err, data) => {
  // Part I
  const table = data.split("\n").map((row) => row.split(""));
  const rows = table.length;
  const cols = table[0].length;
  const word = "XMAS".split("");
  let count = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (word.every((char, idx) => char === table?.[i]?.[j + idx])) count++;
      if (word.every((char, idx) => char === table?.[i]?.[j - idx])) count++;
      if (word.every((char, idx) => char === table?.[i + idx]?.[j])) count++;
      if (word.every((char, idx) => char === table?.[i - idx]?.[j])) count++;
      if (word.every((char, idx) => char === table?.[i + idx]?.[j + idx]))
        count++;
      if (word.every((char, idx) => char === table?.[i + idx]?.[j - idx]))
        count++;
      if (word.every((char, idx) => char === table?.[i - idx]?.[j + idx]))
        count++;
      if (word.every((char, idx) => char === table?.[i - idx]?.[j - idx]))
        count++;
    }
  }

  console.log(count);

  // Part II
  // M M     M S     S S     S M
  //  A       A       A       A
  // S S     M S     M M     S M
  count = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (table[i][j] === "A") {
        if (
          table?.[i - 1]?.[j - 1] === "M" &&
          table?.[i - 1]?.[j + 1] === "M" &&
          table?.[i + 1]?.[j - 1] === "S" &&
          table?.[i + 1]?.[j + 1] === "S"
        )
          count++;
        if (
          table?.[i - 1]?.[j - 1] === "M" &&
          table?.[i - 1]?.[j + 1] === "S" &&
          table?.[i + 1]?.[j - 1] === "M" &&
          table?.[i + 1]?.[j + 1] === "S"
        )
          count++;
        if (
          table?.[i - 1]?.[j - 1] === "S" &&
          table?.[i - 1]?.[j + 1] === "S" &&
          table?.[i + 1]?.[j - 1] === "M" &&
          table?.[i + 1]?.[j + 1] === "M"
        )
          count++;
        if (
          table?.[i - 1]?.[j - 1] === "S" &&
          table?.[i - 1]?.[j + 1] === "M" &&
          table?.[i + 1]?.[j - 1] === "S" &&
          table?.[i + 1]?.[j + 1] === "M"
        )
          count++;
      }
    }
  }
  console.log(count);
});
