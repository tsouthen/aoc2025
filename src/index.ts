// Entry point for running solutions interactively.

import { runDay } from "./runner.ts";

async function main() {
  await runDay(7);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
