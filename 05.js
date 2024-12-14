const fs = require("fs");

const orderList = (update, rules) => {
  //97,13,75,29,47
  const dic = {};
  const ordered = [];

  update.forEach((page) => {
    dic[page] = rules
      .filter((rule) => rule[0] === page)
      .map((rule) => rule[1])
      .filter((rule) => update.includes(rule));
  });

  while (Object.keys(dic).length) {
    // Find the key with an empty array
    const lastPage = Object.keys(dic).find((key) => dic[key].length === 0);

    // Remove the key from all values
    for (const key in dic) {
      dic[key] = dic[key].filter((item) => item !== lastPage);
    }

    // Remove the key-value pair from the dictionary
    delete dic[lastPage];

    ordered.unshift(lastPage);
  }

  return ordered;
};

const isOrdered = (update, rules) => {
  //75,47,61,53,29 75|47
  for (let i = 0; i < update.length - 1; i++) {
    if (
      !rules.find((rule) => rule[0] === update[i] && rule[1] === update[i + 1])
    ) {
      return false;
    }
  }
  return true;
};

fs.readFile("05.txt", "utf-8", (err, data) => {
  let [rules, updates] = data.split("\n\n");

  rules = rules.split("\n").map((rule) => rule.split("|"));
  updates = updates.split("\n").map((x) => x.split(","));

  // Part I
  const part1 = updates.reduce((acc, update) => {
    if (!isOrdered(update, rules)) return acc;

    const midIndex = Math.floor(update.length / 2);
    const mid = parseInt(update[midIndex]);
    acc += mid;
    return acc;
  }, 0);
  //console.log({ part1 });

  // Part II
  const part2 = updates.reduce((acc, update) => {
    if (isOrdered(update, rules)) {
      return acc;
    }

    update = orderList(update, rules);
    const midIndex = Math.floor(update.length / 2);
    const mid = parseInt(update[midIndex]);
    acc += mid;

    return acc;
  }, 0);
  console.log({ part2 });
});
