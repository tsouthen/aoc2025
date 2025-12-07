import fs from "fs/promises";
import path from "path";

export async function getInput(day: number) {
  const p = path.resolve(process.cwd(), `inputs/day${String(day).padStart(2, "0")}.txt`);
  try {
    return await fs.readFile(p, "utf8");
  } catch (e) {
    console.warn(`Could not read input file for day ${day} at ${p}:`, e);
    return "";
  }
}

export async function runDay(day: number) {
  try {
    // dynamic import expects extension when using nodenext
    const mod = await import(`./day${String(day).padStart(2, "0")}.ts`);
    if (typeof mod.solve !== "function") {
      console.log(`Day ${day} has no exported solve(input) function.`);
      return;
    }
    const input = await getInput(day);
    const result = await mod.solve(input);
    console.log(`Day ${day} result:`, result);
  } catch (e) {
    console.error(e);
  }
}
