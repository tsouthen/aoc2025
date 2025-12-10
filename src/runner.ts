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

export async function runDay(day?: number) {
  try {
    if (day === undefined) {
      // get day from current date
      const now = new Date();
      day = now.getDate();
    }

    const fileName = `./day${String(day).padStart(2, "0")}.ts`;
    // see if file exists
    try {
      await fs.access(path.resolve(process.cwd(), "src", fileName));
    } catch {
      console.log(`Day ${day} file not found.`);
      return;
    }

    // dynamic import expects extension when using nodenext
    const mod = await import(fileName);
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
