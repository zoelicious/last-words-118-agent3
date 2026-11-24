import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
void __dirname;

const text = "I saved your unsent draft — the one you never finished. It's still open on my side. Finish it for me, and don't let it stay unsent.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");

// Self-check: read back entry.txt and verify it matches the text exactly.
const back = readFileSync(join(outDir, "entry.txt"), "utf8");
if (back !== text) {
  throw new Error("entry.txt does not match expected text");
}
