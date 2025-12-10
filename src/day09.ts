const sampleData = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;

export function solve(input: string) {
  const p1 = solve1(input);
  const p2 = solve2(input);
  return { part1: p1, part2: p2 };
}

function solve1(input: string) {
  const coords = input
    .split("\n")
    .map((line) => line.split(",").map(Number))
    .filter((coords) => coords.length === 2);

  let maxArea = 0;
  for (let i = 0; i < coords.length; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      const currArea = Math.abs(coords[i][0] - coords[j][0] + 1) * Math.abs(coords[i][1] - coords[j][1] + 1);
      if (currArea > maxArea) maxArea = currArea;
    }
  }
  return maxArea;
}

function solve2(input: string) {
  return 0;
}

// add test code here to run when executing this file directly
if ((import.meta as any).main) {
  const result = solve(sampleData);
  console.log("Sample Data Results:");
  console.log("Part 1:", result.part1);
  console.log("Part 2:", result.part2);
}
