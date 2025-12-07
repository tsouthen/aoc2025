// prettier-ignore
const sampleData =
  "123 328  51 64 \n" +
  " 45 64  387 23 \n" +
  "  6 98  215 314\n" +
  "*   +   *   +  ";

export function solve(input: string) {
  const p1 = solve1(input);
  const p2 = solve2(input);
  return { part1: p1, part2: p2 };
}

function solve1(input: string) {
  const lines = input.split("\n");
  const operations = lines.pop()!.trim().split(/\s+/);
  const numbers = lines.map((line) => line.trim().split(/\s+/).map(Number));

  let overallSum = 0;
  for (let col = 0; col < operations.length; col++) {
    const op = operations[col];
    let colValues = numbers.map((row) => row[col]);
    overallSum += colValues.reduce((a, b) => (op === "+" ? a + b : a * b), op === "+" ? 0 : 1);
  }
  return overallSum;
}

function solve2(input: string) {
  // load input into a 2d char array
  const grid = input.split("\n");
  const operations = grid.pop()!.match(/\S\s+/g);

  let overallSum = 0;
  let currentCol = 0;
  for (const operation of operations!) {
    const width = operation.length;
    const op = operation.trim();
    let currValue = op === "+" ? 0 : 1;
    for (let col = currentCol; col < currentCol + width; col++) {
      let valChars = "";
      for (let row = 0; row < grid.length; row++) {
        const char = grid[row][col];
        valChars += char;
      }
      valChars = valChars.trim();
      if (valChars.length) {
        const val = Number(valChars);
        currValue = op === "+" ? currValue + val : currValue * val;
      }
    }
    overallSum += currValue;
    currentCol += width;
  }
  return overallSum;
}

// Day 6 result: { part1: 5060053676136, part2: 9695042567249 }
