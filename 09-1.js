const fs = require("fs");

fs.readFile("09.txt", "utf-8", (err, input) => {
  const data = input.split("").map(Number);

  const unpackedDisk = [];

  for (let i = 0; i < data.length; i++) {
    for (let j = data[i]; j > 0; j--) {
      if (i % 2 === 0) {
        unpackedDisk.push(i / 2);
      } else {
        unpackedDisk.push(".");
      }
    }
  }

  // defrag
  unpackedDisk.forEach((block, index) => {
    if (block === ".") {
      while (true) {
        const temp = unpackedDisk.pop();
        if (temp === ".") {
          continue;
        } else {
          unpackedDisk[index] = temp;
          break;
        }
      }
    }
  });
  console.log(unpackedDisk);

  let checksum = 0;

  unpackedDisk.forEach((block, id) => {
    checksum += block * id;
  });

  console.log(checksum);
});
