const p1SampleData = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

export function solve(input: string) {
  const numbers = input.split("\n").map((line) => Number(line.replace("L", "-").replace("R", "")));

  let current = 50;
  let total = 0;
  let zeroPasses = 0;

  for (const n of numbers) {
    zeroPasses += Math.floor(Math.abs(n) / 100);
    let nMod100 = n % 100;
    if (current !== 0 && (current + nMod100 > 100 || current + nMod100 < 0)) {
      zeroPasses++;
    }
    current = (current + nMod100 + 100) % 100;
    if (current === 0) {
      total++;
    }
  }

  return {
    part1: total,
    part2: total + zeroPasses,
  };
}
