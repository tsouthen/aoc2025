const sampleData = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`;

export function solve(input: string) {
  const p1 = solve1(input);
  const p2 = solve2(p1.grid);
  return { part1: p1.numSplits, part2: p2 };
}

function solve1(input: string) {
  const grid = input.split("\n").map((line) => line.split(""));
  const numCols = grid[0].length;
  let numSplits = 0;
  for (let row = 1; row < grid.length; row++) {
    for (let col = 0; col < numCols; col++) {
      if (grid[row - 1][col] === "|" || grid[row - 1][col] === "S") {
        if (grid[row][col] === "^") {
          numSplits++;
          if (col > 0) grid[row][col - 1] = "|";
          if (col < numCols - 1) grid[row][col + 1] = "|";
        } else {
          grid[row][col] = "|";
        }
      }
    }
  }
  return { numSplits, grid };
}

function solve2(grid: string[][]) {
  const pathCounts: number[][] = [];
  const numCols = grid[0].length;
  for (let row = 0; row < grid.length; row++) pathCounts.push(new Array(numCols).fill(0));

  const lastRow = grid.length - 1;
  for (let col = 0; col < numCols; col++) {
    if (grid[lastRow][col] === "|") {
      pathCounts[lastRow][col] = 1;
    }
  }

  for (let row = grid.length - 2, prevRow = row + 1; row >= 0; row--, prevRow--) {
    for (let col = 0; col < numCols; col++) {
      if (grid[row][col] === "|") {
        if (grid[prevRow][col] === "|") {
          pathCounts[row][col] = pathCounts[prevRow][col];
        } else if (grid[prevRow][col] === "^") {
          if (col > 0 && grid[prevRow][col - 1] === "|") {
            pathCounts[row][col] += pathCounts[prevRow][col - 1];
          }
          if (col < numCols - 1 && grid[prevRow][col + 1] === "|") {
            pathCounts[row][col] += pathCounts[prevRow][col + 1];
          }
        }
      }
    }
  }
  return pathCounts[1].reduce((a, b) => a + b, 0);
}

// Day 7 result: { part1: 1581, part2: 73007003089792 }
