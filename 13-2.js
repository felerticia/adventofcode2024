const fs = require("fs");

fs.readFile("13.txt", "utf-8", (err, input) => {
  const machines = input.split("\n\n").map((m) => m.match(/\d+/g).map(Number));

  function tokens([aX, aY, bX, bY, pX, pY]) {
    // aX * a + bX * b = pX
    // aY * a + bY * b = pY
    const a = (pX * bY - pY * bX) / (aX * bY - aY * bX);
    const b = (aX * pY - aY * pX) / (aX * bY - aY * bX);
    return Number.isInteger(a) && Number.isInteger(b) ? a * 3 + b : 0;
  }

  const e = machines.reduce((acc, machine) => {
    machine[4] = machine[4] + Math.pow(10, 13);
    machine[5] = machine[5] + Math.pow(10, 13);
    return acc + tokens(machine);
  }, 0);

  console.log(e);
});
