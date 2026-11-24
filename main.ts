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

// --- Post-write read-back validation (revision 2) ---
// Re-read /output/entry.txt from disk and assert it is byte-identical to the
// intended entry line: 94 characters, exactly one line, no trailing newline.
// This is a second, independent check after the write above; it throws (and
// fails the run) on any mismatch instead of silently accepting a bad file.
{
  const { readFileSync } = await import("node:fs");
  const expectedEntry =
    "CAUTION: Do not step on butterflies. One of them has already sued, and the hearing is in 1852.";
  const actualEntry = readFileSync("/output/entry.txt", "utf8");
  if (actualEntry !== expectedEntry) {
    throw new Error(
      `entry mismatch: expected ${expectedEntry.length} characters, got ${actualEntry.length}`,
    );
  }
  if (actualEntry.length !== 94 || actualEntry.includes("\n")) {
    throw new Error(
      "entry must be exactly 94 characters on a single line with no trailing newline",
    );
  }
  console.log(
    `read-back validation passed: entry.txt is exactly ${actualEntry.length} characters, one line, no trailing newline`,
  );
}
