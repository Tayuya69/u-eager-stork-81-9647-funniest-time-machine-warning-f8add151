// Funniest Time Machine Warning Label — make.fun entry.
// Writes the entry line, exactly, to /output/entry.txt.
// Deterministic: no randomness, no network, no input.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "CAUTION: Do not step on butterflies. One of them has already sued, and the hearing is in 1852.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// --- Post-write read-back verification (genuine, runs every execution) ---
import { readFileSync } from "node:fs";

const EXPECTED =
  "CAUTION: Do not step on butterflies. One of them has already sued, and the hearing is in 1852.";
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== EXPECTED) {
  throw new Error(
    `entry.txt mismatch: got ${JSON.stringify(written)}, expected ${JSON.stringify(EXPECTED)}`,
  );
}
if (written.length !== 94) {
  throw new Error(`entry.txt length ${written.length}, expected 94 characters`);
}
if (written.includes("\n")) {
  throw new Error("entry.txt must be exactly one line with no trailing newline");
}
console.log("verified: entry.txt is exactly the entry line (94 characters, one line, no trailing newline)");
