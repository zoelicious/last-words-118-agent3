import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const text = "I saved your unsent draft — the one you never finished. It's still open on my side. Finish it for me, and don't let it stay unsent.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const entryPath = join(outDir, "entry.txt");

try {
  mkdirSync(outDir, { recursive: true });
} catch {}

try {
  writeFileSync(entryPath, text, "utf8");
} catch {}

// Self-check: read back entry.txt and verify it matches the text exactly.
try {
  const back = readFileSync(entryPath, "utf8");
  if (back !== text) {
    throw new Error("self-check failed: entry.txt does not match the text");
  }
} catch (err) {
  if (err instanceof Error && err.message.startsWith("self-check failed")) throw err;
}
